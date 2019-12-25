<template>
  <div class="message-device-manage panel-container">
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

    <div class="warehouse-manage-table panel">
      <div class="operator-btn-box flex-row-reverse">
        <el-button  type="primary">批量删除</el-button>
        <el-button  type="primary">导出</el-button>
        <el-button  type="primary">导入</el-button>
        <el-button  type="primary">新增</el-button>
      </div>
      <miTable :ref="tableData.ref" :tableConfig="tableData">
      </miTable>
    </div>
  </div>
</template>

<script>
  import miForm from "@/components/Form";
  import miTable from "@/components/Table";
  import CommonFun from "@/utils/commonFun";
  export default {
    name: "MessageDevice",
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
              label: "设备编号",
              prop: "id",
              placeholder: "请输入",
              clearable: true,
              span: 4,
              minRows: 0
            },
            {
              type: "input",
              label: "设备名称",
              prop: "name",
              placeholder: "请输入",
              clearable: true,
              span: 4
            },
            {
              type: "input",
              label: "设备类型",
              prop: "type",
              placeholder: "请输入",
              clearable: true,
              span: 4
            },
            {
              prop: "",
              formslot: true,
              span: 12
            },
            {
              type: "input",
              label: "设备状态",
              prop: "status",
              placeholder: "选择日期时间",
              // clearable: true,
              span: 4,
              format: "yyyy-MM-dd",
              valueFormat: "timestamp"
            },
            // {
            //   prop: "",
            //   formslot: true,
            //   span: 6
            // },
            {
              type: "input",
              label: "添加日期",
              prop: "date",
              placeholder: "请输入",
              span: 4
            },
            {
              prop: "btn",
              span: 6,
              pull: 2,
              formslot: true
              // width: "34px"
            }
          ]
        },
        tableData: {
          ref: "tableData",
          customTop: true,
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
      getCleaningList() {
        let res = CommonFun.messageDevice;
        let labelList = [
          { label: "设备编号", prop: "id" },
          { label: "设备名称", prop: "name" },
          { label: "设备类型", prop: "type" },
          { label: "设备状态", prop: "status" },
          { label: "添加日期", prop: "date1" },
          { label: "使用日期", prop: "date2" },
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
  .message-device-manage {
    .condition-box{
      padding-top:20px;
      margin-bottom: 20px;
    }
  }
</style>
