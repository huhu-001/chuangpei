import { OrderData, SearchParams, PaginationParams, ApiResponse, OrderListResponse, StatusStats } from '../types'
import { mockOrderData, mockStatusStats } from './mockData'

// 模拟网络延迟
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 模拟API响应
const createApiResponse = <T>(data: T, success = true, message?: string): ApiResponse<T> => ({
  success,
  data,
  message
})

// 订单API服务
export class OrderApiService {
  // 获取订单列表
  static async getOrderList(
    searchParams: SearchParams = {},
    paginationParams: PaginationParams = { current: 1, pageSize: 10 }
  ): Promise<ApiResponse<OrderListResponse>> {
    await delay(500) // 模拟网络延迟

    try {
      let filteredData = [...mockOrderData]

      // 应用搜索过滤
      if (searchParams.orderNumber) {
        filteredData = filteredData.filter(item => 
          item.orderNumber.toLowerCase().includes(searchParams.orderNumber!.toLowerCase())
        )
      }

      if (searchParams.licensePlate) {
        filteredData = filteredData.filter(item => 
          item.licensePlate.toLowerCase().includes(searchParams.licensePlate!.toLowerCase())
        )
      }

      if (searchParams.vin) {
        filteredData = filteredData.filter(item => 
          item.vin.toLowerCase().includes(searchParams.vin!.toLowerCase())
        )
      }

      if (searchParams.location) {
        filteredData = filteredData.filter(item => 
          item.location.toLowerCase().includes(searchParams.location!.toLowerCase())
        )
      }

      if (searchParams.status) {
        filteredData = filteredData.filter(item => 
          item.status === searchParams.status
        )
      }

      // 应用分页
      const { current, pageSize } = paginationParams
      const startIndex = (current - 1) * pageSize
      const endIndex = startIndex + pageSize
      const paginatedData = filteredData.slice(startIndex, endIndex)

      return createApiResponse({
        list: paginatedData,
        total: filteredData.length,
        current,
        pageSize
      })
    } catch (error) {
      return createApiResponse(
        { list: [], total: 0, current: 1, pageSize: 10 },
        false,
        '获取订单列表失败'
      )
    }
  }

  // 获取状态统计
  static async getStatusStats(): Promise<ApiResponse<StatusStats>> {
    await delay(300)

    try {
      return createApiResponse(mockStatusStats)
    } catch (error) {
      return createApiResponse(
        { all: 0, pendingDispatch: 0, pendingShop: 0, pendingReview: 0, pendingWork: 0, completed: 0, cancelled: 0 },
        false,
        '获取状态统计失败'
      )
    }
  }

  // 根据状态获取订单列表
  static async getOrdersByStatus(
    status: string,
    paginationParams: PaginationParams = { current: 1, pageSize: 10 }
  ): Promise<ApiResponse<OrderListResponse>> {
    await delay(400)

    try {
      let filteredData = [...mockOrderData]

      // 根据状态过滤
      if (status !== 'all') {
        const statusMap: Record<string, string> = {
          'pendingDispatch': '待派单',
          'pendingShop': '待进店',
          'pendingReview': '待审核',
          'pendingWork': '待施工',
          'completed': '已完工',
          'cancelled': '已取消'
        }
        
        const targetStatus = statusMap[status] || status
        filteredData = filteredData.filter(item => item.status === targetStatus)
      }

      // 应用分页
      const { current, pageSize } = paginationParams
      const startIndex = (current - 1) * pageSize
      const endIndex = startIndex + pageSize
      const paginatedData = filteredData.slice(startIndex, endIndex)

      return createApiResponse({
        list: paginatedData,
        total: filteredData.length,
        current,
        pageSize
      })
    } catch (error) {
      return createApiResponse(
        { list: [], total: 0, current: 1, pageSize: 10 },
        false,
        '获取订单列表失败'
      )
    }
  }

  // 更新订单状态
  static async updateOrderStatus(orderNumber: string, newStatus: string): Promise<ApiResponse<boolean>> {
    await delay(600)

    try {
      // 模拟更新操作
      const orderIndex = mockOrderData.findIndex(item => item.orderNumber === orderNumber)
      if (orderIndex !== -1) {
        mockOrderData[orderIndex].status = newStatus
        return createApiResponse(true, true, '订单状态更新成功')
      } else {
        return createApiResponse(false, false, '订单不存在')
      }
    } catch (error) {
      return createApiResponse(false, false, '更新订单状态失败')
    }
  }

  // 取消订单
  static async cancelOrder(orderNumber: string): Promise<ApiResponse<boolean>> {
    await delay(500)

    try {
      const orderIndex = mockOrderData.findIndex(item => item.orderNumber === orderNumber)
      if (orderIndex !== -1) {
        mockOrderData[orderIndex].status = '已取消'
        return createApiResponse(true, true, '订单取消成功')
      } else {
        return createApiResponse(false, false, '订单不存在')
      }
    } catch (error) {
      return createApiResponse(false, false, '取消订单失败')
    }
  }

  // 获取订单详情
  static async getOrderDetail(orderNumber: string): Promise<ApiResponse<OrderData | null>> {
    await delay(300)

    try {
      const order = mockOrderData.find(item => item.orderNumber === orderNumber)
      return createApiResponse(order || null)
    } catch (error) {
      return createApiResponse(null, false, '获取订单详情失败')
    }
  }
}

// 导出默认API服务实例
export default OrderApiService
