import { useState, useEffect, useCallback } from 'react'
import { OrderData, SearchParams, PaginationParams, StatusStats } from '../types'
import OrderApiService from '../utils/api'

interface UseOrdersReturn {
  // 数据状态
  orders: OrderData[]
  statusStats: StatusStats
  loading: boolean
  error: string | null
  
  // 分页状态
  currentPage: number
  pageSize: number
  total: number
  
  // 搜索状态
  searchParams: SearchParams
  activeTab: string
  
  // 操作方法
  setCurrentPage: (page: number) => void
  setPageSize: (size: number) => void
  setSearchParams: (params: SearchParams) => void
  setActiveTab: (tab: string) => void
  refreshOrders: () => Promise<void>
  updateOrderStatus: (orderNumber: string, newStatus: string) => Promise<boolean>
  cancelOrder: (orderNumber: string) => Promise<boolean>
}

export const useOrders = (): UseOrdersReturn => {
  // 数据状态
  const [orders, setOrders] = useState<OrderData[]>([])
  const [statusStats, setStatusStats] = useState<StatusStats>({
    all: 0,
    pendingDispatch: 0,
    pendingShop: 0,
    pendingReview: 0,
    pendingWork: 0,
    completed: 0,
    cancelled: 0
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // 分页状态
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)
  
  // 搜索状态
  const [searchParams, setSearchParams] = useState<SearchParams>({})
  const [activeTab, setActiveTab] = useState('all')

  // 获取订单列表
  const fetchOrders = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await OrderApiService.getOrdersByStatus(
        activeTab,
        { current: currentPage, pageSize }
      )
      
      if (response.success) {
        setOrders(response.data.list)
        setTotal(response.data.total)
      } else {
        setError(response.message || '获取订单列表失败')
      }
    } catch (err) {
      setError('网络错误，请稍后重试')
    } finally {
      setLoading(false)
    }
  }, [activeTab, currentPage, pageSize])

  // 获取状态统计
  const fetchStatusStats = useCallback(async () => {
    try {
      const response = await OrderApiService.getStatusStats()
      if (response.success) {
        setStatusStats(response.data)
      }
    } catch (err) {
      console.error('获取状态统计失败:', err)
    }
  }, [])

  // 搜索订单
  const searchOrders = useCallback(async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await OrderApiService.getOrderList(
        searchParams,
        { current: currentPage, pageSize }
      )
      
      if (response.success) {
        setOrders(response.data.list)
        setTotal(response.data.total)
      } else {
        setError(response.message || '搜索失败')
      }
    } catch (err) {
      setError('搜索失败，请稍后重试')
    } finally {
      setLoading(false)
    }
  }, [searchParams, currentPage, pageSize])

  // 刷新订单列表
  const refreshOrders = useCallback(async () => {
    if (Object.keys(searchParams).length > 0) {
      await searchOrders()
    } else {
      await fetchOrders()
    }
  }, [searchParams, searchOrders, fetchOrders])

  // 更新订单状态
  const updateOrderStatus = useCallback(async (orderNumber: string, newStatus: string): Promise<boolean> => {
    try {
      const response = await OrderApiService.updateOrderStatus(orderNumber, newStatus)
      if (response.success) {
        await refreshOrders()
        await fetchStatusStats()
        return true
      } else {
        setError(response.message || '更新订单状态失败')
        return false
      }
    } catch (err) {
      setError('更新订单状态失败')
      return false
    }
  }, [refreshOrders, fetchStatusStats])

  // 取消订单
  const cancelOrder = useCallback(async (orderNumber: string): Promise<boolean> => {
    try {
      const response = await OrderApiService.cancelOrder(orderNumber)
      if (response.success) {
        await refreshOrders()
        await fetchStatusStats()
        return true
      } else {
        setError(response.message || '取消订单失败')
        return false
      }
    } catch (err) {
      setError('取消订单失败')
      return false
    }
  }, [refreshOrders, fetchStatusStats])

  // 初始化数据
  useEffect(() => {
    fetchStatusStats()
  }, [fetchStatusStats])

  // 当分页参数变化时重新获取数据
  useEffect(() => {
    if (Object.keys(searchParams).length > 0) {
      searchOrders()
    } else {
      fetchOrders()
    }
  }, [currentPage, pageSize, activeTab, fetchOrders, searchOrders])

  return {
    // 数据状态
    orders,
    statusStats,
    loading,
    error,
    
    // 分页状态
    currentPage,
    pageSize,
    total,
    
    // 搜索状态
    searchParams,
    activeTab,
    
    // 操作方法
    setCurrentPage,
    setPageSize,
    setSearchParams,
    setActiveTab,
    refreshOrders,
    updateOrderStatus,
    cancelOrder
  }
}
