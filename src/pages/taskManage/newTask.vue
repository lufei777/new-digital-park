<template>
  <div class="new-task panel-container">
    <div class="panel">
      <div class="new-task-box">
        <z-form
          :ref="newTaskForm.ref"
          :options="newTaskForm"
          v-model="model"
          @reset-change="resetChange"
        >
          <template slot="department">
            <div>
              <el-cascader
                clearable
                :show-all-levels="false"
                placeholder="请选择部门"
                :options="departmentList"
                :props="treeProps"
                v-model="model.department"
                @change="changelistBy"
              ></el-cascader>
            </div>
          </template>
          <template slot="designatorId">
            <div>
              <el-select v-model="model.designatorId" @change="assignChange" placeholder="请先选择部门">
                <el-option
                  v-for="item in assignList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </template>
          <template slot="ordererName">
            <div>{{model.ordererName}}</div>
          </template>
          <template slot="createBy">
            <div>{{createPeople}}</div>
          </template>
          <template slot="reason">
            <div>
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="model.reason"
              ></el-input>
            </div>
          </template>
          <template slot="btn" slot-scope="obj">
            <div>
              <el-button type="primary" @click="dispatch()" v-show="waitSend">派单</el-button>
              <el-button
                type="primary"
                v-show="taskOperationShow"
                @click="submit(obj)"
              >{{taskOperation}}</el-button>
              <el-button type="primary" @click="suspendTask" v-if="suspendShow">{{suspendStatus}}</el-button>
              <el-button
                :type="anotherButton"
                @click="anotherSubmit(obj)"
                v-show="anotherTaskOperationShow"
              >{{anotherTaskOperation}}</el-button>
              <el-button type="plain" @click="addTempTask" v-show="saveButtonShow">保存</el-button>

              <el-button @click="back(obj)" v-show="taskBackShow">返回</el-button>
            </div>
          </template>
        </z-form>
      </div>
    </div>
    <div class="block panel" v-if="taskId.id">
      <div class="flow-detail-title">流转详情</div>
      <el-timeline :reverse="reverse">
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
    </div>
  </div>
</template>

