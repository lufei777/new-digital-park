<template>
  <div>
    <z-table ref="crud" :options="options">
      <template slot-scope="{scopeRow:scope}" slot="index">
        <el-button
          v-if="!delBtn && hoverList[scope.row.$index] && !disabled"
          @mouseout.native="mouseoutRow(scope.row.$index)"
          @click="delRow(scope.row.$index)"
          type="danger"
          size="mini"
          :disabled="disabled"
          icon="el-icon-delete"
          circle
        ></el-button>
        <span
          v-else-if="delBtn || !hoverList[scope.row.$index]"
          @mouseover="mouseoverRow(scope.row.$index)"
        >{{scope.row.$index+1}}</span>
      </template>
    </z-table>
  </div>
</template>

<script>
import props from "../../../common/props";
import events from "../../../common/events";

export default {
  name: "zDynamic",
  mixins: [props(), events()],
  data() {
    return {
      hoverList: []
    };
  },
  props: {
    children: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    rowAdd() {
      return this.children.tableMethods.rowAdd;
    },
    rowDel() {
      return this.children.tableMethods.rowDel;
    },
    viewBtn() {
      return this.children.viewBtn === false;
    },
    delBtn() {
      return this.children.delBtn === false;
    },
    columnOption() {
      return this.children.columnConfig || [];
    },
    options() {
      return Object.assign(
        (() => {
          let options = this.deepClone(this.children);
          delete options.columnConfig;
          return options;
        })(),
        (() => {
          let list = [
            {
              label: "#",
              prop: "index",
              fixed: true,
              width: 50,
              slot: true,
              renderHeader: (h, { column, $index }) => {
                if (this.options.addBtn === false) {
                  return "序号";
                }
                return h("el-button", {
                  attrs: {
                    size: "mini",
                    type: "primary",
                    icon: "el-icon-plus",
                    disabled: this.disabled,
                    circle: true
                  },
                  on: {
                    click: this.addRow
                  }
                });
              }
            }
          ];
          this.columnOption.forEach(ele => {
            list.push(
              Object.assign(ele, {
                cell: true,
                disabled: this.disabled || this.viewBtn
              })
            );
          });
          return {
            data: this.text,
            columnConfig: list
          };
        })()
      );
    }
  },
  mounted() {
    this.initData();
  },
  watch: {
    text() {
      this.initData();
    }
  },
  methods: {
    initData() {
      this.text.forEach((ele, index) => {
        ele = Object.assign(ele, {
          $cellEdit: true
        });
      });
    },
    mouseoverRow(index) {
      if (this.delBtn) return;
      this.flagList();
      this.$set(this.hoverList, index, true);
    },
    mouseoutRow(index) {
      if (this.delBtn) return;
      this.flagList();
      this.$set(this.hoverList, index, false);
    },
    flagList() {
      this.hoverList.forEach((ele, index) => {
        ele = false;
      });
    },
    delRow(index) {
      const callback = () => {
        this.text.splice(index, 1);
      };
      const row = this.text[index];
      if (typeof this.rowDel === "function") {
        this.rowDel(row, callback);
      } else {
        callback();
      }
    },
    addRow() {
      const callback = (obj = {}) => {
        this.$refs.crud.rowCellAdd(obj);
      };
      if (typeof this.rowAdd === "function") {
        this.rowAdd(callback);
      } else {
        callback();
      }
    }
  }
};
</script>
