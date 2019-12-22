<template>
  <div class="common-index-panel">
    <commonIndexLayout :menuConfig="menuConfig" @onclickcollapsebtn="onClickCollapseBtn">
      <template slot="menuList">
        <Sidebar :menu-list="menuList" :menu-config="menuConfig" />
      </template>
      <template slot="breadCrumb">
        <BreadCrumb></BreadCrumb>
      </template>
      <template slot="navOperator" slot-scope="obj">
        <NavOperator :style="obj.style" class="asset-nav-operator" :showGoback="true" />
      </template>
      <template slot="content">
        <router-view></router-view>
      </template>
    </commonIndexLayout>
  </div>
</template>

<script>
// 项目的公共入口
import commonIndexLayout from "./commonIndexLayout";
import Sidebar from "@/components/commonMenu/SideBar";
import BreadCrumb from "@/components/breadCrumb";
import NavOperator from "../../digitalPark/coms/navOperator";

export default {
  name: "commonIndex",
  props: ["menuList", "menuConfig", "documentTitle"],
  components: {
    commonIndexLayout,
    Sidebar,
    BreadCrumb,
    NavOperator
  },
  data() {
    return {};
  },
  methods: {
    onClickCollapseBtn() {
      this.menuConfig.isCollapse = !this.menuConfig.isCollapse;
      this.$store.commit(
        "digitalPark/menuIsCollapse",
        this.menuConfig.isCollapse
      );
    }
  },
  mounted() {
    document.title = this.menuConfig.moduleName;
  }
};
</script>

<style lang="less">
  .common-index-panel{
    height:100%;
  }
</style>
