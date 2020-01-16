<template>
  <div class="environmental-monitoring">
    <div class="my-chart">
      <img src="../../../../../static/image/digitalPark/home_environment.png" alt="">
    </div>

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
  .environmental-monitoring {
  }
</style>
