import router from '@/router'
import axios from 'axios'
import store from '@/vuex/store';
class commonFun {
  menuData = {
    "id": 1,
    "parent": 0,
    "name2": "space",
    "name": "根节点\t",
    "catalog": null,
    "routeAddress": null,
    "sequence": 1,
    "icon": 'iconshouye',
    "permisionList": [],
    "childNode": [{
      "id": 11,
      "parent": 1,
      "name2": "space",
      "name": "概览",
      "catalog": null,
      "routeAddress": "/energy/homePage",
      "sequence": 1,
      "icon": 'iconshouye',
      "permisionList": ["首页"],
      "childNode": []
    }, {
      "id": 2,
      "parent": 1,
      "name2": "space",
      "name": "能耗展示",
      "catalog": null,
      "routeAddress": "/energy/timeEnergy",
      "sequence": 1,
      "icon": 'iconshouye',
      "permisionList": [],
      "childNode": [{
        "id": 21,
        "parent": 2,
        "name2": "space",
        "name": "分时能耗",
        "catalog": null,
        "routeAddress": "/energy/timeEnergy",
        "sequence": 1,
        "icon": '',
        "permisionList": ["分时能耗"],
        "childNode": []
      }, {
        "id": 22,
        "parent": 2,
        "name2": "space",
        "name": "分项能耗",
        "catalog": null,
        "routeAddress": "/energy/categoryEnergy",
        "sequence": 2,
        "icon": '',
        "permisionList": ["分项能耗"],
        "childNode": []
      }, {
        "id": 23,
        "parent": 2,
        "name2": "space",
        "name": "能耗排名",
        "catalog": null,
        "routeAddress": "/energy/rankEnergy",
        "sequence": 3,
        "icon": '',
        "permisionList": ["能耗排名"],
        "childNode": []
      }]
    }, {
      "id": 3,
      "parent": 1,
      "name2": "space",
      "name": "统计分析",
      "catalog": null,
      "routeAddress": "/deviceAnalysis",
      "sequence": 2,
      "icon": 'iconshouye',
      "permisionList": [],
      "childNode": [{
        "id": 31,
        "parent": 3,
        "name2": "space",
        "name": "设备分析",
        "catalog": null,
        "routeAddress": "/deviceAnalysis",
        "sequence": 1,
        "icon": '',
        "permisionList": ["设备状态分析"],
        "childNode": []
      }, {
        "id": 32,
        "parent": 3,
        "name2": "space",
        "name": "相关性分析",
        "catalog": null,
        "routeAddress": "/correlationAnalysis",
        "sequence": 2,
        "icon": '',
        "permisionList": ["相关分析"],
        "childNode": []
      }, {
        "id": 33,
        "parent": 3,
        "name2": "space",
        "name": "统计对比",
        "catalog": null,
        "routeAddress": "/statisCompare",
        "sequence": 3,
        "icon": '',
        "permisionList": ["统计对比"],
        "childNode": []
      }, {
        "id": 34,
        "parent": 3,
        "name2": "space",
        "name": "往期统计",
        "catalog": null,
        "routeAddress": "/historyStatis",
        "sequence": 4,
        "icon": '',
        "permisionList": ["往期统计"],
        "childNode": []
      }, {
        "id": 35,
        "parent": 3,
        "name2": "space",
        "name": "能耗对比分析",
        "catalog": null,
        "routeAddress": "/energy/compare",
        "sequence": 5,
        "icon": '',
        "permisionList": [],
        "childNode": [{
          "id": 36,
          "parent": 35,
          "name2": "space",
          "name": "空间对比",
          "catalog": null,
          "routeAddress": "/energy/zoomCompare",
          "sequence": 1,
          "icon": '',
          "permisionList": ["空间对比"],
          "childNode": []
        }, {
          "id": 37,
          "parent": 35,
          "name2": "space",
          "name": "同比环比分析",
          "catalog": null,
          "routeAddress": "/energy/tbhbAnalysis",
          "sequence": 2,
          "icon": '',
          "permisionList": ["同比环比分析"],
          "childNode": []
        }, {
          "id": 38,
          "parent": 35,
          "name2": "space",
          "name": "能耗类型对比",
          "catalog": null,
          "routeAddress": "/energy/typeCompare",
          "sequence": 3,
          "icon": '',
          "permisionList": ["能耗类型对比"],
          "childNode": []
        }]
      }]
    }, {
      "id": 4,
      "parent": 1,
      "name2": "space",
      "name": "节能诊断",
      "catalog": null,
      "routeAddress": "/energy/waterDiffer",
      "sequence": 3,
      "icon": 'iconshouye',
      "permisionList": [],
      "childNode": [{
        "id": 41,
        "parent": 4,
        "name2": "space",
        "name": "水量异常突增诊断",
        "catalog": null,
        "routeAddress": "/energy/waterDiffer",
        "sequence": 1,
        "icon": '',
        "permisionList": ["水量异常突增诊断"],
        "childNode": []
      }, {
        "id": 42,
        "parent": 4,
        "name2": "space",
        "name": "夜间用水跑冒滴漏诊断",
        "catalog": null,
        "routeAddress": "/energy/nightWater",
        "sequence": 2,
        "icon": '',
        "permisionList": ["夜间用水跑冒滴漏诊断"],
        "childNode": []
      }, {
        "id": 43,
        "parent": 4,
        "name2": "space",
        "name": "用电量异常突增诊断",
        "catalog": null,
        "routeAddress": "/energy/elecDiffer",
        "sequence": 3,
        "icon": '',
        "permisionList": ["用电量异常突增诊断"],
        "childNode": []
      }, {
        "id": 44,
        "parent": 4,
        "name2": "space",
        "name": "夜间用电浪费诊断",
        "catalog": null,
        "routeAddress": "/energy/nightElec",
        "sequence": 4,
        "icon": '',
        "permisionList": ["夜间用电浪费诊断"],
        "childNode": []
      }, {
        "id": 45,
        "parent": 4,
        "name2": "space",
        "name": "电流向及线损分析",
        "catalog": null,
        "routeAddress": "/energy/elecAnalysis",
        "sequence": 5,
        "icon": '',
        "permisionList": ["电流向及线损分析"],
        "childNode": []
      }]
    }, {
      "id": 5,
      "parent": 1,
      "name2": "space",
      "name": "人工采集",
      "catalog": null,
      "routeAddress": "/manMadeCollect",
      "sequence": 4,
      "icon": 'iconshouye',
      "permisionList": ["人工采集"],
      "childNode": [{
        "id": 71,
        "parent": 7,
        "name2": "space",
        "name": "人工采集列表",
        "catalog": null,
        "routeAddress": "/manMadeCollect",
        "sequence": 1,
        "icon": '',
        "permisionList": ["空间报表查看"],
        "childNode": []
      }, {
        "id": 72,
        "parent": 7,
        "name2": "space",
        "name": "自动采集列表",
        "catalog": null,
        "routeAddress": "/autoCollect",
        "sequence": 2,
        "icon": '',
        "permisionList": ["分项报表查看"],
        "childNode": []
      }]
    }, {
      "id": 6,
      "parent": 1,
      "name2": "space",
      "name": "设备表计",
      "catalog": null,
      "routeAddress": "/deviceRecord",
      "sequence": 5,
      "icon": 'iconshouye',
      "permisionList": ["设备表记查看", "设备表导入"],
      "childNode": []
    }, {
      "id": 7,
      "parent": 1,
      "name2": "space",
      "name": "数据报表",
      "catalog": null,
      "routeAddress": "/spaceReport",
      "sequence": 6,
      "icon": 'iconshouye',
      "permisionList": [],
      "childNode": [{
        "id": 71,
        "parent": 7,
        "name2": "space",
        "name": "空间能耗报表",
        "catalog": null,
        "routeAddress": "/spaceReport",
        "sequence": 1,
        "icon": '',
        "permisionList": ["空间报表查看"],
        "childNode": []
      }, {
        "id": 72,
        "parent": 7,
        "name2": "space",
        "name": "分项能耗报表",
        "catalog": null,
        "routeAddress": "/categoryReport",
        "sequence": 2,
        "icon": '',
        "permisionList": ["分项报表查看"],
        "childNode": []
      }]
    }, {
      "id": 10,
      "parent": 1,
      "name2": "space",
      "name": "系统管理",
      "catalog": null,
      "routeAddress": "/userManage",
      "sequence": 8,
      "icon": 'iconshouye',
      "permisionList": [],
      "childNode": [{
        "id": 101,
        "parent": 10,
        "name2": "space",
        "name": "用户管理",
        "catalog": null,
        "routeAddress": "/userManage",
        "sequence": 1,
        "icon": '',
        "permisionList": ["用户查看", "添加用户", "修改用户", "重置密码", "导出用户信息"],
        "childNode": []
      }, {
        "id": 104,
        "parent": 10,
        "name2": "space",
        "name": "角色管理",
        "catalog": null,
        "routeAddress": "/roleManage",
        "sequence": 2,
        "icon": '',
        "permisionList": ["角色查询", "角色修改", "角色添加", "角色删除"],
        "childNode": []
      }, {
        "id": 102,
        "parent": 10,
        "name2": "space",
        "name": "组织机构",
        "catalog": null,
        "routeAddress": "/departmentManage",
        "sequence": 3,
        "icon": '',
        "permisionList": ["组织机构查看", "组织机构添加", "组织机构修改", "组织机构删除"],
        "childNode": []
      }, {
        "id": 103,
        "parent": 10,
        "name2": "space",
        "name": "空间管理",
        "catalog": null,
        "routeAddress": "/spaceManage",
        "sequence": 4,
        "icon": '',
        "permisionList": ["空间查看", "空间添加", "空间修改", "空间删除"],
        "childNode": []
      }, {
        "id": 105,
        "parent": 10,
        "name2": "space",
        "name": "操作日志",
        "catalog": null,
        "routeAddress": "/operatorLog",
        "sequence": 6,
        "icon": '',
        "permisionList": ["日志查看"],
        "childNode": []
      }]
    }]
  }

