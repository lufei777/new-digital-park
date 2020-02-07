<template>
  <div class="personal-index">
    <commonIndex />
  </div>
</template>

<script>
import commonIndex from "../commonProject/coms/commonIndex";

export default {
  name: "PersonalIndex",
  components: {
    commonIndex
  },
  data() {
    return {};
  },
  created() {
    let menuList = {
      id: "1",
      name: "人事管理",
      routeAddress: "/personalmanage",
      childNode: [
        {
          id: "12",
          name: "人员信息",
          routeAddress: "/personalmanageinfo"
        }
      ]
    };
    localStorage.setItem("menuList", JSON.stringify(menuList));
  }
};
</script>

<style lang="less">
</style>
