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
      this.createPieCharts(res);
    },
    createPieCharts(res) {
      //this.$refs.pieCharts
      let myPieChart = this.$echarts.init(this.$refs.myChart || document.getElementById('test-module-one-chart'));
      let legendData = [];
      let legend = "right";
      let color = ["#F7B87F", "#B6A2DE", "#56C7C9", "#5AB1EF"];
      let textStyleColor = '#8FD3FA'
      //FCB441
      let dataList = [];
      res.map(item => {
        legendData.push(item.name);
        var itemObj = {
          value: item.value,
          name: item.name
        };
        dataList.push(itemObj);
      });
      let series = dataList;
      let data = {
        legendData,
        series,
        legend,
        color,
        textStyleColor
      };
      // $(window).resize(function(){
      //   myPieChart.resize()
      // }) ;
      let resizeBox=$("#energy-electricity-proportion-chart").parents('.item-product-coms')
      ChartUtils.handlePieChart(myPieChart, data,resizeBox);
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
  .pie-charts {
    height: 95%;
  }
}
</style>
