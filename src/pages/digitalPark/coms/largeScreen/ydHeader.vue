<template>
    <div class="yd-header flex-align-between">
      <div class="cur-tip"><i class="iconfont icongailan tip-icon"></i>{{curTip}}</div>
      <div class="header-name">
        <!--<i class="iconfont iconshuziyuanqu park-logo"></i>-->
       <span>{{headName}}</span>
      </div>
      <div class="logout-box">
        <span class="news"><i class="iconfont iconlingdang news-icon"></i>{{$t('homeHeader.news')}}({{alarmListCount}})</span>
        <span class="logout"><i class="iconfont iconguanbi logout-icon"></i>退出</span>
      </div>
    </div>
</template>

<script>
  import {isZG} from '@/utils/project';
  export default {
    name: 'YDHeader',
    components: {
    },
    props:[], //fromFlag 1：仪表盘 2:大屏
    data () {
      return {
        headName:'伊甸城IBM运管系统',
        curDate:moment().format('YYYY年MM月DD日'),
        alarmListCount:0,
        curTip:'总体概览'
      }
    },
    computed:{
    },
    watch:{
    },
    methods: {

    },
    mounted(){
    }
  }
</script>

<style lang="less">
  .yd-header{
    padding:0 35px;
    height:@largeScreenHeaderHeight;
    line-height: @largeScreenHeaderHeight;
    box-sizing: border-box;
    .header-name{
      font-weight:bold;
      width:30%;
      text-align: center;
      background-image:url('../../../../../static/image/digitalPark/yd_header_title.png');
      background-repeat: no-repeat;
      background-size:100% 100%;
      font-size:60px;
      span{
        color:rgba(255,255,255,1);
        background:linear-gradient(0deg,rgba(1,234,254,1) 0%, rgba(255,255,255,1) 100%);
        -webkit-background-clip:text;
        -webkit-text-fill-color:transparent;
      }
    }
    .park-logo{
      font-size: 64px;
    }
    .cur-tip,.logout-box{
      font-weight:bold;
      color:rgba(168,237,243,1);
      background-repeat: no-repeat;
      background-size:100% 100%;
      width:13%;
      height:92px;
      line-height: 92px;
      box-sizing: border-box;
    }
    .cur-tip{
      padding-left: 2%;
      background-image:url('../../../../../static/image/digitalPark/yd_header_left.png');
    }
    .logout-box{
      text-align: right;
      padding-right:2%;
      font-size: 24px;
      background-image:url('../../../../../static/image/digitalPark/yd_header_right.png');
      .news{
        color:#FFBB04;
      }
      .logout{
        margin-left: 20%;
        color:#c9c9c9;
      }
      .news-icon,.logout-icon{
        font-size: 24px;
        margin-right: 10px;
      }
    }
    .tip-icon{
      font-size: 30px;
      margin-right: 10px;
    }
  }

</style>
