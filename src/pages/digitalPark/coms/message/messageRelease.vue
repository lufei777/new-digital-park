<template>
  <div class="messageRelease" style="overflow: hidden">
    <!--<div ref="pieCharts" class="my-chart" id="task-person-task-chart"></div>-->
    <!--<div class="my-chart">-->
    <!--<img-->
      <!--style="width:100%;height:auto;margin-top:25px;display: inline-block"-->
      <!--src="../../../../static/image/digitalPark/renwu1_tmp.png" alt="">-->
      <el-tabs style="height: 300px;width:90%;" type="border-card" tabPosition="top">
      <el-tab-pane label="员工活动">员工活动</el-tab-pane>
      <el-tab-pane label="党建工作">党建工作</el-tab-pane>
      <el-tab-pane label="规章制度">规章制度</el-tab-pane>
      <el-tab-pane label="通知公告">通止规</el-tab-pane>
      <el-tab-pane label="时事要闻">通止规</el-tab-pane>
      </el-tabs>
  <!--</div>-->
    <div>{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
import CommonFun from "../../../../utils/commonFun";
import ChartUtils from "../../../../utils/chartUtils";
export default {
  name: "MessageRelease",
  components: {},
  props: ["moduleItem"],
  data() {
    return {};
  },
  methods: {
  },
  mounted() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.building-status-proportion {
  .pie-charts {
    height: 95%;
  }
}
</style>
