<template>
  <!-- 租赁月账单综合查询 ---合同统计 -->
  <div class="lease-contract panel-container">

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
            valueFormat: "yyyy"
            // format:'yyyy'
          },
          //   {
          //     label: "时间日期范围",
          //     prop: "daterange",
          //     type: "daterange",
          //     span: 10,
          //     valueFormat: "yyyy-MM-dd HH:mm:ss",
          //     startPlaceholder: "时间日期开始范围自定义",
          //     endPlaceholder: "时间日期结束范围自定义"
          //   },

          // 月
          {
            label: "月",
            type: "month",
            span: 6,
            prop: "month",
            valueFormat: "MM",
            format: "MM"
          },


          //  合同
          {
            label: "合同",
            type: "input",
            span: 6,
            prop: "contractName",
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
          url: LeaseManageApi.querySumStatContract,
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
          // pagination: {
          //   //是否分页，分页是否自定义
          //   layout: "total,->, prev, pager, next, jumper",
          //   pageSizes: [10, 20, 50],
          //   handler(pageSize, currentPage, table) {
          //     _this.handleCurrentChange(currentPage);
          //   }
          // }
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
      this.leaseContractTable.serverMode.data = Object.assign(_.cloneDeep(pageInfo), model);
      this.Table.refreshTable();
    },
    resetChange() {},
    clearForm(...args) {
      this.$refs[this.leaseContractForm.ref].resetForm();
    },
    async contractList() {
      let labelList = [
        { label: "账期", prop: "billTime" },
        { label: "月账单编号", prop: "contractNumber" },
        { label: "收费通知单号", prop: "chargeNotice" },
        { label: "合同名称", prop: "contractName" },
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

    exportFile(obj) {
      console.log(111);
      let url = "/oaApi/month/bill/exportSumStatContract";
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
    // 搜索
    onClickSearchBtn(...args) {
      this.Form.submit()
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