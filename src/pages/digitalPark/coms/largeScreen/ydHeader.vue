<template>
  <div class="yd-header flex-align-between">
    <div class="cur-tip" @click="onClickCurTip">
      <i class="iconfont icongailan tip-icon"></i>{{curTip}}
    </div>
    <div class="header-name">
      <i class="iconfont iconyidianchengLOGO park-logo"></i>
      <span>{{headName}}</span>
    </div>
    <div class="logout-box">
      <span class="news" @click="loadNews">
        <i class="iconfont iconlingdang news-icon"></i>{{$t('homeHeader.news')}}({{alarmListCount}})
      </span>
      <span class="logout" @click="onClickLogoutBtn">
        <i class="iconfont iconguanbi logout-icon"></i>退出
      </span>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {isZG} from '@/utils/project';
  import { IsCZClient } from '@/utils/auth';
  import CommonLargeHeader from './js/header'
  export default {
    name: 'YDHeader',
    components: {},
    props: [],
    data() {
      return {
        headName: '伊甸城BIM运管平台',
        curDate: moment().format('YYYY年MM月DD日'),
        alarmListCount: 0,
        curTip: '总体概览'
      }
    },
    computed: {
      ...mapState({
        largeScreenIframeSrc:state=>state.digitalPark.largeScreenIframeSrc
      })
    },
    watch: {
      largeScreenIframeSrc(){
        if(this.largeScreenIframeSrc){
          this.curTip='返回总体概览'
        }else{
          this.curTip='总体概览'
        }
      }
    },
    methods: {
      onClickCurTip(){
        if(this.curTip=='返回总体概览'){
          this.$store.commit("digitalPark/largeScreenIframeSrc","")
        }
      },
      onClickLogoutBtn(){
        CommonLargeHeader.onClickLogoutBtn()
      },
      loadNews() {  //点击消息
        CommonLargeHeader.loadNews('ydHeader')
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
      }
    },
    mounted() {
      this.getAlarmList()
      window.CZClient = {
        goToPersonal: this.onClickUserConfigure,  //跳转个人中心
        // goBack: this.onClickGoBack,    //返回首页
        goToWebPage: this.goToWebPage,
      }
    }
  }
</script>

<style lang="less">
  .yd-header {
    padding: 0 35px;
    height: @largeScreenHeaderHeight;
    line-height: @largeScreenHeaderHeight;
    box-sizing: border-box;

    .header-name {
      font-weight: bold;
      width: 30%;
      text-align: center;
      background-image: url('../../../../../static/image/digitalPark/yd_header_title.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
      font-size: 60px;

      span {
        color: rgba(255, 255, 255, 1);
        /*background: linear-gradient(0deg, rgba(1, 234, 254, 1) 0%, rgba(255, 255, 255, 1) 100%);*/
        /*-webkit-background-clip: text;*/
        /*-webkit-text-fill-color: transparent;*/
      }
    }

    .park-logo {
      font-size: 60px;
    }

    .cur-tip, .logout-box {
      font-weight: bold;
      color: rgba(168, 237, 243, 1);
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 13%;
      height: 92px;
      line-height: 92px;
      box-sizing: border-box;
    }

    .cur-tip {
      padding-left: 2%;
      background-image: url('../../../../../static/image/digitalPark/yd_header_left.png');
    }

    .logout-box {
      text-align: right;
      padding-right: 2%;
      font-size: 24px;
      background-image: url('../../../../../static/image/digitalPark/yd_header_right.png');

      .news {
        color: #FFBB04;
      }

      .logout {
        margin-left: 20%;
        color: #c9c9c9;
      }

      .news-icon, .logout-icon {
        font-size: 24px;
        margin-right: 10px;
      }
    }

    .tip-icon {
      font-size: 30px;
      margin-right: 10px;
    }
  }
  @media screen and (max-width: 1920px) {
    .yd-header {
      padding: 0 35px;
      height: 60px;
      line-height: 60px;
      box-sizing: border-box;
      .header-name {
        font-size: 28px;
      }
      .cur-tip, .logout-box {
        height:50px;
        line-height: 50px;
        box-sizing: border-box;
        font-size: 18px;
      }
      .logout-box {
        padding-right: 2%;
        font-size:16px;
        .news-icon, .logout-icon {
          font-size: 16px;
          margin-right: 10px;
        }
      }
      .tip-icon {
        font-size: 18px;
      }
      .park-logo {
        font-size: 40px;
      }
    }
  }
</style>
