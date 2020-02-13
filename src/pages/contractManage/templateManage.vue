<template>
  <div class="template-manage panel-container">
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

    <div class="template-manage-table panel">
      <z-table :ref="tableData.ref" :options="tableData">
        <template slot="custom-top" slot-scope="obj">
          <div class="operator-box flex-row-reverse">
            <el-button :size="obj.size" type="primary">批量删除</el-button>
            <el-button :size="obj.size" type="primary">导出</el-button>
            <el-button :size="obj.size" type="primary">导入</el-button>
            <el-button :size="obj.size" type="primary">新增</el-button>
          </div>
        </template>
      </z-table>
    </div>
  </div>
</template>

<script>
  import CommonFun from "@/utils/commonFun";
  export default {
    name: "TemplateManage",
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
              label: "模板编号",
              prop: "templateNumber",
              placeholder: "请输入",
              clearable: true,
              span: 4,
              minRows: 0
            },
            {
              type: "input",
              label: "模板名称",
              prop: "templateName",
              placeholder: "请输入",
              clearable: true,
              span: 4,
              minRows: 0
            },
            {
              type: "input",
              label: "模板类型",
              prop: "templateType",
              placeholder: "请输入",
              clearable: true,
              span: 4,
              minRows: 0
            },
             {
              prop: "",
              formslot: true,
              span: 12
            },
            {
              type: "input",
              label: "模板状态",
              prop: "templateStatus",
              placeholder: "请输入",
              clearable: true,
              span: 4
            },
             {
              type: "input",
              label: "使用日期",
              prop: "useTime",
              placeholder: "选择日期时间",
              clearable: true,
              span: 4,
              format: "yyyy-MM-dd",
              valueFormat: "timestamp"
            },
            {
              prop: "btn",
              span: 6,
              pull: 4,
              formslot: true
              // width: "34px"
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
                label: "编辑",
                handler: function(row) {}
              },
              {
                label: "审批",
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
        let res = CommonFun.templateManageData;
        let labelList = [
          { label: "模板编号", prop: "templateNumber" },
          { label: "模板名称", prop: "templateName" },
          { label: "模板类型", prop: "templateType" },
          { label: "模板状态", prop: "templateStatus" },
          { label: "签署日期", prop: "signTime" },
          { label: "使用日期", prop: "useTime" },
          { label: "备注", prop: "remark" }
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
  .template-manage {
    .condition-box {
      margin-bottom: 20px;
      background: @white;
      padding: 20px;
      // background: pink;
    }
    .template-manage-table {
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
