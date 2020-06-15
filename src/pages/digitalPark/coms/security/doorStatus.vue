<template>
  <div class="door-status-coms">
    <div class="module-item-top-name"
         :class="moduleItem.type==1?'white-color-name':''"
    >
      {{moduleItem.moduleName}}
    </div>
    <div class="my-chart" ref="myChart"></div>
  </div>
</template>

<script>
  import CommonApi from '@/service/api/common'
  import ChartUtils from '@/utils/chartUtils'
  export default {
    name: 'doorStatus',
    components: {
    },
    props: ["moduleItem",'fromFlag'],   //fromFlag:1门禁 2门磁
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
        let res = await CommonApi.getHomeInterfaceMonitor({
          homeId:this.fromFlag==1?7:11
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
            name: this.moduleItem.moduleName,
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
        console.log(data)
        ChartUtils.handleBarChart(myChart,data)
      }
    },
    mounted(){
      this.getData()
    }
  }
</script>

<style lang="less">
  .door-status-coms{
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
  }
</style>
