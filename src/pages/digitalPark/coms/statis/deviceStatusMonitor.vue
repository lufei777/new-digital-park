<template>
  <div class="device-status-monitor">
    <div class="module-item-top-name">{{moduleItem.moduleName}}</div>
    <div class="my-chart flex-align-between">
      <div class="progress-content" v-for="(item,index) in percentage" :key="index">
        <el-progress
          type="circle"
          :percentage="item.value"
          :color="item.color"
          :stroke-width="10"
        ></el-progress>
        <div :style="{'color':item.color}" class="item-status">
          <span class="status-text">{{item.status}} ：</span>
         {{item.value}}个
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "deviceStatusMonitor",
  props: ["moduleItem"],
  data() {
    return {
      percentage: [
        {
          value: 45,
          color: "#35B8C9",
          status: "正常"
        },
        {
          value: 5,
          color: "#D88B2E",
          status: "错误"
        },
        {
          value: 15,
          color: "#B487DF",
          status: "未知"
        },
        {
          value: 25,
          color: "#C75E56",
          status: "警告"
        }
      ]
    };
  }
};
</script>

<style lang="less">
.device-status-monitor {
  .el-progress__text {
    color: #ffffff;
  }
  .my-chart {
    .progress-content {
      float: left;
      text-align: center;
      .status-text {
        color: #ffffff!important;
      }
    }
  }
  .item-status{
    margin-top: 20px;
  }
}
</style>
