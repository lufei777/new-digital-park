<template>
  <el-scrollbar wrap-class="scrollbar-wrapper" :native="false">
    <div class="common-menu">
      <div v-show="!menuConfig.isCollapse && !menuConfig.specialRoute" class="title flex-align">
        <i :class="['iconfont',menuData.icon]"></i>
        <span>&nbsp;&nbsp;{{menuData.name}}</span>
      </div>
      <el-tooltip
        v-show="menuConfig.isCollapse"
        effect="dark"
        :content="menuData.name"
        placement="right-start"
      >
        <div class="title">
          <i :class="['iconfont',menuData.icon ,'hover-pointer']"></i>
        </div>
      </el-tooltip>
      <el-menu
        class="el-menu-demo"
        :default-active="activeMenuIndex"
        :mode="menuConfig.mode"
        :background-color="menuConfig.bgColor"
        :text-color="menuConfig.textColor"
        :unique-opened="true"
        :active-text-color="menuConfig.activeTextColor || '#fff'"
        :collapse="menuConfig.isCollapse"
        @select="handleSelect"
      >
        <sidebar-item :menuData="menuData" :specialRoute="menuConfig.specialRoute" />
      </el-menu>
      <div v-if="!(menuConfig.specialRoute || isyd)">
        <div class="iconfont iconjia hover-pointer shortcut-btn" @click="onClickShortcutBtn"></div>

        <ul class="shortcut-list" v-show="showShortcutList">
          <el-scrollbar wrap-class="scrollbar-wrapper" :native="false">
            <li
              v-for="(item,index) in shortcutList"
              class="hover-pointer"
              :key="index"
              @click="onClickItemShortcut(item)"
            >{{item.name}}</li>
          </el-scrollbar>
        </ul>
      </div>
    </div>
  </el-scrollbar>
</template>
<script>
import commonFun from "@/utils/commonFun";
import SidebarItem from "./SidebarItem";
import { mapState } from 'vuex'
import { isYDScreen } from "../../utils/project";

export default {
  name: "Sidebar",
  components: { SidebarItem },
  props: {
    menuData: {
      type: Object,
      required: false,
      default: () => ({})
    },
    menuConfig: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      showShortcutList: false,
      temporarilyHidden: false,
      activeTmp: ''
    };
  },
  computed: {
    isCollapse() {
      return this.menuConfig.isCollapse;
    },
    activeMenuIndex() {
      //当前激活的菜单，顺序是cookie拿到的、父级传递的、默认的父级没传时使用菜单第一个
      return this.menuConfig.specialRoute ? "" :
        this.activeMenuIndexVuex ||
        this.menuConfig.activeIndex ||
        this.setActiveIndex(this.menuData)
    },
    shortcutList() {
      return JSON.parse(localStorage.getItem('shortcutList'))
    },
    ...mapState({
      activeMenuIndexVuex: state => state.digitalPark.activeMenuIndex
    }),
    isyd() {
      return isYDScreen()
    }
  },
  watch: {
    isCollapse() {
      if (this.isCollapse) {
        this.showShortcutList = false;
      }
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key,keyPath)
    },
    setActiveIndex(menu) {
      if (menu.childNode && menu.childNode.length != 0) {
        this.setActiveIndex(menu.childNode[0])
      } else {
        this.activeTmp = commonFun.setMenuIndex(menu)
      }
      return this.activeTmp;
    },
    onClickShortcutBtn() {
      this.showShortcutList = !this.showShortcutList;
    },
    onClickItemShortcut(item) {
      this.$store.commit("digitalPark/activeMenuIndex", "");
      this.$store.commit("digitalPark/menuList", item);
      commonFun.loadPage(item)
    }
  },
  mounted() {
  }
};
</script>
<style lang="less" scoped>
.common-menu {
  overflow: hidden;
  /deep/ .el-menu-item,
  /deep/ .el-submenu .el-submenu__title {
    font-size: 18px;
    height: 70px;
    line-height: 70px;
    .iconfont {
      /*padding:0 10px;*/
    }
  }
  /deep/ .el-submenu .el-menu {
    .el-menu-item,
    .el-submenu__title {
      font-size: 16px;
      height: 60px;
      line-height: 60px;
    }
  }
  /deep/ .el-submenu .el-menu .el-submenu .el-menu .el-menu-item {
    font-size: 14px;
    padding-left: 40px !important;
  }
  /deep/  .el-menu-demo {
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
    width: 80px;
    height: 80px;
    font-size: 16px;
    color: #fff;
    border-radius: 50%;
    position: fixed;
    bottom: -40px;
    left: -40px;
    z-index: 99;
    /*padding:20px;*/
    border: 2px solid #2b5681;
    text-align: right;
    padding: 15px 16px 0 0;
    box-sizing: border-box;
    background: #000;
  }
  .shortcut-list {
    width: 190px;
    height: 400px;
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
