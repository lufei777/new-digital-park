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
        :active-text-color="menuConfig.activeTextColor"
        :collapse="menuConfig.isCollapse"
        @select="handleSelect"
        @open="handleOpen"
        @close="handleClose"
      >
        <sidebar-item :menuData="menuData" :specialRoute="menuConfig.specialRoute" :first="true"/>
      </el-menu>
      <!--<div v-if="!menuConfig.specialRoute">-->
        <!--<div-->
          <!--class="iconfont iconkuaijierukou hover-pointer shortcut-btn"-->
          <!--@click="onClickShortcutBtn"-->
        <!--&gt;</div>-->
        <!--<ul class="shortcut-list" v-show="showShortcutList">-->
          <!--<li v-for="(item,index) in shortCutList" :key="index">{{item.name}}</li>-->
        <!--</ul>-->
      <!--</div>-->
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
    menuData: {
      type: Object,
      required: false
    },
    menuConfig: {
      type:Object,
    }
  },
  data() {
    return {
      shortCutList: [],
      showShortcutList: false,
      temporarilyHidden:false
    };
  },
  computed: {
    isCollapse() {
      return this.menuConfig.isCollapse;
    },
    activeMenuIndex() {
      //当前激活的菜单，顺序是cookie拿到的、父级传递的、默认的父级没传时使用菜单第一个
      return this.menuConfig.specialRoute ? ""
        : Cookies.get("activeMenuIndex") ||
            this.menuConfig.activeIndex ||
            this.menuData.childNode[0].id + this.menuData.childNode[0].routeAddress;
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
      // debugger
      // console.log(key,keyPath)
      if (this.menuConfig.specialRoute) {
        //找到第一层，例如无忧服务
        let firstMenu = this.menuData.childNode.find(first => {
          return first.id == keyPath[0];
        });
        //找到第二层，例如能源管理
        let secondId = this.getMenuId(keyPath[1])
        let secondMenu
        firstMenu.childNode.length &&firstMenu.childNode.map((second) => {
          if(second.id == secondId){
            secondMenu=second
          }
        });
        // console.log("firstMenu",firstMenu,secondMenu,secondId)
        //找到当前点击的节点
        let curNodeId=this.getMenuId(key)
        console.log("secondMenu",secondMenu)
        let curNode  = this.findCurNode(secondMenu,curNodeId)
        console.log("curNode",curNode)
        //跳转三维
        if (commonFun.loadThreeD(curNode,secondMenu)) {
          return;
        }
        localStorage.setItem("menuList", JSON.stringify(secondMenu));
      }
      if (key) {
        this.loadPage(key);
      }
    },
    loadPage(key) {
      console.log("key",key)
      Cookies.set("activeMenuIndex", key);
      if (key.indexOf("null") != -1) {
        this.$router.push("/digitalPark/defaultPage");
      } else if (key.indexOf("@") != -1) {
        commonFun.loadOldPage(key);
      } else {
        key = key.slice(key.indexOf("/"));
        console.log("key1",key)
        this.$router.push(key);
      }
    },
    findCurNode(menu,id){
      for(let item of menu.childNode){
        if(item.id==id){
          return item;
        }else{
          this.findCurNode(item,id)
        }
      }
      return false;
    },
    getMenuId(item){
      let menuId = item.split("/")[0];
      if (menuId.indexOf("@") != -1) {
        menuId = menuId.split("@")[0];
      }
      return menuId
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
  overflow: hidden;
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
