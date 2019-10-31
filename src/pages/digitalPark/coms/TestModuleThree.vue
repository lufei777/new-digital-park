<template>
  <div class="test-module-one">
    <div ref="myChart"  class="my-chart" id="attendance-detail-chart"></div>
    <div>{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
import CommonFun from "../../../utils/commonFun";
import ChartUtils from "../../../utils/chartUtils";
import EnergyApi from "../../../service/api/energyApi";
export default {
  name: "TestModuleOne.vue",
  components: {},
  props: ["moduleItem"],
  data() {
    return {};
  },
  methods: {
    async getElecProportion() {
      let params = {
        redioType:0,
        selectType:1,
        startTime:'2019',
      }
      let res = await EnergyApi.getEnergyOverView(params)
      this.initChart(res)
    },
    initChart(res) {
      let myChart = echarts.init(this.$refs.myChart);
      let legendData = [];
      let dataList = [];
      res.elecList.map(item => {
        legendData.push(item.name);
        var itemObj = {
          value: item.value,
          name: item.name
        };
        dataList.push(itemObj);
      });
      let seriesData =dataList
      let titleText = this.moduleItem.moduleName
      let data = {
        legendData,
        seriesData,
        // titleText,
      };
      // window.onresize = myChart.resize;
      // console.log(myChart)
      // let resizeBox=$("#attendance-detail-chart").parents('.item-product-coms')
      ChartUtils.hollowPieChart(myChart,data);

      let option={
        legend:{
          textStyle:{
            color:'#8FD3FA'
          }
        }
      }
      myChart.setOption(option)
      // $(window).resize(function(){
      //   console.log('lalalal')
      //   myChart.resize()
      // })

    },

  },
  mounted(){
    this.getElecProportion()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.building-status-proportion {
  .pie-charts {
    height: 95%;
  }
}
</style>
