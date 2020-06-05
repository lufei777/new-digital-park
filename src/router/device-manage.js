export default [{
  path: '/devicemanage',
  name: 'devicemanage',
  meta: { title: '设备管理' },
  // component: () => import('@/pages/commonProject/coms/commonIndex'),=
  component: () => import('@/pages/deviceManage'),
  redirect: '/devicemanage/deviceinfo',
  children: [{
    path: 'deviceinfo',
    name: 'deviceinfo',
    meta: { title: '设备信息' },
    component: () => import('@/pages/deviceManage/deviceInfo')
  }, {
    path: 'monitorcollection',
    name: 'monitorcollection',
    meta: { title: '监控采集' },
    component: () => import('@/pages/deviceManage/monitorCollection'),
  }],
}]
