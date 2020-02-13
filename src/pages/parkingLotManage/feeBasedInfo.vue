<template>
  <div class="panel-container">
    <div id="houseproperty-form" class="panel">
      <z-form
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
      </z-form>
    </div>

    <div class="table panel">
      <z-table :ref="leaseManageTable.ref" :options="leaseManageTable">
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
import leaseManageApi from "@/service/api/leaseManage";
import commonFun from "@/utils/commonFun.js";

export default {
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
            label: "收费时间",
            prop: "houseName",
            clearable: true,
            span: 4
          },
          {
            type: "select",
            label: "收费类型",
            prop: "housePrice",
            clearable: true,
            dicData: [
              {
                label: "类型1",
                value: 1
              },
              {
                label: "类型2",
                value: 2
              }
            ],
            span: 4
          },
          {
            type: "input",
            label: "收费员",
            prop: "houseStatus",
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
            sfgz: "规则一",
            sflx: "类型一",
            yhje: "30元",
            rcsj: "2015-08-09 12:05",
            ccsj: "2015-08-09 16:12",
            sfsj: "2015-08-09 16:12",
            rcdztdmc: "一号闸",
            tcsc: "30分钟",
            bz: "拉入黑名单"
          },{
            clhm: "京A48659",
            tczt: "停车",
            kh: 4589456231587,
            tccmc: "数字园区1号停车场",
            yhlb: "个人",
            tccsfje: 500,
            sfgz: "规则一",
            sflx: "类型一",
            yhje: "10元",
            rcsj: "2015-08-09 12:05",
            ccsj: "2015-08-09 16:12",
            sfsj: "2015-08-09 16:12",
            rcdztdmc: "一号闸",
            tcsc: "2小时",
            bz: "拉入黑名单"
          },{
            clhm: "京A49586",
            tczt: "停车",
            kh: 1589456726541,
            tccmc: "数字园区1号停车场",
            yhlb: "个人",
            tccsfje: 500,
            sfgz: "规则一",
            sflx: "类型一",
            yhje: "5元",
            rcsj: "2015-08-09 12:05",
            ccsj: "2015-08-09 16:12",
            sfsj: "2015-08-09 16:12",
            rcdztdmc: "一号闸",
            tcsc: "5小时",
            bz: "拉入黑名单"
          }
        ],
        columnConfig: [
          {
            prop: "clhm",
            label: "车辆号码",
            fixed: "left"
          },
          {
            prop: "kh",
            label: "卡号",
            fixed: "left"
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
            prop: "tcsc",
            label: "停车时长"
          },
          {
            prop: "tccsfje",
            label: "实收金额(元)",
            fixed: "left"
          },
          {
            prop: "sfgz",
            label: "收费规则"
          },
          {
            prop: "sflx",
            label: "收费类型"
          },
          {
            prop: "yhje",
            label: "优惠金额(元)"
          },
          {
            prop: "sfsj",
            label: "收费时间",
            width: 150
          },
          {
            prop: "bz",
            label: "备注",
            width: 150
          }
        ],
        uiConfig: {
          height: "auto",
          customTopPosition: "right",
          selection: true,
          showIndex: {
            label: "序号"
          }
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
