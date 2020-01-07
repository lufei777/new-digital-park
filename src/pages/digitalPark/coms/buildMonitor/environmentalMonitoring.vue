<template>
  <div class="environmental-monitoring">
    <!--<vCharts :chartConfig="chartConfig" />-->
    <div>{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
  import CommonApi from '@/server/api/commonApi'
  import vCharts from '@/components/vCharts'
  export default {
    name: "environmentalMonitoring",
    components: {
      vCharts
    },
    props: ["moduleItem"],
    data() {
      return {
        chartConfig:{}
      };
    },
    methods: {
      initChart(){
      },
      async getEnvironmentData(){
        let res = await CommonApi.getEnvironmentData({
          homeId:this.moduleItem.id
        })
        this.initChart(res)
      },
    },
    mounted() {
      // this.initChart()
      this.getEnvironmentData()
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
