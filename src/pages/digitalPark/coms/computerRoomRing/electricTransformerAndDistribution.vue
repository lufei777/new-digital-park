<template>
  <div class="electric-transformer-and-distribution">
    <div class="module-item-top-name" :class="moduleItem.type==1?'white-color-name':''">{{moduleItem.moduleName}}</div>
    <div class="my-chart" ref="myChart"></div>
  </div>
</template>

<script>
  import ChartUtils from '@/utils/chartUtils'
  import CommonApi from '@/service/api/common'
  export default {
    name: 'electricTransformerAndDistribution',
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
      async getData(){
         let res = await CommonApi.getCountMonitorStatus({
          ids:"1000,1001,1003,1004,1006,1007,1007,1008,1009,1050"
        });
        // let tmp = [{
        //   name:'正常',
        //   value:100
        // },{
        //   name:'报警',
        //   value:30
        // }]
        this.initChart(res)
      },
      initChart(res){
        let myChart = this.$echarts.init(this.$refs.myChart);
        let legendData = res.legend;
        let seriesData = res.values
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
              let obj=res.values.find((item)=>item.name==name)
              return name+':'+obj.value
            }
          },
          seriesUi:{
            center:['35%','50%']
          },
           color: ["#30475B", "#66FBF9", "#0088FF", "#D77443"]
        };
        ChartUtils.hollowPieChart(myChart,data);
      }
    },
    mounted(){
      this.getData()
    }
  }
</script>

<style lang="less">
  .inspection-coms{
    .my-chart{
       margin-top:20px;
      background: @white;
    }
  }
</style>
