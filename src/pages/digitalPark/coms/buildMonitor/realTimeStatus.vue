<template>
  <div class="real-time-status">

  </div>
</template>

<script>
  import CommonApi from '@/service/api/common'
  export default {
    name: "realTimeStatus",
    components: {
    },
    props: ["moduleItem"],
    data() {
      return {
      };
    },
    methods: {
      async getEnvironmentData(){
        let res = await CommonApi.getEnvironmentData({
          homeId:1
        })
        this.envirData=res.data
      },
      initChart(){
      },
    },
    mounted() {
      this.getEnvironmentData()
    }
  };
</script>

<style lang="less">
  .real-time-status {
  }
</style>
