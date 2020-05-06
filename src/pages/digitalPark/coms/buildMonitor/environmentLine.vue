<template>
  <div class="environment-line-coms">
    <div class="choose-box flex-align-between">
      <div class="module-item-top-name">{{moduleItem.moduleName}}</div>
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
  let typeList = [{
    name: '温度',
    id: 62
  }, {
    name: '湿度',
    id: 3
  }, {
    name: '一氧化碳',
    id: 0
  }, {
    name: '二氧化碳',
    id: 1
  }, {
    name: 'PM2.5',
    id: 4
  }]
  import ChartUtils from '@/utils/chartUtils'
  import CommonApi from '@/service/api/common'

  export default {
    name: "environmentLine",
    components: {},
    props: ["moduleItem"],
    data() {
      return {
        typeList: typeList,
        curType: 62
      };
    },
    methods: {
      initChart(res) {
        let myChart = this.$echarts.init(this.$refs.myChart)
        let data = {
          legendData: [],
          series: res.map((item) => item.value),
          xAxis: res.map((item) => item.time)
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
      },
      refreshChart(){
        // var day = new Date();
        // var time = day.format("mm") * 60 + day.format("ss");
      }
    },
    mounted() {
      this.getEnvironmentLine()
      this.refreshChart()
    }
  };
</script>

<style lang="less">
  .environment-line-coms {
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
