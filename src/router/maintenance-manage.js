export default [{
    path: '/',
    name: 'maintenanceManage',
    meta: { title: '维保管理' },
    component: () => import('@/pages/commonProject/coms/commonIndex'),
    // component: () => import('@/pages/deviceManage'),
    redirect: '/serviceAudit',
    children: [{
        path: '/serviceAudit',
        name: 'ServiceAudit',
        meta: { title: '维修审核' },
        component: () => import('@/pages/maintenanceManage/serviceAudit')
    },{
        path: '/addMaintenance',
        name: 'AddMaintenance',
        meta: { title: '维修审核' },
        component: () => import('@/pages/maintenanceManage/addMaintenance')
    }]
  }]
  