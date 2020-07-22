<template>
  <div class="condition-box radius-shadow flex-align-wrap">
    <div class="item-group">
      <label>工单名称：</label>
      <el-input v-model="searchObj.taskName" />
    </div>

    <div class="item-group">
      <label>是否收费：</label>
      <el-select v-model="searchObj.whetherPay" placeholder="请选择">
        <el-option
          v-for="item in whetherPayList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="item-group">
      <label>任务状态：</label>
      <el-select v-model="searchObj.taskStatus" placeholder="请选择">
        <el-option
          v-for="item in taskStatusList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="item-group">
      <label>维修类型：</label>
      <el-select v-model="searchObj.maintenanceType" placeholder="请选择">
        <el-option
          v-for="item in maintenanceTypeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="item-group">
      <label>优先级：</label>
      <el-select v-model="searchObj.priority" placeholder="请选择">
        <el-option
          v-for="item in priorityList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="item-group">
      <label>预约时间：</label>
      <el-date-picker
        v-model="searchObj.reservationTime"
        type="datetime"
        placeholder="选择日期时间"
        value-format="yyyy-MM-dd HH:mm"
        format="yyyy-MM-dd HH:mm"
        :clearable="false"
      ></el-date-picker>
    </div>
    <div class="item-group">
      <label>派单时间：</label>
      <el-date-picker
        v-model="searchObj.sendTime"
        type="datetime"
        placeholder="选择日期时间"
        value-format="yyyy-MM-dd HH:mm"
        format="yyyy-MM-dd HH:mm"
        :clearable="false"
      ></el-date-picker>
    </div>
    <div class="item-group operator-box">
      <el-button type="primary" class="search-btn" @click="onClickSearchBtn">搜索</el-button>
      <el-button @click="onClickResetBtn">重置</el-button>
    </div>
  </div>
</template>

<script>
import { MaintenanceManageDic, TaskManageDic } from "@/utils/dictionary.js";
export default {
  name: "CommonSearch",
  data() {
    return {
      searchObj: {
        taskName: "",
        whetherPay: "0",
        taskStatus: "0",
        maintenanceType: "",
        priority: "",
        reservationTime: "",
        sendTime: ""
      },
      whetherPayList: MaintenanceManageDic.payRadio,
      taskStatusList: MaintenanceManageDic.taskStatus,
      maintenanceTypeList: MaintenanceManageDic.maintenanceType,
      priorityList: TaskManageDic.priorityType
    };
  },
  methods: {
    onClickSearchBtn() {
      this.$parent.getData && this.$parent.getData(this.searchObj);
    },
    onClickResetBtn() {
      this.searchObj = {
        taskName: "",
        whetherPay: "",
        taskStatus: "",
        maintenanceType: "",
        priority: "",
        reservationTime: "",
        sendTime: ""
      };
      this.$parent.getData && this.$parent.getData(this.searchObj);
    }
  }
};
</script>

<style lang='less' scoped>
.condition-box {
  margin-bottom: 20px;
  background: @white;
  padding: 0px 20px 20px 20px;
  // background: pink;
  .item-group {
    margin-top: 20px;
  }
  .item-group:first-child {
    .el-input {
      // width: 161px;
    }
  }
}
.operator-box {
  .el-button {
    margin-right: 10px;
  }
}
</style>