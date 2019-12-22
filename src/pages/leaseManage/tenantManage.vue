<template>
  <div class="tenant-manage">
    <div class="condition-box panel">
      <miForm
        :ref="tenantManageForm.ref"
        :options="tenantManageForm"
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
      </miForm>
    </div>

    <div class="tenant-manage-table panel">
      <miTable :ref="tenantManageTable.ref" :tableConfig="tenantManageTable">
        <template slot="custom-top" slot-scope="obj">
          <div class="operator-box flex-row-reverse">
            <el-button :size="obj.size" type="primary" @click="batchDels(obj)">批量删除</el-button>
            <el-button :size="obj.size" type="primary" @click="addTenant(obj)">新增</el-button>
          </div>
        </template>

        <template slot="operation" slot-scope="obj">
          <el-button type="text" @click="detailTenant(obj)">详情</el-button>
          <el-button type="text" @click="editRow(obj)">编辑</el-button>
          <el-button type="text" @click="delRow(obj)">删除</el-button>
        </template>
      </miTable>
    </div>
  </div>
</template>

<script>
import DigitalParkApi from "../../service/api/digitalParkApi";
import miForm from "@/components/Form";
import miTable from "@/components/Table";
import CommonFun from "../../utils/commonFun";
export default {
  name: "TenantManage",
  components: { miForm, miTable },
  data() {
    let _this = this;
    return {
      model: {
        // tenantNumber: "",
        // tenantName: "",
        // telephone: "",
        // startTime: "",
        // houseNumber: ""
      },
      tenantManageForm: {
        ref: "tenantManageForm",
        labelWidth: "100",
        size: "medium",
        menuPosition: "right",

        submitBtn: false,
        emptyBtn: false,

        forms: [
          {
            type: "input",
            label: "租户编号",
            prop: "tenantNumber",
            placeholder: "请输入",
            clearable: true,
            span: 4,
            minRows: 0
          },
          {
            type: "input",
            label: "租户名称",
            prop: "tenantName",
            placeholder: "请输入",
            clearable: true,
            span: 4
          },
          {
            type: "input",
            label: "联系方式",
            prop: "telephone",
            placeholder: "请输入",
            clearable: true,
            span: 4
          },
          // {
          //   prop: "",
          //   formslot: true,
          //   span: 6
          // },
          {
            type: "date",
            label: "签约时间",
            prop: "startTime",
            placeholder: "选择日期时间",
            // clearable: true,
            span: 4,
            format: "yyyy-MM-dd",
            valueFormat: "timestamp"
          },
          {
            type: "input",
            label: "所租房产编号",
            prop: "houseNumber",
            placeholder: "请输入",
            clearable: true,
            span: 4,
            width: 120
          },
          {
            prop: "btn",
            span: 4,
            pull: 4,
            formslot: true,
            width: 20
          }
        ]
      },
      tenantManageTable: {
        ref: "tenantManageTable",
        customTop: true,
        customTopPosition: "right",
        operation: {
          width: 200
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
      tenantIds: ""
    };
  },
  methods: {
    submit() {},
    resetChange() {},
    addTenant() {
      this.$router.push("/addTenantManage");
    },
    onClickSearchBtn2() {
      this.curPage = 1;
      this.$refs[this.assetsTableConfig.ref].setCurrentPage(1);
      this.getAssetList();
    },
    clearForm(...args) {
      console.log("清空", ...args);
      this.$refs[this.tenantManageForm.ref].resetForm();
    },
    async tenantList() {
      let labelList = [
        { label: "合同编号", prop: "tenantNumber" },
        { label: "合同名称", prop: "elecAndWaterSum" },
        { label: "所租房产", prop: "" },
        { label: "租户名称", prop: "tenantName" },
        { label: "联系方式", prop: "telephone" },
        { label: "签约时间", prop: "" },
        { label: "到期时间", prop: "" }
      ];
      this.tenantManageTable.columnConfig = labelList;
      let res = await DigitalParkApi.tenantList({
        pageNum: this.currentPage,
        pageSize: 10,
        tenantNumber: this.model.tenantNumber,
        tenantName: this.model.tenantName,
        telephone: this.model.telephone,
        houseNumber: this.model.houseNumber
      });
      if (res && res.list) {
        this.tenantManageTable.data = res.list;
        this.tenantManageTable.uiConfig.pagination.total = res.total;
      }
    },
    onClickSearchBtn(...args) {
      this.$refs[this.tenantManageForm.ref].getFormModel(res => {
        console.log("model", res);
      });
      console.log("搜索", ...args);
      this.curPcurrentPageage = 1;
      // this.$refs[this.tenantManageTableConfig.ref].setCurrentPage(1)
      this.tenantList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.tenantList();
    },
    showDeleteTip() {
      CommonFun.deleteTip(
        this,
        this.tenantIds,
        "请至少选择一条信息！",
        this.sureDelete,
        this.cancelDelete
      );
    },
    async sureDelete() {
      await DigitalParkApi.delTenant({
        tenantIds: this.tenantIds
      });
      this.$message({
        type: "success",
        message: "删除成功!"
      });
      this.tenantIds = "";
      this.tenantList();
    },
    cancelDelete() {
      this.tenantIds = "";
    },
    delRow(obj) {
      this.tenantIds = obj.scopeRow.row.tenantId;
      this.showDeleteTip();
    },
    batchDels(obj) {
      this.tenantIds =
        this.$refs["tenantManageTable"].getSelectedData().length &&
        this.$refs["tenantManageTable"]
          .getSelectedData()
          .map(item => item.tenantId)
          .join(",");
      this.showDeleteTip();
    },
    editRow(obj) {
      this.$router.push({
        name: "addTenantManage",
        params: {
          tenantId: obj.scopeRow.row.tenantId
        }
      });
    },
    detailTenant(obj) {
      console.log(obj.scopeRow.row);
      this.$router.push({
        name: "addTenantManage",
        params: {
          extraOptions: {
            disabled: true
          },
          tenantId: obj.scopeRow.row.tenantId
        }
      });
    }
  },
  mounted() {
    this.tenantList();
  }
};
</script>

<style lang="less">
.tenant-manage {
  .condition-box {
    margin-bottom: 20px;
    background: @white;
    padding: 20px;
    // background: pink;
  }
  .tenant-manage-table {
    background: @white;
    padding: 20px;
    .operator-box {
      background: @white;
      .el-button {
        margin-left: 20px;
      }
    }
  }
  .el-form-item {
    margin-bottom: 0;
  }
  // .el-input {
  //   width: 180px!important;
  // }
}
</style>