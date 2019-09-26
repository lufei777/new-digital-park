import {get, post, url} from '../axios/ApiDecorator'

class CommonApi {

  @url('/oaApi/asset/list')
  @get
  getAssetList(){}

  @url('/oaApi/login')
  @get
  login(){}

  @url('/oaApi/assetType/tree')
  @get
  getAssetTypeTree(){}

  @url('/oaApi/asset/detail')
  @get
  getAssetDetail(){}

  @url('/oaApi/assetType/selectById')
  @get
  getAssetTypeDetail(){}

  // 资产组
  @url('/oaApi/assetGroup/tree')
  @get
  getAssetGroupTree(){}

  @url('/oaApi/assetGroup/selectById')
  @get
  selectAssetGroupById(){}

  @url('/oaApi/assetGroup/save')
  @post
  addAssetGroup(){}

  @url('/oaApi/assetGroup/delete')
  @get
  deleteAssetGroup(){}

  @url('/oaApi/assetGroup/update')
  @get
  updateAssetGroup(){}



  @url('/oaApi/assetTypeAttribute/getAttrsById')
  @get
  getAttributeByType(){}

  @url('/oaApi/provider/selectAll')
  @get
  getProviderList(){}

  @url('/oaApi/asset/save')
  @post
  addAsset(){}

  @url('/oaApi/assetType/save')
  @post
  addAssetType(){}

  @url('/oaApi/assetType/delete')
  @get
  deleteAssetType(){}

  @url('/oaApi/assetType/update')
  @get
  editAssetType(){}

  @url('/oaApi/dept/tree')
  @get
  getDepartmentTree(){}

  @url('/oaApi/asset/updateById')
  @post
  editAsset(){}

  @url('/oaApi/assetTypeAttribute/save')
  @post
  addTypeAttr(){}

  @url('/oaApi/assetTypeAttribute/delete')
  @get
  delAssetTypeAttr(){}

  @url('/oaApi/assetTypeAttribute/update')
  @get
  editTypeAttr(){}
}

export default new CommonApi()

