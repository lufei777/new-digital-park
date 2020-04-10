<template>
  <div class="ups-monitoring">
    <div class="my-chart" ref="myChart"></div>
    <div>{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
import ChartUtils from "@/utils/chartUtils";
import CommonApi from "@/service/api/common";
export default {
  name: "UPSMonitoring",
  components: {},
  props: ["moduleItem"],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    async getHealthDegreeData() {
      let res = await CommonApi.getCountMonitorStatus({
        ids: 4150
      });
      // let res=[{name:'正常',value:240},
      //          {name:'报警',value:35}]
      this.initChart(res);
    },
    initChart(res) {
      let myChart = this.$echarts.init(this.$refs.myChart);
      let legendData = res.legend;
      let data = {
        legendData,
        seriesData: res.values,
        legendUi: {
          top: "center",
          right: "10",
          textStyle: {
            color: "#8FD3FA"
          },
          formatter: function(name) {
            let obj = res.values.find(item => item.name == name);
            return name + "：" + obj.value;
          }
        },
        seriesUi: {
          center: ["35%", "50%"]
        },
        color: ["#30475B", "#66FBF9", "#0088FF", "#D77443"]
      };
      ChartUtils.hollowPieChart(myChart, data);
    }
  },
  mounted() {
    this.getHealthDegreeData();
  }
};
</script>

<style lang="less">
</style>
