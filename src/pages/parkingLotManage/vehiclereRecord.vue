<template>
  <div>
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
            label: "抓拍时间",
            prop: "houseName",
            clearable: true,
            span: 4
          },
          {
            type: "input",
            label: "行车方向",
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
            tczt: "黄色",
            kh: "2015-08-09 12:05",
            tccmc: "左侧",
            yhlb: "出",
            rcdztdmc: "数字园区二号停车场",
            cdh: "5号",
            kkxjtdmc: "123"
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
            label: "车辆颜色",
            fixed: "left"
          },
          {
            prop: "kh",
            label: "抓拍时间",
            fixed: "left"
          },
          {
            prop: "tccmc",
            label: "行车方向",
            fixed: "left"
          },
          {
            prop: "yhlb",
            label: "车辆进出类型",
            fixed: "left"
          },
          {
            prop: "rcdztdmc",
            label: "停车场名称",
            width: 150
          },
          {
            prop: "cdh",
            label: "车道号"
          },
          {
            prop: "kkxjtdmc",
            label: "卡口相机通道名称"
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
