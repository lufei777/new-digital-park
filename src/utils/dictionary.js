export const CommonDic = {
  sexDic: [{
    label: '男',
    value: '1'
  }, {
    label: '女',
    value: '2'
  }, {
    label: '保密',
    value: '0'
  }],
  booleanDic: [
    {
      label: '是',
      value: 1
    },
    {
      label: '否',
      value: 0
    }
  ]
}

// 租赁管理
export const LeaseManageDic = {
  // 是否可出租
  isRent: [
    {
      label: '是',
      value: 1
    }, {
      label: '否',
      value: 2
    }
  ],
  // 总价单位
  PriceType: [
    {
      label: '元/月',
      value: 1
    },
    {
      label: '元/天',
      value: 2
    }
  ],
  // 房屋出租状态
  HouseStatus: [
    {
      label: '已租',
      value: 2
    },
    {
      label: '未租',
      value: 1
    }
  ],
  //租赁合同  付费周期
  PayCycleType: [
    {
      label: '月付',
      value: 1
    },
    {
      label: '季付',
      value: 2
    }
  ],
  //租赁合同  付费计算方式
  PayCountWayType: [
    {
      label: '月',
      value: 1
    },
    {
      label: '日',
      value: 2
    },
    {
      label: '月+日',
      value: 3
    }
  ]

}

export const StockDic = {
  stockInApply: [{
    label: '采购入库',
    value: 1
  }, {
    label: '其他入库',
    value: 2
  }],

  recordStatus: {
    0: '待验',
    1: '已入库',
    2: '已作废',
    3: '已收回',
  }
}

export const AssetDic = {
  singleCount: [{
    label: '是',
    value: 1
  }, {
    label: '否',
    value: 0
  }],

  applyType: {
    1: '资产领用',
  },

  assetStatus: {
    0: '领用'
  }
}
// 人事管理
export const PersonalManageDic = {
  // 员工状态
  employeeStatus: [
    {
      label: "临时",
      value: "1"
    },
    {
      label: "试用",
      value: "2"
    },
    {
      label: "正式",
      value: "3"
    }
  ],
  // 员工类型
  employeeType: [
    {
      label: "外包",
      value: "1"
    },
    {
      label: "兼职",
      value: "2"
    },
    {
      label: "全职",
      value: "3"
    }
  ],
  // 户口类型
  residenceType: [
    { label: "城市", value: "1" },
    { label: "农村", value: "2" }
  ],
  // 婚姻状况
  maritalStatus: [
    { label: "已婚", value: "1" },
    { label: "未婚", value: "2" }
  ],
  // 政治面貌
  politicalStatus: [
    { label: "中共党员", value: "0" },
    { label: "中共预备党员", value: "1" },
    { label: "共青团员", value: "2" },
    { label: "群众", value: "3" }
  ],
  // 教育背景
  educationBackground: [
    {
      label: "本科",
      value: "7"
    },
    {
      label: "硕士研究生",
      value: "8"
    },
    {
      label: "博士研究生",
      value: "9"
    },
    {
      label: "专科（高职、高专、高技）",
      value: "6"
    },
    {
      label: "中技",
      value: "5"
    },
    {
      label: "职校",
      value: "4"
    },
    {
      label: "中专",
      value: "3"
    },
    {
      label: "高级中学",
      value: "2"
    },
    {
      label: "初级中学",
      value: "1"
    }, {
      label: "小学",
      value: "0"
    }
  ],
  // 学位
  degree: [
    {
      label: "学士",
      value: "0"
    },
    {
      label: "硕士",
      value: "1"
    },
    {
      label: "博士",
      value: "2"
    }
  ],
  // 健康状况
  healthStatus: [
    {
      label: "优秀",
      value: "1"
    },
    {
      label: "良好",
      value: "2"
    },
    {
      label: "一般",
      value: "3"
    },
    {
      label: "较差",
      value: "4"
    }
  ]
}

