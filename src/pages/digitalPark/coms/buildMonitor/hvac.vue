<template>
  <div class="hvac-coms">
    <div class="module-item-top-name" :class="moduleItem.type==1?'white-color-name':''">{{moduleItem.moduleName}}</div>
    <div class="flex-align-center water-content">
      <div v-for="(item,index) in hvacData" :key="index" class="item-water">
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
    name: "hvac",
    components: {
    },
    props: ["moduleItem"],
    data() {
      return {
        hvacData:[]
      };
    },
    methods: {
      initChart(){
      },
      async getEnvironmentData(){
        let res = await CommonApi.getHomeInterfaceMonitor({
          homeId:3
        })
        this.hvacData=res
      },
    },
    mounted() {
      this.getEnvironmentData()
    }
  };
</script>

<style lang="less">
  .hvac-coms {
    .water-content{
      /*height:95%;*/
      flex-grow: 1;
    }
    .item-water{
      padding:0 20px;
      color:@dashboardColor;
      text-align: center;
    }
    .item-count{
      margin-top: 10px;
      padding:40px 25px;
      background: rgba(255,255,255,.2);
    }
    .up-count{
      font-size: 30px;
      margin-bottom: 5px;
    }
  }
</style>
