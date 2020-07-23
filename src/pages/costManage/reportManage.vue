<template>
  <div class="invoice-manage panel-container">
    <div class="condition-box radius-shadow">
      <z-form
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
      </z-form>
    </div>

    <div class="invoice-manage-table panel">
      <z-table :ref="tableData.ref" :options="tableData">
        <template slot="custom-top" slot-scope="obj">
          <div class="operator-box flex-row-reverse">
            <el-button :size="obj.size" type="primary">批量删除</el-button>
            <el-button :size="obj.size" type="primary">导出</el-button>
            <el-button :size="obj.size" type="primary">导入</el-button>
            <el-button :size="obj.size" type="primary">上传</el-button>
          </div>
        </template>
      </z-table>
    </div>
  </div>
</template>

<script>
import CommonFun from "../../utils/commonFun";
export default {
  name: "InvoiceManage",
  data() {
    return {
      model: {},
      formData: {
        ref: "formData",
        menuBtn: false,
        itemSpan: 6,
        forms: [
          {
            type: "input",
            label: "报表名称",
            prop: "reportName",
            placeholder: "请输入",
            clearable: true,
            minRows: 0
          },
          {
            type: "input",
            label: "报表类型",
            prop: "reportType",
            placeholder: "请输入",
            clearable: true
          },
          {
            type: "input",
            label: "上传类型",
            prop: "uploadType",
            placeholder: "请输入",
            clearable: true
          },
          {
            type: "date",
            label: "上传日期",
            prop: "reportTime",
            placeholder: "选择日期时间",
            // clearable: true,
            format: "yyyy-MM-dd",
            valueFormat: "timestamp"
          },
          {
            type: "input",
            label: "上传人",
            prop: "uploadpeople",
            placeholder: "请输入"
          },
          {
            label: false,
            prop: "btn",
            formslot: true,
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
              label: "查看",
              handler: function (row) { }
            },
            {
              label: "删除",
              handler: function (row) { }
            }
          ]
        }
      }
    };
  },
  methods: {
    submit() { },
    resetChange() { },
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
      let res = CommonFun.reportManageData;
      let labelList = [
        { label: "报表名称", prop: "reportName" },
        { label: "报表类型", prop: "reportType" },
        { label: "上传类型", prop: "uploadType" },
        { label: "上传日期", prop: "uploaddate" },
        { label: "上传人", prop: "uploadpeople" }
      ];
      this.tableData.columnConfig = labelList;
      this.tableData.data = res;
    },
    batchDels() { },
    addTenant() { }
  },
  mounted() {
    this.getCleaningList();
  }
};
</script>

<style lang="less">
.invoice-manage {
  .condition-box {
    margin-bottom: 20px;
    background: @white;
    padding: 20px;
    // background: pink;
  }
  .invoice-manage-table {
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