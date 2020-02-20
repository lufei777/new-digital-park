<template>
  <div class="device-type-alarm-proportion">
    <div class="my-chart" ref="myChart">
      <div class="percentage-name">{{moduleItem.moduleName}}</div>
      <div v-for="(item,index) in rlarmProportionData.alarms" :key="index" class="progress-content">
        <el-progress :percentage="parseFloat(item.numberPercentage)" :show-text="false"></el-progress>
        <div class="percentage-text">
          <span>{{item.name}}</span>
          <span style="margin-left:5px">{{item.numberPercentage}}%</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonApi from "@/service/api/common";
export default {
  name: "deviceTypeAlarmProportion",
  components: {},
  props: ["moduleItem"],
  data() {
    return {
      rlarmProportionData: []
    };
  },
  computed: {},
  watch: {},
  methods: {
    async getAccessData() {
      let res = await CommonApi.getAlarmProportion();
      this.rlarmProportionData = res;
      this.rlarmProportionData.alarms.map(item => {
        item.numberPercentage = ((item.number / res.allAlarm) * 100).toFixed(2);
      });
    }
  },
  mounted() {
    this.getAccessData();
  }
};
</script>

<style lang="less">
.device-type-alarm-proportion {
  .my-chart {
    .el-progress-bar__outer {
      height: 18px !important;
      border-radius: 0px !important;
    }
    .el-progress-bar__inner {
      border-radius: 0px !important;
      background-color: #0088ff !important;
    }
    .el-progress-bar__outer {
      background-color: #30475b !important;
    }
    .progress-content {
      width: 80%;
      margin: 0 auto;
      .percentage-text {
        width: 100%;
        height: 25px;
        color: #8dd1f8;
        line-height: 25px;
        text-align: left;
        font-size: 14px;
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
</style>
