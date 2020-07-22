<template>
      <div class='panel-container'>
    <!-- 收费通知单DN -->
    <!-- 表单部分 -->
    <div class="panel">
      <z-form
        :ref="formOptions.ref"
        :options="formOptions"
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
    <!-- 表格部分 -->
    <div class="panel">
      <!-- 自定义查询结果项 -->
      <el-dialog
        v-dialogDrag
        ref="dialog__wrapper"
        :visible.sync="dialogTableVisible"
        :modal='true'
      >
        <div class="inlineshow">
          <span style="margin:15px 20px;display:block;color:red"> 单击按钮 自定义显示列----单击弹框顶部可以拖拽</span>
          <el-button
            v-for="col,index in btnList"
            size='min'
            :key="col.prop"
            :type="col.hide ?'danger': 'primary'"
            @click="switchHide(col)"
          >{{col.label}}</el-button>
        </div>
      </el-dialog>

      <!-- 收费 -->
      <!-- <div class="sf">
      <el-dialog
        v-dialogDrag
        ref="dialog__wrapper"
        :visible.sync="dialogTableVisible"
        :modal='true'
      >
          <h1 align='center'>中钢项目</h1>
          <p><span>账期</span>{{1}}</p>
          <div class="top">
              <div class="one">
                <div class="left">
                  <span>客户名称:</span>{{1}}
                </div>
                <div class="right">
                   <span>通知单号:</span>{{1}}
                </div>
              </div>
          </div>

      </el-dialog>
      </div> -->
      <div class="dialog">
        <el-dialog
          :visible.sync="show"
          :modal='true'
          custom-class='popup-style'
        >
          <!-- 调整 -->
          <com-adjust
            :adjust='adjust'
            v-if="tz"
            @offDailog='offDailog'
          ></com-adjust>
          <!--  收费  -->
          <com-charge
            :charge='charge'
            v-if="sf"
            @comcharge='offDailog'
          ></com-charge>
          <!-- 打印 -->
          <com-print
            :print='print'
            v-if="dy"
            @comprint='offDailog'
          ></com-print>
          <!-- 开票 -->
          <com-invoice
            :invoice='invoice'
            v-if="kp"
            @cominvoice='offDailog'
          ></com-invoice>

        </el-dialog>
      </div>
      <z-table
        :ref="tableOptions.ref"
        :options="tableOptions"
      >
        <template
          slot="custom-top"
          slot-scope="scopeObj"
        >
          <div class="operator-box flex-row-reverse">
            <el-button
              size="mini"
              type="primary"
              @click="testCustomTopObj(scopeObj)"
            >自定义查询结果</el-button>
          </div>
        </template>
        <template
          slot="operation"
          slot-scope="obj"
        >
        <!--   v-if="!obj.row.billStatus===2 && !obj.row.costStatus===2" -->
          <el-button
             v-if="obj.row.billStatus!==2 || obj.row.costStatus!==2" 
            type="text"
            @click="canadjust(obj)"
          >调整</el-button>

          <el-button
            type="text"
            v-if="obj.row.billStatus!==2"
            @click="makeinvoice(obj)"
          >开票</el-button>

          <el-button
            type="text"
            v-if="obj.row.costStatus!==2"
            @click="chargemoney(obj)"
          >收费</el-button>
          <el-button
            type="text"
            @click="canprint(obj)"
          >打印</el-button>
        </template>
      </z-table>
    </div>
  </div>
</template>

<script>
// 导入接口
import FinacialManageApi from "@/service/api/financialManage";
import commonFun from "@/utils/commonFun.js";
// 调整
import ComAdjust from "./comAdjust";
// 收费
import ComCharge from "./comCharge";
// 开票
import ComInvoice from "./comInvoice";
// 打印
import ComPrint from "./comPrint";
// 字典配置
import * as Dictonary from "@/utils/dictionary";
import Vue from "vue";
let pageInfo = {
  pageNum: 1,
  pageSize: 10
};

