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
      // id: 169,
      // pid: 134,
      name: "预警报警",
      // sequence: 4,
      // level: 2,
      // status: 2,
      // productBgUrl: "zulinguanli",
      // routeAddress: "/warningalarm",
      childNode: [
        {
          id: 171,
          pid: 169,
          name: "报警管理",
          level: 3,
          status: 1,
          childNode: [
            {
              // id: 172,
              // pid: 169,
              name: "报警信息管理",
              // level: 3,
              // status: 1,
              // routeAddress: "/tenantManage",
              childNode: [
                {
                  id: 1721,
                  pid: 169,
                  name: "监控报警信息",
                  level: 3,
                  status: 1,
                  routeAddress: "/warningalarm/monitorAlarm",
                  childNode: [],
                  firstMenuId: 134,
                  secondMenuId: 169,
                  icon: "iconzuhuguanli",
                  clientType: "0"
                },
                {
                  id: 1721,
                  pid: 169,
                  name: "查看详情",
                  level: 3,
                  status: 1,
                  routeAddress: "/warningalarm/seeDetails",
                  childNode: [],
                  firstMenuId: 134,
                  secondMenuId: 169,
                  icon: "iconzuhuguanli",
                  clientType: "0"
                }
              ]
              // ================================================
            },
            {
              id: 173,
              pid: 169,
              name: "报警规则管理",
              level: 3,
              status: 1,
              routeAddress: "/leaseContract",
              childNode: [
                {
                  id: 1741,
                  pid: 169,
                  name: "监控报警规则",
                  level: 3,
                  status: 1,
                  routeAddress: "/warningalarm/alarmRules",
                  childNode: [],
                  firstMenuId: 134,
                  secondMenuId: 169,
                  icon: "iconzhangdanguanli",
                  clientType: "0"
                },
                // 查看和编辑
                {
                  id: 1741,
                  pid: 169,
                  name: "查看和编辑",
                  level: 3,
                  status: 1,
                  routeAddress: "/warningalarm/seeedit",
                  childNode: [],
                  firstMenuId: 134,
                  secondMenuId: 169,
                  icon: "iconzhangdanguanli",
                  clientType: "0"
                },
                {
                  id: 1741,
                  pid: 169,
                  name: "新增报警规则",
                  level: 3,
                  status: 1,
                  routeAddress: "/warningalarm/addBasicSettings",
                  childNode: [],
                  firstMenuId: 134,
                  secondMenuId: 169,
                  icon: "iconzhangdanguanli",
                  clientType: "0"
                }
              ]
            },
            // ==================================================
            {
              id: 175,
              pid: 169,
              name: "报警处理组管理",
              level: 3,
              status: 1,
              routeAddress: "/warningalarm/alarmGrounp",
              firstMenuId: 134,
              secondMenuId: 169,
              icon: "iconzhangdanguanli",
              clientType: "0",
              childNode: [
                {
                  id: 1741,
                  pid: 169,
                  name: "报警处理组管理",
                  level: 3,
                  status: 1,
                  routeAddress: "/warningalarm/alarmGrounp",
                  childNode: [],
                  firstMenuId: 134,
                  secondMenuId: 169,
                  icon: "iconzhangdanguanli",
                  clientType: "0"
                  // /warningalarm/newAdd
                },
                {
                  id: 1741,
                  pid: 169,
                  name: "新增处理组",
                  level: 3,
                  status: 1,
                  routeAddress: "/warningalarm/newGrounp",
                  childNode: [],
                  firstMenuId: 134,
                  secondMenuId: 169,
                  icon: "iconzhangdanguanli",
                  clientType: "0"
                  // /warningalarm/newAdd
                }
              ]
            },
            {
              id: 176,
              pid: 169,
              name: "通知方式管理",
              level: 3,
              status: 1,
              // routeAddress: "/warningalarm/notificationManger",
              childNode: [],
              firstMenuId: 134,
              secondMenuId: 169,
              icon: "iconzhangdanguanli",
              clientType: "0",
              childNode: [
                {
                  id: 1741,
                  pid: 169,
                  name: "通知方式管理",
                  level: 3,
                  status: 1,
                  routeAddress: "/warningalarm/notificationManger",
                  childNode: [],
                  firstMenuId: 134,
                  secondMenuId: 169,
                  icon: "iconzhangdanguanli",
                  clientType: "0"
                },
                {
                  id: 1741,
                  pid: 169,
                  name: "编辑",
                  level: 3,
                  status: 1,
                  routeAddress: "/warningalarm/edit",
                  childNode: [],
                  firstMenuId: 134,
                  secondMenuId: 169,
                  icon: "iconzhangdanguanli",
                  clientType: "0"
                },
                {
                  id: 1741,
                  pid: 169,
                  name: "新增",
                  level: 3,
                  status: 1,
                  routeAddress: "/warningalarm/newAdd",
                  childNode: [],
                  firstMenuId: 134,
                  secondMenuId: 169,
                  icon: "iconzhangdanguanli",
                  clientType: "0"
                }
              ]
            }
          ]
        }
      ],
      // ===========================================
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
