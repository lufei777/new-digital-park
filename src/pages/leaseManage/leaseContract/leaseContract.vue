<template>
  <div class="lease-contract panel-container">
    <div class="condition-box radius-shadow">
      <z-form
        :ref="leaseContractForm.ref"
        :options="leaseContractForm"
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

    <div class="lease-contract-table panel">
      <z-table :ref="leaseContractTable.ref" :options="leaseContractTable">
        <template slot="custom-top" slot-scope="obj">
          <div class="operator-box flex-row-reverse">
            <el-button :size="obj.size" type="primary" @click="batchDels(obj)">批量删除</el-button>
            <el-button :size="obj.size" type="primary" @click="addContract(obj)">新增</el-button>
          </div>
        </template>

        <template slot="operation" slot-scope="obj">
          <el-button type="text" @click="detailContract(obj)">详情</el-button>
          <el-button type="text" @click="editRow(obj)">编辑</el-button>
          <el-button type="text" @click="delRow(obj)">删除</el-button>
        </template>
      </z-table>
    </div>
  </div>
</template>

<script>
import LeaseManageApi from "@/service/api/leaseManage";
import CommonFun from "@/utils/commonFun";
export default {
  name: "LeaseContract",
  data() {
    let _this = this;
    return {
      model: {},
      leaseContractForm: {
        ref: "leaseContractForm",
        labelWidth: "100",
        size: "medium",
        menuPosition: "right",
        submitBtn: false,
        emptyBtn: false,
        forms: [
          {
            type: "input",
            label: "合同编号",
            prop: "contractNumber",
            placeholder: "请输入",
            clearable: true,
            span: 6,
            minRows: 0
          },
          {
            type: "input",
            label: "租户名称",
            prop: "tenantName",
            placeholder: "请输入",
            clearable: true,
            span: 6
          },
          {
            type: "input",
            label: "联系方式",
            prop: "telephone",
            placeholder: "请输入",
            clearable: true,
            span: 6
          },
          // {
          //   prop: "",
          //   formslot: true,
          //   span: 6
          // },
          {
            type: "input",
            label: "所租房产",
            prop: "houseName",
            placeholder: "请输入",
            clearable: true,
            span: 6
          },
          {
            type: "input",
            label: "签租时间",
            prop: "contractTime",
            placeholder: "选择日期时间",
            span: 6,
            format: "yyyy-MM-dd",
            valueFormat: "timestamp"
          },
          {
            type: "input",
            label: "到期时间",
            prop: "expireTime",
            placeholder: "选择日期时间",
            span: 6,
            format: "yyyy-MM-dd",
            valueFormat: "timestamp"
          },
          {
            prop: "btn",
            span: 6,
            pull: 6,
            formslot: true
            // width: 20
          }
        ]
      },
      leaseContractTable: {
        ref: "leaseContractTable",
        customTop: true,
        operation: {
          width: 200
        },
        data: [],
        columnConfig: [],
        uiConfig: {
          height: "auto", //"", //高度
          selection: true, //是否多选
          showIndex: {
            width: 50
          },
          pagination: {
            //是否分页，分页是否自定义
            layout: "total,->, prev, pager, next, jumper",
            pageSizes: [10, 20, 50],
            handler(pageSize, currentPage, table) {
              _this.handleCurrentChange(currentPage);
            }
          }
        }
      },
      currentPage: 1,
      contractIds: ""
    };
  },
  methods: {
    submit() {},
    resetChange() {},
    addContract() {
      this.$router.push("/addContract");
    },
    onClickSearchBtn2() {
      this.curPage = 1;
      this.$refs[this.assetsTableConfig.ref].setCurrentPage(1);
      this.getAssetList();
    },
    clearForm(...args) {
      console.log("清空", ...args);
      this.$refs[this.leaseContractForm.ref].resetForm();
    },
    async contractList() {
      let labelList = [
        { label: "合同编号", prop: "contractNumber" },
        { label: "合同名称", prop: "contractName" },
        { label: "所租房产", prop: "houseName" },
        { label: "租户名称", prop: "tenantName" },
        { label: "联系方式", prop: "telephone" },
        { label: "签约时间", prop: "contractTime" },
        { label: "到期时间", prop: "expireTime" }
      ];
      this.leaseContractTable.columnConfig = labelList;
      let res = await LeaseManageApi.contractList({
        pageNum: this.currentPage,
        pageSize: 10
      });
      if (res && res.list) {
        this.leaseContractTable.data = res.list;
        this.leaseContractTable.uiConfig.pagination.total = res.total;
      }
    },
    onClickSearchBtn(...args) {
      this.$refs[this.leaseContractForm.ref].getFormModel(res => {
        console.log("model", res);
      });
      console.log("搜索", ...args);
      this.curPcurrentPageage = 1;
      // this.$refs[this.leaseContractTableConfig.ref].setCurrentPage(1)
      this.contractList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.contractList();
    },
    showDeleteTip() {
      CommonFun.deleteTip(
        this,
        this.contractIds,
        "请至少选择一条信息！",
        this.sureDelete,
        this.cancelDelete
      );
    },
    async sureDelete() {
      await LeaseManageApi.removeContract({
        contractIds: this.contractIds
      });
      this.$message({
        type: "success",
        message: "删除成功!"
      });
      this.contractIds = "";
      this.contractList();
    },
    cancelDelete() {
      this.contractIds = "";
    },
    delRow(obj) {
      console.log("res", obj);
      this.contractIds = obj.scopeRow.row.contractId;
      this.showDeleteTip();
    },
    batchDels(obj) {
      this.contractIds =
        this.$refs["leaseContractTable"].getSelectedData().length &&
        this.$refs["leaseContractTable"]
          .getSelectedData()
          .map(item => item.contractId)
          .join(",");
      this.showDeleteTip();
    },
    editRow(obj) {
      this.$router.push({
        name: "AddContract",
        query: {
          editContractId: obj.scopeRow.row.contractId
        }
      });
    },
    detailContract(obj) {
      this.$router.push({
        name: "AddContract",
        query: {
          extraOptions: {
            disabled: true,
            submitBtn: false
          },
          detailContractId: obj.scopeRow.row.contractId
        }
      });
    }
  },
  mounted() {
    this.contractList();
  }
};
</script>

<style lang="less">
.lease-contract {
  .condition-box {
    margin-bottom: 20px;
    background: @white;
    padding: 20px;
    // background: pink;
  }
  .lease-contract-table {
    background: @white;
    padding: 20px;
    .operator-box {
      background: @white;
      .el-button {
        margin-left: 20px;
      }
    }
  }
  // .el-input {
  //   width: 180px!important;
  // }
}
</style>