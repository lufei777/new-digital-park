import AssetManage from '../../pages/commonProject/assetManage/index'
import AssetMaintenance from '../../pages/commonProject/assetManage/assetMaintenance'
import AssetGroup from '../../pages/commonProject/assetManage/assetGroup'
import AssetType from '../../pages/commonProject/assetManage/assetType'
import AssetAdd from '../../pages/commonProject/assetManage/addAsset'
export default [{
  path: '/assetManage',
  name: 'AssetManage',
  meta: { title: "资产管理" },
  component: AssetManage,
  redirect: '/assetMaintenance',
  children: [{
    path: '/assetMaintenance',
    name: 'AssetMaintenance',
    meta: { title: "资产信息" },
    component: AssetMaintenance,
  }, {
    path: '/assetGroup',
    name: 'AssetGroup',
    meta: { title: "资产组" },
    component: AssetGroup,
  }, {
    path: '/assetType',
    name: 'AssetType',
    meta: { title: "资产类型" },
    component: AssetType,
  }, {
    path: '/addAsset',
    name: 'AssetAdd',
    meta: { title: "资产编辑" },
    component: AssetAdd,
  }]
}]
