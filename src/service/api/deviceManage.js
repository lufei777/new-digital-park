import { get, post, url } from '../axios/ApiDecorator'

class EnergyApi {
  /**
   * 设备详情
   * kind DEVICE
   * id:number
   */
  @url('/vibe-web/app_page/asset')
  @get
  getAsset() { }

  /**
   * 删除设备
   * 传递 ids
   */
  @url('/vibe-web/asset/deleteAsset')
  @get
  deleteAsset() { }

  /**
   * 获取设备维修记录
   * deviceId
   * page:1
   */
  @url('/vibe-web/queryMaintenaceByDeviceId')
  @get
  queryMaintenaceByDeviceId() { }

  /**
   * 获取设备类型list
   * 固定传参
   * id=1
   */
  @url('/vibe-web//asset/assetTypeList')
  @get
  assetTypeList() { }

  /**
   * 设备保管人员
   */
  @url('/vibe-web/user/userNameList')
  @get
  userNameList() { }

  /**
   * 设备使用部门
   */
  @url('/vibe-web/dept/deptList')
  @get
  deptList() { }

  /**
   * 设备维护类型
   */
  @url('/vibe-web/task/maintenaceTypeList')
  @get
  maintenaceTypeList() { }

  /**
   * 获取当前设备专有字段
   * 传参 设备类型
   * typeName: DFWL_DaHua_Camera_yuanqu
   * kind: DEVICE
   */
  @url('/vibe-web/asset/toPropertyDefaultValue')
  @get
  getFormProperty() { }

  /**
   * 删除设备维护记录
   * 传参 ids
   */
  @url('/vibe-web/deleteMaintenace')
  @get
  deleteMaintenace() { }

  /**
   * 查找设备进行编辑
   * 传参 id
   */
  @url('/vibe-web/asset/toDeviceEdit')
  @get
  toDeviceEdit() { }
}

export default new EnergyApi()
