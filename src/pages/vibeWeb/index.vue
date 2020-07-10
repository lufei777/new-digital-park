<template>
  <div class="common-index-layout asset-manage">
    <commonIndexLayout :menuConfig="menuConfig" @onclickcollapsebtn="onClickCollapseBtn">
      <template slot="menuList">
        <Sidebar :menu-list="menuList" :menu-config="menuConfig" />
      </template>
      <template slot="navOperator" slot-scope="obj">
        <NavOperator :style="obj.style" class="asset-nav-operator" :showGoBack="true" />
      </template>
      <template slot="content">
        <myIframe :iframeConfig="iframeConfig"></myIframe>
      </template>
    </commonIndexLayout>
  </div>
</template>

<script>
import commonIndexLayout from "../commonProject/coms/commonIndexLayout";
import Sidebar from "./menu/SideBar";
import NavOperator from "../digitalPark/coms/navOperator";
import myIframe from "./iframe";
import CommonFun from "utils/commonFun";
import { mapState } from 'vuex'
export default {
  name: "CommonIndexLayout",
  components: {
    commonIndexLayout,
    Sidebar,
    NavOperator,
    myIframe
  },
  data() {
    let _this = this;
    let menuList = JSON.parse(localStorage.getItem("menuList"));
    let iframeSrc = Cookies.get("activeMenuIndex");

    return {
      iframeConfig: {
        src: iframeSrc.split("@")[1]
      },
      // menuList: menuList.childNode,
      // menuConfig: {
      //   bgColor: "#394562",
      //   textColor: "#B7BAC4",
      //   isCollapse: false,
      //   activeIndex: iframeSrc,
      //   moduleName: menuList.name,
      //   moduleLogo: menuList.icon,
      //   handleSelect(key, keyPath, curDom) {
      //     _this.handleSelect(key, keyPath, curDom);
      //   },
      //   handleClose(){},
      //   handleOpen(){}
      // }
    };
  },
  computed:{
    ...mapState({
      menuData: state => state.digitalPark.menuList
    }),
    menuList(){
      return this.menuData.childNode
    },
    menuConfig(){
      let _this = this
      return {
        bgColor: "#394562",
        textColor: "#B7BAC4",
        isCollapse: false,
        // activeIndex: iframeSrc,
        moduleName: this.menuData.name,
        moduleLogo: this.menuData.icon,
        handleSelect(key, keyPath, curDom) {
          _this.handleSelect(key, keyPath, curDom);
        },
        handleClose(){},
        handleOpen(){}
      }
    }
  },
  methods: {
    onClickCollapseBtn() {
      this.menuConfig.isCollapse = !this.menuConfig.isCollapse;
      this.$store.commit(
        "digitalPark/menuIsCollapse",
        this.menuConfig.isCollapse
      );
    },
    handleSelect(key, keyPath, curDom) {
      // console.log(key, keyPath,curDom.$vnode.context.item)
      let item = curDom.$vnode.context.item;
      if (CommonFun.loadClientPage(item)) {
        return;
      }
      this.loadPage(key, keyPath,item);
    },
    handleOpen(key, keyPath) {
      this.loadPage(key, keyPath);
    },
    loadPage(key, keyPath,item) {
      // 如果key没有值，则默认keyPath第一个
      if (key.length === 0) {
        key = keyPath[0];
        if (keyPath.length > 1 && keyPath[1].length != 0) {
          key =
            keyPath[0].substring(0, keyPath[0].lastIndexOf("/")) + keyPath[1];
        }
      }
      if (key.indexOf("@") != -1) {
        this.iframeConfig.src = key.replace("@", "");
      }
      CommonFun.loadPage(item)
    }
  },
  mounted() {
  }
};
</script>

<style lang="less">
.common-index-panel {
  height: 100%;
}
</style>
