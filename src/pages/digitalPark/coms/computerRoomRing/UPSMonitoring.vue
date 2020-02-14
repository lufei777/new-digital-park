<template>
  <div class="ups-monitoring">
    <div class="my-chart" ref="myChart"></div>
    <div>{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
  import ChartUtils from '@/utils/chartUtils'
  import CommonApi from '@/service/api/common'
  export default {
    name: 'UPSMonitoring',
    components: {
    },
    props:['moduleItem'],
    data () {
      return {
      }
    },
    computed:{
    },
    watch:{
    },
    methods: {
      getHealthDegreeData(){
        let res=[{name:'健康',value:45},
                 {name:'亚健康',value:35},
                 {name:'不健康',value:15}]
        this.initChart(res)
      },
      initChart(res){
        let myChart = echarts.init(this.$refs.myChart);
        let legendData = [];
        res.map(item => {
          legendData.push(`${item.name}`);
        });
        let data = {
          legendData,
          seriesData:res,
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
      this.getHealthDegreeData()
    }
  }
</script>

<style lang="less">
</style>
