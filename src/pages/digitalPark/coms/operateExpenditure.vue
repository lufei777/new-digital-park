<template>
  <div class="operate-expenditure">
    <div ref="pieCharts" class="my-chart"></div>
    <div>{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
import CommonFun from "../../../utils/commonFun";
import ChartUtils from "../../../utils/chartUtils";
export default {
  name: "OperateExpenditure",
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
