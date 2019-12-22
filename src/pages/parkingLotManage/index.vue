<template>
  <div class="lease-index">
    <commonIndex :menuList="menuList" :menuConfig="menuConfig"></commonIndex>
  </div>
</template>

<script>
import Theme from "../../components/theme";
import commonIndex from "../commonProject/coms/commonIndex";
import CommonFun from "../../utils/commonFun";

const MenuList = {
  name: "停车场管理",
  childNode: [
    {
      id: 1,
      name: "车辆出入记录",
      routeAddress: "/parkinglotmanage/accessrecord"
    },
    {
      id: 2,
      routeAddress: "/parkinglotmanage/vehiclerecord",
      name: "过车记录"
    },
    {
      id: 3,
      routeAddress: "/parkinglotmanage/parkinglotrecord",
      name: "场区统计",
      childNode: []
    },
    {
      id: 4,
      routeAddress: "/parkinglotmanage/feeBasedInfo",
      name: "收费信息"
    }
  ]
};

export default {
  name: "ParkingLotManage",
  components: {
    Theme,
    commonIndex
  },
  data() {
    let menuList = JSON.parse(localStorage.menuList);
    return {
      menuList: menuList.childNode, //CommonFun.menuData.childNode,// JSON.parse(localStorage.menuList),
      menuConfig: {
        bgColor: "#394562",
        textColor: "#B7BAC4",
        isCollapse: false,
        moduleName: menuList.name,
        moduleLogo: "iconnengyuanguanli"
      }
    };
  },
  watch: {},
  methods: {},
  created() {}
};
</script>

<style lang="less">
</style>
