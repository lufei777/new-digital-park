<template>
  <div>
    <el-pagination
      @size-change="sizeChange"
      @current-change="currentChange"
      :current-page.sync="curPage"
      :page-sizes="pageSizes"
      :page-size.sync="size || pageSizes[0]"
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
    pageSize: Number,
    currentPage: Number,
    total: Number,
    handleSizeChange: Function,
    handleCurrentChange: Function
  },
  data() {
    return {};
  },
  methods: {
    sizeChange(...args) {
      this.handleSizeChange(...args);
    },
    currentChange(...args) {
      this.handleCurrentChange(...args);
    }
  },
  computed: {
    curPage: {
      get() {
        return this.currentPage;
      },
      set(...args) {}
    },
    size: {
      get() {
        return this.pageSize;
      },
      set() {}
    },
    pageSizes() {
      return this.paginationConfig.pageSizes;
    }
  }
};
</script>
<style lang='less' scoped>
</style>