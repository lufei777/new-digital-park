<template>
  <div class="asset-manage-index">
    <commonIndex></commonIndex>
  </div>
</template>

<script>
import commonIndex from "../commonProject/coms/commonIndex";
export default {
  name: "AssetManage",
  components: { commonIndex },
  data() {
    return {
    };
  },
  methods: {}
};
</script>

<style lang="less">
  .asset-manage-index{
    height:100%;
  }
</style>
