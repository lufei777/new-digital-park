<template>
  <div class="el-form_wrapper" :style="setPx(parentOption.formSize,'100%')">
    <el-form
      ref="form"
      status-icon
      :label-suffix="parentOption.labelSuffix || '：'"
      :rules="formRules"
      :model="model"
      :size="controlSize"
      :label-width="setPx(parentOption.labelWidth,90)"
      :label-position="parentOption.labelPosition"
      :hide-required-asterisk="parentOption.hideRequiredAsterisk"
      :show-message="parentOption.showMessage"
      :inline-message="parentOption.inlineMessage"
    >
      <el-row :span="24">
        <z-group
          v-for="(item,index) in columnOption"
          :key="item.prop"
          :display="item.display"
          :icon="item.icon"
          :card="parentOption.card"
          :label="item.label"
        >
          <template slot="header" v-if="$slots[item.prop+'Header']">
            <slot :name="`${item.prop}Header`"></slot>
          </template>
          <div class="z-form_group">
            <template v-for="(column, cindex) in item.forms">
              <el-col
                :key="column.prop"
                :span="column.span || itemSpanDefault"
                :offset="column.offset || 0"
                :push="column.push || 0"
                :pull="column.pull || 0"
                :xs="24"
                v-if="vaildDisplay(column)"
              >
                <el-form-item
                  :class="[_.isEmpty(column.label)?'el-form-item_emptylabel' : '']"
                  :label="column.label"
                  :prop="column.prop"
                  :required="column.required"
                  :error="column.error"
                  :show-message="column.showMessage"
                  :inline-message="column.inlineMessage"
                  :size="column.size || controlSize"
                  :label-width="setPx(column.width,parentOption.labelWidth || 90)"
                >
                  <!-- 如果是禁用tooltip，则tabindex 为 -1 -->
                  <el-tooltip
                    :tabindex="!column.tip || column.type==='upload' ? -1 : 0"
                    :disabled="!column.tip || column.type==='upload'"
                    :content="vaildData(column.tip,getPlaceholder(column))"
                    :placement="column.tipPlacement"
                  >
                    <slot
                      v-if="column.formslot"
                      :name="column.prop"
                      :value="model[column.prop]"
                      :column="column"
                      :label="model['$'+column.prop]"
                      :size="column.size || controlSize"
                      :disabled="vaildBoolean(column.disabled,allDisabled)"
                      :dic="DIC[column.prop]"
                    ></slot>
                    <form-temp
                      v-else
                      v-model="model[column.prop]"
                      :column="column"
                      :dic="DIC[column.prop]"
                      :upload-before="uploadBefore"
                      :upload-after="uploadAfter"
                      :disabled="vaildBoolean(column.disabled,allDisabled)"
                    >
                      <!-- 自定义表单里内容 -->
                      <template
                        :slot="`${column.prop}Type`"
                        slot-scope="{item,labelkey,valuekey,childrenkey,node}"
                        v-if="column.typeslot"
                      >
                        <slot
                          :name="`${column.prop}Type`"
                          :size="column.size || controlSize"
                          :item="item"
                          :labelkey="labelkey"
                          :valuekey="valuekey"
                          :childrenkey="childrenkey"
                          :node="node"
                        ></slot>
                      </template>
                      <!-- input的slot处理 -->
                      <template v-if="column.prependslot" :slot="column.prependslot">
                        <slot
                          :name="column.prependslot"
                          :disabled="vaildBoolean(column.disabled,allDisabled)"
                        ></slot>
                      </template>
                      <template v-if="column.appendslot" :slot="column.appendslot">
                        <slot
                          :name="column.appendslot"
                          :disabled="vaildBoolean(column.disabled,allDisabled)"
                        ></slot>
                      </template>
                    </form-temp>
                  </el-tooltip>
                </el-form-item>
              </el-col>
              <!-- 用作空行填充 -->
              <el-col
                :key="cindex"
                tag="div"
                style="display:inline-block;height:42px;"
                :span="column.count"
                v-if="column.row && column.span!==24 && column.count"
              ></el-col>
            </template>
          </div>
        </z-group>
        <el-col :span="24" v-if="vaildData(parentOption.menuBtn,true)">
          <el-form-item>
            <!-- 菜单按钮组 -->
            <div :class="`form_menu-${menuPosition}`">
              <el-button
                type="primary"
                @click="submit"
                :size="controlSize"
                icon="el-icon-check"
                :loading="allDisabled"
                v-if="vaildData(parentOption.submitBtn,true)"
              >{{vaildData(parentOption.submitText,'确 定')}}</el-button>
              <el-button
                icon="el-icon-delete"
                :size="controlSize"
                :loading="allDisabled"
                v-if="vaildData(parentOption.emptyBtn,true)"
                @click="resetForm"
              >{{vaildData(parentOption.emptyText,'清 空')}}</el-button>
              <slot name="menuBtn" :size="controlSize"></slot>
            </div>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import formTemp from "./formtemp";
