import {get, post, url,del,put} from '../axios/ApiDecorator'

class DigitalParkApi {

  @url('/oaApi/menu/productList')
  @get
  getProductList(){}

  @url('/oaApi/menu/tree')
  @get
  getMenu(){}

  // @url('/oaApi/userModuleRel/modulesByType')
  @url("/oaApi/modules")
  @get
  getModulesByType(){}

  @url('/oaApi/menu/tree')
  @get
  getMenuTree(){}

  @url("/oaApi/modules/option")
  @get
  getProModules(){}

  @url('/oaApi/userModuleRel/update')
  @put
  updateUserProModules(){}

  @url("/oaApi/modules/resolution")
  @get
  getLargeScreenModule(){}

  @url("/oaApi/modules/resolution")
  @post
  updateLargeScreenModule(){}

}

export default new DigitalParkApi()

