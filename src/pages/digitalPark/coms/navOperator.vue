<template>
  <div class="digital-nav-operator flex-align" v-if="!isydScreen">
    <span class="nav-right-item long-text" v-if="showGoBack" @click="onClickGoBack">
      <span style="color:#008DEA">
        <i class="iconfont iconshouye"></i>&nbsp;返回首页
      </span>
      <el-divider direction="vertical"></el-divider>
    </span>
    <!--<span class="nav-right-item" :class="moduleType==1?'dashboard-nav':''" v-if="!showGoBack">-->
    <!--<el-select v-model="langValue" placeholder="切换语言" @change="onClickChangeLang">-->
    <!--<el-option label="中文" value="zh"></el-option>-->
    <!--<el-option label="English" value="en"></el-option>-->
    <!--</el-select><el-divider direction="vertical"></el-divider>-->
    <!--</span>-->
    <span class="nav-right-item">
      <!--<el-badge class="nav-news" :max="99" :value="alarmListCount" @click.native="loadNews">-->
      <!--<i class="el-icon-message-solid"></i>-->
      <!--</el-badge>-->
       <span @click="loadNews" style="color:#ED6C01">{{$t('homeHeader.news')}}({{alarmListCount}})</span>
      <el-divider direction="vertical"></el-divider>
    </span>
    <span class="nav-right-item" :class="moduleType==1?'dashboard-nav':''"
          v-if="!showGoBack && fromFlag!=2"
    >
      <el-select v-model="myModuleType" placeholder="切换模式" @change="onClickChangeModel">
        <el-option :label="$t('homeHeader.waterfall')" value="2"></el-option>
        <el-option :label="$t('homeHeader.dashboard')" value="1"></el-option>
      </el-select>
      <el-divider direction="vertical"></el-divider>
    </span>
    <span class="nav-right-item" :class="moduleType==1?'dashboard-nav':''" v-if="!showGoBack">
      <el-select
        v-model="setupValue"
        placeholder="设置"
        @change="onClickSetup"
        class="{'large-select':fromFlag==2}"
      >
        <el-option :label="$t('homeHeader.setup')" value="0" hidden></el-option>
        <el-option
          :label="$t('homeHeader.moduleConfig')"
          value="1"
          :class="{'large-item':fromFlag==2}"
          v-if="!(iszg || isyd)"
        ></el-option>
        <el-option
          :label="$t('homeHeader.personalCenter')"
          value="2"
          :class="{'large-item':fromFlag==2}"
        ></el-option>
        <el-option
          :label="$t('homeHeader.changePassword')"
          value="3"
          :class="{'large-item':fromFlag==2}"
        ></el-option>
        <!--<el-option :label="$t('homeHeader.skin')" value="2"></el-option>-->
      </el-select>
      <el-divider direction="vertical"></el-divider>
    </span>
    <span class="nav-right-item" :class="moduleType==1?'dashboard-nav':''">
      <el-dropdown @command="onClickUserConfigure">
        <div class="flex-align user-config hover-pointer">
          <div class="user-name">{{userInfo.name}}</div>
          <img class="avatar-img" :src="userInfo.headUrl" alt />
        </div>
        <el-dropdown-menu slot="dropdown" :class="{'large-dropdown':fromFlag==2}">
          <el-dropdown-item
            command="1"
            :class="{'large-item':fromFlag==2}"
          >{{$t('homeHeader.personalCenter')}}</el-dropdown-item>
          <el-dropdown-item
            command="2"
            :class="{'large-item':fromFlag==2}"
          >{{$t('homeHeader.changePassword')}}</el-dropdown-item>
          <el-dropdown-item
            command="3"
            :class="{'large-item':fromFlag==2}"
          >{{$t('homeHeader.signOut')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>
  </div>
</template>

<script>
import SystemManageApi from "@/service/api/systemManage";
import CommonApi from "@/service/api/common";
import { mapState } from "vuex";
import CommonFun from '@/utils/commonFun'
import { IsCZClient } from '@/utils/auth';
import {isYDScreen,isZG,isYD} from "@/utils/project";

export default {
  name: "DigitalNavOperator",
  components: {},
  props: ["moduleType", "showGoBack", "fromFlag"],  //fromFlag 1：仪表盘 2: 大屏
  data() {
    return {
      langValue: Cookies.get("lang") || "zh",
      userValue: "0",
      setupValue: "0",
      // userInfo: {},
      avatar: "../../../../static/image/digitalPark/default_avatar.png",
      alarmListCount: 0
    };
  },
  computed: {
    ...mapState({
      updateUserInfo: state => state.digitalPark.updateUserInfo,
      userInfo: state => state.user.userInfo
    }),
    myModuleType: {
      set() {
        this.onClickChangeModel();
      },
      get() {
        return this.moduleType;
      }
    },
    cookieModuleType() {
      return this.moduleType || Cookies.get('moduleType')
    },
    isyd(){
      return isYD()
    },
    iszg(){
      return isZG()
    },
    isydScreen(){
       return isYDScreen()
    }
  },
  watch: {
    /* updateUserInfo() {
      if (this.updateUserInfo) {
        this.getUserInfo();
      }
    } */
  },
  methods: {
    onClickChangeModel(val) {
      Cookies.set('moduleType', val)
      if (val == 1) {
        this.$router.replace("/digitalPark/dashboardHomePage");
      } else {
        this.$router.replace("/digitalPark/homePage");
      }
    },
    onClickChangeLang(val) {
      this.$i18n.locale = val;
      Cookies.set("lang", val);
      this.$parent.handleLangChange && this.$parent.handleLangChange();
    },
    async onClickUserConfigure(val) { //点击用户
      Cookies.set('moduleType', this.cookieModuleType)
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
          this.$router.push("/personalInformation")
        } else if (val == 2) {
          this.$store.commit("digitalPark/activeMenuIndex", "/modifyPassword")
          this.$router.push("/modifyPassword")
        }
      }
    },
    onClickSetup(val) { //点击设置
      Cookies.set('moduleType', this.cookieModuleType)
      if (val == 1) {
        let type = this.moduleType
        if (this.fromFlag == 2) {
          type = 3
        }
        this.$router.push(
          `/digitalPark/moduleConfigure?type=${type}&updateDragFlag=true`
        );
      } else {
        this.setSystemMenu()
        if (val == 2) {
          this.$store.commit("digitalPark/activeMenuIndex", "/personalInformation")
          this.$router.push("/personalInformation")
        } else if (val == 3) {
          this.$store.commit("digitalPark/activeMenuIndex", "/modifyPassword")
          this.$router.push("/modifyPassword")
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
      // localStorage.setItem("menuList", JSON.stringify(secondLevelTree));
      this.$store.commit("digitalPark/menuList", secondLevelTree)
    },
    onClickGoBack() { //点击返回首页
      if (Cookies.get("moduleType") == 2) {
        this.$router.push("/digitalPark/homePage");
      } else {
        this.$router.push("/digitalPark/dashboardHomePage");
      }
      this.$store.commit("digitalPark/activeMenuIndex", "")
    },
    /* async getUserInfo() {
      let res = await SystemManageApi.getUserInfo();
      this.userInfo = res
      localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
      this.$store.commit("digitalPark/updateUserInfo", false);
      this.setUserInfo(res)
    }, */
    loadNews() {  //点击消息
      Cookies.set('moduleType', this.cookieModuleType)
      // loadNews TODO
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
      if (this.fromFlag == 2) {
        this.$store.commit("digitalPark/largeScreenIframeSrc",
          window.top.location.origin + '/#/vibe-web?updateId=' + _.uniqueId())
      } else {
        this.$store.commit("digitalPark/activeMenuIndex", '@/html/alarm/alarm_index.html')
        this.$router.push("/vibe-web");
      }

    },
    goToWebPage(item, obj) {
      //如果只有第一个参数，渲染的menu就是此对象的childNode；
      //如果有第二个参数,渲染的menu就是当前点击的子菜单所在的二级菜单，obj为当前点击的子菜单
      item = JSON.parse(item)
      let curMenu = item
      if (obj) {
        obj = JSON.parse(obj)
        if(!(obj.name=="概览" && obj.clientType==1)){
          curMenu = obj
        }
      }
      // console.log("item",item,obj,curMenu)
      // console.log("itemfanfeifei", item)
      this.$store.commit("digitalPark/menuList", item)
      CommonFun.loadPage(curMenu)
    },
    async getAlarmList() {
      let res = await CommonApi.getAlarmMessageList({
        pageNum: 1,
        start: '',
        end: '',
        pageCount: 10,
      })
      this.alarmListCount = res.total>99?'99+':res.total
    }
  },
  created() {
    var twoSum = function(nums, target) {
      let arr = []
      for(let i=0;i<nums.length;i++){
        let tmp = nums.slice(i+1).findIndex((obj)=>{
          return nums[i]+obj==target
        })
        if(tmp!=-1){
          arr=[i,tmp+i+1]
          return arr
        }
      }
      return []
    };
  },
  mounted() {
    this.getAlarmList();
    window.CZClient = {
      goToPersonal: this.onClickUserConfigure,  //跳转个人中心
      goBack: this.onClickGoBack,    //返回首页
      goToWebPage: this.goToWebPage,
    }
  }
};
</script>


<style lang="less">
.digital-nav-operator {
  font-size: 14px;
  .nav-right-item {
    span {
      width: 90px;
      display: inline-block;
      text-align: center;
      &:hover {
        cursor: pointer;
      }
    }
    .el-input__inner {
      border: none;
      // padding-right: 5px;
      background: none;
      text-align: center;
      font-size: 14px;
    }
    .el-input__suffix,
    .el-input__suffix-inner {
      padding: 0;
    }
    .el-select {
      width: 120px;
    }
    .el-input__suffix {
      right: -15px;
    }
    .nav-news {
      margin: 0 25px;
      font-size: 18px;
      cursor: pointer;
      color: @mainBgColor;
      &:hover {
        color: @secondaryColor;
      }
    }
  }
  .dashboard-nav {
    .el-input__inner {
      color: @white;
    }
    .user-name {
      color: @white;
    }
  }
  .long-text span {
    width: 120px;
  }
  .user-config {
    margin-left: 15px;
  }
  .avatar-img {
    width: 30px;
    height: 30px;
    display: block;
    background: #dbdbdb;
    border-radius: 50%;
    margin-left: 10px;
  }
}
@media screen and (min-width: 1280px) and(max-width: 1415px) {
  .digital-nav-operator .nav-right-item {
    .el-select {
      width: 90px;
    }
    .el-input__suffix {
      right: -25px;
    }
  }
}
.large-select,
.large-dropdown {
  width: 200px;
}
.large-item {
  font-size: 30px;
  margin-bottom: 20px;
  text-align: center;
}
</style>
