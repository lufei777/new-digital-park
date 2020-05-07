<template>
  <div class="building-early-warning-alarm">
    <div class="module-item-top-name">{{moduleItem.moduleName}}</div>
    <div ref="myChart" class="my-chart"></div>
  </div>
</template>

<script>
  import CommonFun from "../../../../utils/commonFun";
  import ChartUtils from "../../../../utils/chartUtils";
  import CommonApi from '@/service/api/common'

  export default {
    name: "BuildingEarlyWarningAlarm",
    components: {},
    props: ["moduleItem"],
    data() {
      return {};
    },
    methods: {
      initChart() {
        let myChart = this.$echarts.init(this.$refs.myChart);
        let option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
          },
          toolbox: {
            show: true,
          },
          color: ['#486E97'],
          xAxis: {
            name:'时间',
            nameTextStyle:{
              color:'#fff'
            },
            axisLabel: {
              textStyle: {
                color: '#fff'
              },
            },
            "axisLine": {
              "show": false
            },
            "axisTick": {
              "show": false
            },
            type: 'category',
            boundaryGap: false,
            data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00',
              '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00',
              '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00']
          },
          yAxis: {
            name:'条',
            nameTextStyle:{
              color:'#fff'
            },
            type: 'value',
            splitLine: {
              show: false
            },
            "axisLine": {       //y轴
              "show": false
            },
            "axisTick": {       //y轴刻度线
              "show": false
            },
            axisLabel: {
              textStyle: {
                color: '#fff'
              },
            },
          },
          series: [
            {
              name: '报警',
              type: 'line',
              smooth: true,
              areaStyle: {},
              data: [10, 28, 25, 26, 27, 30, 55, 50, 40, 39, 38,
                39, 40, 50, 60, 75, 80, 70, 60, 40, 10, 10, 5, 20],
              itemStyle : {
                normal : {
                  // color:'#00FF00',
                  lineStyle:{
                    color:'#A74CFF'
                  }
                }
              },
            }
          ]
        };
        $(window).resize(function () {
          myChart.resize()
        })
        myChart.setOption(option, true)
      },
      async getData() {
        await CommonApi.getAlarmTimeShow()
      }
    },
    mounted() {
      this.getData()
      this.initChart()
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .building-early-warning-alarm {

  }
</style>
