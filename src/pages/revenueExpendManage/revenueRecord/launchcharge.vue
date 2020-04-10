<template>
  <div>
    <div class="panel">
      <span class="tip frist-tip flex-align">
        <span class="icon"></span>
        <span>{{pageConfig.title}}</span>
      </span>
      <div class="form">
        <z-form
          :ref="formOptions.ref"
          :options="formOptions"
          v-bind="pageConfig.extraOptions"
          v-model="model"
          @submit="submit"
        >
          <template slot="menuBtn" slot-scope="{size}">
            <template v-if="isCheck">
              <el-button :size="size" type="primary" @click="pass">通过</el-button>
              <el-button :size="size" type="danger" @click="reject">驳回</el-button>
            </template>
            <el-button :size="size" @click="back">返回</el-button>
          </template>
        </z-form>
      </div>
    </div>

    <el-dialog title="请填写原因" :visible.sync="dialogVisible" width="30%">
      <z-input type="textarea" v-model="model.examineIdea"></z-input>
      <span slot="footer">
        <el-button @click="()=>{ this.dialogVisible = false }">取 消</el-button>
        <el-button type="primary" @click="comfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import revenueExpendApi from "api/revenueExpendManage";
import systemManageApi from "api/systemManage";
import { CommonDic } from "utils/dictionary";
import { RevenueExpendManageDic } from "utils/dictionary";

const dateValueDefault = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");
const dateValueFormat = "yyyy-MM-dd HH:mm:ss";

const examineState = RevenueExpendManageDic.examineState;
const moduleId = RevenueExpendManageDic.moduleId;
const moneyState = RevenueExpendManageDic.moneyState;
const tradeType = RevenueExpendManageDic.tradeType;
const examineType = RevenueExpendManageDic.examineType;

const apiConfig = {
  add: {
    flag: "add",
    title: "发起收费",
    api: revenueExpendApi.launchBudget
  },
  edit: {
    flag: "edit",
    title: "编辑收费",
    api: revenueExpendApi.updateRecordByRecordId
  },
  update: {
    flag: "update",
    title: "完善",
    api: revenueExpendApi.updateRecord,
    extraConfig: {
      submitDisabled: false,
      disabled: true
    }
  },
  detail: {
    flag: "detail",
    title: "详情",
    extraConfig: {
      disabled: true,
      submitBtn: false
    }
  },
  check: {
    flag: "check",
    title: "审核",
    extraConfig: {
      disabled: true,
      submitBtn: false
    }
  },
  entry: {
    flag: "entry",
    title: "录入"
  }
};

