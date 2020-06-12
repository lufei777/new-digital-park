<template>
  <div class="video-monitoring-status-coms">
    <div class="module-item-top-name" :class="moduleItem.type==1?'white-color-name':''">{{moduleItem.moduleName}}</div>
    <div class="my-chart" ref="myChart"></div>
  </div>
</template>

<script>
  import CommonApi from '@/service/api/common'
  import ChartUtils from '@/utils/chartUtils'
  export default {
    name: "videoMonitoringStatus",
    props: ["moduleItem"],
    data() {
      return {

      };
    },
    methods: {
      async getVideoMonitoringStatus(){
        let res = await CommonApi.getVideoMonitoringStatus({
          codeName:'摄像头'
        })
        this.initChart1(res)
      },
      initChart1(res){
        let dataList =[{
          value:res['摄像头'].normal,
          name:'正常'
        },{
          value:res['摄像头'].error,
          name:'错误'
        },{
          value:res['摄像头'].unknown,
          name:'未知'
        },{
          value:res['摄像头'].warning,
          name:'警告'
        }]
        // let myChart = this.$echarts.init(this.$refs.myChart1);
        // let legendData = ['正常','错误','未知','警告'];
        // let seriesData =dataList
        // let legendUi={
        //   bottom:20,
        //   right:20,
        //   textStyle:{
        //     color:'#8FD3FA',
        //     fontSize:this.moduleItem.largeScreen?this.moduleItem.fontSize:14
        //   }
        // }
        // let data = {
        //   legendData,
        //   seriesData,
        //   legendUi
        // };
        // ChartUtils.hollowPieChart(myChart,data);
        let myChart = this.$echarts.init(this.$refs.myChart);
        let legendData = ['正常','错误','未知','警告'];
        let data = {
          legendData,
          series:[{
            name: "摄像头状态",
            type: "bar",
            data: dataList,
            itemStyle: {
              normal: {
                color: function (params) {
                  let colorList = ["green", "dimGrey", "orange","red"];
                  return colorList[params.dataIndex];
                }
              }
            }
          }],
          yAxisData:legendData,
          xAxisUi:{...this.moduleItem.xAxisUi,...{type:'value'}},
          yAxisUi:{...this.moduleItem.yAxisUi,...{type:'category'}}
        };
        ChartUtils.handleBarChart(myChart,data)
      },
    },
    mounted() {
      this.getVideoMonitoringStatus()
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
