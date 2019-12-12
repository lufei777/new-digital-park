<template>
  <div class="lease-index">
    <commonIndex :menuList="menuList" :menuConfig="menuConfig"></commonIndex>
  </div>
</template>

<script>
import Theme from "../../components/theme";
import commonIndex from "../commonProject/coms/commonIndex";
import CommonFun from "../../utils/commonFun";

const MenuList = [
  {
    id: 1,
    name: "房产管理",
    icon: "iconwodezichan",
    routeAddress: "/leasemanage",
    childNode: [
      {
        name: "租赁管理",
        routeAddress: "/housepropertymanage"
      },
      {
        name: "编辑房产",
        routeAddress: "/editHouseProperty"
      }
    ]
  },
  {
    id: 2,
    routeAddress: "/tenantManage",
    name: "租户管理",
    childNode: [],
    icon: "iconzichantaizhang"
  },
  {
    id: 3,
    routeAddress: "2",
    name: "租赁合同",
    childNode: [],
    icon: "iconrengongcaiji"
  }
];

export default {
  name: "LeaseIndex",
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
