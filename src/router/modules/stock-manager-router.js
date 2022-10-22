import StockHome from '../../Views/Stock/index'
import PurchaseHome from '../../Views/Stock/Purchase/index'

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
  }
]
