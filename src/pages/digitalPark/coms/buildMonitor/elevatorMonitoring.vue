<template>
  <div class="elevator-monitor-coms">
    <div class="chart-box flex my-chart">
      <div class="chart-box-item">
        <div class="chart1" ref="myChart1"></div>
        <span>直梯</span>
      </div>
      <div class="chart-box-item">
        <div class="chart1" ref="myChart2"></div>
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
      return {

      };
    },
    methods: {
      async getEnvironmentData(){
        let res = await CommonApi.getHomeInterfaceMonitor({
          homeId:4
        })
        this.initChart1(res)
        this.initChart2(res)
      },
      initChart1(res){
        let dataList =[{
          value:res[0].up,
          name:'上升'
        },{
          value:res[0].down,
          name:'下降'
        },{
          value:res[0].stop,
          name:'停止'
        }]
        let myChart = echarts.init(this.$refs.myChart1);
        let legendData = ['上升','下降','停止'];
        let seriesData =dataList
        let legendUi={
          orient: 'horizontal',
          textStyle:{
            color:'#8FD3FA',
            fontSize:this.moduleItem.largeScreen?this.moduleItem.fontSize:14
          }
        }
        let data = {
          legendData,
          seriesData,
          legendUi
        };
        ChartUtils.hollowPieChart(myChart,data);
      },
      initChart2(res){
        let dataList =[{
          value:res[1].up,
          name:'上升'
        },{
          value:res[1].down,
          name:'下降'
        },{
          value:res[1].stop,
          name:'停止'
        }]
        let myChart = echarts.init(this.$refs.myChart2);
        let seriesData =dataList
        let data = {
          seriesData,
        };
        ChartUtils.hollowPieChart(myChart,data);
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
      text-align: center;
    }
    .chart1{
      width:90%;
      height:100%;
    }
  }
</style>
