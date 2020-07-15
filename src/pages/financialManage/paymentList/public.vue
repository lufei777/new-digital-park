<template>
  <!-- 收费 -->
      <div class='panel-container'>
    <!-- 底部 -->
    <div class="panel">
      <z-form
        :ref="formOptions.ref"
        :options="formOptions"
        v-model="model"
        @submit="submit"
        @reset-change="resetChange"
      >
        <template slot="rentLine">
          <h3 style="border:1px dashed #999"></h3>
        </template>
        <template slot="line">
          <h3 style="border:1px dashed #999"></h3>
        </template>
        <template
          slot="btn"
          slot-scope="obj"
        >
          <div>
            <!-- <div v-if='$route.query.flag ==="edit"'> -->
            <el-button
              v-if='$route.query.flag ==="edit"'
              @click="canSave"
              size='mini'
              type='primary'
            >确认修改</el-button>
            <!-- </div> -->
            <el-button @click="goBack()">返回</el-button>
          </div>
        </template>
      </z-form>
    </div>
  </div>

  </div>
</template>

<script>
// import { Row } from "element-ui";
import FinacialManageApi from "@/service/api/financialManage";
import commonFun from "@/utils/commonFun.js";

//
export default {
  data() {
    return {
      model: {},
      // 收费总金额
      totalMoney:Number,
      formOptions: {
        ref: "form",
        menuPosition: "right",
        menuBtn: false,
        labelWidth: "140",
        textMode: false,
        forms: [
          // 收费通知单编号
          {
            type: "input",
            label: "收费通知单编号",
            span: 8,
            prop: "noticeNumber",
            disabled: true,
            offset: 4,
            // row:true,
            rules: {
              required: true,
              trigger: "change"
            }
          },
          // 收费部门
          {
            type: "input",
            label: "收费部门",
            span: 8,
            prop: "costDept",
            // disabled: true
            rules: {
              required: true,
              trigger: "change"
            }
          },
          // 合同编号
          {
            type: "input",
            label: "合同编号",
            span: 8,
            prop: "contractNumber",
            offset: 4,
            // row:true,
            disabled: true
          },
          // 合同名称
          {
            type: "input",
            label: "合同名称",
            span: 8,
            prop: "contractName",
            disabled: true
          },
          // 租户编码
          {
            type: "input",
            label: "租户编码",
            span: 8,
            offset: 4,
            prop: "tenantNumber",
            disabled: true
          },
          // 付款单位全称
          {
            type: "input",
            label: "付款单位全称",
            span: 8,
            prop: "payerName"
            // disabled: true
          },
          // 收费期
          {
            type: "input",
            label: "收费期",
            span: 8,
            prop: "createTime",
            offset: 4,
            disabled: true
          },
          // 收费总金额
          {
            type: "input",
            label: "收费总金额",
            span: 8,
            prop: "receivableAmount",
            append: "元",
            disabled: true
          },
          // 已收费金额
          {
            type: "input",
            label: "已收费金额",
            span: 8,
            prop: "receivedAmount",
            offset: 4,
            disabled: true,
            // rules: {
            //   required: true,
            //   trigger: "change"
            // }
          },
          // 未收费金额
          {
            type: "number",
            minRows:0,
            label: "未收费金额",
            span: 8,
            prop: "amountNotCharged",
            disabled: true
          },
          // 虚线
          {
            prop: "rentLine",
            offset: 3,
            span: 18,
            formslot: true
          },
          // 收款内容
          {
            type: "input",
            label: "收款内容",
            span: 8,
            prop: "collectionContent",
            offset: 4,
            // disabled: true
            rules: {
              required: true,
              trigger: "change"
            }
          },
          // 收费方式
          {
            type: "select",
            label: "收费方式",
            span: 8,
            prop: "collectionType",
            // disabled: true
            dicData:[
              {label:'支付宝',value:1},
              {label:'支票',value:2},
              {label:'转账',value:3},
              {label:'承兑汇票',value:4},
              {label:'现金',value:5},
              {label:'银行卡',value:6},
              {label:'微信',value:7},

            ],
            rules: {
              required: true,
              trigger: "change"
            }
          },
          // 收费金额
          {
            type: "number",
            minRows:0,
            maxRows:Number(this.totalMoney),
            label: "收费金额",
            span: 8,
            append: "元",
            prop: "collectionMoney",
            offset: 4,
            // disabled: true
            rules: {
              required: true,
              trigger: "change"
            }
          },
          // 银行回执单号
          {
            type: "input",
            label: "银行回执单号",
            span: 8,
            prop: "bankCode",
            // disabled: true
            rules: {
              required: true,
              trigger: "change"
            }
          },
          // 虚线
          {
            prop: "line",
            span: 18,
            offset: 3,
            formslot: true
          },
          // 经办人
          {
            type: "input",
            label: "经办人",
            span: 8,
            prop: "operator",
            offset: 4,
            disabled: true,
            row: true,
            rules: {
              required: true,
              trigger: "change"
            }
          },
          // 说明
          {
            type: "textarea",
            label: "说明",
            span: 16,
            prop: "remark",
            offset: 4,
            maxlength: 255,
            minRows: 6,
            showWordLimit: true,
            row: true
            // disabled: true
          },
          // 按钮
          {
            prop: "btn",
            formslot: true,
            span: 10,
            offset: 6
          }
        ]
      }
    };
  },
  methods: {
    totalSum(a, b) {
      return a - b;
    },
    goBack() {
      this.$router.back();
    },
    submit(model, done) {
      FinacialManageApi.updateBillChargeContact(model)
        .then(res => {
          this.$message({
            type: "success",
            message: "修改成功！"
          });
          this.$router.back();
        })
        .finally(res => {
          done();
        });
    },
    canSave() {
      this.$refs[this.formOptions.ref].submit();
    },
    resetChange() {},
    // 页面显示的数据
    setTabledata(id) {
      FinacialManageApi.selectBillChargeContact({ noticeNumber: id }).then(
        res => {
          // console.log("res.data",  res.data[0]);
          this.totalMoney = res.data[0].receivableAmount
          console.log("this.totalMoney", this.totalMoney);
          this.model = { ...res.data[0] };
        }
      );
    }
  },
  created() {
    var noticeNumber = this.$route.query.noticeNumber;
    var query = this.$route.query;
    if (Object.keys(this.$route.query).length !== 0) {
      let { flag, noticeNumber } = this.$route.query;
      if (noticeNumber) {
        this.setTabledata(noticeNumber);
      }
      if (flag === "detail") {
        this.formOptions.textMode = true;
      }
    }
    // this.$nextTick(() => {
    //   this.$refs[this.formOptions.ref].setColumnByProp("collectionMoney", {
    //     maxRows: this.totalMoney
    //   });
    // });
  },

  watch: {
    "model.collectionMoney": {
      handler(newVal, oldVal) {
        if (newVal !== oldVal) {
          var cc = this.totalSum(this.model.receivableAmount, newVal);
          //  console.log(cc)
          this.model.amountNotCharged = cc;
        }
      },
      deep: true,
      immediate: true
    }
  }
};
</script>