import {
  deepClone,
  vaildData,
  vaildBoolean,
  setPx,
  filterDefaultParams,
  findArray
} from "./utils/util";
import { validatenull } from "./utils/validate";
import { detail } from "./utils/detail";
import {
  calcCascader,
  calcCount,
  getPlaceholder,
  formInitVal
} from "./utils/dataformat";
import init from "./common/init";

// 设置默认值
const _objKeysForeach = function(obj, cb) {
  Object.keys(obj).forEach(function(key, index) {
    cb(key, obj[key], index);
  });
};
const setDefaultValue = function(defaultOptions, options, vm) {
  _objKeysForeach(defaultOptions, function(key, value, index) {
    vm.$set(options, key, value);
  });
};

export default {
  name: "zForm",
  mixins: [init()],
  components: { formTemp },
  props: {
    uploadBefore: Function,
    uploadAfter: Function,
    value: {
      type: Object,
      required: true,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      itemSpanDefault: 12,
      formRules: {},
      formCreate: true, // 表单是否第一次创建
      modelOld: {}, // 表单上一次更新的model
      modelDefault: {}, // 表单的初始model
      model: {}, // 表单的model
      modelTranslate: {}, // 翻译的值
      allDisabled: false
    };
  },
  created() {
    // console.log("form create");
    //初始化字典
    this.columnOption.forEach(ele => {
      this.handleLoadDic(ele).then(res => {
        this.forEachLabel();
      });
    });
    // 初始化表单
    this.dataFormat();
  },
  methods: {
    deepClone,
    validatenull,
    vaildData,
    vaildBoolean,
    getPlaceholder,
    setPx,
    findArray,
    dataFormat() {
      // 页面初始化
      let modelDefault = formInitVal(this.propOption);
      this.modelDefault = modelDefault;

      this.model = deepClone(modelDefault.tableForm);
      this.formVal();
    },
    formRulesInit() {
      let _self = this;
      _.map(this.propOption, (item, key) => {
        if (item.rules && item.disabled !== false && item.display !== false) {
          let currentRules = item.rules;
          // 必填时自动生成message
          if (
            !currentRules.message ||
            currentRules.message.trim().length === 0
          ) {
            if (currentRules.required) {
              currentRules.message = `必填，请填写${item.label}`;
            }
          }
          // 添加进rules
          if (_.isArray(currentRules)) {
            _self.$set(_self.formRules, item.prop, currentRules);
          } else if (_.isObject(currentRules)) {
            _self.$set(_self.formRules, item.prop, [currentRules]);
          }
        }
      });
    },
    formVal() {
      _.map(this.value, (value, key) => {
        this.$set(this.model, key, value);
      });
      this.forEachLabel();
      this.$emit("input", this.model);
    },
    forEachLabel() {
      this.columnOption.forEach(group => {
        group.forms.forEach(column => {
          this.handleShowLabel(column, this.DIC[column.prop]);
        });
      });
    },
    handleShowLabel(column, DIC) {
      let result = "";
      if (!this.validatenull(DIC)) {
        result = detail(this.model, column, this.options, DIC);
        this.$set(this.modelTranslate, `$${column.prop}`, result);
      }
      return result;
    },
    //搜索指定的属性配置
    findColumnIndex(prop, group = false) {
      let list = [];
      let result;
      this.columnOption.forEach((column, index) => {
        const val = this.findArray(column.forms, prop, "prop");
        if (val !== -1) {
          list.push(index);
          list.push(val);
          result = val;
        }
      });
      return group ? list : result;
    },
    // 根据prop设置属性
    setColumnByProp(prop, setOptions) {
      let forms = this.options.forms;
      let formsOption = forms[this.findColumnIndex(prop)];
      setDefaultValue(setOptions, formsOption, this);

      this.options.forms = [...forms];
    },
    // 验证表单是否显隐
    vaildDisplay(column) {
      if (!this.validatenull(column.display)) {
        return this.vaildData(column.display, true);
      } else if (this.boxType === "add") {
        return this.vaildData(column.addDisplay, true);
      } else if (this.boxType === "edit") {
        return this.vaildData(column.editDisplay, true);
      } else if (this.boxType === "view") {
        return this.vaildData(column.viewDisplay, true);
      } else {
        return true;
      }
    },
    clearValidate() {
      this.$refs.form.clearValidate();
    },
    /**
     * 清空表单字段
     * @param part:true 清空在column中字段,否则清空全部
     */
    resetForm(params = {}) {
      const part = params.part;
      if (part) {
        this.columnOption.forEach(ele => {
          ele.column.forEach(column => {
            const prop = column.prop;
            this.model[prop] = this.modelDefault.tableForm[prop];
          });
        });
      } else {
        this.model = this.deepClone(this.modelDefault.tableForm);
      }
      this.$emit("input", this.model);
      this.$emit("reset-change");
      this.clearValidate();
    },
    validate(callback) {
      if (!callback) {
        return new Promise((resolve, reject) => {
          this.$refs.form.validate(valid => {
            if (valid) {
              resolve(valid);
            } else {
              reject(valid);
            }
          });
        });
      } else {
        this.$refs["form"].validate(valid => callback(valid));
      }
    },
    submit() {
      this.validate(valid => {
        if (valid) {
          this.show();
          this.$emit(
            "submit",
            filterDefaultParams(
              this.model,
              this.modelTranslate,
              this.parentOption.translate
            ),
            this.hide
          );
        }
      });
    },
    show() {
      this.allDisabled = true;
    },
    hide() {
      this.allDisabled = false;
    },
    // get
    // 获取表单验证后的整个model
    getFormModel(cb) {
      if (cb) {
        this.validate(valid => {
          if (valid) {
            cb(
              filterDefaultParams(
                this.model,
                this.modelTranslate,
                this.parentOption.translate
              )
            );
          } else {
            console.error("验证失败，请检查表单");
          }
        });
      } else {
        return new Promise((resolve, reject) => {
          this.validate(valid => {
            if (valid) {
              resolve(
                filterDefaultParams(
                  this.model,
                  this.modelTranslate,
                  this.parentOption.translate
                )
              );
            } else {
              console.error("验证失败，请检查表单");
            }
          });
        });
      }
    }
  },
  computed: {
    propOption() {
      let list = [];
      this.columnOption.forEach(option => {
        option.forms.forEach(form => {
          list.push(form);
        });
      });
      return list;
    },
    parentOption() {
      let option = this.deepClone(this.tableOption);
      let group = option.group;
      let forms = option.forms;
      if (!group) {
        option = Object.assign(option, {
          group: [this.deepClone(option)]
        });
      }
      if (group && forms) {
        option.group.unshift({ forms });
      }
      delete option.forms;
      // console.log("parentOption", option);
      return option;
    },
    columnOption() {
      let list = [...this.parentOption.group] || [];
      list.forEach((ele, index) => {
        ele.forms = ele.forms || [];
        // 循环列的全部属性
        ele.forms.forEach((form, cindex) => {
          //动态计算列的位置，如果为隐藏状态则或则手机状态不计算
          if (form.display !== false && !this.isMobile) {
            form = calcCount(form, this.itemSpanDefault, cindex === 0);
          }
        });
        //处理级联属性
        ele.forms = calcCascader(ele.forms);
      });
      // console.log("columnOption", list);
      return list;
    },
    menuPosition() {
      if (this.parentOption.menuPosition) {
        return this.parentOption.menuPosition;
      }
      return "center";
    }
  },
  watch: {
    model: {
      deep: true,
      handler(newVal, oldVal) {
        // console.log("formTemp model change");
        // console.log("*******", _.cloneDeep(newVal), _.cloneDeep(oldVal));
        if (!this.formCreate) {
          this.$emit("input", this.model);
          this.$emit("change", this.model);
        }
      }
    },
    value: {
      deep: true,
      handler() {
        // console.log("formTemp value change");
        this.modelOld = deepClone(this.value);
        if (!this.formCreate) {
          this.formVal();
        } else {
          this.formCreate = false;
        }
      }
    },
    "this.options.disabled": {
      immediate: true,
      handler() {
        if (typeof this.options.disabled === "boolean") {
          this.allDisabled = this.options.disabled;
        }
      }
    },
    disabled: {
      immediate: true,
      handler() {
        if (
          typeof this.disabled === "boolean" &&
          typeof this.options.disabled != "boolean"
        ) {
          this.allDisabled = this.disabled;
        }
      }
    }
  }
};
</script>
<style lang='less'>
.el-form_wrapper {
  .z-input-number,
  .el-cascader,
  .el-date-editor.el-input,
  .el-date-editor.el-input__inner,
  .el-select {
    width: 100% !important;
  }
  .form_line {
    display: inline-block;
    height: 42px;
  }
  .form_menu-center {
    text-align: center;
  }
  .form_menu-left {
    text-align: left;
  }
  .form_menu-right {
    text-align: right;
  }
  .el-input-number__decrease,
  .el-input-number__increase {
    border: none !important;
    background: none;
  }
  .z-form_upload {
    // 头像上传
    .picture-list .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .el-upload_disabled {
      .el-upload {
        display: none;
      }
    }
    .picture-list .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
  // 下拉树的样式调整
  .el-input_tree {
    .el-scrollbar__wrap {
      overflow-x: hidden;
    }
  }
  // 分组
  .z-form_group {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: start;
    -ms-flex-align: start;
    align-items: flex-start;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    height: auto;
  }
}
</style>