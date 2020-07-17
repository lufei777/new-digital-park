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
            <!-- <el-button
              :size="obj.size"
              type="primary"
              @click="batchReview(obj)"
            > 批量审核</el-button> -->
            <el-button
              :size="obj.size"
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
              :disabled='!obj.selectedData.length'
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
let pageInfo = {
  pageNum: 1,
  pageSize: 10
};
export default {
  name: "monthBatchReview",
  data() {
    let _this = this;
    return {
      ids: "",
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
    }
  },
  methods: {
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
      console.log("selectedData", selectedData);
      selectedData.forEach(curRow => {
        // curRow.cell = false
        curRow.edit = 1;
        this.Table.rowCellEdit(curRow, curRow.$index);
      });
    },
    tabelrowCellEdit() {
        let arr = this.allData;
    //   let arr = this.$refs[this.leaseContractTable.ref].allData;
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
    batchSubmit(obj) {
      console.log("obj", obj);
      //   LeaseManageApi.useMonthBillExamine(selectedData).then(res => {
      //     this.$message({
      //       type: "success",
      //       message: "提交成功！"
      //     });
      //   });

      // let arr = selectedData
      // arr = arr.push(selectedData);
      //   let http = new Promise();
      //   http.all(selectedData).then(()=> {
      //       LeaseManageApi.useMonthBillExamine(selectedData).then(res=>{
      //           this.$message({
      //               type:'success',
      //               message:'提交成功！'
      //           })
      //       })
      //   })
      //   let tp = Promise.all(selectedData);
      //   tp.then(res => {
      //     this.$message({
      //       type: "success",
      //       message: "提交成功！"
      //     });
      //   });
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
          prop: "statusName",
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
  created() {
    this.ids = this.$route.query.ids;
  },
  mounted() {
    this.contractList();
    this.$refs[this.leaseContractTable.ref].setCurrentPage(1);
    this.leaseContractTable.serverMode.data = { ids: this.ids };
    this.$refs[this.leaseContractTable.ref].refreshTable();
    
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