export default {
  name: "chargeNote",
  components: {
    "com-adjust": ComAdjust,
    "com-charge": ComCharge,
    "com-print": ComPrint,
    "com-invoice": ComInvoice
  },
  data() {
    return {
      title: "测试",
      off: true,
      show: false,
      dialogTableVisible: false,
      btnList: [],
      loading: false,
      // 调整
      adjust: {},
      // 开票
      invoice: {},
      // 打印,
      print: null,
      // 收费
      charge: null,
      //控制显示
      tz: false,
      dy: false,
      sf: false,
      kp: false,
      model: {},
      formOptions: {
        ref: "form",
        menuPosition: "right",
        menuBtn: false,
        labelWidth: "100",
        forms: [
          // 通知单类型
          // {
          //   type: "select",
          //   label: "通知单类型",
          //   span: 6,
          //   prop: "noticeType",
          //   props: {
          //     label: "codeName",
          //     value: "code"
          //   }
          // },
          //年
          {
            type: "year",
            prop: "year",
            label: "年",
            valueFormat: "yyyy",
            format: "yyyy",
            span: 6
          },
          //月
          {
            type: "month",
            prop: "month",
            label: "月",
            // offset: 1,
            valueFormat: "MM",
            format: "MM",
            span: 6
          },
          // 收费状态
          {
            type: "select",
            prop: "costStatus",
            label: "收费状态",
            span: 6,
            dicData: [
              { label: "已收费", value: 1 },
              { label: "待收费", value: 2 }
            ]
            // offset: 1,
            // row: true
          },
          // 开票状态
          {
            type: "select",
            prop: "billingStatus",
            label: "开票状态",
            span: 6,
            dicData: [
              { label: "已开票", value: 1 },
              { label: "未开票", value: 2 }
            ]
            // offset: 1,
            // row: true
          },
          // 收费通知单号
          {
            type: "input",
            prop: "noticeNumber",
            label: "收费通知单号",
            span: 6
          },
          {
            prop: "btn",
            span: 6,
            // pull: 4,
            // offset: 1,
            formslot: true
            // width: 20
          }
        ]
      },
      tableOptions: {
        ref: "tabel",
        customTop: true,
        customTopPosition: "right",
        operation: {
          width: 200
        },
        serverMode: {
          url: FinacialManageApi.selectNoticeList,
          data: pageInfo
        },
        propsHttp: {
          list: "data",
          total: "total",
          pageSize: "pageSize",
          pageNum: "pageNum"
        },
        data: [],
        columnConfig: [],
        uiConfig: {
          height: "auto",
          // 是否多选
          selection: false,
          //   是否显示索引
          showIndex: true
        },
        btnConfig: { width: 100 }
      }
    };
  },
  methods: {
    // adjust 关闭窗口
    offDailog(val) {
      console.log("val", val);
      this.show = false;
      // if(val===false){
      //   this.off = false
      // }
      if (val !== "undefined") {
        this.onClickSearchBtn();
      }
    },
    // 自定义显示列
    testCustomTopObj(scopeObj) {
      this.dialogTableVisible = !this.dialogTableVisible;
      this.btnList = scopeObj.columnConfig;
    },
    // 弹框中的按钮操作
    switchHide(col) {
      let tableRefs = this.$refs;
      if (col.hide) {
        this.$set(col, "hide", !col.hide);
      } else {
        this.$set(col, "hide", true);
      }
      tableRefs[this.tableOptions.ref].doLayout();
    },
    submit(model, hide) {
      console.log("model", model);
      hide();
      this.tableOptions.serverMode.data = Object.assign(
        _.cloneDeep(pageInfo),
        model
      );
      this.$refs[this.tableOptions.ref].refreshTable();
    },
    resetChange() {},
    // 搜索
    onClickSearchBtn(obj) {
      this.Form.submit();
    },
    // 重置
    clearForm(obj) {
      this.Form.resetForm();
    },
    //表格列配置项
    async setTabelList() {
      let list = [
        // {
        //   label: "通知单类型",
        //   prop: "noticeType",
        //   type: "select",
        //   props: {
        //     label: "codeName",
        //     value: "id"
        //   }
        // },
        { label: "收费通知单号", prop: "noticeNumber" ,width:250},
        // { label: "收费项目编号", prop: "costProjectCode" },
        { label: "合同编号", prop: "contractNumber" ,width:200},
        { label: "合同名称", prop: "contractName" },
        { label: "付款单位名称", prop: "payerName" },
        {
          label: "开票状态",
          prop: "billStatus",
          type: "select",
          dicData: [
            { label: "未开票", value: 1 },
            { label: "已开票", value: 2 },
            { label: "未全开", value: 3 },
          ]
        },
        {
          label: "收费状态",
          prop: "costStatus",
          type: "select",
          dicData: [
            { label: "未收费", value: 1 },
            { label: "已收费", value: 2 },
            { label: "未全收", value: 3 },
          ]
        },
        { label: "操作时间", prop: "createTime", width:100},
        { label: "年度", prop: "year" },
        { label: "月份", prop: "month" },
        { label: "核定金额(元)", prop: "approvedAmount" },
        { label: "调整金额(元)", prop: "updateAmount" },
        { label: "应收金额(元)", prop: "receivableAmount" },
        { label: "已收金额(元)", prop: "receivedAmount" },
        { label: "欠费金额(元)", prop: "arrearsAmount" },
        { label: "已开金额(元)", prop: "openedAmount" },
        { label: "备注", prop: "remark" }
      ];
      this.tableOptions.columnConfig = list;
    },
    // 调整
    canadjust(obj) {
      console.log("调整", obj.row);
      this.adjust = obj.row;
      this.show = true;
      (this.sf = false), (this.tz = true), (this.dy = false), (this.kp = false);
    },
    // 开票
    makeinvoice(obj) {
      console.log("开票", obj.row);
      this.invoice = obj.row;
      this.show = true;
      (this.sf = false), (this.tz = false), (this.dy = false), (this.kp = true);
    },
    // 收费
    chargemoney(obj) {
      console.log("收费", obj.row);
      this.charge = obj.row;
      this.show = true;
      (this.sf = true), (this.tz = false), (this.dy = false), (this.kp = false);
    },
    // 打印
    canprint(obj) {
      console.log("打印", obj.row);
      this.print = obj.row;
      this.show = true;
      (this.sf = false), (this.tz = false), (this.dy = true), (this.kp = false);
    }
  },
  computed: {
    Form() {
      return this.$refs[this.formOptions.ref];
    },
    Table() {
      return this.$refs[this.tableOptions.ref];
    }
  },
  created() {
    // 通知单类型
    // FinacialManageApi.getNoticeType().then(res => {
    //   // console.log('res',res)
    //   this.$refs[this.formOptions.ref].setColumnByProp("noticeType", {
    //     dicData: res
    //   });
    //   this.$refs[this.tableOptions.ref].setColumnByProp("noticeType", {
    //     dicData: res
    //   });
    // });
  },
  mounted() {
    this.setTabelList();
  }
};
</script>

<style lang="less" scoped>
.inlineshow {
  .el-button {
    margin: 10px 2px;
  }
}

</style>
