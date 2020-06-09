<template>
  <div class="co2-monitoring-coms">
    <div class="module-item-top-name flex-align">
      <i class="module-item-top-icon"></i>
      <span>{{moduleItem.moduleName}}</span>
    </div>
    <div class="my-chart" ref="myChart"></div>
  </div>
</template>

<script>
  import ChartUtils from '@/utils/chartUtils'
  import CommonApi from '@/service/api/common'
  export default {
    name: 'CO2Monitoring',
    components: {},
    props: ['moduleItem'],
    data() {
      return {

      }
    },
    computed: {},
    watch: {},
    methods: {
      async initChart() {
       await CommonApi.getCO2Monitoring({
          code:42
        })
        let myChart = this.$echarts.init(this.$refs.myChart);
        let res = [ {name:'第一季度',value:1000},
                    {name:'第二季度',value:700},
                    {name:'第三季度',value:1200},
                    {name:'第四季度',value:900}]
        let legendData = res.map((item)=>item.name)
        let data={
          legendData:[],
          series:{
            type:'bar',
            data:res,
            barWidth:30
          },
          xAxis:legendData,
          xAxisUi:this.moduleItem.xAxisUi,
          yAxisUi:this.moduleItem.yAxisUi,
        }
        ChartUtils.handleBarChart(myChart,data)
        let option ={
          yAxis:{
            splitLine: {
              lineStyle: {
                color: '#435E61',
                opacity: 0.7,
                width:0.5
              }
            },
          }
        }
        myChart.setOption(option)
      },
    },
    mounted() {
      this.initChart()
    }
}
</script>

<style lang="less">
</style>
