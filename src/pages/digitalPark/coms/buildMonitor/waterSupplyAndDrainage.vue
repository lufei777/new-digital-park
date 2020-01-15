<template>
  <div class="environmental-monitoring">
    <img src="../../../../../static/image/digitalPark/home_environment.png" alt="">
    <div>{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
  import CommonApi from '@/service/api/common'
  export default {
    name: "environmentalMonitoring",
    components: {
    },
    props: ["moduleItem"],
    data() {
      return {

      };
    },
    methods: {
      initChart(){
      },
      async getEnvironmentData(){
        let res = await CommonApi.getEnvironmentData({
          homeId:this.moduleItem.id
        })
      },
    },
    mounted() {
      // this.initChart()
      this.getEnvironmentData()
    }
  };
</script>

<style lang="less">
  .building-status-proportion {
    .pie-charts {
      height: 95%;
    }
  }
</style>
