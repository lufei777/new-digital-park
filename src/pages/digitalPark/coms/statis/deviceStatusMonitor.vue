<template>
  <div class="device-status-monitor">
    <div class="module-item-top-name">{{moduleItem.moduleName}}</div>
    <div class="my-chart flex-align-between">
      <div
        :class="'progress-content percentage'+index"
        v-for="(item,index) in percentage"
        :key="index"
      >
        <el-progress type="circle" :percentage="item.value" :color="item.color" :stroke-width="10"></el-progress>
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
        color: #ffffff !important;
      }
    }
    .percentage0 .el-progress-circle__track {
      stroke: #6b898c;
    }
    .percentage1 .el-progress-circle__track {
      stroke: #5f5143;
    }
    .percentage2 .el-progress-circle__track {
      stroke: #635284;
    }
    .percentage3 .el-progress-circle__track {
      stroke: #9e7e7c;
    }
    // el-progress-circle
    .percentage0 .el-progress-circle {
      border-radius: 50%;
      background: rgba(28, 211, 227, 0.1);
    }
    .percentage1 .el-progress-circle {
      border-radius: 50%;
      background: rgba(229, 137, 25, 0.1);
    }
    .percentage2 .el-progress-circle {
      border-radius: 50%;
      background: rgba(180, 135, 223, 0.2);
    }
    .percentage3 .el-progress-circle {
      border-radius: 50%;
      background: rgba(199, 94, 86, 0.2);
    }
  }
  .item-status {
    margin-top: 20px;
  }
}
</style>
