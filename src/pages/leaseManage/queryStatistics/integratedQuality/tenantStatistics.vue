<template>
  <!-- 租赁月账单综合查询 --- 租户统计  -->
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

    <div class="lease-contract-table panel" id='printTest'>
      <z-table
        :ref="leaseContractTable.ref"
        :options="leaseContractTable"
      >
        <template
          slot="custom-top"
          slot-scope="obj"
        >
          <div class="operator-box flex-row-reverse">
            <el-button
              :size="obj.size"
              type="primary"
             v-print="'#printTest'"
            >打印</el-button>
            <el-button
              :size="obj.size"
              type="primary"
              @click="exportFile(obj)"
            >导出</el-button>
          </div>
        </template>

        <!-- <template slot="operation" slot-scope="obj">
          <el-button type="text" @click="editRow(obj)">更新金额</el-button>
          <el-button type="text" @click="delRow(obj)">作废</el-button>
        </template> -->
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
  name: "integrated",
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
          // 年
          {
            label: "年",
            type: "year",
            span: 6,
            prop: "year",
            valueFormat: "yyyy",
            format: "yyyy"
          },

          // 月
          {
            label: "月",
            type: "month",
            span: 6,
            prop: "month",
            valueFormat: "MM",
            format: "MM"
          },

          //  租户名称
          {
            label: "租户名称",
            type: "input",
            span: 6,
            prop: "tenantName"
          },
          // // 租赁区域
          // {
          //     label:'租赁区域',
          //     type:'input',
          //     span:6,
          //     prop:'paymentDays',
          // },

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
          url: LeaseManageApi.querySumStatTenant,
          data: pageInfo
        },
        propsHttp: {
          list: "data",
          total: "total",
          pageSize: "pageSize",
          pageNum: "pageNum"
        },
        // props: {
        //   rowKey: "contractId"
        // },
        data: [],
        columnConfig: [],
        uiConfig: {
          height: "auto", //"", //高度
          selection: false, //是否多选
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
    submit(model, hide) {
      hide();
      this.leaseContractTable.serverMode.data = Object.assign(
        _.conleDeep(pageInfo),
        model
      );
      this.Table.refreshTable()
    },
    resetChange() {},
    clearForm(...args) {
      this.$refs[this.leaseContractForm.ref].resetForm();
    },
    async contractList() {
      let labelList = [
        { label: "年份", prop: "year" },
        { label: "月度", prop: "month" },
        { label: "租户名称", prop: "tenantName" },
        { label: "租户面积(㎡)", prop: "houseArea" },
        { label: "账单金额合计(元)", prop: "sumCost" },
        { label: "本次冲抵金额(元)", prop: "offsset" },
        { label: "核定金额(元)", prop: "approvedAmount" },
        { label: "租金(元)", prop: "leaseCost" },
        { label: "物业费(元)", prop: "propertyFeeCost" },
        { label: "保洁费(元)", prop: "cleaningCost" },
        { label: "其他(元)", prop: "otherCost" }
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
    // 搜索
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
    // 导出
    exportFile(obj) {
      let url = "/oaApi/month/bill/exportSumStatTenant";
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
    //生成
    generate() {},
    // 新增
    addContract() {
      this.$router.push({ path: "addmothly" });
    },
    // 更新
    editRow() {},
    // 作废
    delRow() {}
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