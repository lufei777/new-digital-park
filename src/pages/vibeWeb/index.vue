<template>
  <div class="common-index-layout">
    <div :class="menuConfig.isCollapse?'collapse-my-el-menu':'unfold-my-el-menu'">
      <Sidebar :menu-list="menuList" :menu-config="menuConfig" />
    </div>
    <div
      :class="[menuConfig.isCollapse?'collapse-right-content':'unfold-right-content','right-content']"
    >
      <div
        :class="[menuConfig.isCollapse?'collapse-right-content-header':'unfold-right-content-header','right-content-header']"
      >
        <div class="flex-align asset-bread-crumb">
          <i
            :class="menuConfig.isCollapse?'iconzhankai':'iconshouqi'"
            class="iconfont collapse-icon hover-pointer"
            @click="onClickCollapseBtn"
          ></i>
        </div>
        <div class="asset-nav-operator-box">
          <NavOperator class="asset-nav-operator" :showGoback="true" />
        </div>
      </div>
      <myIframe :iframeConfig="iframeConfig" class="router-view"></myIframe>
    </div>
  </div>
</template>

<script>
import Sidebar from "./menu/SideBar";
import NavOperator from "../digitalPark/coms/navOperator";
import myIframe from "./iframe";

export default {
  name: "CommonIndexLayout",
  components: {
    Sidebar,
    NavOperator,
    myIframe
  },
  data() {
    let _this = this;
    let menuList = JSON.parse(localStorage.getItem("menuList"));
    let show_menu = localStorage.getItem("show_menu");

    return {
      iframeConfig: {
        src: show_menu.split("@")[1]
      },
      menuList: menuList,
      menuConfig: {
        bgColor: "#394562",
        textColor: "#B7BAC4",
        isCollapse: false,
        activeIndex: show_menu.substring(show_menu.indexOf("@")),
        moduleName: menuList.name,
        moduleLogo: "iconnengyuanguanli",
        handleSelect(key, keyPath, curDom) {
          _this.handleSelect(key, keyPath, curDom);
        },
        handleOpen(key, keyPath) {
          // _this.handleOpen(key, keyPath);
        },
        handleClose(...args) {
          _this.handleClose(args);
        }
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    onClickNav(item) {
      this.$router.push(item.path);
    },
    handleOpen(key) {
      this.$router.push(key);
    },
    handleClose(key) {
      this.$router.push(key);
    },
    onClickCollapseBtn() {
      this.menuConfig.isCollapse = !this.menuConfig.isCollapse;
      this.$store.commit(
        "digitalPark/menuIsCollapse",
        this.menuConfig.isCollapse
      );
    },
    handleSelect(index, indexPath) {
      console.log(index, indexPath);
      if (index && index != 2) {
        this.$router.push(index);
      }
    },
    handleSelect(key, keyPath, curDom) {
      this.loadPage(key, keyPath);
    },
    handleOpen(key, keyPath) {
      this.loadPage(key, keyPath);
    },
    handleClose(...args) {
      console.log("handleClose", args);
    },
    loadPage(key, keyPath) {
      // 如果key没有值，则默认keyPath第一个
      if (key.length === 0) {
        key = keyPath[0];
        if (keyPath.length > 1 && keyPath[1].length != 0) {
          key =
            keyPath[0].substring(0, keyPath[0].lastIndexOf("/")) + keyPath[1];
        }
      }
      key = key.replace("@", "");

      this.iframeConfig.src = key;
    }
  },
  mounted() {}
};
</script>

<style lang="less">
.common-index-layout {
  height: 100%;
  background-color: #efefef;
  .unfold-my-el-menu,
  .collapse-my-el-menu {
    float: left;
    height: 100%;
    /*width:15%;*/
    background-color: #394562;
    position: fixed;
    width: 250px;
    overflow-y: auto;
    overflow-x: unset;
    z-index: 999999999;
  }
  .collapse-my-el-menu {
    width: 80px;
  }
  .unfold-right-content,
  .collapse-right-content {
    max-width: 100%;
    /*height:100%;*/
    overflow: auto;
    background-color: #efefef;
    margin-left: 250px;
  }
  .collapse-right-content {
    margin-left: 80px;
  }
  .unfold-right-content-header,
  .collapse-right-content-header {
    padding: 0 20px;
    height: 70px;
    background-color: @white;
    position: fixed;
    /*width:100%;*/
    box-sizing: border-box;
    z-index: 99;
    overflow: hidden;
    left: 250px;
    right: 0;
  }
  .right-content-header {
    box-shadow: 0 0 20px #ccc;
  }
  .collapse-right-content-header {
    left: 80px;
  }
  .asset-bread-crumb {
    float: left;
    width: 60%;
    box-sizing: border-box;
  }
  .collapse-icon {
    font-size: 24px;
    line-height: 60px;
    padding-right: 20px;
    color: #969ca8;
    float: left;
  }
  .router-view {
    padding: 20px;
    margin-top: 70px;
    overflow: hidden;
  }
  .asset-nav-operator-box {
    /*flex-grow: 1;*/
    float: right;
    width: 40%;
    line-height: 70px;
  }
  .asset-nav-operator {
    float: right;
  }
  .el-menu {
    border-right: none;
  }
  .el-submenu__title,
  .el-menu-item {
    /*font-size: 18px;*/
    &:hover {
      background-color: #008dea !important;
      color: @white !important;
      i {
        color: @white;
      }
    }
  }
  .nest-menu {
    /*font-size: 16px;*/
  }
  .el-menu-item.is-active {
    background-color: #008dea !important;
    color: @white;
  }
  .el-submenu.is-active {
    background-color: #008dea !important;
    color: @white;
  }
  .el-scrollbar__view {
    height: unset !important;
  }
}
</style>
