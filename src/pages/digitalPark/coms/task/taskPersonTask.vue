<template>
  <div class="task-person-task">
    <!--<div ref="pieCharts" class="my-chart" id="task-person-task-chart"></div>-->
    <!--<div class="my-chart">-->
    <div class="module-item-top-name" :class="moduleItem.type==1?'white-color-name':''">{{moduleItem.moduleName}}</div>
    <img class="my-chart"

      src="../../../../../static/image/digitalPark/renwu1_tmp.png" alt="">
  <!--</div>-->
  </div>
</template>

<script>
import CommonFun from "../../../../utils/commonFun";
import ChartUtils from "../../../../utils/chartUtils";
export default {
  name: "TaskPersonTask",
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
.task-person-task {
  .module-item-top-name{
    margin-bottom: 10px;
  }
}
</style>
