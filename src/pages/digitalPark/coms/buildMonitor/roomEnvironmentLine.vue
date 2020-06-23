<template>
  <div class="environment-line-coms">
    <div class="module-item-top-name flex-align tmp-hidden">
      <i class="module-item-top-icon" v-if="isNorbulingkaScreen"></i>
      <span>{{moduleItem.moduleName}}</span>
    </div>
    <div class="my-chart" ref="myChart"></div>
  </div>
</template>

<script>
  import {isNorbulingkaScreen } from "@/utils/project";
  import CommonApi from '@/service/api/common'
  export default {
    name: "environmentLine",
    components: {},
    props: ["moduleItem"],
    data() {
      return {
      };
    },
    computed:{
      isNorbulingkaScreen(){
        return isNorbulingkaScreen()
      }
    },
    methods: {
      async initChart() {
        // let res = await CommonApi.getZoomEnvironmentLine({
        //   codes:'60,61'
        // })
        let res =[]
        let myChart = this.$echarts.init(this.$refs.myChart)
        if(this.isNorbulingkaScreen){
          res= [{
            space: '格桑颇章',
            value:{
              temperature: 25,
              humidity: 50
            }
          }, {
            space: '金色颇章',
            value:{
              temperature: 30,
              humidity: 30
            }
          }, {
            space: '湖心宫',
            value:{
              temperature: 26,
              humidity: 60
            }
          }, {
            space: '新宫',
            value:{
              temperature: 25,
              humidity: 60
            }
          }]
        }else{
          res= [{
            space: '会议室',
            value:{
              temperature: 25,
              humidity: 50
            }
          }, {
            space: '门卫室',
            value:{
            temperature: 30,
            humidity: 30
            }
          }, {
            space: '餐厅',
            value:{
            temperature: 26,
            humidity: 60
            }
          }, {
            space: '财务室',
            value:{
            temperature: 25,
            humidity: 60
            }
          }, {
            space: '办公室',
            value:{
            temperature: 25,
            humidity: 50
            }
          }, {
            space: '大礼堂',
            value:{
            temperature: 28,
            humidity: 30
            }
          }]
        }
        let temperature = {
          name: '温度',
          type: 'line',
          areaStyle: {},
          data: res.map((item) => item.value.temperature)
        }
        let humidity = {
          name: '湿度',
          type: 'line',
          areaStyle: {},
          yAxisIndex: 1,
          data: res.map((item) => item.value.humidity)
        }
        let series = [temperature, humidity]
        let option = {
          legend: {
            data: ['温度', '湿度'],
            textStyle: {
              fontSize: 14,
              color: this.moduleItem.type!=2?'#fff':'#666'
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
            data: res.map((item) => item.space),
            "axisLine": {
              "show": false
            },
            "axisTick": {
              "show": false
            },
            axisLabel: {
              textStyle: {
                color: this.moduleItem.type!=2?'#fff':''
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
                color: this.moduleItem.type!=2?'#fff':''
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
                color: this.moduleItem.type!=2?'#fff':''
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
        myChart.setOption(option, true)
        $(window).resize(()=>{
          myChart.resize()
        })
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
