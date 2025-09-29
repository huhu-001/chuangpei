import { OrderData, StatusStats } from '../types'

// 扩展的订单数据
export const mockOrderData: OrderData[] = [
  {
    key: '1',
    orderNumber: 'WB20250213145745S2DH4J',
    licensePlate: '沪A35US29',
    vin: 'SDF12456343567896',
    location: '上海市/上海市/徐汇区',
    remarks: '存在底盘异响,空调制冷效果不好等故障需检测',
    repairShop: '',
    orderTime: '2025-02-13 14:57:45',
    status: '待派单'
  },
  {
    key: '2',
    orderNumber: 'WB20250214205745D83HW9',
    licensePlate: '鲁W205LT',
    vin: 'LHGGJ5652E8021989',
    location: '上海市/上海市/浦东新区',
    remarks: '',
    repairShop: '上海彦波汽车修理有限公司',
    orderTime: '2025-02-11 14:22:16',
    status: '待进店'
  },
  {
    key: '3',
    orderNumber: 'WB20250213145745S2DH4J',
    licensePlate: '闽ALJ808',
    vin: 'VNN29V9L7FNY216D4',
    location: '浙江省/杭州市/萧山区',
    remarks: '',
    repairShop: '上海彦波汽车修理有限公司',
    orderTime: '2025-02-07 10:40:33',
    status: '待审核'
  },
  {
    key: '4',
    orderNumber: 'WB20250213145745S2DH4J',
    licensePlate: '贵A1T68C',
    vin: 'LBVTZ0109LSW77023',
    location: '上海市/上海市/黄浦区',
    remarks: '存在底盘异响,空调制冷效果不好等故障需检测',
    repairShop: '上海彦波汽车修理有限公司',
    orderTime: '2025-01-17 15:07:23',
    status: '已完工'
  },
  {
    key: '5',
    orderNumber: 'WB20250214205745D83HW9',
    licensePlate: '鲁GH507G',
    vin: 'LHGRC3822H8006925',
    location: '上海市/上海市/徐汇区',
    remarks: '',
    repairShop: '上海彦波汽车修理有限公司',
    orderTime: '2025-01-10 09:30:50',
    status: '已取消'
  },
  {
    key: '6',
    orderNumber: 'WB20250215123456A1B2C3',
    licensePlate: '京A12345',
    vin: 'ABCD12345678901234',
    location: '北京市/北京市/朝阳区',
    remarks: '发动机异响，需要全面检查',
    repairShop: '北京汽车维修中心',
    orderTime: '2025-02-15 09:15:30',
    status: '待施工'
  },
  {
    key: '7',
    orderNumber: 'WB20250216123456D4E5F6',
    licensePlate: '粤B88888',
    vin: 'EFGH56789012345678',
    location: '广东省/深圳市/南山区',
    remarks: '刹车系统故障',
    repairShop: '深圳专业汽修',
    orderTime: '2025-02-16 16:45:20',
    status: '待派单'
  },
  {
    key: '8',
    orderNumber: 'WB20250217123456G7H8I9',
    licensePlate: '苏A99999',
    vin: 'IJKL90123456789012',
    location: '江苏省/南京市/鼓楼区',
    remarks: '空调不制冷',
    repairShop: '南京汽车服务',
    orderTime: '2025-02-17 11:30:15',
    status: '待进店'
  },
  {
    key: '9',
    orderNumber: 'WB20250218123456J0K1L2',
    licensePlate: '川A77777',
    vin: 'MNOP34567890123456',
    location: '四川省/成都市/锦江区',
    remarks: '变速箱异响',
    repairShop: '成都汽修厂',
    orderTime: '2025-02-18 14:20:45',
    status: '已完工'
  },
  {
    key: '10',
    orderNumber: 'WB20250219123456M3N4O5',
    licensePlate: '津A66666',
    vin: 'QRST78901234567890',
    location: '天津市/天津市/和平区',
    remarks: '轮胎磨损严重',
    repairShop: '天津轮胎专修',
    orderTime: '2025-02-19 08:50:10',
    status: '待审核'
  }
]

// 状态统计数据
export const mockStatusStats: StatusStats = {
  all: 1092,
  pendingDispatch: 52,
  pendingShop: 368,
  pendingReview: 52,
  pendingWork: 368,
  completed: 52,
  cancelled: 368
}

// 修理厂数据
export const mockRepairShops = [
  '上海彦波汽车修理有限公司',
  '北京汽车维修中心',
  '深圳专业汽修',
  '南京汽车服务',
  '成都汽修厂',
  '天津轮胎专修',
  '广州汽修连锁',
  '杭州汽车服务中心'
]

// 地区数据
export const mockLocations = [
  '上海市/上海市/徐汇区',
  '上海市/上海市/浦东新区',
  '浙江省/杭州市/萧山区',
  '上海市/上海市/黄浦区',
  '北京市/北京市/朝阳区',
  '广东省/深圳市/南山区',
  '江苏省/南京市/鼓楼区',
  '四川省/成都市/锦江区',
  '天津市/天津市/和平区'
]