// 收支管理
export const RevenueExpendManageDic = {
  // 审核类型
  examineType: [
    { label: "待审核", value: 0 },
    { label: "通过", value: 1 },
    { label: "驳回", value: 2 }
  ],
  // 审核状态
  examineState: [
    { label: "待审核", value: 0 },
    { label: "已审核", value: 1 },
    { label: "已驳回", value: 2 },
    { label: "审核中", value: 3 }
  ],
  // 费用名称
  moduleId: [
    { label: "租赁", value: 0 },
    { label: "服务费", value: 1 },
    { label: "专利费", value: 2 }
  ],
  // 资金状态
  moneyState: [
    { label: "未到账", value: 0 },
    { label: "已到账", value: 1 },
    { label: "已逾期", value: 2 }
  ],
  //  收费类型
  tradeType: [
    { label: "现金", value: 0 },
    { label: "转账", value: 1 }
  ],
  // 收支和指出对应的不同名称
  fields: {
    receivMoney: ["应收金额", "支出金额"],
    recordName: ["收入名称", "支出名称"],
    moduleId: ["收入类型", "支出类型"],
    payName: ["收款方", "支付方"],
    incomeTime: ["入账日期", "支出日期"]
  },
  // 收支和指出对应的不同title
  titles: {
    add: ['发起收费', '发起支出'],
    edit: ['编辑收费', '编辑支出']
  }
}

// 停车管理
export const parkingManageDic = {
  isNull: [
    {
      label: '有停车',
      value: 1
    },
    {
      label: '车空位',
      value: 2
    }
  ],
  carNumColor: [
    {
      label: '蓝',
      value: 0
    },
    {
      label: '黄',
      value: 1
    },
    {
      label: '白',
      value: 2
    },
    {
      label: '黑',
      value: 3
    },
    {
      label: '未识别',
      value: 99
    }
  ],
  carType: [
    {
      label: '小型车',
      value: 1
    },
    {
      label: '大型车',
      value: 2
    }
  ],
  carColor: [
    {
      label: '白色',
      value: 0
    },
    {
      label: '黑色',
      value: 1
    },
    {
      label: '红色',
      value: 2
    },
    {
      label: '黄色',
      value: 3
    },
    {
      label: '银灰色',
      value: 4
    },
    {
      label: '蓝色',
      value: 5
    },
    {
      label: '绿色',
      value: 6
    },
    {
      label: '橙色',
      value: 7
    },
    {
      label: '紫色',
      value: 8
    },
    {
      label: '青色',
      value: 9
    },
    {
      label: '粉色',
      value: 10
    },
    {
      label: '棕色',
      value: 11
    },
    {
      label: '未识别',
      value: 99
    },
    {
      label: '其他',
      value: 100
    }
  ]
}

export const BooleanDic = {
  isOrNot: [
    { label: "是", value: "1" },
    { label: "否", value: "2" }
  ]
}

//导出数据
export const ExportData = {
  timeType: [
    {
      label: "年",
      value: 1
    },
    {
      label: "月",
      value: 2
    },
    {
      label: "日",
      value: 3
    }
  ]
}

// 资产类别
export const AssetKind = [
  {
    label: '空间',
    value: 'SPACE',
    kind: 0
  },
  {
    label: '设备',
    value: 'DEVICE',
    kind: 1
  },
  {
    label: '服务',
    value: 'SERVICE',
    kind: 2
  },
  {
    label: '监测器',
    value: 'PROBE',
    kind: 3
  },
  {
    label: '控制器',
    value: 'CONTROL',
    kind: 4
  }
]

// 资产类型
export const AssetType = {
  //空间，表示一个房间
  SPACE: {
    kind: 0,
    text: 'SPACE'
  },
  //设备
  DEVICE: {
    kind: 1,
    text: 'DEVICE',
    catalogId: 2002
  },
  //服务器
  SERVICE: {
    kind: 2,
    text: 'SERVICE'
  },
  //监测器
  PROBE: {
    kind: 3,
    text: 'PROBE'
  },
  //控制器
  CONTROL: {
    kind: 4,
    text: 'CONTROL'
  }
}

// 资产状态错误提示
export const AssetState = {
  NORMAL: {
    text: "NORMAL",
    value: 1,
    desc: '传感器状态正常',
    valueStr: "正常"
  },
  WARNING: {
    text: "WARNING",
    value: 2,
    desc: '监测值达到告警条件',
    valueStr: "告警"
  },
  ERROR: {
    text: "ERROR",
    value: 3,
    desc: '数据采集过程中发生错误',
    valueStr: "错误"
  },
  INITIALIZE: {
    text: "INITIALIZE",
    value: 4,
    desc: '正在获取数据',
    valueStr: "正在初始化"
  },
  FAILURE: {
    text: "FAILURE",
    value: 5,
    desc: '数据传输通信故障',
    valueStr: "通信故障"
  }
}

