<template>
  <div class="asset-manage">
    <div :class="menuConfig.isCollapse?'my-el-menu2':'my-el-menu'">
      <div v-show="!menuConfig.isCollapse" class="title">
        <i class="iconfont iconshouye"></i>
        &nbsp;{{title}}
      </div>
      <el-tooltip
        v-show="menuConfig.isCollapse"
        effect="dark"
        :content="title"
        placement="right-start"
      >
        <div class="title">
          <i class="iconfont iconshouye hover-pointer"></i>
        </div>
      </el-tooltip>
      <Sidebar :menu-list="menuList" :menu-config="menuConfig" />
    </div>
    <div class="right-content">
      <div class="asset-bread-crumb flex-align">
        <i
          :class="menuConfig.isCollapse?'iconzhankai':'iconshouqi'"
          class="iconfont collapse-icon hover-pointer"
          @click="onClickCollapseBtn"
        ></i>
        <!-- <breadCrumb></breadCrumb> -->
        <div class="asset-nav-operator-box">
          <NavOperator class="asset-nav-operator" :showGoback="true" />
        </div>
      </div>
      <myIframe :iframeConfig="iframeConfig" class="router-view"></myIframe>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Sidebar from "./menu/SideBar";
import NavOperator from "../digitalPark/coms/navOperator";
// import breadCrumb from "@/components/breadCrumb";
import myIframe from "./iframe";
const tempEnergyms = {
  id: 17,
  name: "能源管理",
  routeAddress: "/html/energyms/synthesize_index.html",
  icon: null,
  childNode: [
    {
      id: 1701,
      parent: 17,
      name: "space",
      name: "综合能耗",
      catalog: null,
      routeAddress: "/html/energyms/synthesize_index.html",
      sequence: 1,
      icon: null,
      permisionList: ["综合能耗"],
      childNode: []
    },
    {
      id: 1702,
      parent: 17,
      name: "space",
      name: "实时监测",
      catalog: null,
      routeAddress: "/html/energyms/realTime_index.html",
      sequence: 2,
      icon: null,
      permisionList: ["实时监测"],
      childNode: [
        {
          id: 170201,
          parent: 1702,
          name: "space",
          name: "总体实时用能",
          catalog: null,
          routeAddress: "",
          sequence: 1,
          icon: null,
          permisionList: ["总体实时用能"],
          childNode: []
        },
        {
          id: 170202,
          parent: 1702,
          name: "space",
          name: "建筑实时用能",
          catalog: null,
          routeAddress: "/html/energyms/realTime_building.html",
          sequence: 2,
          icon: null,
          permisionList: ["建筑实时用能"],
          childNode: []
        }
      ]
    },
    {
      id: 1704,
      parent: 17,
      name: "space",
      name: "节能诊断",
      catalog: null,
      routeAddress: "/html/energyms/savingDiagnosis_index.html",
      sequence: 3,
      icon: null,
      permisionList: ["节能诊断"],
      childNode: [
        {
          id: 170401,
          parent: 1704,
          name: "space",
          name: "人均能耗",
          catalog: null,
          routeAddress: "/html/energyms/savingDiagnosis_average.html",
          sequence: 1,
          icon: null,
          permisionList: ["人均能耗"],
          childNode: []
        },
        {
          id: 170402,
          parent: 1704,
          name: "space",
          name: "单位面积能耗",
          catalog: null,
          routeAddress: "/html/energyms/savingDiagnosis_area.html",
          sequence: 2,
          icon: null,
          permisionList: ["单位面积能耗"],
          childNode: []
        },
        {
          id: 170403,
          parent: 1704,
          name: "space",
          name: "单个设备能耗",
          catalog: null,
          routeAddress: "/html/energyms/savingDiagnosis_device.html",
          sequence: 3,
          icon: null,
          permisionList: ["单个设备能耗"],
          childNode: []
        },
        {
          id: 170404,
          parent: 1704,
          name: "space",
          name: "待机能耗监测",
          catalog: null,
          routeAddress: "/html/energyms/savingDiagnosis_await.html",
          sequence: 4,
          icon: null,
          permisionList: ["待机能耗监测"],
          childNode: []
        },
        {
          id: 170406,
          parent: 1704,
          name: "space",
          name: "特殊区域用能",
          catalog: null,
          routeAddress: "/html/energyms/savingDiagnosis_special.html",
          sequence: 7,
          icon: null,
          permisionList: ["特殊区域用能"],
          childNode: []
        }
      ]
    },
    {
      id: 1706,
      parent: 17,
      name: "space",
      name: "人工采集",
      catalog: null,
      routeAddress: "/html/energyms/handle_list.html",
      sequence: 4,
      icon: null,
      permisionList: ["人工采集"],
      childNode: []
    },
    {
      id: 1705,
      parent: 17,
      name: "space",
      name: "能耗审计",
      catalog: null,
      routeAddress: "/html/unauthorized.html",
      sequence: 5,
      icon: null,
      permisionList: ["能耗审计"],
      childNode: []
    },
    {
      id: 1703,
      parent: 17,
      name: "space",
      name: "历史统计",
      catalog: null,
      routeAddress: "/html/energy/energy_consume.html",
      sequence: 6,
      icon: null,
      permisionList: ["历史统计"],
      childNode: [
        {
          id: 170302,
          parent: 1703,
          name: "space",
          name: "建筑对比",
          catalog: null,
          routeAddress: "",
          sequence: 2,
          icon: null,
          permisionList: ["建筑对比"],
          childNode: []
        },
        {
          id: 170303,
          parent: 1703,
          name: "space",
          name: "分项对比",
          catalog: null,
          routeAddress: "/html/linkage/linkage_log.html",
          sequence: 3,
          icon: null,
          permisionList: ["分项对比"],
          childNode: []
        },
        {
          id: 170304,
          parent: 1703,
          name: "space",
          name: "历史对比",
          catalog: null,
          routeAddress: "/html/linkage/linkage_log.html",
          sequence: 4,
          icon: null,
          permisionList: ["历史对比"],
          childNode: []
        },
        {
          id: 170305,
          parent: 1703,
          name: "space",
          name: "设备对比",
          catalog: null,
          routeAddress: "",
          sequence: 5,
          icon: null,
          permisionList: ["设备对比"],
          childNode: []
        },
        {
          id: 170306,
          parent: 1703,
          name: "space",
          name: "趋势分析",
          catalog: null,
          routeAddress: "/html/linkage/linkage_log.html",
          sequence: 6,
          icon: null,
          permisionList: ["趋势分析"],
          childNode: []
        },
        {
          id: 170307,
          parent: 1703,
          name: "space",
          name: "相关性分析",
          catalog: null,
          routeAddress: "/html/linkage/linkage_log.html",
          sequence: 7,
          icon: null,
          permisionList: ["相关性分析"],
          childNode: []
        },
        {
          id: 170309,
          parent: 1703,
          name: "space",
          name: "建筑排行",
          catalog: null,
          routeAddress: "",
          sequence: 9,
          icon: null,
          permisionList: ["建筑排行"],
          childNode: []
        }
      ]
    },
    {
      id: 1707,
      parent: 17,
      name: "space",
      name: "数据报表",
      catalog: null,
      routeAddress: "/html/energyms/dataReport_index.html",
      sequence: 7,
      icon: null,
      permisionList: ["数据报表"],
      childNode: []
    },
    {
      id: 1708,
      parent: 17,
      name: "space",
      name: "设备表记",
      catalog: null,
      routeAddress: "/html/deviceMeter/deviceMeter_index.html",
      sequence: 8,
      icon: null,
      permisionList: ["设备表记"],
      childNode: []
    }
  ]
};
const tempEmergency = {
  id: 16,
  parent: 1,
  name: "space",
  name: "应急管理",
  catalog: null,
  routeAddress: "/html/docms/index.html?openid=emergency",
  sequence: 6,
  icon: null,
  permisionList: [],
  childNode: [
    {
      id: 1601,
      parent: 16,
      name: "space",
      name: "应急预案",
      catalog: null,
      routeAddress: "/html/docms/index.html?openid=emergency",
      sequence: 1,
      icon: null,
      permisionList: ["应急预案"],
      childNode: []
    },
    {
      id: 1602,
      parent: 16,
      name: "space",
      name: "应急演练",
      catalog: null,
      routeAddress: "/html/emergent/emDrill.html",
      sequence: 2,
      icon: null,
      permisionList: ["应急演练"],
      childNode: []
    },
    {
      id: 1603,
      parent: 16,
      name: "space",
      name: "突发事件",
      catalog: null,
      routeAddress: "/html/emergent/emEvents.html",
      sequence: 3,
      icon: null,
      permisionList: ["突发事件"],
      childNode: []
    },
    {
      id: 1604,
      parent: 16,
      name: "space",
      name: "监测预警",
      catalog: null,
      routeAddress: "/html/emergent/warning.html",
      sequence: 4,
      icon: null,
      permisionList: ["监测预警"],
      childNode: []
    },
    {
      id: 1605,
      parent: 16,
      name: "space",
      name: "总结评估",
      catalog: null,
      routeAddress: "/html/docms/index.html?openid=assess",
      sequence: 5,
      icon: null,
      permisionList: ["总结评估"],
      childNode: []
    }
  ]
};

