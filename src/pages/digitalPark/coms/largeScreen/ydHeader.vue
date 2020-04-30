<template>
    <div class="yd-header flex">
      <div class="cur-date">{{curDate}}</div>
      <div class="header-name">
        <i class="iconfont iconshuziyuanqu park-logo"></i>
        <span>{{headName}}</span>
      </div>
      <div class="logout-box">
        <span style="color:#ED6C01">{{$t('homeHeader.news')}}({{alarmListCount}})</span>
        <i class="iconfont iconguanbi logout-logo"></i>
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
        alarmListCount:0
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
    width:70%;
    height:160px;
    margin:0 auto;
    line-height: 160px;
    text-align: center;
    background: rgba(0,0,0,0.58);
  }
  .header-name{
    font-size: 64px;
    font-weight:bold;
    color:rgba(255,255,255,1);
    background:linear-gradient(0deg,rgba(184,237,249,1) 0%, rgba(255,255,255,1) 100%);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
    width:70%;
  }

  .park-logo{
    font-size: 64px;
  }

  .logout-logo{
    font-size: 36px;
    margin-left: 40px;
  }
  .cur-date,.logout-box{
    width:15%;
    text-align: center;
  }
</style>
