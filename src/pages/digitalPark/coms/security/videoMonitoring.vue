<template>
  <div class="video-monitoring">
    <div class="my-chart" ref="myChart"></div>
  </div>
</template>

<script>
  import ChartUtils from '@/utils/chartUtils'
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
      getVideoData(){
        let res = [{id:1,name:'硬盘录像机',value:100},
                   {id:2,name:'摄像机',value:20},
                   {id:3,name:'矩阵',value:1}]
        this.initChart(res)
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
              return name+':'+obj.value
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
