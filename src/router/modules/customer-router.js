import CustomerHome from '../../Views/Customer/index'
import CanceledOrderHome from '../../Views/Customer/CanceledOrders/index'

export default [
    {
        path: '/staff/home',
        name: 'customer_home',
        component: CustomerHome
    },
    {
        path: '/staff/canceledorders',
        name: 'canceledorder_home',
        component: CanceledOrderHome
    }
]