<template>
    <div class="service-audit">
        维保管理2
    </div>
</template>

<script>
import maintenanceManage from "../../service/api/maintenance-manage";
export default {
  name: "ServiceAudit",
  data() {
    return{

    }
  },
  methods:{
    async test(){
      let res = await maintenanceManage.getRepairs()
      console.log("res",res)
    }
  },
  mounted(){
    this.test()
  }
};
</script>

<style lang="less">
.service-audit {

}
</style>