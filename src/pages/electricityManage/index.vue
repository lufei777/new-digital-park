<template>
  <commonIndex />
</template>

<script>
import commonIndex from "../commonProject/coms/commonIndex";

export default {
  components: {
    commonIndex
  },
  data() {
    return {};
  },
  created() {
    let menuList = {
      id: "1",
      name: "用电管理",
      routeAddress: "/personalmanage",
      childNode: [
        {
          id: "12",
          name: "用电基础数据",
          routeAddress: "/revenuerecord",
          childNode: [
            {
              id: "121",
              name: "租户用电数据",
              routeAddress: "/electricitymanage/tenantelectricity",
            },
            {
              id: "122",
              name: "电表维护",
              routeAddress: "/electricitymanage/tenantelectricitymeter",
            },
            {
              id: "123",
              name: "电价维护",
              routeAddress: "/electricitymanage/elecpricemaintain",
            }
          ]
        },
        {
          id: "13",
          name: "电表抄表记录",
          routeAddress: "/expendrecord",
          childNode: [
            {
              id: "131",
              name: "用户电表抄表记录",
              routeAddress: "/electricitymanage/meterreadrecords",
            }
          ]
        },
        {
          id: "14",
          name: "用电收费明细",
          routeAddress: "/electricitymanage/chargeelectricityDetail"
        },
        {
          id: "15",
          name: "用电月账单",
          routeAddress: "/electricitymanage/electricityMonthlyBill"
        }
      ]
    };
    this.$store.commit('digitalPark/menuList', menuList);
  }
};
</script>

<style lang="less">
</style>
