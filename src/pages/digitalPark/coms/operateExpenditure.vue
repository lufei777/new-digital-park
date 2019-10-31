<template>
  <div class="operate-expenditure">
    <div ref="myChart" class="my-chart"></div>
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
    initChart(){
      let myChart = echarts.init(this.$refs.myChart);
      let option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2019-8-01','2019-8-08','2019-8-15','2019-8-22','2019-8-30']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230, 210]
          },
          {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330, 310]
          },
          {
            name:'视频广告',
            type:'line',
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330, 410]
          },
          {
            name:'直接访问',
            type:'line',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330, 320]
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
.building-status-proportion {
  .pie-charts {
    height: 95%;
  }
}
</style>
