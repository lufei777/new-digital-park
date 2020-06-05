<template>
  <div class="lease-index">
    <commonIndex />
  </div>
</template>

<script>
import Theme from "@/components/theme";
import commonIndex from "../commonProject/coms/commonIndex";
import CommonFun from "utils/commonFun";

export default {
  name: "ParkingLotManage",
  components: {
    Theme,
    commonIndex
  },
  data() {
    let menuList = {
      routeAddress: '/devicemanage',
      name: '设备管理',
      childNode: [
        {
          childNode: [],
          clientType: "0",
          firstMenuId: 2,
          icon: "icongailan",
          id: 220,
          level: 3,
          name: "设备信息",
          pid: 22,
          routeAddress: "/devicemanage/deviceinfo",
          secondMenuId: 22,
          status: 1
        },
        {
          childNode: [],
          clientType: "0",
          firstMenuId: 2,
          icon: "icongailan",
          id: 221,
          level: 3,
          name: "监控采集",
          pid: 22,
          routeAddress: "/devicemanage/monitorcollection",
          secondMenuId: 22,
          status: 1
        }
      ]
    }
    this.$store.commit('digitalPark/menuList', menuList);
    return {

    };
  },
  watch: {},
  methods: {}
};
</script>

<style lang="less">
</style>
