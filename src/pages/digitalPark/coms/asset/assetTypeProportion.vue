<template>
  <div class="asset-type-proportion">
    <div class="module-item-top-name">{{moduleItem.moduleName}}</div>
    <div ref="myChart" class="my-chart" id="asset-type-proportion-chart"></div>
  </div>
</template>

<script>
import CommonFun from "../../../../utils/commonFun";
import ChartUtils from "../../../../utils/chartUtils";
export default {
  name: "AssetTypeProportion",
  components: {},
  props: ["moduleItem"],
  data() {
    return {};
  },
  methods: {
    initChart(){
      let myChart = this.$echarts.init(this.$refs.myChart);
      let option = {
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
          boundaryGap: [0, 0.01],
          axisLabel: {
            textStyle: {
              color: "#4F89B2"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#4F89B2"
            }
          },
          splitLine: {     //网格线
            "show": false
          },
        },
        yAxis: {
          type: 'category',
          data: ['服务器','办公桌','显示屏','主机','椅子'],
          axisLabel: {
            textStyle: {
              color: "#4F89B2"
            }
          },
          axisLine: {
            show: false
          },
          axisTick:{       //y轴刻度线
            "show":false
          },
          splitLine: {     //网格线
            "show": false
          },
          nameTextStyle: {
            color: "#4F89B2"
          }
        },
        series: [
          {
            name: '2019年',
            type: 'bar',
            data: [203, 389, 334, 334, 460]
          },
        ]
      };

      $(window).resize(function () {
        myChart.resize()
      })

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