  incomeList = [{
    name: "代收款项",
    id: 1,
    unit: "元",
    value: 350000,
  }, {
    name: "经营收入",
    id: 2,
    unit: "元",
    value: 46000,
  }, {
    name: "财务收入",
    id: 3,
    unit: "元",
    value: 38000,
  }, {
    name: "主收入收款",
    id: 4,
    unit: "元",
    value: 39000,
  }]

  deviceStatusList = [{
    name: "正常",
    id: 1,
    value: 520,
  }, {
    name: "未知",
    id: 2,
    value: 310,
  }, {
    name: "警告",
    id: 3,
    value: 200,
  }, {
    name: "错误",
    id: 4,
    value: 300,
  }]

  cleaningManageData = [{
    taskName: "显示器打扫",
    id: 8,
    taskType: "房屋保洁",
    executeMethod: "临时保洁",
    completeStatus: "待完成",
    principal: "李祥祥",
    startTime: "2019-12-12",
    remark: "2019-12-12已完成"
  }, {
    taskName: "活动区打扫",
    id: 1,
    taskType: "园区保洁",
    executeMethod: "临时保洁",
    completeStatus: "待完成",
    principal: "李祥祥",
    startTime: "2019-12-12",
    remark: "2019-12-12已完成"
  }, {
    taskName: "办公室打扫",
    id: 2,
    taskType: "房屋保洁",
    executeMethod: "周期保洁",
    completeStatus: "待完成",
    principal: "关艳爽",
    startTime: "2019-12-12",
    remark: "2019-12-12已完成"
  }, {
    taskName: "显示器打扫",
    id: 3,
    taskType: "设备保洁",
    executeMethod: "周期保洁",
    completeStatus: "待完成",
    principal: "李祥祥",
    startTime: "2019-12-12",
    remark: "2019-12-12已完成"
  }, {
    taskName: "显示器打扫",
    id: 4,
    taskType: "设备保洁",
    executeMethod: "周期保洁",
    completeStatus: "待完成",
    principal: "关艳爽",
    startTime: "2019-12-12",
    remark: "2019-12-12已完成"
  }, {
    taskName: "显示器打扫",
    id: 5,
    taskType: "设备保洁",
    executeMethod: "临时保洁",
    completeStatus: "待完成",
    principal: "关艳爽",
    startTime: "2019-12-12",
    remark: "2019-12-12已完成"
  }, {
    taskName: "办公室打扫",
    id: 6,
    taskType: "房屋保洁",
    executeMethod: "周期保洁",
    completeStatus: "待完成",
    principal: "关艳爽",
    startTime: "2019-12-12",
    remark: "2019-12-12已完成"
  }, {
    taskName: "活动区打扫",
    id: 7,
    taskType: "园区保洁",
    executeMethod: "临时保洁",
    completeStatus: "待完成",
    principal: "李祥祥",
    startTime: "2019-12-12",
    remark: "2019-12-12已完成"
  }, {
    taskName: "办公室打扫",
    id: 9,
    taskType: "房屋保洁",
    executeMethod: "临时保洁",
    completeStatus: "待完成",
    principal: "小何",
    startTime: "2019-12-12",
    remark: "2019-12-12已完成"
  }, {
    taskName: "显示器打扫",
    id: 10,
    taskType: "设备保洁",
    executeMethod: "临时保洁",
    completeStatus: "待完成",
    principal: "小何",
    startTime: "2019-12-12",
    remark: "2019-12-12已完成"
  }]


