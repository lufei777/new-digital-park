<template>
  <div class="yd-header flex-align-between">
    <div class="cur-tip" @click="onClickCurTip">
      <i class="iconfont icongailan tip-icon"></i>{{curTip}}
    </div>
    <div class="header-name">
      <!--<i class="iconfont iconshuziyuanqu park-logo"></i>-->
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
  import CommonFun from '@/utils/commonFun'
  export default {
    name: 'YDHeader',
    components: {},
    props: [], //fromFlag 1：仪表盘 2:大屏
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
        if (IsCZClient()) {
          goBackClientLogin();
        }
        this.$store.dispatch('user/logout').then(() => {
          this.$router.push("/login");
        })
      },
      loadNews() {  //点击消息
        localStorage.setItem(
          "menuList",
          JSON.stringify({
            name: "消息管理",
            childNode: [
              {
                id: '1',
                name: "预警报警列表",
                routeAddress: "@/html/alarm/alarm_index.html"
              }
            ]
          })
        );
        this.$store.commit("digitalPark/largeScreenIframeSrc",
            window.top.location.origin + '/#/vibe-web?updateId=' + _.uniqueId())
      },
      goToWebPage(item, obj) {
        // console.log("back",item,obj)
        //如果只有第一个参数，渲染的menu就是此对象的childNode；
        //如果有第二个参数,渲染的menu就是当前点击的子菜单所在的二级菜单，obj为当前点击的子菜单
        item = JSON.parse(item)
        let curMenu = item
        if (obj) {
          obj = JSON.parse(obj)
          curMenu = obj
        }
        this.$store.commit("digitalPark/menuList", item)
        this.$store.commit('digitalPark/activeMenuIndex',CommonFun.setMenuIndex(item))
        if(curMenu.routeAddress.indexOf('@')!=-1){
          this.$store.commit("digitalPark/largeScreenIframeSrc",
            window.top.location.origin+'/#/vibe-web?updateId='+_.uniqueId())
        }else{
          this.$store.commit("digitalPark/largeScreenIframeSrc",window.top.location.origin+'/#'+item.routeAddress)
        }
      },
      async onClickUserConfigure(val) { //点击用户
        if (val == 3) {
          //如果是客户端
          if (IsCZClient()) {
            goBackClientLogin();
          }
          this.$store.dispatch('user/logout').then(() => {
            this.$router.push("/login");
          })
          // 清空菜单列表
          this.$store.commit("digitalPark/activeMenuIndex", "");
        } else {
          this.setSystemMenu()
          if (val == 1) {
            this.$store.commit("digitalPark/activeMenuIndex", "/personalInformation")
            this.$store.commit("digitalPark/largeScreenIframeSrc",window.top.location.origin+'/#'+'/personalInformation')
          } else if (val == 2) {
            this.$store.commit("digitalPark/activeMenuIndex", "/modifyPassword")
            this.$store.commit("digitalPark/largeScreenIframeSrc",window.top.location.origin+'/#'+'/modifyPassword')
          }
        }
      },
      setSystemMenu() {
        let menuTree = JSON.parse(localStorage.getItem("menuTree"));
        let firstLevelTree = menuTree[0].childNode.find(
          item => item.name == "基础功能"
        );
        let secondLevelTree = firstLevelTree.childNode.find(
          item => item.name == "系统管理"
        );
        this.$store.commit("digitalPark/menuList", secondLevelTree)
      },
    },
    mounted() {
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
        background: linear-gradient(0deg, rgba(1, 234, 254, 1) 0%, rgba(255, 255, 255, 1) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    .park-logo {
      font-size: 64px;
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
    }
  }
</style>
