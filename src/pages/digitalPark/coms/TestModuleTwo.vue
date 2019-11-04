<template>
  <div class="test-module-two">
    <div ref="myChart"  class="my-chart" id="test-module-two-chart"></div>
    <div>{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
import CommonFun from "../../../utils/commonFun";
import ChartUtils from "../../../utils/chartUtils";
export default {
  name: "TestModuleTwo",
  components: {},
  props: ["moduleItem"],
  data() {
    return {};
  },
  methods: {
    initChart(){
      //this.$refs.myChart ||
      let myChart = echarts.init(this.$refs.myChart || document.getElementById('test-module-two-chart'));
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
