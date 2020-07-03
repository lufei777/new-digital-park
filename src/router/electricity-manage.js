export default [{
  path: '/electricitymanage',
  name: 'electricitymanage',
  meta: { title: '用电管理' },
  // component: () => import('@/pages/commonProject/coms/commonIndex'),
  component: () => import('@/pages/electricityManage'),
  redirect: '/electricitymanage/tenantelectricity',
  children: [
    {
      path: 'tenantelectricity',
      name: 'tenantelectricity',
      meta: { title: '租户用电数据' },
      component: () => import('@/pages/electricityManage/tenantelectricity'),
    },
    {
      path: 'tenantelectricity/add',
      name: 'tenantelectricityadd',
      meta: { title: '维护租户用电数据' },
      component: () => import('@/pages/electricityManage/tenantelectricity/add'),
    },
    {
      path: 'tenantelectricitymeter',
      name: 'tenantelectricitymeter',
      meta: { title: '租户点表明细' },
      component: () => import('@/pages/electricityManage/tenantelectricitydetail'),
    },
    {
      path: 'electricitypricemaintenance',
      name: 'electricitypricemaintenance',
      meta: { title: '电价维护' },
    },
    {
      path: 'electricitymeterrecords',
      name: 'bulkimporthouseproperty',
      meta: { title: '用户点表抄表记录' }
    }
  ],
}]