  regionSetData = [{
    regionName: "办公室",
    id: 1,
    regionType: "房屋",
    executeMethod: "周期保洁",
    regionNature: "自有",
    principal: "李祥祥",
    startTime: "2019-12-12",
    remark: "我是备注"
  }, {
    regionName: "办公室",
    id: 2,
    regionType: "房屋",
    executeMethod: "周期保洁",
    regionNature: "自有",
    principal: "李祥祥",
    startTime: "2019-12-12",
    remark: "我是备注"
  }, {
    regionName: "办公室",
    id: 3,
    regionType: "房屋",
    executeMethod: "周期保洁",
    regionNature: "自有",
    principal: "李祥祥",
    startTime: "2019-12-12",
    remark: "我是备注"
  }, {
    regionName: "办公室",
    id: 4,
    regionType: "房屋",
    executeMethod: "周期保洁",
    regionNature: "自有",
    principal: "李祥祥",
    startTime: "2019-12-12",
    remark: "我是备注"
  }, {
    regionName: "办公室",
    id:5,
    regionType: "房屋",
    executeMethod: "周期保洁",
    regionNature: "自有",
    principal: "李祥祥",
    startTime: "2019-12-12",
    remark: "我是备注"
  }, {
    regionName: "办公室",
    id: 6,
    regionType: "房屋",
    executeMethod: "周期保洁",
    regionNature: "自有",
    principal: "李祥祥",
    startTime: "2019-12-12",
    remark: "我是备注"
  }, {
    regionName: "办公室",
    id: 7,
    regionType: "房屋",
    executeMethod: "周期保洁",
    regionNature: "自有",
    principal: "李祥祥",
    startTime: "2019-12-12",
    remark: "我是备注"
  }, {
    regionName: "办公室",
    id: 8,
    regionType: "房屋",
    executeMethod: "周期保洁",
    regionNature: "自有",
    principal: "李祥祥",
    startTime: "2019-12-12",
    remark: "我是备注"
  }, {
    regionName: "办公室",
    id: 9,
    regionType: "房屋",
    executeMethod: "周期保洁",
    regionNature: "自有",
    principal: "李祥祥",
    startTime: "2019-12-12",
    remark: "我是备注"
  }]


  costManageData = [{
    id: 1,
    costName: "十二月维修费",
    costType: "维修费",
    costSum: "1000元",
    costStatus: "待审核",
    reportTime: "2019-12-12",
    costCause: "房屋维修",
    reportPeople: "李祥祥",
    approver: "柏乐",
    operationTime: "2019-12-13"
  }, {
    id: 2,
    costName: "十二月打车费",
    costType: "打车费",
    costSum: "100元",
    costStatus: "待拨付",
    reportTime: "2019-10-12",
    costCause: "加班打车",
    reportPeople: "李祥祥",
    approver: "柏乐",
    operationTime: "2019-11-13"
  }, {
    id: 3,
    costName: "十二月住宿费",
    costType: "住宿费",
    costSum: "300元",
    costStatus: "已驳回",
    reportTime: "2019-12-05",
    costCause: "出差住宿",
    reportPeople: "景杰",
    approver: "柏乐",
    operationTime: "2019-12-20"
  }, {
    id: 4,
    costName: "十二月维修费",
    costType: "维修费",
    costSum: "1000元",
    costStatus: "待拨付",
    reportTime: "2019-12-01",
    costCause: "房屋维修",
    reportPeople: "李祥祥",
    approver: "柏乐",
    operationTime: "2019-12-28"
  }, {
    id: 5,
    costName: "十二月住宿费",
    costType: "住宿费",
    costSum: "300元",
    costStatus: "已拨付",
    reportTime: "2019-12-01",
    costCause: "出差住宿",
    reportPeople: "刘晓航",
    approver: "刘振刚",
    operationTime: "2019-12-15"
  }, {
    id: 6,
    costName: "十二月打车费",
    costType: "打车费",
    costSum: "50元",
    costStatus: "待拨付",
    reportTime: "2019-12-01",
    costCause: "加班打车",
    reportPeople: "宁盼盼",
    approver: "陈秀军",
    operationTime: "2019-12-15"
  }, {
    id: 7,
    costName: "十二月维修费",
    costType: "维修费",
    costSum: "1000元",
    costStatus: "待审核",
    reportTime: "2019-12-12",
    costCause: "房屋维修",
    reportPeople: "赵晓明",
    approver: "陈秀军",
    operationTime: "2019-12-13"
  }, {
    id: 7,
    costName: "十一月餐费",
    costType: "餐费",
    costSum: "6000元",
    costStatus: "已拨付",
    reportTime: "2019-11-01",
    costCause: "公司餐费",
    reportPeople: "程琳",
    approver: "柳燕",
    operationTime: "2019-12-13"
  }]