// 项目名称
export const ProjectName = {

  ZG: 'zg', // 中钢
  YDCity: 'ydCity',  //项目名称，大屏名称
  NORMAL: 'normal',  //通用大屏
  NORBULINGKA: 'norbulingka'
}

// 根据项目显示不同的title
export const Title = {
  [ProjectName.ZG]: '中钢大厦数字建筑运管平台',
  [ProjectName.YDCity]: '伊甸城BIM运管平台',
  [ProjectName.NORBULINGKA]: '罗布林卡世界文化遗产监测预警平台'
}

//任务概览任务类型
export const taskType = {
  taskData: [
    {
      value: 1,
      label: "巡检任务",
      nodes: []
    },
    {
      value: 2,
      label: "维修任务",
      nodes: []
    },
    {
      value: 3,
      label: "保养任务",
      nodes: []
    },
    {
      value: 4,
      label: "流程任务",
      nodes: []
    },
    {
      value: 5,
      label: "审批任务",
      nodes: []
    },
    {
      value: 6,
      label: "其他任务",
      nodes: []
    }
  ]
}

// 预警报警
export const WarningAlerm = {
  // 报警级别
  // Alarm level
  alarmLevel: [
    { label: '全部', value: 1 },
    { label: '普通', value: 2 },
    { label: '严重', value: 3 },
    { label: '紧急', value: 4 }
  ],
  // 报警状态
  // Alarm status
  alarmStatus: [
    { label: '未处理', value: 1 },
    { label: '已处理', value: 2 }
  ],
  // 子系统
  // subsystem
  subSystem: [
    { label: '门禁管理', value: 1 },
    { label: '环境监测', value: 2 },
    { label: '视频控制', value: 3 },
    { label: '变配电', value: 4 }
  ],
  // 设备类型
  // device type
  deviceType: [{ label: '门禁', value: 1 }, { label: '温湿度传感器', value: 2 }],
  // 报警类型
  // Alarm type
  alarmType: [
    { label: '通讯故障', value: 2 },
    { label: '设备运行报警', value: 3 },
    { label: '其他类型报警', value: 4 }
  ],
  // 录入类型
  // Input type
  inputType: [{ label: '点表导入', value: 1 }, { label: '手动录入', value: 2 }],
  // 处理人员
  // handling person
  handingPerson: [{ label: '张三', value: 1 }, { label: '李四', value: 2 }, { label: '王五', value: 3 }],
  // 设备名称
  // devicename
  deviceName: [
    { label: '1#会议室温温度传感器', value: 1 },
    { label: '2#会议室温温度传感器', value: 2 },
    { label: '3#会议室温温度传感器', value: 3 }
  ],
  // 设备点位
  // equipmentsite
  equipmentSite: [
    { label: '1#会议室温监测', value: 1 },
    { label: '2#会议室温监测', value: 2 },
    { label: '3#会议室温监测', value: 3 }
  ],
  // 处理组名称
  grounpName: [{ label: '安保部处理组A', value: 1 }, { label: '安保部处理组B', value: 2 }, { label: '安保部处理组C', value: 3 }],
  // 点位类型
  // Point type
  pointType: [{ label: '温度监测', value: 1 }, { label: '湿度监测', value: 2 }],
  // 抑制
  // restrain
  restrain: [{ label: '抑制', value: 1 }, { label: '不抑制', value: 2 }],
  // 通知方式
  // way of notification
  notificationWay: [{ label: '短信', value: 1 }, { label: '语音', value: 2 }, { label: '弹框', value: 3 }],
  // 通知组
  notificationGrounp: [
    { label: '环境/严重/处理组A', value: 1 },
    { label: '环境/严重/处理组B', value: 2 },
    { label: '环境/严重/处理组C', value: 3 }
  ],
  // 弹框类型
  dialogType: [{ label: '自动关闭', value: 1 }, { label: '手动关闭', value: 2 }],
  // 通知人员=== 》处理人员
  // 时间设置
  timeSetting: [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 }
  ],
  // 重复交验中的复选框
  reCheckbox: [
    { label: '1#温湿度传感器', value: 1 },
    { label: '2#温湿度传感器', value: 2 },
    { label: '3#温湿度传感器', value: 3 },
    { label: '4#温湿度传感器', value: 4 },
    { label: '5#温湿度传感器', value: 5 },
    { label: '全选', value: 6 }
  ],
  // 弹窗的启用禁用
  // Enable disable
  enableDisAble: [{ label: '启用', value: 1 }, { label: '禁用', value: 2 }],
  // 报警应答弹框复选框
  alarmResponse: [
    { label: '设备调试', value: 1 },
    { label: '真实故障', value: 2 },
    { label: '误报', value: 3 },
    { label: '其他', value: 4 }
  ],
  // 优先级
  priority: [{ label: '正常', value: 1 }, { label: '重要', value: 2 }, { label: '紧急', value: 3 }]
};

