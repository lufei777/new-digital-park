<template>
  <div class="alarm-news">
    <div class="tmp-hidden">{{moduleItem.moduleName}}</div>
    <div class="my-chart alarm-list">
      <div v-for="(item,index) in alarmList"
           :key="index"
           class="item-alarm hover-pointer"
      >
        {{index+1}}.{{item.caption}}</div>
    </div>
  </div>
</template>

<script>
  import CommonApi from '@/service/api/common'
  export default {
    name: 'alarmNews',
    components: {
    },
    props:['moduleItem'],
    data () {
      return {
        alarmList:[]
      }
    },
    computed:{
    },
    watch:{
    },
    methods: {
      async getAlarmMessageList(){
        let res = await CommonApi.getAlarmMessageList({
          pageNum:1,
          pageCount:6,
          start:'',
          end:''
        })
        this.alarmList=res.rows
      }
    },
    mounted(){
      this.getAlarmMessageList()
    }
  }
</script>

<style lang="less">
  .alarm-news{
    .item-alarm{
      width: 100%;
      text-align: left;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      padding:10px 0;
      border-bottom:1px solid #1B2F44;
      font-size: 12px;
      color:@dashboardColor;
    }
    .alarm-list{
      /*margin-bottom: 10px;*/
      /*box-sizing: border-box;*/
    }
  }
</style>
