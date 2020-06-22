<template>
  <div class="elevator-monitor-coms">
    <div class="module-item-top-name">{{moduleItem.moduleName}}</div>
    <div class="my-chart flex" v-if="!iszg">
      <div class="chart-item-box">
        <div ref="myChart1" class="chart-item"></div>
        <span>直梯</span>
      </div>
      <div class="chart-item-box">
        <div ref="myChart2" class="chart-item"></div>
        <span>扶梯</span>
      </div>
    </div>
    <div class="my-chart" ref="myChart1" v-if="iszg"></div>
  </div>
</template>

<script>
  import CommonApi from "@/service/api/common";
  import ChartUtils from "@/utils/chartUtils";
  import {isZG} from "@/utils/project";

  export default {
    name: "elevatorMonitoring",
    props: ["moduleItem", 'type'],
    data() {
      return {};
    },
    computed: {
      iszg() {
        return isZG();
      }
    },
    methods: {
      async getEnvironmentData() {
        let res = await CommonApi.getHomeInterfaceMonitor({
          homeId: 4
        });
        this.initChart1(res);
        if (!this.iszg) {
          this.initChart2(res);
        }
      },
      initChart1(res) {
        let dataList = [
          {
            value: parseFloat(res[0].up),
            name: "上升"
          },
          {
            value: parseFloat(res[0].down),
            name: "下降"
          },
          {
            value: parseFloat(res[0].stop),
            name: "停止"
          }
        ];
        let myChart = this.$echarts.init(this.$refs.myChart1);
        let legendData = []; //['上升','下降','停止'];
        let seriesData = dataList;
        let legendUi = {
          textStyle: {
            color: "#8FD3FA",
            fontSize: this.moduleItem.largeScreen ? this.moduleItem.fontSize : 14
          },
          formatter: function (name) {
            let obj = dataList.find(item => item.name == name);
            return name + "：" + obj.value;
          }
        };
        if (this.iszg) {
          legendData = ["上升", "下降", "停止"];
        }
        let data = {
          legendData,
          seriesData,
          legendUi
        };
        ChartUtils.hollowPieChart(myChart, data);
        if (!this.iszg) {
          myChart.setOption({
            legend: {
              orient: "horizontal",
              left: "center",
              bottom: "",
              right: ""
            }
          });
        }
      },
      initChart2(res) {
        let dataList = [
          {
            value: res[1].up,
            name: "上升"
          },
          {
            value: res[1].down,
            name: "下降"
          },
          {
            value: res[1].stop,
            name: "停止"
          }
        ];
        let myChart = this.$echarts.init(this.$refs.myChart2);
        let seriesData = dataList;
        let data = {
          legendData: [],
          seriesData
        };
        ChartUtils.hollowPieChart(myChart, data);
      }
    },
    mounted() {
      this.getEnvironmentData();
    }
  };
</script>

<style lang="less">
  .elevator-monitor-coms {
    .chart-box {
      width: 100%;
      flex-grow: 1;
    }

    .chart-item-box {
      width: 50%;
      height: 100%;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .chart-item-box2 span {
      color: @white;
    }

    .chart-item {
      width: 100%;
      height: 90%;
      flex-grow: 1;
    }
  }
</style>
