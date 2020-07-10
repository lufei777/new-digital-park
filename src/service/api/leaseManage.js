import { get, post, url, del } from '../axios/ApiDecorator';

export default new class {
	// 获取房产列表  { pageNum  pageSize }
	@url('/oaApi/house/listInfo')
	@get
	getHouseList() {}
	// 获取房产详情 houseId
	@url('/oaApi/house/houseDetails')
	@get
	houseDetails() {}
	// 删除房产，可删除多个  houseIds String
	@url('/oaApi/house/removeHouse')
	@get
	removeHouse() {}
	// 编辑房产  model
	@url('/oaApi/house/editHouse')
	@post
	editHouse() {}
	// 新增房产  model
	@url('/oaApi/house/addHouse')
	@post
	addHouse() {}

	//租户列表
	@url('/oaApi/tenant/tenantList')
	@get
	tenantList() {}

	//添加租户信息
	@url('/oaApi/tenant/addTenant')
	@post
	addTenant() {}

	//租户编号
	@url('/oaApi/tenant/createTenNum')
	@get
	createTenNum() {}

	//删除租户
	@url('/oaApi/tenant/delTenant')
	@get
	delTenant() {}

	//租户详情
	@url('/oaApi/tenant/tenantDetail')
	@get
	tenantDetail() {}

	//编辑
	@url('/oaApi/tenant/editTenant')
	@post
	editTenant() {}

	//合同列表
	@url('/oaApi/contract/contractList')
	@get
	contractList() {}

	//添加合同
	@url('/oaApi/contract/addContract')
	@post
	addContract() {}

	//删除合同
	@url('/oaApi/contract/removeContract')
	@get
	removeContract() {}

	@url('/oaApi/contract/contractDetail')
	@get
	contractDetail() {}

	@url('/oaApi/contract/editContract')
	@post
	editContract() {}

	// 租赁月账单=========================================================================================
	// 增加
	@url('/oaApi/month/bill/addMonthBill')
	@post
	addMonthBill() {}

	// 修改

	// 删除
	@url('/oaApi/month/bill/deleteMonthBill')
	@del
	deleteMonthBill() {}

	// 查询 /month/bill/queryMonthBillList
	@url('/oaApi/month/bill/queryMonthBillList')
	@get
	queryMonthBillList() {}

	// 租赁月账单明细查询
	@url('/oaApi/month/bill/queryMonthBillDetailed')
	@get
	queryMonthBillDetailed() {}

	// 导出
	@url('/oaApi/month/bill/exportMonthBillDetailed')
	@get
	exportMonthBillDetailed() {}

	// 租赁月账单综合查询 - 租户统计

	@url('/oaApi/month/bill/querySumStatTenant')
	@get
	querySumStatTenant() {}

	// 租赁月账单综合查询 - 合同统计
	@url('/oaApi/month/bill/querySumStatContract')
	@get
	querySumStatContract() {}

	// 生成账单编号
	// /oaApi/tenant/createTenNum
	@url('/oaApi/tenant/createTenNum')
	@get
	createTenNum() {}

	// 租户类型
	@url('/oaApi/tenant/tenantList')
	@get
	tenantList() {}

	// 合同编号

	@url('/oaApi/month/bill/queryContractByNumber')
	@get
	queryContractByNumber() {}


	// 租赁月账单审核列表
	/**
	 * 	pageNum  int 页码
		pageSize int 记录数
		billNumber String 账单编号（可填）
		tenantName String 租户名称（可填）
	 * 
	 * */
	@url('/oaApi/month/bill/querySumStatContract')
	@get
	querySumStatContract() {}


	// 租赁月账单审核查看 /oaApi/month/bill/queryMonthBillList
	/**
	 * billNumber String 账单编号（必填）
	*/
	@url('/oaApi/month/bill/queryMonthBillList')
	@get
	queryMonthBillList() {}
}();
