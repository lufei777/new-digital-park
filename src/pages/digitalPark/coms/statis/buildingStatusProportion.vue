<template>
  <div class="building-status-proportion">
    <div class="module-item-top-name">{{moduleItem.moduleName}}</div>
    <div ref="myChart" class="my-chart" id="building-status-proportion-chart"></div>
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
      let myPieChart = this.$echarts.init(
        this.$refs.myChart ||
          document.getElementById("building-status-proportion-chart")
      );
      let legendData = res.legend;
      let color = ["#25e4a3", "dimGrey", "#dab54c", "#de8536",'#ed5450'];
      let textStyleColor = "#8FD3FA";
      let seriesData = res.values;
      let data = {
        legendData,
        seriesData,
        color,
        textStyleColor,
        legendUi: {
          ...this.moduleItem.legendUi,
          // ...{
          //   formatter: function(name) {
          //     let obj = seriesData.find(item => item.name == name);
          //     return name + "：" + obj.value;
          //   }
          // }
        },
        seriesUi: {
          // center:['50%','50%']
        }
      };
      ChartUtils.hollowPieChart(myPieChart, data);
    }
  },
  mounted() {
    this.getDeviceStatusList();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.building-status-proportion {
}
</style>