export default {
  name: "AssetManage",
  components: {
    Sidebar,
    NavOperator,
    myIframe
    // breadCrumb
  },
  data() {
    let _this = this;
    let menuList = JSON.parse(sessionStorage.getItem("vibe_menuList"));

    return {
      title: menuList.name,
      menuList: menuList.childNode,
      iframeConfig: {
        src: menuList.routeAddress.replace("@", "")
      },
      menuConfig: {
        bgColor: "#394562",
        textColor: "#B7BAC4",
        isCollapse: false,
        activeIndex: menuList.routeAddress,
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
    onClickCollapseBtn() {
      this.menuConfig.isCollapse = !this.menuConfig.isCollapse;
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
      key = key.replace("@", "");
      
      this.iframeConfig.src = key;
    }
  },
  mounted() {}
};
</script>

<style lang="less">
@my_el_menu_width: 220px;
@my_el_menu_bgc: #394562;
@my_el_menuItem_bgc: #416eff;
@my_el_menuItem_tc: #b7bac4;

.asset-manage {
  height: 100%;
  background-color: #efefef;
  .my-el-menu {
    height: 100%;
    width: @my_el_menu_width;
    background-color: @my_el_menu_bgc;
    float: left;
  }
  .my-el-menu2 {
    float: left;
    height: 100%;
    background-color: @my_el_menu_bgc;
  }
  .right-content {
    max-width: 100%;
    overflow: auto;
    background-color: #efefef;
  }
  .title {
    font-size: 24px;
    color: @white;
    padding: 0 20px;
    margin: 20px 0 40px 0;
  }
  .asset-bread-crumb {
    padding: 0 15px;
    height: 60px;
    /*border:1px solid #ccc;*/
    background-color: @white;
  }
  .collapse-icon {
    font-size: 24px;
    line-height: 70px;
    padding-right: 20px;
    color: #969ca8;
  }
  .router-view {
    padding: 20px 20px 0 20px;
  }
  .asset-nav-operator-box {
    flex-grow: 1;
  }
  .asset-nav-operator {
    float: right;
  }
  .el-menu {
    border-right: none;
  }
  .el-submenu__title,
  .el-menu-item {
    font-size: 18px;
    &:hover {
      background-color: @my_el_menuItem_bgc !important;
    }
    a {
      color: @my_el_menuItem_tc;
      text-decoration: none;
    }
  }
  .nest-menu {
    font-size: 16px;
  }
  .el-menu-item.is-active {
    background-color: @my_el_menuItem_bgc !important;
    color: @my_el_menuItem_tc;
  }
  .el-submenu.is-active {
    background-color: @my_el_menuItem_bgc !important;
    color: @my_el_menuItem_tc;
  }
}
</style>
