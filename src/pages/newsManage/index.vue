<template>
  <div class="news-manage common-index-panel">
    <commonIndexLayout :menuConfig="menuConfig" @onclickcollapsebtn="onClickCollapseBtn">
      <template slot="menuList">
        <Sidebar :menuData="menuData" :menuConfig="menuConfig" />
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
import commonIndexLayout from "@/pages/commonProject/coms/commonIndexLayout";
import Sidebar from "@/components/commonMenu/SideBar";
import BreadCrumb from "@/components/breadCrumb";
import NavOperator from "@/pages/digitalPark/coms/navOperator";

const menuData = {
  name: "新闻管理",
  childNode: [
    {
      name: "预警报警列表",
      routeAddress: "/news/warningalarmlist"
    }
  ]
};

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
    let localStorageMenuData = menuData //JSON.parse(localStorage.menuList);
    return {
      menuData: localStorageMenuData,
      menuConfig: {
        bgColor: "#394562",
        textColor: "#B7BAC4",
        isCollapse: false
      }
    };
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
    document.title = this.menuData.name;
  }
};
</script>

<style lang="less">
.common-index-panel {
  height: 100%;
}
</style>
