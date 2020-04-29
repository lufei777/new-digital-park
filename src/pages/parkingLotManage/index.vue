<template>
  <div class="lease-index">
    <commonIndex />
  </div>
</template>

<script>
import Theme from "../../components/theme";
import commonIndex from "../commonProject/coms/commonIndex";
import CommonFun from "../../utils/commonFun";

export default {
  name: "ParkingLotManage",
  components: {
    Theme,
    commonIndex
  },
  data() {
    let menuList = {
      childNode: [
        {
          childNode: [],
          clientType: "0",
          firstMenuId: 2,
          icon: "icongailan",
          id: 220,
          level: 3,
          name: "场区记录",
          pid: 22,
          routeAddress: "/parkinglotmanage/parkinglotrecord",
          secondMenuId: 22,
          status: 1
        },
        {
          childNode: [],
          clientType: "0",
          firstMenuId: 2,
          icon: "icongailan",
          id: 220,
          level: 3,
          name: "车位停车管理",
          pid: 22,
          routeAddress: "/parkinglotmanage/parkingplacerecord",
          secondMenuId: 22,
          status: 1
        }
      ],
      routeAddress: '/parkinglotmanage',
      name: '停车管理'
    }
    this.$store.commit('digitalPark/menuList', menuList);
    return {

    };
  },
  watch: {},
  methods: {},
  created() {
    console.log('created');
  }
};
</script>

<style lang="less">
</style>
