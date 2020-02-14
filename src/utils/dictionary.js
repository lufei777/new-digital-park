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
  }]
}

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
  }]
}

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
    { label: "群众", value: "3" },
    { label: "民革党员", value: "4" },
    { label: "民盟盟员", value: "5" },
    { label: "民建会员", value: "6" },
    { label: "民进会员", value: "7" },
    { label: "农工党党员", value: "8" },
    { label: "致公党党员", value: "9" },
    { label: "九三学社社员", value: "10" },
    { label: "台盟盟员", value: "11" },
    { label: "无党派人士", value: "12" }
  ],
  educationBackground: [
    {
      label: "小学",
      value: "0"
    },
    {
      label: "初级中学",
      value: "1"
    },
    {
      label: "高级中学",
      value: "2"
    },
    {
      label: "中专",
      value: "3"
    },
    {
      label: "职校",
      value: "4"
    },
    {
      label: "中技",
      value: "5"
    },
    {
      label: "专科（高职、高专、高技）",
      value: "6"
    },
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

export const BooleanDic = {
  isOrNot: [
    { label: "是", value: "1" },
    { label: "否", value: "2" }
  ]
}
