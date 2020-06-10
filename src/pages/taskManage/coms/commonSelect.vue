<template>
  <!-- :class="!radiusShadowShow?'radius-shadow':''"-->
  <div class="condition-select flex-align radius-shadow">
    <div class="item-group">
      <label>优先级：</label>
      <el-select v-model="levelId" placeholder="请选择">
        <el-option v-for="item in levelTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </div>
    <div class="item-group">
      <label>状态：</label>
      <el-select v-model="statusId" placeholder="请选择">
        <el-option
          v-for="item in statusTypeList"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
    </div>
    <div class="item-group">
      <label>时间类型：</label>
      <el-select v-model="curDateType" placeholder="请选择" @change="handleDateTypeChange">
        <el-option v-for="item in dateTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
      </el-select>
    </div>
    <div class="item-group">
      <el-radio-group v-model="radio" @change="handleRadioChange">
        <el-radio class="frist-radio" label="0">单个</el-radio>
        <el-radio label="1">范围</el-radio>
      </el-radio-group>
    </div>
    <div style="flex-shrink: 0" class="flex item-group">
      <div>
        <label>创建时间：</label>
        <el-date-picker
          v-model="startTime"
          :type="dateType"
          @change="handleStartTimeChange"
          :clearable="false"
        ></el-date-picker>
      </div>
      <div v-show="showLastTime">
        <span class="tag-style">至</span>
        <el-date-picker
          v-model="lastTime"
          :type="dateType"
          @change="handleLastTimeChange"
          :clearable="false"
        ></el-date-picker>
      </div>
    </div>

    <div class="operating-btn">
      <el-button type="primary" class="sure-btn" @click="handleClickSureBtn">确定</el-button>
      <el-button @click="onClickResetBtn">重置</el-button>
    </div>
    
    <!-- <el-button type="primary" @click="refresh">刷新</el-button>
    <el-button type="primary" @click="addTask">新增</el-button>-->
  </div>
</template>

<script>
import { mapState } from "vuex";
import moment from "moment";
export default {
  name: "ConditionSelect",
  components: {},
  props: ["radiusShadowShow"],
  data() {
    return {
      levelId: 1,
      statusId: 1,
      curDateType: 1,
      dateType: "month",
      radio: "0",
      startTime: moment(
        new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000 * 10)
      ).format("YYYY-MM"),
      lastTime: "",
      showLastTime: false,
      curEnergy: []
    };
  },
  computed: {
    dateTypeList() {
      return [
        {
          name: "年",
          id: 0
        },
        {
          name: "月",
          id: 1
        },
        {
          name: "日",
          id: 2
        }
      ];
    },
    levelTypeList() {
      return [
        {
          name: "正常",
          id: 1
        },
        {
          name: "紧急",
          id: 2
        },
        {
          name: "重要",
          id: 3
        }
      ];
    },
    statusTypeList() {
      return [
        {
          name: "待派",
          id: 1
        },
        {
          name: "待接",
          id: 2
        },
        {
          name: "处理中",
          id: 3
        },
        {
          name: "已完成",
          id: 4
        }
      ];
    }
  },
  methods: {
    handleRadioChange(value) {
      this.showLastTime = value == 1 ? true : false;
      if (value == 0) {
        this.lastTime = "";
      } else {
        this.lastTime = moment(new Date()).format("YYYY-MM");
      }
    },
    timeFormat(time, value) {
      let formatType =
        this.dateType == "year"
          ? "YYYY"
          : this.dateType == "month"
          ? "YYYY-MM"
          : "YYYY-MM-DD";
      this[time] = this[time] ? moment(value).format(formatType) : "";
      console.log("this[time]", this[time]);
    },
    handleStartTimeChange(value) {
      this.timeFormat("startTime", value);
    },
    handleLastTimeChange(value) {
      this.timeFormat("lastTime", value);
    },
    handleDateTypeChange(value) {
      this.dateType = value == 0 ? "year" : value == 1 ? "month" : "date";
      this.timeFormat("startTime", this.startTime);
      this.timeFormat("lastTime", this.lastTime);
    },
    handleClickSureBtn() {
      let params = {
        ugrent: this.levelId,
        status: this.statusId,
        beginTime: this.startTime,
        endTime: this.lastTime
        // taskType: this.curDateType
      };
      this.$emit("showSelectParams", params);
    },
    onClickResetBtn() {
      let params = {};
      //  ugrent: this.levelId,
      //   status: this.statusId,
      this.startTime = "";
      this.lastTime = "";
      // this.curDateType = ""
      this.$emit("showSelectParams", params);
    }
  },
  mounted() {}
};
</script>

<style lang="less">
.condition-select {
  background: @white;
  padding: 25px 15px;
  flex-flow: wrap;
  .tag-style {
    margin: 0 5px;
  }
  .sure-btn {
    // margin-left: 10px;
  }
  .operating-btn {
     .el-button, .el-button--primary, .el-button--default{
      width: 72px!important;
    }
  }
 
  .el-select {
    width: 95px;
  }
  .frist-radio {
    margin-right: 20px;
  }
  .el-date-editor.el-input {
    width: 133px;
  }
}
</style>
