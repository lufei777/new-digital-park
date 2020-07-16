<template>
  <!-- 租赁月账单 -->
  <div class="lease-contract panel-container">
    <div class="lease-contract-table panel">
      <div
        class="sh"
        style="padding:0 10px;font-weight:bold"
      >审核</div>
      <el-divider></el-divider>

      <z-table
        :ref="leaseContractTable.ref"
        :options="leaseContractTable"
        @row-update="rowUpdate"
        @row-edit="rowEdit"
        @row-edit-cancel="rowEditCancel"
      >
        <template
          slot="custom-top"
          slot-scope="obj"
        >
          <div class="operator-box flex-row-reverse">
              <!-- :disabled='!obj.selectedData.length' -->
            <el-button
              :size="obj.size"
              type="primary"
              @click="batchReview(obj)"
            >批量通过</el-button>
            <el-button
              :size="obj.size"
              type="primary"
              @click="goback(obj)"
            >返回</el-button>
            <el-button>提交</el-button>
          </div>
        </template>

        <template
          slot="operation"
          slot-scope="obj"
        >
          <!-- <el-button type="text" @click="detailContract(obj)">详情</el-button> -->
          <!-- 根据更改租赁月账单中添加审核和批量审核 -->
          <el-button
            type='text'
            @click="Review()"
          >详情</el-button>
        </template>
      </z-table>
    </div>
  </div>
</template>

<script>
import LeaseManageApi from "@/service/api/leaseManage";
import CommonFun from "@/utils/commonFun";
let pageInfo = {
  pageNum: 1,
  pageSize: 10
};
export default {
  name: "monthBatchReview",
  data() {
    let _this = this;
    return {
      model: {},
      leaseContractTable: {
        ref: "leaseContractTable",
        customTop: true,
        editBtn: true,
        serverMode: {
          url: LeaseManageApi.queryMonthBillList,
          data: pageInfo
        },
        propsHttp: {
          list: "data",
          total: "total",
          pageSize: "pageSize",
          pageNum: "pageNum"
        },
        operation: {
          width: 250
        },
        props: {
          rowKey: "id"
        },
        data: [],
        columnConfig: [],
        uiConfig: {
          height: "auto", //"", //高度
          selection: true, //是否多选
          showIndex: {
            width: 50
          }
        }
      },
      currentPage: 1,
      contractIds: ""
    };
  },
  computed: {
    Table() {
      return this.$refs[this.leaseContractTable.ref];
    }
  },
  methods: {
    rowUpdate(model, index, done) {
      console.log("保存", model, index,done);
    },
    // 表格中的编辑
    rowEdit(model, index,done) {
      console.log("编辑", model, index,done);
    },
    // 表格中的取消编辑
    rowEditCancel(model, index) {
      console.log("取消编辑", model, index);
    },
    // 批量审核
    batchReview() {
    //   this.$router.push("/monthbillbatchreview");
        this.Table.$cellEdit= true
    },
    // 审核
    Review() {
      this.$router.push("/monthbillbatchreview");
    },
    submit(model, hide) {
      hide();
      this.leaseContractTable.serverMode.data = Object.assign(
        _.cloneDeep(pageInfo),
        model
      );
      this.$refs[this.leaseContractTable.ref].refreshTable();
    },
    resetChange() {},
    clearForm(...args) {
      this.$refs[this.leaseContractForm.ref].resetForm();
    },
    async contractList() {
      let labelList = [
        { label: "租赁月账单编号", prop: "billNumber" },
        { label: "租户", prop: "tenantName" },
        { label: "合同名称", prop: "contractName" },
        { label: "账期", prop: "billTime" },
        { label: "收费项目数", prop: "chargeItems" },
        { label: "账单金额合计(元)", prop: "billTotalAmount" },
        { label: "账单状态", prop: "billStatus" },
        { label: "本次冲抵额(元)", prop: "offsset" },
        {
          label: "租户类型",
          prop: "tenant",
          type: "select",
          dicData: [
            { label: "内租户", value: 1 },
            { label: "外租户", value: 2 }
          ]
        },
        {
          label: "审核结果",
          prop: "2",
          type: "select",
          cell: true,
          dicData: [
            { label: "已通过", value: 1 },
            { label: "未通过", value: 2 },
            { label: "已审核", value: 3 },
            { label: "已驳回", value: 4 }
          ]
        },
        {
          label: "审核意见",
          type: "input",
          cell: true,
          width: 300
        }
      ];
      this.leaseContractTable.columnConfig = labelList;
      //   let res = await LeaseManageApi.contractList({
      //     pageNum: this.currentPage,
      //     pageSize: 10
      //   });
      //   if (res && res.list) {
      //     this.leaseContractTable.data = res.list;
      //     this.leaseContractTable.uiConfig.pagination.total = res.total;
      //   }
    },
    // 生成
    generate(obj) {
      console.log(obj);
      this.$router.push({
        path: "/recordedtaile",
        query: { billNumber: obj.row.billNumber }
      });
    },
    // 搜索
    onClickSearchBtn(...args) {
      this.Form.submit();
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
    // 新增
    goback() {
      this.$router.back();
    },
    deleteRow(billNumber) {
      LeaseManageApi.deleteMonthBill({ billNumber: billNumber }).then(res => {
        this.Table.refreshTable();
        // this.
      });
    },
    // 更新
    editRow() {},
    // 作废
    delRow(obj) {
      var billNumber = obj.row.billNumber;
      this.$confirm("确认作废吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.deleteRow(billNumber);
      });
    }
  },
  created() {},
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