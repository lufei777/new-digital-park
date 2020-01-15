import { get, post, url } from '../axios/ApiDecorator'

export default new class {

    @url('/oaApi/stock/list')
    @get
    getRecordList() {}

    @url("/stock/addStock")
    @post
    saveStockApply(){}
}
