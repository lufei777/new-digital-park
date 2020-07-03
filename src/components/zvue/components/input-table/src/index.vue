<template>
  <el-popover v-model="show">
    <el-input
      slot="reference"
      :size="size"
      :value="labelShow"
      :clearable="disabled?false:clearable"
      :placeholder="placeholder"
      @focus="handleFocus"
      @blur="handleBlur"
      @clear="handleClear"
      :disabled="disabled"
      readonly
    ></el-input>
    <z-table ref="inputTable" :options="option" @row-click="handleCurrentRowChange"></z-table>
  </el-popover>
</template>

<script>
import props from "../../../common/props";
import events from "../../../common/events";
import { validatenull } from "../../../utils/validate";

export default {
  name: "zInputTable",
  mixins: [props(), events()],
  data() {
    return {
      active: null,
      show: false,
      create: false,
      option: Object.assign({
        menuBtn: false,
        size: 'mini',
        headerAlign: 'center',
        align: 'center',
        data: [],
        uiConfig: {
          height: '400',
          pagination: {}
        }
      }, this.column.children)
    };
  },
  props: {
    formatter: Function,
    onLoad: Function
  },
  mounted() {
    // 如果不是serverMode则走onLoad方法
    typeof this.onLoad === 'function' && this.onLoad({ page: '', value: '' }, data => {
      this.setTable({ data: data[this.listKey], total: data[this.totalKey] });
    })
  },
  watch: {
    text: {
      immediate: true,
      handler(val) {
        if (this.create || validatenull(val)) {
          this.create = false;
          return;
        }
        // 初始化数据
        this.onList(val => {
          this.active = val;
          // 首次触发change事件
          this.handleCurrentRowChange(val);
        });
      }
    }
  },
  computed: {
    Table() {
      return this.$refs.inputTable;
    },
    labelShow() {
      if (validatenull(this.text)) {
        return this.text
      }
      if (this.active === null) {
        return; '';
      }
      if (typeof this.formatter == 'function') {
        return this.formatter(this.active)
      }
      return this.active[this.labelKey] || ''
    },
    isServerMode() {
      return !!this.option.serverMode;
    },
    listKey() {
      return this.Table ? this.Table.listKey : 'list'
    },
    totalKey() {
      return this.Table ? this.Table.totalKey : 'total'
    }
  },
  methods: {
    setTable({ data = [], total }) {
      if (this.Table) {
        this.Table.setTotal(total);
        this.Table.setData(data);
      } else {
        this.option.data = data;
        this.option.uiConfig.pagination.total = total;
      }
    },
    handleClear() {
      this.handleCurrentRowChange({})
    },
    handleCurrentRowChange(val) {
      this.active = val;
      this.text = this.active[this.valueKey] || ''
      this.handleChange(this.text)
      this.show = false;
      this.create = true;
    },
    onList(callback) {
      // 加载数据
      if (this.isServerMode) {
        let { url, data } = this.option.serverMode;
        if (typeof url === 'function') {
          url({ ...data, [this.valueKey]: this.text }).then(res => {
            if (typeof callback == 'function') {
              callback(res[this.listKey][0])
            } else {
              this.setTable({ data: res[this.listKey], total: res[this.totalKey] });
            }
          })
        }
      } else if (typeof this.onLoad == 'function') {
        this.onLoad({ page: this.Table ? this.Table.pagination : '', value: this.text }, data => {
          if (typeof callback == 'function') {
            callback(data[this.listKey][0])
          } else {
            this.setTable({ data: data[this.listKey], total: data[this.totalKey] });
          }
        })
      }
    }
  }
};
</script>
