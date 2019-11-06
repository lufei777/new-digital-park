<template>
  <div class="attendance-detail">
    <!--<div ref="pieCharts"  class="my-chart" id="attendance-detail-chart"></div>-->
    <div class="my-chart">
      <img
        style="width:100%;height:auto;margin-top:70px;display: inline-block"
        src="../../../../static/image/digitalPark/zhiban_tmp.png" alt="">
    </div>
    <div>{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
import CommonFun from "../../../utils/commonFun";
import ChartUtils from "../../../utils/chartUtils";
export default {
  name: "AttendanceDetail",
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
