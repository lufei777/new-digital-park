import {get, post, url,del,put} from '../axios/ApiDecorator'

class DigitalParkApi {

  @url('/oaApi/menu/productList')
  @get
  getProductList(){}

  @url('/oaApi/menu/tree')
  @get
  getMenu(){}

}

export default new DigitalParkApi()

