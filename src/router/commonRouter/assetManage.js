import AssetManage from '../../pages/assetManage/index'
import AssetMaintenance from '../../pages/assetManage/assetMaintenance'
import AssetGroup from '../../pages/assetManage/assetGroup'
import AssetType from '../../pages/assetManage/assetType'
import AssetAdd from '../../pages/assetManage/addAsset'
import DefaultPage from '../../pages/commonProject/defaultPage/index'
export default [{
  path: '/assetManage',
  name: 'AssetManage',
  meta: { title: "资产信息" },
  component: AssetManage,
  redirect: '/assetMaintenance',
  children: [{
    path: '/assetMaintenance',
    name: 'AssetMaintenance',
    meta: { title: "资产信息维护" },
    component: AssetMaintenance,
  }, {
    path: '/assetGroup',
    name: 'AssetGroup',
    meta: { title: "资产组设置" },
    component: AssetGroup,
  }, {
    path: '/assetType',
    name: 'AssetType',
    meta: { title: "资产类型设置" },
    component: AssetType,
  }, {
    path: '/addAsset',
    name: 'AssetAdd',
    meta: { title: "资产编辑" },
    component: AssetAdd,
  }, {
    path: '/digitalPark/defaultPage',
    name: 'DefaultPage',
    component: DefaultPage,
    meta: { title: "建设中" },
  }]
}]
