import { get, post, url } from '../axios/ApiDecorator'

export default new class {
    // 获取房产列表  { pageNum  pageSize }
    @url('/oaApi/house/listInfo')
    @get
    getHouseList() { }
    // 获取房产详情 houseId
    @url('/oaApi/house/houseDetails')
    @get
    houseDetails() { }
    // 删除房产，可删除多个  houseIds String
    @url('/oaApi/house/removeHouse')
    @get
    removeHouse() { }
    // 编辑房产  model
    @url('/oaApi/house/editHouse')
    @post
    editHouse() { }
    // 新增房产  model
    @url('/oaApi/house/addHouse')
    @post
    addHouse() { }
}