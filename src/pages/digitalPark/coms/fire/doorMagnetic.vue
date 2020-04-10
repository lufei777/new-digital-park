<template>
  <div class="door-magnetic-coms">
    <div class="module-item-top-name">{{moduleItem.moduleName}}</div>
    <div class="my-chart" ref="myChart"></div>
  </div>
</template>

<script>
  import ChartUtils from '@/utils/chartUtils'
  import CommonApi from '@/service/api/common'
  export default {
    name: '',
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
      async getAccessData(){
        let res = await CommonApi.getHomeInterfaceMonitor({
          homeId:11
        })
        this.initChart(res)
      },
      initChart(res){
        let myChart = this.$echarts.init(this.$refs.myChart);
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
          },
          color:['#83D587','red','yellow']
        };
        ChartUtils.hollowPieChart(myChart,data);
      }
    },
    mounted(){
      this.getAccessData()
    }
  }
</script>

<style lang="less">
</style>
