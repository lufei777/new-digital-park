<template>
  <div class="add-maintenance panel-container">
    <CommonAddMaintenance :showBoxShadow="true" />
  </div>
</template>

<script>
import CommonAddMaintenance from "./coms/commonAddMaintenance";
import MaintenanceManage from "@/service/api/maintenance-manage";
export default {
  name: "AddMaintenance",
  components: {
    CommonAddMaintenance
  },
  data() {
    return {
      addParams: {}
    };
  },
  methods: {
    getAddParams(params) {
      this.addParams = params;
      console.log("params", params);
      this.add();
    },
    async add() {
      let res = await MaintenanceManage.addRepairs(this.addParams);
      console.log("res", res);
    },
   
  },
  mounted() {}
};
</script>

<style lang="less">
.add-maintenance {
  // height: 100%;
}
</style>