  budgetManageData = [{
    id: 1,
    budgetName: "十二月维修费",
    budgetType: "维修费",
    budgetSum: "1500元",
    budgetStatus: "未审核",
    reportTime: "2019-12-01",
    budgetCause: "房屋维修",
    reportPeople: "陈秀军",
    approver: "柳燕",
    operationTime: "2019-12-15"
  }, {
    id: 2,
    budgetName: "十二月打车费",
    budgetType: "打车费",
    budgetSum: "200元",
    budgetStatus: "待拨付",
    reportTime: "2019-12-05",
    budgetCause: "加班打车",
    reportPeople: "何炎东",
    approver: "柳艳新",
    operationTime: "2019-12-20"
  }, {
    id: 3,
    budgetName: "十二月住宿费",
    budgetType: "住宿费",
    budgetSum: "300元",
    budgetStatus: "未审核",
    reportTime: "2019-12-05",
    budgetCause: "出差住宿",
    reportPeople: "景杰",
    approver: "程琳",
    operationTime: "2019-12-20"
  }, {
    id: 4,
    budgetName: "十一月维修费",
    budgetType: "维修费",
    budgetSum: "3000元",
    budgetStatus: "待审核",
    reportTime: "2019-11-01",
    budgetCause: "空调维修",
    reportPeople: "程琳",
    approver: "柳艳新",
    operationTime: "2019-11-15"
  }, {
    id: 5,
    budgetName: "十一月住宿费",
    budgetType: "住宿费",
    budgetSum: "300元",
    budgetStatus: "待审核",
    reportTime: "2019-11-01",
    budgetCause: "出差住宿",
    reportPeople: "陈秀军",
    approver: "程琳",
    operationTime: "2019-11-15"
  }, {
    id: 6,
    budgetName: "十月打车费",
    budgetType: "打车费",
    budgetSum: "50元",
    budgetStatus: "已拨付",
    reportTime: "2019-10-01",
    budgetCause: "加班打车",
    reportPeople: "何炎东",
    approver: "程琳",
    operationTime: "2019-10-15"
  }, {
    id: 7,
    budgetName: "九月餐费",
    budgetType: "餐费",
    budgetSum: "6000元",
    budgetStatus: "已拨付",
    reportTime: "2019-08-30",
    budgetCause: "公司餐费",
    reportPeople: "程琳",
    approver: "柳艳新",
    operationTime: "2019-09-02"
  }]

  invoiceManageData = [{
    id: 1,
    invoiceName: "十二月打车费",
    invoiceType: "打车费",
    invoiceSum: "300元",
    invoiceStatus: "待审核",
    reportTime: "2019-12-01",
    invoiceCause: "加班打车",
    reportPeople: "李祥祥",
    approver: "程琳",
    operationTime: "2019-12-15"
  }, {
    id: 2,
    invoiceName: "十一月餐费",
    invoiceType: "餐费",
    invoiceSum: "6000元",
    invoiceStatus: "已拨付",
    reportTime: "2019-10-25",
    invoiceCause: "公司订餐",
    reportPeople: "程琳",
    approver: "柳艳新",
    operationTime: "2019-11-01"
  }, {
    id: 3,
    invoiceName: "十一月住宿费",
    invoiceType: "住宿费",
    invoiceSum: "200元",
    invoiceStatus: "待拨付",
    reportTime: "2019-11-01",
    invoiceCause: "出差住宿",
    reportPeople: "陈秀军",
    approver: "程琳",
    operationTime: "2019-11-15"
  }, {
    id: 4,
    invoiceName: "十一月维修费",
    invoiceType: "维修费",
    invoiceSum: "1100元",
    invoiceStatus: "已拨付",
    reportTime: "2019-11-01",
    invoiceCause: "空调维修",
    reportPeople: "程琳",
    approver: "柳艳新",
    operationTime: "2019-11-15"
  }]

  receiveSupportManageData = [{
    id: 1,
    incomeName: "十一月房租",
    incomeType: "房租",
    incomeSum: "20000元",
    creditTime: "2019-12-10",
    payer: "李祥祥",
    recorder: "程琳",
    incomeCause: "缴纳的房租"
  }, {
    id: 1,
    incomeName: "十一月房租",
    incomeType: "房租",
    incomeSum: "23000元",
    creditTime: "2019-12-10",
    payer: "何炎东",
    recorder: "程琳",
    incomeCause: "缴纳的房租"
  }, {
    id: 1,
    incomeName: "十月房租",
    incomeType: "房租",
    incomeSum: "20000元",
    creditTime: "2019-11-10",
    payer: "李祥祥",
    recorder: "程琳",
    incomeCause: "缴纳的房租"
  }, {
    id: 1,
    incomeName: "十月房租",
    incomeType: "房租",
    incomeSum: "23000元",
    creditTime: "2019-11-10",
    payer: "何炎东",
    recorder: "程琳",
    incomeCause: "缴纳的房租"
  }, {
    id: 1,
    incomeName: "九月房租",
    incomeType: "房租",
    incomeSum: "20000元",
    creditTime: "2019-10-10",
    payer: "李祥祥",
    recorder: "程琳",
    incomeCause: "缴纳的房租"
  }]

