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
        <template slot="custom-top" slot-scope="{size,selectedData}">
          <el-button :size="size" type="primary" @click="addedProperty">新增</el-button>
          <el-button :size="size" type="primary" @click="bulkImport">批量导入</el-button>
          <el-button
            :disabled="!selectedData.length"
            :size="size"
            type="primary"
            @click="bulkDel(selectedData)"
          >批量删除</el-button>
          <el-button
            :disabled="!selectedData.length"
            :size="size"
            type="primary"
            @click="bulkEdit(selectedData)"
          >批量编辑</el-button>
        </template>
        <template slot="operation" slot-scope="obj">
          <el-button type="text" @click="propertyDetail(obj)">详情</el-button>
          <el-button type="text" @click="propertyEdit(obj)">编辑</el-button>
          <el-button type="text" @click="propertyDel(obj)">删除</el-button>
          <el-button type="text" @click="propertyLocation(obj)">定位</el-button>
        </template>
      </z-table>
    </div>
  </div>
</template>
<script>
import { LeaseManageDic } from "@/utils/dictionary";
import leaseManageApi from "@/service/api/leaseManage";
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
        menuPosition: "right",
        menuBtn: false,
        itemSpan: 6,
        forms: [
          {
            type: "input",
            label: "房产编号",
            prop: "houseNumber",
            placeholder: "请输入",
            clearable: true
          },
          {
            type: "input",
            label: "房产名称",
            prop: "houseName",
            placeholder: "请输入",
            clearable: true,
          },
          {
            type: "number",
            label: "总价",
            prop: "housePrice",
            placeholder: "请输入",
            clearable: true,
            minRows: 0
          },
          {
            type: "select",
            label: "房产状态",
            prop: "houseStatus",
            placeholder: "请输入",
            clearable: true,
            dicData: Object.values(LeaseManageDic.HouseStatus)
          },
          {
            type: "number",
            label: "面积",
            prop: "houseArea",
            placeholder: "请输入",
            clearable: true,
            minRows: 0
          },
          {
            label: false,
            prop: "btn",
            formslot: true
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
        serverMode: {
          url: leaseManageApi.getHouseList,
          data: {
            pageNum: 1,
            pageSize: 10
          }
        },
        columnConfig: [
          {
            prop: "houseNumber",
            label: "房产编号",
            width: 200
          },
          {
            prop: "houseName",
            label: "房产名称"
          },
          {
            prop: "spaceName",
            label: "空间位置"
          },
          {
            prop: "houseStatus",
            label: "房产状态",
            type: "select",
            dicData: LeaseManageDic.HouseStatus
          },
          {
            prop: "houseArea",
            label: "面积 m²"
          },
          {
            prop: "housePrice",
            label: "总价",
            formatter(row, value) {
              // debugger;
              let pirceTypeLabel = "";
              if (typeof row.priceType == "number") {
                pirceTypeLabel =
                  LeaseManageDic.PriceType[row.priceType - 1].label;
              }
              return value
                ? `${value} ${pirceTypeLabel}`
                : "--";
            }
          },
          {
            prop: "contractTime",
            label: "签约时间"
          },
          {
            prop: "tenantName",
            label: "租户姓名"
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
    deleteRow(ids) {
      leaseManageApi.removeHouse({ houseIds: ids }).then(res => {
        this.refreshTable();
      });
    },
    addedProperty(obj) {
      this.$router.push({
        name: "editHouseProperty"
      });
    },
    bulkImport(obj) {
      this.$router.push({ name: "bulkimporthouseproperty" });
    },
    bulkDel(selectedData) {
      if (!selectedData.length) {
        commonFun.confirmTip(false, "请选择数据");
        return;
      }
      let ids = selectedData.map(item => item.id).join(",")
      commonFun.confirmTip(
        true,
        "",
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
    propertyDetail({ scopeRow: { $index, row, _self } }) {
      this.$router.push({
        name: "editHouseProperty",
        query: { id: row.id, flag: "detail" }
      });
    },
    propertyEdit({ scopeRow: { $index, row, _self } }) {
      this.$router.push({
        name: "editHouseProperty",
        query: { id: row.id, flag: "edit" }
      });
    },
    propertyDel({ scopeRow: { $index, row, _self } }) {
      console.log($index, row, _self);
      commonFun.confirmTip(
        true,
        "",
        "确定要删除吗?",
        () => {
          this.deleteRow(row.id);
        },
        () => { }
      );
    },
    propertyLocation(obj) {
      // console.log(obj);
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
