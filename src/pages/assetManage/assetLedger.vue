<template>
  <div class="asset-ledger panel-container">
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

    <div class="asset-ledger-table radius-shadow panel">
      <miTable :ref="tableData.ref" :tableConfig="tableData">
        <template slot="custom-top" slot-scope="obj">
          <div class="operator-box flex-row-reverse">
            <el-button :size="obj.size" type="primary">批量删除</el-button>
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
  import CommonFun from "@/utils/commonFun";
  export default {
    name: "AssetLedger",
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
              label: "资产编号",
              prop: "assetNumber",
              placeholder: "请输入",
              clearable: true,
              span: 4,
              minRows: 0
            },
            {
              type: "input",
              label: "资产名称",
              prop: "assetName",
              placeholder: "请输入",
              clearable: true,
              span: 4,
              minRows: 0
            },
            {
              type: "input",
              label: "资产类型",
              prop: "assetType",
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
              label: "资产状态",
              prop: "assetStatus",
              placeholder: "请输入",
              clearable: true,
              span: 4
            },
            // {
            //   prop: "",
            //   formslot: true,
            //   span: 6
            // },
            {
              type: "input",
              label: "经办人",
              prop: "handlePeople",
              placeholder: "请输入",
              span: 4
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
                label: "查看",
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
        let res = CommonFun.assetLedgerData;
        let labelList = [
          { label: "资产编号", prop: "assetNumber" },
          { label: "资产名称", prop: "assetName" },
          { label: "资产类型", prop: "assetType" },
          { label: "资产状态", prop: "assetStatus" },
          { label: "经办人", prop: "handlePeople" },
          { label: "最近操作日期", prop: "operatingTime" },
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
  .asset-ledger {
    .condition-box {
      margin-bottom: 20px;
      background: @white;
      padding: 20px;
      // background: pink;
    }
    .asset-ledger-table {
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
