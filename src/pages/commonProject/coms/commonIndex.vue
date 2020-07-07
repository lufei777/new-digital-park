<template>
  <commonIndexLayout :menuConfig="menuConfig" @onclickcollapsebtn="onClickCollapseBtn">
    <template slot="menuList">
      <Sidebar :menuData="menuData" :menuConfig="menuConfig" />
    </template>
    <template slot="breadCrumb">
      <BreadCrumb></BreadCrumb>
    </template>
    <template slot="navOperator" slot-scope="obj">
      <NavOperator :style="obj.style" class="asset-nav-operator" :showGoBack="true" />
    </template>
    <template slot="content">
      <router-view></router-view>
    </template>
  </commonIndexLayout>
</template>

<script>
// 项目的公共入口
import { mapState } from 'vuex'
import commonIndexLayout from "./commonIndexLayout";
import Sidebar from "@/components/commonMenu/SideBar";
import BreadCrumb from "@/components/breadCrumb";
import NavOperator from "../../digitalPark/coms/navOperator";

export default {
  name: "commonIndex",
  props: [],
  components: {
    commonIndexLayout,
    Sidebar,
    BreadCrumb,
    NavOperator
  },
  data() {
    let localStorageMenuData = JSON.parse(localStorage.menuList);
    return {
      // menuData: localStorageMenuData,
      menuConfig: {
        bgColor: "#394562",
        textColor: "#B7BAC4",
        isCollapse: false
      }
    };
  },
  computed: {
    ...mapState({
      menuTree: state => state.digitalPark.menuTree[0].childNode,
      menuData: state => state.digitalPark.menuList
    }),
    /* menuData() {
      // 拿到secondMenuId 和 firstMenuId
      let { secondMenuId, firstMenuId } = this.$route.query;
      if (typeof secondMenuId !== 'undefined' && typeof firstMenuId !== 'undefined') {
        let menuTmp = {}

        // firstMenuId找出第一层菜单 secondMenuId拿到第二层菜单
        let firstMenu = this.menuTree.find(first => {
          return first.id == firstMenuId;
        });
        let secondMenu = firstMenu.childNode.find(second => {
          return second.id == secondMenuId;
        });

        //菜单：如果二级菜单是客户端类概览页且点击的子集为是跳网页，则不存全部菜单
        if (secondMenu.clientType == 1 && item.clientType != 1) {
          if (item.level == 3) {
            menuTmp = item
          } else {
            menuTmp = this.findNode(secondMenu, item, secondMenu)
          }
        } else {
          menuTmp = secondMenu
        }
        return menuTmp;
        this.$store.commit("digitalPark/menuList", menuTmp);

        //快接入口菜单：概览类非二级菜单的快捷入口设置
        if (secondMenu.clientType == 1) {
          localStorage.setItem("shortcutList", JSON.stringify(secondMenu.childNode));
        } else {
          this.normalShortcutList();
        }
      } else {
        return this.$store.state.digitalPark.menuList
      }
    } */
  },
  methods: {
    onClickCollapseBtn() {
      this.menuConfig.isCollapse = !this.menuConfig.isCollapse;
      this.$store.commit(
        "digitalPark/menuIsCollapse",
        this.menuConfig.isCollapse
      );
    },
    /* normalShortcutList() {
      let shortcutList = [];
      this.menuTree.map(item => {
        item.childNode.map(child => {
          shortcutList.push(child);
        });
      });
      localStorage.setItem("shortcutList", JSON.stringify(shortcutList));
    } */
  },
  mounted() {
    document.title = this.menuData.name;
  }
};
</script>

<style lang="less" scoped>
.common-index-panel {
  height: 100%;
}
</style>
