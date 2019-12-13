import StockManageIndex from '../pages/stockManage/index'
import WarehouseManage from '../pages/stockManage/warehouseManage'

export default [{
    path: '/',
    redirect: '/warehouseManage',
    meta: { title: '库存管理' },
    component: StockManageIndex,
    children: [{
        path: '/warehouseManage',
        name: 'WarehouseManage',
        meta: { title: '入库管理' },
        component: WarehouseManage,
    }]
}]
