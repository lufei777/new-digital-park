<template>
  <div class="revenue-expend-index">
    <commonIndex @hooks:beforecreated="setMenuList" />
  </div>
</template>

<script>
import commonIndex from "../commonProject/coms/commonIndex";

export default {
  name: "RevenueExpendIndex",
  components: {
    commonIndex
  },
  data() {
    return {};
  },
  methods: {
    setMenuList() {
      let menuList = {
        id: "1",
        name: "收支管理",
        routeAddress: "/personalmanage",
        childNode: [
          {
            id: "12",
            name: "收入记录",
            routeAddress: "/revenuerecord"
          },
          {
            id: "13",
            name: "支出记录",
            routeAddress: "/expendrecord"
          },
          {
            id: "14",
            name: "预算管理",
            routeAddress: "/budgetmanage"
          },
          {
            id: "15",
            name: "统计分析",
            routeAddress: "/statisticanalysis"
          }
        ]
      };
      localStorage.setItem("menuList", JSON.stringify(menuList));
    }
  }
};
</script>

<style lang="less">
</style>
