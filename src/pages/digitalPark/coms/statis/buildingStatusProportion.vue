<template>
  <div class="building-status-proportion">
    <div ref="myChart" class="my-chart" id="building-status-proportion-chart"></div>
    <div>{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
import CommonFun from "../../../../utils/commonFun";
import ChartUtils from "../../../../utils/chartUtils";
export default {
  name: "BuildingStatusProportion",
  components: {},
  props: ["moduleItem"],
  data() {
    return {};
  },
  methods: {
     getDeviceStatusList() {
      let res =  CommonFun.deviceStatusList;
      this.createPieCharts(res);
    },
    createPieCharts(res) {
      let myPieChart = echarts.init(this.$refs.myChart || document.getElementById('building-status-proportion-chart'));
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
      ChartUtils.handlePieChart(myPieChart, data);
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
  
}
</style>
