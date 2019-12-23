<template>
  <div class="contract-manage-index">
    <commonIndex />
  </div>
</template>

<script>
import commonIndex from "../commonProject/coms/commonIndex";
export default {
  name: "ContractManage",
  components: {
    commonIndex
  },
  data() {
    return {
    };
  },
  watch: {},
  methods: {},
  created() {
  }
};
</script>

<style lang="less">
.contract-manage-index {
    height: 100%;
}
</style>
