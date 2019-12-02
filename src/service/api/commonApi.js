import {get, post, url} from '../axios/ApiDecorator'

class CommonApi {

  //能源列表
  @url("/vibe-web/energy/energy_Type")
  @get
  getEnergyList() {}

  //所有楼层
  @url('/vibe-web/energyCount/energy/energy_A3floor')
  @get
  getAllFloorOfA3(){}

  //空间对比 图
  @url('/vibe-web/energyCount/energy/energy_speceTu')
  @get
  getZoomCompareChart(){}

  //空间对比 表格
  @url('/vibe-web/energyCount/energy/energy_speceBiao')
  @get
  getZoomCompareTable(){}

  //同比环比 图
  @url('/vibe-web/energyCount/energy/energy_comseqTu')
  @get
  getTbhbChart(){}

  //同比环比 表格
  @url('/vibe-web/energyCount/energy/energy_comseqBiao')
  @get
  getTbhbTable(){}

  //分组能源
  @url('/vibe-web/energy/energy_getType')
  @get
  getEnergyListByGroup(){}

  //能耗类型对比 图
  @url('/vibe-web/energyCount/energy/energy_typeTu')
  @get
  getTypeChart(){}

  //能耗类型对比 表格
  @url('/vibe-web/energyCount/energy/energy_typeBiao')
  @get
  getTypeTable(){}

  //2019.8.13
  //获取菜单列表
  @url('/vibe-web/getMenus')
  @get
  getMenus(){}

  @url("/vibe-web/user/login")
  @get
  login(){}

  @url('/vibe-web/getSystemSettings')
  @get
  getSystemSetting(){}

  @url('/vibe-web/statistics/monitor_states_data')
  @get
  getMonitorState(){}

  @url('/vibe-web/asset/initAssetTree')
  @get
  getMonitorTree(){}

  @url('/vibe-web/monitor_data/monitorDataRegression')
  @get
  getCorrelationData(){}

  @url('/vibe-web/statistics/queryAllProbe')
  @get
  getDefaultNode(){}

  @url('/vibe-web/monitor_data/monitorDataCalCompared')
  @get
  getStatisCompareData(){}

  @url('/vibe-web/monitor_data/monitorDataCal')
  @get
  getHistoryStatisData(){}

  @url('/vibe-web/statistics/getMonitorDetails')
  @get
  getDeviceTableData(){}

  @url('/vibe-web/findHandInput')
  @get
  getManMadeCollectList(){}

  @url('/vibe-web/energyCount/energy/getBaseRepresentationNumber')
  @get
  getAutoCollectList(){}

  @url('/vibe-web/energy/meter_tree')
  @get
  getMeterTree(){}

  @url("/vibe-web/energy/queryMeterList")
  @get
  getMeterTable(){}

  @url("/vibe-web/energy/queryMeter")
  @get
  getItemMeterDetail(){}

  @url("/vibe-web/getItemsTree")
  @get
  getEnergyListAll(){}

  @url("/vibe-web/asset/initAssetAllTree")
  @get
  getAssetAllTree(){}

  @url("/vibe-web/energy/updateMeter")
  @get
  updateMeter(){}

  @url('/vibe-web/energy/deleteMeter')
  @get
  deleteMeter(){}

  @url('/vibe-web/asset/assetTypeList')
  @get
  getAssetTypeList(){}

  @url('vibe-web/logList')
  @get
  getLogList(){}

  @url('/vibe-web/dept/treeAllData')
  @get
  getDeptTree(){}

  @url('/vibe-web/user/userList')
  @get
  getUserList(){}

  @url('/vibe-web/user/deleteUser')
  @get
  deleteUser(){}

  @url('/vibe-web/user/toUserEdit')
  @get
  getItemUser(){}

  @url('/vibe-web/role/roleList')
  @get
  getRoleList(){}

  @url('/vibe-web/user/userAdd')
  @get
  addUser(){}

  @url('/vibe-web/dept/deptList')
  @get
  getDepartmentList(){}

  @url('/vibe-web/user/userEdit')
  @get
  editUser(){}

  @url('/vibe-web/role/roleList')
  @get
  getRoleList(){}

  @url('/vibe-web/role/deleteRole')
  @get
  deleteRole(){}

  @url('/vibe-web/dept/queryDeptList')
  @get
  queryDeptList(){}

  @url('/vibe-web/space/spaceList')
  @get
  getSpaceList(){}

  @url('/vibe-web/asset/assetAdd')
  @get
  addSpace(){}

  @url('/vibe-web/asset/deleteAsset')
  @get
  deleteSpace(){}

  @url('/vibe-web/asset/toAssetEdit')
  @get
  getItemSpaceDetail(){}

  @url('/vibe-web/asset/assetEdit')
  @get
  editSpace(){}

  @url('/vibe-web/energy/preview')
  @get
  previewReportData(){}

  @url('/vibe-web/getProbe')
  @get
  getProbe(){}

  @url('/vibe-web/insertHandInput')
  @post
  insertHandInput(){}

  @url('/vibe-web/deleteHandInput')
  @get
  deleteHandInput(){}

  @url('/vibe-web/updateHandInput')
  @post
  updateHandInput(){}

  @url("/vibe-web/dept/toDeptEdit")
  @get
  getDeptDetail(){}
}

export default new CommonApi()

