<template>
  <div class="maintenance-detail">
    <div class="panel-container" style="flex-direction: row;">
      <div class="left-content panel">
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <z-form :ref="formConfig.ref" :options="formConfig" v-model="model">
            <template slot="btn">
              <el-button @click="backClick">返回</el-button>
            </template>
          </z-form>
        </el-scrollbar>
      </div>

      <div class="maintenance-right-content panel">
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <div class="flow-detail-title">流转详情</div>
          <el-timeline :reverse="true">
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :icon="activity.icon"
              :type="activity.type"
              :color="activity.color"
              :size="activity.size"
              :timestamp="activity.createTime"
              placement="top"
            >
              <el-card>
                <span class="activityUser activity-user-name">{{activity.username}}</span>
                <span class="activity-user-name">{{activity.description}}</span>
                <p v-if="activity.reason" class="reason">备注：{{activity.reason}}</p>
                <div class="demo-image__preview" v-if="activity.fileUrls.length>0">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="circulationUrl"
                    :preview-src-list="srcList"
                  ></el-image>
                </div>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
import MaintenanceManage from "../../service/api/maintenance-manage";
import TaskManageApi from "../../service/api/taskManage";
import { TaskManageDic } from "@/utils/dictionary";
export default {
  name: "MaintenanceDetail",
  data() {
    return {
      model: {},
      formConfig: {
        ref: "formRef",
        labelWidth: 100,
        labelPosition: "right",
        menuPosition: "center",
        emptyBtn: false,
        size: "medium",
        menuBtn: false,
        group: [
          {
            icon: "iconfont iconbiaoqian",
            label: "工单详情",
            prop: "group1",
            display: true,
            arrow: true,
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
                label: "地点",
                prop: "address",
                span: 8,
                disabled: true
              },
              {
                type: "select",
                label: "优先级",
                prop: "task.urgent",
                span: 8,
                disabled: true,
                dicData: TaskManageDic.priorityType
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
                type: "select",
                label: "任务状态",
                prop: "task.status",
                span: 8,
                disabled: true,
                dicData: TaskManageDic.sendTaskStatusDic
              },
              {
                type: "input",
                label: "创建人",
                prop: "createBy",
                span: 8,
                disabled: true
              },
              {
                type: "input",
                label: "创建时间",
                prop: "repairTime",
                span: 8,
                disabled: true
              },
              {
                type: "textarea",
                label: "详情描述",
                prop: "task.description",
                span: 24,
                disabled: true
              },
              {
                type: "upload",
                listType: "picture-card",
                label: "图片",
                prop: "task.taskPics",
                span: 24,
                action: "/oaApi/image/upload",
                accept: ["jpg", "jpeg", "png"],
                disabled: true,
                dataType: "array",
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
                prop: "designatorDepartment",
                span: 8,
                disabled: true
              },
              {
                type: "input",
                label: "接单人",
                prop: "task.username",
                span: 8,
                disabled: true
              },
              {
                type: "input",
                label: "接单人电话",
                prop: "designatorPhone",
                span: 8,
                disabled: true
              },
              {
                type: "textarea",
                label: "详情描述",
                prop: "task.reason",
                span: 16,
                disabled: true
              },
              {
                type: "upload",
                listType: "picture-card",
                label: "图片",
                prop: "task.taskPicsOperateList",
                span: 24,
                action: "/oaApi/image/upload",
                accept: ["jpg", "jpeg", "png"],
                disabled: true,
                dataType: "array",
                rules: {
                  required: true,
                  trigger: "change"
                }
              },
              {
                type: "input",
                label: "预约时间",
                prop: "createTime",
                span: 8,
                disabled: true
              },
              {
                type: "input",
                label: "维修开始时间",
                prop: "createTime2",
                span: 8,
                disabled: true
              },
              {
                type: "input",
                label: "维修完成时间",
                prop: "createTime3",
                span: 8,
                disabled: true
              },
              {
                prop: "btn",
                span: 22,
                formslot: true
              }
            ]
          },
          {
            icon: "iconfont iconbiaoqian",
            label: "维修信息",
            prop: "group3",
            display: false,
            arrow: true,
            forms: [
              // {
              //   label: false,
              //   prop: "educationExperienceList",
              //   type: "dynamic",
              //   span: 20,
              //   textMode: true,
              //   children: {
              //     align: "center",
              //     headerAlign: "center",
              //     columnConfig: [
              //       {
              //         label: "材料",
              //         prop: "taskName",
              //         disabled: true
              //       },
              //       {
              //         label: "数量",
              //         prop: "repairType",
              //         disabled: true
              //       },
              //       {
              //         label: "剩余库存",
              //         prop: "charge"
              //       }
              //     ],
              //     uiConfig: {
              //       pagination: false,
              //       height: "auto"
              //     }
              //   }
              // }
            ]
          }
        ]
      },
      activities: [],
      circulationUrl: "",
      srcList: []
    };
  },
  computed: {
    paramsId() {
      return this.$route.query;
    }
  },
  methods: {
    async detailRepairs() {
      let res = await MaintenanceManage.detailRepairs(
        {},
        { id: this.paramsId.id }
      );

      console.log("res", res);
      // this.model.educationExperienceList = res.list;
      // this.model.task.taskPics = res.task.taskPics[0];
      this.model = res;
      // this.model.task.taskPics = res.task.taskPics[0];
      // console.log(this.model.task.taskPics)
    },
    async operateLogList() {
      let res = await TaskManageApi.operateLogList({
        taskId: this.paramsId.id
      });
      res.map((item, index) => {
        item.type = "primary";
        item.color = "#0bbd87";
        item.size = "large";
      });
      this.activities = res;
      if (res) {
        res.map(item => {
          if (item.fileUrls[0]) {
            this.circulationUrl = item.fileUrls[0];
            this.srcList = item.fileUrls;
          }
        });
      }
    },
    backClick() {
      this.$router.push("maintenanceManage");
    }
  },
  mounted() {
    this.detailRepairs();
    this.operateLogList();
  }
};
</script>

<style lang="less">
.maintenance-detail {
  height: 100%;
  overflow: hidden;
  // display: flex;
  // flex-direction: column-reverse;

  width: 100%;
  .left-content {
    width: 70%;
    height: 100%;
    overflow: auto;
    .el-form {
      width: 90%;
      margin: 30px auto;
    }
  }
  .maintenance-right-content {
    background: #fff;
    width: 29%;
    margin-left: 1%;
    height: 100%;
    overflow: auto;
    .flow-detail-title {
      height: 50px;
      line-height: 30px;
      color: #9a9b9c;
      font-size: 16px;
      padding-left: 4px;
      font-weight: 600;
    }
    .block {
      .activityUser {
        color: #008dea;
      }
      .reason {
        color: #909399;
      }
      .demo-image__preview {
        margin-top: 8px;
      }
    }
  }
}
</style>