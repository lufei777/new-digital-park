<template>
  <div class="environmental-monitoring">
    <div  class="module-item-top-name">{{moduleItem.moduleName}}</div>
    <div class="flex-align-center envir-content">
      <img src="../../../../../static/image/digitalPark/home_environment.png" alt="">
      <div>
        <div v-for="(item,index) in envirData" :key="index" class="item-envir">
          {{item.title}}：{{item.value}}
        </div>
      </div>
    </div>
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
      this.getEnvironmentData()
    }
  };
</script>

<style lang="less">
  .environmental-monitoring {
    img{
      width:50%;
      margin-right: 5%;
    }
    .envir-content{
      width:80%;
      height:95%;
    }
    .item-envir{
      margin-bottom: 10px;
      color:@dashboardColor;
      text-align: left;
    }
  }
</style>
