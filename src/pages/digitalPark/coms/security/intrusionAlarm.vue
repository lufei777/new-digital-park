<template>
  <div class="intrusion-alarm">
    <div class="tmp-hidden">{{moduleItem.moduleName}}</div>
    <div class="my-chart" ref="myChart"></div>
  </div>
</template>

<script>
  import ChartUtils from '@/utils/chartUtils'
  import CommonApi from '@/service/api/common'
  export default {
    name: 'intrusionAlarm',
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
     async getInstrusionData(){
       let res = await CommonApi.getHomeInterfaceMonitor({
         homeId:8
       })
       
       let tmp = [{
          name:'报警点数',
          value:res.alarm
       },{
         name:'未报警点数',
         value:res.normal
       }]
        this.initChart(tmp)
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
          color:['red','gray']
        };
        ChartUtils.hollowPieChart(myChart,data);
      }
    },
    mounted(){
      this.getInstrusionData()
    }
  }
</script>

<style lang="less">
</style>
