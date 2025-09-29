import { useState } from 'react'
import {
  Card,
  Form,
  Input,
  Button,
  Tabs,
  Table,
  Space,
  Tag,
  Pagination,
  ConfigProvider,
  message,
  Spin
} from 'antd'
import { SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons'
import './HomePage.css'
import { useOrders } from '../hooks/useOrders'
import { OrderData } from '../types'

const { TabPane } = Tabs

const HomePage = () => {
  const [form] = Form.useForm()
  
  // 使用自定义Hook管理订单数据
  const {
    orders,
    statusStats,
    loading,
    error,
    currentPage,
    pageSize,
    total,
    searchParams,
    activeTab,
    setCurrentPage,
    setPageSize,
    setSearchParams,
    setActiveTab,
    refreshOrders,
    updateOrderStatus,
    cancelOrder
  } = useOrders()

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      '待派单': 'orange',
      '待进店': 'blue',
      '待审核': 'purple',
      '待施工': 'cyan',
      '已完工': 'green',
      '已取消': 'red'
    }
    return statusColors[status] || 'default'
  }

  const getActionButtons = (record: OrderData) => {
    const handleCancelOrder = async () => {
      try {
        const success = await cancelOrder(record.orderNumber)
        if (success) {
          message.success('订单取消成功')
        }
      } catch (err) {
        message.error('取消订单失败')
      }
    }

    const handleUpdateStatus = async (newStatus: string) => {
      try {
        const success = await updateOrderStatus(record.orderNumber, newStatus)
        if (success) {
          message.success('订单状态更新成功')
        }
      } catch (err) {
        message.error('更新订单状态失败')
      }
    }

    switch (record.status) {
      case '待派单':
        return (
          <Space>
            <Button type="link" size="small">查看</Button>
            <Button type="link" size="small" onClick={() => handleUpdateStatus('待进店')}>
              派单
            </Button>
            <Button type="link" size="small" danger onClick={handleCancelOrder}>
              取消订单
            </Button>
          </Space>
        )
      case '待进店':
        return (
          <Space>
            <Button type="link" size="small">查看</Button>
            <Button type="link" size="small" onClick={() => handleUpdateStatus('待审核')}>
              进店
            </Button>
            <Button type="link" size="small" danger onClick={handleCancelOrder}>
              取消订单
            </Button>
          </Space>
        )
      case '待审核':
        return (
          <Space>
            <Button type="link" size="small">审核</Button>
            <Button type="link" size="small" onClick={() => handleUpdateStatus('待施工')}>
              通过
            </Button>
            <Button type="link" size="small" danger onClick={handleCancelOrder}>
              取消订单
            </Button>
          </Space>
        )
      case '待施工':
        return (
          <Space>
            <Button type="link" size="small">查看</Button>
            <Button type="link" size="small" onClick={() => handleUpdateStatus('已完工')}>
              完工
            </Button>
            <Button type="link" size="small" danger onClick={handleCancelOrder}>
              取消订单
            </Button>
          </Space>
        )
      case '已完工':
      case '已取消':
        return (
          <Button type="link" size="small">查看</Button>
        )
      default:
        return null
    }
  }

  const columns = [
    {
      title: '订单编号',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      width: 200,
    },
    {
      title: '车牌号',
      dataIndex: 'licensePlate',
      key: 'licensePlate',
      width: 120,
    },
    {
      title: '车架号',
      dataIndex: 'vin',
      key: 'vin',
      width: 180,
    },
    {
      title: '所在地',
      dataIndex: 'location',
      key: 'location',
      width: 200,
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
      width: 300,
      render: (text: string) => text || '-'
    },
    {
      title: '修理厂名称',
      dataIndex: 'repairShop',
      key: 'repairShop',
      width: 200,
      render: (text: string) => text || '-'
    },
    {
      title: '下单时间',
      dataIndex: 'orderTime',
      key: 'orderTime',
      width: 180,
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      width: 120,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>{status}</Tag>
      )
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_: unknown, record: OrderData) => getActionButtons(record)
    },
  ]

  const handleSearch = (values: Record<string, unknown>) => {
    console.log('搜索参数:', values)
    setSearchParams(values as any)
    setCurrentPage(1) // 重置到第一页
  }

  const handleReset = () => {
    form.resetFields()
    setSearchParams({})
    setCurrentPage(1)
  }

  const handleTabChange = (key: string) => {
    setActiveTab(key)
    setCurrentPage(1) // 切换标签时重置到第一页
  }

  const handlePageChange = (page: number, size?: number) => {
    setCurrentPage(page)
    if (size) {
      setPageSize(size)
    }
  }

  const handleRefresh = async () => {
    await refreshOrders()
    message.success('数据已刷新')
  }

  // 显示错误信息
  if (error) {
    message.error(error)
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#ff6b35',
          borderRadius: 6,
        },
      }}
    >
      <div className="maintenance-order-page">
        <Card className="search-card">
          <Form
            form={form}
            layout="inline"
            onFinish={handleSearch}
            className="search-form"
          >
            <Form.Item name="licensePlate" label="车牌号">
              <Input placeholder="请输入车牌号" style={{ width: 200 }} />
            </Form.Item>
            <Form.Item name="vin" label="车架号">
              <Input placeholder="请输入车架号" style={{ width: 200 }} />
            </Form.Item>
            <Form.Item name="orderNumber" label="订单编号">
              <Input placeholder="请输入订单编号" style={{ width: 200 }} />
            </Form.Item>
            <Form.Item>
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  icon={<SearchOutlined />}
                  loading={loading}
                >
                  查询
                </Button>
                <Button
                  onClick={handleReset}
                  icon={<ReloadOutlined />}
                  disabled={loading}
                >
                  重置
                </Button>
                <Button
                  onClick={handleRefresh}
                  icon={<ReloadOutlined />}
                  disabled={loading}
                >
                  刷新
                </Button>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  style={{ backgroundColor: '#ff6b35', borderColor: '#ff6b35' }}
                >
                  创建订单
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>

        <Card className="table-card">
          <Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            className="status-tabs"
          >
            <TabPane tab={`全部(${statusStats.all})`} key="all" />
            <TabPane tab={`待派单(${statusStats.pendingDispatch})`} key="pendingDispatch" />
            <TabPane tab={`待进店(${statusStats.pendingShop})`} key="pendingShop" />
            <TabPane tab={`待审核(${statusStats.pendingReview})`} key="pendingReview" />
            <TabPane tab={`待施工(${statusStats.pendingWork})`} key="pendingWork" />
            <TabPane tab={`已完工(${statusStats.completed})`} key="completed" />
            <TabPane tab={`已取消(${statusStats.cancelled})`} key="cancelled" />
          </Tabs>

          <Spin spinning={loading}>
            <Table
              columns={columns}
              dataSource={orders}
              pagination={false}
              scroll={{ x: 1500 }}
              className="order-table"
              rowKey="key"
            />
          </Spin>

          <div className="pagination-container">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={total}
              onChange={handlePageChange}
              onShowSizeChange={handlePageChange}
              showSizeChanger
              showQuickJumper
              showTotal={(total) => `共${total}条数据`}
              pageSizeOptions={['10', '20', '50', '100']}
              disabled={loading}
            />
          </div>
        </Card>
      </div>
    </ConfigProvider>
  )
}

export default HomePage