<script>
import TaskManageApi from "../../service/api/taskManage";
import { mapState } from "vuex";
import { TaskManageDic, TaskofficeLocationType } from "@/utils/dictionary";
export default {
  name: "NewTask",
  data() {
    let _this = this;
    return {
      model: {
        taskType: "1",
        urgent: "1"
      },
      newTaskForm: {
        ref: "newTaskForm",
        labelWidth: "120",
        labelPosition: "right",
        menuPosition: "left",
        emptyBtn: false,
        size: "medium",
        menuBtn: false,
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
              trigger: "blur"
            }
          },
          {
            type: "select",
            label: "工单类型",
            prop: "taskType",
            placeholder: "请输入",
            clearable: true,
            props: {
              label: "typeName",
              value: "id"
            },
            offset: 2,
            span: 10,
            rules: {
              required: true,
              trigger: "change"
            },
            change: function(value) {
              if (value.value == 6) {
                _this.$refs["newTaskForm"].setColumnByProp("devicePoint", {
                  display: true
                });
              } else {
                _this.$refs["newTaskForm"].setColumnByProp("devicePoint", {
                  display: false
                });
              }
            }
          },
          {
            type: "datetime",
            label: "开始时间",
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
            type: "datetime",
            label: "预计结束时间",
            prop: "endTime",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            clearable: true,
            span: 10,
            offset: 2,
            rules: {
              required: true,
              trigger: "change"
            }
          },
          {
            label: "创建人",
            prop: "createBy",
            span: 10,
            formslot: true
          },
          {
            type: "select",
            label: "优先级",
            prop: "urgent",
            placeholder: "请选择",
            clearable: true,
            offset: 2,
            span: 10,
            dicData: TaskManageDic.priorityType,
            rules: {
              required: true,
              message: "请选择优先级",
              trigger: "change"
            }
          },
          {
            label: "部门",
            prop: "department",
            span: 10,
            formslot: true
          },
          {
            label: "指派",
            prop: "designatorId",
            clearable: true,
            offset: 2,
            span: 10,
            formslot: true
          },
          {
            type: "select",
            label: "地点",
            prop: "officeLocation",
            placeholder: "请选择办公地点",
            clearable: true,
            span: 10,
            dicData: TaskofficeLocationType.officeLocationType,
            rules: {
              required: true,
              message: "请选择办公地点",
              trigger: "change"
            }
          },
          {
            type: "tree",
            label: "设备点位",
            prop: "devicePoint",
            placeholder: "请选择设备点位",
            clearable: true,
            span: 10,
            props: {
              label: "caption",
              value: "id",
              children: "deviceTreeList"
            },
            offset: 2,
            rules: {
              required: true,
              message: "请选择设备点位",
              trigger: "change"
            },
            display: false
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
            label: "备注",
            prop: "reason",
            formslot: true,
            span: 22,
            display: false
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
          },
          {
            prop: "btn",
            span: 22,
            formslot: true
          }
        ]
      },
      treeProps: {
        value: "id",
        label: "name",
        children: "childNode"
      },
      departmentList: [],
      assignList: [],
      designatorName: "",
      createPeople: "",
      taskOperation: "提交",
      anotherTaskOperation: "关闭",
      waitSend: false,
      taskOperationShow: true,
      anotherTaskOperationShow: true,
      taskBackShow: true,
      taskTypeStatus: "",
      anotherButton: "",
      reverse: true,
      activities: [],
      circulationUrl: "",
      srcList: [],
      saveButtonShow: false,
      suspendStatus: "挂起",
      suspendShow: false
    };
  },
  computed: {
    ...mapState("user", ["userInfo"]),
    paramsData() {
      return {
        taskName: this.model.taskName,
        createBy: this.createPeople,
        beginTime: this.model.beginTime,
        endTime: this.model.endTime,
        designatorId: this.model.designatorId,
        designatorName: this.designatorName,
        description: this.model.description,
        type: this.model.taskType,
        urgent: this.model.urgent,
        taskPicList: this.model.taskPicList,
        delFlag: 1,
        officeLocation: this.model.officeLocation,
        deviceId: this.model.devicePoint
      };
    },
    taskId() {
      return this.$route.query;
    }
  },

  created() {
    let taskStatusDic = {
      compltete: {
        status: 4,
        button: {
          submitBack: { text: "返回", id: null }
        }
      },
      sendTask: {
        status: 1,
        button: {
          submitSend: { text: "派单", id: "" },
          submitClose: { text: "关闭", id: "" },
          submitBack: { text: "返回", id: null }
        }
      },

    };
    this.newTaskForm = {
      ...this.newTaskForm,
      ...this.$route.query.extraOptions
    };
    if (!this.taskId.id) {
      this.anotherTaskOperationShow = false;
      this.saveButtonShow = true;
    }
    if (this.taskId.allTaskStatus == "000") {
      this.taskOperationShow = false;
      this.anotherTaskOperationShow = false;
    }
    if (this.taskId.status == 1) {
      this.waitSend = true;
      this.taskOperationShow = false;
      // this.anotherTaskOperation = "关闭";
    } else if (this.taskId.status == 2) {
      this.taskOperation = "撤回";
      this.taskTypeStatus = 2;
    } else if (this.taskId.status == 3) {
      this.taskOperationShow = false;
      // this.anotherTaskOperation = "关闭";
      this.anotherButton = "primary";
    } else if (this.taskId.status == 5) {
      this.taskOperationShow = false;
      // this.anotherTaskOperation = "关闭";
      this.anotherButton = "primary";
    } else if (this.taskId.acceptStatus == 2) {
      this.taskTypeStatus = 1;
      this.taskOperation = "接单";
      this.anotherTaskOperation = "退单";
    } else if (this.taskId.acceptStatus == 3) {
      this.suspendShow = true;
      this.taskTypeStatus = 3;
      this.taskOperation = "转派";
      this.anotherTaskOperation = "完成";
    } else if (this.taskId.acceptStatus == 5) {
      this.suspendShow = true;
      this.taskTypeStatus = 3;
      this.suspendStatus = "解除挂起";
      this.anotherTaskOperationShow = false;
      this.taskOperationShow = false;
    } else if (this.taskId.acceptStatus == 4 || this.taskId.status == 4) {
      // this.taskOperation = "完成";
      this.anotherTaskOperationShow = false;
      this.taskOperationShow = false;
    }
  },
  methods: {
    async submitOperation() {
      if (this.taskId.id) {
        this.dealTask();
      } else {
        localStorage.setItem("judgeOperation", 0);
        let params;
        if (localStorage.getItem("judgeOperation") == 1) {
          params = {
            ...this.paramsData,
            ...{
              delFlag: 1,
              id: this.TempTaskId
            }
          };
        } else if (localStorage.getItem("judgeOperation") == 0) {
          params = {
            ...this.paramsData,
            ...{
              delFlag: 1
            }
          };
        }
        let res = await TaskManageApi.taskAdd(params);
        if (res) {
          this.$message({
            type: "success",
            message: res
          });
        }
        if (this.taskId.pageParams == 0) {
          this.$router.push("waitTask");
        } else if (this.taskId.pageParams == 1) {
          this.$router.push("alreadyTask");
        } else {
          this.$router.push("aboutMe");
        }
      }
    },
    async addTempTask() {
      this.$confirm("将此次编辑保留？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$refs[this.newTaskForm.ref].validate(valid => {
          if (valid) {
            this.save();
          } else {
            console.log("error");
            return false;
          }
        });
      });
    },
    async cancelHold() {
      let res = await TaskManageApi.getCancelHold({
        id: this.taskId.id
      });
      if (res) {
        this.$message({
          type: "success",
          message: res
        });
        if (this.taskId.pageParams == 0) {
          this.$router.push("waitTask");
        } else if (this.taskId.pageParams == 1) {
          this.$router.push("alreadyTask");
        } else {
          this.$router.push("aboutMe");
        }
      }
    },
    suspendTask() {
      this.$confirm(`确定${this.suspendStatus}工单吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (this.suspendStatus == "挂起") {
          this.taskTypeStatus = 5;
          this.dealTask();
        } else {
          this.cancelHold();
        }
      });
    },
    async save() {
      localStorage.setItem("judgeOperation", 1);
      let params = {
        ...this.paramsData,
        ...{
          delFlag: 2,
          id: this.TempTaskId
        }
      };
      let res = await TaskManageApi.addTempTask(params);
      if (res) {
        this.$message({
          type: "success",
          message: res
        });
        if (this.taskId.pageParams == 0) {
          this.$router.push("waitTask");
        } else if (this.taskId.pageParams == 1) {
          this.$router.push("alreadyTask");
        } else {
          this.$router.push("aboutMe");
        }
      }
    },
    async findTempTask() {
      let res = await TaskManageApi.findTempTask({
        delFlag: 2
      });

      if (res.data && localStorage.getItem("judgeOperation") == 1) {
        if (res.data.deptId) {
          this.changelistBy(res.data.deptId);
        }
        this.model.department = res.data.deptId;
        this.model.taskType = res.data.type;
        this.model.urgent = res.data.urgent;
        this.TempTaskId = res.data.id;
        this.model.taskName = res.data.taskName;
        this.model.beginTime = res.data.beginTime;
        this.model.endTime = res.data.endTime;
        this.model.designatorId = res.data.designatorId;
        this.designatorName = res.data.designatorName;
        this.model.description = res.data.description;
        this.model.taskPicList = res.data.taskPics;
      }
    },
    async dealTask() {
      let res = await TaskManageApi.dealTask({
        id: this.taskId.id,
        taskType: this.taskTypeStatus,
        designatorId: this.model.designatorId,
        reason: this.model.reason,
        taskPicList: this.model.taskPicList
      });
      this.toastMessage(res);
    },
    async closeTask() {
      let res = await TaskManageApi.closeTask({
        taskId: this.taskId.id
      });
      this.toastMessage(res);
    },
    async goOut() {
      //返回关闭退单完成
      if (this.taskId.acceptStatus == 2) {
        //接收人待接（退单）
        this.taskTypeStatus = 4;
        this.dealTask();
      } else if (this.taskId.acceptStatus == 3) {
        //接收人处理中（完成）
        let res = await TaskManageApi.completeTask({
          id: this.taskId.id,
          reason: this.model.reason
        });
        this.toastMessage(res);
      } else if (
        this.taskId.status == 2 ||
        this.taskId.status == 1 ||
        this.taskId.status == 3
      ) {
        this.closeTask();
      }
    },
    async submit() {
      if (this.taskId.status == 2) {
        // this.submitOperation();
      } else if (
        this.taskId.acceptStatus == 3 &&
        !this.newTaskForm.forms[6].display &&
        !this.newTaskForm.forms[10].display
      ) {
        this.$refs[this.newTaskForm.ref].setColumnByProp("department", {
          display: true,
          rules: {
            required: true,
            message: "请输入工单名称",
            trigger: "change"
          }
        });
        this.$refs[this.newTaskForm.ref].setColumnByProp("designatorId", {
          display: true,
          rules: {
            required: true,
            message: "请输入工单名称",
            trigger: "change"
          }
        });
        // this.$refs[this.newTaskForm.ref].setColumnByProp("ordererName", {
        //   display: false
        // });
        this.$refs[this.newTaskForm.ref].setColumnByProp("reason", {
          display: true,
          rules: {
            required: true,
            message: "请输入工单名称",
            trigger: "change"
          }
        });
        this.$refs[this.newTaskForm.ref].setColumnByProp("taskPicList", {
          display: true,
          disabled: false
        });
        return;
      }
      this.$confirm(`确定${this.taskOperation}吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs[this.newTaskForm.ref].validate(valid => {
            if (valid) {
              this.submitOperation();
            } else {
              console.log("error");
              return false;
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    anotherSubmit() {
      if (
        this.taskId.acceptStatus == 3 &&
        !this.newTaskForm.forms[12].display
      ) {
        this.$refs[this.newTaskForm.ref].setColumnByProp("reason", {
          display: true,
          rules: {
            required: true,
            message: "请输入备注",
            trigger: "change"
          }
        });
        this.$refs[this.newTaskForm.ref].setColumnByProp("taskPicList", {
          display: true,
          disabled: false
        });
        return;
      } else if (
        this.taskId.acceptStatus == 2 &&
        !this.newTaskForm.forms[12].display
      ) {
        this.taskTypeStatus = 4;
        this.$refs[this.newTaskForm.ref].setColumnByProp("reason", {
          display: true,
          rules: {
            required: true,
            message: "请输入备注",
            trigger: "change"
          }
        });
        this.$refs[this.newTaskForm.ref].setColumnByProp("taskPicList", {
          display: true,
          disabled: false
        });
        return;
      }
      this.$confirm(`确定${this.anotherTaskOperation}吗？`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs[this.newTaskForm.ref].validate(valid => {
            if (valid) {
              this.goOut();
            } else {
              console.log("error");
              return false;
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    toastMessage(res) {
      if (res) {
        this.$message({
          showClose: true,
          message: res,
          type: "success"
        });
        if (this.taskId.pageParams == 0) {
          this.$router.push("waitTask");
        } else if (this.taskId.pageParams == 1) {
          this.$router.push("alreadyTask");
        } else {
          this.$router.push("aboutMe");
        }
      }
    },
    resetChange() {},
    // 递归判断列表，把最后的children设为undefined
    getTreeData(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].childNode.length < 1) {
          // children若为空数组，则将children设为undefined
          data[i].childNode = undefined;
        } else {
          // children若不为空数组，则继续 递归调用 本方法
          this.getTreeData(data[i].childNode);
        }
      }
      return data;
    },
    async deptTreeList() {
      let res = await TaskManageApi.deptTreeList();
      this.departmentList = this.getTreeData(res[0].childNode);
    },
    async changelistBy(value) {
      let valueData;
      if (localStorage.getItem("judgeOperation") == 1) {
        if (Array.isArray(value)) {
          valueData = value[value.length - 1];
        } else {
          valueData = value;
        }
      } else {
        valueData = value[value.length - 1];
      }
      let res = await TaskManageApi.listBy({
        deptId: valueData
      });
      this.assignList = res;
    },
    assignChange(value) {
      var obj = {};
      obj = this.assignList.find(item => {
        return item.id === value;
      });
      this.designatorName = obj.name;
    },
    back() {
      if (this.taskId.pageParams == 0) {
        this.$router.push("waitTask");
      } else if (this.taskId.pageParams == 1) {
        this.$router.push("alreadyTask");
      } else {
        this.$router.push("aboutMe");
      }
    },
    async detailTask() {
      this.$refs[this.newTaskForm.ref].setColumnByProp("department", {
        display: false
      });
      this.$refs[this.newTaskForm.ref].setColumnByProp("designatorId", {
        display: false
      });
      // this.$refs[this.newTaskForm.ref].setColumnByProp("ordererName", {
      //   display: true
      // });
      this.$refs[this.newTaskForm.ref].setColumnByProp("taskPicList", {
        display: false
      });
      let res = await TaskManageApi.detailTask({
        taskId: this.taskId.id
      });
      if (res) {
        this.model.taskName = res.taskName;
        this.model.createBy = res.founderName;
        this.createPeople = res.founderName;
        this.model.beginTime = res.beginTime;
        this.model.endTime = res.endTime;
        // this.model.designatorId = res.username;
        this.model.ordererName = res.username;
        this.model.description = res.description;
        this.model.taskType = res.type;
        this.model.urgent = res.urgent;
        this.model.officeLocation = res.officeLocation;
      }
    },
    dispatch() {
      // pd={
      //   btn:{
      //     text:"",
      //     eventnam:"dispatch"
      //   },
      //   props:{
      //     department:{
      //       display: true,
      //       rule:[]
      //     }
      //   }
      // }
      // this[a.eventnam]();
      if (!this.newTaskForm.forms[7].display) {
        //派单
        this.$refs[this.newTaskForm.ref].setColumnByProp("department", {
          display: true,
          rules: {
            required: true,
            message: "请输入工单名称",
            trigger: "change"
          }
        });
        this.$refs[this.newTaskForm.ref].setColumnByProp("designatorId", {
          display: true,
          rules: {
            required: true,
            message: "请输入工单名称",
            trigger: "change"
          }
        });

        // this.$refs[this.newTaskForm.ref].setColumnByProp("ordererName", {
        //   display: false
        // });
        return;
      }

      this.$confirm("确定派单吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$refs[this.newTaskForm.ref].validate(valid => {
            if (valid) {
              this.add();
            } else {
              console.log("error");
              return false;
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    async add() {
      let addTaskParams = {
        ...this.paramsData,
        ...{
          id: this.taskId.id
        }
      };
      let res = await TaskManageApi.taskAdd(addTaskParams);
      this.toastMessage(res);
    },
    async getTaskTypeList() {
      let res = await TaskManageApi.getTaskTypeList();
      if (res) {
        this.$refs["newTaskForm"].setColumnByProp("taskType", {
          dicData: res
        });
        this.model.taskType = res[0].id;
      }
    },
    async getDevicePoint() {
      let res = await TaskManageApi.getFindDevice();
      this.$refs["newTaskForm"].setColumnByProp("devicePoint", {
        dicData: res
      });
    },
    async operateLogList() {
      let res = await TaskManageApi.operateLogList({
        taskId: this.taskId.id
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
    }
  },
  async mounted() {
    await this.deptTreeList();
    this.createPeople = this.userInfo.name;
    if (this.taskId.id) {
      this.detailTask();
      this.operateLogList();
    }
    this.getTaskTypeList();
    this.getDevicePoint();
    if (localStorage.getItem("judgeOperation") == 1) {
      this.findTempTask();
    }
  }
};
</script>

<style lang="less">
.new-task {
  .new-task-box {
    // padding: 40px 0;
    width: 60%;
    // background: pink;
    // margin-top: 20px;
    // margin-left: 25%;
     margin: 40px auto;
  }
  .flow-detail-title {
    height: 50px;
    line-height: 30px;
    color: #9a9b9c;
    font-size: 16px;
    padding-left: 4px;
    font-weight: 600;
  }
  .block {
    // height: auto;
    .activityUser {
      color: #008dea;
    }
    .activity-user-name {
      // float: left;
    }
    .reason {
      // margin-top: 8px;
      // line-height: 20px;
      color: #909399;
    }
    .demo-image__preview {
      margin-top: 8px;
    }
  }
}
</style>
