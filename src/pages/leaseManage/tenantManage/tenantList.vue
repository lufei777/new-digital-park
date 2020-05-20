<template>
  <div class="panel-container">
    <div id="houseproperty-form" class="panel">
      <z-form :ref="formOptions.ref" :options="formOptions" v-model="model" @submit="submit">
        <template slot="btn" slot-scope="obj">
          <div>
            <el-button :disabled="obj.disabled" type="primary" @click="search(obj)">搜索</el-button>
            <el-button :disabled="obj.disabled" @click="clearForm(obj)">清除</el-button>
          </div>
        </template>
      </z-form>
    </div>

    <div class="table panel">
      <z-table :ref="tableOptions.ref" :options="tableOptions">
        <template slot="custom-top" slot-scope="obj">
          <el-button :size="obj.size" type="primary" @click="add(obj)">新增</el-button>
          <el-button :size="obj.size" type="primary" @click="bulkDel(obj)">批量删除</el-button>
        </template>
        <template slot="operation" slot-scope="obj">
          <el-button type="text" @click="detail(obj)">详情</el-button>
          <el-button type="text" @click="edit(obj)">编辑</el-button>
          <el-button type="text" @click="delRow(obj)">删除</el-button>
        </template>
      </z-table>
    </div>
  </div>
</template>
<script>
import { LeaseManageDic } from "@/utils/dictionary";
import leaseManageApi from "api/leaseManage";
import commonFun from "@/utils/commonFun.js";

const dateValueFormat = "yyyy-MM-dd HH:mm:ss";
let tableSendData = {
  pageNum: 1,
  pageSize: 10
};

export default {
  data() {
    return {
      model: {},
      formOptions: {
        ref: "Form",
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
            prop: "contractTime",
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
      tableOptions: {
        ref: "Table",
        customTop: true,
        customTopPosition: "right",
        operation: {
          width: 200
        },
        props: {
          rowKey: "tenantId"
        },
        serverMode: {
          url: leaseManageApi.tenantList,
          data: tableSendData
        },
        columnConfig: [
          { label: "合同编号", prop: "tenantNumber" },
          { label: "合同名称", prop: "contractName" },
          { label: "所租房产", prop: "houseName" },
          { label: "租户名称", prop: "tenantName" },
          { label: "联系方式", prop: "telephone" },
          { label: "签约时间", prop: "contractTime" },
          { label: "到期时间", prop: "expireTime" }
        ],
        uiConfig: {
          height: "auto", //"", //高度
          selection: true, //是否多选
        }
      }
    };
  },
  methods: {
    search(...args) {
      this.Form.submit();
    },
    submit(model, hide) {
      hide();
      this.tableOptions.serverMode.data = Object.assign(
        _.cloneDeep(tableSendData),
        model
      );
      this.refreshTable();
    },
    clearForm() {
      this.Form.resetForm();
    },
    add(obj) {
      this.$router.push("/addTenantManage");
    },
    deleteRow(ids) {
      leaseManageApi.delTenant({ tenantIds: ids }).then(res => {
        this.refreshTable();
      });
    },
    bulkDel({ selectedData }) {
      if (!selectedData.length) {
        commonFun.deleteTip(this, false, "请选择数据");
        return;
      }
      let ids = selectedData.map(item => item.tenantId).join(",")
      commonFun.deleteTip(
        this,
        true,
        "确定要删除吗?",
        () => {
          this.deleteRow(ids);
        },
        () => { }
      );
    },
    bulkEdit(obj) {
      console.log(obj);
    },
    detail({ scopeRow: { $index, row, _self } }) {
      this.$router.push({
        name: "addTenantManage",
        query: {
          extraOptions: JSON.stringify({
            textMode: true,
            submitBtn: false
          }),
          tenantId: row.tenantId
        }
      });
    },
    edit({ scopeRow: { $index, row, _self } }) {
      this.$router.push({
        name: "addTenantManage",
        query: {
          tenantId: row.tenantId
        }
      });
    },
    delRow({ scopeRow: { $index, row, _self } }) {
      commonFun.deleteTip(
        this,
        true,
        "确定要删除吗?",
        () => {
          this.deleteRow(row.tenantId);
        },
        () => { }
      );
    },
    refreshTable() {
      this.Table.refreshTable();
    }
  },
  computed: {
    Form() {
      return this.$refs[this.formOptions.ref];
    },
    Table() {
      return this.$refs[this.tableOptions.ref];
    }
  }
};
</script>