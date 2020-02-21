<template>
  <div class="panel-container">
    <div class="panel">
      <z-form
        :ref="personalManageForm.ref"
        :options="personalManageForm"
        v-model="model"
        @submit="searchSubmit"
        @reset-change="resetChange"
      >
        <template slot="btn" slot-scope="obj">
          <div>
            <el-button :size="obj.size" type="primary" @click="search(obj)">搜索</el-button>
            <el-button :size="obj.size" @click="clearForm(obj)">清除</el-button>
          </div>
        </template>
      </z-form>
    </div>

    <div class="table panel">
      <z-table :ref="personalManageTable.ref" :options="personalManageTable">
        <template slot="custom-top" slot-scope="obj">
          <el-button :size="obj.size" type="primary" @click="addedProperty(obj)">新增</el-button>
          <!-- <el-button :size="obj.size" type="primary" @click="bulkImport(obj)">批量导入</el-button> -->
          <!-- <el-button :size="obj.size" type="primary" @click="bulkEdit(obj)">批量编辑</el-button> -->
        </template>
        <template slot="operation" slot-scope="obj">
          <el-button type="text" @click="propertyDetail(obj)">详情</el-button>
          <el-button type="text" @click="propertyEdit(obj)">编辑</el-button>
        </template>
      </z-table>
    </div>
  </div>
</template>
<script>
import { CommonDic, PersonalManageDic } from "@/utils/dictionary";
import personalManageApi from "@/service/api/personalManage";
import commonFun from "@/utils/commonFun.js";
let tableSendData = {
  pageNum: 1,
  pageSize: 10
};

export default {
  data() {
    return {
      model: {},
      personalManageForm: {
        ref: "personalManageForm",
        size: "small",
        menuPosition: "right",
        menuBtn: false,
        forms: [
          {
            label: "工号",
            type: "input",
            prop: "jobNumber",
            clearable: true,
            span: 4
          },
          {
            label: "姓名",
            type: "input",
            prop: "fullName",
            clearable: true,
            span: 4
          },
          {
            label: "部门",
            type: "input",
            prop: "orgName",
            clearable: true,
            span: 4
          },
          {
            label: "岗位",
            type: "input",
            prop: "position",
            clearable: true,
            span: 4
          },
          {
            label: "员工类型",
            type: "select",
            prop: "type",
            clearable: true,
            span: 4,
            dicData: PersonalManageDic.employeeType
          },
          {
            prop: "btn",
            span: 4,
            formslot: true,
            width: 55
          }
        ]
      },
      personalManageTable: {
        ref: "personalManageTable",
        customTop: true,
        customTopPosition: "right",
        serverMode: {
          url: personalManageApi.getUserMessageList,
          data: tableSendData
        },
        propsHttp: {
          listKey: "list",
          total: "total",
          pageSize: "pageSize",
          pageNum: "pageNum"
        },
        operation: {
          width: 100
        },
        columnConfig: [
          {
            prop: "jobNumber",
            label: "工号",
            fixed: "left"
          },
          {
            prop: "fullName",
            label: "姓名",
            fixed: "left",
            sortable: true
          },
          {
            prop: "sex",
            label: "性别",
            fixed: "left",
            dicData: CommonDic.sexDic
          },
          {
            prop: "orgName",
            label: "所在部门",
            fixed: "left",
            width: "120"
          },
          {
            prop: "position",
            label: "所在岗位",
            fixed: "left",
            width: "120"
          },
          {
            prop: "level",
            label: "岗位级别"
          },
          {
            prop: "superior",
            label: "直接上级"
          },
          {
            prop: "type",
            label: "员工状态",
            dicData: PersonalManageDic.employeeStatus
          },
          {
            prop: "status",
            label: "员工类型",
            dicData: PersonalManageDic.employeeType
          },
          {
            prop: "officeAddress",
            label: "办公地点",
            fixed: "right"
          }
        ],
        uiConfig: {
          height: "auto",
          selection: true
        }
      }
    };
  },
  methods: {
    searchSubmit(model, hide) {
      hide();
      let data = this.personalManageTable.serverMode.data;
      this.personalManageTable.serverMode.data = Object.assign(
        _.cloneDeep(tableSendData),
        model
      );
      this.refreshTable();
    },
    resetChange() {},
    deleteRow(ids) {
      leaseManageApi.removeHouse({ houseIds: ids }).then(res => {
        this.refreshTable();
      });
    },
    addedProperty(obj) {
      this.$router.push({
        name: "addpersonal"
      });
    },
    bulkImport(obj) {
      this.$router.push({ name: "bulkimporthouseproperty" });
    },
    bulkEdit(obj) {
      console.log(obj);
    },
    getPropertyDetail(row) {
      return leaseManageApi.houseDetails(row);
    },
    propertyDetail({ scopeRow: { $index, row: model, _self } }) {
      // 为了区分messageId和userId，做的处理
      model["messageId"] = model.id;

      this.$router.push({
        name: "addpersonal",
        params: {
          extraOptions: {
            disabled: true,
            submitBtn: false,
            emptyBtn: false
          },
          model
        }
      });
    },
    propertyEdit({ scopeRow: { $index, row: model, _self } }) {
      // 为了区分messageId和userId，做的处理
      model["messageId"] = model.id;

      this.$router.push({
        name: "addpersonal",
        params: {
          model
        }
      });
    },
    search(...args) {
      this.zForm.submit();
    },
    clearForm(...args) {
      console.log("清空", ...args);
      this.zForm.resetForm();
    },
    refreshTable() {
      this.zTable.refreshTable();
    }
  },
  computed: {
    zForm() {
      return this.$refs[this.personalManageForm.ref];
    },
    zTable() {
      return this.$refs[this.personalManageTable.ref];
    }
  }
};
</script>
