import { get, post, url } from '../axios/ApiDecorator'

export default new class {
  /**
   * 查询收支记录
   * budgetType  类型 0:收入 1：支出
   * data:{pageNum,list:[]}
   */
  @url('/oaApi/record/getBudgetList')
  @get
  getBudgetList() { }

  /**
   * 获取收支记录的编号
   */
  @url('/oaApi/record/createRecordNum')
  @get
  createRecordNum() { }

  /**
   * 发起收费和支出添加记录
   */
  @url('/oaApi/record/launchBudget')
  @post
  launchBudget() { }

  /**
   * 查询收支记录详情
   * recordId 记录编号  String
   * budgetType   类型 0:收入 1：支出
   */
  @url('/oaApi/record/getBudgetByRecordId')
  @get
  getBudgetByRecordId() { }

  /**
   * 审核人驳回操作
   * recordId    记录编号
   * examineIdea       驳回意见
   */
  @url('/oaApi/record/toReject')
  @get
  recordToReject() { }

  /**
   * 审核人审核操作
   * recordId    记录编号 
   */
  @url('/oaApi/record/toExamine')
  @get
  recordToExamine() { }

  /**
   * 编辑资金状态
   * recordId    记录编号
   */
  @url('/oaApi/record/updateRecordByRecordId')
  @post
  updateRecordByRecordId() { }

  /**
   * 修改资金状态
   * recordId    记录编号
   * moneyState   资金状态 0:未到账 1：已到账 2：已逾期
   */
  @url('/oaApi/record/updateRecord')
  @post
  updateRecord() { }

  /**
   * 删除资金
   * ["SZ-229311847654752256","SZ-229311847654752258"]
   */
  @url('/oaApi/record/deleteRecord')
  @post
  deleteRecord() { }

  /***********  用电管理全部收费  ************ */
  /**
   * 获取收费列表
   * pageNum=1&pageSize=10&code=1
   */
  @url('/oaApi/record/getIncomeRecordList')
  @get
  getIncomeRecordList() { }
  
  /**
   * 获取所欲收费类型编码
   */
  @url('/oaApi/finance/manager/getNoticeType')
  @get
  getNoticeType() { }

  /**
   * 打印用电月账单
   * id=104
   * code=1
   * startTime=2020-02-01
   */
  @url('/oaApi/incomeDetails/getIncomeDetailsElecId')
  @get
  getIncomeDetailsElecId() { }
}