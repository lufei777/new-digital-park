<template>
  <div class="panel">
    <span class="tip frist-tip flex-align">
      <span class="icon"></span>
      <span>详情查看</span>
    </span>
    <div class="form">
      <z-form :options="formOptions" v-model="model"></z-form>
    </div>
  </div>
</template>
<script>
const pageForms = {
  feeBasedInfo: [
    {
      prop: "id",
      label: "id信息",
      hide: true
    },
    {
      prop: "carNum",
      label: "车辆号码"
    },
    {
      prop: "cardNum",
      label: "卡号"
    },
    {
      prop: "carInTime",
      label: "入场时间"
    },
    {
      prop: "carOutTime",
      label: "出场时间"
    },
    {
      prop: "inChannelName",
      label: "入口通道"
    },
    {
      prop: "outChannelName",
      label: "出口通道"
    },
    {
      prop: "carType",
      label: "车辆类型"
    },
    {
      prop: "feeDesc",
      label: "收费描述"
    },
    {
      prop: "feeAmount",
      label: "收费金额"
    },
    {
      prop: "timeLength",
      label: "停车时长"
    },
    {
      prop: "amountReceived",
      label: "实收金额(元)",
      width: 114
    },
    {
      prop: "feeRule",
      label: "收费规则"
    },
    {
      prop: "feeType",
      label: "收费类型"
    },
    {
      prop: "discount",
      label: "优惠金额(元)",
      width: 114
    },
    {
      prop: "coupon",
      label: "优惠券编号",
      width: 104
    },
    {
      prop: "discountType",
      label: "优惠类型"
    },
    {
      prop: "feeTime",
      label: "收费时间"
    },
    {
      prop: "feeTerminal",
      label: "收费终端"
    },
    {
      prop: "charger",
      label: "收费员"
    },
    {
      prop: "carOwner",
      label: "车主"
    },
    {
      prop: "orderNum",
      label: "订单号"
    },
    {
      prop: "remark",
      label: "备注"
    },
    {
      prop: "inImageBig",
      label: "入场抓拍照片(大图)",
      width: 156
    },
    {
      prop: "inImageSmall",
      label: "入场抓拍照片(小图)",
      width: 156
    },
    {
      prop: "outImageBig",
      label: "出场抓拍照片(大图)",
      width: 156
    },
    {
      prop: "outImageSmall",
      label: "出场抓拍照片(小图)",
      width: 156
    }
  ],
  accessRecord: [
    { id: "id", prop: "id信息", hide: true },
    {
      prop: "carNum",
      label: "车辆号码"
    },
    {
      prop: "parkingState",
      label: "停车状态"
    },
    {
      prop: "parkingType",
      label: "停车类型"
    },
    {
      prop: "cardNum",
      label: "卡号"
    },
    {
      prop: "parkName",
      label: "停车场名称",
      width: 104
    },
    {
      prop: "userType",
      label: "用户类别"
    },
    {
      prop: "charge",
      label: "停车场收费金额(元)",
      width: 156
    },
    {
      prop: "inMode",
      label: "入场方式"
    },
    {
      prop: "outMode",
      label: "出场方式"
    },
    {
      prop: "inTime",
      label: "入场时间"
    },
    {
      prop: "outTime",
      label: "出场时间"
    },
    {
      prop: "inCameraChannelName",
      label: "入场相机"
    },
    {
      prop: "outCameraChannelName",
      label: "出场相机"
    },
    {
      prop: "inChannelNum",
      label: "入场车道号",
      width: 104
    },
    {
      prop: "outChannelNum",
      label: "出场车道号",
      width: 104
    },
    {
      prop: "inChannelName",
      label: "入场道闸通道",
      width: 119
    },
    {
      prop: "outChannelName",
      label: "出场道闸通道",
      width: 119
    },
    {
      prop: "inImageBig",
      label: "入场抓拍照片(大图)",
      width: 156
    },
    {
      prop: "inImageSmall",
      label: "入场抓拍照片(小图)",
      width: 156
    },
    {
      prop: "outImageBig",
      label: "出场抓拍照片(大图)",
      width: 156
    },
    {
      prop: "outImageSmall",
      label: "出场抓拍照片(小图)",
      width: 156
    }
  ]
};
export default {
  data() {
    return {
      model: {},
      formOptions: {
        size: "small",
        width: "70%"
      }
    };
  },
  created() {
    if (Object.keys(this.$route.query).length > 0) {
      let { model, flag } = this.$route.query;
      this.formOptions.forms = pageForms[flag];
      this.model = JSON.parse(model);
    }
  },
  methods: {}
};
</script>

<style lang='less' scoped>
.panel {
  .form {
    display: flex;
    justify-content: center;
  }
  .tip {
    margin: 20px 0;
    .icon {
      width: 4px;
      height: 16px;
      background: @mainBgColor;
      border-radius: 2px;
      margin-right: 10px;
    }
    span {
      font-size: 16px;
      color: @mainBgColor;
    }
  }
}
</style>