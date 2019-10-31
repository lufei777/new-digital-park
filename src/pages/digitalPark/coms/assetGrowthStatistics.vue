<template>
  <div class="asset-growth-statistics">
    <div ref="myChart" class="my-chart"></div>
    <div>{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
import CommonFun from "../../../utils/commonFun";
import ChartUtils from "../../../utils/chartUtils";
export default {
  name: "AssetGrowthStatistics",
  components: {},
  props: ["moduleItem"],
  data() {
    return {};
  },
  methods: {
    initChart(){
      let myChart = echarts.init(this.$refs.myChart);
      let option = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          areaStyle: {}
        }]
      };

      myChart.setOption(option)
    }
  },
  mounted() {
    this.initChart()
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
