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
            label: "车牌号码",
            prop: "houseNumber",
            placeholder: "请输入",
            clearable: true,
            span: 4
          },
          {
            type: "datetime",
            label: "入场时间",
            prop: "houseName",
            clearable: true,
            span: 4
          },
          {
            type: "datetime",
            label: "出场时间",
            prop: "housePrice",
            clearable: true,
            span: 4
          },
          {
            type: "input",
            label: "停车场名称",
            prop: "houseStatus",
            placeholder: "请输入",
            clearable: true,
            width: 100,
            span: 4
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
            clhm: "京A00000",
            tczt: "停车",
            kh: 1657842564521,
            tccmc: "数字园区1号停车场",
            yhlb: "个人",
            tccsfje: 500,
            rcfs: "开车",
            ccfs: "开车",
            rcsj: "2015-08-09 12:05",
            ccsj: "2015-08-09 16:12",
            rcdztdmc: "一号闸"
          }
        ],
        columnConfig: [
          {
            prop: "clhm",
            label: "车辆号码",
            fixed: "left"
          },
          {
            prop: "tczt",
            label: "停车状态",
            fixed: "left"
          },
          {
            prop: "kh",
            label: "卡号",
            fixed: "left"
          },
          {
            prop: "tccmc",
            label: "停车场名称",
            fixed: "left"
          },
          {
            prop: "yhlb",
            label: "用户类别",
            fixed: "left"
          },
          {
            prop: "tccsfje",
            label: "停车场收费金额(元)",
            fixed: "left",
            width: 150
          },
          {
            prop: "rcfs",
            label: "入场方式"
          },
          {
            prop: "ccfs",
            label: "出场方式"
          },
          {
            prop: "rcsj",
            label: "入场时间"
          },
          {
            prop: "ccsj",
            label: "出场时间"
          },
          {
            prop: "rcdztdmc",
            label: "入场道闸通道名称",
            width: 150
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
