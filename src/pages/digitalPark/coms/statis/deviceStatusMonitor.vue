<template>
  <div class="device-status-monitor">
    <div class="module-item-top-name flex-align tmp-hidden">
      <i class="module-item-top-icon" v-if="isNorbulingkaScreen"></i>
      <span>{{moduleItem.moduleName}}</span>
    </div>
    <div class="my-chart flex-align-between">
      <div
        :class="'progress-content percentage'+index"
        v-for="(item,index) in percentage"
        :key="index"
      >
        <el-progress type="circle"
                     :percentage="item.percent" :color="colorList[index]"
                     :stroke-width="8"
                     :width="getProgressWidth"
        ></el-progress>
        <div :style="{'color':colorList[index]}" class="item-status">
          <div>{{item.value}}个</div>
          <div class="status-text">{{item.name}} </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {isNorbulingkaScreen } from "@/utils/project";
import CommonApi from '@/service/api/common'
export default {
  name: "deviceStatusMonitor",
  props: ["moduleItem"],
  data() {
    return {
      colorList:['#35B8C9','#D88B2E','#B487DF','#C75E56','#dab54c'],
      // color:["#25e4a3", "dimGrey", "#dab54c", "#de8536",'#ed5450'],
      percentage: [],
      getProgressWidth:70
    };
  },
  computed:{
    isNorbulingkaScreen(){
      return isNorbulingkaScreen()
    },
  },
  methods:{
    async getMonitorState(){
      this.getProgressWidth = 75
      let res = await CommonApi.getMonitorState();
      // let res = {
      //   values: [
      //     {
      //       value: 45,
      //       color: "#35B8C9",
      //       name: "正常"
      //     },
      //     {
      //       value: 5,
      //       color: "#D88B2E",
      //       name: "错误"
      //     },
      //     {
      //       value: 15,
      //       color: "#B487DF",
      //       name: "未知"
      //     },
      //     {
      //       value: 25,
      //       color: "#C75E56",
      //       name: "警告"
      //     }]
      // }
      let sum=0
      res.values.map((item)=>{
        sum+=item.value
      })
      res.values.map((item)=>{
        item.percent = sum?parseFloat(Number((item.value / sum) * 100).toFixed(2)):0
      })
      this.percentage = res.values
      this.$nextTick(()=>{
        this.getProgressWidth = $(".device-status-monitor").width()*0.15
      })
    }
  },
  mounted(){
    this.getMonitorState()
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
    .percentage4 .el-progress-circle__track {
      stroke: #5f5143;
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
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width:80px;
  }
  .my-chart{
    width:100%;
    overflow: hidden;
  }
}
</style>
