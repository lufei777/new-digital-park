<template>
  <div class="access-control">
    <div class="module-item-top-name">{{moduleItem.moduleName}}</div>
    <div class="my-chart" ref="myChart"></div>
  </div>
</template>

<script>
  import ChartUtils from '@/utils/chartUtils'
  import CommonApi from '@/service/api/common'
  export default {
    name: 'accessControl',
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
          homeId:7
        })
        let tmp=[{
          name:'开启门禁',
          value:res.open
        },{
          name:'关闭门禁',
          value:res.close
        },{
          name:'未连接',
          value:res.unconnected
        }]
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
