<template>
  <MonitorChoose :statisticsFlag="3" :showDateType="false" :showTwoMonitor="true"></MonitorChoose>
</template>

<script>
import { mapState } from "vuex";
import echarts from "echarts";
import MonitorChoose from "../coms/monitorChoose";
import MonitorModal from "../../../components/monitorModal/index";
import CommonApi from "../../../service/api/common";
export default {
  name: "DeviceAnalysis",
  components: {
    MonitorChoose,
    MonitorModal
  },
  data(){
    return{

    }
  }
};
</script>

<style>
</style>