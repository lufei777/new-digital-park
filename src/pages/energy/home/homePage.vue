<template>
  <div class="home-page">
    <div class="tip frist-tip flex-align">
      <span class="icon"></span>
      <span>能耗总览</span>
    </div>
    <div class="overview-list flex-align-between">
      <div class="overview-item flex-align-between">
        <div class="overview_box">
          <p class="numTitle">
            <span>当年总用电量</span>
          </p>
          <p class="num">
            <span>{{energyOverview.elecSum}}</span>
            <i>kwh</i>
          </p>
        </div>
      </div>

      <div class="overview-item flex-align-between">
        <div class="overview_box">
          <p class="numTitle">
            <span>当年总用水量</span>
          </p>
          <p class="num">
            <span>{{energyOverview.waterSum}}</span>
            <i>m³</i>
          </p>
        </div>
      </div>
      <div class="overview-item flex-align-between">
        <div class="overview_box">
          <p class="numTitle">
            <span>总用能人数</span>
          </p>
          <p class="num">
            <span>{{energyOverview.person}}</span>
            <i>人</i>
          </p>
        </div>
      </div>
      <div class="overview-item flex-align-between">
        <div class="overview_box">
          <p class="numTitle">
            <span>人均用电</span>
          </p>
          <p class="num">
            <span>{{energyOverview.elecAvgPerson}}</span>
            <i>kwh/人</i>
          </p>
        </div>
      </div>
      <div class="overview-item flex-align-between">
        <div class="overview_box">
          <p class="numTitle">
            <span>人均用水</span>
          </p>
          <p class="num">
            <span>{{energyOverview.waterAvgPerson}}</span>
            <i>m³/人</i>
          </p>
        </div>
      </div>
      <div class="overview-item flex-align-between">
        <div class="overview_box">
          <p class="numTitle">
            <span>总面积</span>
          </p>
          <p class="num">
            <span>{{energyOverview.area}}</span>
            <i>㎡</i>
          </p>
        </div>
      </div>
      <div class="overview-item flex-align-between">
        <div class="overview_box">
          <p class="numTitle">
            <span>单位面积用电</span>
          </p>
          <p class="num">
            <span>{{energyOverview.elecArea}}</span>
            <i>kwh/㎡</i>
          </p>
        </div>
      </div>
      <div class="overview-item flex-align-between">
        <div class="overview_box">
          <p class="numTitle">
            <span>单位面积用水</span>
          </p>
          <p class="num">
            <span>{{energyOverview.waterArea}}</span>
            <i>m³/㎡</i>
          </p>
        </div>
      </div>
    </div>
    <!-- 能耗同比环比图 -->
    <div class="tip flex-align">
      <span class="icon"></span>
      <span>能耗同比环比图</span>
    </div>
    <div class="ratio-Figure">
      <div class="barLineChartTitle flex-align-between">
        <p>2019与2018年度同比及2019环比柱状折线图分析</p>
        <div class="energy-class">
          <span>能源类型：</span>
          <el-select v-model="dateType" placeholder="请选择" @change="DateTypeChange">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div class="barLineChart">
        <div ref="myChart" class="my-chart"></div>
      </div>
    </div>
    <!-- 能耗分类分项占比图 -->
    <div class="tip flex-align">
      <span class="icon"></span>
      <span>能耗分类分项占比图</span>
    </div>

    <div class="pieCharts flex-align-between">
      <div class="pieChart box">
        <div ref="pieChart1" class="chart-inner"></div>
      </div>
      <div class="pieChart box">
        <div ref="pieChart2" class="chart-inner"></div>
      </div>
      <!-- <div class="pieChart box"></div> -->
    </div>

    <div class="tip flex-align">
      <span class="icon"></span>
      <span>能耗排名列表</span>
    </div>
    <div class="tabulation">
      <div class="tabulation-title">2019年A3能耗排名展示(按综合能耗排名)</div>
      <Table :ref="homePageTableConfig.ref" :tableConfig="homePageTableConfig"></Table>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import EnergyApi from "../../../service/api/energyApi";
