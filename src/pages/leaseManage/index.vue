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
    routeAddress: "/leasemanage/housepropertymanage",
    icon: "iconwodezichan",
    childNode: [
      {
        name: "添加房产",
        routeAddress: "/leasemanage/addhouseproperty"
      }
    ]
  },
  {
    routeAddress: "",
    name: "租户管理",
    childNode: [],
    id: 2,
    icon: "iconzichantaizhang"
  },
  {
    routeAddress: "",
    name: "租赁合同",
    childNode: [],
    id: 3,
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
    return {
      menuList: MenuList, //CommonFun.menuData.childNode,// JSON.parse(localStorage.menuList),
      menuConfig: {
        bgColor: "#394562",
        textColor: "#B7BAC4",
        isCollapse: false,
        activeIndex: "",
        moduleName: "租赁管理",
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