  chargeManageData = [{
    id: 1,
    chargeName: "十一月房租",
    chargeType: "房租",
    chargeSum: "30000",
    reportTime: "2019-12-10",
    paymentStatus: "待缴费",
    registerpeople: "李祥祥",
    chargeCause: "缴纳的房租"
  }, {
    id: 2,
    chargeName: "十一月房租",
    chargeType: "房租",
    chargeSum: "20000",
    reportTime: "2019-12-10",
    paymentStatus: "待缴费",
    registerpeople: "何炎东",
    chargeCause: "缴纳的房租"
  }, {
    id: 1,
    chargeName: "十月房租",
    chargeType: "房租",
    chargeSum: "30000",
    reportTime: "2019-11-10",
    paymentStatus: "已缴费",
    registerpeople: "李祥祥",
    chargeCause: "缴纳的房租"
  }, {
    id: 1,
    chargeName: "十月房租",
    chargeType: "房租",
    chargeSum: "20000",
    reportTime: "2019-11-10",
    paymentStatus: "已缴费",
    registerpeople: "何炎东",
    chargeCause: "缴纳的房租"
  }]

  expensesBudgetData = [{
    id: 1,
    budgetName: "十二月维修费",
    budgetType: "维修费",
    budgetSum: "1000元",
    budgetStatus: "未审核",
    reportTime: "2019-12-10",
    budgetCause: "房屋维修",
    reportPeople: "李祥祥",
    approver: "程琳",
    operationTime: "2019-12-10"
  }, {
    id: 2,
    budgetName: "十二月维修费",
    budgetType: "维修费",
    budgetSum: "1000元",
    budgetStatus: "未审核",
    reportTime: "2019-12-10",
    budgetCause: "房屋维修",
    reportPeople: "李祥祥",
    approver: "程琳",
    operationTime: "2019-12-10"
  }, {
    id: 3,
    budgetName: "十二月维修费",
    budgetType: "维修费",
    budgetSum: "1000元",
    budgetStatus: "未审核",
    reportTime: "2019-12-10",
    budgetCause: "房屋维修",
    reportPeople: "李祥祥",
    approver: "程琳",
    operationTime: "2019-12-10"
  }]

  payApplicationData = [{
    id: 1,
    applicationName: "十二月维修费",
    costType: "维修费",
    paySum: "1000元",
    costStatus: "未审核",
    reportTime: "2019-12-01",
    payCause: "房屋维修",
    reportPeople: "李祥祥",
    approver: "程琳",
    operationTime: "2019-12-15"
  }, {
    id: 2,
    applicationName: "十二月餐费",
    costType: "餐费",
    paySum: "6000元",
    costStatus: "待拨付",
    reportTime: "2019-11-25",
    payCause: "公司餐费",
    reportPeople: "程琳",
    approver: "柳艳新",
    operationTime: "2019-12-01"
  }, {
    id: 3,
    applicationName: "十二月打车费",
    costType: "打车费",
    paySum: "100元",
    costStatus: "待拨付",
    reportTime: "2019-12-01",
    payCause: "加班打车",
    reportPeople: "何炎东",
    approver: "程琳",
    operationTime: "2019-12-15"
  }, {
    id: 4,
    applicationName: "十一月住宿费",
    costType: "住宿费",
    paySum: "500元",
    costStatus: "已拨付",
    reportTime: "2019-11-01",
    payCause: "出差住宿",
    reportPeople: "刘振刚",
    approver: "程琳",
    operationTime: "2019-11-15"
  }, {
    id: 5,
    applicationName: "十月订餐费",
    costType: "订餐费",
    paySum: "6000元",
    costStatus: "已拨付",
    reportTime: "2019-09-25",
    payCause: "公司订餐",
    reportPeople: "程琳",
    approver: "柳艳新",
    operationTime: "2019-10-15"
  }, {
    id: 6,
    applicationName: "十月打车费",
    costType: "打车费",
    paySum: "50元",
    costStatus: "已拨付",
    reportTime: "2019-10-01",
    payCause: "加班打车",
    reportPeople: "李祥祥",
    approver: "程琳",
    operationTime: "2019-10-15"
  }]

  purchaseApplicationData = [{
    id: 1,
    applicationName: "空调采购",
    purchaseType: "供应商采购",
    purchaseSum: "5000元",
    purchaseStatus: "待采购",
    reportTime: "2019-12-01",
    purchasePeople: "程琳",
    recorder: "程琳",
    remark: "装修需要"
  }, {
    id: 2,
    applicationName: "笔记本采购",
    purchaseType: "公司内部采购",
    purchaseSum: "10000元",
    purchaseStatus: "待采购",
    reportTime: "2019-12-01",
    purchasePeople: "程琳",
    recorder: "程琳",
    remark: "公司需要"
  }, {
    id: 3,
    applicationName: "零食采购",
    purchaseType: "公司内部采购",
    purchaseSum: "2000元",
    purchaseStatus: "待采购",
    reportTime: "2019-12-01",
    purchasePeople: "程琳",
    recorder: "程琳",
    remark: "公司小零食"
  }, {
    id: 4,
    applicationName: "座椅采购",
    purchaseType: "公司内部采购",
    purchaseSum: "3000元",
    purchaseStatus: "待采购",
    reportTime: "2019-12-01",
    purchasePeople: "程琳",
    recorder: "程琳",
    remark: "公司需要"
  }, {
    id: 5,
    applicationName: "绿植采购",
    purchaseType: "公司内部采购",
    purchaseSum: "500元",
    purchaseStatus: "待采购",
    reportTime: "2019-12-01",
    purchasePeople: "程琳",
    recorder: "程琳",
    remark: "装修需要"
  }, {
    id: 6,
    applicationName: "鼠标采购",
    purchaseType: "公司内部采购",
    purchaseSum: "100元",
    purchaseStatus: "待采购",
    reportTime: "2019-12-01",
    purchasePeople: "程琳",
    recorder: "程琳",
    remark: "员工需要"
  }, {
    id: 7,
    applicationName: "卫生纸采购",
    purchaseType: "公司内部采购",
    purchaseSum: "500元",
    purchaseStatus: "待采购",
    reportTime: "2019-12-01",
    purchasePeople: "程琳",
    recorder: "程琳",
    remark: "公司需要"
  }]

