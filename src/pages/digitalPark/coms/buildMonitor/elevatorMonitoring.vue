<template>
  <div class="elevator-monitor-coms">
    <div class="chart-box">
      <div class="chart1" ref="myChart1"></div>
    </div>
    <div>{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
  import CommonApi from '@/service/api/common'
  import ChartUtils from '@/utils/chartUtils'
  export default {
    name: "elevatorMonitoring",
    components: {
    },
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
        this.initChart(res)
      },
      initChart(res){
        let myChart = echarts.init(this.$refs.myChart1);
        let legendData = [`开启直梯：${res[0].data[0].value}`,`开启直梯：${res[0].data[0].value}`];
        let dataList = [];
        res[0].data.map(item => {
          var itemObj = {
            value: Number(item.value.split("")[0]),
            name: item.title
          };
          dataList.push(itemObj);
        });
        let seriesData =dataList
        let titleText = this.moduleItem.moduleName
        let data = {
          legendData,
          seriesData,
          // titleText,
        };
        console.log(data,myChart)
        ChartUtils.hollowPieChart(myChart,data);

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
      width:100%;
      height:95%;
    }
  }
</style>