import CommonApi from "../../../service/api/commonApi";
import ChartUtils from "../../../utils/chartUtils";
import Table from "../../../components/Table/index";
export default {
  name: "HomePage",
  components: {
    Table
  },
  data() {
    let _this = this;
    return {
      energyOverview: {},
      currentTime: new Date().getFullYear() + "-" + "01",
      BeforeTime: new Date().getFullYear() + "-" + "12",
      options: [
        {
          value: 34,
          label: "电"
        },
        {
          value: 37,
          label: "水"
        },
        {
          value: 38,
          label: "热"
        }
      ],
      dateType: "电",
      catalog: 34,
      currentPage: 1, //当前页
      rankType: "elecAndWaterSum",
      rank: "asc",
      homePageTableConfig: {
        ref:"homePageTable",
        data:[],
        columnConfig:[],
         uiConfig: {
          height: "auto", //"", //高度
          pagination: {
            //是否分页，分页是否自定义
            layout: "total,->, prev, pager, next, jumper",
            pageSizes: [10, 20, 50],
            handler(pageSize, currentPage, table) {
               _this.handleCurrentChange(currentPage)
            }
          }
        },
        tableMethods: {
          sortChange: _this.sortTable
        }
      }
    };
  },
  methods: {
    async getEnergyOverView() {
      this.energyOverview = await EnergyApi.getEnergyOverView({
        redioType: 0,
        startTime: 2019,
        selectType: 1
      });
      this.piechart1(this.energyOverview);
      this.piechart2(this.energyOverview);
    },
    async getEnergyEcharts() {
      let res = await CommonApi.getTbhbChart({
        redioType: 1,
        catalog: this.catalog,
        selectType: 2,
        startTime: this.currentTime,
        lastTime: this.BeforeTime,
        floorId: 1
      });
      this.createCharts(res);
    },
    async rankingList() {
      let labelList = [{ label: "排名", prop: "xulie", sortable: false },
        { label: "建筑楼层", prop: "floor", sortable: false },
        { label: "综合耗能", prop: "elecAndWaterSum", sortable: "custom" },
        { label: "总用电量", prop: "elecSum", sortable: "custom" },
        { label: "照明用电", prop: "zmElec", sortable: "custom" },
        { label: "空调用电", prop: "zmElec", sortable: "custom" },
        { label: "特殊用电", prop: "tsElec", sortable: "custom" },
        { label: "其他用电", prop: "tsElec", sortable: "custom" },
        { label: "动力用电", prop: "dlElec", sortable: "custom" },
        { label: "总用水量", prop: "waterSum", sortable: "custom" },
        { label: "生活用水", prop: "shWater", sortable: "custom" },
        { label: "生活污水", prop: "wsWater", sortable: "custom" },
        { label: "空调用水", prop: "ktWater", sortable: "custom" },
        { label: "消防用水", prop: "xfWater", sortable: "custom" },
        { label: "其他用水", prop: "qtWater", sortable: "custom" }];
      this.homePageTableConfig.columnConfig = labelList;
      let res = await EnergyApi.getEnergyRanking({
        redioType: 0,
        startTime: 2019,
        selectType: 1,
        page: this.currentPage,
        rankType: this.rankType,
        size: 10,
        rank: this.rank
      });
      if (res && res.total) {
        this.homePageTableConfig.data = res.value;
        this.homePageTableConfig.uiConfig.pagination.total = res.total;
      }
    },
    DateTypeChange(value) {
      this.catalog = value;
      this.getEnergyEcharts();
    },
    createCharts(res) {
      let resData = res.value;
      let myChart = echarts.init(this.$refs.myChart);
      let xAxis = resData.map(item => item.date);
      let legendData=['2018', '2019', '综合能耗同比增长率', '综合能耗环比增长率']
      let series= [
        {
          name: "2018",
          type: "bar",
          data: resData.map(item => item.tqzh),
          itemStyle: {
            normal: {
              color: "rgb(136,108,255)", //圈圈的颜色
              label: {
                show: true,
                position: "top"
              }
            }
          }
        },
        {
          name: "2019",
          type: "bar",
          data: resData.map(item => item.dqzh),
          itemStyle: {
            normal: {
              color: "rgb(77,124,254)", //圈圈的颜色
              label: {
                show: true,
                position: "top"
              }
            }
          }
        },
        {
          name: "综合能耗同比增长率",
          type: "line",
          data: resData.map(item => item.tbzz),
          yAxisIndex: 1,
          itemStyle: {
            normal: {
              color: "#FF9900", //圈圈的颜色
              label: {
                show: false,
                position: "top"
              }
            }
          }
        },
        {
          name: '综合能耗环比增长率',
          type: 'line',
          yAxisIndex: 1,
          data: resData.map(item => item.hbzz),
          itemStyle: {
            normal: {
              color: '#5AD15B', //圈圈的颜色
              // lineStyle:{
              //     color:'#FF9900'  //线的颜色
              // }
              label: {
                show: true,
                position: "top",
                formatter: "{c} %"
              }
            }
          }
        }
      ];
      let data = {
        legendData,
        xAxis,
        series,
        showSecondY:true
      }
      let option={
        yAxis: [{
          type: 'value',
          name: '能耗(kwh)',
          axisLabel: {
              formatter: "{value} kwh"
            }
          },
          {
            show: true,
            type: "value",
            name: "增长率",
            min: -100,
            max: 100,
            axisLabel: {
              formatter: "{value} %"
            }
          }
        ]
      };

      ChartUtils.handleBarChart(myChart, data);
      myChart.setOption(option);
    },
    piechart1(res) {
      let myPieChart = echarts.init(this.$refs.pieChart1);
      let legendData = [];
      let dataList = [];
      res.elecList.map(item => {
        legendData.push(item.name);
        var itemObj = {
          value: item.value,
          name: item.name
        };
        dataList.push(itemObj);
      });
      let seriesData = dataList;
      let titleText = "当年分项用电占比";
      let data = {
        legendData,
        seriesData,
        titleText
      };
      window.onresize = myPieChart.resize;
      ChartUtils.hollowPieChart(myPieChart, data);
    },
    piechart2(res){
      let myPieChart = echarts.init(this.$refs.pieChart2);
      let legendData = ["生活用水", "消防用水", "空调用水", "其他用水"];
      let dataList = [
        {
          name: "生活用水",
          value: 1989555
        },
        { name: "消防用水", value: 1172323 },
        {
          name: "空调用水",
          value: 100242
        },
        {
          name: "其他用水",
          value: 353431
        }
      ];
      // res.elecList.map(item => {
      //   var itemObj = {
      //     value: item.value,
      //     name: item.name
      //   };
      //   dataList.push(itemObj);
      // });
      let seriesData = dataList;
      let titleText = "当年分项用水占比";
      let data = {
        legendData,
        seriesData,
        titleText,
      };
      window.onresize = myPieChart.resize;
      ChartUtils.hollowPieChart(myPieChart, data);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.rankingList();
    },
    sortTable(column) {
      this.rankType = column.prop;
      this.rank = column.order == "ascending" ? "asc" : "desc";
      this.rankingList();
    }
  },
  mounted() {
    this.getEnergyOverView();
    this.getEnergyEcharts();
    this.rankingList();
  }
};
</script>

