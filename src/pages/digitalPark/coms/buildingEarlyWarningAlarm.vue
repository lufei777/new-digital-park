<template>
  <div class="building-early-warning-alarm">
    <div ref="myChart" class="my-chart"></div>
    <div>{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
import CommonFun from "../../../utils/commonFun";
import ChartUtils from "../../../utils/chartUtils";
export default {
  name: "BuildingEarlyWarningAlarm",
  components: {},
  props: ["moduleItem"],
  data() {
    return {};
  },
  methods: {
    initChart(){
      let myChart = echarts.init(this.$refs.myChart);
      let option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        toolbox: {
          show: true,
        },
        xAxis:{
            axisLabel: {
              textStyle: {
                color: '#4F89B2'
              },
            },
            axisLine:{
              lineStyle:{
                color: '#4F89B2'
              }
            },
          type: 'category',
          boundaryGap: false,
          data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
        },
        yAxis: {
          type: 'value',
          axisPointer: {
            snap: true
          },
          axisLabel: {
            textStyle: {
              color: '#4F89B2'
            }
          },
          axisLine:{
            show:false
          },
          nameTextStyle:{
            color: '#4F89B2'
          }
        },
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [{
            lte: 6,
            color: 'green'
          }, {
            gt: 6,
            lte: 8,
            color: 'red'
          }, {
            gt: 8,
            lte: 14,
            color: 'green'
          }, {
            gt: 14,
            lte: 17,
            color: 'red'
          }, {
            gt: 17,
            color: 'green'
          }]
        },
        series: [
          {
            name:'报警',
            type:'line',
            smooth: true,
            data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
            markArea: {
              data: [ [{
                name: '早高峰',
                xAxis: '07:30'
              }, {
                xAxis: '10:00'
              }], [{
                name: '晚高峰',
                xAxis: '17:30'
              }, {
                xAxis: '21:15'
              }] ]
            }
          }
        ]
      };
      $(window).resize(function(){
        myChart.resize()
      })
      myChart.setOption(option)
    }
  },
  mounted() {
    this.initChart()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.building-status-proportion {
  .pie-charts {
    height: 95%;
  }
}
</style>
