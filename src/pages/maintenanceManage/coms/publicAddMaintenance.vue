<template>
  <div class="public-add-Maintenance panel">
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
import CommonApi from "@/service/api/common";
export default {
  name: "PublicAddMaintenance",
  data() {
    return {
      model: {
        taskType: "1",
        urgent: "1"
      },
      addMaintenanceForm: {
        ref: "formRef",
        labelWidth: "120",
        labelPosition: "right",
        menuPosition: "left",
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
                span: 10,
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
                span: 10,
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
                span: 10,
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
                span: 10
              },
              // {
              //   label: "创建人",
              //   prop: "createBy",
              //   span: 10,
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
                span: 10,
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
                span: 10,
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
                span: 10,
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
                span: 22,
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
          }
          // {
          //   label: "派单信息",
          //   prop: "group2",
          //   display: true,
          //   arrow: true,
          //   forms: [
          //     {

          //     }
          //   ]
          // }
        ]
      }
    };
  },
  computed: {
    ...mapState("user", ["userInfo"])
  },
  methods: {
    resetChange() {}
  },
  created() {
    CommonApi.getMonitorTree({
      flag: 'device',
      moduleId: localStorage.moduleId
    }).then(res => {
      this.$refs["formRef"].setColumnByProp("relatedDevice", {
        dicData: res
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
  height: 100%;
  .public-add-Maintenance-box {
    width: 60%;
    margin: 0 auto;
    padding: 20px 0;
  }
}
</style>