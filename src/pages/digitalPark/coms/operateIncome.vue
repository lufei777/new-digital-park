<template>
  <div class="operate-income">
    <div class="select-box">
      <el-button size="mini" :style="Bg">年报</el-button>
      <el-button size="mini">月报</el-button>
      <el-select v-model="income" placeholder="请选择" size="mini">
        <el-option
          v-for="item in incomeLabel"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>

    <div ref="myChart" class="my-chart" id="operate-income-chart"></div>
    <div>{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
  import CommonFun from "../../../utils/commonFun";
  import ChartUtils from "../../../utils/chartUtils";
  export default {
    name: "OperateIncome",
    components: {},
    props: ["moduleItem", "routeAddress"],
    data() {
      return {
        income: 1,
        incomeLabel: [
          {
            value: 1,
            label: "收入"
          },
          {
            value: 2,
            label: "支出"
          }
        ]
      };
    },
    methods: {
      getIncomeList() {
        let res = CommonFun.incomeList;
        this.initChart(res);
      },
      initChart(res) {
        let myChart = echarts.init(this.$refs.myChart || document.getElementById('operate-income-chart'));
        let legendData = [];
        let legend = "right";
        let color = ["#418CF0", "#FCB441", "#E0400A", "#056492"];
        let textStyleColor = "#8FD3FA";
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
        let series = dataList;
        let data = {
          legendData,
          series,
          legend,
          color,
          textStyleColor
        };
        // window.onresize = myChart.resize;
        let resizeBox = $("#operate-income-chart").parents(".item-product-coms");
        ChartUtils.handlePieChart(myChart, data, resizeBox);
        myChart.on("click", params => {
          console.log(params);
          console.log("routeAddress", this.routeAddress);
        });

        // let option={
        //    // title:{
        //    //   left:'center',
        //    //   bottom:'-20px'
        //    // }
        // }
        // myChart.setOption(option)
      },
      Bg() {
        return {
          backgroundImage:
            "url(" +
            require("../../../../static/image/digitalPark/module_bg.png") +
            ")"
        };
      }
    },
    mounted() {
      this.getIncomeList();
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .my-chart {
    // height:70%;
    //   margin:0 auto;
  }
  .operate-income {
    .el-button {
      border: none;
      //  background: none;
      background: url("../../../../static/image/digitalPark/tag_bg.png") no-repeat
      center;
      background-size: 100% 100%;
    }
    .select-box{
      width:100%;
      padding:0 10px;
      box-sizing: border-box;
    }
    .el-select{
      width:90px;
      float: right;
    }
  }
</style>
