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
      <!-- <div class="nav">
        <el-menu
          class="el-menu-demo"
          :default-active="$route.path"
          mode="horizontal"
          @select="handleSelect"
          router
        >
          <el-menu-item index="/auditing">待审核</el-menu-item>
          <el-menu-item index="/checked">已审核</el-menu-item>
        </el-menu>
        <router-view></router-view>
      </div> -->
      <!-- 按钮 -->
      <div class="btn_top">
        <span>已审核</span> <span>待审核</span>
      </div>
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
            type: "date",
            span: 6,
            prop: "billTime",
            valueFormat: "yyyy-MM-dd",
            format: "yyyy-MM-dd"
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
      tabels: [
        {
          leaseContractTable: {
            ref: "leaseContractTable1",
            customTop: true,
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
              }
            }
          }
        },
        {
          leaseContractTable: {
            ref: "leaseContractTable",
            customTop: true,
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
              }
            }
          }
        }
      ],
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
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
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
          props: {
            label: "name",
            value: "id"
          }
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
      this.$router.push({ path: "/recordedtaile", query: { ...obj.row } });
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
      this.$refs[this.leaseContractTable.ref].setColumnByProp("tenant", {
        dicData: [
          { label: "内租户", value: 1 },
          { label: "外租户", value: 2 }
        ]
      });
    });
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
    .btn_top {
      // font-size: 0;
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
.nav {
  margin-bottom: 15px;
}
</style>