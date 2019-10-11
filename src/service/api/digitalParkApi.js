import {get, post, url,del,put} from '../axios/ApiDecorator'

class DigitalParkApi {

  @url('/oaApi/menu/tree')
  @get
  getMenuList(){}

}

export default new DigitalParkApi()

