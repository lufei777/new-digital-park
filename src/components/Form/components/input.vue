<template>
  <div>
    <div class="el-input_tree" v-if="type==='tree'" v-clickout="closeBox">
      <el-input
        :size="size"
        v-model="labelShow"
        :type="typeParam"
        :clearable="disabled?false:clearable"
        :autosize="{ minRows: minRows, maxRows: maxRows}"
        :prefix-icon="prefixIcon"
        :suffix-icon="suffixIcon"
        :placeholder="placeholder"
        :show-word-limit="showWordLimit"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
        :disabled="disabled"
        :readonly="true"
        @click.native="disabled?'':open()"
      />
      <transition name="el-zoom-in-top">
        <div class="el-input_tree_box" v-if="box" :style="treeStyle">
          <div></div>
          <el-input
            size="mini"
            style="margin-bottom:8px;"
            placeholder="输入关键字进行过滤"
            v-model="filterText"
            v-if="filter"
          ></el-input>
          <el-scrollbar style="height:180px;overflow-x:hidden !important;">
            <el-tree
              :data="dicList"
              :node-key="valueKey"
              :accordion="accordion"
              :show-checkbox="multiple"
              :props="props"
              :check-strictly="checkStrictly"
              ref="tree"
              highlight-current
              :current-node-key="multiple?'':text"
              @check="checkChange"
              :filter-node-method="filterNode"
              :default-expanded-keys="defaultExpandedKeys?defaultExpandedKeys:(defaultExpandAll?keysList:[])"
              :default-checked-keys="defaultCheckedKeys?defaultCheckedKeys:keysList"
              :default-expand-all="defaultExpandAll"
              @node-click.self="handleNodeClick"
            >
              <div style="width:100%;padding-right:10px;" slot-scope="{ data }">
                <slot
                  :name="prop+'Type'"
                  :label="labelKey"
                  :value="valueKey"
                  :item="data"
                  v-if="typeslot"
                ></slot>
                <span v-else>{{getLabelText(data)}}</span>
              </div>
            </el-tree>
          </el-scrollbar>
        </div>
      </transition>
    </div>
    <el-input
      v-else
      :clearable="disabled?false:clearable"
      v-model="text"
      :type="typeParam"
      :autofocus="autofocus"
      :maxlength="maxlength"
      :minlength="minlength"
      :placeholder="placeholder"
      :prefix-icon="prefixIcon"
      :suffix-icon="suffixIcon"
      :readonly="readonly"
      :show-word-limit="showWordLimit"
      :disabled="disabled"
      :autocomplete="autocomplete"
      :show-password="showPassword"
      :autosize="{minRows:minRows,maxRows:maxRows}"
      @focus="handleFocus"
      @blur="handleBlur"
      @click.native="handleClick"
      @change="handleChange"
    >
      <template slot="prepend" v-if="prepend || prependslot">
        <!-- <span @click="prependClick()">{{prepend}}</span> -->
        <div @click="prependClick()" v-html="prepend"></div>
        <slot :name="prependslot"></slot>
      </template>
      <template slot="append" v-if="append || appendslot">
        <!-- <span @click="appendClick()">{{append}}</span> -->
        <div @click="appendClick()" v-html="append"></div>
        <slot :name="appendslot"></slot>
      </template>
      <template slot="suffix" v-if="suffix">
        <div v-html="suffix"></div>
      </template>
      <template slot="prefix" v-if="prefix">
        <div v-html="prefix"></div>
      </template>
    </el-input>
  </div>
</template>
<script>
import { validatenull } from "../utils/validate";
import props from "../common/props";
import events from "../common/events";
import { DIC_SPLIT } from "../global/variable";
import { findLabelNode } from "../utils/util";

