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
          <form-temp
            v-if="cellEditFlag(scopeRow.row,col)"
            v-model="scopeRow.row[col.prop]"
            :column="col"
            :size="crud.isMediumSize"
            :dic="crud.DIC[col.prop]"
            :upload-before="col.uploadBefore"
            :upload-after="col.uploadAfter"
            :disabled="col.disabled"
            @click.native.stop
          ></form-temp>
          <slot
            v-else-if="col.slot"
            :name="col.prop"
            :label="handleShowLabel(scopeRow.row,col,crud.DIC[col.prop])"
            :scopeRow="scopeRow"
            :row="scopeRow.row"
            :size="crud.isMediumSize"
            :dic="crud.DIC[col.prop]"
          ></slot>
          <template v-else>
            <span v-html="_columnFormatter(scopeRow,col)"></span>
          </template>
        </template>
      </el-table-column>
    </template>
  </span>
</template>
<script>
import { detail } from "../../Form/utils/detail";
import { validatenull } from "../../Form/utils/validate";
import formTemp from "../../Form/formtemp";

export default {
  name: "column",
  inject: ["crud"],
  props: {
    columnConfig: {
      type: Array,
      required: true,
      default: []
    }
  },
  components: { formTemp },
  data() {
    return {
      DIC: {}
    };
  },
  methods: {
    validatenull,
    // 由于slot-scope和formatter不能共存只能如此
    _columnFormatter(scopeRow, currentColumn) {
      let row = scopeRow.row;
      let column = scopeRow.column;

      if (typeof currentColumn.formatter === "function") {
        return currentColumn.formatter(row, column);
      } else {
        return this._globalColumnFormatter(row, column, currentColumn);
      }
    },
    // 全局初始化
    _globalColumnFormatter(row, column, currentColumn) {
      let value = row[column.property];
      if (typeof value === "string" && value.trim().length === 0) {
        return "--";
      }
      if (!value) {
        return "--";
      }
      return this.handleDetail(
        row,
        currentColumn,
        this.DIC[currentColumn.prop]
      );
    },
    cellEditFlag(row, column) {
      return row.$cellEdit && column.slot !== true && column.cell;
    },
    handleDetail(row, column, DIC) {
      let result = row[column.prop];
      result = detail(row, column, this.tableOption, DIC);
      if (!this.validatenull(DIC)) {
        row["$" + column.prop] = result;
      }
      return result;
    },
    handleShowLabel(row, column, DIC) {
      let result = "";
      result = detail(row, column, this.tableOption, DIC);
      if (!this.validatenull(DIC)) {
        row["$" + column.prop] = result;
      }
      return result;
    }
  }
};
</script>