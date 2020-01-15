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

    //租户列表
    @url('/oaApi/tenant/tenantList')
    @get
    tenantList() { }

    //添加租户信息
    @url('/oaApi/tenant/addTenant')
    @post
    addTenant() { }

    //租户编号
    @url('/oaApi/tenant/createTenNum')
    @get
    createTenNum() { }

    //删除租户
    @url('/oaApi/tenant/delTenant')
    @get
    delTenant() { }

    //租户详情
    @url('/oaApi/tenant/tenantDetail')
    @get
    tenantDetail() { }

    //编辑
    @url('/oaApi/tenant/editTenant')
    @post
    editTenant() { }

    //合同列表
    @url('/oaApi/contract/contractList')
    @get
    contractList() { }

    //添加合同
    @url('/contract/addContract')
    @post
    addContract() { }
}