export default {
  data() {
    return {
      dialogVisible: false,
      model: {},
      formOptions: {
        ref: "formRef",
        labelWidth: "100",
        menuPosition: "right",
        emptyBtn: false,
        width: "70%",
        size: "small",
        group: [
          {
            prop: "base",
            forms: [
              {
                type: "input",
                prop: "id",
                display: false
              },
              {
                type: "input",
                label: "编号",
                prop: "recordId",
                readonly: true,
                span: 12,
                tip: "该编号自动生成",
                tipPlacement: "top",
                rules: { required: true }
              },
              {
                type: "input",
                label: "应收金额",
                prop: "receivMoney",
                dataType: "number",
                span: 12,
                append: "元",
                rules: {
                  required: true,
                  trigger: "blur"
                }
              },
              {
                type: "input",
                label: "收入名称",
                prop: "recordName",
                clearable: true,
                span: 12,
                rules: {
                  required: true,
                  trigger: "blur"
                }
              },
              {
                type: "select",
                label: "收入类型",
                prop: "moduleId",
                clearable: true,
                span: 12,
                dicData: moduleId,
                rules: {
                  required: true,
                  trigger: "blur"
                }
              },
              {
                type: "date",
                label: "发起日期",
                prop: "launchTime",
                valueFormat: dateValueFormat,
                valueDefault: dateValueDefault,
                clearable: true,
                span: 12,
                rules: {
                  required: true,
                  trigger: "blur"
                }
              },
              {
                type: "date",
                label: "截止日期",
                prop: "endTime",
                format: "yyyy-MM-dd",
                valueFormat: dateValueFormat,
                clearable: true,
                span: 12,
                rules: {
                  required: true
                }
              },
              {
                type: "input",
                label: "支付方",
                prop: "payName",
                clearable: true,
                span: 12,
                rules: {
                  required: true,
                  trigger: "blur"
                }
              },
              {
                type: "input",
                label: "发起人",
                prop: "launchIdList",
                type: "cascader",
                showAllLevels: false,
                dataType: "number",
                props: {
                  label: "name",
                  value: "id",
                  children: "childNode"
                },
                clearable: true,
                span: 12,
                rules: {
                  required: true,
                  trigger: "blur"
                }
              }
            ]
          },
          {
            prop: "entry",
            display: false,
            forms: [
              {
                label: "入账日期",
                prop: "incomeTime",
                type: "date",
                format: "yyyy-MM-dd",
                valueFormat: dateValueFormat,
                rules: {
                  required: true
                }
              },
              {
                label: "资金状态",
                prop: "moneyState",
                type: "select",
                dicData: moneyState,
                valueDefault: 1,
                rules: {
                  required: true
                }
              },
              {
                label: "交易方式",
                prop: "tradeType",
                type: "select",
                dicData: tradeType,
                valueDefault: 0,
                rules: {
                  required: true
                }
              }
            ]
          },
          {
            prop: "checkPeopleReason",
            forms: [
              {
                type: "textarea",
                label: "备注",
                prop: "remarks",
                clearable: true,
                span: 12
              },
              {
                type: "upload",
                listType: "picture-card",
                label: "相关凭证",
                prop: "recordImageList",
                tip: "只能上传jpg/png文件，大小不超过3M。",
                action: "/oaApi/image/upload",
                filesize: "400kb",
                accept: ["jpg", "jpeg", "png"],
                props: {
                  label: "recordId",
                  value: "recordUrl"
                },
                propsHttp: {
                  name: "fileName",
                  url: "fileUrl",
                  res: "data"
                },
                span: 24
              },
              {
                type: "radio",
                label: "是否审核",
                prop: "choice",
                dicData: CommonDic.booleanDic,
                valueDefault: 1,
                span: 24
              }
            ]
          }
        ]
      }
    };
  },
  created() {
    this.init();
    if (Object.keys(this.$route.query).length !== 0) {
      // flag         页面标识
      // recordId     记录id
      // budgetType   页面类型 收入: 0   支出: 1
      // examineState 审核状态
      let { flag = "add", recordId, examineState } = this.$route.query;
      // 赋值页面配置
      this.pageConfig = this.formatPageConfig(apiConfig[flag]);
      // 有budgetType，则需要对options进行格式化
      this.formOptions.group.forEach(group => {
        this.formatFormOptions(group.forms);
      });
      // 拿取记录id
      if (recordId) {
        this.model.recordId = recordId;
        this.getBudgetByRecordId(recordId);
      }
      // 如果是录入 和 完善，则显示entry的group
      if (this.isEntry || this.isUpdate || this.isDetail) {
        this.getGroupByProp("entry").display = true;
        if (this.isUpdate) {
          this.disabledAllGroup();
          this.getGroupByProp("entry").disabled = false;
        }
      }
      // 添加审核人表单
      this.getGroupByProp("checkPeopleReason").forms.push(
        this.checkPeopleReason
      );
      // 最后将配置合并
      this.formOptions = {
        ...this.formOptions,
        ...this.pageConfig.extraConfig
      };
    }
  },
  mounted() {
    if (this.isEdit) {
      this.Form.setColumnByProp("choice", {
        disabled: true
      });
    }
  },
  methods: {
    init() {
      // 自动获取当前账单编号
      revenueExpendApi.createRecordNum().then(res => {
        this.model.recordId = res;
      });

      // 获取全部人员
      systemManageApi.getDeptUserTree().then(res => {
        this.Form.setColumnByProp("launchIdList", {
          dicData: res[0].childNode
        });
      });
    },
    disabledAllGroup() {
      for (let index = 0; index < this.formOptions.group.length; index++) {
        let group = this.formOptions.group[index];
        group.disabled = true;
      }
    },
    getGroupByProp(prop) {
      for (let index = 0; index < this.formOptions.group.length; index++) {
        let group = this.formOptions.group[index];
        if (group.prop === prop) {
          return group;
        }
      }
    },
    formatFormOptions(config) {
      const fields = RevenueExpendManageDic.fields;

      config.forEach(item => {
        if (item.prop in fields) {
          this.$set(item, "label", fields[item.prop][this.budgetType]);
        }
      });
    },
    formatPageConfig(config) {
      const titles = RevenueExpendManageDic.titles;
      config.title = titles[config.flag][this.budgetType];
      return config;
    },
    clearForm() {
      this.$refs[this.leaseManageForm.ref].resetForm();
    },
    submit(model, hide) {
      model = { ...model, budgetType: this.budgetType };
      this.pageConfig
        .api(model)
        .then(res => {
          this.$router.back();
        })
        .finally(msg => {
          hide();
        });
    },
    search(...args) {
      this.$refs[this.leaseManageForm.ref].getFormModel(res => {
        console.log("搜索", res);
      });
    },
    async getBudgetByRecordId(recordId) {
      this.model = await revenueExpendApi.getBudgetByRecordId({
        recordId,
        budgetType: this.budgetType
      });
    },
    back() {
      this.$router.back();
    },
    pass() {
      this.dialogVisible = true;
      this.comfirmApi = revenueExpendApi.recordToExamine;
    },
    reject() {
      this.dialogVisible = true;
      this.comfirmApi = revenueExpendApi.recordToReject;
    },
    comfirm() {
      this.dialogVisible = false;
      this.comfirmApi({
        recordId: this.model.recordId,
        examineIdea: this.model.examineIdea
      }).then(
        () => {
          this.back();
        },
        err => {
          console.error(err);
        }
      );
    }
  },
  computed: {
    // 发起
    isAdd() {
      return this.pageConfig.flag === "add";
    },
    // 编辑
    isEdit() {
      return this.pageConfig.flag === "edit";
    },
    // 录入
    isEntry() {
      return this.pageConfig.flag === "entry";
    },
    // 详情
    isDetail() {
      return this.pageConfig.flag === "detail";
    },
    // 完善
    isUpdate() {
      return this.pageConfig.flag === "update";
    },
    // 审核
    isCheck() {
      return this.pageConfig.flag === "check";
    },
    Form() {
      return this.$refs[this.formOptions.ref];
    },
    checkPeopleReason() {
      const { pageConfig } = this;

      let checkPeople = {
        label: "审核人",
        prop: "recordPersonList",
        type: "dynamic",
        span: 12,
        disabled: this.isEdit ? true : undefined,
        children: {
          size: "small",
          align: "center",
          headerAlign: "center",
          columnConfig: [
            {
              label: "审核人",
              prop: "examineIdList",
              type: "cascader",
              dataType: "number",
              dicUrl: systemManageApi.getDeptUserTree,
              showAllLevels: false,
              props: {
                label: "name",
                value: "id",
                children: "childNode"
              },
              clearable: true,
              rules: {
                required: true,
                trigger: "blur"
              }
            }
          ]
        },
        rules: {
          required: true,
          message: "必填，请填写至少一位审核人"
        }
      };

      const mergeCheckPeople = checkPeople => {
        return Object.assign(
          {
            ...checkPeople,
            span: this.isCheck ? 12 : 24,
            disabled: false
          },
          // 设置外层属性
          (() => {
            // 设置children columnConfig
            let children = {
              ...checkPeople.children,
              addBtn: false,
              delBtn: false
            };
            // 如果是审查
            if (this.isCheck) {
              children.columnConfig = [
                {
                  ...checkPeople.children.columnConfig[0],
                  disabled: true
                }
              ];
            } else {
              // 如果是审查之外
              children.columnConfig = [
                {
                  ...checkPeople.children.columnConfig[0],
                  disabled: true,
                  width: 200
                },
                {
                  label: "审核状态",
                  prop: "examineType",
                  type: "select",
                  dicData: examineType
                },
                {
                  label: "审核时间",
                  prop: "examineTime",
                  type: "date",
                  valueDefault: this.isDetail ? "" : dateValueDefault,
                  format: "yyyy-MM-dd",
                  valueFormat: dateValueFormat
                },
                {
                  label: "审核原因",
                  prop: "examineIdea"
                }
              ];
            }
            return { children };
          })()
        );
      };

      if (this.isCheck || this.isDetail) {
        checkPeople = mergeCheckPeople(checkPeople);
      }
      if (this.isDetail) {
        delete checkPeople.disabled;
      }

      return checkPeople;
    },
    budgetType() {
      if (this.$route.query) {
        const budgetType = this.$route.query.budgetType;
        return typeof budgetType != "undefined" ? budgetType : 0;
      }
      return 0;
    }
  },
  watch: {
    "model.choice"(newVal, oldVal) {
      this.$nextTick(() => {
        // 是否需要审核
        if (newVal == CommonDic.booleanDic[0].value) {
          // 是
          this.Form.setColumnByProp("recordPersonList", {
            display: true
          });
        } else {
          // 否
          this.Form.setColumnByProp("recordPersonList", {
            display: false
          });
        }
      });
    },
    "model.launchIdList"(newVal) {
      if (typeof newVal === "string")
        this.model.launchId = _.last(newVal.split(","));
    },
    "model.recordPersonList"(newVal) {
      newVal.forEach((item, index) => {
        if (typeof item.examineIdList === "string")
          item.examineId = _.last(item.examineIdList.split(","));
        item.examineLevel = index + 1;
      });
    }
  }
};
</script>
<style lang='less' scoped>
.panel {
  .form {
    display: flex;
    justify-content: center;
  }
  .tip {
    margin: 20px 0;
    .icon {
      width: 4px;
      height: 16px;
      background: @mainBgColor;
      border-radius: 2px;
      margin-right: 10px;
    }
    span {
      font-size: 16px;
      color: @mainBgColor;
    }
  }
}
</style>
