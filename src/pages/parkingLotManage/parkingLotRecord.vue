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
import { LeaseManageDic } from "@/utils/dic/leaseManage";
import miForm from "@/components/Form";
import miTable from "@/components/Table";
import leaseManageApi from "@/service/api/leaseManageApi";
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
            label: "停车场名称",
            prop: "houseNumber",
            placeholder: "请输入",
            clearable: true,
            span: 4
          },
          {
            type: "number",
            label: "车位总数",
            prop: "houseName",
            clearable: true,
            span: 4,
            minRows: 0
          },
          {
            type: "select",
            label: "可停车位数",
            prop: "housePrice",
            clearable: true,
            dicData: [
              { label: "10车位以上", value: 1 },
              { label: "30车位以上", value: 2 },
              { label: "50车位以上", value: 3 },
              { label: "100车位以上", value: 4 },
              { label: "1000车位以上", value: 5 }
            ],
            span: 4,
            width: 100
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
        data: [
          {
            tccmc: "三里屯停车场_1",
            ktcws: 100,
            cwzs: 1000,
            rkgs: 4,
            ckgs: 4,
            rwps: 900
          },
          {
            tccmc: "三里屯停车场_2",
            ktcws: 100,
            cwzs: 520,
            rkgs: 4,
            ckgs: 4,
            rwps: 420
          }
        ],
        columnConfig: [
          {
            prop: "tccmc",
            label: "停车场名称",
            fixed: "left"
          },
          {
            prop: "ktcws",
            label: "可停车位数",
            fixed: "left"
          },
          {
            prop: "cwzs",
            label: "车位总数",
            fixed: "left"
          },
          {
            prop: "rkgs",
            label: "入口个数",
            fixed: "left"
          },
          {
            prop: "ckgs",
            label: "出口个数",
            fixed: "left"
          },
          {
            prop: "rwps",
            label: "余位屏数"
          }
        ],
        uiConfig: {
          height: "auto",
          customTopPosition: "right",
          selection: true,
          showIndex: true
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
    propertyDetail({ scopeRow: { $index, row, _self } }) {
      leaseManageApi.houseDetails(row).then(res => {
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
      this.$router.push({
        name: "editHouseProperty",
        params: {
          model: _.cloneDeep(row)
        }
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