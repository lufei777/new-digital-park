<template>
  <div class="monitor-choose">
    <div class="monitor-choose-content radius-shadow">
      <div class="flex-align">
        <span class="choose-tip">时间</span>
        <div class="block" v-if="showDateType">
          <span class="demonstration">条件选择</span>
          <el-select v-model="curDateType" placeholder="请选择" @change="handleDateTypeChange">
            <el-option
              v-for="item in dateTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="block">
          <span class="demonstration">开始时间</span>
          <el-date-picker
            v-model="startTime"
            :type="showDateType?pickerType:dateTime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="onTimeChange(1)"
            :clearable="false"
          ></el-date-picker>
        </div>
        <div class="block">
          <span class="demonstration">结束时间</span>
          <el-date-picker
            v-model="endTime"
            :type="showDateType?pickerType:dateTime"
            placeholder="选择日期时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="onTimeChange(-1)"
            :clearable="false"
          ></el-date-picker>
        </div>
      </div>
      <div class="flex-align choose-box">
        <span class="choose-tip">监测器选择</span>
        <div class="block flex-align">
          <span>{{monitorText1}}</span>
          <el-button @click="onClickShowBtn(1)" type="primary">请选择</el-button>
        </div>
        <div class="block flex-align" v-if="showTwoMonitor">
          <span>{{monitorText2}}</span>
          <el-button @click="onClickShowBtn(2)" type="primary">请选择</el-button>
        </div>
      </div>
    </div>

    <MonitorModal />
    <div class="echarts-box radius-shadow">
      <el-button type="primary" class="handle-btn" @click="onClickBtn">处理</el-button>
      <div style="clear:both"></div>
      <div ref="myChart1" class="my-chart"></div>
      <div ref="myChart2" class="my-chart" v-if="statisticsFlag==1"></div>
      <div ref="myChart3" class="my-chart" v-if="statisticsFlag==1"></div>
      <div ref="myChart4" class="my-chart" v-if="statisticsFlag==1"></div>
    </div>
    <div class="table-box radius-shadow">
      <z-table :ref="tableConfig.ref" :options="tableConfig"></z-table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import echarts from "echarts";
