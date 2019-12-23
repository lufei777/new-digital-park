<template>
  <EnergySavingSelect :energySaveFlag="1" />
</template>

<script>
import EnergySavingSelect from "../coms/energySavingSelect";
export default {
  name: "ElecDiffer",
  components: {
    EnergySavingSelect
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
.tabulation {
  padding: 0 20px;
}
</style>
