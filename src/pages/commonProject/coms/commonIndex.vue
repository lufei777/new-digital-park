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
      menuData: state => state.digitalPark.menuList,
      menuIsCollapse: state => state.digitalPark.menuIsCollapse,
    })
  },
  methods: {
    onClickCollapseBtn() {
      this.$store.commit(
        "digitalPark/menuIsCollapse",
        !this.menuConfig.isCollapse
      );
    },
  },
  mounted() {
    document.title = this.menuData.name;
  },
  watch: {
    menuIsCollapse(val) {
      this.menuConfig.isCollapse = val;
    }
  }
};
</script>

<style lang="less" scoped>
.common-index-panel {
  height: 100%;
}
</style>
