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
      value: 1
    },
    {
      label: '待租',
      value: 2
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
  residenceType: [
    { label: "城市", value: "1" },
    { label: "农村", value: "2" }
  ],
  maritalStatus: [
    { label: "已婚", value: "1" },
    { label: "未婚", value: "2" }
  ],
  politicalStatus: [
    { label: "中共党员", value: "0" },
    { label: "中共预备党员", value: "1" },
    { label: "共青团员", value: "2" },
    { label: "群众", value: "3" }
  ],
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
  examineType: [
    { label: "待审核", value: 0 },
    { label: "通过", value: 1 },
    { label: "驳回", value: 2 }
  ],
  examineState: [
    { label: "待审核", value: 0 },
    { label: "已审核", value: 1 },
    { label: "已驳回", value: 2 },
    { label: "审核中", value: 3 }
  ],
  moduleId: [
    { label: "租赁", value: 0 },
    { label: "服务费", value: 1 },
    { label: "专利费", value: 2 }
  ],
  moneyState: [
    { label: "未到账", value: 0 },
    { label: "已到账", value: 1 },
    { label: "已逾期", value: 2 }
  ],
  tradeType: [
    { label: "现金", value: 0 },
    { label: "转账", value: 1 }
  ],
  fields: {
    receivMoney: ["应收金额", "支出金额"],
    recordName: ["收入名称", "支出名称"],
    moduleId: ["收入类型", "支出类型"],
    payName: ["收款方", "支付方"],
    incomeTime: ["入账日期", "支出日期"]
  }
}

export const BooleanDic = {
  isOrNot: [
    { label: "是", value: "1" },
    { label: "否", value: "2" }
  ]
}