  purchaseOrderData = [{
    id: 1,
    goodsName: "惠普笔记本",
    telephone: "18238246761",
    orderPeople: "程琳",
    goodsStatus: "已发货",
    orderTime: "2019-12-01",
    remark: "公司内部需要"
  }, {
    id: 2,
    goodsName: "办公柜",
    telephone: "15538246761",
    orderPeople: "程琳",
    goodsStatus: "未发货",
    orderTime: "2019-12-01",
    remark: "公司内部需要"
  }, {
    id: 3,
    goodsName: "座椅",
    telephone: "18238246761",
    orderPeople: "程琳",
    goodsStatus: "已发货",
    orderTime: "2019-12-01",
    remark: "公司内部需要"
  }, {
    id: 4,
    goodsName: "惠普笔记本",
    telephone: "18238246761",
    orderPeople: "程琳",
    goodsStatus: "已发货",
    orderTime: "2019-12-01",
    remark: "公司内部需要"
  }]


  warehouseManageData = [{
    id: 1,
    goodsName: "显示屏",
    goodsType: "电子设备",
    warehouseSum: "5",
    warehouseTime: "2019-12-10",
    applicant: "程琳",
    handlePeople: "程琳",
    remark: "电子设备"
  }, {
    id: 2,
    goodsName: "电脑桌",
    goodsType: "办公用品",
    warehouseSum: "2",
    warehouseTime: "2019-10-10",
    applicant: "程琳",
    handlePeople: "程琳",
    remark: "办公用品"
  }, {
    id: 3,
    goodsName: "鼠标",
    goodsType: "电子设备",
    warehouseSum: "1",
    warehouseTime: "2019-2-10",
    applicant: "程琳",
    handlePeople: "程琳",
    remark: "电子设备"
  }, {
    id: 4,
    goodsName: "网线",
    goodsType: "电子设备",
    warehouseSum: "6",
    warehouseTime: "2019-12-10",
    applicant: "程琳",
    handlePeople: "程琳",
    remark: "电子设备"
  }]

  stockOut = [{
    id: 1,
    goodsName: "显示屏",
    goodsType: "电子设备",
    warehouseSum: "5",
    warehouseTime: "2019-12-10",
    applicant: "程琳",
    handlePeople: "程琳",
    remark: "电子设备"
  }, {
    id: 2,
    goodsName: "电脑桌",
    goodsType: "办公用品",
    warehouseSum: "2",
    warehouseTime: "2019-10-10",
    applicant: "程琳",
    handlePeople: "程琳",
    remark: "办公用品"
  }, {
    id: 3,
    goodsName: "鼠标",
    goodsType: "电子设备",
    warehouseSum: "1",
    warehouseTime: "2019-2-10",
    applicant: "程琳",
    handlePeople: "程琳",
    remark: "电子设备"
  }, {
    id: 4,
    goodsName: "网线",
    goodsType: "电子设备",
    warehouseSum: "6",
    warehouseTime: "2019-12-10",
    applicant: "程琳",
    handlePeople: "程琳",
    remark: "电子设备"
  }]

  reportManageData = [{
    id: 1,
    reportName: "十一月考勤表",
    reportType: "任务考核表",
    uploadType: "周期保洁",
    uploaddate: "2019-12-20",
    uploadpeople: "李祥祥"
  }, {
    id: 2,
    reportName: "十月报销表",
    reportType: "报销表",
    uploadType: "周期报销",
    uploaddate: "2019-12-20",
    uploadpeople: "程琳"
  }, {
    id: 3,
    reportName: "十月考勤表",
    reportType: "任务考核表",
    uploadType: "周期保洁",
    uploaddate: "2019-12-20",
    uploadpeople: "程琳"
  }, {
    id: 4,
    reportName: "九月报销表",
    reportType: "报销表",
    uploadType: "周期报销",
    uploaddate: "2019-09-20",
    uploadpeople: "程琳"
  }, {
    id: 5,
    reportName: "八月考勤表",
    reportType: "任务考核表",
    uploadType: "周期保洁",
    uploaddate: "2019-08-20",
    uploadpeople: "程琳"
  }]

  assessmentManageData = [{
    taskName: "办公室打扫",
    id: 2,
    taskType: "房屋保洁",
    executeMethod: "周期保洁",
    principal: "关艳爽",
    executor: "李祥祥",
    completeDate: "2019-12-12",
    remark: "2019-12-12已完成"
  }, {
    taskName: "显示器打扫",
    id: 3,
    taskType: "设备保洁",
    executeMethod: "周期保洁",
    principal: "李祥祥",
    executor: "程琳",
    completeDate: "2019-12-12",
    remark: "2019-12-12已完成"
  }, {
    taskName: "显示器打扫",
    id: 4,
    taskType: "设备保洁",
    executeMethod: "周期保洁",
    principal: "关艳爽",
    executor: "程琳",
    completeDate: "2019-12-12",
    remark: "2019-12-12已完成"
  }, {
    taskName: "显示器打扫",
    id: 5,
    taskType: "设备保洁",
    executeMethod: "临时保洁",
    principal: "关艳爽",
    executor: "程琳",
    completeDate: "2019-12-12",
    remark: "2019-12-12已完成"
  }, {
    taskName: "办公室打扫",
    id: 6,
    taskType: "房屋保洁",
    executeMethod: "周期保洁",
    principal: "关艳爽",
    executor: "程琳",
    completeDate: "2019-12-12",
    remark: "2019-12-12已完成"
  }, {
    taskName: "活动区打扫",
    id: 7,
    taskType: "园区保洁",
    executeMethod: "临时保洁",
    principal: "李祥祥",
    executor: "程琳",
    completeDate: "2019-12-12",
    remark: "2019-12-12已完成"
  }, {
    taskName: "显示器打扫",
    id: 8,
    taskType: "房屋保洁",
    executeMethod: "临时保洁",
    principal: "李祥祥",
    executor: "程琳",
    completeDate: "2019-12-12",
    remark: "2019-12-12已完成"
  }]

