<template>
  <div class="mi-form_cascader">
    <component
      :is="componentId"
      v-model="text"
      :options="getTreeData(dic)"
      :props="props"
      :size="size"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :multiple="multiple"
      :clearable="disabled?false:clearable"
      :collapse-tags="collapseTags"
      :show-all-levels="showAllLevels"
      :filterable="filterable"
      :separator="separator"
      @change="handleChange"
      @blue="handleBlur"
      @focus="handleFocus"
      @click.native="handleClick"
    >
      <template slot-scope="{ node, data }">
        <slot
          v-if="typeslot"
          :name="`${prop}Type`"
          :node="node"
          :item="data"
          :labelkey="labelKey"
          :valuekey="valueKey"
          :childrenkey="childrenKey"
        ></slot>
        <span v-else>{{ data[labelKey] }}</span>
      </template>
    </component>
  </div>
</template>
<script>
// :change-on-select="changeOnSelect"  :expand-trigger="expandTrigger"
import { validatenull } from "../utils/validate";
import props from "../common/props";
import events from "../common/events";

export default {
  mixins: [props(), events()],
  data() {
    return {
      defaultDic: [],
      netDic: [],
      componentId: "el-cascader"
    };
  },
  props: {
    changeOnSelect: {
      type: Boolean,
      default: false
    },
    expandTrigger: {
      type: String,
      default: "click"
    },
    showAllLevels: {
      type: Boolean,
      default: true
    },
    filterable: {
      type: Boolean,
      default: false
    },
    separator: {
      type: String,
      default: "/"
    },
    collapseTags: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    getTreeData(dic) {
      // 递归将子节点为 空数组 置为 undefined
      // 如果是远程请求，或者不是数组，则原样返回
      if (this.props.lazy || !this.itemIsArray(dic)) {
        return dic;
      }
      let data = dic;
      // 循环遍历json数据
      for (let i = 0, len = data.length; i < len; i++) {
        let childrenNode = data[i][this.childrenKey];
        if (this.itemIsArray(childrenNode) && childrenNode.length === 0) {
          // children若为空数组，则将children设为undefined
          data[i][this.childrenKey] = undefined;
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(childrenNode);
        }
      }
      return data;
    },
    itemIsArray(item) {
      return Object.prototype.toString.call(item) === "[object Array]";
    }
  },
  watch: {
    /* text: {
      immediate: true,
      handler(value) {
        console.log("watch text", value);
        this.handleChange(value);
      }
    } */
  },
  created() {
    if (this.multiple) {
      this.props.multiple = this.multiple;
    }
    // 级联面板
    if (this.type === "cascader-panel") {
      this.componentId = "el-cascader-panel";
    }
  }
};
</script>