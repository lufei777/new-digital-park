export default [{
    path: '/maintenanceManage',
    name: 'maintenanceManage',
    meta: { title: '维保管理' },
    component: () => import('@/pages/commonProject/coms/commonIndex'),
    redirect: '/maintenanceManageInfo',
    children: [{
        path: '/maintenanceManageInfo',
        name: 'MaintenanceManageInfo',
        meta: { title: '维修单管理' },
        component: () => import('@/pages/maintenanceManage/maintenanceManage')
    },{
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
  