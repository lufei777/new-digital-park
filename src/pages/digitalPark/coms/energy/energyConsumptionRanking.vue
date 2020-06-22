<template>
  <div class="building-status-proportion">
    <div class="module-item-top-name"
      >
      {{moduleItem.moduleName}}
    </div>
    <div ref="pieCharts" class="my-chart"></div>
  </div>
</template>

<script>
import CommonFun from "../../../../utils/commonFun";
import ChartUtils from "../../../../utils/chartUtils";
export default {
  name: "EnergyConsumptionRanking",
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
