<template>
  <FormTableTemplate>
    <template slot="form">
      <z-form :ref="formData.ref" :options="formData" v-model="model">
        <template slot="btn" slot-scope="obj">
          <div>
            <el-button :disabled="obj.disabled" type="primary" @click="onClickSearchBtn(obj)">搜索</el-button>
            <el-button :disabled="obj.disabled" @click="clearForm(obj)">清除</el-button>
          </div>
        </template>
      </z-form>
    </template>

    <template slot="table">
      <z-table :ref="tableData.ref" :options="tableData">
        <template slot="custom-top" slot-scope="{size}">
          <el-button :size="size" type="primary" @click="launchcharge">发起收费</el-button>
          <el-button :size="size" type="primary" @click="entryRecord">录入记录</el-button>
          <el-button :size="size" type="primary">导入</el-button>
          <el-button :size="size" type="primary">导出</el-button>
          <el-button :size="size" type="primary">批量删除</el-button>
        </template>

        <template slot="operation" slot-scope="{size,row}">
          <el-button :size="size" type="text" @click="detail(row)">详情</el-button>
          <!-- 待审核 -->
          <template v-if="row.examineState === 0">
            <el-button :size="size" type="text" @click="update(row)">完善</el-button>
            <el-button :size="size" type="text" @click="check(row)">审核</el-button>
          </template>
          <!-- 已审核 -->
          <template v-if="row.examineState === 1">
            <el-button :size="size" type="text">打印票据</el-button>
            <el-button :size="size" type="text">归档</el-button>
          </template>
          <!-- 已驳回 -->
          <template v-if="row.examineState === 2">
            <el-button :size="size" type="text">删除</el-button>
          </template>
        </template>
      </z-table>
    </template>
  </FormTableTemplate>
</template>

<script>
import FormTableTemplate from "../FormTableTemplate";
import revenueExpendApi from "api/revenueExpendManage";

const budgetType = {
  revenue: 0,
  budget: 1
};
const examineState = [
  { label: "待审核", value: 0 },
  { label: "已审核", value: 1 },
  { label: "已驳回", value: 2 },
  { label: "审核中", value: 3 }
];
const moduleId = [
  { label: "租赁", value: 0 },
  { label: "服务费", value: 1 },
  { label: "专利费", value: 2 }
];
const moneyState = [
  { label: "未到账", value: 0 },
  { label: "已到账", value: 1 },
  { label: "已逾期", value: 2 }
];
const tradeType = [
  { label: "现金", value: 0 },
  { label: "转账", value: 1 }
];

export default {
  name: "RevenueRecord",
  components: { FormTableTemplate },
  data() {
    return {
      model: {},
      formData: {
        ref: "formData",
        labelWidth: "100",
        menuBtn: false,
        forms: [
          {
            type: "input",
            label: "编号",
            prop: "incomId",
            span: 8
          },
          {
            type: "input",
            label: "收入名称",
            prop: "incomeName",
            span: 8
          },
          {
            type: "select",
            label: "资金状态",
            prop: "moneyState",
            dicData: moneyState,
            span: 8
          },
          {
            type: "date",
            label: "入账日期",
            prop: "incomeDate",
            placeholder: "选择日期时间",
            format: "yyyy-MM-dd",
            valueFormat: "timestamp",
            span: 8
          },
          {
            type: "date",
            label: "截止日期",
            prop: "endTime",
            placeholder: "选择日期时间",
            format: "yyyy-MM-dd",
            valueFormat: "timestamp",
            span: 8
          },
          {
            prop: "btn",
            formslot: true,
            span: 8
          }
        ]
      },
      tableData: {
        ref: "tableData",
        customTop: true,
        customTopPosition: "right",
        serverMode: {},
        operation: {
          width: 170
        },
        columnConfig: [
          { label: "编号", prop: "recordId", width: 200 },
          { label: "收入名称", prop: "recordName" },
          { label: "发起时间", prop: "launchTime", type: "date", width: 160 },
          { label: "入账时间", prop: "incomeTime", type: "date", width: 160 },
          { label: "发起人", prop: "launchName" },
          { label: "应收金额", prop: "receivMoney" },
          {
            label: "收入类型",
            prop: "moduleId",
            type: "select",
            dicData: moduleId
          },
          { label: "支付方", prop: "payName" },
          {
            label: "审核状态",
            prop: "examineState",
            type: "select",
            dicData: examineState
          },
          {
            label: "截止日期",
            prop: "endTime",
            type: "date"
          },
          {
            label: "资金状态",
            prop: "moneyState",
            type: "select",
            dicData: moneyState
          },
          {
            label: "交易方式",
            prop: "tradeType",
            type: "select",
            dicData: tradeType
          },
          { label: "备注", prop: "remarks" }
        ],
        uiConfig: {
          height: "auto", //"", //高度
          selection: true //是否多选
        }
      }
    };
  },
  created() {
    // 配置表格远程获取数据
    this.tableData.serverMode = {
      url: revenueExpendApi.getBudgetList,
      data: {
        budgetType: this.budgetType
      }
    };
  },
  methods: {
    onClickSearchBtn(...args) {
      this.Form.getFormModel(res => {
        console.log("model", res);
      });
      console.log("搜索", ...args);
    },
    clearForm(...args) {
      this.Form.resetForm();
    },
    batchDels() {},
    addTenant() {},
    routePush({ flag, row }) {
      let { recordId, examineState, budgetType } = row || {};
      this.$router.push({
        name: "launchcharge",
        query: {
          flag,
          recordId,
          examineState,
          budgetType
        }
      });
    },
    launchcharge(row, column) {
      this.routePush({ flag: "add" });
    },
    entryRecord(row, column) {
      this.routePush({ flag: "entry" });
    },
    detail(row) {
      this.routePush({ flag: "detail", row });
    },
    check(row) {
      this.routePush({ flag: "check", row });
    },
    update(row) {
      this.routePush({ flag: "update", row });
    }
  },
  computed: {
    budgetType() {
      return budgetType.revenue;
    },
    Form() {
      return this.$refs[this.formData.ref];
    },
    Table() {
      return this.$refs[this.tableData.ref];
    }
  }
};
</script>
