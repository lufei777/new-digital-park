<template>
  <div class="operate-income">
    <div class="module-item-top-name" >{{moduleItem.moduleName}}</div>
    <!--<div class="select-box flex">-->
      <!--<div  class="change-date hover-pointer" :style="Bg" @click.stop="onClick1">年报</div>-->
      <!--<div class="change-date hover-pointer">月报</div>-->
      <!--<el-select v-model="income" placeholder="请选择" size="mini">-->
        <!--<el-option-->
          <!--v-for="item in incomeLabel"-->
          <!--:key="item.value"-->
          <!--:label="item.label"-->
          <!--:value="item.value"-->
        <!--&gt;</el-option>-->
      <!--</el-select>-->
    <!--</div>-->

    <div ref="myChart" class="my-chart" id="operate-income-chart"></div>
  </div>
</template>

<script>
  import CommonFun from "../../../../utils/commonFun";
  import ChartUtils from "../../../../utils/chartUtils";
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
        let myChart = this.$echarts.init(this.$refs.myChart || document.getElementById('operate-income-chart'));
        let legendData = [];
        let color = ["#418CF0", "#FCB441", "#E0400A", "#056492"];
        let dataList = [];
        res.map(item => {
          legendData.push(item.name);
          var itemObj = {
            value: item.value,
            name: item.name
          };
          dataList.push(itemObj);
        });
        let data = {
          legendData,
          seriesData:dataList,
          color,
          seriesUi:{
            radius:'50%'
          },
          legendUi:{
            textStyle:{
              color:'#8FD3FA'
            }
          }
        };
        let resizeBox = $("#operate-income-chart").parents(".item-product-coms");
        ChartUtils.hollowPieChart(myChart, data, resizeBox);
      },
      Bg() {
        return {
          backgroundImage:
            "url(" +
            require("../../../../../static/image/digitalPark/module_bg.png") +
            ")"
        };
      },
      onClick1(){
        console.log("13mofmawgwepk")
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
    .change-date {
      border: none;
      //  background: none;
      background: url("../../../../../static/image/digitalPark/tag_bg.png") no-repeat center;
      background-size: 100% 100%;
      color:#FFFEFE;
      padding:5px 20px;
      margin-right: 20px;
    }
    .select-box{
      width:100%;
      padding:0 10px;
      box-sizing: border-box;
      margin-top: 10px;
    }
    .el-select{
      width:90px;
      float: right;
    }
  }
</style>
