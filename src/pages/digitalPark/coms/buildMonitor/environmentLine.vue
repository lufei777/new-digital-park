<template>
  <div class="environment-line-coms">
    <div class="choose-box flex-align-between">
      <div class="tmp-hidden">{{moduleItem.moduleName}}</div>
      <div class="choose-box-inner flex">
        <div v-for="item in typeList" :key="item.id"
             class="item-choose hover-pointer"
             :class="item.id==curType?'active-item':''"
             @click="onClickItem(item)"
        >
          {{item.name}}
        </div>
      </div>
    </div>
    <div class="my-chart" ref="myChart"></div>
  </div>
</template>

<script>
  import ChartUtils from '@/utils/chartUtils'
  import CommonApi from '@/service/api/common'
  import {isZG} from "@/utils/project";

  export default {
    name: "environmentLine",
    components: {},

    props: ["moduleItem"],
    data() {
      return {
        typeList: [],
        curType: isZG() ? 95 : 63
      };
    },
    methods: {
      initChart(res) {
        let myChart = this.$echarts.init(this.$refs.myChart)
        let series = [];
        series.push({
          type: "line",
          data: res.map(item => item.value),
          areaStyle: {}
        });
        let data = {
          legendData: [],
          series,
          xAxis: res.map((item) => item.name),
          xAxisUi:{...this.moduleItem.xAxisUi,...{boundaryGap:false}} || {}
        }
        ChartUtils.handleBarChart(myChart, data)
      },
      async getEnvironmentLine() {
        let res = await CommonApi.getEnvironmentLine({
          code: this.curType
        })
        this.initChart(res)
      },
      onClickItem(item) {
        this.curType = item.id
        this.getEnvironmentLine()
      },
      refreshChart() {
        let time = new Date();
        let mins = time.getMinutes();
        let secs = time.getSeconds();
        //下一次刷新间隔
        let next = ((60 - mins) * 60 - secs) * 1000;
        //设置下次启动时间
        setTimeout(this.refreshChart, next);
        //整点刷新
        if (mins == 0) {
           this.getEnvironmentLine()
        }
      },
      async getMonitorTypeList(){
        let res = await CommonApi.getMonitorTypeList()
        this.typeList = res
        this.curType = res[0].id
      }
    },
    async mounted() {
      await this.getMonitorTypeList()
      this.getEnvironmentLine()
      this.refreshChart()
    }
  };
</script>

<style lang="less">
  .environment-line-coms {
    overflow: hidden;
    .choose-box {
      width: 100%;
    }

    .choose-box-inner {
      flex-shrink: 0;
    }

    .item-choose {
      margin-left: 10px;
      height: 15px;
      line-height: 15px;
      font-weight: bold;
      font-size: 14px;
      padding: 5px 20px;
      border-radius: 5px;
    }

    .active-item {
      background: #008DEA;
      color: @white;
    }
  }
</style>
