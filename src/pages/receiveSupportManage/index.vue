<template>
  <div class="receive-support-index">
    <commonIndex :menuList="menuList" :menuConfig="menuConfig"></commonIndex>
  </div>
</template>

<script>
import commonIndex from "../commonProject/coms/commonIndex";
export default {
  name: "ReceiveSupportManage",
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
        moduleName: "收支管理",
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
