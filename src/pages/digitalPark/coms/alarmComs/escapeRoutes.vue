<template>
  <div class="escapeRoutes">
    <!--<div ref="pieCharts" class="my-chart" id="task-person-task-chart"></div>-->
    <!--<div class="my-chart">-->
    <img
      style="width:90%;height:85%;"
      src="../../../../../static/image/digitalPark/tslx.jpg" alt="">
  <!--</div>-->
    <div>{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
import CommonFun from "../../../../utils/commonFun";
import ChartUtils from "../../../../utils/chartUtils";
export default {
  name: "EscapeRoutes",
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
