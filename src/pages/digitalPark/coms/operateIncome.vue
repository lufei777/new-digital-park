<template>
  <div class="operate-income">
    <el-button>年报</el-button>
    <el-button>月报</el-button>
    <el-select v-model="income" placeholder="请选择">
      <el-option v-for="item in incomeLabel" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
    <div ref="myChart" class="my-chart"></div>
    <div>{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
import CommonFun from '../../../utils/commonFun'
import ChartUtils from '../../../utils/chartUtils'
export default {
  name: "OperateIncome",
  components: {},
  props: ["moduleItem"],
  data() {
    return {
        income:1,
        incomeLabel:[{
            value: 1,
            label: "收入"
          },
          {
            value: 2,
            label: "支出"
          }]
    };
  },
  methods: {
     async getIncomeList() {
         let res = await CommonFun.incomeList
         console.log('133',res)
         this.initChart(res)
      },
      initChart(res) {
        let myChart = echarts.init(this.$refs.myChart);
        let legendData = [];
        let legend = 'right';
        let color = ['#418CF0', '#FCB441', '#E0400A', '#056492']
        //FCB441
        let dataList = [];
        res.map(item => {
          legendData.push(item.name);
          var itemObj = {
            value: item.value,
            name: item.name
          };
          dataList.push(itemObj);
        });
        let series =dataList
        let data = {
          legendData,
          series,
          legend,
          color
        };
        window.onresize = myChart.resize;
        ChartUtils.handlePieChart(myChart, data);

        // let option={
        //    // title:{
        //    //   left:'center',
        //    //   bottom:'-20px'
        //    // }
        // }
        // myChart.setOption(option)
      },
  },
  mounted() {
      this.getIncomeList()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.my-chart{
      height:70%;
    //   margin:0 auto;
    }
</style>