<style lang="less">
.home-page {
  // margin-top: 50px;
  padding: 0 20px;
  background: rgb(242, 242, 242);
  overflow: hidden;
  .tip {
    margin: 20px 0;
    .icon {
      width: 4px;
      height: 16px;
      background: @mainBgColor;
      border-radius: 2px;
      margin-right: 10px;
    }
    span {
      font-size: 16px;
      color: @mainBgColor;
    }
  }
  .frist-tip {
    margin-top: 0px!important;
  }
  .overview-list {
    flex-wrap: wrap;
  }
  .overview-item {
    width: 24%;
    height: 150px;
    border-radius: 6px;
    color: @white;
    margin-bottom: 20px;
    .overview_box {
      margin-left: 20px;
      .numTitle span {
        font-size: 20px;
      }
      .num span {
        font-size: 40px;
      }
      .num i {
        font-style: normal;
        font-size: 24px;
        margin-left: 10px;
      }
    }
  }
  .overview-item:nth-child(1),
  .overview-item:nth-child(6) {
    background: linear-gradient(
      120deg,
      rgba(234, 111, 233, 1),
      rgba(141, 100, 248, 1)
    );
    box-shadow: 0px 4px 12px 0px rgba(141, 100, 248, 0.5) !important;
  }
  .overview-item:nth-child(2),
  .overview-item:nth-child(5) {
    background: linear-gradient(
      120deg,
      rgba(95, 176, 255, 1),
      rgba(106, 136, 254, 1)
    );
    box-shadow: 0px 4px 12px 0px rgba(106, 138, 254, 0.5) !important;
  }
  .overview-item:nth-child(3),
  .overview-item:nth-child(8) {
    background: linear-gradient(
      120deg,
      rgba(255, 133, 96, 1),
      rgba(255, 113, 152, 1)
    );
    box-shadow: 0px 4px 12px 0px rgba(255, 113, 152, 0.5) !important;
  }
  .overview-item:nth-child(4),
  .overview-item:nth-child(7) {
    background: linear-gradient(
      120deg,
      rgba(57, 206, 192, 1),
      rgba(19, 159, 209, 1)
    );
    box-shadow: 0px 4px 12px 0px rgba(19, 159, 209, 0.5) !important;
  }
  // 同比环比图
  .ratio-Figure {
    box-sizing: border-box;
    background: #fff;
    border-radius: 6px;
    box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
    margin-bottom: 15px;
    .barLineChartTitle {
      height: 80px;
      padding: 0 20px;
    }
    .my-chart {
      // background: @white;
      // overflow: hidden;
      // width: 100%;
      height: 450px;
      // padding:20px 5px 5px 5px;
    }
  }
  // 水电饼图
  .pieCharts {
    width: 100%;
    height: 435px;
    /*background: #fff;*/
    box-sizing: border-box;
    margin-bottom: 15px;
    .pieChart {
      width: 49%;
      height: 100%;
      // background: transparent;
      border-radius: 6px;
      box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
      /*padding:10px;*/
      box-sizing: border-box;
      background-color: @white;
    }
  }
  // 能耗排名
  .tabulation {
    background: #fff;
    border-radius: 6px;
    box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
    margin-bottom: 15px;
    padding: 15px;
    overflow: hidden;
    .tabulation-title {
      height: 30px;
      line-height: 20px;
      color: #333;
      font-size: 16px;
    }
    .box_title {
      font-size: 16px;
      color: #666666;
      margin-bottom: 15px;
    }
  }
  .chart-inner {
    height: 100%;
  }
}
</style>