import moment from "moment";
import CommonApi from "../../../service/api/common";
import MonitorModal from "../../../components/monitorModal/index";
import ChartUtils from "@/utils/chartUtils";
export default {
  name: "DeviceAnalysis",
  components: {
    MonitorModal
  },
  props: ["showDateType", "showTwoMonitor", "statisticsFlag"],
  data() {
    return {
      startTime: moment(
        new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000)
      ).format("YYYY-MM-DD HH:mm:ss"),
      endTime: moment().format("YYYY-MM-DD HH:mm:ss"),
      tableText: ["B-ALE-1-a 照明", "B-AL-1-aFM 电热风幕和热风幕电机"],
      dateTypeList: [
        {
          name: "年",
          id: 4
        },
        {
          name: "月",
          id: 3
        },
        {
          name: "日",
          id: 2
        }
      ],
      curDateType: 2,
      pickerType: "date", //变化的 年、年月、年月日
      dateTime: "datetime", //年月日时分秒
      monitorText1: "",
      monitorText2: "",
      monitor1Id: "",
      monitor2Id: "",
      statisCompareTableData: [],
      tableConfig: {
        ref: "tableRef",
        data: [],
        columnConfig: [],
        uiConfig: {
          pagination: false,
          height: "auto"
        }
      }
    };
  },
  computed: {
    commonParams() {
      return {
        startTime: this.startTime,
        lastTime: this.endTime,
        filterType: this.curDateType
      };
    }
  },
  methods: {
    async getDefaultNode() {
      let res = await CommonApi.getDefaultNode();
      this.monitorText1 = res.captions[0];
      this.monitorText2 = res.captions[1];
      this.monitor1Id = res.monitorIds[0];
      this.monitor2Id = res.monitorIds[1];
    },
    onClickShowBtn(flag) {
      this.$store.commit("analysis/curSelect", flag);
      this.$store.commit("analysis/showDialog", true);
    },
    timeFormat(time, value) {
      let formatType =
        this.pickerType == "year"
          ? "YYYY"
          : this.pickerType == "month"
          ? "YYYY-MM"
          : "YYYY-MM-DD";
      this[time] = this[time] ? moment(value).format(formatType) : "";
    },
    onTimeChange(flag) {
      let format;
      if (!this.showDateType) {
        format = "YYYY-MM-DD HH:mm:ss";
      } else {
        format =
          this.pickerType == "year"
            ? "YYYY"
            : this.pickerType == "month"
            ? "YYYY-MM"
            : "YYYY-MM-DD";
      }
      if (flag == 1) {
        this.timeFormat("startTime", this.startTime);
      } else {
        this.timeFormat("lastTime", this.lastTime);
      }
    },
    handleDateTypeChange(value) {
      this.pickerType = value == 4 ? "year" : value == 3 ? "month" : "date";
      this.timeFormat("startTime", this.startTime);
      this.timeFormat("lastTime", this.lastTime);
      // this.pickerType=value==4?'year':value==3?"month":'date'
      // let format=value==4?'YYYY':value==3?'YYYY-MM':'YYYY-MM-DD'
      // this.$store.commit('analysis/filterType',value)
      // this.$store.commit('analysis/startTime',moment(this.startTime).format(format))
      // this.$store.commit('analysis/endTime',moment(this.endTime).format(format))
    },
    async getStatisCompareData() {
      let params = {
        ...this.commonParams,
        ...{
          monitorId1: this.monitor1Id,
          monitorId2: this.monitor2Id
        }
      };
      let res = await CommonApi.getStatisCompareData(params);
      if (this.statisticsFlag == 1) {
        this.initChart(res);
      }
      this.initTableData(res);
    },
    initChart(res) {
      let seriesList = [
        [
          {
            data: res.maxValues_1,
            type: "bar",
            name: this.monitorText1 + "最大值"
          },
          {
            data: res.maxValues_2,
            type: "bar",
            name: this.monitorText2 + "最大值"
          }
        ],
        [
          {
            data: res.minValues_1,
            type: "bar",
            name: this.monitorText1 + "最小值"
          },
          {
            data: res.minValues_2,
            type: "bar",
            name: this.monitorText2 + "最小值"
          }
        ],
        [
          {
            data: res.avgValues_1,
            type: "bar",
            name: this.monitorText1 + "平均值"
          },
          {
            data: res.avgValues_2,
            type: "bar",
            name: this.monitorText2 + "平均值"
          }
        ],
        [
          {
            data: res.stdValues_1,
            type: "bar",
            name: this.monitorText1 + "均方差"
          },
          {
            data: res.stdValues_2,
            type: "bar",
            name: this.monitorText2 + "均方差"
          }
        ]
      ];
      let legendList = [
        [this.monitorText1 + "最大值", this.monitorText2 + "最大值"],
        [this.monitorText1 + "最小值", this.monitorText2 + "最小值"],
        [this.monitorText1 + "平均值", this.monitorText2 + "平均值"],
        [this.monitorText1 + "均方差", this.monitorText2 + "均方差"]
      ];
      for (let i = 1; i <= 4; i++) {
        this["myChart" + i] = this.$echarts.init(this.$refs["myChart" + i]);
        let xAxis = res.xAxis;
        let data = {
          titleText: "",
          legendData: legendList[i - 1],
          xAxis,
          series: seriesList[i - 1],
          yAxis: res.unit1
        };
        ChartUtils.handleBarChart(this["myChart" + i], data);
      }
    },
    async getHistoryStatisData() {
      let params = {
        ...this.commonParams,
        ...{
          monitorId: this.monitor1Id
        }
      };
      let res = await CommonApi.getHistoryStatisData(params);
      this.historyStatisInitChart(res);
      let tmp = [];
      res.xAxis.map((item, index) => {
        tmp.push({
          time: item,
          max1: res.maxValues[index],
          min1: res.minValues[index],
          avg1: res.avgValues[index],
          std1: res.stdValues[index]
        });
      });
      let labelList = [
        { label: "时间", prop: "time" },
        { label: "最大值(KWH)", prop: "max1" },
        { label: "最小值(KWH)", prop: "min1" },
        { label: "平均值(KWH)", prop: "avg1" },
        { label: "均方差(KWH)", prop: "std1" }
      ];
      this.tableConfig.columnConfig = labelList;
      this.tableConfig.data = tmp;
    },
    historyStatisInitChart(res) {
      let series = [
        {
          data: res.maxValues,
          type: "bar",
          name: "最大值"
        },
        {
          data: res.minValues,
          type: "bar",
          name: "最小值"
        },
        {
          data: res.avgValues,
          type: "bar",
          name: "平均值"
        },
        {
          data: res.stdValues,
          type: "bar",
          name: "均方差"
        }
      ];
      let legendData = ["最大值", "最小值", "平均值", "均方差"];
      let myChart = this.$echarts.init(this.$refs.myChart1);
      let xAxis = res.xAxis;
      let data = {
        titleText: "",
        legendData,
        xAxis,
        series,
        yAxis: res.unit1
      };
      ChartUtils.handleBarChart(myChart, data);
    },
    async getCorrelationData() {
      let params = {
        startTime: this.startTime,
        lastTime: this.endTime,
        monitorId1: this.monitor1Id,
        monitorId2: this.monitor2Id,
        filterType: 2
      };
      let res = await CommonApi.getCorrelationData(params);
      console.log(res);
      let tmpArr = [];
      res.points.map(item => {
        tmpArr.push({
          point1: item[0],
          point2: item[1]
        });
      });
      let labelList = [
        { label: "时间", prop: "time" },
        { label: this.tableText[0], prop: "point1" },
        { label: this.tableText[1], prop: "point2" }
      ];
      this.tableConfig.columnConfig = labelList;
      this.tableConfig.data = tmpArr;
    },
    initTableData(res) {
      let tmp = [];
      res.xAxis.map((item, index) => {
        tmp.push({
          time: item,
          max1: res.maxValues_1[index],
          max2: res.maxValues_2[index],
          min1: res.minValues_1[index],
          min2: res.minValues_2[index],
          avg1: res.avgValues_1[index],
          avg2: res.avgValues_2[index],
          std1: res.stdValues_1[index],
          std2: res.stdValues_2[index]
        });
      });
      let labelList = [
        { label: "时间", prop: "time" },
        { label: this.tableText[0], prop: "max1" },
        { label: this.tableText[1], prop: "max2" },
        { label: this.tableText[0], prop: "min1" },
        { label: this.tableText[1], prop: "min2" },
        { label: this.tableText[0], prop: "avg1" },
        { label: this.tableText[1], prop: "avg2" },
        { label: this.tableText[0], prop: "std1" },
        { label: this.tableText[1], prop: "std2" }
      ];
      this.tableConfig.columnConfig = labelList;
      console.log("tmp", tmp, res);
      this.statisCompareTableData = tmp;
      this.tableConfig.data = tmp;
    },
    statisCompare() {},
    onClickBtn() {
      this.getStatisCompareData();
    }
  },
  async mounted() {
    await this.getDefaultNode();
    if (this.statisticsFlag == 1) {
      await this.getStatisCompareData();
    } else if (this.statisticsFlag == 2) {
      this.getHistoryStatisData();
    } else if (this.statisticsFlag == 3) {
      this.getCorrelationData();
    }
  }
};
</script>

<style lang="less">
.monitor-choose {
  .monitor-choose-content {
    padding: 20px 0;
  }
  .echarts-box {
    margin: 20px 0;
    height: 650px;
  }
  .table-box {
    padding: 20px;
  }
  .block {
    margin: 0 40px;
  }
  .choose-tip {
    margin-left: 100px;
    width: 80px;
    text-align: right;
  }
  .el-button {
    margin: 0 10px;
  }
  .chart-box {
    width: 80%;
    margin: 20px auto;
  }
  .my-chart {
    width: 50%;
    height: 300px;
    float: left;
  }
  .choose-box {
    padding-top: 20px;
  }
  .block {
    margin: 0 40px;
  }
  .choose-tip {
    margin-left: 100px;
    width: 80px;
    text-align: right;
  }
  .handle-btn {
    margin: 10px;
    float: right;
  }
  .el-table th.gutter {
    width: 16px;
  }
  .el-select .el-input {
    width: 80px;
  }
  .el-table th div {
    padding-left: 0;
  }
}
</style>