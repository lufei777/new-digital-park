<template>
  <FormTableTemplate v-if="reload">
    <template slot="form">
      <z-form :ref="formData.ref" :options="formData" v-model="model" @submit="searchSubmit">
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
        <template slot="custom-top" slot-scope="{size,selectedData}">
          <el-button :size="size" type="primary" @click="launchcharge">{{launchField}}</el-button>
          <el-button :size="size" type="primary" @click="entryRecord">录入</el-button>
          <el-button :size="size" type="primary">导入</el-button>
          <el-button :size="size" type="primary">导出</el-button>
          <el-button :size="size" type="primary" @click="bulkDel(selectedData)">批量删除</el-button>
        </template>

        <template slot="operation" slot-scope="{size,row}">
          <el-button :size="size" type="text" @click="detail(row)">详情</el-button>

          <!-- 待审核 -->
          <template v-if="row.examineState === 0">
            <el-button v-if="!isLauncher(row)" :size="size" type="text" @click="check(row)">审核</el-button>
            <!-- 作为发起人有删除 编辑-->
            <template v-if="isLauncher(row)">
              <el-button :size="size" type="text" @click="edit(row)">编辑</el-button>
              <el-button :size="size" type="text" @click="del(row)">删除</el-button>
            </template>
          </template>

          <!-- 已审核 -->
          <template v-if="row.examineState === 1">
            <el-button :size="size" type="text">打印票据</el-button>
            <!-- 作为发起人有完善 -->
            <template v-if="isLauncher(row)">
              <el-button :size="size" type="text" @click="update(row)">完善</el-button>
              <el-button :size="size" type="text">归档</el-button>
            </template>
          </template>
        </template>
      </z-table>
    </template>
  </FormTableTemplate>
</template>

<script>
import FormTableTemplate from "../FormTableTemplate";
import revenueExpendApi from "api/revenueExpendManage";
import systemManageApi from "api/systemManage";
import commonFun from "utils/commonFun.js";
import { RevenueExpendManageDic } from "utils/dictionary";

const dateValueDefault = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
const dateValueFormat = "yyyy-MM-dd HH:mm:ss";
const examineState = RevenueExpendManageDic.examineState;
const moduleId = RevenueExpendManageDic.moduleId;
const moneyState = RevenueExpendManageDic.moneyState;
const tradeType = RevenueExpendManageDic.tradeType;

let tableSendData = {
  pageNum: 1,
  pageSize: 10
};

export default {
  name: "RevenueRecord",
  components: { FormTableTemplate },
  data() {
    return {
      reload: true,
      model: {},
      formData: {
        ref: "formData",
        labelWidth: "100",
        menuBtn: false,
        size: "small",
        forms: [
          {
            type: "input",
            label: "编号",
            prop: "recordId",
            span: 8
          },
          {
            type: "input",
            label: "收入名称",
            prop: "recordName",
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
            prop: "incomeTime",
            placeholder: "选择日期时间",
            format: "yyyy-MM-dd",
            valueFormat: dateValueFormat,
            span: 8
          },
          {
            type: "date",
            label: "截止日期",
            prop: "endTime",
            placeholder: "选择日期时间",
            format: "yyyy-MM-dd",
            valueFormat: dateValueFormat,
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
        serverMode: { url: revenueExpendApi.getBudgetList },
        operation: {
          width: 170
        },
        columnConfig: [
          { label: "编号", prop: "recordId", width: 200 },
          { label: "收入名称", prop: "recordName" },
          { label: "发起日期", prop: "launchTime", width: 160 },
          { label: "入账日期", prop: "incomeTime", width: 160 },
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
            width: 160
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
          size: "small",
          height: "auto", //"", //高度
          selection: true //是否多选
        },
        tableMethods: {
          selectable: row => this.isLauncher(row) && row.examineState === 0
        }
      }
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.formatFormOptions(this.formData.forms);
      this.formatFormOptions(this.tableData.columnConfig);
      // 配置表格远程获取数据
      this.tableData.serverMode.data = Object.assign(
        _.cloneDeep(tableSendData),
        {
          budgetType: this.budgetType
        }
      );
      /* systemManageApi.getDeptUserTree().then(res => {
        this.Table.setColumnByProp("launchIdList", {
          dicData: res[0].childNode
        });
      }); */
    },
    formatFormOptions(config) {
      const fields = RevenueExpendManageDic.fields;

      config.forEach(item => {
        if (item.prop in fields) {
          this.$set(item, "label", fields[item.prop][this.budgetType]);
        }
      });
    },
    searchSubmit(model, hide) {
      hide();
      this.tableData.serverMode.data = Object.assign(
        _.cloneDeep(tableSendData),
        model
      );
      this.refreshTable();
    },
    onClickSearchBtn() {
      this.Form.submit();
    },
    clearForm(...args) {
      this.Form.resetForm();
    },
    routePush({ flag, row }) {
      let { recordId, examineState } = row || {};
      this.$router.push({
        name: "launchcharge",
        query: {
          flag,
          recordId,
          examineState,
          budgetType: this.budgetType
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
    },
    del(row) {
      this.bulkDel([row]);
    },
    edit(row) {
      this.routePush({ flag: "edit", row });
    },
    bulkDel(selectedData) {
      if (!selectedData.length) {
        commonFun.deleteTip(this, false, "请选择数据");
        return;
      }

      let ids = selectedData.map(item => {
        return item.recordId;
      });

      commonFun.deleteTip(
        this,
        true,
        "确定要删除吗?",
        () => {
          revenueExpendApi.deleteRecord(ids).then(res => {
            this.refreshTable();
          });
        },
        () => {}
      );
    },
    isLauncher({ launchId }) {
      return JSON.parse(localStorage.getItem("userInfo")).id === launchId;
    },
    reloadPage() {
      this.reload = false;
      this.$nextTick(() => {
        this.init();
        this.model = {};
        this.reload = true;
      });
    },
    refreshTable() {
      this.Table.refreshTable();
    }
  },
  computed: {
    budgetType() {
      return this.$route.meta.budgetType;
    },
    Form() {
      return this.$refs[this.formData.ref];
    },
    Table() {
      return this.$refs[this.tableData.ref];
    },
    launchField() {
      return this.budgetType === 0 ? "发起收费" : "发起支出";
    }
  },
  watch: {
    budgetType() {
      this.reloadPage();
    }
  }
};
</script>
