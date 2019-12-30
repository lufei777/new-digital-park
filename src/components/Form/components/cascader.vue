<template>
  <div class="mi-form_cascader">
    <component
      :is="componentId"
      v-model="text"
      :options="dic"
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
      default: false
    }
  },
  methods: {},
  watch: {
    text: {
      immediate: true,
      handler(value) {
        this.handleChange(value);
      }
    }
  },
  created() {
    if (typeof this.multiple != "undefined") {
      this.props.multiple = this.multiple;
    }
    if (this.type === "cascader-panel") {
      this.componentId = "el-cascader-panel";
    }
  }
};
</script>