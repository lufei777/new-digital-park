<template>
  <div class="air-conditioner">
    <div class="my-chart" ref="myChart"></div>
    <div>{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
  import ChartUtils from '@/utils/chartUtils'
  import CommonApi from '@/service/api/common'
  export default {
    name: 'airConditioner',
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
     async getAirConditionerData(){
       let res =CommonApi.getHomeInterfaceAlarmById({
         ids:4151
       })
       
       let tmp = [{
          name:'正常',
          value:100
       },{
         name:'报警',
         value:40
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
          color:['gray','blue']
        };
        ChartUtils.hollowPieChart(myChart,data);
      }
    },
    mounted(){
      this.getAirConditionerData()
    }
  }
</script>

<style lang="less">
</style>
