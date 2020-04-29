<template>
  <div class="elec-sum-coms">
    <elecAndWater from-flag="1" :module-item="moduleItem"></elecAndWater>
  </div>
</template>

<script>
import elecAndWater from './elecAndWater'
export default {
  name: "elecSum",
  components: {
    elecAndWater
  },
  props: ["moduleItem"],
  data() {
    return {}
  },
  methods: {
  },
  mounted() {
  }
};
</script>

<style lang="less">
.elec-sum-coms {

}
</style>
