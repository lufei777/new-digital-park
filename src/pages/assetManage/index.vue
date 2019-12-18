<template>
  <div class="asset-manage-index">
    <commonIndex :menuList="menuList" :menuConfig="menuConfig"></commonIndex>
  </div>
</template>

<script>
import commonIndex from "../commonProject/coms/commonIndex";
export default {
  name: "AssetManage",
  components: { commonIndex },
  data() {
    let menuData=JSON.parse(localStorage.menuList)
    return {
      menuList: menuData.childNode,
      menuConfig: {
        bgColor: "#394562",
        textColor: "#B7BAC4",
        isCollapse: false,
        moduleName: menuData.name,
        moduleLogo: "iconzichanguanli"
      }
    };
  },
  methods: {}
};
</script>

<style lang="less">
  .asset-manage-index{
    height:100%;
  }
</style>
