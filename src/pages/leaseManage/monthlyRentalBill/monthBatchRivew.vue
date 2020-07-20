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
        :selectable="row => isCurrentUser(row.operator) && hasRejected(row.status)"
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
            <!-- <el-button
              :size="obj.size"
              type="primary"
              @click="batchReview(obj)"
            > 批量审核</el-button> -->
            <el-button
              :size="obj.size"
              v-if="obj.allData.length >=2 "
              type="primary"
              @click="batchPass(obj)"
              :disabled='!obj.selectedData.length'
            >批量通过</el-button>
            <el-button
              :size="obj.size"
              type="primary"
              @click="goback(obj)"
            >返回</el-button>
            <el-button
              @click="batchSubmit(obj)"
              :disabled='obj.allData.length > 1'
            > 提交</el-button>
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
import { ElectricityManageDic } from "@/utils/dictionary";
const { status } = ElectricityManageDic;
let pageInfo = {
  pageNum: 1,
  pageSize: 10
};
export default {
  name: "monthBatchReview",
  data() {
    let _this = this;
    return {
      off: true,
      model: {},
      leaseContractTable: {
        ref: "leaseContractTable",
        customTop: true,
        editBtn: false,

        serverMode: {
          url: LeaseManageApi.queryNeedExamineDate,
          data: { ids: this.ids }
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
    },
    ids() {
      return this.$route.query.ids;
    },
    // 前用户
    userInfo() {
      return this.$store.getters.userInfo;
    }
  },
  methods: {
    // 是否审核
    hasCheck(val) {
      return status[0].value === val || status[3].value === val;
    },
    // 是否驳回
    hasRejected(val) {
      return status[2].value === val;
    },
    // 是否是当前用户
    isCurrentUser(operatorId) {
      return this.userInfo.id === operatorId;
    },
    goback() {
      this.$router.back();
    },
    loadeddata(data) {
      // console.log("data", data);
      data.data.forEach(curRow => {
        this.Table.rowCellEdit(curRow, curRow.$index);
      });
    },

    rowUpdate(model, index, done) {
      console.log("保存", model, index, done);
    },
    // 表格中的编辑
    rowEdit(model, index, done) {
      console.log("编辑", model, index, done);
    },
    // 表格中的取消编辑
    rowEditCancel(model, index) {
      console.log("取消编辑", model, index);
    },
    //批量通过
    batchPass({ selectedData }) {
      // console.log("selectedData", selectedData);
      this.Table.setColumnByProp("billStatus", {
        disabled: true
      });
      selectedData.forEach(curRow => {
        // this.Table.setColumnByProp("statusName", {
        //   disabled: true
        // });
        // curRow.cell = false
        curRow.billStatus = 1;
        // this.Table.rowCellEdit(curRow, curRow.$index);
      });

      // this.$nextTick(() => {

      // });
    },
    tabelrowCellEdit() {
      // let arr = this.allData;
      //   let arr = this.$refs[this.leaseContractTable.ref].allData;
      // arr =
      // arr =
      // arr =
      console.log("arr", arr);
    },
    // 批量审核
    batchReview(obj) {
      // this.Table.$cellEdit= true
      console.log("obj", obj.selectedData);
      obj.selectedData.forEach(item => {
        // rowCell(row,index){
        //     this.$cellEdit= true
        // };
        // item.$cellEdit = true;
        console.log("item", item.$index);
      });
    },
    // 提交 { selectedData }
    batchSubmit({ tableShowData }) {
      let res = [];
      tableShowData.forEach(curRow => {
        res.push(this.Table.rowCellUpdate(curRow, curRow.$index));
      });
      Promise.all(res).then(res => {
        LeaseManageApi.useMonthBillExamine(tableShowData).then(res => {
          this.$message({
            type: "success",
            message: "已提交审核结果！"
          });
          this.$router.back();
        });
      });
    },
    // 审核
    Review() {
      this.$router.push("/monthbillbatchreview");
    },
    resetChange() {},
    async contractList() {
      let labelList = [
        { label: "租赁月账单编号", prop: "billNumber" },
        { label: "租户", prop: "tenantName" },
        { label: "合同名称", prop: "contractName" },
        { label: "账期", prop: "billTime" },
        { label: "收费项目数", prop: "chargeItems" },
        { label: "账单金额合计(元)", prop: "billTotalAmount" },
        {
          label: "账单状态",
          prop: "billStatus",
          type: "select",
          dicData: [
            { label: "通过", value: 1 },
            { label: "未通过", value: 2 }
          ]
        },
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
          prop: "examineResult",
          type: "select",
          cell: true,
          dicData: [
            { label: "通过", value: 1 },
            { label: "驳回", value: 2 }
          ]
        },
        {
          label: "审核意见",
          prop: "detailsIdea",
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
    }
  },
  created() {},
  mounted() {
    this.contractList();

    this.$refs[this.leaseContractTable.ref].setCurrentPage(1);
    this.leaseContractTable.serverMode.data = { ids: this.ids };
    this.$refs[this.leaseContractTable.ref].refreshTable().then(res => {
      this.loadeddata(res);
    });
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