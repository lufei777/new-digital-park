<template>
  <div class="elevator-monitor-coms">
    <div class="chart-box flex">
      <!--<div class="chart1" ref="myChart1"></div>-->
      <div class="chart-box-item">
        <z-charts :options="chartConfig" :chartData='chartConfig.chartData' class="chart1"></z-charts>
        <span>直梯</span>
      </div>
      <div class="chart-box-item">
        <z-charts :options="chartConfig2" :chartData='chartConfig.chartData' class="chart1"></z-charts>
        <span>扶梯</span>
      </div>

    </div>
    <div>{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
  import CommonApi from '@/service/api/common'
  import ChartUtils from '@/utils/chartUtils'
  export default {
    name: "elevatorMonitoring",
    props: ["moduleItem"],
    data() {
      let label={
        normal: {
          show: false,
            position: 'center'
        },
        emphasis: {
          show: true,
            textStyle: {
            fontSize: '30',
              fontWeight: 'bold'
          }
        }
      }
      return {
        chartConfig: {
          type: "ring",
          legend:{
            textStyle:{
              color:'#8FD3FA'
            }
          },
          settings:{
            offsetY: 130,
            radius: [50, 70],
            label:label,
          },
          data: {
            columns: [
              "label",
              "value",
            ],
            rows: [{}]
          }
        },
        chartConfig2: {
          type: "ring",
          legendVisible:false,
          settings:{
            offsetY: 130,
            radius: [50, 70],
            label:label,
          },
          data: {
            columns: [
              "label",
              "value",
            ],
            rows: [{}]
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
        this.chartConfig.chartData.rows=[{
            label:'上升',value:res[0].up
          },{
            label:'下降',value:res[0].down
          },{
            label:'停止',value:res[0].stop
        }]
        this.chartConfig2.chartData.rows=[{
          label:'上升',value:res[1].up
        },{
          label:'下降',value:res[1].down
        },{
          label:'停止',value:res[1].stop
        }]
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
    .chart-box-item{
      width:50%;
      height:90%;
    }
    .chart1{
      width:90%;
      height:80%;
    }
  }
</style>
