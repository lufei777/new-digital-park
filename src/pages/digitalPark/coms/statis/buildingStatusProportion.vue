<template>
  <div class="building-status-proportion">
    <div ref="myChart" class="my-chart" id="building-status-proportion-chart"></div>
    <div>{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
import ChartUtils from "../../../../utils/chartUtils";
import Common from "../../../../service/api/common";
export default {
  name: "BuildingStatusProportion",
  components: {},
  props: ["moduleItem"],
  data() {
    return {};
  },
  methods: {
    async getDeviceStatusList() {
      let res = await Common.getMonitorState();
      this.createPieCharts(res);
    },
    createPieCharts(res) {
      let myPieChart = echarts.init(this.$refs.myChart || document.getElementById('building-status-proportion-chart'));
      let legendData = res.legend;
      let legend = "right";
      let color = ["#30475B", "#66FBF9", "#0088FF", "#D77443"];
      let textStyleColor = '#8FD3FA'
      let seriesData = res.values;
      let data = {
        legendData,
        seriesData,
        legend,
        color,
        textStyleColor,
        legendUi:{
            top:'center',
            right:'30',
            textStyle:{
              color:'#8FD3FA'
            },
          },
          seriesUi:{
            center:['35%','50%']
          }
      };
      // $(window).resize(function(){
      //   myPieChart.resize()
      // }) ;
      let resizeBox=$("#energy-electricity-proportion-chart").parents('.item-product-coms')
      ChartUtils.hollowPieChart(myPieChart, data);
    }
  },
  mounted() {
      this.getDeviceStatusList()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.building-status-proportion {
  
}
</style>
