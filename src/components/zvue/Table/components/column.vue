<template>
  <span>
    <template v-for="col in columnConfig">
      <el-table-column
        v-if="!col.hide"
        :key="col.label"
        :prop="col.prop"
        :label="col.label"
        :width="col.width"
        :fixed="col.fixed"
        :sortable="col.sortable || false"
        :align="col.align || 'left'"
        show-overflow-tooltip
      >
        <!-- 列标题slot -->
        <template v-if="col.headerSlot" slot="header">
          <slot :name="`${col.prop}Header`" :column="col"></slot>
        </template>
        <!-- 内容 -->
        <template slot-scope="scopeRow">
          <!-- 自定义 -->
          <slot v-if="col.slot" :name="col.prop" :scopeRow="scopeRow"></slot>
          <template v-else>
            <!-- <el-input
              class="edit-row-input"
              size="small"
              v-model="scope.row[col.prop]"
              placeholder="请输入内容"
              @change="_handleRowEdit(scopeRow)"
            ></el-input>-->
            <span v-html="_columnFormatter(scopeRow,col)"></span>
          </template>
        </template>
      </el-table-column>
    </template>
  </span>
</template>
<script>
export default {
  name: "column",
  props: {
    columnConfig: {
      type: Array,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    // 由于slot-scope和formatter不能共存只能如此
    _columnFormatter(scopeRow, currentColumn) {
      let row = scopeRow.row;
      let column = scopeRow.column;

      if (typeof currentColumn.formatter === "function") {
        return currentColumn.formatter(row, column);
      } else {
        return this._globalColumnFormatter(row, column);
      }
    },
    // 全局初始化
    _globalColumnFormatter(row, column) {
      let value = row[column.property];
      if (typeof value === "string" && value.trim().length === 0) {
        return "--";
      }
      if (!value) {
        return "--";
      }
      return value;
    }
  }
};
</script>