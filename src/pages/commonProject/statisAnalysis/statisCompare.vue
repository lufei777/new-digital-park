<template>
  <div class="statis-compare">
    <MonitorChoose :showDateType="true"
                   :showTwoMonitor="true"
                   :onClickHandleBtnCallback="onClickBtn"
    />
    <div style="clear:both"></div>
    <div ref="myChart1" class="my-chart"></div>
    <div ref="myChart2" class="my-chart"></div>
    <div ref="myChart3" class="my-chart"></div>
    <div ref="myChart4" class="my-chart"></div>
    <el-table :data="tableData" border height="350px">
      <el-table-column prop="time" label="时间" align="right" width="100px"></el-table-column>
      <el-table-column prop="max1" :label="tableText[0]+'最大值('+unit1+')'" align="right"></el-table-column>
      <el-table-column prop="max2" :label="tableText[1]+'最大值('+unit2+')'" align="right"></el-table-column>
      <el-table-column prop="min1" :label="tableText[0]+'最小值('+unit1+')'" align="right"></el-table-column>
      <el-table-column prop="min2" :label="tableText[1]+'最小值('+unit2+')'" align="right"></el-table-column>
      <el-table-column prop="avg1" :label="tableText[0]+'平均值('+unit1+')'" align="right"></el-table-column>
      <el-table-column prop="avg2" :label="tableText[1]+'平均值('+unit2+')'" align="right"></el-table-column>
      <el-table-column prop="std1" :label="tableText[0]+'均方差('+unit1+')'" align="right"></el-table-column>
      <el-table-column prop="std2" :label="tableText[1]+'均方差('+unit2+')'" align="right"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import MonitorChoose from '../coms/monitorChoose'
  import CommonApi from '../../../service/api/common'
  import ChartUtils from '../../../utils/chartUtils'

  export default {
    name: 'StatisCompare',
    components: {
      MonitorChoose,
    },
    data() {
      return {
        tableData: [],
        tableText: ['B-ALE-1-a 照明', 'B-AL-1-aFM 电热风幕和热风幕电机'],
        myChart1: '',
        myChart2: '',
        myChart3: '',
        myChart4: '',
        unit1: '',
        unit2: '',
        searchParams:{
          monitor1:{},
          monitor2:{}
        }
      }
    },
    computed: {
      monitor1(){
        return this.searchParams.monitor1
      },
      monitor2() {
        return this.searchParams.monitor2
      }
    },
    watch: {
      monitor1() {
        this.tableText[0] = this.monitor1.text
      },
      monitor2() {
        this.tableText[1] = this.monitor2.text
      },
    },
    methods: {
      async getStatisCompareData() {
        let res = await CommonApi.getStatisCompareData(this.searchParams)
        this.initChart(res)
        this.initTableData(res)
      },
      initChart(res) {
        let seriesList =
          [
            [{data: res.maxValues_1,
             type: 'bar',
              name: this.monitor1.text + '最大值'
             },{
              data: res.maxValues_2,
              type: 'bar',
              name: this.monitor2.text + '最大值',
              yAxisIndex: 1,
             }],
            [{data: res.minValues_1,
              type: 'bar',
              name: this.monitor1.text + '最小值'
            },{
              data: res.minValues_2,
              type: 'bar',
              name: this.monitor2.text + '最小值',
              yAxisIndex: 1,
            }],
            [{data: res.avgValues_1,
              type: 'bar', name:
                this.monitor1.text + '平均值'
             },{
              data: res.avgValues_2,
              type: 'bar',
              name: this.monitor2.text + '平均值',
              yAxisIndex: 1,
            }],
            [{data: res.stdValues_1,
              type: 'bar',
              name: this.monitor1.text + '均方差'
             },{
              data: res.stdValues_2,
              type: 'bar',
              name: this.monitor2.text + '均方差',
              yAxisIndex: 1,
            }]
          ]
        let legendList = [[this.monitor1.text + '最大值', this.monitor2.text + '最大值'],
          [this.monitor1.text + '最小值', this.monitor2.text + '最小值'],
          [this.monitor1.text + '平均值', this.monitor2.text + '平均值'],
          [this.monitor1.text + '均方差', this.monitor2.text + '均方差'],
        ]
        this.unit1 = res.unit1 || ''
        this.unit2 = res.unit2 || ''
        for (let i = 1; i <= 4; i++) {
          this['myChart' + i] = this.$echarts.init(this.$refs['myChart' + i])
          let xAxis = res.xAxis
          let data = {
            titleText: '',
            legendData: legendList[i - 1],
            xAxis,
            series: seriesList[i - 1],
            showSecondY:true,
            yAxis: [{
              name:res.unit1
            },{
              name:res.unit2
            }],
            legendUi: {
              axisPointer: {
                type: 'shadow'
              },
              formatter: function (params) {
                var relVal = params[0].name
                for (var i = 0, l = params.length; i < l; i++) {
                  relVal += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value + '&nbsp;' + res.unit1
                }
                return relVal
              }
            }
          }
          ChartUtils.handleBarChart(this['myChart' + i], data)
        }
      },
      initTableData(res) {
        let tmp = []
        res.xAxis.map((item, index) => {
          tmp.push({
            time: item,
            max1: res.maxValues_1[index],
            max2: res.maxValues_2[index],
            min1: res.minValues_1[index],
            min2: res.minValues_2[index],
            avg1: res.avgValues_1[index],
            avg2: res.avgValues_2[index],
            std1: res.stdValues_1[index],
            std2: res.stdValues_2[index]
          })
        })
        this.tableData = tmp
      },
      onClickBtn(params){
        this.searchParams = params
        this.getStatisCompareData()
      },
    },
    created() {
    },
    mounted() {
    },
    beforeDestroy() {
    }
  }
</script>

<style lang="less">
  .statis-compare {
    .chart-box {
      width: 80%;
      margin: 20px auto;
    }

    .my-chart {
      width: 50%;
      height: 300px;
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

    .el-table th.gutter {
      width: 16px;
    }

    .el-select .el-input {
      width: 80px;
    }

    .el-table th div {
      padding-left: 0;
    }
  }
</style>
