<template>
  <div class="real-time-of-meteorological-station">
    <div class="real-time-list my-chart">
      <div v-for="(item,index) in realTimeData" :key="index" class="item-data">
        <div>{{item.name}}</div>
        <div class="item-value">{{item.value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      name: 'realTimeOfMeteorologicalStation',
      components: {},
      props: ['moduleItem'],
      data() {
          return {
            realTimeData:[{
              name:'风速',
              value:'25137lux'
            },{
              name:'光照',
              value:'25137lux'
            },{
              name:'二氧化碳',
              value:'25137lux'
            },{
              name:'紫外线',
              value:'25137lux'
            },{
              name:'一氧化碳',
              value:'25137lux'
            },{
              name:'风向',
              value:'25137lux'
            },{
              name:'降雨',
              value:'25137lux'
            },{
              name:'氧气',
              value:'25137lux'
            }]
          }
      },
      computed: {},
      watch: {},
      methods: {},
      mounted() {
      }
  }
</script>

<style lang="less">
  .real-time-of-meteorological-station{
    .real-time-list{
      /*width:100%;*/
      /*height:100%;*/
    }
    .item-data{
      width:32%;
      float: left;
      margin:30px 0.6%;
      text-align: center;
    }
    .item-value{
      color:#01FFFD;
      margin-top: 10px;
    }
  }
</style>
