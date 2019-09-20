<template>
  <div class="energy-saving-select">
    <div class="flex-align-between condition-box">
      <div class="block">
        <span class="demonstration">建筑群：</span>
        <el-select v-model="energyA3" placeholder="请选择">
          <el-option label="A3" value="1"></el-option>
        </el-select>
      </div>
      <div class="block">
        <span class="demonstration">能源分项：</span>
        <el-select v-model="energySubentry" placeholder="请选择">
          <el-option
            v-for="item in energySubentryData"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="block">
        <span class="demonstration">指标选择：</span>
        <el-select v-model="indexEnergy" placeholder="请选择">
          <el-option label="参考标准" value="1"></el-option>
          <el-option label="国家标准" value="2" disabled></el-option>
        </el-select>
      </div>
      <div class="block">
        <span class="demonstration">楼层检索：</span>
        <el-select v-model="curEnergy" placeholder="请选择">
          <el-option label="全部" value="0"></el-option>
          <el-option
            v-for="item in floorSelectData"
            :key="item.floorId"
            :label="item.floor"
            :value="item.floorId"
          ></el-option>
        </el-select>
      </div>
      <div class="block">
        <span class="demonstration">月份：</span>
        <el-date-picker
          v-model="startTime"
          type="month"
          value-format="yyyy-MM"
          placeholder="选择月"
          @change="onTimeChange(1)"
        ></el-date-picker>
      </div>
      <el-button type="primary" @click="getList">查询</el-button>
      <el-button type="primary" @click="exportList" v-if="tableData.total && tableData.total!=0">导出</el-button>
    </div>
    <div class="tabulation">
      <div class="tab-title flex-align-between">
        <span>注:红色字体为超标</span>
        <em>{{tabTitle}}</em>
      </div>
      <DynamicTable :tableData="tableData" :hideExportBtn="true" :styleLabel="true" :curPage="currentPage" />
    </div>
  </div>
</template>

<script>
import CommonApi from "../../../service/api/commonApi";
import EnergyApi from "../../../service/api/energyApi";
import DynamicTable from "../../../components/dynamicTable/index";
import { mapState } from "vuex";
import moment from "moment";
let activeNav;
export default {
  name: "EnergySavingSelect",
  components: {
    DynamicTable
  },
  data() {
    return {
      curEnergy: "0", //楼层检索
      energyA3: "1", //建筑群
      energySubentry: "", //能源分项
      indexEnergy: "1", //指标选择
      energySubentryData: [],
      floorSelectData: "",
      startTime: moment(new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000)).format("YYYY-MM"),
      page: 1,
      tableData: {
        total: 0
      },
      currentPage: 1
    };
  },
  computed: {
    ...mapState({
      energySaveFlag: state => state.energySavingSelect.energySaveFlag
    }),
    tabTitle() {
      activeNav = Cookies.get("activeNav") && JSON.parse(Cookies.get("activeNav"));
      let tmp = this.energySubentryData.find(item => {
        return item.id == this.energySubentry;
      });
      if (activeNav.childIndex == 0 || activeNav.childIndex == 2) {
        return `${this.startTime}逐日全天${tmp && tmp.name}统计`;
      } else {
        return `${this.startTime}逐日夜间${tmp && tmp.name}统计`;
      }
    },
    commonParams() {
      return {
        moment: this.startTime,
        lou: this.energyA3,
        standard: this.indexEnergy,
        type: this.energySubentry,
        parent: this.curEnergy,
        page: this.page,
        size: 10
      };
    }
  },
  methods: {
    onTimeChange() {},
    async getEnergyList() {
      let res = await CommonApi.getEnergyListByGroup();
      if (this.energySaveFlag == 1) {
        this.energySubentryData = res[1].energyType;
        this.energySubentry = res[1].energyType[0].id;
      } else if (this.energySaveFlag == 2) {
        this.energySubentryData = res[0].energyType;
        this.energySubentry = res[0].energyType[0].id;
      }
    },
    async getAllFloorOfA3() {
      let res = await CommonApi.getAllFloorOfA3();
      this.floorSelectData = res;
    },
    async getList() {
      let res;
      if (activeNav.childIndex == 0 || activeNav.childIndex == 2) {
        res = await EnergyApi.getEnergySavingElec(this.commonParams);
      } else {
        res = await EnergyApi.getEnergySavingNight(this.commonParams);
      }
      if (res && res.value) {
        var title = ["建筑楼层", "参考指标"];
        res.value[0].map((item, index) => {
          if (index < res.value[0].length - 2) title.push(index + 1);
        });
        res.title = title;
        this.tableData.total = res.total;
        this.tableData = res;
      } else {
        this.tableData.total = 0;
      }
    },
    async exportList() {
      let url = `${window.gateway}/vibe-web/energyCount/energy/elec/export?`;
      let params = "";
      for (let key in this.commonParams) {
        params += key + "=" + this.commonParams[key] + "&";
      }
      location.href = url + params;
    },
    handleCurrentChange(value) {
      this.page = value;
      this.getList();
    }
  },
  async mounted() {
    await this.getEnergyList();
    await this.getAllFloorOfA3();
    this.getList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">

.energy-saving-select {
  margin-top: 80px;
  padding: 0 20px;
  background: #fff;
  .condition-box {
    width: 100%;
    padding: 30px 0;
    .block {
      // padding: 0px 20px;
      // flex-shrink: 0;
      .el-select {
        width: 140px!important;
      }
    }
    .el-button {
      //  margin-left: -40px;
      width: 5%;
    }
  }
  .tabulation .tab-title {
    width: 57%;
    height: 50px;
    line-height: 50px;
    span {
      color: red;
      font-size: 14px;
    }
    em {
      font-style: normal;
      font-size: 20px;
    }
  }
   .dynamic-table-box .table-box {
    border-radius: 0;
    border: none;
    margin-top: 0px;
    padding: 0px;
    background: #fff;
    overflow: hidden;
  }
}
</style>
