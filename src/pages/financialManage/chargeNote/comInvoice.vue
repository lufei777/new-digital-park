<template>
  <!-- 收费 -->
      <div class='panel-container'>
    <!-- 底部 -->
    <!-- <div class="panel"> -->
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
          <el-button
            size='mini'
            type='primary'
            @click="canSure"
          >确认提交并打印</el-button>
          <el-button @click="cancel()">取消</el-button>
        </div>
      </template>
    </z-form>
    <!-- </div> -->
  </div>

  </div>
</template>

<script>
// import { Row } from "element-ui";
export default {
  props: {
    invoice: {
      type: Object
    }
  },
  data() {
    return {
      model: {},
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
            prop: "amountCharged",
            offset: 4,
            disabled: true,
            rules: {
              required: true,
              trigger: "change"
            }
          },
          // 未收费金额
          {
            type: "input",
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
          // 开票科目
          {
            type: "input",
            label: "开票科目",
            span: 8,
            prop: "collectionContent",
            offset: 4,
            // disabled: true
            rules: {
              required: true,
              trigger: "change"
            }
          },
          // 开票金额
          {
            type: "input",
            label: "开票金额",
            span: 8,
            prop: "collectionType",
            // disabled: true
            rules: {
              required: true,
              trigger: "change"
            }
          },
          // 收款情况
          {
            type: "input",
            label: "收款情况",
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
        //   {
        //     type: "input",
        //     label: "银行回执单号",
        //     span: 8,
        //     prop: "bankCode",
        //     // disabled: true
        //     rules: {
        //       required: true,
        //       trigger: "change"
        //     }
        //   },
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
            span: 12,
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
    submit(model, hide) {},
    resetChange() {},
    // 确认，
    canSure() {},
    // 取消
    cancel() {
      this.$emit("adjust", false);
      console.log("父亲", this.$parent);
    }
  },
  created() {
    this.model = {...this.invoice};
    console.log("this.invoice", this.model);
  },
  mounted() {
    console.log("this.charge", this.invoice);
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
