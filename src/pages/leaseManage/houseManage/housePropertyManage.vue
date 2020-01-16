<template>
  <div class="panel-container">
    <div id="houseproperty-form" class="panel">
      <miForm
        :ref="leaseManageForm.ref"
        :options="leaseManageForm"
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

    <div class="table panel">
      <miTable :ref="leaseManageTable.ref" :tableConfig="leaseManageTable">
        <template slot="custom-top" slot-scope="obj">
          <el-button :size="obj.size" type="primary" @click="addedProperty(obj)">新增</el-button>
          <el-button :size="obj.size" type="primary" @click="bulkImport(obj)">批量导入</el-button>
          <el-button :size="obj.size" type="primary" @click="bulkDel(obj)">批量删除</el-button>
          <el-button :size="obj.size" type="primary" @click="bulkEdit(obj)">批量编辑</el-button>
        </template>
        <template slot="operation" slot-scope="obj">
          <el-button type="text" @click="propertyDetail(obj)">详情</el-button>
          <el-button type="text" @click="propertyEdit(obj)">编辑</el-button>
          <el-button type="text" @click="propertyDel(obj)">删除</el-button>
          <el-button type="text" @click="propertyLocation(obj)">定位</el-button>
        </template>
      </miTable>
    </div>
  </div>
</template>
<script>
import { LeaseManageDic } from "@/utils/dictionary";
import miForm from "@/components/Form";
import miTable from "@/components/Table";
import leaseManageApi from "@/service/api/leaseManage";
import commonFun from "@/utils/commonFun.js";

export default {
  components: { miForm, miTable },
  data() {
    return {
      model: {},
      leaseManageForm: {
        ref: "leaseManageForm",
        size: "small",
        menuPosition: "right",
        menuBtn: false,
        forms: [
          {
            type: "input",
            label: "房产编号",
            prop: "houseNumber",
            placeholder: "请输入",
            clearable: true,
            span: 4
          },
          {
            type: "input",
            label: "房产名称",
            prop: "houseName",
            placeholder: "请输入",
            clearable: true,
            span: 4
          },
          {
            type: "number",
            label: "总价",
            prop: "housePrice",
            placeholder: "请输入",
            clearable: true,
            span: 4,
            minRows: 0
          },
          {
            type: "select",
            label: "房产状态",
            prop: "houseStatus",
            placeholder: "请输入",
            clearable: true,
            span: 4,
            dicData: Object.values(LeaseManageDic.HouseStatus)
          },
          {
            type: "number",
            label: "面积",
            prop: "houseArea",
            placeholder: "请输入",
            clearable: true,
            span: 4,
            minRows: 0
          },
          {
            prop: "btn",
            span: 4,
            formslot: true,
            width: 55
          }
        ]
      },
      leaseManageTable: {
        ref: "leaseManageTable",
        customTop: true,
        customTopPosition: "right",
        serverMode: {
          url: leaseManageApi.getHouseList,
          data: {
            pageNum: 1,
            pageSize: 10
          },
          props: {
            listKey: "list",
            total: "total",
            pageSize: "pageSize",
            pageNum: "pageNum"
          }
        },
        operation: {
          width: 200
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
            formatter: function(row, column) {
              let HouseStatus = LeaseManageDic.HouseStatus;
              let rowValue = row[column.property];
              let res = _.find(HouseStatus, (cur, key, obj) => {
                return cur.value === rowValue;
              });
              return res ? res.label : "--";
            }
          },
          {
            prop: "houseArea",
            label: "面积 m²"
          },
          {
            prop: "housePrice",
            label: "总价",
            formatter(row, column) {
              let pirceTypeLabel = "";
              if (typeof row.priceType == "number") {
                pirceTypeLabel =
                  LeaseManageDic.PriceType[row.priceType - 1].label;
              }
              return row[column.property]
                ? `${row[column.property]} ${pirceTypeLabel}`
                : "--";
            }
          },
          {
            prop: "qysj",
            label: "签约时间"
          },
          {
            prop: "zhxm",
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
    submit() {},
    resetChange() {},
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
    bulkDel({ selectedData }) {
      if (!selectedData.length) {
        commonFun.deleteTip(this, false, "请选择数据");
        return;
      }
      let ids = _.reduce(
        selectedData,
        (result, cur, curindex) => {
          return result + "," + cur.houseId;
        },
        ""
      );
      commonFun.deleteTip(
        this,
        true,
        "确定要删除吗?",
        () => {
          this.deleteRow(ids);
        },
        () => {}
      );
    },
    bulkEdit(obj) {
      console.log(obj);
    },
    getPropertyDetail(row) {
      return leaseManageApi.houseDetails(row);
    },
    propertyDetail({ scopeRow: { $index, row, _self } }) {
      this.getPropertyDetail(row).then(res => {
        this.$router.push({
          name: "editHouseProperty",
          params: {
            extraOptions: {
              disabled: true
            },
            model: _.cloneDeep(res)
          }
        });
      });
    },
    propertyEdit({ scopeRow: { $index, row, _self } }) {
      this.getPropertyDetail(row).then(res => {
        this.$router.push({
          name: "editHouseProperty",
          params: {
            model: _.cloneDeep(res)
          }
        });
      });
    },
    propertyDel({ scopeRow: { $index, row, _self } }) {
      commonFun.deleteTip(
        this,
        true,
        "确定要删除吗?",
        () => {
          this.deleteRow(row.houseId);
        },
        () => {}
      );
    },
    propertyLocation(obj) {
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
    refreshTable() {
      this.$refs[this.leaseManageTable.ref].refreshTable();
    }
  }
};
</script>
<style lang='less'>
#houseproperty-form .el-form-item {
  margin-bottom: 0;
}
</style>
