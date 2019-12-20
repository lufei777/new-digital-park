export default [{
    path: '/stockmanage',
    redirect: '/warehouseManage',
    meta: { title: '库存管理' },
    component: () => import('@/pages/stockManage/index'),
    children: [{
        path: '/warehouseManage',
        name: 'WarehouseManage',
        meta: { title: '入库管理' },
        component: () => import('@/pages/stockManage/warehouseManage')
    }]
}]
