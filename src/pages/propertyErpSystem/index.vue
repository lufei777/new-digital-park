<template>
  <commonIndexLayout
    :menuConfig="menuConfig"
    @onclickcollapsebtn="onClickCollapseBtn"
  >
    <template slot="menuList">
      <Sidebar
        :menuData="menuData"
        :menuConfig="menuConfig"
      />
    </template>
    <template slot="breadCrumb">
      <BreadCrumb></BreadCrumb>
    </template>
    <template
      slot="navOperator"
      slot-scope="obj"
    >
      <NavOperator
        :style="obj.style"
        class="asset-nav-operator"
        :showGoBack="true"
      />
    </template>
    <template slot="content">
      <router-view></router-view>
    </template>
  </commonIndexLayout>
</template>

<script>
// 项目的公共入口
import { mapState } from "vuex";
import commonIndexLayout from "@/pages/commonProject/coms/commonIndexLayout";
import Sidebar from "@/components/commonMenu/SideBar";
import BreadCrumb from "@/components/breadCrumb";
import NavOperator from "../digitalPark/coms/navOperator";

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
    let localStorageMenuData = {
      name: "物业ERP系统",
      childNode: [
        {
          name: "租赁管理",
          routeAddress: "/proerpsystem",
          redirect: '/proerpsystem/rentContract',
          childNode: [
            {
              name: "租赁合同",
              routeAddress: "/rentContract"
            },
            {
              name: "租户信息",
              routeAddress: ""
            },
            {
              name: "租户月账单",
              routeAddress: ""
            },
            {
              name: "租赁月账单审核",
              routeAddress: ""
            }
          ]
        },
        {
          name: "用电管理",
          routeAddress: "",
          childNode: []
        },
        {
          name: "预收款",
          routeAddress: "",
          childNode: []
        },
        {
          name: "押金管理",
          routeAddress: "",
          childNode: []
        },
        {
          name: "检测报告",
          routeAddress: "/heritageevaluation",
          childNode: []
        }
      ],
      firstMenuId: 0,
      secondMenuId: 0,
      icon: "iconzulinguanli",
      clientType: "0"
    };
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
    console.log(1);
    document.title = this.menuData.name;
  }
};
</script>

<style lang="less">
.common-index-panel {
  height: 100%;
}
</style>
