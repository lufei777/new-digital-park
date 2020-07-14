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
      <!-- 弹窗部分 -->
       <!--  -->
      <el-dialog
        :visible.sync="dialogTableVisible" 
        :modal='true'     
      >
        <el-row>
          <el-col
            :span="6"
            :offset="18"
          >
            <el-button
              type="info"
              plain
              @click="close"
            >关闭</el-button>
            <el-button
              type="info"
              plain
              v-print="'#printTest'"
            >打印</el-button>
          </el-col>
        </el-row>
        <div class="el" id='printTest'>
          <com-moban :content='content'></com-moban>
        </div>
      </el-dialog>

      <z-table
        :ref="tableOptions.ref"
        :options="tableOptions"
      >
        <template
          slot="operation"
          slot-scope="obj"
        >
          <el-button
            type="text"
            @click="adjust(obj)"
          >修改</el-button>
          <el-button
            type="text"
            @click="canInvalid(obj)"
          >作废</el-button>
          <el-button
            type="text"
            @click="canDetails(obj)"
          >详情</el-button>
          <el-button
            type="text"
            @click="print(obj)"
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
// 字典配置
import * as Dictonary from "@/utils/dictionary";
import Vue from "vue";
import Moban from "./mobu";
let pageInfo = {
  pageNum: 1,
  pageSize: 10
};

export default {
  name: "chargeNote",
  components: {
    "com-moban": Moban
  },
  data() {
    return {
      content:null,
      dialogTableVisible: false,
      btnList: [],
      loading: false,
      model: {},
      formOptions: {
        ref: "form",
        menuPosition: "right",
        menuBtn: false,
        labelWidth: "100",
        forms: [
          //收款单流水
          {
            type: "input",
            prop: "collectionCode",
            label: "收款单流水",
            span: 6
          },
          //是否作废
          {
            type: "select",
            prop: "flagDel",
            label: "是否作废",
            offset: 1,
            span: 6,
            dicData: [
              { label: "是", value: "2" },
              { label: "否", value: "1" }
            ]
          },
          //  { label: "办理时间", prop: "createTime" },
          {
            type: "date",
            prop: "createTime",
            label: "办理时间",
            span: 6,
            valueFormat: "yyyy-MM-dd",
            format: "yyyy-MM-dd",
            offset: 1,
            row: true
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
            offset: 1,
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
          url: FinacialManageApi.selectBillChargeContact,
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
    close() {
      this.dialogTableVisible = false;
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
        { label: "收款单流水", prop: "collectionCode" },
        {
          label: "是否作废",
          prop: "flagDel",
          type: "select",
          dicData: [
            { label: "否", value: 1 },
            { label: "是", value: 2 }
          ]
        },
        { label: "收费通知单号", prop: "noticeNumber" },
        { label: "办理时间", prop: "createTime" },
        { label: "合同编号", prop: "contractNumber" },
        { label: "收款内容", prop: "collectionContent" },
        { label: "付款单位全称", prop: "payerName" },
        { label: "收费方式", prop: "collectionType" },
        { label: "收费金额", prop: "collectionMoney" },
        { label: "经办人", prop: "operator" },
        { label: "银行回执单号", prop: "bankCode" },
        { label: "简要说明", prop: "remark" }
      ];
      this.tableOptions.columnConfig = list;
    },
    // 修改
    adjust(obj) {
      this.$router.push({
        path: "/finacialmanage/changedetail",
        query: { flag: "edit", noticeNumber: obj.row.noticeNumber }
      });
    },
    // 打印
    print(obj) {
      this.content = obj.row
      console.log('this.content',this.content)
      this.dialogTableVisible = true;
    },
    // 作废的公共方法
    deleteRow(flagDel) {
      FinacialManageApi.delBillChargeContact({ flagDel: flagDel }).then(res => {
        this.Table.refreshTable();
        // this.
      });
    },
    // 作废
    canInvalid(obj) {
      var flagDel = obj.row.flagDel;
      this.$confirm("确认作废吗？", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(res => {
        this.$message({
          type: "success",
          message: "已经作废!"
        });
        this.deleteRow(flagDel);
      });
    },
    // 详情
    canDetails(obj) {
      let noticeNumber = obj.row.noticeNumber;
      this.$router.push({
        path: "/finacialmanage/changedetail",
        query: { flag: "detail", noticeNumber: noticeNumber }
      });
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
  created() {},
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
// .panel {
//   /deep/.el-dialog {
//     width: 50%;
//   }
// }
</style>
