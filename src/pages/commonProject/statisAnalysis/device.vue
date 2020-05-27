<template>
  <div class="device-analysis panel-container">
    <div class="device-chart-box">
      <div class="chart-box radius-shadow circle-chart" style="margin-right:1%">
        <div ref="myChart" class="my-chart"></div>
      </div>
      <el-dialog :visible.sync="showDialog" width="30%">
        <el-button type="primary" @click="onClickExportBtn">导出报表</el-button>
        <div class="table-box">
          <el-table :data="tableData" border>
            <el-table-column prop="monitorId" label="编号" align="right"></el-table-column>
            <el-table-column prop="name" label="类型" align="right"></el-table-column>
          </el-table>
        </div>
      </el-dialog>
      <div class="chart-box radius-shadow">
        <div class="my-chart" ref="myColumnEcharts"></div>
      </div>
    </div>
    <div class="device-table-box panel">
      <el-table :data="deviceTableData" border>
        <el-table-column prop="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="状态"></el-table-column>
        <el-table-column prop="value" label="个数"></el-table-column>
        <el-table-column prop="ratio" label="占比"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import CommonApi from "api/common";
import ChartUtils from "utils/chartUtils";
import commonFun from 'utils/commonFun';
export default {
  name: "DeviceAnalysis",
  components: {},
  data() {
    return {
      deviceData: {},
      myChart: "",
      tableData: [],
      showDialog: false,
      chartIndex: 0,
      deviceTableData: []
    };
  },
  methods: {
    async getMonitorState() {
      let res = await CommonApi.getMonitorState();
      this.createColumnEcharts(res);
      this.createPieEcharts(res);

      let tmp = [];
      let sum = 0;
      res.values.map((item, index) => {
        sum += item.value;
        tmp.push({
          index: index + 1,
          name: item.name,
          value: item.value
        });
      });
      this.deviceTableData = tmp;
      this.deviceTableData.map((item, index) => {
        item.ratio = Number((item.value / sum) * 100).toFixed(2) + "%";
      });
    },
    createPieEcharts(res) {
      this.myChart = this.$echarts.init(this.$refs.myChart);
      let titleText = "传感器状态统计";
      let legendData = res.legend;
      let seriesData = res.values;
      let seriesName = "监控器状态";
      let option = {
        color:["#25e4a3", "dimGrey", "#dab54c", "#de8536",'#ed5450'],
        toolbox: {
          show: true,
          showTitle:false,
          feature: Object.assign({}, commonFun.chartsToolBox('assetStateTip').feature),
          tooltip: commonFun.chartsToolBox('assetStateTip').tooltip
        }
      };
      console.log("createPieEcharts -> option", option)
      let data = {
        titleText,
        legendData,
        seriesData,
        seriesName,
        legendUi: {
          bottom: "30",
          right: "30",
          formatter: function(name) {
              let obj = seriesData.find(item => item.name == name);
              return name + "：" + obj.value;
            }
        },
        seriesUi: {
          center: ["47%", "50%"],
          // radius: "50%",
          label: {
            emphasis: {
              show: false
            }
          }
        },
        titleUi: {
            left: "4%",
            textStyle: {
              fontSize: 18,
              fontWeight: 600
            }
          }
      };
      ChartUtils.hollowPieChart(this.myChart, data);
      this.myChart.setOption(option);
      let that = this;
      this.myChart.on("click", function (val) {
        that.chartIndex = val.dataIndex;
        that.getTableData(val.dataIndex);
      });
    },
    createColumnEcharts(data) {
      let myColumnEcharts = this.$echarts.init(this.$refs.myColumnEcharts);
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          },
          formatter: function (params) {
              var relVal = params[0].name
              for (var i = 0, l = params.length; i < l; i++) {
                  relVal += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value +  '&nbsp;' + "个"
              }
              return relVal
          }
        },
        xAxis: [
          {
            type: "category",
            data: data.legend
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} 个"
            }
          }
        ],
        series: [
          {
            name: "传感器状态",
            type: "bar",
            data: data.values,
            itemStyle: {
              normal: {
                color: function (params) {
                  var colorList = ["#25e4a3", "dimGrey", "#dab54c", "#de8536",'#ed5450'];
                  return colorList[params.dataIndex];
                }
              }
            }
          }
        ]
      };
      window.onresize = myColumnEcharts.resize;
      myColumnEcharts.setOption(option);
    },
    async getTableData(index) {
      let res = await CommonApi.getDeviceTableData({
        filter: "state",
        index
      });
      let tmp = [];
      res.monitorIds.map((item, index) => {
        tmp.push({
          monitorId: item,
          name: res.captions[index]
        });
      });
      this.tableData = tmp;
      this.showDialog = true;
    },
    onClickExportBtn() {
      let url = `/vibe-web/statistics/getMonitorDetailsExport?filter=state&index=${this.chartIndex}`;
      location.href = url;
    }
  },
  mounted() {
    this.getMonitorState();
  }
};
</script>

<style lang="less">
.device-analysis {
  // background: @white;
  .chart-box {
    background: @white;
    width: 49.5%;
    height: 450px;
    // margin:0 auto;
    // overflow: hidden;
    float: left;
  }
  .my-chart {
    height: 450px;
  }
  .device-table-box {
    padding: 20px;
    margin-top: 20px;
  }

  .el-dialog__body {
    height: 500px;
    overflow: hidden;
  }
  .el-button {
    float: right;
    margin: 10px;
  }
  .table-box {
    overflow: auto;
    height: 450px;
    clear: both;
  }
  .circle-chart{
    padding:20px;
    box-sizing: border-box;
  }
}
</style>
