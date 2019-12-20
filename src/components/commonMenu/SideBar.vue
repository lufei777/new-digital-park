<template>
  <el-scrollbar wrap-class="scrollbar-wrapper" :native="false">
    <div class="common-menu">
      <div v-show="!menuConfig.isCollapse" class="title flex-align" v-if="!menuConfig.specialRoute">
        <i :class="['iconfont',menuConfig.moduleLogo]"></i>
        <span>&nbsp;&nbsp;{{menuConfig.moduleName}}</span>
      </div>
      <el-tooltip
        v-show="menuConfig.isCollapse"
        effect="dark"
        :content="menuConfig.moduleName"
        placement="right-start"
      >
        <div class="title">
          <i :class="['iconfont',menuConfig.moduleLogo ,'hover-pointer']"></i>
        </div>
      </el-tooltip>
      <el-menu
        class="el-menu-demo"
        :default-active="activeMenuIndex"
        :mode="menuConfig.mode"
        :background-color="menuConfig.bgColor"
        :text-color="menuConfig.textColor"
        :unique-opened="true"
        :active-text-color="menuConfig.activeTextColor"
        :collapse="menuConfig.isCollapse"
        @select="handleSelect"
        @open="handleOpen"
        @close="handleClose"
      >
        <sidebar-item
          v-for="menu in menuList"
          :key="menu.id"
          :item="menu"
          :specialRoute="menuConfig.specialRoute"
          :menuList="menuList"
        />
      </el-menu>
      <div v-if="!menuConfig.specialRoute">
        <div class="iconfont iconkuaijierukou hover-pointer shortcut-btn" @click="onClickShortcutBtn"></div>
        <ul class="shortcut-list" v-show="showShortcutList">
          <li v-for="(item,index) in shortCutList" :key="index">{{item.name}}</li>
        </ul>
      </div>

    </div>
  </el-scrollbar>
</template>
<script>
import commonFun from "@/utils/commonFun";
import SidebarItem from "./SidebarItem";
import DigitalParkApi from "../../service/api/digitalParkApi";
export default {
  name: "Sidebar",
  components: { SidebarItem },
  props: {
    menuList: {
      type: Array,
      required: false
    },
    menuConfig: {}
  },
  data() {
    return {
      shortCutList: [],
      showShortcutList: false
    };
  },
  computed: {
    isCollapse() {
      return this.menuConfig.isCollapse;
    },
    activeMenuIndex() {
      //当前激活的菜单，顺序是cookie拿到的、父级传递的、默认的父级没传时使用菜单第一个
      return this.menuConfig.specialRoute
        ? ""
        : Cookies.get("activeMenuIndex") ||
            this.menuConfig.activeIndex ||
            this.menuList[0].id+this.menuList[0].routeAddress;
    }
  },
  watch: {
    isCollapse() {
      if (this.isCollapse) {
        this.showShortcutList = false;
      }
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      if (this.menuConfig.specialRoute) {
        let firstMenu = this.menuList.find(first => {
          return first.id == keyPath[0];
        });
        let secondPath = keyPath[1].split("/")[0];
        if (secondPath.indexOf("@") != -1) {
          secondPath = secondPath.split("@")[0];
        }
        let secondMenu =
          firstMenu.childNode.length &&
          firstMenu.childNode.find(second => {
            return second.id == secondPath;
          });
        if (
          item.name == "安防管理" || item.name == "机房动环" ||
          item.name == "智能建筑" || item.name == "建筑监控" ||
          item.name == "消防管理") {
          let clientName = item.name;
          if (item.name === "安防管理") {
            clientName = "综合安防";
          }
          Client.SkipToSigleBuild(clientName);
          return;
        }
        localStorage.setItem("menuList", JSON.stringify(secondMenu));
        let tmpArr = key.split("/");
        tmpArr.shift();
        let activeMenu = tmpArr.join("/");
        Cookies.set("activeMenuIndex", "/" + activeMenu);
      }
      if (key) {
        this.loadPage(key);
      }
    },
    loadPage(key) {
      Cookies.set("activeMenuIndex", key);
      if (key.indexOf("null") != -1) {
        this.$router.push("/digitalPark/defaultPage");
      } else if (key.indexOf("@") != -1) {
        commonFun.loadOldPage(key);
      } else {
        key = key.slice(key.indexOf("/"));
        this.$router.push(key);
      }
    },
    handleOpen(key) {
      // if(key=='/assetMaintenance'){
      //   this.$router.push(key)
      // }
    },
    handleClose(key) {
      // console.log(key)
      // if(key=='/assetMaintenance'){
      //   this.$router.push(key)
      // }
    },
    async getProModules() {
      let res = await DigitalParkApi.getProductList({
        lang: Cookies.get("lang")
      });
      this.shortCutList = res.slice(0, 6);
    },
    onClickShortcutBtn() {
      this.showShortcutList = !this.showShortcutList;
    }
  },
  mounted() {
    this.getProModules();
  }
};
</script>
<style lang="less">
.common-menu {
  .el-menu-item,
  .el-submenu .el-submenu__title {
    font-size: 18px;
    height: 70px;
    line-height: 70px;
    .iconfont {
      /*padding:0 10px;*/
    }
  }
  .el-submenu .el-menu {
    .el-menu-item,
    .el-submenu__title {
      font-size: 16px;
      height: 60px;
      line-height: 60px;
    }
  }
  .el-submenu .el-menu .el-submenu .el-menu .el-menu-item {
    font-size: 14px;
    padding-left: 40px !important;
  }
  .el-menu-demo {
    border-bottom: none !important;
  }
  .title {
    font-size: 24px;
    color: @white;
    padding: 0 20px;
    margin: 30px 0 40px 0;
  }
  .title .iconfont {
    font-size: 38px;
  }
  .el-menu--collapse {
    width: inherit;
  }
  .shortcut-btn {
    font-size: 37px;
    color: #fff;
    border-radius: 50%;
    position: fixed;
    bottom: 20px;
    left: 20px;
    z-index: 99;
  }
  .shortcut-list {
    width: 190px;
    /*height:400px;*/
    background: #000;
    color: @white;
    text-align: center;
    padding: 10px 0;
    position: fixed;
    bottom: 80px;
    left: 0;
    overflow: auto;
    z-index: 999999;
    li {
      height: 56px;
      line-height: 56px;
      color: @white;
      &:hover {
        background: #363636;
      }
    }
  }
}

/*.sidebar-container .is-active {*/
/*border-bottom: 2px solid red;*/
/*}*/
</style>
