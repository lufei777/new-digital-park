import AssetMaintenance from '../../pages/commonProject/assetManage/assetMaintenance'
import AssetManage from '../../pages/commonProject/assetManage/index'
export default [{
  path:'/assetManage',
  name: 'AssetManage',
  component: AssetManage,
  redirect:'/assetMaintenance',
  children:[{
    path: '/assetMaintenance',
    name: 'AssetMaintenance',
    component: AssetMaintenance,
  }]
}]
