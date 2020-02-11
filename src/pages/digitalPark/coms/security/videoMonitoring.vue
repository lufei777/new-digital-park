<template>
  <div class="video-monitoring">
    <div class="my-chart" ref="myChart"></div>
  </div>
</template>

<script>
  import ChartUtils from '@/utils/chartUtils'
  import CommonApi from '@/service/api/common'
  export default {
    name: 'videoMonitoring',
    components: {
    },
    data () {
      return {
      }
    },
    computed:{
    },
    watch:{
    },
    methods: {
      async getVideoData(){
        let res = await CommonApi.getHomeInterfaceMonitor({
          homeId:6
        })
        let tmp=[]
        for(let key in res){
          tmp.push({
            name:key,
            value:res[key]
          })
        }
        this.initChart(tmp)
      },
      initChart(res){
        let myChart = echarts.init(this.$refs.myChart);
        let legendData = [];
        let dataList = res;
        res.map(item => {
          legendData.push(`${item.name}`);
        });
        let seriesData =dataList
        let data = {
          legendData,
          seriesData,
          legendUi:{
            top:'center',
            right:'10',
            textStyle:{
              color:'#8FD3FA'
            },
            formatter:function(name){
              let obj=res.find((item)=>item.name==name)
              return name+'：'+obj.value
            }
          },
          seriesUi:{
            center:['35%','50%']
          }
        };
        ChartUtils.hollowPieChart(myChart,data);
      }
    },
    mounted(){
      this.getVideoData()
    }
  }
</script>

<style lang="less">
</style>
