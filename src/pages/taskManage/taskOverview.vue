<template>
  <div class="task-overview panel-container">
    <div class="common-tree-box radius-shadow">
      <Tree :tree-list="taskTypeData" :tree-config="taskTreeConfig"></Tree>
    </div>
    <div class="right-content panel-container">
      <div class="tip frist-tip flex-align">
        <span class="icon"></span>
        <span>工单数量统计</span>
      </div>
      <div class="task-sum-box radius-shadow flex-align-between">
        <div class="task-sum flex-align-center">
          <p>全部工单</p>
          <span>{{allTask}}</span>
        </div>
        <div class="task-sum flex-align-center">
          <p>已完成工单</p>
          <span>{{completeTask}}</span>
        </div>
        <div class="task-sum flex-align-center">
          <p>未完成工单</p>
          <span>{{unfinishTask}}</span>
        </div>
        <div class="task-sum flex-align-center">
          <p>超时工单</p>
          <span>{{overtimeTask}}</span>
        </div>
        <div class="task-sum flex-align-center">
          <p>现场工单</p>
          <span>{{sceneTask}}</span>
        </div>
        <div class="task-sum flex-align-center">
          <p>补录工单</p>
          <span>{{supplementTask}}</span>
        </div>
      </div>
      <!-- 工单数量同比环比分析 -->
      <div>
        <div class="tip frist-tip flex-align">
          <span class="icon"></span>
          <span>工单数量同比环比分析</span>
        </div>
        <div class="task-group task-MoM-analysis flex-align-between radius-shadow">
          <div class="analysis-pie-charts-box">
            <div class="dept-task-header flex-align-between">
              <div>{{taskStartTime}}年与{{taskEndTime}}年工单数量环比柱状图分析</div>
              <div class="dept-class">
                <el-date-picker
                  v-model="taskStartTime"
                  type="date"
                  placeholder="选择日期"
                  size="small"
                  @change="handleStartTimeChange"
                ></el-date-picker>
                <span class="tag-style">至</span>
                <el-date-picker
                  v-model="taskEndTime"
                  type="date"
                  placeholder="选择日期"
                  size="small"
                  @change="handleEndTimeChange"
                ></el-date-picker>
              </div>
            </div>
            <div class="pie-charts analysis-pie-charts" ref="MoManalysisCharts"></div>
          </div>
          <div class="charts-box">
            <div class="pie-charts statistics-pie-charts" ref="typeStatisticsCharts"></div>
          </div>
        </div>
      </div>
      <!-- 部门工单统计 -->
      <div>
        <div class="tip frist-tip flex-align">
          <span class="icon"></span>
          <span>部门工单统计</span>
        </div>
        <div class="task-group radius-shadow flex-align-between">
          <div class="department-task-box">
            <div class="dept-task-header flex-align-between">
              <div>2020年部门工单统计</div>
              <div class="dept-class">
                <span>部门</span>
                <el-select
                  v-model="deptValue"
                  placeholder="请选择"
                  size="small"
                  @change="deptTypeChange"
                >
                  <el-option
                    v-for="item in deptList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </div>
            </div>
            <div class="analysis-pie-charts" ref="taskStatisticsCharts"></div>
          </div>
          <div class="task-rank-content">
            <div class="task-rank-title">2020年部门工单数量排名</div>
            <div class="task-rank">
              <div class v-for="(item,index) in taskNumRankData" :key="index">
                <div class="progress-div">
                  <el-progress
                    v-if="item.taskNum"
                    :percentage="item.taskNum>100?100:item.taskNum"
                    :show-text="false"
                  ></el-progress>
                  <span style="margin-left:5px">{{item.taskNum}}个</span>
                </div>
                <div class="percentage-text">
                  <span>{{item.deptName}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 工单状态统计 -->
      <div>
        <div class="tip frist-tip flex-align">
          <span class="icon"></span>
          <span>工单状态统计</span>
        </div>
        <div class="task-status-statistic radius-shadow">
          <div ref="myChart1" class="my-chart"></div>
          <div ref="myChart2" class="my-chart"></div>
          <div ref="myChart3" class="my-chart"></div>
          <div ref="myChart4" class="my-chart"></div>
        </div>
      </div>
      <!-- 工单排名 -->
      <div>
        <div class="tip frist-tip flex-align">
          <span class="icon"></span>
          <span>当日现场工单</span>
        </div>
        <div class="task-overview-table officeLocation-table panel">
          <div class="flex-align-between table-tip-box">
            <div class="table-tip">当日现场工单</div>
          </div>
          <z-table :ref="officeLocationTable.ref" :options="officeLocationTable">
          </z-table>
        </div>
      </div>
      <!-- 工单排名 -->
      <div>
        <div class="tip frist-tip flex-align">
          <span class="icon"></span>
          <span>工单排名</span>
        </div>
        <div class="task-overview-table panel">
          <div class="flex-align-between table-tip-box">
            <div class="table-tip">工单排名</div>
            <el-button type="primary" @click="onClickExportBtn">导出表格</el-button>
          </div>
          <z-table :ref="tableData.ref" :options="tableData">
          </z-table>
        </div>
      </div>
      <!-- <CommonSelect /> -->
      <!-- <div class="task-overview-table panel"></div> -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Tree from "../../components/tree/index";
import CommonSelect from "../taskManage/coms/commonSelect";
import TaskManageApi from "../../service/api/taskManage";
import SystemManage from "../../service/api/systemManage";
import ChartUtils from "@/utils/chartUtils";
import { taskType } from "@/utils/dictionary";
export default {
  name: "TaskOverview",
  components: {
    Tree,
    CommonSelect
  },
  data() {
    let _this = this;
    return {
      currentPage: 1,
      taskTreeConfig: {
        nodeKey: "value",
        treeProps: {
          label: "label",
          children: "nodes"
        },
        showSearch: true,
        // onClickTreeNodeCallBack: this.onClickTreeNodeCallBack,
        defaultExpandedkeys: []
      },
      tableData: {
        ref: "tableData",
        // operation: {
        //   width: 150
        // },
        data: [],
        columnConfig: [],
        uiConfig: {
          height: "auto", //"", //高度
          selection: false, //是否多选
          searchable: false,
          showIndex: true,
          pagination: false
        }
        // btnConfig: {}
      },
      officeLocationTable: {
        ref: "officeLocationTable",
        // operation: {
        //   width: 150
        // },
        data: [],
        columnConfig: [],
        uiConfig: {
          height: "auto", //"", //高度
          selection: false, //是否多选
          searchable: false,
          showIndex: true,
          pagination: {
            //是否分页，分页是否自定义
            layout: "total,->, prev, pager, next, jumper",
            pageSizes: [10, 20, 50],
            handler(pageSize, currentPage, table) {
              _this.handleCurrentChange(currentPage);
            }
          }
        }
        // btnConfig: {}
      },
      todayFinish: "",
      allTask: "0",
      completeTask: "0",
      overtimeTask: "0",
      sceneTask: "0",
      supplementTask: "0",
      unfinishTask: "0",
      deptValue: "",
      deptList: [],
      deptSelectName: "",
      taskTypeData: [],
      taskNumRankData: [],
      taskStartTime: moment()
        .startOf("year")
        .format("YYYY-MM-DD"),
      taskEndTime: moment().format("YYYY-MM-DD")
    };
  },
  computed: {
    ...mapState({
      menuIsCollapse: state => state.digitalPark.menuIsCollapse
    })
  },
  created() {
    this.taskTypeData = taskType.taskData;
  },
  methods: {
    onClickTreeNodeCallBack() {},
    async taskList() {
      let labelList = [
        { label: "姓名", prop: "username" },
        { label: "部门", prop: "departmentName" },
        { label: "完成率", prop: "completeRate" },
        { label: "总计", prop: "allTaskNum" },
        { label: "已完成", prop: "completeNum" },
        { label: "未完成", prop: "unFinishedTaskNum" },
        { label: "超时", prop: "overtimeTaskNum" },
        { label: "补录", prop: "supplementTaskNum" },
        { label: "现场", prop: "locationTaskNum" }
      ];
      this.tableData.columnConfig = labelList;
      let res = await TaskManageApi.getPersonalTaskRanking();
      if (res) {
        this.tableData.data = res;
      }
    },
    async officeLocationList() {
      let labelList = [
        { label: "工单编号", prop: "taskNumber" },
        { label: "工单名称", prop: "taskName" },
        { label: "工单类型", prop: "type" },
        { label: "工单描述", prop: "description" },
        { label: "创建时间", prop: "beginTime" },
        { label: "预计结束时间", prop: "endTime" },
        { label: "优先级", prop: "urgent" },
        { label: "状态", prop: "taskStatus" },
        { label: "创建人", prop: "founderName" },
        { label: "处理人", prop: "username" },
        { label: "地点", prop: "officeLocation" },
        { label: "补录", prop: "isSupplementText" },
        { label: "设备点位", prop: "caption" }
      ];
      this.officeLocationTable.columnConfig = labelList;
      let res = await TaskManageApi.taskList({
        pageNum: this.currentPage,
        pageSize: 10,
        type: 1,
        ugrent: 1,
        status: 0,
        // beginTime: "2020-06",
        beginTime: moment().format("YYYY-MM-DD"),
        taskType: 2
      });
      if (res && res.list) {
        res.list.map((item, ind) => {
          switch (item.status) {
            case "1":
              item.taskStatus = "待派";
              break;
            case "2":
              item.taskStatus = "已派";
              break;
            case "3":
              item.taskStatus = "处理中";
              break;
            case "4":
              item.taskStatus = "已完成";
              break;
            default:
              item.taskStatus = "";
              break;
          }
          item.urgent =
            item.urgent == "1"
              ? "正常"
              : item.urgent == "2"
              ? "重要"
              : item.urgent == "3"
              ? "紧急"
              : "";

          item.officeLocation =
            item.officeLocation == 0
              ? "公司"
              : item.officeLocation == 1
              ? "现场"
              : "";

          item.isSupplementText =
            item.isSupplement == "1"
              ? "正常"
              : item.isSupplement == "0"
              ? "补录"
              : "正常";
        });

        this.officeLocationTable.data = res.list;
        this.officeLocationTable.uiConfig.pagination.total = res.total;
      } else {
        this.officeLocationTable.data = [];
        this.officeLocationTable.uiConfig.pagination.total = res.total;
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.officeLocationList();
    },
    editRow(val) {
      this.$router.push({
        name: "NewTask",
        query: {
          extraOptions: {
            disabled: true
          },
          id: val.scopeRow.row.id,
          allTaskStatus: "000"
        }
      });
    },
    async homeTaskCount() {
      let res = await TaskManageApi.getTaskNumber();
      if (res) {
        this.completeTask = res.completeTask;
        this.sceneTask = res.sceneTask;
        this.supplementTask = res.supplementTask;
        this.allTask = res.allTask;
        this.overtimeTask = res.overtimeTask;
        this.unfinishTask = res.unfinishTask;
      }
    },
    async getTaskTypeStatistics() {
      let myPieChart = this.$echarts.init(this.$refs.typeStatisticsCharts);
      let res = await TaskManageApi.getTaskTypeStatistics();
      let legendData = res.legend;
      let color = ["#4DA1FF", "#83D587", "#FFCE33", "#FF7B8C"];
      let titleText = "工单类型统计";
      let seriesData = [];
      res.values && res.values.map(item => {
        var itemObj = {
          value: item.taskNum,
          name: item.name
        };
        seriesData.push(itemObj);
      });
      let data = {
        legendData,
        seriesData,
        titleText,
        color,
        legendUi: {
          bottom: "30",
          right: "30",
          formatter: function(name) {
            let obj = seriesData.find(item => item.name == name);
            return name + "：" + obj.value;
          }
        },
        seriesUi: {
          center: ["50%", "50%"],
          radius: "50%",
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
      ChartUtils.hollowPieChart(myPieChart, data);
    },
    async getDepartmentTree() {
      let res = await SystemManage.getDepartmentTree();
      this.deptList = res[0].childNode;
      this.deptValue = res[0].childNode[0].id;
      this.deptSelectName = res[0].childNode[0].name;
    },
    deptTypeChange(val) {
      this.deptValue = val;
      let obj = this.deptList.find(item => {
        return item.id === val;
      });
      this.deptSelectName = obj.name;
      this.getdeptTaskStatistics();
    },
    async getdeptTaskStatistics() {
      let res = await TaskManageApi.getdeptTaskStatistics({
        deptId: this.deptValue
      });
      let myChart = this.$echarts.init(this.$refs.taskStatisticsCharts);
      let titleText = "";
      let legendData = [];
      let xAxis = res.map(item => item.months + "月");
      let yAxis = "条";
      let series = [];
      series.push({
        name: this.deptSelectName,
        type: "bar",
        barMaxWidth: 80,
        data: res.map(item => item.taskNum)
      });
      let data = {
        titleText,
        legendData,
        series,
        xAxis,
        yAxis
      };
      ChartUtils.handleBarChart(myChart, data);
    },
    async getTaskStatus() {
      let res = await TaskManageApi.getTaskStatus();
      let seriesList = [
        [{ data: res.finish }],
        [{ data: res.time }],
        [{ data: res.supplement }],
        [{ data: res.scene }]
      ];
      let color = ["#4DA1FF", "#83D587", "#FFCE33", "#FF7B8C"];
      let titleText = [
        "完成情况统计",
        "超时情况统计",
        "补录情况统计",
        "办公地点统计"
      ];
      for (let i = 1; i <= 4; i++) {
        this["myChart" + i] = this.$echarts.init(this.$refs["myChart" + i]);
        let xAxis = "条";
        let data = {
          titleText: titleText[i - 1],
          seriesData: seriesList[i - 1][0].data,
          color,
          legendUi: {
            bottom: "30",
            right: "30",
            formatter: function(name) {
              let obj = seriesList[i - 1][0].data.find(
                item => item.name == name
              );
              return name + "：" + obj.value;
            }
          },
          seriesUi: {
            // center: ["50%", "50%"],
            // radius: ['50%', '60%'],
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
              fontWeight: 600,
              top: 40,
              left: 20
            }
          }
        };
        ChartUtils.hollowPieChart(this["myChart" + i], data);
      }
    },
    async getTaskNumRanking() {
      let res = await TaskManageApi.getTaskNumRanking();
      this.taskNumRankData = res;
    },
    handleStartTimeChange(value) {
      this.taskStartTime = moment(value).format("YYYY-MM-DD");
      this.createCharts();
    },
    handleEndTimeChange(value) {
      this.taskEndTime = moment(value).format("YYYY-MM-DD");
      this.createCharts();
    },
    async createCharts() {
      let res = await TaskManageApi.getTaskLinkRatio({
        startTime: this.taskStartTime,
        endTime: this.taskEndTime
      });
      let resData = res.values;
      let myChart = this.$echarts.init(this.$refs.MoManalysisCharts);
      let xAxis = resData.map(item => (item.date ? item.date : ""));
      let legendData = [
        moment()
          .add(-1, "y")
          .format("YYYY"),
        moment().format("YYYY"),
        "工单数量同比增长率",
        "工单数量环比增长率"
      ];

      let series = [
        {
          name: moment()
            .add(-1, "y")
            .format("YYYY"),
          type: "bar",
          data: resData.map(item => item.lastTaskCount),
          barMaxWidth: 80,
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
          name: moment().format("YYYY"),
          type: "bar",
          data: resData.map(item => item.currentTaskCount),
          barMaxWidth: 80,
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
          name: "工单数量同比增长率",
          type: "line",
          data: resData.map(item => item.yearOnYearGrowth),
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
          name: "工单数量环比增长率",
          type: "line",
          yAxisIndex: 1,
          data: resData.map(item => item.monthOnMonthGrowth),
          itemStyle: {
            normal: {
              color: "#5AD15B", //圈圈的颜色
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
        showSecondY: true,
        yAxis: [
          {
            type: "value",
            name: res.unit,
            axisLabel: {
              formatter: "{value}"
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
      let option = {
        yAxis: [
          {
            type: "value",
            name: res.unit,
            axisLabel: {
              formatter: "{value}"
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
    },
    onClickExportBtn() {},
    fixTree() {
      $(".common-tree-box").css({
        height: $(document).height() - 110 + "px"
      });
    }
  },
  async mounted() {
    this.fixTree();
    $(window).resize(() => {
      this.fixTree();
    });
    this.taskList();
    this.officeLocationList();
    this.homeTaskCount();
    await this.getTaskTypeStatistics();
    await this.getDepartmentTree();
    await this.getdeptTaskStatistics();
    this.getTaskStatus();
    this.createCharts();
    this.getTaskNumRanking();
    this.taskTreeConfig.defaultExpandedkeys = [taskType.taskData[0].value];
  }
};
</script>

<style lang="less">
.task-overview {
  .energy-tree-box {
    height: 100%;
    padding: 20px 0;
    background: @white;
    bottom: 20px;
    // left: 270px;
    .el-select {
      width: 120px;
      margin: 0 0 20px 65px;
    }
  }
  .right-content {
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
      margin-top: 0px !important;
    }
    .task-sum-box {
      padding: 20px 20px;
      margin-bottom: 20px;
      .task-sum {
        width: 15%;
        height: 70px;
        // background: @white;
        border-radius: 6px;
        color: @white;
        font-size: 20px;
        p {
          margin-right: 5px;
        }
        background: linear-gradient(
          120deg,
          rgba(234, 111, 233, 1),
          rgba(141, 100, 248, 1)
        );
        box-shadow: 0px 4px 12px 0px rgba(141, 100, 248, 0.5) !important;
      }
      .task-sum:nth-child(2) {
        background: linear-gradient(
          120deg,
          rgba(95, 176, 255, 1),
          rgba(106, 136, 254, 1)
        );
        box-shadow: 0px 4px 12px 0px rgba(106, 138, 254, 0.5) !important;
      }
      .task-sum:nth-child(3) {
        background: linear-gradient(
          120deg,
          rgba(255, 133, 96, 1),
          rgba(255, 113, 152, 1)
        );
        box-shadow: 0px 4px 12px 0px rgba(255, 113, 152, 0.5) !important;
      }
      .task-sum:nth-child(4) {
        background: linear-gradient(
          120deg,
          rgba(57, 206, 192, 1),
          rgba(19, 159, 209, 1)
        );
        box-shadow: 0px 4px 12px 0px rgba(19, 159, 209, 0.5) !important;
      }
      .task-sum:nth-child(5) {
        background-image: linear-gradient(120deg, #21d4fd, #b721ff);
      }
    }
    .task-group {
      width: 100%;
      margin-bottom: 20px;
      .charts-box {
        width: 35%;
        // float: left;
        .pie-charts {
          height: 460px;
          width: 100%;
        }
      }
      .dept-task-header {
        height: 60px;
        padding: 0 40px;
        font-size: 18px;
        font-weight: 600;
        span {
          font-weight: 500;
        }
        .dept-class {
          // .el-select--small {
          //   margin-left: 10px;
          //   width: 180px;
          // }
          .tag-style {
            font-size: 14px;
            margin: 0 5px;
          }
          .el-date-editor {
            width: 150px;
          }
        }
      }
      .department-task-box {
        width: 65% !important;
        padding-left: 20px;
        .analysis-pie-charts {
          width: 100%;
          height: 400px;
        }
      }
      .analysis-pie-charts-box {
        width: 65% !important;
        // padding: 20px 0 0 20px;
        .pie-charts {
          height: 480px;
          width: 100%;
          margin-top: 20px;
        }
      }
      .task-rank-content {
        width: 32%;
        height: 460px !important;
        padding-left: 6%;
        .task-rank-title {
          height: 60px;
          line-height: 60px;
          font-weight: bold;
          font-size: 18px;
        }
      }
      .task-rank {
        height: 80%;
        width: 100%;
        display: flex;
        flex-direction: column;
        // align-items: center;
        justify-content: center;
        .progress-div {
          width: 90%;
          position: relative;
          span {
            position: absolute;
            left: 70%;
            top: 0;
          }
        }
        .el-progress-bar__outer {
          height: 26px !important;
          border-radius: 0px !important;
        }
        .el-progress-bar__inner {
          border-radius: 0px !important;
          background-color: #0088ff !important;
        }
        .el-progress-bar__outer {
          background-color: #ccc !important;
        }
        .el-progress-bar {
          width: 70%;
          // float: left;
        }
        .progress-content {
          width: 80%;
          margin: 0 auto;
          .percentage-text {
            width: 100%;
            height: 40px;
            color: #8dd1f8;
            line-height: 40px;
            text-align: left;
            font-size: 14px;
            padding: 10px 0;
            margin: 2px 0 6px 0;
          }
        }
        .percentage-name {
          width: 100%;
          height: 35px;
          line-height: 25px;
          text-align: left;
        }
      }
    }
    .task-status-statistic {
      height: 400px;
      margin-bottom: 20px;
      .my-chart {
        height: 400px;
        width: 25%;
        float: left;
      }
    }
  }

  .task-overview-table {
    margin: 20px 0;
    padding: 20px;
    .table-tip {
      color: @mainBgColor;
      font-weight: bold;
    }
    .table-tip-box {
      margin-bottom: 20px;
    }
  }
  .officeLocation-table {
     margin-bottom: 20px!important;
  }
}
</style>
