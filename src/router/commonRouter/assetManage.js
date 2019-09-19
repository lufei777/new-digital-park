import AssetManage from '../../pages/commonProject/assetManage/index'
import AssetMaintenance from '../../pages/commonProject/assetManage/assetMaintenance'
import AssetGroup from '../../pages/commonProject/assetManage/assetGroup'
import AssetType from '../../pages/commonProject/assetManage/assetType'
export default [{
  path:'/assetManage',
  name: 'AssetManage',
  component: AssetManage,
  redirect:'/assetMaintenance',
  children:[{
    path: '/assetMaintenance',
    name: 'AssetMaintenance',
    component: AssetMaintenance,
  }, {
    path: '/assetGroup',
    name: 'AssetGroup',
    component: AssetGroup,
  },{
    path: '/assetType',
    name: 'AssetType',
    component: AssetType,
  }]
}]
