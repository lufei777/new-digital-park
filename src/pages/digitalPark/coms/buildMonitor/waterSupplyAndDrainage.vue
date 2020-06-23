<template>
  <div class="water-supply-drainage-coms">
    <div class="module-item-top-name tmp-hidden">{{moduleItem.moduleName}}</div>
    <div class="flex-align-center water-content">
      <div v-for="(item,index) in waterData" :key="index" class="item-water">
        <span>{{item.title}}</span>
        <div class="item-count">
          <div class="up-count">{{item.up}}</div>
          <div>{{item.all}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CommonApi from '@/service/api/common'
  export default {
    name: "waterSupplyAndDrainage",
    components: {
    },
    props: ["moduleItem"],
    data() {
      return {
        waterData:[]
      };
    },
    methods: {
      initChart(){
      },
      async getEnvironmentData(){
        let res = await CommonApi.getHomeInterfaceMonitor({
          homeId:2
        })
        this.waterData=res
      },
    },
    mounted() {
      // this.initChart()
      this.getEnvironmentData()
    }
  };
</script>

<style lang="less">
  .water-supply-drainage-coms {
     .water-content{
       height:90%;
     }
    .item-water{
      padding:0 20px;
      color:@dashboardColor;
      text-align: center;
    }
    .item-count{
      margin-top: 10px;
      padding:30px 25px;
      background: rgba(255,255,255,.2);
    }
    .up-count{
      font-size: 30px;
      margin-bottom: 5px;
    }
  }
</style>
