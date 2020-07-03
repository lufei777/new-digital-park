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
   * 绑定电表获取电表列表
   * @param Integer spaceId  空间id
   */
  @url('/oaApi/useElec/getElecMeter')
  @get
  getElecMeter() { }

  /***********  租户用电明细列表  ************ */
  /**
   * 添加电表属性
   * @param monitor  int 电表              
   * @param useType  int 1:自用 2：收费      
   * @param mileage  double 里程                   
   * @param mulPower double  倍率                
   * @param emarks String 备注
   */
  @url('/oaApi/useElec/addMeterElec')
  @post
  addMeterElec() { }

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
   * @param List<Integer> ids
   */
  @url('/oaApi/useElec/updateElecPrice')
  @post
  updateElecPrice() { }
}