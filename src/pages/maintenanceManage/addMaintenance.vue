<template>
  <div class="add-maintenance panel-container">
    <PublicAddMaintenance />
  </div>
</template>

<script>
import PublicAddMaintenance from "./coms/publicAddMaintenance";
export default {
  name: "AddMaintenance",
  components: {
    PublicAddMaintenance
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<style lang="less">
.add-maintenance {
  background: pink;
  height: 100%;
}
</style>