<template>
  <div class="environmental-monitoring">
    <div class="flex-align-between envir-content">
      <img src="../../../../../static/image/digitalPark/home_environment.png" alt="">
      <div>
        <div v-for="(item,index) in envirData" :key="index" class="item-envir">
          {{item.title}}：{{item.value}}
        </div>
      </div>
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
        envirData:{}
      };
    },
    methods: {
      initChart(){
      },
      async getEnvironmentData(){
        let res = await CommonApi.getEnvironmentData({
          homeId:1
        })
        this.envirData=res.data
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
    img{
      width:150px;
    }
    .envir-content{
      width:80%;
      height:95%;
    }
    .item-envir{
      margin-bottom: 10px;
      color:@dashboardColor;
    }
  }
</style>
