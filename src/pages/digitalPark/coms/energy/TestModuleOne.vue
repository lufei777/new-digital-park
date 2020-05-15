<template>
  <div class="test-module-one">
    <div ref="myChart"  class="my-chart" id="test-module-one-chart"></div>
    <div>{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
import CommonFun from "../../../../utils/commonFun";
import ChartUtils from "../../../../utils/chartUtils";
export default {
  name: "TestModuleOne",
  components: {},
  props: ["moduleItem"],
  data() {
    return {};
  },
  methods: {
    async getDeviceStatusList() {
      let res = await CommonFun.deviceStatusList;
    },
  },
  mounted() {
    this.getDeviceStatusList()
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
