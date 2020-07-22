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
        path: '/addMaintenance',
        name: 'AddMaintenance',
        meta: { title: '新增维修' },
        component: () => import('@/pages/maintenanceManage/addMaintenance')
    },{
        path: '/auditList',
        name: 'AuditList',
        meta: { title: '维修单审核' },
        component: () => import('@/pages/maintenanceManage/auditList')
    },{
        path: '/maintenanceAudit',
        name: 'MaintenanceAudit',
        meta: { title: '新增审核' },
        component: () => import('@/pages/maintenanceManage/maintenanceAudit')
    },{
        path: '/maintenanceDetail',
        name: 'MaintenanceDetail',
        meta: { title: '维修单详情' },
        component: () => import('@/pages/maintenanceManage/maintenanceDetail')
    },{
        path: '/workHoursStatistics',
        name: 'WorkHoursStatistics',
        meta: { title: '工时统计' },
        component: () => import('@/pages/maintenanceManage/workHoursStatistics')
    }]
  }]
  