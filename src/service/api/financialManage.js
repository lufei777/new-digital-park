// 财务管理文件
// 方法导入
import { post, get, del, url } from '../axios/ApiDecorator';
export default new class {
	// 收费通知单=======================================================
	// 收费通知单列表
	@url('/oaApi/finance/manager/selectNoticeList')
	@get
	selectNoticeList() {}

	// 收费通知单下拉列表 /finance/manager/getNoticeType
	@url('/oaApi/finance/manager/getNoticeType')
	@get
	getNoticeType() {}

	// 收费联系单=======================================================
	// 查询收费联系单列表  /finance/manager/selectBillChargeContact
	@url('/oaApi/finance/manager/selectBillChargeContact')
	@get
	selectBillChargeContact() {}

	// 开票 ====联系单
	@url('/oaApi/finance/manager/addInvoiceContact')
	@post
    addInvoiceContact() {}
    
    // 收费  ===
    @url('/oaApi/finance/manager/addInvoiceContact')
	@post
    addInvoiceContact() {}

	// 作废  /finance/manager/delBillChargeContact

	@url('/oaApi/finance/manager/delBillChargeContact')
	@post
    delBillChargeContact() {}
    
    
    // 调整 /finance/manager/updateCost
    @url('/oaApi/finance/manager/updateCost')
	@post
    updateCost() {}

	// 修改收费联系单  /finance/manager/updateBillChargeContact
	@url('/oaApi/finance/manager/updateBillChargeContact')
	@post
	updateBillChargeContact() {}
}();
