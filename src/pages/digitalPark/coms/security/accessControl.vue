<template>
  <div class="access-control">
    <div class="my-chart" ref="myChart"></div>
  </div>
</template>

<script>
  import ChartUtils from '@/utils/chartUtils'
  export default {
    name: 'accessControl',
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
        let res = [{id:1,name:'开启门禁',value:57},
          {id:2,name:'关闭门禁',value:43}]
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
            right:'20',
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
          },
          color:['purple','yellow']
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