export default {
  name: "mi-input",
  mixins: [props(), events()],
  props: {
    rawtype: {
      type: String
    },
    minlength: {
      type: Number
    },
    maxlength: {
      type: Number
    },
    prefixIcon: {
      type: String
    },
    suffixIcon: {
      type: String
    },
    showWordLimit: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String
    },
    showPassword: Boolean,
    minRows: {
      type: Number,
      default: 5
    },
    maxRows: {
      type: Number,
      default: 10
    },
    prependClick: {
      type: Function,
      default: () => {}
    },
    prepend: {
      type: String
    },
    appendClick: {
      type: Function,
      default: () => {}
    },
    append: {
      type: String
    },
    prependslot: String,
    appendslot: String,
    suffix: {},
    prefix: {},
    autofocus: Boolean,
    // 以下为树
    filter: {
      type: Boolean,
      default: true
    },
    accordion: {
      type: Boolean,
      default: false
    },
    checkStrictly: {
      type: Boolean,
      default: false
    },
    defaultExpandedKeys: {
      type: Array
    },
    defaultCheckedKeys: {
      type: Array
    },
    defaultExpandAll: {
      type: Boolean,
      default: true
    },
    parent: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      isFirst: true,
      treeStyle: {
        left: 0,
        top: 0
      },
      node: {},
      filterText: "",
      box: false,
      labelText: this.multiple ? [] : ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    validatenull,
    closeBox() {
      this.box = false;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data[this.labelKey].indexOf(value) !== -1;
    },
    checkChange(checkedNodes, checkedKeys, halfCheckedNodes, halfCheckedKeys) {
      this.text = [];
      this.labelText = [];
      const list = checkedKeys.checkedNodes;
      list.forEach(node => {
        if (validatenull(node[this.childrenKey]) && !this.checkStrictly) {
          this.text.push(node[this.valueKey]);
          this.labelText.push(node[this.labelKey]);
        } else if (this.checkStrictly) {
          this.text.push(node[this.valueKey]);
          this.labelText.push(node[this.labelKey]);
        }
      });
      if (typeof this.checked === "function") this.checked(checkedNodes);
      const result =
        this.isString && this.multiple ? this.text.join(",") : this.text;
      this.$emit("input", result);
      this.$emit("change", result);
    },
    open() {
      let height = this.$el.offsetHeight;
      let width = this.$el.getBoundingClientRect().width;
      let left = this.$el.getBoundingClientRect().left;
      let top = this.$el.getBoundingClientRect().top;
      let bottom = this.$el.getBoundingClientRect().bottom;

      this.treeStyle = {
        // top: `${top + height}px`,
        top: `${height}px`,
        left: `${0}px`,
        width: `${width}px`
      };
      this.box = true;
      this.$nextTick(() => {
        let boxHeight = document.querySelector(".el-input_tree_box")
          .clientHeight;
        let bodyHeight = document.querySelector("body").clientHeight;
        let boxTop;

        if (bodyHeight - (top + height) < boxHeight) {
          boxTop = -boxHeight - 10;
          this.treeStyle.top = `${boxTop}px`;
        }
      });
      this.handleClick();
    },
    init() {
      if (this.isTree) {
        if (this.multiple) {
          this.labelText = [];
        } else {
          this.labelText = "";
        }
        const check = setInterval(() => {
          if (validatenull(this.dic)) {
            this.labelText = "";
            clearInterval(check);
            return;
          }
          //是否禁止父类
          !this.parent && this.disabledParentNode(this.dic);
          if (this.multiple) {
            this.labelText = [];
            if (!validatenull(this.text)) {
              this.text.forEach(ele => {
                //特殊处理0
                ele = validatenull(ele) ? 0 : ele;
                const label = findLabelNode(this.dic, ele, this.props) || ele;
                this.labelText.push(label);
              });
            }
          } else {
            this.labelText = "";
            if (!validatenull(this.text)) {
              this.labelText = this.text;
              const label =
                findLabelNode(this.dic, this.text, this.props) || this.text;
              this.node = {};
              this.node[this.labelKey] = label;
              this.labelText = label;
            }
          }
          setTimeout(() => {
            this.$partent && this.$partent.$parent.clearValidate();
          }, 0);
          clearInterval(check);
        }, 500);
      }
    },
    disabledParentNode(dic) {
      dic.forEach(ele => {
        const children = ele[this.childrenKey];
        if (!validatenull(children)) {
          ele.disabled = true;
          this.disabledParentNode(children);
        }
      });
    },
    handleNodeClick(data) {
      const callback = () => {
        this.box = false;
        this.node = data;
      };
      if (typeof this.nodeClick === "function") this.nodeClick(data);
      if (this.multiple) return;
      if (
        (validatenull(data[this.childrenKey]) && !this.multiple) ||
        this.parent
      ) {
        const value = data[this.valueKey];
        const label = data[this.labelKey];
        const result = this.isString && this.multiple ? value.join(",") : value;
        this.text = value;
        this.labelText = label;
        this.$emit("input", result);
        this.$emit("change", result);
        callback();
      }
    }
  },
  computed: {
    typeParam: function() {
      if (this.rawtype) return this.rawtype;
      switch (this.type) {
        case "textarea":
          return "textarea";
          break;
        case "password":
          return "password";
          break;
        default:
          return "text";
          break;
      }
    },
    dicList() {
      function addParent(result, parent) {
        result.forEach(ele => {
          const children = ele.children;
          if (children) {
            addParent(children, ele);
          }
          if (parent) {
            ele.$parent = parent;
          }
        });
      }
      let list = this.dic;
      addParent(list);
      return list;
    },
    keysList() {
      return this.multiple ? this.text : [];
    },
    isTree() {
      return this.type === "tree";
    },
    labelShow() {
      if (this.validatenull(this.value)) {
        return "";
      } else if (this.multiple) {
        return (this.labelText || []).join(DIC_SPLIT).toString();
      }
      return this.getLabelText(this.node);
    },
    textShow() {
      if (this.textLen === 11)
        return `${this.text.substr(0, 3)} ${this.text.substr(
          3,
          4
        )} ${this.text.substr(7, 4)}`;
      return this.text;
    },
    textLen() {
      return (this.text || "").length || 0;
    }
  },
  watch: {
    text: {
      immediate: true,
      handler(value) {
        if (!this.isFirst) {
          this.isFirst = false;
          this.handleChange(value);
        } else {
          this.isFirst = false;
        }
      }
    },
    value() {
      this.init();
    },
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  }
};
</script>
<style lang='less' scoped>
.el-input_tree_box {
  padding: 3px 5px;
  border: 1px solid #e4e7ed;
  border-radius: 4px;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  margin: 5px 0;
  width: 100%;
  height: auto;
  overflow: hidden;
  min-width: 150px;
  max-height: 250px;
  background-color: #fff;
  position: absolute;
  z-index: 2001;
  overflow: hidden;
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>