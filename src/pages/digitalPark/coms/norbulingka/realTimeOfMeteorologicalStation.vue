<template>
  <div class="real-time-of-meteorological-station">
    <div class="module-item-top-name flex-align tmp-hidden">
      <i class="module-item-top-icon"></i>
      <span>{{moduleItem.moduleName}}</span>
    </div>
    <div class="real-time-list my-chart">
      <div v-for="(item,index) in realTimeData" :key="index" class="item-data">
        <div>{{item.name}}</div>
        <div class="item-value">{{item.value}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  import CommonApi from '@/service/api/common'
  export default {
      name: 'realTimeOfMeteorologicalStation',
      components: {},
      props: ['moduleItem'],
      data() {
          return {
            realTimeData:[]
          }
      },
      computed: {},
      watch: {},
      methods: {
        async getMeteorologicalData(){
          let params={
            code:1,
            spaceId:67240049
          }
          this.realTimeData = await CommonApi.getMeteorologicalData(params)
          // this.realTimeData=  [
          //   {
          //     "name":"温度",
          //     "value":"20°C"
          //   },
          //   {
          //     "name":"湿度",
          //     "value":"66%"
          //   },
          //   {
          //     "name":"PM2.5",
          //     "value":"4.0ug/m³"
          //   },
          //   {
          //     "name":"PM10",
          //     "value":"26.0ug/m³"
          //   },
          //   {
          //     "name":"SO2",
          //     "value":"11.806ug/m³"
          //   },
          //   {
          //     "name":"NO2",
          //     "value":"36.6ug/m³"
          //   },
          //   {
          //     "name":"O3",
          //     "value":"37.7ug/m³"
          //   },
          //   {
          //     "name":"CO",
          //     "value":"2.18ug/m³"
          //   },
          //   {
          //     "name":"风速",
          //     "value":"0.6m/s"
          //   },
          //   {
          //     "name":"主导风向",
          //     "value":"166.0°"
          //   }
          // ]
        }
      },
      mounted() {
        this.getMeteorologicalData()
      }
  }
</script>

<style lang="less">
  .real-time-of-meteorological-station{
    .real-time-list{
      /*width:100%;*/
      /*height:100%;*/
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
    }
    .item-data{
      width:25%;
      /*float: left;*/
      /*margin:15px 2.5%;*/
      /*text-align: center;*/
      text-align: center;
      margin:10px 0;
    }
    .item-value{
      color:#01FFFD;
      margin-top: 5px;
    }
  }
</style>
