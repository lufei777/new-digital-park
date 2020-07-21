<template>
  <div class="public-add-Maintenance" :class="!showBoxShadow?'':'panel'">
    <div class="public-add-Maintenance-box" :class="!showBoxShadow?'show-box-width':'box-width'">
      <z-form
        :ref="addMaintenanceForm.ref"
        :options="addMaintenanceForm"
        v-model="model"
        @reset-change="resetChange"
        @submit="submit"
      >
        <template slot="menuBtn">
          <el-button @click="save">保存</el-button>
          <el-button @click="back">取消</el-button>
        </template>
      </z-form>
    </div>
  </div>
</template>

<script>
let tableSendData = {
  pageNum: 1,
  pageSize: 10
};
import { mapState } from "vuex";
import { validateTelephoneNumber } from "@/utils/validate.js";
import { MaintenanceManageDic, TaskManageDic } from "@/utils/dictionary.js";
import CommonApi from "@/service/api/common";
import TaskManageApi from "@/service/api/taskManage";
import leaseManageApi from "@/service/api/leaseManage";
import MaintenanceManage from "@/service/api/maintenance-manage";
export default {
  name: "PublicAddMaintenance",
  props: ["showBoxShadow", "closeDialogModel"],
  data() {
    let _this = this;
    return {
      repairState: "",
      model: {
        taskType: "1",
        urgent: "1"
      },
      addMaintenanceForm: {
        ref: "formRef",
        labelWidth: 100,
        labelPosition: "right",
        menuPosition: "center",
        emptyBtn: false,
        size: "medium",
        menuBtn: true,
        group: [
          {
            icon: "iconfont iconbiaoqian",
            label: "报修信息",
            prop: "group1",
            display: true,
            arrow: true,
            forms: [
              {
                type: "input",
                label: "工单名称",
                prop: "task.taskName",
                clearable: true,
                span: 8,
                rules: {
                  required: true,
                  message: "请输入工单名称",
                  trigger: "change"
                }
              },
              {
                type: "tree",
                label: "关联设备",
                prop: "deviceId",
                clearable: true,
                span: 8,
                props: {
                  label: "text",
                  value: "id",
                  children: "children"
                }
              },
              {
                type: "input",
                label: "地点",
                prop: "address",
                clearable: true,
                span: 8,
                rules: {
                  required: true,
                  trigger: "change"
                }
              },
              {
                type: "select",
                label: "维修类型",
                prop: "repairType",
                clearable: true,
                span: 8,
                dicData: MaintenanceManageDic.maintenanceType
              },
              {
                type: "table",
                label: "合同编号",
                prop: "contractId",
                clearable: true,
                span: 8,
                children: {
                  serverMode: {
                    url: leaseManageApi.contractList,
                    data: tableSendData
                  },
                  columnConfig: [
                    {
                      label: "合同名称",
                      prop: "contractName"
                    },
                    {
                      label: "合同编号",
                      prop: "contractNumber"
                    }
                  ]
                },
                props: {
                  label: "contractName",
                  value: "contractName"
                },
                change: ({
                  value,
                  _self: {
                    active: { contractId }
                  }
                }) => {
                  // 查询合同详情，只有合同详情中有空间信息
                  leaseManageApi.contractDetail({ contractId }).then(res => {
                    const detail = _.pick(res, ["tenantName"]);
                    console.log("detail", detail);
                    // this.model = { ...this.model, ...detail };
                  });
                }
              },
              {
                type: "input",
                label: "租户",
                prop: "tenantName",
                noModel: true,
                span: 8,
                disabled: true
              },
              // {
              //   label: "创建人",
              //   prop: "createBy",
              //   span: 8,
              //   textMode: true,
              //   rules: {
              //     required: true,
              //     trigger: "change"
              //   }
              // },
              {
                type: "input",
                label: "报修人",
                prop: "repairPerson",
                clearable: true,
                span: 8,
                rules: {
                  required: true,
                  //
                  trigger: "change"
                }
              },
              {
                type: "input",
                label: "联系电话",
                prop: "phone",
                clearable: true,
                span: 8,
                rules: {
                  required: true,
                  validator: validateTelephoneNumber,
                  trigger: "change"
                }
              },
              {
                type: "datetime",
                label: "预约时间",
                prop: "repairTime",
                valueFormat: "yyyy-MM-dd HH:mm:ss",
                clearable: true,
                span: 8,
                rules: {
                  required: true,
                  trigger: "change"
                }
              },
              {
                type: "textarea",
                label: "描述",
                prop: "task.description",
                clearable: true,
                span: 24,
                maxlength: 255,
                minRows: 6,
                showWordLimit: true,
                rules: {
                  required: true,
                  message: "请填写描述",
                  trigger: "change"
                }
              },
              {
                type: "upload",
                listType: "picture-card",
                label: "上传图片",
                prop: "task.taskPicList",
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
                },
                rules: {
                  required: true,
                  trigger: "change"
                }
              }
            ]
          },
          {
            icon: "iconfont iconbiaoqian",
            label: "派单信息",
            prop: "group2",
            display: true,
            arrow: true,
            forms: [
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
                'change': _this.onLinkRadioChange
              },
              {
                type: "select",
                label: "付款方式",
                prop: "chargeType",
                clearable: true,
                span: 8,
                dicData: MaintenanceManageDic.payWayStatus,
                valueDefault: "1"
              },
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
                  trigger: "change"
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
                  trigger: "change"
                }
              }
            ]
          }
        ]
      }
    };
  },
  computed: {
    ...mapState("user", ["userInfo"])
  },
  methods: {
    resetChange() {},
    onLinkRadioChange(obj) {
      console.log(obj);
      this.$refs[this.addMaintenanceForm.ref].setColumnByProp("chargeType", {
        display: obj.value == 1,
        rules: {
          required: true
        }
      });
    },
    async submit(model, hide) {
      // if (this.pageConfig.flag === "edit" && this.hasId()) {
      //   // 更新信息
      //   this.updateInfo(model, hide);
      // } else {
      //   this.addMaintenance(model, hide);
      // }
      // console.log("params",model)
      // this.$parent.getAddParams && this.$parent.getAddParams('add',model, hide);
      this.addRepairs(model, hide);
    },
    async addRepairs(model, hide) {
      await MaintenanceManage.addRepairs({
        ...model
      })
        .then(res => {
          console.log("res", res);
          if (res) {
            this.$message({
              type: "success",
              message: res
            });
            if (hide) {
              hide();
            }
            this.$refs[this.addMaintenanceForm.ref].resetForm();
            if (this.showBoxShadow) {
              this.$router.push("../maintenanceManage");
            } else {
              this.closeDialogModel(false);
            }
          }
        })
        .catch(err => {
          if (hide) {
            hide();
          }
          console.error(err);
        });
    },
    save(model) {
      this.repairState = 7;
      this.model.task.status = 7;
      if (this.model.task.taskName == "") {
        this.$message.warning("工单名称不能为空");
      } else {
        this.addRepairs(this.model);
      }
    },
    back() {},
    addMaintenance() {},
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
      this.$refs["formRef"].setColumnByProp("task.designatorId", {
        dicData: res
      });
    }
  },
  created() {
    CommonApi.getMonitorTree({
      flag: "device",
      moduleId: JSON.parse(localStorage.moduleInfo).id
    }).then(res => {
      this.$refs["formRef"].setColumnByProp("deviceId", {
        dicData: res
      });
    });

    TaskManageApi.deptTreeList().then(res => {
      this.$refs["formRef"].setColumnByProp("department", {
        dicData: res[0].childNode
      });
    });
  },
  mounted() {
    this.$refs[this.addMaintenanceForm.ref].setColumnByProp("chargeType", {
      display: this.model.charge == 1
    });
    this.model.createBy = this.userInfo.name;
  }
};
</script>

<style lang="less">
.public-add-Maintenance {
  // height: 100%;
  .public-add-Maintenance-box {
    margin: 0 auto;
    padding: 20px 0;
  }
  .box-width {
    width: 80%;
  }
  .show-box-width {
    width: 90%;
  }
}
</style>