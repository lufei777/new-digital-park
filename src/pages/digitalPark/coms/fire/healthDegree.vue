<template>
  <div class="health-degree">
    <div class="module-item-top-name">{{moduleItem.moduleName}}</div>
    <div class="my-chart" ref="myChart"></div>
  </div>
</template>

<script>
import ChartUtils from "@/utils/chartUtils";
import CommonApi from "@/service/api/common";
export default {
  name: "healthDegree",
  components: {},
  props: ["moduleItem"],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    async getHealthDegreeData() {
      //
      let res = await CommonApi.getHomeAssetHealth({
        spaceId: 1,
        kind: 2002
      });
      let resData = [
        { name: "健康", value: res.health },
        { name: "亚健康", value: res.subHealth },
        { name: "不健康", value: res.unHealth }
      ];
      this.initChart(resData);
      // D77443
    },
    initChart(res) {
      let myChart = this.$echarts.init(this.$refs.myChart);
      let legendData = [];
      let color = ["#D77443", "#0088FF", "#66FBF9"];
      res.map(item => {
        legendData.push(`${item.name}`);
      });
      let data = {
        legendData,
        seriesData: res,
        color,
        legendUi: {
          top: "center",
          right: "10",
          textStyle: {
            color: "#8FD3FA"
          },
          formatter: function(name) {
            let obj = res.find(item => item.name == name);
            return name + "：" + obj.value;
          }
        },
        seriesUi: {
          center: ["35%", "50%"]
        }
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
