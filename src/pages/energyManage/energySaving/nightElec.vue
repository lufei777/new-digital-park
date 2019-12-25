<template>
  <EnergySavingSelect :energySaveFlag="2" />
</template>

<script>
import EnergySavingSelect from "../coms/energySavingSelect";
export default {
  name: "NightElec",
  components: {
    EnergySavingSelect
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
