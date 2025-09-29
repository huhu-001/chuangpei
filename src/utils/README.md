# Mock接口系统使用说明

## 概述

本项目实现了一个完整的mock接口系统，用于模拟后端API调用。系统包含以下组件：

- **类型定义** (`types/index.ts`) - 定义所有接口相关的TypeScript类型
- **Mock数据** (`utils/mockData.ts`) - 包含静态测试数据
- **API服务** (`utils/api.ts`) - 模拟API调用和业务逻辑
- **自定义Hook** (`hooks/useOrders.ts`) - 管理订单数据的状态和操作
- **页面组件** (`pages/HomePage.tsx`) - 使用mock接口的示例页面

## 功能特性

### 1. 订单管理
- ✅ 订单列表查询（支持分页）
- ✅ 按状态筛选订单
- ✅ 搜索功能（订单号、车牌号、车架号、地区）
- ✅ 订单状态更新
- ✅ 订单取消
- ✅ 实时状态统计

### 2. 用户体验
- ✅ 加载状态显示
- ✅ 错误处理和提示
- ✅ 网络延迟模拟（真实感）
- ✅ 操作反馈（成功/失败消息）

### 3. 数据管理
- ✅ 状态管理（React Hooks）
- ✅ 数据缓存和刷新
- ✅ 分页控制
- ✅ 搜索参数管理

## 使用方法

### 在组件中使用

```tsx
import { useOrders } from '../hooks/useOrders'

const MyComponent = () => {
  const {
    orders,           // 订单列表
    statusStats,      // 状态统计
    loading,          // 加载状态
    error,           // 错误信息
    currentPage,     // 当前页码
    pageSize,        // 每页大小
    total,           // 总数据量
    searchParams,    // 搜索参数
    activeTab,       // 当前标签
    setCurrentPage,  // 设置页码
    setPageSize,     // 设置每页大小
    setSearchParams, // 设置搜索参数
    setActiveTab,    // 设置当前标签
    refreshOrders,   // 刷新数据
    updateOrderStatus, // 更新订单状态
    cancelOrder      // 取消订单
  } = useOrders()

  // 使用数据...
}
```

### 直接调用API服务

```tsx
import OrderApiService from '../utils/api'

// 获取订单列表
const response = await OrderApiService.getOrderList(
  { orderNumber: 'WB20250213' }, // 搜索参数
  { current: 1, pageSize: 10 }   // 分页参数
)

// 更新订单状态
const success = await OrderApiService.updateOrderStatus('WB20250213', '已完工')

// 取消订单
const cancelled = await OrderApiService.cancelOrder('WB20250213')
```

## 数据结构

### 订单数据 (OrderData)
```typescript
interface OrderData {
  key: string          // 唯一标识
  orderNumber: string  // 订单编号
  licensePlate: string // 车牌号
  vin: string         // 车架号
  location: string    // 所在地
  remarks: string     // 备注
  repairShop: string  // 修理厂名称
  orderTime: string   // 下单时间
  status: string      // 订单状态
}
```

### 状态统计 (StatusStats)
```typescript
interface StatusStats {
  all: number              // 全部订单数
  pendingDispatch: number   // 待派单数
  pendingShop: number      // 待进店数
  pendingReview: number    // 待审核数
  pendingWork: number       // 待施工数
  completed: number         // 已完工数
  cancelled: number         // 已取消数
}
```

## 扩展说明

### 添加新的API接口

1. 在 `types/index.ts` 中定义新的类型
2. 在 `utils/mockData.ts` 中添加相关数据
3. 在 `utils/api.ts` 中实现API方法
4. 在 `hooks/useOrders.ts` 中添加状态管理
5. 在组件中使用新的功能

### 自定义网络延迟

修改 `utils/api.ts` 中的 `delay` 函数：

```typescript
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

// 使用示例
await delay(1000) // 1秒延迟
```

### 添加新的订单状态

1. 在 `types/index.ts` 中更新 `OrderStatus` 枚举
2. 在 `utils/mockData.ts` 中添加新状态的测试数据
3. 在 `utils/api.ts` 中更新状态过滤逻辑
4. 在组件中更新UI显示逻辑

## 注意事项

- 所有API调用都包含错误处理
- 网络延迟模拟提供真实的用户体验
- 数据状态通过React Hooks进行管理
- 支持TypeScript类型检查
- 组件具有良好的可复用性
