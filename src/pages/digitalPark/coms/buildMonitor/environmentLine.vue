<template>
  <div class="environment-line-coms">
    <div class="choose-box flex-align-between">
      <div class="module-item-top-name">{{moduleItem.moduleName}}</div>
      <div class="choose-box-inner flex">
       <div v-for="item in typeList" :key="item.id"
            class="item-choose"
       >
         {{item.name}}
       </div>
      </div>
    </div>
  </div>
</template>

<script>
  let typeList = [{
    name:'一氧化碳',
    value:0
  },{
    name:'二氧化碳',
    value:1
  },{
    name:'温度',
    value:2
  },{
    name:'湿度',
    value:3
  },{
    name:'PM2.5',
    value:4
  }]
  import CommonApi from '@/service/api/common'
  export default {
    name: "environmentLine",
    components: {
    },
    props: ["moduleItem"],
    data() {
      return {
         typeList:typeList
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
  .environment-line-coms {
     .choose-box{
       width:100%;
     }
    .choose-box-inner{
      flex-shrink: 0;
    }
    .item-choose{
      margin-left:20px;
      height:15px;
      line-height: 15px;
      font-weight: bold;
      font-size:14px;
    }
  }
</style>
