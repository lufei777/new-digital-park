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
        @select="menuConfig.handleSelect"
        @open="menuConfig.handleOpen"
        @close="menuConfig.handleClose"
      >
        <sidebar-item
          v-for="menu in menuList"
          :key="menu.id"
          :item="menu"
          :specialRoute="menuConfig.specialRoute"
        />
      </el-menu>
      <div class="iconfont iconkuaijierukou hover-pointer shortcut-btn" @click="onClickShortcutBtn" v-if="!isyd"></div>
      <ul class="shortcut-list" v-show="showShortcutList">
        <el-scrollbar wrap-class="scrollbar-wrapper" :native="false">
            <li v-for="(item,index) in shortcutList"
                class="hover-pointer"
                :key="index"
                @click="onClickItemShortcut(item)"
            >{{item.name}}</li>
        </el-scrollbar>
      </ul>
    </div>
  </el-scrollbar>
</template>
<script>
import commonFun from "@/utils/commonFun";
import SidebarItem from "./SidebarItem";
import DigitalParkApi from "@/service/api/digitalPark";
import {isYD} from "@/utils/project";
import { mapState } from 'vuex'
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
      //兼容旧项目嵌的vue项目
      // let show_menu =localStorage.getItem("show_menu")
      // let activeIndex = show_menu.indexOf("@")?show_menu.substring(show_menu.indexOf("@")):show_menu
      // console.log(activeIndex)
      // return activeIndex
      return this.activeMenuIndexVuex || this.menuConfig.activeIndex
    },
    shortcutList(){
      return JSON.parse(localStorage.getItem('shortcutList'))
    },
    ...mapState({
      activeMenuIndexVuex:state=>state.digitalPark.activeMenuIndex
    }),
    isyd(){
      return isYD()
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
      // if (key) {
      //   if (key.indexOf("null") != -1) {
      //     this.$router.push("/digitalPark/defaultPage");
      //   } else if (key.indexOf("@") != -1) {
      //     commonFun.loadOldPage(key, true);
      //   } else {
      //     key = key.slice(key.indexOf("/"));
      //     this.$router.push(key);
      //     // Cookies.set("activeMenuIndex", key);
      //   }
      // }
    },
    handleOpen(key) {},
    handleClose(key) {},
    onClickShortcutBtn() {
      this.showShortcutList = !this.showShortcutList;
    },
    onClickItemShortcut(item){
      this.$store.commit("digitalPark/activeMenuIndex","");
      if(commonFun.loadClientPage(item)){
        return ;
      }else{
        this.$store.commit("digitalPark/menuList",item);
        // commonFun.loadPage(item)
        if (item.routeAddress) {
          if (item.routeAddress.indexOf("@") != -1) {
            Cookies.set('activeMenuIndex', item.routeAddress)
            if(this.$route.path=="/vibe-web"){
              location.reload()
            }else{
              this.$router.push('/vibe-web')
            }
          } else {
            this.$router.push(item.routeAddress);
          }
        } else {
          this.$router.push("/digitalPark/defaultPage");
        }
      }
    },
  },
  mounted() {
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
    height:400px;
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
