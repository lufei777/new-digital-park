<template>
  <div class="saleStatistics">
    <!--<div ref="pieCharts" class="my-chart" id="task-person-task-chart"></div>-->
    <div class="my-chart">
    <img
      style="width:100%;height:auto;"
      src="../../../../../static/image/digitalPark/xstj.png" alt="">
  </div>
    <div>{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
import CommonFun from "../../../../utils/commonFun";
import ChartUtils from "../../../../utils/chartUtils";
export default {
  name: "SaleStatistics",
  components: {},
  props: ["moduleItem"],
  data() {
    return {};
  },
  methods: {
  },
  mounted() {
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
