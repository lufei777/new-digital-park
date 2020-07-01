<template>
  <!-- 租赁月账单明细查询 -->
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
            >查询</el-button>
            <el-button
              :disabled="obj.disabled"
              @click="clearForm(obj)"
            >重置</el-button>
          </div>
        </template>
      </z-form>
    </div>

    <div class="lease-contract-table panel">
      <div class="tab-title flex-align-between">
        <span> </span>
        <em>{{title}}</em>
      </div>
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
              size='small'
              type="primary"
            >自定义查询结果</el-button>
            <el-button
              type="primary"
              @click="generate(obj)"
            >打印</el-button>
            <el-button
              type="primary"
              @click="exportFile(obj)"
            >导出</el-button>
          </div>
        </template>

        <!-- <template
          slot="operation"
          slot-scope="obj"
        >
          <el-button
            type="text"
            @click="editRow(obj)"
          >更新金额</el-button>
          <el-button
            type="text"
            @click="delRow(obj)"
          >作废</el-button>
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
  name: "monthrentalbill",
  data() {
    let _this = this;
    return {
      title: "2020年 5-7 月租赁月账单查询",
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
            format:'MM'
          },

          //  租户名称
          {
            label: "租户名称",
            type: "input",
            span: 6,
            prop: "rentName"
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
        // 操作设置
        // operation: {
        //   width: 200
        // },
        // props: {
        //   rowKey: "contractId"
        // },
        data: [],
        columnConfig: [],
        serverMode: {
          url: LeaseManageApi.queryMonthBillDetailed,
          data: pageInfo
        },
        propsHttp: {
          list: "data",
          total: "total",
          pageSize: "pageSize",
          pageNum: "pageNum"
        },
        uiConfig: {
          height: "auto", //"", //高度
          selection: false, //是否多选
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
  computed: {
    Form() {
      return this.$refs[this.leaseContractForm.ref];
    },
    Table() {
      return this.$refs[this.leaseContractTable.ref];
    }
  },
  methods: {
    submit() {},
    resetChange() {},
    clearForm(...args) {
      this.$refs[this.leaseContractForm.ref].resetForm();
    },
    async contractList() {
      let labelList = [
        { label: "账单编号", prop: "billNumber" },
        { label: "合同编码", prop: "contractNumber" },
        { label: "合同名称", prop: "contractName" },
        { label: "账期", prop: "billTime" },
        { label: "租户名称", prop: "tenantName" },
        { label: "账单金额", prop: "billCost" },
        { label: "租金", prop: "leaseCost" },
        { label: "物业费", prop: "propertyFeeCost" },
        { label: "电费", prop: "electricityFeesCost" },
        { label: "水费", prop: "waterCost" },
        { label: "维修费", prop: "maintenanceCost" },
        { label: "会议费", prop: "meetingCost" },
        { label: "视频会议费", prop: "videoMeetingCost" },
        { label: "停车券费", prop: "stopCatCost" },
        { label: "停车月租", prop: "stopCatMonthCost" },
        { label: "公务车有偿使用", prop: "officialVehicleCost" }
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

    // 导出
    exportFile(obj){
      // /oaApi/month/bill/exportMonthBillDetailed
      //  let url = '/oaApi/stockDeal/exportRecord'
       let url = '/oaApi/month/bill/exportMonthBillDetailed'
        let params=''
        let arr = this.$refs[this.leaseContractTable.ref].getSelectedData()
        let stockRecordIds = arr.length?arr.map((item)=>item.id):''
        for(let key in this.leaseContractTable.serverMode.data){
          if(key!=pageInfo){
            params+=key+'='+this.leaseContractTable.serverMode.data[key]+'&'
          }
        }
        params+='stockRecordIds='+stockRecordIds
        CommonFun.exportMethod({url, params})

      // LeaseManageApi.exportMonthBillDetailed().then(res =>{
      //   console.log(res)
      // })
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
    //生成
    generate(obj) {
      console.log(obj);
    },
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
.tab-title {
  width: 57%;
  height: 50px;
  line-height: 50px;

  span {
    color: red;
    font-size: 14px;
  }

  em {
    font-style: normal;
    font-size: 20px;
  }
}
</style>