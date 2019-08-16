<template>
  <div class="device-analysis">
    <div class="tip flex-align">
      <span class="icon"></span>
      <span>传感器设备状态</span>
    </div>
    <div class="chart-box"><div ref="myChart" class="my-chart"></div></div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import CommonApi from '../../../service/api/commonApi'
  export default {
    name: 'DeviceAnalysis',
    components: {
    },
    data () {
      return {
        deviceData:{},
        myChart:''
      }
    },
    methods: {
      async getMonitorState(){
        let res = await CommonApi.getMonitorState()
        let	option = {
          title: {
            text: '传感器状态统计',
            x:'center',
            textStyle:{
              color:'#333',
              fontWeight:'600',
              fontSize:18
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)",
            textStyle:{fontSize:12}
          },
          color:['dimGrey', 'green', 'orange', 'red'],
          legend: {
            orient: 'vertical',
            x: 'left',
            data:['不可用','正常','警告','错误']
          },
          series: [
            {
              type:'pie',
              radius: ['50%', '65%'],
              avoidLabelOverlap: false,
              label:false,
              name:'监控器状态',
              data:res.values
            }
          ]
        };
        this.myChart = echarts.init(this.$refs.myChart);
        window.onresize = this.myChart.resize;
        this.myChart.setOption(option,true)
      }
    },
    mounted(){
      this.getMonitorState()
    }
  }
</script>

<style lang="less">
  .device-analysis{
    margin-top: 85px;
    padding:0 20px;
    .tip{
      height: 66px;
      border-bottom: 1px solid #eaeaea;
      .icon {
        width: 2px;
        height: 24px;
        background: #01465c;
        border-radius: 2px;
        margin-right: 10px;
      }
      span{
        font-size: 24px;
        color:#01465c;
      }
    }
    .chart-box{
      width:80%;
      margin:20px auto;
    }
    .my-chart{
      height:500px;
    }
  }
</style>
