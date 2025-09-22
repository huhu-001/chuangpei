import React, { useState } from 'react'
import {
  Card,
  Table,
  Button,
  Input,
  Space,
  Tag,
  Tabs,
  Pagination,
  message,
  Modal,
  Descriptions
} from 'antd'
import {
  SearchOutlined,
  ReloadOutlined,
  PlusOutlined,
  EyeOutlined,
  CloseOutlined,
  CheckOutlined
} from '@ant-design/icons'
import './OrderListPage.css'

const { TabPane } = Tabs

interface OrderData {
  key: string
  orderNumber: string
  plateNumber: string
  vin: string
  location: string
  remarks: string
  repairShop: string
  orderTime: string
  status: 'pending-dispatch' | 'pending-arrival' | 'pending-review' | 'pending-construction' | 'completed' | 'cancelled'
  statusText: string
}

const OrderListPage: React.FC = () => {
  const [searchForm, setSearchForm] = useState({
    plateNumber: '',
    vin: '',
    orderNumber: ''
  })
  const [activeTab, setActiveTab] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const orderData: OrderData[] = [
    {
      key: '1',
      orderNumber: 'WB20250213145745S2DH4J',
      plateNumber: '沪A35US29',
      vin: 'SDF12456343567896',
      location: '上海市/上海市/徐汇区',
      remarks: '存在底盘异响,空调制冷效果不好等故障需检测',
      repairShop: '--',
      orderTime: '2025-02-13 14:57:45',
      status: 'pending-dispatch',
      statusText: '待派单'
    },
    {
      key: '2',
      orderNumber: 'WB20250214205745D83HW9',
      plateNumber: '鲁W205LT',
      vin: 'LHGGJ5652E8021989',
      location: '上海市/上海市/浦东新区',
      remarks: '--',
      repairShop: '上海彦波汽车修理有限公司',
      orderTime: '2025-02-11 14:22:16',
      status: 'pending-arrival',
      statusText: '待进店'
    },
    {
      key: '3',
      orderNumber: 'WB20250213145745S2DH4J',
      plateNumber: '闽ALJ808',
      vin: 'VNN29V9L7FNY216D4',
      location: '浙江省/杭州市/萧山区',
      remarks: '--',
      repairShop: '上海彦波汽车修理有限公司',
      orderTime: '2025-02-07 10:40:33',
      status: 'pending-review',
      statusText: '待审核'
    },
    {
      key: '4',
      orderNumber: 'WB20250214205745D83HW9',
      plateNumber: '沪A770P6',
      vin: 'LVGBH51K2CG011153',
      location: '浙江省/杭州市/西湖区',
      remarks: '--',
      repairShop: '上海彦波汽车修理有限公司',
      orderTime: '2025-01-21 14:07:09',
      status: 'pending-construction',
      statusText: '待施工'
    },
    {
      key: '5',
      orderNumber: 'WB20250213145745S2DH4J',
      plateNumber: '贵A1T68C',
      vin: 'LBVTZ0109LSW77023',
      location: '上海市/上海市/黄浦区',
      remarks: '存在底盘异响,空调制冷效果不好等故障需检测',
      repairShop: '上海彦波汽车修理有限公司',
      orderTime: '2025-01-17 15:07:23',
      status: 'completed',
      statusText: '已完工'
    },
    {
      key: '6',
      orderNumber: 'WB20250214205745D83HW9',
      plateNumber: '鲁GH507G',
      vin: 'LHGRC3822H8006925',
      location: '上海市/上海市/徐汇区',
      remarks: '--',
      repairShop: '上海彦波汽车修理有限公司',
      orderTime: '2025-01-10 09:30:50',
      status: 'cancelled',
      statusText: '已取消'
    },
    {
      key: '7',
      orderNumber: 'WB20250213145745S2DH4J',
      plateNumber: '桂M5C538',
      vin: 'LFV1A2BU3K4430087',
      location: '上海市/上海市/浦东新区',
      remarks: '--',
      repairShop: '上海彦波汽车修理有限公司',
      orderTime: '2025-01-10 09:30:50',
      status: 'cancelled',
      statusText: '已取消'
    },
    {
      key: '8',
      orderNumber: 'WB20250214205745D83HW9',
      plateNumber: '湘A543CE',
      vin: 'LZWADAGA7JF701787',
      location: '浙江省/杭州市/萧山区',
      remarks: '--',
      repairShop: '上海彦波汽车修理有限公司',
      orderTime: '2025-01-10 09:30:50',
      status: 'cancelled',
      statusText: '已取消'
    },
    {
      key: '9',
      orderNumber: 'WB20250213145745S2DH4J',
      plateNumber: '桂M5C538',
      vin: 'LFV1A2BU3K4430087',
      location: '浙江省/杭州市/西湖区',
      remarks: '--',
      repairShop: '上海彦波汽车修理有限公司',
      orderTime: '2025-01-10 09:30:50',
      status: 'cancelled',
      statusText: '已取消'
    },
    {
      key: '10',
      orderNumber: 'WB20250214205745D83HW9',
      plateNumber: '湘A543CE',
      vin: 'LZWADAGA7JF701787',
      location: '上海市/上海市/黄浦区',
      remarks: '--',
      repairShop: '上海彦波汽车修理有限公司',
      orderTime: '2025-01-10 09:30:50',
      status: 'cancelled',
      statusText: '已取消'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending-dispatch': return 'orange'
      case 'pending-arrival': return 'blue'
      case 'pending-review': return 'purple'
      case 'pending-construction': return 'processing'
      case 'completed': return 'success'
      case 'cancelled': return 'error'
      default: return 'default'
    }
  }

  const handleSearch = () => {
    message.info('搜索功能待实现')
  }

  const handleReset = () => {
    setSearchForm({
      plateNumber: '',
      vin: '',
      orderNumber: ''
    })
    message.info('搜索条件已重置')
  }

  const handleCreateOrder = () => {
    message.info('创建订单功能待实现')
  }

  const handleViewOrder = (record: OrderData) => {
    setSelectedOrder(record)
    setModalVisible(true)
  }

  const handleCancelOrder = (record: OrderData) => {
    Modal.confirm({
      title: '确认取消订单',
      content: `确定要取消订单 ${record.orderNumber} 吗？`,
      onOk: () => {
        message.success('订单已取消')
      }
    })
  }

  const handleReviewOrder = (record: OrderData) => {
    Modal.confirm({
      title: '确认审核订单',
      content: `确定要审核通过订单 ${record.orderNumber} 吗？`,
      onOk: () => {
        message.success('订单审核通过')
      }
    })
  }

  const columns = [
    {
      title: '订单编号',
      dataIndex: 'orderNumber',
      key: 'orderNumber',
      width: 200,
      ellipsis: true
    },
    {
      title: '车牌号',
      dataIndex: 'plateNumber',
      key: 'plateNumber',
      width: 120,
      render: (text: string) => (
        <Tag color="blue" className="plate-tag">
          {text}
        </Tag>
      )
    },
    {
      title: '车架号',
      dataIndex: 'vin',
      key: 'vin',
      width: 180,
      ellipsis: true
    },
    {
      title: '所在地',
      dataIndex: 'location',
      key: 'location',
      width: 200,
      ellipsis: true
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      key: 'remarks',
      width: 250,
      ellipsis: true,
      render: (text: string) => text === '--' ? '-' : text
    },
    {
      title: '修理厂名称',
      dataIndex: 'repairShop',
      key: 'repairShop',
      width: 200,
      ellipsis: true,
      render: (text: string) => text === '--' ? '-' : text
    },
    {
      title: '下单时间',
      dataIndex: 'orderTime',
      key: 'orderTime',
      width: 180
    },
    {
      title: '订单状态',
      dataIndex: 'statusText',
      key: 'statusText',
      width: 120,
      render: (text: string, record: OrderData) => (
        <Tag color={getStatusColor(record.status)}>
          {text}
        </Tag>
      )
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_: unknown, record: OrderData) => (
        <Space size="small">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewOrder(record)}
          >
            查看
          </Button>
          {record.status === 'pending-review' && (
            <Button
              type="link"
              icon={<CheckOutlined />}
              onClick={() => handleReviewOrder(record)}
            >
              审核
            </Button>
          )}
          {record.status !== 'completed' && record.status !== 'cancelled' && (
            <Button
              type="link"
              danger
              icon={<CloseOutlined />}
              onClick={() => handleCancelOrder(record)}
            >
              取消订单
            </Button>
          )}
        </Space>
      )
    }
  ]

  // 计算每个状态的订单数量
  const getStatusCount = (status: string) => {
    if (status === 'all') return orderData.length
    return orderData.filter(item => item.status === status).length
  }

  const filteredData = orderData.filter(item => {
    if (activeTab === 'all') return true
    return item.status === activeTab
  })

  const tabItems = [
    { key: 'all', label: `全部(${getStatusCount('all')})`, count: getStatusCount('all') },
    { key: 'pending-dispatch', label: `待派单(${getStatusCount('pending-dispatch')})`, count: getStatusCount('pending-dispatch') },
    { key: 'pending-arrival', label: `待进店(${getStatusCount('pending-arrival')})`, count: getStatusCount('pending-arrival') },
    { key: 'pending-review', label: `待审核(${getStatusCount('pending-review')})`, count: getStatusCount('pending-review') },
    { key: 'pending-construction', label: `待施工(${getStatusCount('pending-construction')})`, count: getStatusCount('pending-construction') },
    { key: 'completed', label: `已完工(${getStatusCount('completed')})`, count: getStatusCount('completed') },
    { key: 'cancelled', label: `已取消(${getStatusCount('cancelled')})`, count: getStatusCount('cancelled') }
  ]

  return (
    <div className="order-list-page">
      <div className="order-list-container">
        {/* 页面标题 */}
        <div className="page-header">
          <h1>保养订单列表</h1>
        </div>

        {/* 搜索区域 */}
        <Card className="search-card">
          <div className="search-form">
            <Space size="middle" wrap>
              <div className="search-item">
                <label>车牌号：</label>
                <Input
                  placeholder="请输入车牌号"
                  value={searchForm.plateNumber}
                  onChange={(e) => setSearchForm(prev => ({ ...prev, plateNumber: e.target.value }))}
                  style={{ width: 200 }}
                />
              </div>
              <div className="search-item">
                <label>车架号：</label>
                <Input
                  placeholder="请输入车架号"
                  value={searchForm.vin}
                  onChange={(e) => setSearchForm(prev => ({ ...prev, vin: e.target.value }))}
                  style={{ width: 200 }}
                />
              </div>
              <div className="search-item">
                <label>订单编号：</label>
                <Input
                  placeholder="请输入订单编号"
                  value={searchForm.orderNumber}
                  onChange={(e) => setSearchForm(prev => ({ ...prev, orderNumber: e.target.value }))}
                  style={{ width: 200 }}
                />
              </div>
              <Space>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={handleSearch}
                >
                  查询
                </Button>
                <Button
                  icon={<ReloadOutlined />}
                  onClick={handleReset}
                >
                  重置
                </Button>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleCreateOrder}
                >
                  创建订单
                </Button>
              </Space>
            </Space>
          </div>
        </Card>

        {/* 状态标签页 */}
        <Card className="tabs-card">
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            className="status-tabs"
          >
            {tabItems.map(tab => (
              <TabPane tab={tab.label} key={tab.key} />
            ))}
          </Tabs>
        </Card>

        {/* 订单列表表格 */}
        <Card className="table-card">
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={false}
            scroll={{ x: 1500 }}
            className="order-table"
          />

          {/* 分页 */}
          <div className="pagination-container">
            <div className="pagination-info">
              共{filteredData.length}条数据
            </div>
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredData.length}
              onChange={(page, size) => {
                setCurrentPage(page)
                setPageSize(size || 10)
              }}
              showSizeChanger
              showQuickJumper
              showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`}
              pageSizeOptions={['10', '20', '50', '100']}
            />
          </div>
        </Card>

        {/* 订单详情模态框 */}
        <Modal
          title="订单详情"
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setModalVisible(false)}>
              关闭
            </Button>
          ]}
          width={800}
        >
          {selectedOrder && (
            <Descriptions column={2} bordered>
              <Descriptions.Item label="订单编号" span={2}>
                {selectedOrder.orderNumber}
              </Descriptions.Item>
              <Descriptions.Item label="车牌号">
                <Tag color="blue">{selectedOrder.plateNumber}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label="车架号">
                {selectedOrder.vin}
              </Descriptions.Item>
              <Descriptions.Item label="所在地" span={2}>
                {selectedOrder.location}
              </Descriptions.Item>
              <Descriptions.Item label="修理厂名称" span={2}>
                {selectedOrder.repairShop === '--' ? '-' : selectedOrder.repairShop}
              </Descriptions.Item>
              <Descriptions.Item label="下单时间">
                {selectedOrder.orderTime}
              </Descriptions.Item>
              <Descriptions.Item label="订单状态">
                <Tag color={getStatusColor(selectedOrder.status)}>
                  {selectedOrder.statusText}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="备注" span={2}>
                {selectedOrder.remarks === '--' ? '-' : selectedOrder.remarks}
              </Descriptions.Item>
            </Descriptions>
          )}
        </Modal>
      </div>
    </div>
  )
}

export default OrderListPage
