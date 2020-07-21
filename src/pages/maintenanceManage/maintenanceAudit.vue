<template>
  <div class="maintenance-audit panel-container">
    <z-form :ref="formConfig.ref" :options="formConfig" v-model="model" @reset-change="resetChange">
      <template slot="menuBtn">
        <el-button>取消</el-button>
      </template>
    </z-form>
  </div>
</template>

<script>
import maintenanceManage from "../../service/api/maintenance-manage";
import { CommonDic, PersonalManageDic, BooleanDic } from "@/utils/dictionary";
export default {
  name: "MaintenanceAudit",
  data() {
    return {
      formConfig: {
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
            label: "基本信息",
            prop: "group1",
            display: true,
            arrow: true,
            forms: [
              {
                type: "input",
                label: "工单名称",
                prop: "taskName",
                span: 6,
                disabled: true
              },
              {
                type: "input",
                label: "关联设备",
                prop: "relatedDevice",
                span: 6,
                disabled: true
              },
              {
                type: "input",
                label: "维修类型",
                prop: "maintenanceTypes",
                span: 6,
                disabled: true
              },
              {
                type: "input",
                label: "地点",
                prop: "location",
                span: 6,
                disabled: true
              },
              {
                type: "input",
                label: "优先级",
                prop: "urgent",
                span: 6,
                disabled: true
              },
              {
                type: "input",
                label: "报修人",
                prop: "repairPeople",
                span: 6,
                disabled: true
              },
              {
                type: "input",
                label: "联系电话",
                prop: "phoneNumber",
                span: 6,
                disabled: true
              },
              {
                type: "input",
                label: "创建时间",
                prop: "createTime",
                span: 6,
                disabled: true
              },
              {
                type: "textarea",
                label: "详情描述",
                prop: "description",
                span: 12,
                disabled: true
              },
              {
                type: "upload",
                listType: "picture-card",
                label: "图片",
                prop: "taskPicList",
                span: 24,
                action: "/oaApi/image/upload",
                accept: ["jpg", "jpeg", "png"],
                disabled: true,
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
            label: "维修信息",
            prop: "group2",
            display: true,
            arrow: true,
            forms: [
              {
                type: "input",
                label: "部门",
                prop: "department",
                span: 6,
                disabled: true
              },
              {
                type: "input",
                label: "接单人",
                prop: "designatorId",
                span: 6,
                disabled: true
              },
              {
                type: "input",
                label: "接单人联系电话",
                prop: "sendPhoneNumber",
                span: 6,
                disabled: true
              },
              {
                type: "input",
                label: "工单流转",
                prop: "location",
                span: 6,
                disabled: true
              },
              {
                type: "textarea",
                label: "详情描述",
                prop: "maintenanceDesc",
                span: 6,
                disabled: true
              },
             {
                label: "教育经历",
                prop: "educationExperienceList",
                type: "dynamic",
                span: 24,
                children: {
                  align: "center",
                  headerAlign: "center",
                  editBtn: true,
                  data: [],
                  columnConfig: [
                    {
                      width: 200,
                      label: "学校名称",
                      prop: "schoolName"
                    },
                    {
                      width: 200,
                      label: "专业",
                      prop: "specialized",
                      type: "input"
                    },
                    {
                      width: 200,
                      label: "开始日期",
                      prop: "startDate",
                      type: "date",
                      valueFormat: "yyyy-MM-dd"
                    },
                    {
                      width: 200,
                      label: "结束日期",
                      prop: "endDate",
                      type: "date",
                      valueFormat: "yyyy-MM-dd"
                    },
                    {
                      width: 200,
                      label: "学历",
                      prop: "subEducation",
                      type: "select",
                      dicData: PersonalManageDic.educationBackground
                    },
                    {
                      width: 200,
                      label: "详细描述",
                      prop: "description",
                      type: "input"
                    }
                  ],
                  uiConfig: {
                    pagination: false,
                    height: "auto"
                  },
                  tableMethods: {
                    rowAdd: done => {
                      done({
                        valueDefault: "无"
                      });
                    },
                    rowDel: (row, done) => {
                      done();
                    }
                  }
                }
              },
              {
                type: "input",
                label: "报修人",
                prop: "repairPeople",
                span: 6,
                disabled: true
              },
              {
                type: "input",
                label: "联系电话",
                prop: "phoneNumber",
                span: 6,
                disabled: true
              },
              {
                type: "input",
                label: "创建时间",
                prop: "createTime",
                span: 6,
                disabled: true
              },
              {
                type: "textarea",
                label: "详情描述",
                prop: "description",
                span: 12,
                disabled: true
              },
              {
                type: "upload",
                listType: "picture-card",
                label: "图片",
                prop: "taskPicList",
                span: 24,
                action: "/oaApi/image/upload",
                accept: ["jpg", "jpeg", "png"],
                disabled: true,
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
        ]
      }
    };
  },
  methods: {
    async test() {
      let res = await maintenanceManage.getRepairs();
      console.log("res", res);
    }
  },
  mounted() {
    this.test();
  }
};
</script>

<style lang="less">
.maintenance-audit {
}
</style>