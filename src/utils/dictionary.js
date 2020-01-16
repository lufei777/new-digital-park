export const CommonDic = {
  sexDic:[{
    label:'男',
    value:'1'
  },{
    label:'女',
    value:'2'
  },{
      label:'保密',
      value:'0'
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
  HouseStatus: {
    // 房屋出租状态
    Rented: {
      label: '已租',
      value: 1
    },
    BeRent: {
      label: '待租',
      value: 2
    }
  }
}

export const StockDic = {
  stockInApply:[{
    label:'采购入库',
    value:1
  },{
    label:'其他入库',
    value:2
  }],

  recordStatus:{
    0:'待验',
    1:'已入库',
    2: '已作废',
    3:'已收回',
  }
}

export const AssetDic = {
  singleCount:[{
    label:'是',
    value:1
  },{
    label:'否',
    value:0
  }]
}
