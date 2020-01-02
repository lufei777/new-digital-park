<template>
  <div>
    <template v-for="col in columnConfig">
      <el-table-column
        v-if="!col.hide"
        :key="col.label"
        :prop="col.prop"
        :label="col.label"
        :width="col.width"
        :fixed="col.fixed"
        :sortable="col.sortable||false"
        :formatter="col.formatter"
        show-overflow-tooltip
      >
        <!-- <template slot-scope="scopeRow"></template> -->
      </el-table-column>
    </template>
  </div>
</template>
<script>
export default {
  props: {
    columnConfig: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>