  batchStockInData = [{
    id: 1,
    applicationNumber: "RK-154678955789",
    applicationName: "笔记本",
    goodsSource: "采购",
    applicant: "李祥祥",
    handlePeople: "程琳",
    stockInTime: "2019-12-15",
    remark: "一台惠普笔记本"
  }, {
    id: 2,
    applicationNumber: "RK-157778958786",
    applicationName: "鼠标",
    goodsSource: "采购",
    applicant: "何炎东",
    handlePeople: "程琳",
    stockInTime: "2019-12-15",
    remark: "一个鼠标"
  }, {
    id: 3,
    applicationNumber: "RK-245789154645",
    applicationName: "暖气片",
    goodsSource: "采购",
    applicant: "服务部",
    handlePeople: "程琳",
    stockInTime: "2019-12-15",
    remark: "暖气片"
  }, {
    id: 4,
    applicationNumber: "RK-158976453214",
    applicationName: "显示器",
    goodsSource: "采购",
    applicant: "软件部",
    handlePeople: "程琳",
    stockInTime: "2019-10-15",
    remark: "开发需要"
  }, {
    id: 5,
    applicationNumber: "RK-987325642135",
    applicationName: "电脑桌",
    goodsSource: "采购",
    applicant: "新同事",
    handlePeople: "程琳",
    stockInTime: "2019-11-15",
    remark: "新同事需要"
  }]

  assetLedgerData = [{
    id: 1,
    assetNumber: "ZC-154678955789",
    assetName: "笔记本",
    assetType: "服务器",
    assetStatus: "已出库",
    handlePeople: "程琳",
    operatingTime: "2019-11-15",
    remark: "无"
  }, {
    id: 2,
    assetNumber: "ZC-157894563258",
    assetName: "鼠标",
    assetType: "固定资产",
    assetStatus: "报废",
    handlePeople: "程琳",
    operatingTime: "2019-11-15",
    remark: "联想鼠标"
  }]

  signatureManageData = [{
    id: 1,
    signatureNumber: "QZ-156789452365",
    signatureName: "公章",
    signatureType: "公章",
    signatureStatus: "使用中",
    signTime: "2019-01-15",
    useTime: "2019-10-11",
    remark: "对外事务处置",
  }, {
    id: 2,
    signatureNumber: "QZ-875493214596",
    signatureName: "财务章",
    signatureType: "财务章",
    signatureStatus: "使用中",
    signTime: "2019-03-15",
    useTime: "2019-08-11",
    remark: "公司票据出具",
  }, {
    id: 3,
    signatureNumber: "QZ-854698723154",
    signatureName: "法人章",
    signatureType: "法人章",
    signatureStatus: "使用中",
    signTime: "2017-01-01",
    useTime: "2019-12-11",
    remark: "银行小印鉴",
  }, {
    id: 4,
    signatureNumber: "QZ-845216478963",
    signatureName: "合同专用章",
    signatureType: "合同专用章",
    signatureStatus: "使用中",
    signTime: "2018-01-01",
    useTime: "2019-12-11",
    remark: "签署合同需求加盖",
  }, {
    id: 5,
    signatureNumber: "QZ-156789452365",
    signatureName: "发票专用章",
    signatureType: "发票专用章",
    signatureStatus: "使用中",
    signTime: "2018-02-01",
    useTime: "2019-08-11",
    remark: "开具发票需求加盖",
  }]

  templateManageData = [{
    id: 1,
    templateNumber: "MB-548789456122",
    templateName: "租赁合同",
    templateType: "租赁",
    templateStatus: "运行中",
    signTime: "2019-01-01",
    useTime: "2019-12-12",
    remark: "租赁合同"
  }, {
    id: 2,
    templateNumber: "MB-148595645878",
    templateName: "借贷合同",
    templateType: "借贷",
    templateStatus: "运行中",
    signTime: "2019-01-01",
    useTime: "2019-12-12",
    remark: "借贷合同"
  }, {
    id: 4,
    templateNumber: "MB-458965467894",
    templateName: "委托合同",
    templateType: "委托合同",
    templateStatus: "运行中",
    signTime: "2019-01-01",
    useTime: "2019-12-12",
    remark: "委托合同"
  }]

  approvalManageData = [{
    id: 1,
    contractId: 'HT-190225135238',
    contractName: '中钢A座租房合同',
    contractType: '租赁合同',
    contractTime: '2020.02.01',
    useTime: '2020.02.02',
    manageUser: '程琳',
    remark: "请主要查收相关的租房合同"
  }, {
    id: 2,
    contractId: 'HT-190225192920',
    contractName: '中钢B座租房合同',
    contractType: '租赁合同',
    contractTime: '2020.02.03',
    useTime: '2020.03.02',
    manageUser: '程琳',
    remark: "B座相关的合同有变动，请注意"
  }, {
    id: 3,
    contractId: 'HT-190232522920',
    contractName: '中钢C座租房合同',
    contractType: '租赁合同',
    contractTime: '2020.05.03',
    useTime: '2020.07.02',
    manageUser: '程琳',
    remark: "双务合同与单务合同"
  }]

  billManageData = [{
    id: 1,
    billNumber: 'ZD-190225135201',
    billName: '中钢A座用水账单',
    billStatus: '待审核',
    tenantName: '程琳',
    contractTime: '2020-01-12'
  },
  {
    id: 2,
    billNumber: 'ZD-190225132201',
    billName: '中钢B座用电账单',
    billStatus: '待审核',
    tenantName: '程琳',
    contractTime: '2020-02-12'
  },
  {
    id: 3,
    billNumber: 'ZD-190225135221',
    billName: '中钢C座用电账单',
    billStatus: '已审核',
    tenantName: '程琳',
    contractTime: '2019-02-01'
  }]

