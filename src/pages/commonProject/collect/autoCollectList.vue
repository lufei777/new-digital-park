<template>
  <div class="auto-collect-list panel-container">
    <div class="flex condition-box radius-shadow">
      <div class="block">
        <span class>能源：</span>
        <el-select v-model="curEnergy" placeholder="请选择">
          <el-option label="电" value="34"></el-option>
          <el-option label="水" value="37"></el-option>
        </el-select>
      </div>
      <div class="block" v-if="curSystem!='zg'">
        <span class="demonstration">开始时间：</span>
        <el-date-picker
          v-model="startTime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="onTimeChange(-1)"
          :clearable="false"
        ></el-date-picker>
      </div>
      <div class="block" v-if="curSystem!='zg'">
        <span class="demonstration">结束时间：</span>
        <el-date-picker
          v-model="endTime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="onTimeChange(-1)"
          :clearable="false"
        ></el-date-picker>
      </div>
      <el-button type="primary" @click="onClickSrueBtn">确定</el-button>
    </div>
    <div class="table-box panel">
      <div class="operator-box">
        <el-button type="primary" @click="handleExport"
                   v-if="tableConfig.data.length && checkPermission(['export'])"
        >导出</el-button>
      </div>
      <z-table :ref="tableConfig.ref" :options="tableConfig" />
    </div>
  </div>
</template>

<script>
import CommonApi from "../../../service/api/common";
import CommonFun from "../../../utils/commonFun";
import { checkPermission } from '@/utils/permission'
export default {
  name: "AutoCollectList",
  data() {
    let _this = this;
    let curSystem = window.__CZ_SYSTEM
    return {
      startTime: "",
      endTime: "",
      curPage: 1,
      tableData: {},
      curEnergy: "34",
      tableConfig: {
        ref: "tableRef",
        data: [],
        columnConfig:[],
        uiConfig: {
          height: "auto",
          pagination: {
            layout: "total,->, prev, pager, next, jumper",
            handler(pageSize, val) {
              _this.handleCurrentChange(val);
            }
          }
        },
        tableMethods: {}
      }
    };
  },
  computed:{
    curSystem() {
      return window.__CZ_SYSTEM;
    }
  },
  methods: {
    checkPermission(val){
      return checkPermission(val)
    },
    onTimeChange(flag) {},
    async getAutoCollectList() {
      let params = {
        catalog: this.curEnergy,
        startTime: this.startTime,
        endTime: this.endTime,
        page: this.curPage,
        size: 10
      };
      this.tableConfig.columnConfig = [
        { label: "序号", prop: "xulie" },
        { label: "时间", prop: "time" },
        { label: "表名称", prop: "name" },
        { label: "数值", prop: "value" },
        { label: "所属空间", prop: "caption" }
      ];
      let res = await CommonApi.getAutoCollectList(params);
      this.tableConfig.data = res.value;
      this.tableConfig.uiConfig.pagination.total = res.total;
    },
    onClickSrueBtn() {
      this.curPage = 1;
      this.$refs["tableRef"].setCurrentPage(1);
      if(this.curSystem=='zg'){
         this.getLastMonthData()
      }else{
        this.getAutoCollectList();
      }
    },
    handleCurrentChange(val) {
      this.curPage = val;
      if(this.curSystem == 'zg') {
         this.getLastMonthData()
      }else {
        this.getAutoCollectList();
      }
    },
    handleExport() {
      let params = "catalog=" + this.curEnergy + "&startTime=" + this.startTime + "&endTime=" + this.endTime +
        "&page=" +
        this.curPage +
        "&size=10";
      let url =''
      if(this.curSystem == 'zg'){
        url='/vibe-web/energyCount/energy/getLastNumberExcel'
      }else{
        url = `/vibe-web/energyCount/energy/getBaseRepresentationNumberExcel`
      }
      CommonFun.exportMethod({url, params});
    },
    async getLastMonthData(){
      let tableTitleText = this.curEnergy=="34"?"电":"水"
      let column2 = [
        { label: "年度", prop: "year" },
        { label: "月份", prop: "month" },
        { label: tableTitleText+"表号", prop: "nameId" },
        { label: tableTitleText+"表名称", prop: "name" },
        { label: "本次表示数", prop: "value" }
      ]
      this.tableConfig.columnConfig = column2;
      let res = await CommonApi.getLastNumber({
        catalog : this.curEnergy,
        page : this.curPage,
        size: 10
      })
      this.tableConfig.data=res.list
      this.tableConfig.uiConfig.pagination.total = res.total;
    }
  },
  mounted() {
    this.onClickSrueBtn();
  }
};
</script>

<style lang="less">
.auto-collect-list {
  .condition-box {
    padding: 20px;
    background: @white;
    margin-bottom: 20px;
  }
  .block {
    margin-right: 40px;
  }
  .demonstration {
    margin-right: 5px;
  }
  .table-box {
    padding: 20px;
    background: @white;
    .operator-box {
      clear: both;
      display: flex;
      margin-bottom: 20px;
      flex-direction: row-reverse;
      .el-button {
        margin-left: 20px;
      }
    }
  }
}
</style>
