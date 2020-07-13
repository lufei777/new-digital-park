<template>
  <div class="add-maintenance panel-container">
    <div class="panel">
      <div class="add-maintenance-box">
        <z-form
          :ref="addMaintenanceForm.ref"
          :options="addMaintenanceForm"
          v-model="model"
          @reset-change="resetChange"
        ></z-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { validateTelephoneNumber } from 'utils/validate.js';
export default {
  name: "AddMaintenance",
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
        menuBtn: false,
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
                type: "select",
                label: "关联设备",
                prop: "RelatedDevice",
                clearable: true,
                span: 10
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
              {
                label: "创建人",
                prop: "createBy",
                span: 10,
                textMode: true,
                rules: {
                  required: true,
                  trigger: "change"
                }
              },
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
          },
          {
            label: "派单信息",
            prop: "group2",
            display: true,
            arrow: true,
            forms: [
              {

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
    resetChange() {}
  },
  mounted() {
    this.model.createBy = this.userInfo.name;
  }
};
</script>

<style lang="less">
.add-maintenance {
  background: pink;
  height: 100%;
  .add-maintenance-box {
    width: 60%;
    margin: 0 auto;
    padding: 20px 0;
  }
}
</style>