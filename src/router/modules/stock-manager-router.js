import StockHome from '../../Views/Stock/index'
import PurchaseHome from '../../Views/Stock/Purchase/index'
import PurchaseOrderHome from '../../Views/Stock/PurchaseOrders/index'

export default [
  {
    path: '/stock/home',
    name: 'stock_home',
    component: StockHome
  },
  {
    path: '/purchase/home',
    name: 'purchase_home',
    component: PurchaseHome
  },
  {
    path: '/stock/purchaseOrders',
    name: 'purchase_order_home',
    component: PurchaseOrderHome
  }
]
