<template>
  <div class="asset-type-proportion">
    <div ref="myChart" class="my-chart" id="asset-type-proportion-chart"></div>
    <div>{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
import CommonFun from "../../../utils/commonFun";
import ChartUtils from "../../../utils/chartUtils";
export default {
  name: "AssetTypeProportion",
  components: {},
  props: ["moduleItem"],
  data() {
    return {};
  },
  methods: {
    initChart(){
      let myChart = echarts.init(this.$refs.myChart || document.getElementById('asset-type-proportion-chart'));
      let option = {
        title: {
          text: '世界人口总量',
          subtext: '数据来自网络'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['2011年', '2012年']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: [0, 0.01]
        },
        yAxis: {
          type: 'category',
          data: ['服务器','办公桌','显示屏','主机','椅子']
        },
        series: [
          {
            name: '2019年',
            type: 'bar',
            data: [203, 389, 334, 334, 460]
          },
        ]
      };

      myChart.setOption(option)
    }
  },
  mounted() {
    this.initChart()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.asset-type-proportion {
}
</style>
