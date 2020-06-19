<template>
  <div class="norbulingka-header">
    <div class="header-name flex-align-center">
      <img class="park-logo"
           src="../../../../../static/image/digitalPark/nor_logo.png"/>
      <span>{{headName}}</span>
    </div>
    <div class="logout-box">
       <span class="cur-date">{{curDate}}</span>
      <span class="news hover-pointer" @click="loadNews">
        <i class="iconfont iconlingdang news-icon"></i>{{$t('homeHeader.news')}}({{alarmListCount}})
      </span>
      <span class="logout hover-pointer" @click="onClickLogoutBtn">
        <i class="iconfont iconguanbi logout-icon"></i>退出
      </span>
    </div>
  </div>
</template>

<script>
  import { isZG } from '@/utils/project';
  import { IsCZClient } from '@/utils/auth';
  import CommonLargeHeader from './js/header'
  export default {
    name: 'NorbulingkaHeader',
    components: {},
    props: [], 
    data() {
      return {
        headName: '罗布林卡世界文化遗产监测预警平台',
        curDate: '',
        alarmListCount: 0,
        timer:''
      }
    },
    computed: {
    },
    watch: {
    },
    methods: {
      onClickLogoutBtn(){
        CommonLargeHeader.onClickLogoutBtn()
      },
      loadNews() {  //点击消息
        CommonLargeHeader.loadNews()
      },
      goToWebPage(item, obj) {
        CommonLargeHeader.goToWebPage(item, obj)
      },
      async onClickUserConfigure(val) { //点击用户
        CommonLargeHeader.onClickUserConfigure(val)
      },
       async getAlarmList() {
        let res = await CommonLargeHeader.getAlarmList()
        this.alarmListCount = res
      },
      setCurDate(){
        this.timer = setInterval(() => {
          this.curDate =moment().format('YYYY年MM月DD日 HH:mm:ss'); // 修改数据date
        }, 1000)
      }
    },
    mounted() {
      this.getAlarmList()
      this.setCurDate()
      window.CZClient = {
        goToPersonal: this.onClickUserConfigure,  //跳转个人中心
        // goBack: this.onClickGoBack,    //返回首页
        goToWebPage: this.goToWebPage,
      }
    },
    beforeDestroy() {
      if (this.timer) {
        clearInterval(this.timer);
      }
    }
  }
</script>

<style lang="less">
  .norbulingka-header {
    padding: 0 20px;
    height:@largeScreenHeaderHeight;
    box-sizing: border-box;
    background-image: url("../../../../../static/image/digitalPark/nor_header.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    .header-name {
      font-weight: bold;
      width: 50%;
      text-align: center;
      font-size: @norbulingkaHeaderSize;
      margin-left:25%;
      line-height: @largeScreenHeaderHeight;
      span {
        color: @white;
      }
    }

    .park-logo {
      font-size: 36px;
      margin-right: 5px;
    }

    .logout-box {

      font-size: 16px;
      width:25%;
      color: @white;
      box-sizing: border-box;
      position: absolute;
      right:20px;
      bottom:10%;
    }

    .logout-box {
      text-align: right;

      .cur-date{
         margin-right: 40px;
      }

      .news {
        color: #FF8400;
      }

      .logout {
        margin-left: 40px;
      }

      .news-icon, .logout-icon {
        font-size: 16px;
        margin-right: 5px;
      }
    }

    .tip-icon {
      font-size: 30px;
      margin-right: 10px;
    }
  }
  @media screen and (max-width: 1920px) {
    /*.yd-header {*/
      /*padding: 0 35px;*/
      /*height: 60px;*/
      /*line-height: 60px;*/
      /*box-sizing: border-box;*/
      /*.header-name {*/
        /*font-size: 28px;*/
      /*}*/
      /*.cur-tip, .logout-box {*/
        /*height:50px;*/
        /*line-height: 50px;*/
        /*box-sizing: border-box;*/
        /*font-size: 18px;*/
      /*}*/
      /*.logout-box {*/
        /*padding-right: 2%;*/
        /*font-size:16px;*/
        /*.news-icon, .logout-icon {*/
          /*font-size: 16px;*/
          /*margin-right: 10px;*/
        /*}*/
      /*}*/
      /*.tip-icon {*/
        /*font-size: 18px;*/
      /*}*/
    /*}*/
  }
</style>
