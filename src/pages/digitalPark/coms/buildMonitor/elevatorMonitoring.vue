<template>
  <div class="elevator-monitor-coms">
    <div class="chart-box">
      <!--<div class="chart1" ref="myChart1"></div>-->
      <vcharts :chartConfig="chartConfig" :chartData='chartConfig.chartData' class="chart1"></vcharts>
      <vcharts :chartConfig="chartConfig" :chartData='chartConfig.chartData' class="chart1"></vcharts>
    </div>
    <div>{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
  import CommonApi from '@/service/api/common'
  import ChartUtils from '@/utils/chartUtils'
  import vcharts from "@/components/vCharts/index";
  export default {
    name: "elevatorMonitoring",
    components: {
      vcharts
    },
    props: ["moduleItem"],
    data() {
      return {
        chartConfig: {
          type: "ring",
          chartSettings:{
            offsetY: 130,
            radius: [55, 80],
          },
          chartData: {
            columns: [
              "label",
              "value",
            ],
            rows: [
              {
              label:'上升',value:1
            },{
              label:'下降',value:2
            },{
              label:'停止',value:3
            }
            ]
          }
        }
      };
    },
    methods: {
      async getEnvironmentData(){
        let res = await CommonApi.getHomeInterfaceMonitor({
          homeId:4
        })
        this.initChart(res)
      },
      initChart(res){
        // let myChart = echarts.init(this.$refs.myChart1);
        // let legendData = [`开启直梯：${res[0].data[0].value}`,`开启直梯：${res[0].data[0].value}`];
        // let dataList = [];
        // res[0].data.map(item => {
        //   var itemObj = {
        //     value: Number(item.value.split("")[0]),
        //     name: item.title
        //   };
        //   dataList.push(itemObj);
        // });
        // let seriesData =dataList
        // let titleText = this.moduleItem.moduleName
        // let data = {
        //   legendData,
        //   seriesData,
        //   // titleText,
        // };
        // console.log(data,myChart)
        // ChartUtils.hollowPieChart(myChart,data);

        // let option={
        //   legend:{
        //     textStyle:{
        //       color:'#8FD3FA'
        //     }
        //   }
        // }
        // myChart.setOption(option)
      }
    },
    mounted() {
      this.getEnvironmentData()
    }
  };
</script>

<style lang="less">
  .elevator-monitor-coms {
    .chart-box{
      width:100%;
      height:100%;
    }
    .chart1{
      width:50%;
      height:80%;
    }
  }
</style>
