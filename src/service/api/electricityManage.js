import { get, post, url } from '../axios/ApiDecorator'

export default new class {

  /***********  用电基础数据  ************ */

  /***********  租户用电数据  ************ */
  /**
   * 租户用电数据列表查询
   * @param pageNum
   * @param pageSize
   * @param contractNumber 合同编号
   * @param tenantNumber 租户编号
   */
  @url('/oaApi/useElec/selectTenantUseElecList')
  @get
  selectTenantUseElecList() { }

  /**
   * 删除租户用电数据
   * @param List<Integer> ids
   */
  @url('/oaApi/useElec/deleteTenantUseElec')
  @post
  deleteTenantUseElec() { }

  /**
   * 新增租户用电数据
   * @param contractNumber 合同编号
   * @param tenantNumber   租户编号
   * @param proportion     用电所占比例
   */
  @url('/oaApi/useElec/addTenantUseElec')
  @post
  addTenantUseElec() { }

  /**
   * 根据id获取租户用电数据信息
   * @param int  id  租户用电数据id
   */
  @url('/oaApi/useElec/selectTenantUseElecByid')
  @get
  selectTenantUseElecByid() { }

  /**
   * 绑定电表接口
   * @param Integer id   租户用电id
   * @param List<Integer> monitors  电表
   */
  @url('/oaApi/useElec/bindingTenantOfElec')
  @post
  bindingTenantOfElec() { }

  /**
   * 解绑电表接口
   * @param Integer id   租户用电id
   * @param List<Integer> monitors  电表
   */
  @url('/oaApi/useElec/relieveTenantOfElec')
  @post
  relieveTenantOfElec() { }

  /**
   * 绑定电表获取电表列表
   * @param Integer spaceId  空间id
   */
  @url('/oaApi/useElec/getElecMeter')
  @get
  getElecMeter() { }

  /***********  租户用电明细列表  ************ */
  /**
   * 租户电表明细列表
   * @param pageNum
   * @param pageSize
   * @param useType 1:自用 2：收费
   * @param monitorNum 电表号（）
   * @param monitorName 电表名
   * @param spaceId 空间
   */
  @url('/oaApi/useElec/selectMeterElecList')
  @get
  selectMeterElecList() { }

  /**
   * 添加电表属性
   * @param [2,3] 单数组
   */
  @url('/oaApi/useElec/deleteMeterElec')
  @post
  deleteMeterElec() { }

  /**
   * 删除电表属性
   * @param monitor  int 电表              
   * @param useType  int 1:自用 2：收费      
   * @param mileage  double 里程                   
   * @param mulPower double  倍率                
   * @param emarks String 备注
   */
  @url('/oaApi/useElec/addMeterElec')
  @post
  addMeterElec() { }
  /**参数同新增 */
  @url('/oaApi/useElec/updateMeterElecById')
  @post
  updateMeterElecById() { }

  /**
   * 添加电表属性
   * @param int spaceId 空间id
   */
  @url('/oaApi/useElec/getElecMeterProbe')
  @get
  getElecMeterProbe() { }

  /**
   * 根据id查询电表明细详情
   * @param int id
   */
  @url('/oaApi/useElec/selectMeterElecById')
  @get
  selectMeterElecById() { }

  /***********  电价维护  ************ */
  /**
   * 设置电表价格
   * @param List<Integer> ids
   */
  @url('/oaApi/useElec/setElecPrice')
  @post
  setElecPrice() { }

  /**
   * 电表价格列表
   * @param pageNum
   * @param pageSize                     
   * @param startTime String 开始时间       
   * @param endTime String 结束时间
   */
  @url('/oaApi/useElec/selectElecPriceList')
  @get
  selectElecPriceList() { }

  /**
   * 删除电表价格记录 批量或一条
   * @param List<Integer> ids
   */
  @url('/oaApi/useElec/deleteElecPrice')
  @post
  deleteElecPrice() { }

  /**
   * 修改电表价格记录
   *{
   *    "id":1,  id唯一标识
   *    "price":12, 电价
   *    "peakPrice":12, 尖峰电价
   *    "flayPrice":12, 平段电价
   *    "valleyPrice":12, 谷段电价
   *    "surcharge":23, 附加费
   *    "remarks":"备注",
   *    "startTime":"2020-02-12",
   *    "endTime":"2020-12-23"
   *}
   */
  @url('/oaApi/useElec/updateElecPrice')
  @post
  updateElecPrice() { }


  /***********  电表抄表记录  ************ */
  /**
   * 抄表记录列表
   * Integer pageNum 
   * Integer pageSize 
   * Integer year 年份 非必填
   * Integer month 月 非必填
   * String monitorNum  电表号 非必填
   * Integer status 数据状态 审核状态 非必填
   * Integer useType 1:自用 2：收费 非必填
   */
  @url('/oaApi/readMeter/selectReadMeterRecord')
  @get
  selectReadMeterRecord() { }

  /**
   * 添加抄表记录
   * {
   *     "monitor":236546,
   *     "year":2020,
   *     "month":3
   *     "readTime":"",
   *     "lastIndication":2020,//上次示数
   *     "indication":6362,//本次示数
   *     "diffNum":245,//抄表见量
   *     "useElecMonth":245,//月用电量
   *     "reader":" 抄表人",
   *     "remarks":"备注"
   * }
   */
  @url('/oaApi/readMeter/addReadMeterRecord')
  @post
  addReadMeterRecord() { }
  @url('/oaApi/readMeter/updateReadMeterRecord')
  @post
  updateReadMeterRecord() { }

  /**
   * 抄表记录审核
   * recordId=YDCB-269929290743676928
   * status=2
   * examineIdea=驳回
   */
  @url('/oaApi/examineElec/readMeterToExamine')
  @get
  readMeterToExamine() { }

  /**
   * 根据电表id获取电表信息
   *  monitor  int
   */
  @url('/oaApi/readMeter/getElecMeterInfo')
  @get
  getElecMeterInfo() { }

  /**
   * 根据电表id删除电表
   *  int array
   */
  @url('/oaApi/readMeter/deleteReadMeterRecord')
  @post
  deleteReadMeterRecord() { }

  /***********  用电收费明细  ************ */
  /**
   * 用电收费明细列表
   * Integer pageNum 
   * Integer pageSize 
   * Integer year 年份 非必填
   * Integer month 月 非必填
   * String contractNumber 合同编号
   * String tenantNumber 租户编号
   */
  @url('/oaApi/readMeter/getChargeDetailsList')
  @get
  getChargeDetailsList() { }

  /**
   * 用电收费审核生成账单
   * Integer id 
   * Integer detailsStatus  2:通过 3：驳回
   * String examineIdea 审核意见
   */
  @url('/oaApi/examineElec/useElecExamine')
  @get
  useElecExamine() { }

  /**
   * 用电月账单
   * Integer pageNum 
   * Integer pageSize 
   * Integer year 年份 非必填
   * Integer month 月 非必填          
   * Integer number  显示月份 非必填
   */
  @url('/oaApi/readMeter/getElecDetailsMonthList')
  @get
  getElecDetailsMonthList() { }

  /**
   * 打印用电月账单
   * Integer year 年份 非必填
   * Integer month 月 非必填          
   * Integer number  显示月份 非必填
   */
  @url('/oaApi/readMeter/exportElecDetailsMonthList')
  @get
  exportElecDetailsMonthList() { }
}