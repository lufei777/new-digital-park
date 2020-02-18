<template>
  <div class="electric-transformer-and-distribution">
    <div class="my-chart" ref="myChart"></div>
    <div>{{moduleItem.moduleName}}</div>
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
        let res = await CommonApi.getHomeInterfaceAlarmByModule({
         modules:3
        })
        let tmp = [{
          name:'正常',
          value:100
        },{
          name:'报警',
          value:30
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
          color:['rgba(255,255,255,0.2)','#8FD3FA']
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
