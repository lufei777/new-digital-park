<template>
  <div class="video-monitoring">
    <div class="module-item-top-name">{{moduleItem.moduleName}}</div>
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
    props: ["moduleItem"],
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
        let myChart = this.$echarts.init(this.$refs.myChart);
        let legendData = [];
        let total=0
        res.map(item => {
          legendData.push(`${item.name}`);
          total+=Number(item.value)
        });
        let titleText=total+"个视频设备"
        let data = {
          // titleText,
          legendData,
          seriesData:res,
          legendUi:{
            ...this.moduleItem.legendUi,
            ...{
              formatter:function(name){
                let obj=res.find((item)=>item.name==name)
                return name+'：'+obj.value
              }
            }
          },
          seriesUi:{
            center:['40%','50%']
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
