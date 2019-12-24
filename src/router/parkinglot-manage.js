export default [{
    path: '/parkinglotmanage',
    name: 'parkinglotmanage',
    meta: { title: '停车场管理' },
    // component: () => import('@/pages/parkingLotManage'),
    component: () => import('@/pages/commonProject/coms/commonIndex'),
    redirect: '/parkinglotmanage/accessrecord',
    children: [{
        path: 'accessrecord',
        name: 'accessrecord',
        meta: { title: '车辆出入记录' },
        component: () => import('@/pages/parkingLotManage/accessRecord')
    }, {
        path: 'vehiclerecord',
        name: 'vehiclerecord',
        meta: { title: '过车记录' },
        component: () => import('@/pages/parkingLotManage/vehiclereRecord'),
    }, {
        path: 'parkinglotrecord',
        name: 'parkinglotrecord',
        meta: { title: '场区记录' },
        component: () => import('@/pages/parkingLotManage/parkingLotRecord'),
    }, {
        path: 'feebasedinfo',
        name: 'feebasedinfo',
        meta: { title: '收费信息' },
        component: () => import('@/pages/parkingLotManage/feeBasedInfo'),
    }],
}]
