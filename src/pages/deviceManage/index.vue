<template>
  <div>
    <commonIndex />
  </div>
</template>

<script>
import commonIndex from "../commonProject/coms/commonIndex";

export default {
  name: "ParkingLotManage",
  components: {
    commonIndex
  },
  created() {
    let menuList = {
      routeAddress: '/devicemanage',
      name: '设备管理',
      childNode: [
        {
          childNode: [],
          clientType: "0",
          icon: "icongailan",
          id: 220,
          level: 3,
          name: "设备信息",
          pid: 22,
          routeAddress: "/devicemanage/deviceinfo",
          status: 1
        },
        {
          childNode: [],
          clientType: "0",
          icon: "icongailan",
          id: 221,
          level: 3,
          name: "监控采集",
          pid: 22,
          routeAddress: "/devicemanage/monitorcollection",
          status: 1
        }
      ]
    }
    this.$store.commit('digitalPark/menuList', menuList);
  }
};
</script>
