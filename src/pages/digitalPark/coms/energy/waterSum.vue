<template>
  <div class="water-sum-coms">
    <elecAndWater from-flag="2" :module-item="moduleItem"></elecAndWater>
  </div>
</template>

<script>
  import elecAndWater from './elecAndWater'
export default {
  name: "waterSum",
  components: {
    elecAndWater
  },
  props: ["moduleItem"],
  data() {
    return {};
  },
  methods: {
  },
  mounted() {
  }
};
</script>

<style lang="less">
</style>
