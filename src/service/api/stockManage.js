import { get, post, url } from '../axios/ApiDecorator'

export default new class {

  @url('/oaApi/stock/list')
  @get
  getRecordList() {}

  @url("/oaApi/stock/addStock")
  @post
  saveStockApply(){}

  @url("/oaApi/stock/submitStorage")
  @post
  submitStockApply(){}

  @url("/oaApi/stock/basicInfo")
  @get
  getApplyDraft(){}

  @url("/oaApi/stock/record")
  @get
  getRecordDetail(){}
}