// 罗布林卡
export const Norbulingka = {
<<<<<<< HEAD
  //  工程分类
  projectType: [
    // { label: '未选择', value: 1 },
    { label: '文物维修', value: 1 },
    { label: '保护性设施', value: 2 },
    { label: '现场展示', value: 3 },
    { label: '环境整治', value: 4 }
  ],
  // 类型选择
  typeSelect: [
    { label: '本体情况', value: 1 },
    { label: '病害分析', value: 2 },
    { label: '施工情况', value: 3 },
    { label: '游客情况', value: 4 },
    { label: '考古发掘', value: 5 },
    { label: '其他', value: 6 }
  ],
  // 文物级别
  levelCultural: [
    { label: '未选择', value: 1 },
    { label: '一级', value: 2 },
    { label: '二级', value: 3 },
    { label: '三级', value: 4 },
    { label: '一般', value: 5 },
    { label: '未定级', value: 6 }
  ],
  // 维护类型 Maintenance types
  maintenanceTypes: [
    { label: '未选择', value: 1 },
    { label: '异常记录', value: 2 },
    { label: '保养与维护工程记录', value: 3 },
    { label: '安全事故记录', value: 4 },
    { label: '群体事件记录', value: 5 },
    { label: '未定级', value: 6 }
  ],
  // 巡检人员 Inspection personnel
  inspectionPersonnel: [
    { label: '未选择', value: 1 },
    { label: 'admin', value: 2 },
    { label: '审计员', value: 3 },
    { label: '访客', value: 4 }
  ],
  // 文物本体
  ontology: [
    { label: '未选择', value: 1 },
    { label: '乌尧颇章', value: 2 },
    { label: '格桑颇章', value: 3 },
    { label: '缺扎', value: 4 },
    { label: '曲然', value: 5 },
    { label: '康松思轮', value: 6 },
    { label: '措吉颇章(湖心亭)', value: 7 },
    { label: '鲁康(龙王亭)', value: 8 },
    { label: '鲁康厦(东龙王亭)', value: 9 },
    { label: '春增颇章', value: 10 },
    { label: '内马厩', value: 11 },
    { label: '金色颇章', value: 12 },
    { label: '格桑德吉', value: 13 },
    { label: '曲敏确杰', value: 14 },
    { label: '夏典拉康', value: 15 },
    { label: '噶厦官员办公室', value: 16 },
    { label: '"译仓"办公室', value: 17 },
    { label: '达旦明久颇章', value: 18 },
    { label: '其他建筑', value: 19 }
  ],
  // 评估状态
  assessment: [
    { label: '未选择', value: 1 },
    { label: '好', value: 2 },
    { label: '较好', value: 3 },
    { label: '一般', value: 4 }
  ],
  // 保存状态
  saveStatues: [
    { label: '未选择', value: 1 },
    { label: '保持原状', value: 2 },
    { label: '基本保持原状', value: 3 },
    { label: '部分改变原状', value: 4 },
    { label: '原状改变较大', value: 5 },
    { label: '完全改变原状', value: 6 }
  ],
  // 病害分类 diseasesSort
  diseasesSort: [
    { label: '未选择', value: 1 },
    { label: '建，构筑物', value: 2 },
    { label: '遗址', value: 3 },
    { label: '洞窟，龛', value: 4 },
    { label: '造像，碑刻，壁画', value: 5 },
    { label: '山体', value: 6 },
    { label: '水体', value: 7 },
    { label: '植被', value: 8 },
    { label: '街区', value: 9 }
  ],
  // 病害类型 diseaseType
  diseaseType: [
    { label: '未选择', value: 1 },
    { label: '危岩体', value: 2 },
    { label: '滑移', value: 3 },
    { label: '倾倒', value: 4 },
    { label: '渗漏', value: 5 },
    { label: '根劈', value: 6 },
    { label: '表层风化', value: 7 }
  ],
  // 添加藏品档案 =============
  // 编号类型
=======
	//  工程分类
	projectType: [
		// { label: '未选择', value: 1 },
		{ label: '文物维修', value: 1 },
		{ label: '保护性设施', value: 2 },
		{ label: '现场展示', value: 3 },
		{ label: '环境整治', value: 4 }
	],
	// 类型选择
	typeSelect: [
		{ label: '本体情况', value: 1 },
		{ label: '病害分析', value: 2 },
		{ label: '施工情况', value: 3 },
		{ label: '游客情况', value: 4 },
		{ label: '考古发掘', value: 5 },
		{ label: '其他', value: 6 }
	],
	// 文物级别
	levelCultural: [
		{ label: '未选择', value: 1 },
		{ label: '一级', value: 2 },
		{ label: '二级', value: 3 },
		{ label: '三级', value: 4 },
		{ label: '一般', value: 5 },
		{ label: '未定级', value: 6 }
	],
	// 维护类型 Maintenance types
	maintenanceTypes: [
		{ label: '未选择', value: 1 },
		{ label: '异常记录', value: 2 },
		{ label: '保养与维护工程记录', value: 3 },
		{ label: '安全事故记录', value: 4 },
		{ label: '群体事件记录', value: 5 },
		{ label: '未定级', value: 6 }
	],
	// 巡检人员 Inspection personnel
	inspectionPersonnel: [
		{ label: '未选择', value: 1 },
		{ label: 'admin', value: 2 },
		{ label: '审计员', value: 3 },
		{ label: '访客', value: 4 }
	],
	// 文物本体
	ontology: [
		// { label: '未选择', value: 1 },
		{ label: '乌尧颇章', value: 2 },
		{ label: '格桑颇章', value: 3 },
		{ label: '缺扎', value: 4 },
		{ label: '曲然', value: 5 },
		{ label: '康松思轮', value: 6 },
		{ label: '措吉颇章(湖心亭)', value: 7 },
		{ label: '鲁康(龙王亭)', value: 8 },
		{ label: '鲁康厦(东龙王亭)', value: 9 },
		{ label: '春增颇章', value: 10 },
		{ label: '内马厩', value: 11 },
		{ label: '金色颇章', value: 12 },
		{ label: '格桑德吉', value: 13 },
		{ label: '曲敏确杰', value: 14 },
		{ label: '夏典拉康', value: 15 },
		{ label: '噶厦官员办公室', value: 16 },
		{ label: '"译仓"办公室', value: 17 },
		{ label: '达旦明久颇章', value: 18 },
		{ label: '其他建筑', value: 19 }
	],
	// 评估状态
	assessment: [
		{ label: '未选择', value: 1 },
		{ label: '好', value: 2 },
		{ label: '较好', value: 3 },
		{ label: '一般', value: 4 }
	],
	// 保存状态
	saveStatues: [
		{ label: '未选择', value: 1 },
		{ label: '保持原状', value: 2 },
		{ label: '基本保持原状', value: 3 },
		{ label: '部分改变原状', value: 4 },
		{ label: '原状改变较大', value: 5 },
		{ label: '完全改变原状', value: 6 }
	],
	// 病害分类 diseasesSort
	diseasesSort: [
		{ label: '未选择', value: 1 },
		{ label: '建，构筑物', value: 2 },
		{ label: '遗址', value: 3 },
		{ label: '洞窟，龛', value: 4 },
		{ label: '造像，碑刻，壁画', value: 5 },
		{ label: '山体', value: 6 },
		{ label: '水体', value: 7 },
		{ label: '植被', value: 8 },
		{ label: '街区', value: 9 }
	],
	// 病害类型 diseaseType
	diseaseType: [
		{ label: '未选择', value: 1 },
		{ label: '危岩体', value: 2 },
		{ label: '滑移', value: 3 },
		{ label: '倾倒', value: 4 },
		{ label: '渗漏', value: 5 },
		{ label: '根劈', value: 6 },
		{ label: '表层风化', value: 7 }
	],
	// 添加藏品档案 =============
	// 编号类型
>>>>>>> dev

  // 文物类别
  culturalType: [
    { label: '请选择', value: 0 },
    { label: '玉石器、宝石', value: 1 },
    { label: '陶器', value: 2 },
    { label: '瓷器', value: 3 },
    { label: '铜器.', value: 4 },
    { label: '金银器', value: 5 },
    { label: '铁器、其他金属器', value: 6 }
    // {label:'漆器',value:7},
    // {label:'雕塑、造像',value:8},
    // {label:'石器、石刻、砖瓦',value:9},
    // {label:'书法、绘画',value:10},
    // {label:'文具',value:11},
    // {label:'甲骨',value:12},
    // {label:'玺印符牌',value:13},
    // {label:'钱币',value:14},
    // {label:'牙骨角器',value:15},
    // {label:'竹木雕',value:16},
    // {label:'家具',value:17},
    // {label:'珐琅器',value:18},
    // {label:'织绣',value:19},
    // {label:'古籍图书',value:20},
    // {label:'碑帖拓本',value:21},
    // {label:'武器',value:22},
    // {label:'邮品',value:23},
    // {label:'文件、宣传品',value:24},
    // {label:'档案文书',value:25},
    // {label:'名人遇物',value:26},
    // {label:'玻璃器',value:27},
    // {label:'乐器、法器',value:28},
    // {label:'皮革',value:29},
    // {label:'音像制品',value:30},
    // {label:'票据',value:31},
    // {label:'交通、运输工具',value:32},
    // {label:'度量衡器',value:33},
    // {label:'标本.化石',value:34},
    // {label:'其他',value:35},
  ],
  // 藏品年代
  collectionYear: [
    {
      label: '地址年代',
      value: 0,
      children: [
        {
          value: 'alert',
          label: 'Alert 警告',
          children: [
            {
              value: '123',
              label: 'Loading 加载'
            },
            {
              value: '345',
              label: '159'
            }
          ]
        },
        {
          value: 'loading',
          label: 'Loading 加载'
        },
        {
          value: 'message',
          label: 'Message 消息提示'
        },
        {
          value: 'message-box',
          label: 'MessageBox 弹框',
          children: [
            {
              value: '123',
              label: 'Loading 加载'
            },
            {
              value: '345',
              label: '159'
            }
          ]
        },
        {
          value: 'notification',
          label: 'Notification 通知'
        }
      ]
    },
    {
      label: '地址年代',
      value: 0,
      children: [
        {
          value: 'alert',
          label: 'Alert 警告',
          children: [
            {
              value: '123',
              label: 'Loading 加载'
            },
            {
              value: '345',
              label: '159'
            }
          ]
        },
        {
          value: 'loading',
          label: 'Loading 加载'
        },
        {
          value: 'message',
          label: 'Message 消息提示'
        },
        {
          value: 'message-box',
          label: 'MessageBox 弹框',
          children: [
            {
              value: '123',
              label: 'Loading 加载'
            },
            {
              value: '345',
              label: '159'
            }
          ]
        },
        {
          value: 'notification',
          label: 'Notification 通知'
        }
      ]
    }
  ],
  // 涉及到的遗产构成要素 ===> 多选框
  relateElement: [
    { label: "乌尧颇章", value: 0 },
    { label: "格桑颇章", value: 1 },
    { label: "却扎", value: 2 },
    { label: "曲然", value: 3 },
    { label: "康松思轮", value: 4 },
    { label: "湖心亭", value: 5 },
    { label: "鲁康", value: 6 },
    { label: "准增颇章", value: 7 },
    { label: "内马厩", value: 8 },
    { label: "金色颇章", value: 9 }
  ]
};

export const TaskofficeLocationType = {
  officeLocationType: [
    {
      value: 0,
      label: "公司"
    },
    {
      value: 1,
      label: "现场"
    }
  ]
}

export const TaskpriorityType = {
  priorityType: [
    {
      value: "1",
      label: "正常"
    },
    {
      value: "2",
      label: "重要"
    },
    {
      value: "3",
      label: "紧急"
    }
  ]
}
