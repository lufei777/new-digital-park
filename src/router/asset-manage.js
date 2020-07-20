import AssetLedger from '../pages/assetManage/assetLedger'
import MyAsset from '../pages/assetManage/myAsset/myAsset'

export default [{
  path: '/assetManage',
  name: 'AssetManage',
  meta: { title: "资产管理" },
  component: () => import('@/pages/commonProject/coms/commonIndex'),
  redirect: '/myAsset',
  children: [{
    path: '/myAsset',
    name: 'MyAsset',
    component: MyAsset,
    meta: { title: "我的资产" },
  },{
    path: '/assetTmpRouter',
    // name: 'TmpRouter',
    meta: { title: "资产信息" },
    component: () => import('@/pages/commonProject/coms/tmpRouterBox'),
    children:[{
      path: '/assetMaintenance',
      name: 'AssetMaintenance',
      meta: { title: "资产信息维护" },
      component: () => import('@/pages/assetManage/assetInfo/assetMaintenance/assetMaintenance'),
    },{
      path: '/assetType',
      name: 'AssetType',
      meta: { title: "资产类型设置" },
      component: () => import('@/pages/assetManage/assetInfo/assetType'),
    },{
      path: '/assetGroup',
      name: 'AssetGroup',
      meta: { title: "资产组设置" },
      component:  () => import('@/pages/assetManage/assetInfo/assetGroup'),
    }],
  },{
    path: '/addAsset',
    name: 'AssetAdd',
    meta: { title: "资产编辑" },
    component: () => import('@/pages/assetManage/assetInfo/assetMaintenance/addAsset'),
  }, {
    path: '/assetLedger',
    name: 'AssetLedger',
    component: AssetLedger,
    meta: { title: "资产台账" },
  },{
    path: '/assetUseTmpRouter',
    // name: 'TmpRouter',
    component:  () => import('@/pages/commonProject/coms/tmpRouterBox'),
    meta: { title: "管理资产" },
    children:[{
      path: '/todoList',
      name: 'TodoList',
      component:  () => import('@/pages/assetManage/assetOperator/todoList'),
      meta: { title: "我的待办" },
    },{
      path: '/assetUse',
      name: 'AssetUse',
      component:  () => import('@/pages/assetManage/assetOperator/assetUse'),
      meta: { title: "资产领用" },
    },{
      path: '/checkDetail',
      name: 'CheckDetail',
      component: () => import('@/pages/assetManage/assetOperator/checkDetail'),
      meta: { title: "我的待办" },
    }]
  },]
}]
