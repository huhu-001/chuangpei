// 订单数据接口
export interface OrderData {
  key: string
  orderNumber: string
  licensePlate: string
  vin: string
  location: string
  remarks: string
  repairShop: string
  orderTime: string
  status: string
}

// 订单状态枚举
export enum OrderStatus {
  PENDING_DISPATCH = '待派单',
  PENDING_SHOP = '待进店',
  PENDING_REVIEW = '待审核',
  PENDING_WORK = '待施工',
  COMPLETED = '已完工',
  CANCELLED = '已取消'
}

// 搜索参数接口
export interface SearchParams {
  orderNumber?: string
  licensePlate?: string
  vin?: string
  location?: string
  status?: string
  startTime?: string
  endTime?: string
}

// 分页参数接口
export interface PaginationParams {
  current: number
  pageSize: number
}

// API响应接口
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  total?: number
}

// 订单列表响应
export interface OrderListResponse {
  list: OrderData[]
  total: number
  current: number
  pageSize: number
}

// 状态统计接口
export interface StatusStats {
  all: number
  pendingDispatch: number
  pendingShop: number
  pendingReview: number
  pendingWork: number
  completed: number
  cancelled: number
}
