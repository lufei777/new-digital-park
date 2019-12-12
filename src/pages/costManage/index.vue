<template>
  <div class="cost-index">
    <commonIndex :menuList="menuList" :menuConfig="menuConfig"></commonIndex>
  </div>
</template>

<script>
import commonIndex from "../commonProject/coms/commonIndex";
const MenuList = [
  {
    id: 1,
    name: "保洁记录",
    icon: "",
    routeAddress: "/cleaningManage/cleaningRecord",
  },
  {
    id: 2,
    routeAddress: "1",
    name: "任务设定",
    childNode: [],
    icon: ""
  },
  {
    id: 3,
    routeAddress: "2",
    name: "区域设定",
    childNode: [],
    icon: ""
  }
];

export default {
  name: "CostManage",
  components: {
    commonIndex
  },
  data() {
    return {
      menuList: JSON.parse(localStorage.menuList).childNode, //CommonFun.menuData.childNode,// JSON.parse(localStorage.menuList),
      menuConfig: {
        bgColor: "#394562",
        textColor: "#B7BAC4",
        isCollapse: false,
        moduleName: "费用管理",
        moduleLogo: "iconnengyuanguanli"
      }
    };
  },
  watch: {},
  methods: {},
  created() {
  }
};
</script>

<style lang="less">
</style>
