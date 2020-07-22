<template>
  <div class="history-statis">
    <MonitorChoose :showDateType="true"
                   :showTwoMonitor="false"
                   :onClickHandleBtnCallback="onClickBtn"
    />
    <div ref="myChart" class="my-chart"></div>
    <el-table :data="tableData" border height="350px">
      <el-table-column prop="time" label="时间" align="right" width="100px"></el-table-column>
      <el-table-column prop="max1" :label="'最大值('+unit+')'" align="right"></el-table-column>
      <el-table-column prop="min1" :label="'最小值('+unit+')'" align="right"></el-table-column>
      <el-table-column prop="avg1" :label="'平均值('+unit+')'" align="right"></el-table-column>
      <el-table-column prop="std1" :label="'均方差('+unit+')'" align="right"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import MonitorChoose from '../commonProject/coms/monitorChoose'
  import CommonApi from '../../service/api/common'
  import ChartUtils from '../../utils/chartUtils'

  export default {
    name: 'DeviceAnalysis',
    components: {
      MonitorChoose,
    },
    data() {
      return {
        tableData: [],
        tableText: ['B-ALE-1-a 照明 (KWH)'],
        myChart: '',
        unit: '',
        searchParams: {
          monitor: {},
        }
      }
    },
    computed: {
      monitor() {
        return this.searchParams.monitor1
      },
    },
    watch: {
      monitor() {
        this.tableText[0] = this.monitor.text
      },
    },
    methods: {
      async getHistoryStatisData() {
        let res = await CommonApi.getHistoryStatisData(this.searchParams)
        this.initChart(res)
        this.initTableData(res)
      },
      onClickBtn(params) {
        this.searchParams = params
        this.getHistoryStatisData()
      },
      initChart(res) {
        let series = [{
          data: res.maxValues,
          type: 'bar',
          name: '最大值'
        }, {
          data: res.minValues,
          type: 'bar',
          name: '最小值'
        }, {
          data: res.avgValues,
          type: 'bar',
          name: '平均值'
        }, {
          data: res.stdValues,
          type: 'bar',
          name: '均方差'
        }]
        let legendData = ['最大值', '最小值', '平均值', '均方差']
        this.myChart = this.$echarts.init(this.$refs.myChart)
        let xAxis = res.xAxis
        this.unit = res.unit1
        let data = {
          titleText: '',
          legendData,
          xAxis,
          series,
          yAxis: res.unit1,
          legendUi: {
            axisPointer: {
              type: 'shadow'
            },
            formatter: function (params) {
              let relVal = params[0].name
              for (let i = 0, l = params.length; i < l; i++) {
                relVal += '<br/>' + params[i].marker + params[i].seriesName + ' : '
                  + params[i].value + '&nbsp;' + res.unit1
              }
              return relVal
            }
          }
        }
        ChartUtils.handleBarChart(this.myChart, data)
      },
      initTableData(res) {
        let tmp = []
        res.xAxis.map((item, index) => {
          tmp.push({
            time: item,
            max1: res.maxValues[index],
            min1: res.minValues[index],
            avg1: res.avgValues[index],
            std1: res.stdValues[index],
          })
        })
        this.tableData = tmp
      }
    },
    created() {
    },
    beforeDestroy() {
    },
    mounted() {
    }
  }
</script>

<style lang="less">
  .history-statis {
    margin-top: 85px;
    padding: 0 20px;

    .chart-box {
      width: 80%;
      margin: 20px auto;
    }

    .my-chart {
      width: 60%;
      height: 350px;
      clear: both;
      float: left;
    }

    .choose-box {
      padding: 20px 0;
      border-bottom: 1px solid #eaeaea;
    }

    .block {
      margin: 0 40px;
    }

    .choose-tip {
      margin-left: 100px;
      width: 80px;
      text-align: right;
    }

    .el-table {
      /*clear: both;*/
      float: right;
      width: 40%;
    }

    .el-table th.gutter {
      width: 16px;
    }
  }
</style>
