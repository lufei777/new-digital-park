<template>
  <div class="energy-index">
    <commonIndex />
  </div>
</template>

<script>
import Theme from "../../components/theme";
import commonIndex from "../commonProject/coms/commonIndex";
import CommonFun from "../../utils/commonFun";

export default {
  name: "EnergyIndex",
  components: {
    Theme,
    commonIndex
  },
  data() {
    return {

    };
  },
  watch: {
    $route(to, from) {
      this.$store.dispatch("analysis/resetStates"); //重置vuex
    }
  },
  methods: {
    selectMenuCallback(key) {
      console.log(key.path);
      if (key.path == "/energy/timeEnergy") {
        this.$store.commit("selectCondition/activeIndex", 2);
      }
    }
  },
  created() {
    this.$store.dispatch("analysis/setDefaultNode");
  }
};
</script>

<style lang="less">
.energy-index {
  height: 100%;
}
</style>
