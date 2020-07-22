<template>
  <!-- 收费 -->
      <div class='panel-container'>
    <!-- <div class="panel"></div> -->
    <div class="box">
      <h2 align='center'>收费通知单：WI-SFTZ-10-20科目调整</h2>
      <!-- 表格部分 -->
      <z-table
        :ref='tableOptions.ref'
        :options='tableOptions'
        @row-update="rowUpdate"
        @row-edit="rowEdit"
        @row-edit-cancel="rowEditCancel"
      >
        <template
          slot="operation"
          slot-scope="obj"
        >

          <el-button
            type="text"
            @click="()=>{  }"
          ></el-button>
        </template>
      </z-table>

      <el-row>
        <el-col
          :span='6'
          :offset='9'
        >
          <!-- <el-button type='primary'>确认提交</el-button> -->
          <el-button
            type='danger'
            @click="close"
          >关闭</el-button>
        </el-col>
      </el-row>
    </div>
  </div>
  </div>
</template>

<script>
// 导入接口
import FinacialManageApi from "@/service/api/financialManage";
import commonFun from "@/utils/commonFun.js";
export default {
  props: {
    adjust: {
      type: Object
    }
  },
  //  ["adjust"],

  data() {
    return {
      test: "",
      model: {},
      arr: null,
      off:false,
      noticeNumber: "",
      contractNumber:'',
      tableOptions: {
        ref: "tabel",
        border: true,
        customTop: true,
        editBtn: true,
        customTopPosition: "right",
        operation: {
          width: 150
        },
        props: {
          rowKey: "costProjectName"
        },
        // serverMode: {
        //   url: "",
        //   data: ""
        // },
        data: [],
        showSummary: true,
        sumColumnList: [{ name: "updateAmount", type: "sum" }],
        columnConfig: [
          { label: "收费通知单类型", prop: "noticeType" },
          { label: "收费项目编码", prop: "costProjectCode" },
          { label: "收费项目", prop: "costProjectName" },
          { label: "核定金额", prop: "approvedAmount" },
          { label: "调整金额", prop: "updateAmount", cell: true,type:'number', minRows:0,},
          { label: "应收金额", prop: "receivableAmount" }
        ],
        uiConfig: {
          height: "auto",
          // 是否多选
          selection: false,
          //   是否显示索引
          showIndex: {
            width: 150
          }
        },
        btnConfig: { width: 100 }
      }
    };
  },
  methods: {
    submit(model, hide) {},
    resetChange() {},
    rowUpdate(model, index, done) {
      // debugger;
      console.log("model", model);
      model = Object.assign(model, { contractNumber:this.contractNumber });
      FinacialManageApi.updateCost(model)
        .then(res => {
          this.$message({
            type: "success",
            message: "编辑成功！"
          });
          this.$emit("offDailog");
          // this.getTableData();
        })
        .finally(res => {
          // this.loading = false;
          done();
        });
    },
    rowEdit(model, index, done) {},
    rowEditCancel(model, index, done) {
      console.log();
    },
    // 关闭
    close() {
      console.log("获取父亲中的值");
      this.$emit("offDailog");
    },
    setTabelData() {
      this.model = this.adjust;

      this.contractNumber = this.adjust.contractNumber

      this.$refs[this.tableOptions.ref].setData(this.model.chargeNoticeVos);
    }
  },
  created() {
    this.$nextTick(() => {
      this.setTabelData();
    });
  },
  mounted() {
  }
};
</script>

<style lang="less" scoped>
.box {
  background-color: rgb(255, 255, 255);
  height: auto;
  width: 100%;
  // 翻页隐藏
  /deep/.el-pagination {
    display: none;
  }
  .el-row {
    margin-bottom: 50px;
  }
}
</style>
