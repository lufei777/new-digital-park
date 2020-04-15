export default [{
  path: '/exportData',
  redirect: '/exportData',
  component: () => import('@/pages/commonProject/exportData/index'),
  meta: { title: '导出数据' },
  children: [{
    path: '/exportData',
    name: 'ExportData',
    component: () => import('@/pages/commonProject/exportData/index'),
    meta: { title: '导出数据' }
    // }
  }]
}]