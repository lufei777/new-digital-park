<template>
  <div class="digital-nav-operator flex-align">
    <span class="nav-right-item long-text" v-if="showGoback" @click="onClickGoBack">
      <span style="color:#008DEA">
        <i class="iconfont iconshouye"></i>&nbsp;返回首页
      </span>
      <i>|</i>
    </span>
    <span class="nav-right-item">
      <span @click="loadNews" style="color:#ED6C01">{{$t('homeHeader.news')}}</span>
      <i>|</i>
    </span>
    <!--<span class="nav-right-item" :class="moduleType==1?'dashboard-nav':''" v-if="!showGoback">-->
    <!--<el-select v-model="langValue" placeholder="切换语言" @change="onClickChangeLang">-->
    <!--<el-option label="中文" value="zh"></el-option>-->
    <!--<el-option label="English" value="en"></el-option>-->
    <!--</el-select><i>|</i>-->
    <!--</span>-->
    <span class="nav-right-item" :class="moduleType==1?'dashboard-nav':''" v-if="!showGoback">
      <el-select v-model="myModuleType" placeholder="切换模式" @change="onClickChangeModel">
        <el-option :label="$t('homeHeader.waterfall')" value="2"></el-option>
        <el-option :label="$t('homeHeader.dashboard')" value="1"></el-option>
      </el-select>
      <i>|</i>
    </span>
    <span class="nav-right-item" :class="moduleType==1?'dashboard-nav':''" v-if="!showGoback">
      <el-select v-model="setupValue" placeholder="设置" @change="onClickSetup">
        <el-option :label="$t('homeHeader.setup')" value="0" hidden></el-option>
        <el-option :label="$t('homeHeader.moduleConfig')" value="1"></el-option>
        <el-option :label="$t('homeHeader.personalCenter')" value="2"></el-option>
        <el-option :label="$t('homeHeader.changePassword')" value="3"></el-option>
        <!--<el-option :label="$t('homeHeader.skin')" value="2"></el-option>-->
      </el-select>
      <i>|</i>
    </span>
    <span class="nav-right-item" :class="moduleType==1?'dashboard-nav':''">
      <el-dropdown @command="onClickUserConfigure">
        <div class="flex-align user-config hover-pointer">
          <div class="user-name">{{userInfo.fullName}}</div>
          <img class="avatar-img" :src="userInfo.headUrl" alt />
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="1">{{$t('homeHeader.personalCenter')}}</el-dropdown-item>
          <el-dropdown-item command="2">{{$t('homeHeader.changePassword')}}</el-dropdown-item>
          <el-dropdown-item command="3">{{$t('homeHeader.signOut')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </span>
    <!--<span class="nav-right-item user-config" :class="moduleType==1?'dashboard-nav':''">-->
    <!--<el-select v-model="userValue" placeholder="" @change="onClickUserConfigure">-->
    <!--<el-option :label="userInfo.fullName" value="0" hidden></el-option>-->
    <!--<el-option :label="$t('homeHeader.personalCenter')" value="1"></el-option>-->
    <!--<el-option :label="$t('homeHeader.changePassword')" value="2"></el-option>-->
    <!--<el-option :label="$t('homeHeader.signOut')" value="3"></el-option>-->
    <!--</el-select>-->
    <!--<img class="avatar-img" src="../../../../static/image/digitalPark/default_avatar.png" alt="">-->
    <!--</span>-->
  </div>
</template>

<script>
import DigitalParkApi from "../../../service/api/digitalParkApi";
import { mapState } from "vuex";

export default {
  name: "DigitalNavOperator",
  components: {},
  props: ["moduleType", "showGoback"],
  data() {
    return {
      langValue: Cookies.get("lang") || "zh",
      userValue: "0",
      setupValue: "0",
      userInfo: {},
      avatar: "../../../../static/image/digitalPark/default_avatar.png"
    };
  },
  computed: {
    myModuleType: {
      set() {
        this.onClickChangeModel();
      },
      get() {
        return this.moduleType;
      }
    },
    ...mapState({
      updateUserInfo: state => state.digitalPark.updateUserInfo
    })
  },
  watch: {
    updateUserInfo() {
      if (this.updateUserInfo) {
        this.getUserInfo();
      }
    }
  },
  methods: {
    onClickChangeModel(val) {
      // this.$parent.changeModel(val)
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
    async onClickUserConfigure(val) {
      if (val == 3) {
        if (Cookies.get("_3DClient")) {
          //如果是客户端
          window.goBackClientLogin();
        } else {
          sessionStorage.removeItem("token");
          await DigitalParkApi.logOut();
          this.$router.push("/login");
        }
      } else {
        let menuTree = JSON.parse(localStorage.getItem("menuTree"));
        let firstLevelTree = menuTree[0].childNode.find(
          item => item.name == "基础功能"
        );
        let secondLevelTree = firstLevelTree.childNode.find(
          item => item.name == "系统管理"
        );
        localStorage.setItem("menuList", JSON.stringify(secondLevelTree));
        let thirdLevelTree = secondLevelTree.childNode.find(
          item => item.name == "个人中心"
        );
        if (val == 1) {
          this.$router.push("/personalInformation");
          Cookies.set(
            "activeMenuIndex",
            `${thirdLevelTree.childNode[0].id}/personalInformation`
          );
        } else if (val == 2) {
          this.$router.push("/modifyPassword");
          Cookies.set(
            "activeMenuIndex",
            `${thirdLevelTree.childNode[1].id}/modifyPassword`
          );
        }
      }
      this.userValue = "0";
    },
    onClickSetup(val) {
      if (val == 1) {
        this.$router.push(
          `/digitalPark/moduleConfigure?type=${this.moduleType}&updateDragFlag=true`
        );
      } else {
        let menuTree = JSON.parse(localStorage.getItem("menuTree"));
        let firstLevelTree = menuTree[0].childNode.find(item => item.name == "基础功能");
        let secondLevelTree = firstLevelTree.childNode.find(item => item.name == "系统管理");
        localStorage.setItem("menuList", JSON.stringify(secondLevelTree));
        let thirdLevelTree = secondLevelTree.childNode.find(
          item => item.name == "个人中心"
        );
        if (val == 2) {
          this.$router.push("/personalInformation");
          Cookies.set(
            "activeMenuIndex",
            `${thirdLevelTree.childNode[0].id}/personalInformation`
          );
        } else if (val == 3) {
          this.$router.push("/modifyPassword");
          Cookies.set(
            "activeMenuIndex",
            `${thirdLevelTree.childNode[1].id}/modifyPassword`
          );
        }
        this.setupValue = "0";
      }
    },
    onClickGoBack() {
      if (Cookies.get("moduleType") == 2) {
        this.$router.push("/digitalPark/homePage");
      } else {
        this.$router.push("/digitalPark/dashboardHomePage");
      }
      Cookies.remove("activeMenuIndex");
    },
    async getUserInfo() {
      this.userInfo = await DigitalParkApi.getUserInfo();
      localStorage.setItem("userInfo", JSON.stringify(this.userInfo));
      this.$store.commit("digitalPark/updateUserInfo", false);
    },
    loadNews() {
      // loadNews TODO
      this.$router.push({ name: "warningAlarmList" });
    }
  },
  mounted() {
    this.getUserInfo();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
</style>
