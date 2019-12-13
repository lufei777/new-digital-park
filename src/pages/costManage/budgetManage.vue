<template>
  <div class="budget-manage">
    <div class="condition-box radius-shadow">
      <miForm
        :ref="formData.ref"
        :options="formData"
        v-model="model"
        @submit="submit"
        @reset-change="resetChange"
      >
        <template slot="btn" slot-scope="obj">
          <div>
            <el-button :disabled="obj.disabled" type="primary" @click="onClickSearchBtn(obj)">搜索</el-button>
            <el-button :disabled="obj.disabled" @click="clearForm(obj)">清除</el-button>
          </div>
        </template>
      </miForm>
    </div>

    <div class="budget-manage-table radius-shadow">
      <miTable :ref="tableData.ref" :tableConfig="tableData">
        <template slot="custom-top" slot-scope="obj">
          <div class="operator-box flex-row-reverse">
            <el-button :size="obj.size" type="primary">批量删除</el-button>
            <el-button :size="obj.size" type="primary">批量审核</el-button>
            <el-button :size="obj.size" type="primary">批量编辑</el-button>
            <el-button :size="obj.size" type="primary">导出</el-button>
            <el-button :size="obj.size" type="primary">导入</el-button>
            <el-button :size="obj.size" type="primary">新增</el-button>
          </div>
        </template>
      </miTable>
    </div>
  </div>
</template>

<script>
import miForm from "@/components/Form";
import miTable from "@/components/Table";
import CommonFun from "../../utils/commonFun";
export default {
  name: "BudgetManage",
  components: { miForm, miTable },
  data() {
    return {
      model: {},
      formData: {
        ref: "formData",
        labelWidth: "100",
        size: "medium",
        menuPosition: "right",
        menuBtn: false,
        // labelPosition: "left",
        forms: [
          {
            type: "input",
            label: "预算名称",
            prop: "budgetName",
            placeholder: "请输入",
            clearable: true,
            span: 4,
            minRows: 0
          },
          {
            type: "input",
            label: "预算类型",
            prop: "budgetType",
            placeholder: "请输入",
            clearable: true,
            span: 4
          },
          {
            type: "input",
            label: "预算金额",
            prop: "budgetSum",
            placeholder: "请输入",
            clearable: true,
            span: 4
          },
           {
            prop: "",
            formslot: true,
            span: 12
          },
          //   {
          //     prop: "",
          //     formslot: true,
          //     span: 6
          //   },
          {
            type: "input",
            label: "预算状态",
            prop: "budgetStatus",
            placeholder: "请输入",
            span: 4
          },
          {
            type: "date",
            label: "提报日期",
            prop: "reportTime",
            placeholder: "选择日期时间",
            // clearable: true,
            span: 4,
            format: "yyyy-MM-dd",
            valueFormat: "timestamp"
          },
          {
            prop: "btn",
            span: 6,
            pull: 4,
            formslot: true
          }
        ]
      },
      tableData: {
        ref: "tableData",
        data: [],
        columnConfig: [],
        uiConfig: {
          height: "auto", //"", //高度
          selection: true, //是否多选
          showIndex: true,
          pagination: {
            //是否分页，分页是否自定义
            layout: "total,->, prev, pager, next, jumper",
            pageSizes: [10, 20, 50],
            handler(pageSize, currentPage, table) {
              _this.handleCurrentChange(currentPage);
            }
          }
        },
        btnConfig: {
          prop: "operation",
          label: "操作",
          fixed: "right",
          width: 200,
          btns: [
            {
              label: "详情",
              handler: function(row) {}
            },
            {
              label: "审核",
              handler: function(row) {}
            },
            {
              label: "删除",
              handler: function(row) {}
            }
          ]
        }
      }
    };
  },
  methods: {
    submit() {},
    resetChange() {},
    onClickSearchBtn(...args) {
      this.$refs[this.formData.ref].getFormModel(res => {
        console.log("model", res);
      });
      console.log("搜索", ...args);
    },
    clearForm(...args) {
      console.log("清空", ...args);
      this.$refs[this.formData.ref].resetForm();
    },
    getCleaningList() {
      let res = CommonFun.budgetManageData;
      let labelList = [
        { label: "预算名称", prop: "budgetName" },
        { label: "预算类型", prop: "budgetType" },
        { label: "预算金额", prop: "budgetSum" },
        { label: "预算状态", prop: "budgetStatus" },
        { label: "提报日期", prop: "reportTime" },
        { label: "预算说明", prop: "budgetCause" },
        { label: "提报人", prop: "reportPeople" },
        { label: "审批人", prop: "approver" },
        { label: "操作时间", prop: "operationTime" }
      ];
      this.tableData.columnConfig = labelList;
      this.tableData.data = res;
    },
    batchDels() {},
    addTenant() {}
  },
  mounted() {
    this.getCleaningList();
  }
};
</script>

<style lang="less">
.budget-manage {
  .condition-box {
    margin-bottom: 20px;
    background: @white;
    padding: 20px;
    // background: pink;
  }
  .budget-manage-table {
    background: @white;
    padding: 20px;
    .operator-box {
      background: @white;
      .el-button {
        margin-left: 20px;
      }
    }
  }
}
</style>