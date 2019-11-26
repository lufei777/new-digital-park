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
        :default-active="menuConfig.activeIndex"
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
        />
      </el-menu>
      <div class="iconfont iconkuaijierukou hover-pointer shortcut-btn" @click="onClickShortcutBtn"></div>
      <ul class="shortcut-list" v-show="showShortcutList">
        <li v-for="(item,index) in shortCutList" :key="index">{{item.name}}</li>
      </ul>
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
      if (key) {
        if (key.indexOf("null") != -1) {
          this.$router.push("/digitalPark/defaultPage");
        } else if (key.indexOf("@") != -1) {
          commonFun.loadOldPage(key, true);
        } else {
          key = key.slice(key.indexOf("/"));
          this.$router.push(key);
          Cookies.set("activeIndex", key);
        }
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
