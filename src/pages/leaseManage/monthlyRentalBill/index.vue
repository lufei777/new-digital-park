<template>
  <!-- 租赁月账单 -->
  <div class="lease-contract panel-container">
    <div class="condition-box radius-shadow">
      <z-form
        :ref="leaseContractForm.ref"
        :options="leaseContractForm"
        v-model="model"
        @submit="submit"
        @reset-change="resetChange"
      >
        <template
          slot="btn"
          slot-scope="obj"
        >
          <div>
            <el-button
              :disabled="obj.disabled"
              type="primary"
              @click="onClickSearchBtn(obj)"
            >搜索</el-button>
            <el-button
              :disabled="obj.disabled"
              @click="clearForm(obj)"
            >清除</el-button>
          </div>
        </template>
      </z-form>
    </div>

    <div class="lease-contract-table panel">
      <!-- isCurrentUser(row.operator) && -->
      <!-- row =>isCurrentUser(row.operator) && hasRejected(row.billStatus) -->
      <z-table
        :ref="leaseContractTable.ref"
        :options="leaseContractTable"
        :selectable="row =>!isCurrentUser(row.operator) && hasCheck(row.billStatus)"
      >
        <template
          slot="custom-top"
          slot-scope="obj"
        >
          <div class="operator-box flex-row-reverse">
            <el-button
              v-if=""
              :size="obj.size"
              type="primary"
              @click="batchReview(obj)"
              :disabled='!obj.selectedData.length'
            >批量审核</el-button>
            <el-button
              :size="obj.size"
              type="primary"
              @click="addContract(obj)"
            >新增</el-button>
          </div>
        </template>

        <template
          slot="operation"
          slot-scope="obj"
        >
          <!-- <el-button type="text" @click="detailContract(obj)">详情</el-button> -->
          <el-button
            type="text"
            @click="editRow(obj)"
          >更新金额</el-button>
          <el-button
            type="text"
            @click="delRow(obj)"
          >作废</el-button>

          <!-- 根据更改租赁月账单中添加审核和批量审核 -->
          <!-- 审核的 v-if="obj.row.billStatus!==1 && obj.row.billStatus!==2 " -->
          <!-- 生成的  v-if="obj.row.billStatus===1 || obj.row.billStatus===2 "-->
          <!-- <template v-if="hasCheck(obj.row.billStatus) && !isCurrentUser(obj.row.operator)">
            <el-button
              type='text'
              @click="Review(obj)"
            >审核</el-button>
          </template>
          <template  v-if="!hasCheck(obj.row.billStatus) && !hasRejected(obj.row.billStatus)"> 
            <el-button
              type="text"             
              @click="generate(obj)"
            >生成</el-button>
          </template> -->

          <!-- ================================================================== -->
          <template v-if="!hasRejected(obj.row.billStatus) ">
            <template v-if="hasCheck(obj.row.billStatus) && !isCurrentUser(obj.row.operator) ">
              <el-button
                type='text'
                @click="Review(obj)"
              >审核</el-button>
            </template>
            <template v-if="hasGenerate(obj.row.billStatus)">
              <el-button
                type="text"
                @click="generate(obj)"
              >生成</el-button>
            </template>
          </template>

          <el-button type='text'>审核记录</el-button>
        </template>
      </z-table>
    </div>
  </div>
</template>

<script>
import LeaseManageApi from "@/service/api/leaseManage";
import CommonFun from "@/utils/commonFun";
import { LeaseManageDic } from "@/utils/dictionary";
const { billStatus } = LeaseManageDic;
let pageInfo = {
  pageNum: 1,
  pageSize: 10
};
export default {
  name: "monthrentalbill",
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
          // 月账单编号
          {
            label: "月账单编号",
            type: "input",
            span: 6,
            prop: "billNumber"
          },

          // 合同名称
          {
            label: "合同名称",
            type: "input",
            span: 6,
            prop: "contractName"
          },

          //  账期
          {
            label: "账期",
            type: "month",
            span: 6,
            prop: "billTime",
            valueFormat: "yyyy-MM",
            format: "yyyy-MM"
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
        serverMode: {
          url: LeaseManageApi.queryMonthBillList,
          data: {
            ...pageInfo
          }
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
          rowKey: "contractId"
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
    Form() {
      return this.$refs[this.leaseContractForm.ref];
    },
    Table() {
      return this.$refs[this.leaseContractTable.ref];
    },
    // 前用户
    userInfo() {
      return this.$store.getters.userInfo;
    }
  },
  methods: {
    // 生成
    hasGenerate(val) {
      return billStatus[1].value === val;
    },
    // 是否审核
    hasCheck(val) {
      // 待审核
      return billStatus[0].value === val;
      // return billStatus[0].value === val || billStatus[3].value === val;
    },
    hasChecking(val) {
      return billStatus[0].value === val || billStatus[3].value === val;
    },
    // 待审核和已审核
    hasReviewed(val) {
      let off = false;
      if (billStatus[0].value === val || billStatus[3].value === val) {
        off = true;
      }
      console.log("off", off);
      return off;
      // return billStatus[0].value === val || billStatus[3].value === val;
    },
    // 是否驳回
    hasRejected(val) {
      // 已驳回
      return billStatus[2].value === val;
    },
    // 是否是当前用户
    isCurrentUser(operatorId) {
      // console.log("this.userInfo", this.userInfo);
      return this.userInfo.id === operatorId;
    },
    // 是否具有审核权限
    isReview() {
      // if(this.userInfo.id ===this.userInfo.)
    },
    // 批量审核
    batchReview({ selectedData }) {
      let str = "";
      selectedData.forEach(item => {
        str += item.id + ",";
      });
      str = str.substr(0, str.length - 1);
      this.$router.push({ path: "/monthbillbatchreview", query: { ids: str } });
    },
    // 审核
    Review(obj) {
      this.$router.push({
        path: "/monthbillbatchreview",
        query: { ids: obj.row.id }
      });
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
        // { label: "账单金额合计(元)", prop: "billTotalAmount" },
        {
          label: "账单状态",
          prop: "billStatus",
          type: "select",
          dicData: billStatus
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
      CommonFun.confirmTip(
        this.contractIds,
        "请至少选择一条信息！",
        '确定要删除吗？',
        this.sureDelete,
        this.cancelDelete
      );
    },
    // 新增
    addContract() {
      this.$router.push({ path: "addmothly" });
    },
    deleteRow(billNumber) {
      LeaseManageApi.deleteMonthBill({ billNumber: billNumber }).then(res => {
        this.Table.refreshTable();
        // this.
      });
    },
    // 更新
    editRow(obj) {
      console.log("obj.row", obj.row);
    },
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
