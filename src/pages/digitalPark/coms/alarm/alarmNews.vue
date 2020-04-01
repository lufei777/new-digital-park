<template>
  <div class="alarm-news">
    <div class="my-chart">
      <div v-for="(item,index) in alarmList"
           :key="index"
           class="item-alarm hover-pointer"
      >
        {{index+1}}.{{item.caption}}</div>
    </div>
    <div>{{moduleItem.moduleName}}</div>
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
        if(!res.rows.length){
          res.rows = [ {
            "assetId":1329480383,
            "id":50613,
            "caption":"中钢大厦->A座->一层->强电井烟感->强电井烟感",
            "state":2,
            "errorMessage":"强电井烟感为报警状态",
            "startTime":"2020-04-01 10:07:38",
            "duration":null,
            "auto":1,
            "handled":1,
            "endTime":null,
            "alarmRuleId":0,
            "system":"消防系统"
          },
          {
            "assetId":597995067,
            "id":50612,
            "caption":"中钢大厦->A座->二十七层->弱电间温感->弱电间温感",
            "state":2,
            "errorMessage":"弱电间温感为报警状态",
            "startTime":"2020-04-01 10:07:14",
            "duration":null,
            "auto":1,
            "handled":1,
            "endTime":null,
            "alarmRuleId":0,
            "system":"消防系统"
          }]
        }
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
  }
</style>
