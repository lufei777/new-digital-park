<template>
  <div class="door-magnetic-coms">
    <div class="module-item-top-name" :class="moduleItem.type==1?'white-color-name':''">{{moduleItem.moduleName}}</div>
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
        res.map(item => {
          legendData.push(`${item.name}`);
        });
        let data = {
          legendData,
          series:[{
            name: "门磁状态",
            type: "bar",
            data: res,
            itemStyle: {
              normal: {
                color: function (params) {
                  let colorList = ["green", "dimGrey", "orange"];
                  return colorList[params.dataIndex];
                }
              }
            }
          }],
          xAxis:legendData,
          xAxisUi:this.moduleItem.xAxisUi || {},
          yAxisUi:this.moduleItem.yAxisUi || {}
        };
        ChartUtils.handleBarChart(myChart,data)
      }
    },
    mounted(){
      this.getAccessData()
    }
  }
</script>

<style lang="less">
</style>