<style lang="less" scoped>
.box {
  background-color: rgb(255, 255, 255);
  height: auto;
  width: 100%;
  p {
    padding: 10px 0;
    background-color: rgb(212, 231, 248);
    height: 36px;
    line-height: 36px;
    text-align: center;
    span {
      font-size: 18px;
      font-weight: bold;
      color: black;
    }
  }
  //   表格上方的信息展示
  .tabel_top {
    width: 100%;
    .top {
      width: 100%;
      .item {
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        .item_left {
          height: 36px;
          line-height: 36px;
          text-align: left;
          span {
            color: black;
            font-size: 18px;
            font-weight: bold;
          }
        }
      }
    }
  }
  // 翻页隐藏
  /deep/.el-pagination {
    display: none;
  }
  //   合计
  .sum {
    width: 100%;
    display: flex;
    margin-top: -20px;
    .sum_item {
      border: 1px solid #cccccc;
      flex: 1;
      height: 36px;
      line-height: 36px;
      text-align: left;
      padding-left: 5px;
      span {
        font-size: 18px;
        color: black;
        font-weight: bold;
      }
    }
  }
  //   说明部分
  .instructions {
    display: flex;
    width: 100;
    // padding: 5px;
    border-right: 1px solid #cccccc;
    border-left: 1px solid #cccccc;
    border-bottom: 1px solid #cccccc;
    .instructions_left {
      width: 4%;
      height: 100px;
      text-align: right;
      span {
        display: inline-block;
        padding: 5px;
      }
    }
    .instructions_right {
      width: 96%;
      height: 100px;
      padding: 5px;
    }
  }
  //  底部
  .footer {
    display: flex;
    margin-top: 20px;
    margin-bottom: 100px;
    .footer_item {
      flex: 1;
      height: 30px;
      line-height: 30px;
      text-align: left;
      margin-top: 20px;
      padding-left: 15px;
      span {
        font-size: 18px;
        color: black;
        font-weight: bold;
      }
    }
  }
}
</style>