  messageDevice = [{
    id: 'TradeCode21',
    name: '室内广告机',
    type: '大屏',
    status: '播放中',
    date1: '2019-12-24',
    date2: '2019-12-28',
    remark: '备注',
    name2: '官网首页',
    name3: '公司宣传视频',
    type2: '视频'
  }, {
    id: 'TradeCode22',
    name: '门店海报机',
    type: '大屏',
    status: '播放中',
    date1: '2019-12-24',
    date2: '2019-12-28',
    remark: '备注',
    name2: '数字园区首页',
    name3: '公司宣传视频',
    type2: '视频',
  }, {
    id: 'TradeCode23',
    name: '展览大屏幕',
    type: '大屏',
    status: '已通过',
    date1: '2019-12-24',
    date2: '2019-12-28',
    remark: '备注',
    name2: '数字园区首页',
    name3: '新年祝福文字',
    type2: '文字'
  }, {
    id: 'TradeCode24',
    name: '门外广告机',
    type: '大屏',
    status: '待审核',
    date1: '2019-12-24',
    date2: '2019-12-28',
    remark: '备注',
    name2: '公众号首页',
    name3: '团建活动图片',
    type2: '图片'
  }, {
    id: 'TradeCode25',
    name: '门外广告机',
    type: '大屏',
    status: '待审核',
    date1: '2019-12-24',
    date2: '2019-12-28',
    remark: '备注',
    name2: '公众号首页',
    name3: '团建活动图片',
    type2: '图片'
  }, , {
    id: 'TradeCode26',
    name: '展览大屏幕',
    type: '大屏',
    status: '待审核',
    date1: '2019-12-24',
    date2: '2019-12-28',
    remark: '备注',
    name2: '公众号首页',
    name3: '团建活动图片',
    type2: '图片'
  }]

  //this,删除的id,没有id时的提示信息，点击确定的回调函数
  deleteTip(that, deleteId, msgTip, sureCallBack, cancelCallBack) {
    if (!deleteId) {
      that.$message({
        type: 'warning',
        message: msgTip,
        duration: 1000
      });
      return;
    }
    that.$confirm('确定要删除吗?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      sureCallBack && sureCallBack();
    }).catch((err) => {
      if (err === 'cancel') {
        that.$message({
          type: 'info',
          message: '已取消删除',
        });
        cancelCallBack && cancelCallBack();
      } else {
        that.$message({
          type: 'error',
          message: '出错,请在控制台查看错误信息',
        });
        console.error(err);
      }
    });
  }

  //重新整合跳转，包括跳旧项目、新项目、客户端
  loadPage(item){
    store.commit("digitalPark/activeMenuIndex",this.setMenuIndex(item))
    if (item.routeAddress) {
      //客户端
      if(this.loadClientPage(item)){
        return ;
      }
      if (item.routeAddress.indexOf("@") != -1) {
        //旧项目
        if(item.routeAddress=='@/html/docms/index.html?openid=emergency'){
          localStorage.setItem('backupType',4)
        }else if(item.routeAddress=='@/html/docms/index.html?openid=assess'){
          localStorage.setItem('backupType',5)
        }
        router.push('/vibe-web')
      } else if(item.name=="物业系统"){
        console.log("客户端方法跳中钢")
        window.goToZGManage()
      }else{
        //新项目
        router.push(item.routeAddress);
      }
    } else {
      router.push("/digitalPark/defaultPage");
    }
  }

  loadClientPage(item, clientMenu) {
    //不需要clientMenu了
    if (typeof item === 'undefined') {
      return false;
    }
    if (item.level == 2 && item.clientType == 1) {
      router.push(`${item.routeAddress}?productId=${item.id}`)
      return true;
    } else if(item.level==3 && item.clientType==1 && item.name=="概览"){
      router.push(`${item.routeAddress}?productId=${item.pid}`)
      return true;
    }else if (item.level != 2 && item.clientType == 1) {
      let id = item.id
      if(item.childNode.length){
        id = this.getId(item)
      }
      let menuTree = JSON.parse(localStorage.getItem("menuTree"))
      let firstMenu = menuTree[0].childNode.find(first => {
        return first.id == item.firstMenuId;
      });
      let secondMenu = firstMenu.childNode.find(second => {
        return second.id == item.secondMenuId;
      });
      console.log(secondMenu,id)
      window.goToClientPage(JSON.stringify(secondMenu),id+"")
      return true;
    }
    return false;
  }

  getId(item){
    if(item.childNode.length){
      return this.getId(item.childNode[0])
    }else{
      return item.id
    }
  }

  //导出
  exportMethod(data, that) {
    axios({
      headers: {
        'X-SSO-Token': sessionStorage.getItem('token')
      },
      method: "get",
      url: `${data.url}${data.params ? '?' + data.params : ''}`,
      responseType: 'blob',
    }).then((res) => {
      const link = document.createElement('a')
      let blob = new Blob([res.data], { type: 'application/vnd.ms-excel' })
      link.style.display = 'none'
      link.href = URL.createObjectURL(blob)
      link.download = decodeURIComponent(res.headers['content-disposition']) //下载后文件名
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }).catch(error => {
      that.$message({
        type: 'error',
        message: error,
      });
    })
  }

  //设置菜单index
  setMenuIndex(item) {
    let arr = ['defaultPage', 'digitalPark/dashboardHomePage', 'stockInApply']
    let flag = false
    if (item.routeAddress) {
      arr.map((str) => {
        if (item.routeAddress.indexOf(str) != -1) {
          flag = true
        }
      })
      if (flag) {
        return this.getId(item) + item.routeAddress
      } else {
        return item.routeAddress
      }
    } else {
      return item.id + ""
    }
  }

  setShortcutList(shortcut) {
    localStorage.setItem("shortcutList", JSON.stringify(shortcut))
  }

  goToZGManage(item) {
    //中钢物业管理客户端来处理
    if (item.name == "物业系统") {
      window.goToZGManage()
      return;
    }
  }
}
export default new commonFun()
