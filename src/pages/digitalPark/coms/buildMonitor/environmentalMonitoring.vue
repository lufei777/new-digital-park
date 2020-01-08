<template>
  <div class="environmental-monitoring">
    <div>{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
  import CommonApi from '@/server/api/commonApi'
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .building-status-proportion {
    .pie-charts {
      height: 95%;
    }
  }
</style>
