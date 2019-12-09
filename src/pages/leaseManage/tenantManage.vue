<template>
  <div class="tenant-manage">
    <div class="condition-box radius-shadow">
      <miForm
        :ref="tenantManageForm.ref"
        :options="tenantManageForm"
        v-model="model"
        @submit="submit"
        @reset-change="resetChange"
      >
        <template slot="btn" slot-scope="obj">
          <div>
            <el-button :disabled="obj.disabled" type="primary" @click="search(obj)">搜索</el-button>
            <el-button :disabled="obj.disabled" @click="clearForm(obj)">清除</el-button>
          </div>
        </template>
      </miForm>
    </div>

    <div class="tenant-manage-table radius-shadow">
      <miTable :ref="tenantManageTable.ref" :tableConfig="tenantManageTable">
        <template slot="custom-top" slot-scope="obj">
          <div class="operator-box flex-row-reverse">
            <el-button :size="obj.size" type="primary" @click="batchEdits(obj)">批量删除</el-button>
            <el-button :size="obj.size" type="primary" @click="batchDels(obj)">批量编辑</el-button>
            <el-button :size="obj.size" type="primary" @click="addTenant(obj)">新增</el-button>
            <el-button :size="obj.size" type="primary" @click="selectAll(obj)">全选</el-button>
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
import DigitalParkApi from '../../service/api/digitalParkApi'
import miForm from "@/components/Form";
import miTable from "@/components/Table";
export default {
  components: { miForm, miTable },
  data() {
    return {
      model: {
        contractNumber: "",
        tenantName: "",
        contactMethod: "",
        tenantHouse: "",
        tenantTime: "",
        maturityTime: ""
      },
      tenantManageForm: {
        ref: "tenantManageForm",
        labelWidth: "100",
        size: "small",
        menuPosition: "right",
        submitBtn: false,
        emptyBtn: false,
        forms: [
          {
            type: "input",
            label: "合同编号",
            prop: "contractNumber",
            placeholder: "请输入",
            clearable: true,
            span: 6,
            minRows: 0
          },
          {
            type: "input",
            label: "租户名称",
            prop: "tenantName",
            placeholder: "请输入",
            clearable: true,
            span: 6
          },
          {
            type: "input",
            label: "联系方式",
            prop: "contactMethod",
            placeholder: "请输入",
            clearable: true,
            span: 6
          },
          {
            prop: "",
            formslot: true,
            span: 6
          },
          {
            type: "select",
            label: "所租房产",
            prop: "tenantHouse",
            placeholder: "请输入",
            clearable: true,
            span: 6
          },
          {
            type: "datetime",
            label: "签租时间",
            prop: "tenantTime",
            placeholder: "选择日期时间",
            // clearable: true,
            span: 6,
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "timestamp"
          },
          {
            type: "datetime",
            label: "到期时间",
            prop: "maturityTime",
            placeholder: "选择日期时间",
            // clearable: true,
            span: 6,
            format: "yyyy-MM-dd hh:mm:ss",
            valueFormat: "timestamp"
          },
          {
            prop: "btn",
            span: 6,
            pull: 6,
            formslot: true
          }
        ]
      },
      tenantManageTable: {
        ref: "tenantManageTable",
        operation: {
          width: 200
        },
        data: [],
        columnConfig: [
        ],
        uiConfig: {
          height: "auto",
          selection: true
        }
      }
    };
  },
  methods: {
    submit() {},
    resetChange() {},
    selectAll(obj) {
      console.log(obj);
    },
    addTenant() {
      // this.$router.push('/')
    },
    batchDels(obj) {
      console.log(obj);
    },
    batchEdits(obj) {
      console.log(obj);
    },
    detailTenant(obj) {
      console.log(obj);
    },
    editRow(obj) {
      console.log(obj);
    },
    delRow(obj) {
      console.log(obj);
    },
    search(...args) {
      this.$refs[this.leaseManageForm.ref].getFormModel(res => {
        console.log("model", res);
      });
      console.log("搜索", ...args);
    },
    clearForm(...args) {
      console.log("清空", ...args);
      this.$refs[this.leaseManageForm.ref].resetForm();
    },
    async tenantList() {
       let labelList = [{ label: "序号", prop: "columnNumber"},
        { label: "合同编号", prop: "tenantNumber"},
        { label: "合同名称", prop: "elecAndWaterSum"},
        { label: "所租房产", prop: ""},
        { label: "租户名称", prop: "tenantName"},
        { label: "联系方式", prop: "telephone"},
        { label: "签约时间", prop: ""},
        { label: "到期时间", prop: ""}];
      this.tenantManageTable.columnConfig = labelList;
      let res = await DigitalParkApi.tenantList()
      console.log('res',res)
      res.map((item,index)=>{
        item.columnNumber = index+1
      })
      if (res) {
        this.tenantManageTable.data = res;
        // this.tenantManageTable.uiConfig.pagination.total = res.total;
      }
    }
  },
  mounted() {
    this.tenantList()
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
      padding: 10px;
      .el-button {
        margin-left: 20px;
      }
    }
  }
}
</style>