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