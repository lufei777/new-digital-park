<template>
  <div class="common-index-layout asset-manage">
    <commonIndexLayout :menuConfig="menuConfig" @onclickcollapsebtn="onClickCollapseBtn">
      <template slot="menuList">
        <Sidebar :menu-list="menuList" :menu-config="menuConfig" />
      </template>
      <template slot="navOperator" slot-scope="obj">
        <NavOperator :style="obj.style" class="asset-nav-operator" :showGoback="true" />
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
    let show_menu = localStorage.getItem("show_menu");
    console.log(menuList.childNode);
    return {
      iframeConfig: {
        src: show_menu.split("@")[1]
      },
      menuList: menuList.childNode,
      menuConfig: {
        bgColor: "#394562",
        textColor: "#B7BAC4",
        isCollapse: false,
        activeIndex: show_menu.substring(show_menu.indexOf("@")),
        moduleName: menuList.name,
        moduleLogo: menuList.icon,
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
      if (key.indexOf("@") != -1) {
        key = key.replace("@", "");

        this.iframeConfig.src = key;
      } else {
        this.$router.push(key);
      }
    }
  },
  mounted() {}
};
</script>

<style lang="less">
.common-index-panel {
  height: 100%;
}
</style>
