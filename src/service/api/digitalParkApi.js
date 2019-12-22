import {get, post, url,del,put} from '../axios/ApiDecorator'

class DigitalParkApi {

  @url('/oaApi/menu/productList')
  @get
  getProductList(){}

  @url('/oaApi/menu/tree')
  @get
  getMenu(){}

  @url('/oaApi/userModuleRel/modulesByType')
  @get
  getModulesByType(){}

  @url('/oaApi/menu/tree')
  @get
  getMenuTree(){}

  @url("/oaApi/menu/productModules")
  @get
  getProModules(){}

  @url('/oaApi/userModuleRel/update')
  @put
  updateUserProModules(){}

  @url('/oaApi/user/logout')
  @get
  logOut(){}

  @url('/oaApi/user/mobileLogin')
  @post
  login(){}

  @url("/oaApi/user/getNowUser")
  @get
  getUserInfo(){}

  @url('/oaApi/tenant/tenantList')
  @get
  tenantList(){}

  @url('/oaApi/tenant/addTenant')
  @post
  addTenant(){}

  @url('/oaApi/contract/contractList')
  @get
  contractList(){}

  @url('/oaApi/tenant/createTenNum')
  @get
  createTenNum(){}

  @url('/oaApi/tenant/delTenant')
  @get
  delTenant(){}

  @url('/oaApi/tenant/tenantDetail')
  @get
  tenantDetail(){}

  @url('/oaApi/tenant/editTenant')
  @post
  editTenant(){}

  @url('/oaApi/user/password')
  @put
  modifyPwd(){}

  @url('/oaApi/user')
  @put
  editPersonInformation(){}
}

export default new DigitalParkApi()

