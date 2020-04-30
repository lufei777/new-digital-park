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

// 错误提示
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
    valueStr: "初始化"
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
  // 中钢
  ZG: 'zg'
}

// 根据项目显示不同的title
export const Title = {
  [ProjectName.ZG]: '中钢大厦数字建筑运管平台'
}
