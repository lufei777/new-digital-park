<template>
  <div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="paginationConfig.currentPage"
      :page-sizes="paginationConfig.pageSizes"
      :page-size="paginationConfig.pageSizes[0]"
      :layout="paginationConfig.layout"
      :total="total"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  props: {
    paginationConfig: {
      type: Object,
      required: true
    },
    total: Number,
    handleSizeChange: Function,
    handleCurrentChange: Function
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang='less' scoped>
</style>