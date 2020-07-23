<template>
  <div class="operation-popup" v-show="dialogFormShow">
    <el-dialog
      v-dialogDrag
      :title="dialogTitle"
      :visible.sync="dialogFormShow"
      :width="dialogWidth?dialogWidth:'30%'"
      :top="dialogTop?dialogTop:'15vh'"
      custom-class="per-modal popup-style"
      :before-close="dialogClose"
    >
      <el-scrollbar wrap-class="scrollbar-wrapper">
        <z-form :ref="formConfig.ref" :options="formConfig" v-model="model" @submit="submit">
          <template slot="menuBtn" slot-scope="scope">
            <el-button @click="goBack(scope)">取消</el-button>
          </template>
        </z-form>
      </el-scrollbar>
    </el-dialog>
  </div>
</template>

<script>
import TaskManageApi from "@/service/api/taskManage";
import MaintenanceManage from "@/service/api/maintenance-manage";
import { MaintenanceManageDic, TaskManageDic } from "@/utils/dictionary.js";
import { validateTelephoneNumber } from "@/utils/validate.js";
export default {
  props: [
    "dialogParams",
    "dialogFormShow",
    "specialFormShow",
    "dialogTitle",
    "dialogWidth",
    "formGroupShow",
    "repairsId",
    "dialogTop",
    "specialFormShow2"
  ],
  data() {
    let _this = this;
    return {
      formModel: {},
      model: {},
      formConfig: {
        ref: "formRef",
        labelWidth: "90",
        labelPosition: "right",
        menuPosition: "left",
        emptyBtn: false,
        group: [
          {
            label: "",
            prop: "group1",
            display: true,
            forms: [
              {
                type: "cascader",
                label: "部门",
                prop: "department",
                showAllLevels: false,
                display: false,
                props: {
                  label: "name",
                  value: "id",
                  children: "childNode"
                },
                rules: {
                  required: true,
                  trigger: "blur"
                },
                span: 24,
                change: _this.changelistBy
              },
              {
                type: "select",
                label: "接单人",
                prop: "designatorId",
                placeholder: "请输入",
                display: false,
                clearable: true,
                props: {
                  label: "name",
                  value: "id"
                },
                span: 24,
                rules: {
                  required: true,
                  trigger: "blur"
                }
              },
              {
                type: "datetime",
                label: "开始时间",
                prop: "task.beginTime",
                valueFormat: "yyyy-MM-dd HH:mm:ss",
                clearable: true,
                span: 24,
                rules: {
                  required: true,
                  trigger: "change"
                }
              },
              {
                type: "datetime",
                label: "结束时间",
                prop: "task.endTime",
                valueFormat: "yyyy-MM-dd HH:mm:ss",
                clearable: true,
                span: 24,
                rules: {
                  required: true,
                  trigger: "change"
                }
              },
              {
                type: "textarea",
                label: "描述",
                prop: "reason",
                span: 24,
                rules: {
                  required: true,
                  trigger: "blur",
                  message: "请输入描述"
                }
              },
              {
                type: "upload",
                listType: "picture-card",
                label: "添加图片",
                prop: "taskPicList",
                span: 24,
                action: "/oaApi/image/upload",
                accept: ["jpg", "jpeg", "png"],
                disabled: false,
                props: {
                  label: "fileName",
                  value: "fileUrl"
                },
                propsHttp: {
                  name: "fileName",
                  url: "fileUrl",
                  res: "data"
                }
              }
            ]
          },
          {
            icon: "iconfont iconbiaoqian",
            label: "工单信息",
            prop: "group2",
            display: false,
            forms: [
              {
                type: "input",
                label: "工单名称",
                prop: "task.taskName",
                span: 8,
                disabled: true
              },
              {
                type: "input",
                label: "关联设备",
                prop: "deviceId",
                span: 8,
                disabled: true
              },
              {
                type: "input",
                label: "维修类型",
                prop: "repairType",
                span: 8,
                disabled: true
              },
              {
                type: "input",
                label: "预约时间",
                prop: "repairTime",
                span: 8,
                disabled: true
              },
              {
                type: "input",
                label: "报修人",
                prop: "repairPerson",
                span: 8,
                disabled: true
              },
              {
                type: "input",
                label: "联系电话",
                prop: "phone",
                span: 8,
                disabled: true
              },
              {
                type: "textarea",
                label: "详情描述",
                prop: "task.description",
                span: 12,
                disabled: true
              }
            ]
          },
          {
            icon: "iconfont iconbiaoqian",
            label: "收费方式",
            prop: "group3",
            display: false,
            forms: [
              {
                type: "input",
                label: "租户",
                prop: "tenantName",
                noModel: true,
                span: 8,
                disabled: true
              },
              {
                type: "input",
                label: "关联合同",
                prop: "contractId",
                noModel: true,
                span: 8,
                disabled: true
              },
              {
                type: "radio",
                label: "是否收费",
                prop: "charge",
                props: {
                  label: "value",
                  value: "id"
                },
                dicData: [
                  {
                    value: "收费",
                    id: "1"
                  },
                  {
                    value: "免费",
                    id: "0"
                  }
                ],
                valueDefault: "0",
                span: 8,
                rules: {
                  required: true,
                  trigger: "blur"
                },
                change: _this.onLinkRadioChange
              },
              {
                type: "select",
                label: "付款方式",
                prop: "chargeType",
                clearable: true,
                hide: true,
                span: 8,
                dicData: MaintenanceManageDic.payWayStatus,
                valueDefault: "1",
                rules: {
                  required: true
                }
              }
            ]
          },
          {
            icon: "iconfont iconbiaoqian",
            label: "工单派发",
            prop: "group4",
            display: false,
            arrow: true,
            forms: [
              {
                type: "select",
                label: "优先级",
                prop: "task.urgent",
                placeholder: "请选择",
                clearable: true,
                span: 8,
                dicData: TaskManageDic.priorityType,
                rules: {
                  required: true
                }
              },
              {
                type: "cascader",
                label: "部门",
                prop: "department",
                showAllLevels: false,
                props: {
                  label: "name",
                  value: "id",
                  children: "childNode"
                },
                rules: {
                  required: true,
                  trigger: "blur"
                },
                span: 8,
                change: _this.changelistBy
              },
              {
                type: "select",
                label: "接单人",
                prop: "task.designatorId",
                placeholder: "请输入",
                clearable: true,
                props: {
                  label: "name",
                  value: "id"
                },
                span: 8,
                rules: {
                  required: true,
                  trigger: "blur"
                }
              },
              {
                type: "input",
                label: "联系电话",
                prop: "task.designatorPhone",
                clearable: true,
                span: 8,
                rules: {
                  required: true,
                  validator: validateTelephoneNumber,
                  trigger: "blur"
                }
              }
            ]
          }
        ]
      },
      valueData: "",
      flag: ""
    };
  },
  watch: {
    dialogFormShow(val) {
      if (val) {
        this.deptTreeList();
        this.$nextTick(() => {
          this.$refs["formRef"].setColumnByProp("reason", {
            display: this.specialFormShow == 1 || this.specialFormShow == 3
          });
          this.$refs["formRef"].setColumnByProp("taskPicList", {
            display: this.specialFormShow == 1 || this.specialFormShow == 3
          });

          this.$refs["formRef"].setColumnByProp("department", {
            display: this.specialFormShow == 2 || this.specialFormShow == 3
          });
          this.$refs["formRef"].setColumnByProp("designatorId", {
            display: this.specialFormShow == 2 || this.specialFormShow == 3
          });
          console.log("specialFormShow2",this.specialFormShow2)
          this.$refs["formRef"].setColumnByProp("task.endTime", {
            display: this.specialFormShow == 1 && this.specialFormShow2 == 6
          });
          this.$refs["formRef"].setColumnByProp("task.beginTime", {
            display: this.specialFormShow == 1 && this.specialFormShow2 == 6
          });

          this.$refs["formRef"].getGroupByProp("group1").display =
            this.specialFormShow != 4;
          this.$refs["formRef"].getGroupByProp("group2").display =
            this.specialFormShow == 4;
          this.$refs["formRef"].getGroupByProp("group3").display =
            this.specialFormShow == 4;
          this.$refs["formRef"].getGroupByProp("group4").display =
            this.specialFormShow == 4;

          if (this.specialFormShow == 4) {
            this.detailRepairs();
          }
        });
      }
    }
  },
  computed: {},
  methods: {
    async submit(model, hide) {
      this.$emit("dialogParams", model, hide);
    },
    onLinkRadioChange(obj) {
      this.$refs[this.formConfig.ref].setColumnByProp("chargeType", {
        hide: obj.value == 0,
        rules: {
          required: true
        }
      });
    },
    goBack() {
      this.resetFormFunc();
      this.$emit("closeDialog", false);
    },
    resetFormFunc() {
      this.$refs[this.formConfig.ref].resetForm();
    },
    async changelistBy({ value }) {
      let valueData;
      if (Array.isArray(value)) {
        valueData = value[value.length - 1];
      } else {
        valueData = value;
      }
      let res = await TaskManageApi.listBy({
        deptId: valueData
      });
      this.$refs[this.formConfig.ref].setColumnByProp("task.designatorId", {
        dicData: res
      });
    },
    dialogClose(done) {
      this.resetFormFunc();
      this.$nextTick(() => {
        this.$emit("closeDialog", false);
      });
    },
    async deptTreeList() {
      let res = await TaskManageApi.deptTreeList();
      this.$refs[this.formConfig.ref].setColumnByProp("department", {
        dicData: res[0].childNode
      });
    },
    async detailRepairs() {
      let res = await MaintenanceManage.detailRepairs(
        {},
        { id: this.repairsId }
      );
      this.model = res;
    }
  },

  created() {},
  mounted() {
    console.log("0000", this.formGroupShow);
  }
};
</script>

<style lang="less">
.operation-popup {
  // padding: 10px;
  // background: @white;
  .el-dialog__body {
    padding: 0 !important;
  }
  // .per-modal {
  //   .el-dialog__body {
  //     height: 800px;
  //   }
  // }
  .el-form {
    width: 90%;
    margin: 30px auto;
  }
}
</style>
