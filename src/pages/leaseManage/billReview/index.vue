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

    <div
      class="lease-contract-table panel"
      id='printTest'
    >
      <!-- 已审核表格 -->

      <z-table
        :ref="leaseContractTable.ref"
        :options="leaseContractTable"
      >
        <template
          slot="custom-top"
          slot-scope="obj"
        >
          <div class="operator-box flex-row-reverse">
            <!-- <el-button
              :size="obj.size"
              type="primary"
              @click="generate(obj)"
            >生成</el-button> -->
            <el-button
              :size="obj.size"
              type="primary"
              @click="exportFile()"
            >导出</el-button>
            <el-button
              :size="obj.size"
              type="primary"
              v-print='"#printTest"'
            >打印</el-button>
            <el-button
              :size="obj.size"
              @click="batchRiview(obj)"
              type="primary"
            >批量审核</el-button>
          </div>
        </template>

        <template
          slot="operation"
          slot-scope="obj"
        >
          <el-button
            type="text"
            @click="canSee(obj)"
          >查看</el-button>
          <el-button type="text">审核</el-button>
        </template>
      </z-table>

    </div>
  </div>
</template>

<script>
import LeaseManageApi from "@/service/api/leaseManage";
import CommonFun from "@/utils/commonFun";
//导入字典
import { LeaseManageDic } from "../../../utils/dictionary";
let pageInfo = {
  pageNum: 1,
  pageSize: 10
};
// 审核状态的定义

export default {
  name: "billReview",
  data() {
    let _this = this;
    return {
      // 控制已审核和待审核显示的开关
      open: true,
      off: false,
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

          //  租户
          {
            label: "租户",
            type: "input",
            span: 6,
            prop: "tenantName"
            // valueFormat: "yyyy-MM-dd",
            // format: "yyyy-MM-dd"
          },
          // 审核状态
          {
            label: "审核状态",
            type: "select",
            span: 6,
            prop: "billStatus",
            dicData: LeaseManageDic.checkStatus
          },
          {
            prop: "btn",
            span: 6,
            pull: 6,
            // offset: 4,
            formslot: true
            // width: 20
          }
        ]
      },

      leaseContractTable: {
        ref: "tb1",
        customTop: true,
        serverMode: {
          url: LeaseManageApi.querySumStatContract,
          data:{...pageInfo}
        },
        propsHttp: {
          list: "data",
          total: "total",
          pageSize: "pageSize",
          pageNum: "pageNum"
        },
        operation: {
          width: 200
        },
        props: {
          rowKey: "contractId"
        },
        data: [
          // {
          //   billNumber: "12",
          //   billStatus: "12",
          //   contractName: "12",
          //   year: "12",
          //   month: "",
          //   tenantName: "21",
          //   houseArea: "",
          //   sumCost: "1221",
          //   offsset: "12"
          // }
        ],
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
    }
  },
  methods: {
    // 批量审核
    batchRiview(obj){
      // 需要携带参数
      this.$router.push('/batchreview')
    },
    canSee(obj) {
      console.log("obj.row", obj.row);
      let path = {
        path: "/cansee",
        query: { flag: "detail", billNumber: obj.row.billNumber }
      };
      this.$router.push(path);
    },
    submit(model, hide) {
      console.log("model", model);
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
    // 导出/oaApi/month/bill/exportMonthBillExamine
    exportFile() {
      let url = "/oaApi/month/bill/exportMonthBillExamine";
      let params = "";
      let arr = this.$refs[this.leaseContractTable.ref].getSelectedData();
      let stockRecordIds = arr.length ? arr.map(item => item.id) : "";
      for (let key in this.leaseContractTable.serverMode.data) {
        if (key != pageInfo) {
          params +=
            key + "=" + this.leaseContractTable.serverMode.data[key] + "&";
        }
      }
      params += "stockRecordIds=" + stockRecordIds;
      CommonFun.exportMethod({ url, params });
    },
    // 已审核
    async contractList() {
      let labelList = [
        { label: "租赁月账单编号", prop: "billNumber" },
        { label: "审核状态", prop: "billStatus",type:'select',dicData: LeaseManageDic.checkStatus },
        { label: "合同名称", prop: "contractName" },
        { label: "年度", prop: "year" },
        { label: "月份", prop: "month" },
        { label: "租户名称", prop: "tenantName" },

        { label: "合同面积", prop: "houseArea" },
        { label: "账单金额合计(元)", prop: "sumCost" },
        { label: "本次冲抵额(元)", prop: "offsset" }
      ];
      this.leaseContractTable.columnConfig = labelList;
    },

    // 搜索
    onClickSearchBtn(...args) {
      this.Form.submit();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.contractList();
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
  created() {
    this.$nextTick(() => {
      // this.$refs[this.leaseContractTable.ref].setColumnByProp("tenant", {
      //   dicData: [
      //     { label: "内租户", value: 1 },
      //     { label: "外租户", value: 2 }
      //   ]
      // });
    });
  },
  mounted() {
    this.contractList();
    // this.tabelList()
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
    .btn_top {
      margin-bottom: 10px;
      span {
        display: inline-block;
        //  border-radius: 6px;
        padding: 8px 14px;
        cursor: pointer;
        background-color: rgb(160, 209, 250);
      }
    }
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