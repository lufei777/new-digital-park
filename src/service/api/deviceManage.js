import { get, post, url } from '../axios/ApiDecorator'

class EnergyApi {
  /**
   * 设备列表
   * url arg  page
   * post arg {
            "assetVo":{
                    "id": 808,//编号，可传可不传
                      "name": "_SHEB_710",//名称，可传可不传
                      "caption": "B1-304排风机房",//标题，可传可不传
                      "kind":"DEVICE"//设备类型，必传字段
                  },
            "catalogs":[8000],//分类数组，可传可不传
            "spaceIds":[39]//空间数组，可传可不传
          }
   */
  @url('/vibe-web/findAsset/searchDevices')
  @post
  searchDevices() { }

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
   * id=1
   *  0:SPACE,
      1:DEVICE,
      2:SERVICE,
      3:PROBE,
      4:CONTROL
   */
  @url('/vibe-web/asset/assetTypeList')
  @get
  assetTypeList() { }

  /**
   * 查询资产类别
   * 固定传参
   */
  @url('/vibe-web/asset/assetKindList')
  @get
  assetKindList() { }

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

  /**
   * 资产服务列表
   * 传参 id 资产ID
   */
  @url('/vibe-web/asset/serviceList')
  @get
  serviceList() { }

  /**
   * 资产新增时服务列表
   * 传参 id 资产ID
   */
  @url('/vibe-web/asset/addServiceList')
  @get
  addServiceList() { }
  
  /**
   * 新增资产获取资产默认值
   * kind init  0:SPACE,
                1:DEVICE,
                2:SERVICE,
                3:PROBE,
                4:CONTROL
      typeName String 类型名称
      parentid Int 父级id
   */
  @url('/vibe-web/asset/toAssetAdd')
  @get
  toAssetAdd() { }

  /**
   * 编辑资产获取资产详情
   * url/{id}
   * kind string  SPACE,
                  DEVICE,
                  SERVICE,
                  PROBE,
                  CONTROL
   */
  @url('/vibe-web/asset/toAssetEdit')
  @get
  toAssetEdit() { }

  /**
   * 获取设备列表
   * url/{id}
   * */
  @url('/vibe-web//asset/queryAssetList')
  @get
  queryAssetList() { }

  /**
   * 获取监测器分类
   * catalog=2001，参数固定2001
   * {
   *  name
   *  id
   * }
   * */
  @url('/vibe-web/asset/queryMonitorCatalogId')
  @get
  queryMonitorCatalogId() { }
}

export default new EnergyApi()
