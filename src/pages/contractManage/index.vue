<template>
  <div class="contract-manage-index">
    <commonIndex :menuList="menuList" :menuConfig="menuConfig"></commonIndex>
  </div>
</template>

<script>
import commonIndex from "../commonProject/coms/commonIndex";
export default {
  name: "ContractManage",
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
        moduleName: "合同管理",
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
.contract-manage-index {
    height: 100%;
}
</style>
