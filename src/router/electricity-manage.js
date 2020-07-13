export default [{
  path: '/electricitymanage',
  name: 'electricitymanage',
  meta: { title: '用电管理' },
  component: () => import('@/pages/commonProject/coms/commonIndex'),
  // component: () => import('@/pages/electricityManage'),
  redirect: '/electricitymanage/tenantelectricity',
  children: [
    {
      path: 'tenantelectricity',
      name: 'tenantelectricity',
      meta: { title: '租户用电数据' },
      component: () => import('@/pages/electricityManage/tenantElectricity'),
    },
    {
      path: 'tenantelectricity/add',
      name: 'tenantelectricityadd',
      meta: { title: '维护租户用电数据' },
      component: () => import('@/pages/electricityManage/tenantElectricity/add'),
    },
    {
      path: 'tenantelectricitymeter',
      name: 'tenantelectricitymeter',
      meta: { title: '租户点表明细' },
      component: () => import('@/pages/electricityManage/tenantElectricityDetail'),
    },
    {
      path: 'tenantelectricitymeter/add',
      name: 'tenantelectricitymeteradd',
      meta: { title: '维护租户点表明细' },
      component: () => import('@/pages/electricityManage/tenantElectricityDetail/add'),
    },
    {
      path: 'elecpricemaintain',
      name: 'elecpricemaintain',
      meta: { title: '电价维护' },
      component: () => import('@/pages/electricityManage/elecPriceMaintain'),
    },
    {
      path: 'elecpricemaintain/add',
      name: 'elecpricemaintainadd',
      meta: { title: '维护电价' },
      component: () => import('@/pages/electricityManage/elecPriceMaintain/add'),
    },
    {
      path: 'meterreadrecords',
      name: 'meterreadrecords',
      meta: { title: '用户点表抄表记录' },
      component: () => import('@/pages/electricityManage/meterReadRecords'),
    },
    {
      path: 'meterreadrecords/add',
      name: 'meterreadrecordsadd',
      meta: { title: '用户点表抄表记录维护' },
      component: () => import('@/pages/electricityManage/meterReadRecords/add'),
    },
    {
      path: 'chargeelectricitydetail',
      name: 'chargeelectricitydetail',
      meta: { title: '用电收费明细' },
      component: () => import('@/pages/electricityManage/chargeElectricityDetail'),
    },
    {
      path: 'electricityMonthlyBill',
      name: 'electricityMonthlyBill',
      meta: { title: '用电月账单' },
      component: () => import('@/pages/electricityManage/electricityMonthlyBill'),
    }
  ],
}]
