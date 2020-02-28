<template>
  <div class="energy-proportion-analysis">
    <div class="select-box">
      <el-select v-model="energy" placeholder="请选择" @change="energyChange" size="mini">
        <el-option
          v-for="item in energyList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div ref="myChart" class="my-chart" id="energy-proportion-analysis-chart"></div>
    <div class="child-module-name">{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
import CommonApi from "../../../../service/api/common";
import ChartUtils from "../../../../utils/chartUtils";
export default {
  name: "EnergyProportionAnalysis",
  components: {},
  props: ["moduleItem", "routeAddress"],
  data() {
    return {
      energy: 34,
      energyList: [
        {
          value: 34,
          label: "电"
        },
        {
          value: 37,
          label: "水"
        },
        {
          value: 38,
          label: "热"
        }
      ]
    };
  },
  methods: {
    async getTbhbChartbChart() {
      let params = {
        redioType: 1,
        selectType: 2,
        startTime: "2019-01",
        lastTime: "2019-12",
        floorId: 1,
        catalog: this.energy
      };
      let res = await CommonApi.getTbhbChart(params);
      this.initChart(res);
    },
    initChart(res) {
      let vm = this;
      let myChart = echarts.init(this.$refs.myChart ||document.getElementById('energy-proportion-analysis-chart'));
      let xAxis = res.value.map(item => item.date.slice(0, 7));
      let dqzh = {
        name: "当期综合能耗",
        type: "bar",
        data: res.value.map(item => item.dqzh)
      };
      let tqzh = {
        name: "同期综合能耗",
        type: "bar",
        barGap: "-100%",
        data: res.value.map(item => item.tqzh)
      };
      let tbzz = {
        name: "综合能耗同比增长率",
        type: "line",
        yAxisIndex: 1,
        data: res.value.map(item => item.tbzz)
      };
      let data = res.value.map(item => item.hbzz);

      let hbzz = {
        name: "综合能耗环比增长率",
        type: "line",
        yAxisIndex: 1,
        data,
        formatter: "{c} %"
      };
      let series = [dqzh, tqzh, tbzz, hbzz];
      let legendData = [
        "当期综合能耗",
        "同期综合能耗",
        "综合能耗同比增长率",
        "综合能耗环比增长率"
      ];
      let yAxis = res.unit;
      let data2 = {
        // legendData,
        xAxis,
        yAxis,
        series,
        showSecondY: true
      };
      let resizeBox = $("#energy-proportion-analysis-chart").parents(
        ".item-product-coms"
      );
      ChartUtils.handleBarChart(myChart, data2, resizeBox);

      let option = {
        yAxis: [
          {
            type: "value",
            name: res.unit,
            axisLabel: {
              textStyle: {
                color: "#4F89B2"
              }
            },
            axisLine: {
              show: false
            },
            nameTextStyle: {
              color: "#4F89B2"
            }
          },
          {
            show: true,
            type: "value",
            name: "增长率",
            min: -100,
            max: 100,
            axisLabel: {
              formatter: "{value} %",
              textStyle: {
                color: "#4F89B2"
              }
            },
            axisLine: {
              show: false
            },
            nameTextStyle: {
              color: "#4F89B2"
            }
          }
        ],
        grid: {
          y: 50,
          y2: 30,
          x: 70,
          x2: 50
        },
        xAxis: [
          {
            axisLabel: {
              textStyle: {
                color: "#4F89B2"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#4F89B2"
              }
            }
          }
        ],
        series: [
          {
            barWidth: "40%"
          }
        ]
      };
      // 点击事件
      myChart.on("click", params => {
        if (vm.moduleItem.routeAddress) {
          window.open(vm.moduleItem.routeAddress);
        }
      });
      // $(window).resize(function(){
      //   myChart.resize()
      // })
      myChart.setOption(option);
    },
    energyChange() {
      this.getTbhbChartbChart();
    }
  },
  mounted() {
    this.getTbhbChartbChart();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.energy-proportion-analysis {
  .select-box {
    width: 100%;
    flex-shrink: 0;
  }
  .el-select {
    float: right;
    width: 100px;
    margin-right: 10px;
  }
  .my-chart {
    /*flex-grow: 1;*/
  }
  .child-module-name {
    /*flex-shrink: 0;*/
    /*height:20px;*/
  }
}
</style>
