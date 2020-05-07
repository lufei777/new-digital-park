<template>
  <div class="environment-line-coms">
    <div class="module-item-top-name">{{moduleItem.moduleName}}</div>
    <div class="my-chart" ref="myChart"></div>
  </div>
</template>

<script>
  import ChartUtils from '@/utils/chartUtils'
  import CommonApi from '@/service/api/common'

  export default {
    name: "environmentLine",
    components: {},
    props: ["moduleItem"],
    data() {
      return {
        curType: 62
      };
    },
    methods: {
      initChart() {
        let myChart = this.$echarts.init(this.$refs.myChart)
        let res = [{
          zoom: '会议室',
          temperature: 25,
          humidity: 50
        }, {
          zoom: '门卫室',
          temperature: 30,
          humidity: 30
        }, {
          zoom: '餐厅',
          temperature: 26,
          humidity: 60
        }, {
          zoom: '财务室',
          temperature: 25,
          humidity: 60
        }, {
          zoom: '办公室',
          temperature: 25,
          humidity: 50
        }, {
          zoom: '大礼堂',
          temperature: 28,
          humidity: 30
        }]
        let temperature = {
          name: '温度',
          type: 'line',
          areaStyle: {},
          data: res.map((item) => item.temperature)
        }
        let humidity = {
          name: '湿度',
          type: 'line',
          areaStyle: {},
          yAxisIndex: 1,
          data: res.map((item) => item.humidity)
        }
        let series = [temperature, humidity]
        let option = {
          legend: {
            data: ['温度', '湿度'],
            textStyle: {
              fontSize: 14,
              color: '#fff'
            },
            right: '20'
          },
          tooltip: {
            trigger: 'axis',
            showDelay: 300,
            formatter: "{b}<br/>{a0}:{c0}°C<br/>{a1}:{c1}%"
          },
          calculable: true,
          color: ['#A994F2', '#4C94D2'],
          // color: [' rgba(169,148,242,1)', '#4C94D2'],
          xAxis: [{
            type: 'category',
            data: res.map((item) => item.zoom),
            "axisLine": {
              "show": false
            },
            "axisTick": {
              "show": false
            },
            axisLabel: {
              textStyle: {
                color: '#fff'
              },
            }
          }],
          yAxis: [{
            type: 'value',
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
              formatter: function (val) {
                return val+'°C';
              }
            },
            splitLine: {
              lineStyle: {
                color: '#435E61',
                opacity: 0.7,
                width:0.5
              }
            },
          },{
            type: 'value',
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
              formatter: function (val) {
                return val+'%';
              }
            },
            splitLine: {
              show: false
            },
          }],
          series: series
        }
        // console.log("option",option)
        myChart.setOption(option, true)

      },
      getEnvironmentLine() {
        this.initChart()
      },
    },
    mounted() {
      this.getEnvironmentLine()
    }
  };
</script>

<style lang="less">
  .environment-line-coms {
    .choose-box {
      width: 100%;
    }

    .choose-box-inner {
      flex-shrink: 0;
    }

    .item-choose {
      margin-left: 10px;
      height: 15px;
      line-height: 15px;
      font-weight: bold;
      font-size: 14px;
      padding: 5px 20px;
      border-radius: 5px;
    }

    .active-item {
      background: #008DEA;
      color: @white;
    }
  }
</style>
