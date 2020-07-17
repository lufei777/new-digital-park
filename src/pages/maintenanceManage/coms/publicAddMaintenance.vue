<template>
  <div class="public-add-Maintenance" :class="!showBoxShadow?'':'panel'">
    <div class="public-add-Maintenance-box">
      <z-form
        :ref="addMaintenanceForm.ref"
        :options="addMaintenanceForm"
        v-model="model"
        @reset-change="resetChange"
      >
        <template slot="menuBtn">
          <el-button>取消</el-button>
        </template>
      </z-form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { validateTelephoneNumber } from "@/utils/validate.js";
import { MaintenanceManageDic, TaskManageDic } from "@/utils/dictionary.js";
import CommonApi from "@/service/api/common";
import TaskManageApi from "@/service/api/taskManage";
export default {
  name: "PublicAddMaintenance",
  props:['showBoxShadow'],
  data() {
    let _this = this;
    return {
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
            label: "报修信息",
            prop: "group1",
            display: true,
            arrow: true,
            forms: [
              {
                type: "input",
                label: "工单名称",
                prop: "taskName",
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
                prop: "relatedDevice",
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
                prop: "location",
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
                prop: "amintenanceTypes",
                clearable: true,
                span: 8,
                dicData: MaintenanceManageDic.maintenanceType
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
                prop: "repairPeople",
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
                prop: "phoneNumber",
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
                prop: "beginTime",
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
                prop: "description",
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
                },
                rules: {
                  required: true,
                  trigger: "change"
                }
              }
            ]
          },
          {
            label: "派单信息",
            prop: "group2",
            display: true,
            arrow: true,
            forms: [
              {
                type: "radio",
                label: "是否收费",
                prop: "showLink",
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
                prop: "payWay",
                clearable: true,
                span: 8,
                dicData: MaintenanceManageDic.payWayStatus,
                valueDefault: "1",
                rules: {
                  required: true
                }
              },
              {
                type: "select",
                label: "优先级",
                prop: "urgent",
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
                prop: "designatorId",
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
                prop: "sendPhoneNumber",
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
    onLinkRadioChange() {},
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
      this.$refs["formRef"].setColumnByProp("designatorId", {
        dicData: res
      });
    }
  },
  created() {
    CommonApi.getMonitorTree({
      flag: "device",
      moduleId: localStorage.moduleId
    }).then(res => {
      this.$refs["formRef"].setColumnByProp("relatedDevice", {
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
    this.model.createBy = this.userInfo.name;
  }
};
</script>

<style lang="less">

.public-add-Maintenance {
  // height: 100%;
  .public-add-Maintenance-box {
    width: 70%;
    margin: 0 auto;
    padding: 20px 0;
  }
}
</style>