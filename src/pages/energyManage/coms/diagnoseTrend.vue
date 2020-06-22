<template>
  <div class="diagnose-trend">
    <el-dialog
      :title="title"
      :visible.sync="showDialog"
      width="50%"
    >
      <div>
        <div class="flex-row-reverse">
          <div class="flex-align-center  time-box">
            <el-button @click="onClickPreBtn">上一日</el-button>
            <el-date-picker
              v-model="date"
              type="date"
              placeholder="选择日期"
              class="choose-date"
              value-format="yyyy-MM-dd"
              :clearable="false"
            >
            </el-date-picker>
            <el-button @click="onClickNextBtn">下一日</el-button>
          </div>
          <el-select v-model="chartType" @change="onChartTypeChange">
            <el-option value="1" label="曲线图"></el-option>

            <el-option value="2" label="柱状图"></el-option>
          </el-select>
        </div>
        <div class="chart-box" ref="myChart"></div>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  import {isZG} from '@/utils/project';
  import EnergyApi from '@/service/api/energy'
  import ChartUtils from '@/utils/chartUtils'

  export default {
    name: "diagnoseTrend",
    components: {},
    props: ["showModal", "trendDate", 'searchParams'],
    data() {
      return {
        chartType: '1',
        date: "",
        trendData:[]
      }
    },
    computed: {
      showDialog: {
        get() {
          return this.showModal
        },
        set() {
          this.onClickCancelBtn()
        }
      },
      title() {
        return `${this.searchParams.spaceName}${this.searchParams.dateType == 1 ? '全天' : '夜间'}`+
          `${this.searchParams.energyName}浪费诊断趋势图`
      }
    },
    watch: {
      // trendDate() {
      //   this.date = this.trendDate
      // },
      date() {
        console.log('date',this.date)
        this.getTrendData()
      },
      searchParams(){
        this.date = this.searchParams.date
        this.getTrendData()
      }
    },
    methods: {
      onClickCancelBtn() {
        this.date = this.searchParams.date
        this.$parent.showTrendModal = false
      },
      onClickPreBtn() {
        this.date = moment(this.date).subtract(1, 'days').format('YYYY-MM-DD')
      },
      onClickNextBtn() {
        this.date = moment(this.date).subtract(-1, 'days').format('YYYY-MM-DD')
      },
      async getTrendData() {
        let params = {...this.searchParams, ...{dateTime: this.date}}
        // console.log('parm', params)
        let res = await EnergyApi.getTrendAnalysisData(params)
        this.trendData = res
        this.initChart()
      },
      initChart() {
        let res = this.trendData
        let myChart = this.$echarts.init(this.$refs.myChart)
        res.map((item) => {
          item.type = this.chartType==1?'line':'bar'
          item.name = item.date
          item.value.map((val) => {
            val.value = val.amountValue
            val.name = val.moment
          })
          item.data=item.value
        })
        let xAxis = res[0].value.map((item)=>item.moment)
        let yAxis = res[0].value[0] && res[0].value[0].unit
        let data = {
          series: res,
          xAxis,
          yAxis
        }
        // console.log(data)
        ChartUtils.handleBarChart(myChart, data)
      },
      onChartTypeChange(val){
        this.chartType=val
        this.initChart()
      }
    },
    async created() {
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .diagnose-trend {
    .time-box {
      margin-left: 40px;
    }

    .choose-date {
      margin: 0 10px;
    }

    .chart-box {
      width: 90%;
      margin:40px auto 0 auto;
      height: 400px;
    }
  }
</style>
