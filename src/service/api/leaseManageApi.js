import { get, post, url } from '../axios/ApiDecorator'

export default new class {
    @url('/oaApi/house/listInfo')
    @get
    getHouseList() { }
}