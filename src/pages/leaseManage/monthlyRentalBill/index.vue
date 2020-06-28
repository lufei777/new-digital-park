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
            <el-button :size="obj.size" type="primary" @click="generate(obj)">生成</el-button>
            <el-button :size="obj.size" type="primary" @click="addContract(obj)">新增</el-button>
          </div>
        </template>

        <template slot="operation" slot-scope="obj">
          <!-- <el-button type="text" @click="detailContract(obj)">详情</el-button> -->
          <el-button type="text" @click="editRow(obj)">更新金额</el-button>
          <el-button type="text" @click="delRow(obj)">作废</el-button>
        </template>
      </z-table>
    </div>
  </div>
</template>

<script>
import LeaseManageApi from "@/service/api/leaseManage";
import CommonFun from "@/utils/commonFun";
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
            label:'月账单编号',
            type:'input',
            span:6,
            prop:'monthSerial'
        },

        // 合同名称
        {
            label:'合同名称',
            type:'input',
            span:6,
            prop:'contractName'
        },
        
        //  账期
        {
            label:'账期',
            type:'month',
            span:6,
            prop:'paymentDays',
            valueFormat: "yyyy-MM",
            format: "yyyy-MM",
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
  computed:{
      Form() {
          return this.$refs[this.leaseContractForm.ref]
      },
      Table() {
          return this.$refs[this.leaseContractTable.ref]
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
        { label: "租赁月账单编号", prop: "contractNumber" },
        { label: "租户", prop: "contractName" },
        { label: "合同名称", prop: "houseName" },
        { label: "账期", prop: "tenantName" },
        { label: "收费项目数", prop: "telephone" },
        { label: "账单金额合计(元)", prop: "contractTime" },
        { label: "账单状态", prop: "expireTime" },
        { label: "本次冲抵额(元)", prop: "1" },
        { label: "租户类型", prop: "2" }
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
    //生成
    generate() { },
    // 新增
    addContract() { 
        this.$router.push({path:'addmothly'})
    },
    // 更新
    editRow(){},
    // 作废
    delRow() { }
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