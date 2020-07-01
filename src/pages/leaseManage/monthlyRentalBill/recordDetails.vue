<template>
      <div class='panel-container'>
    <div class="panel">

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {},
      tabelData: {
        ref: "tab",
        data: [],
        columnConfig: [],
        uiConfig: {
          height: "auto", //"", //高度
          selection: true, //是否多选
          showIndex: {
            width: 50
          },
          pagination: {
            //是否分页，分页是否自定义
            // pageSizes: [10, 20, 50],
            handler(pageSize, currentPage, table) {
            //   _this.handleCurrentChange(currentPage);
            }
          }
        }
      }
    };
  },
  methods: {},
  created() {},
  mounted() {}
};
</script>

<style  scoped lang="less">
</style>
