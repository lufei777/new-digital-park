// 罗布林卡二期项目接口
import { post, get, url, del } from '../axios/ApiDecorator';

export default new class {
	// 遗产要素=========================================================================================
	// 文物级别 getSelectOption  [ 巡检人员==》 维护类型 的下拉框也是这个两者的传入的参数不同]
	@url('/vibe-web/getSelectOption')
	@get
	getSelectOption() { }

	// 搜索藏品档案
	@url('/norb-service/archives/queryArchivesById')
    @get
    queryArchivesById(){ }

    // 添加藏品档案
    @url('/norb-service/archives/insertRelic2')
    @post
    insertRelic2() { }
    
    // 删除藏品档案
    @url('/norb-service/archives/deleteRelic2')
    @del
    deleteRelic2(){ }

    // 更新藏品档案
    @url('/norb-service/archives/updateRelic')
    @post
    updateRelic() {  }
    // 页面数据
    @url('/norb-service/archives/queryRelic2ByPage')
    @get
	queryRelic2ByPage() {  }
	
	// 添加藏品档案中的下拉框请求，=编号类型，文物级别 藏品年代 质地类别......【传入的参数不同】
	@url('/vibe-web/getSelectOptionOther')
	@get
    getSelectOptionOther() {  }

	// 项目工程=========================================================================================
		// 保护项目工程
		// 增加
		@url('/norb-service/protectProject/insertWithFileProtectProject')
		@post
		insertWithFileProtectProject(){ }
		// 删除 = 批量删除
		@url('/norb-service/protectProject/deleteProtectProject')
		@del
		deleteProtectProject() { }
		// 编辑
		@url('/norb-service/protectProject/updateProtectProject')
		@post
		updateProtectProject() { }

		// 查询 搜索 /protectProject/queryProtectByPage
		@url('/norb-service/protectProject/queryProtectByPage')
		@get
		queryProtectByPage() { }

		// 根据id 查询项目工程信息 /protectProject/queryDetailProtectProjectById
		@url('/norb-service/protectProject/queryDetailProtectProjectById')
		@get
		queryDetailProtectProjectById() { }
		



	// 日常巡查=========================================================================================
	// 巡检人员/
	@url('/vibe-web/user/userNameList')
	@get
	userNameList() {}
	
	// 表格信息 接口
	@url('/norb-service/dailyCheck/queryDailyCheckByPage')
	@get
	queryDailyCheckByPage() { }
	// 查询

	// 删除
	@url('norb-service/dailyCheck/deleteDailyCheck')
	@del
	deleteDailyCheck() { }

	// 增加
	@url('norb-service/dailyCheck/addDailyCheck')
	@post
	addDailyCheck() { }

	// 修改
	@url('norb-service/dailyCheck/updateDailyCheck')
	@post
	updateDailyCheck() { }



	// 实测录入=========================================================================================

	// 汇总信息的分页方法
	@url('/norb-service/measuredInput/queryUnionPollingByPage')
	@get
	queryUnionPollingByPage() {}

	// 本体情况
	@url('/norb-service/measuredInput/queryBuildingByPage')
	@get
	queryBuildingByPage() {}

	// 增加 /ontology/insertBuildingsPhoto
	@url('/norb-service/ontology/insertBuildingsPhoto')
	@post
	insertBuildingsPhoto() {}


	// 删除 /ontology/deleteBuildingsPhoto
	@url('/norb-service/ontology/deleteBuildingsPhoto')
	@del
	deleteBuildingsPhoto() {}

	// 修改  /ontology/updatBuildingsPhoto
	@url('/norb-service/ontology/updatBuildingsPhoto')
	@post
	updatBuildingsPhoto() {}

	// 查询
	@url('/norb-service/ontology/queryBuildingsPhotoDetails')
	@get
	queryBuildingsPhotoDetails() { }
	
	// ----------------------------------------------------------------
	// 病害分析
	@url('/norb-service/measuredInput/queryDamageByPage')
	@get
	queryDamageByPage() { }
	
	// 增加  /damage/insertDamage
	@url('/norb-service/damage/insertDamage')
	@post
	insertDamage() { }

	// 删除 /damage/deleteDamage
	@url('/norb-service/damage/deleteDamage')
	@del
	deleteDamage() { }

	// 修改  /damage/updateDamage
	@url('/norb-service/damage/updateDamage')
	@post
	updateDamage() { }

	// 查询/damage/queryDamageById
	@url('/norb-service/damage/queryDamageById')
	@get
	queryDamageById() {}

	// ---------------------------------------------------------
	// 施工情况
	@url('/norb-service/measuredInput/queryImplimentationByPage')
	@get
	queryImplimentationByPage() {}
	
	// 增加
	@url('norb-service/implimentation/insertImplimentation')
	@post
	insertImplimentation(){ }

	// 修改
	@url('norb-service/implimentation/updateImplimentation')
	@post
	updateImplimentation(){ }

	// 删除
	@url('norb-service/implimentation/deleteImplimentation')
	@del
	deleteImplimentation() { }

	// 查询
	@url('norb-service/implimentation/queryImplimentationById')
	@get
	queryImplimentationById() { }



	// ------------------------------------------------------------------------
	// 考古发掘
	@url('/norb-service/measuredInput/queryArchaeologyByPage')
	@get
	blurQueryArchaeology() { }

	// 增加
	@url('/norb-service/archaeology/insertArchaeology')
	@post
	insertArchaeology() { }

	// 修改
	@url('/norb-service/archaeology/updateArchaeology')
	@post
	updateArchaeology () { }
	// 删除
	@url('/norb-service/archaeology/deleteArchaeology')
	@del
	deleteArchaeology() { }

	// 查询	
	// @url('/norb-service/archaeology/queryArchaeologyById')
	// @get
	// queryArchaeologyById() { }

	// ------------------------------------------------------------------
	//游客情况
	@url('/norb-service/measuredInput/queryTouristByPage')
	@get
	queryTouristByPage() {}

	// 增加  /tourist/insertTourist
	@url('/norb-service/tourist/insertTourist')
	@post
	insertTourist() {}
	// 修改
	@url('/norb-service/tourist/updateTourist')
	@post
	updateTourist() { }

	// 删除
	@url('/norb-service/tourist/deleteTourist')
	@del
	deleteTourist() { }



	// -----------------------------------------------------------------
	// 其他
	@url('/norb-service/measuredInput/queryOthersByPage')
	@get
	queryOthersByPage() {}

	// 增加 
	@url('/norb-service/other/insertOthers')
	@post
	insertOthers() { }

	// 修改
	@url('/norb-service/other/updateOthers')
	@post
	updateOthers() { }

	// 删除
	@url('/norb-service/other/deleteOthers')
	@del
	deleteOthers() { }


	// 检测报告=========================================================================================
		// 遗产评估

		// 表格数据
		@url('/norb-service/assessment/queryRelicEvaluationByPage')
		@get
		queryRelicEvaluationByPage() { }

		// 上传
		@url('/norb-service/assessment/uploadRelicEvaluation')
		@post
		uploadRelicEvaluation() { }

		// 删除
		@url('/norb-service/assessment/deleteRelicEvaluation')
		@del
		deleteRelicEvaluation() { }

		// 编辑保存
		@url('/norb-service/assessment/updateRelicEvaluation')
		@post
		updateRelicEvaluation() { }

		@url('/norb-service/file/preview')
		@get
		preview() { }
		
		// 下载
		@url('/norb-service/oaApi/file/read/rename')
		@get
		rename() {} 


}();
