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
          id: "11",
          name: "新增人员",
          routeAddress: "/addpersonal"
        }
      ]
    };
    localStorage.setItem("menuList", JSON.stringify(menuList));
  }
};
</script>

<style lang="less">
</style>
