<template>
  <div class="home-page">
    <div class="tip flex-align">
      <span class="icon"></span>
      <span>能耗总览</span>
    </div>
    <div class="overview-list flex-align-between">
      <div class="overview-item flex-align-between">
        <div class="overview_box">
          <p class="numTitle">
            <span>A3当年总用电量</span>
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
            <span>A3当年总用水量</span>
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
            <span>A3总用能人数</span>
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
            <span>A3人均用电</span>
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
            <span>A3人均用水</span>
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
            <span>A3总面积</span>
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
            <span>A3单位面积用电</span>
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
            <span>A3单位面积用水</span>
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
      <div ref="pieChart1" class="pieChart box"></div>
      <div ref="pieChart2" class="pieChart box"></div>
      <!-- <div class="pieChart box"></div> -->
    </div>

    <div class="tip flex-align">
      <span class="icon"></span>
      <span>能耗排名列表</span>
    </div>
    <div class="tabulation">
      <div class="box_title">2019年A3能耗排名展示(按综合能耗排名)</div>
      <el-table :data="tableData" border @sort-change="sortTable">
        <el-table-column prop="xulie" label="排名" align="right"></el-table-column>
        <el-table-column prop="floor" label="建筑楼层" align="right">
          <template slot-scope="scope">
            <span>{{scope.row.floor?scope.row.floor:'--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="elecAndWaterSum" label="综合耗能" align="right" sortable="custom">
          <template slot-scope="scope">
            <span>{{scope.row.elecAndWaterSum?scope.row.elecAndWaterSum:'--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="elecSum" label="总用电量" align="right" sortable="custom">
          <template slot-scope="scope">
            <span>{{scope.row.elecSum?scope.row.elecSum:'--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="zmElec" label="照明用电" align="right" sortable="custom">
          <template slot-scope="scope">
            <span>{{scope.row.zmElec?scope.row.zmElec:'--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ktElec" label="空调用电" align="right" sortable="custom">
          <template slot-scope="scope">
            <span>{{scope.row.ktElec?scope.row.ktElec:'--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="tsElec" label="特殊用电" align="right" sortable="custom">
          <template slot-scope="scope">
            <span>{{scope.row.tsElec?scope.row.tsElec:'--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="zhElec" label="综合用电" align="right" sortable="custom">
          <template slot-scope="scope">
            <span>{{scope.row.zhElec?scope.row.zhElec:'--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="dlElec" label="动力用电" align="right" sortable="custom">
          <template slot-scope="scope">
            <span>{{scope.row.dlElec?scope.row.dlElec:'--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="waterSum" label="总用水量" align="right" sortable="custom">
          <template slot-scope="scope">
            <span>{{scope.row.waterSum?scope.row.waterSum:'--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="shWater" label="生活用水" align="right" sortable="custom">
          <template slot-scope="scope">
            <span>{{scope.row.shWater?scope.row.shWater:'--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="wsWater" label="生活污水" align="right" sortable="custom">
          <template slot-scope="scope">
            <span>{{scope.row.wsWater?scope.row.wsWater:'--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ktWater" label="空调用水" align="right" sortable="custom">
          <template slot-scope="scope">
            <span>{{scope.row.ktWater?scope.row.ktWater:'--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="xfWater" label="消防用水" align="right" sortable="custom">
          <template slot-scope="scope">
            <span>{{scope.row.xfWater?scope.row.xfWater:'--'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="qtWater" label="其他用水" align="right" sortable="custom">
          <template slot-scope="scope">
            <span>{{scope.row.qtWater?scope.row.qtWater:'--'}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- :page-sizes="[100, 200, 300, 400]" -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import EnergyApi from "../../service/api/energyApi";
import CommonApi from "../../service/api/commonApi";
import ChartUtils from "../../utils/chartUtils";
export default {
  name: "HomePage",
  components: {},
  data() {
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
      tableData: [],
      currentPage: 1, //当前页
      total: 0,
      size: "",
      rankType: "elecAndWaterSum",
      rank: "asc"
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
      let res = await EnergyApi.getEneryRanking({
        redioType: 0,
        startTime: 2019,
        selectType: 1,
        page: this.currentPage,
        rankType: this.rankType,
        size: 10,
        rank: this.rank
      });
      if (res && res.total) {
        this.total = res.total;
        this.tableData = res.value;
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
      let tqzh = {
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
      };
      let dqzh = {
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
      };
      let tbzz = {
        name: "综合能耗同比增长率",
        type: "line",
        data: resData.map(item => item.tbzz),
        itemStyle: {
          normal: {
            color: "#FF9900", //圈圈的颜色
            label: {
              show: false,
              position: "top"
            }
          }
        }
      };
      let hbzz = {
        name: "综合能耗环比增长率",
        type: "line",
        data: resData.map(item => item.hbzz),
        itemStyle: {
          normal: {
            color: "#5AD15B", //圈圈的颜色
            label: {
              show: false,
              position: "top",
              formatter: "{c} %"
            }
          }
        }
      };
      let series = [tqzh, dqzh, tbzz, hbzz];
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999"
            }
          }
        },
        legend: {
          data: ["2018", "2019", "综合能耗同比增长率", "综合能耗环比增长率"]
        },
        xAxis: [
          {
            type: "category",
            data: xAxis,
            axisPointer: {
              type: "shadow"
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: res.unit,
          }
        ],
        series
      };
      window.onresize = myChart.resize;
      myChart.setOption(option, true);
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
      let series = {
        name: "当年分项用电占比",
        data: dataList
      };
      let data = {
        legendData,
        series
      };
      window.onresize = myPieChart.resize;
      ChartUtils.PieChart(myPieChart, data);
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      // this.rankingList(val)
      // this.size = val
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
  margin-top: 50px;
  padding: 0 20px;
  background: rgb(242, 242, 242);
  overflow: hidden;
  .tip {
    margin: 20px 0;
    .icon {
      width: 4px;
      height: 16px;
      background: #4d7cfeff;
      border-radius: 2px;
      margin-right: 10px;
    }
    span {
      font-size: 16px;
      color: #4d7cfeff;
    }
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
    background: #fff;
    box-sizing: border-box;
    margin-bottom: 15px;
    .pieChart {
      width: 49.5%;
      height: 100%;
      // background: transparent;
      border-radius: 6px;
      box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.1);
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
    .box_title {
      font-size: 16px;
      color: #666666;
      margin-bottom: 15px;
    }
    .el-pagination {
      float: right;
      margin-top: 15px;
    }
  }
}
</style>
