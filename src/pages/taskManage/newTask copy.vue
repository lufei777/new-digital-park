<template>
  <div class="new-task panel-container">
    <div class="condition-box panel">
      <div class="new-task-box">
        <miForm
          :ref="newTaskForm.ref"
          :options="newTaskForm"
          v-model="model"
          @submit="submit"
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
                  :label="item.fullName"
                  :value="item.id"
                ></el-option>
              </el-select>
            </div>
          </template>
           <template slot="ordererName">
            <div>
              {{model.ordererName}}
            </div>
          </template>
          <template slot="createBy">
            <div>{{createPeople}}</div>
          </template>
          <!-- <template slot="btn" slot-scope="obj">
            <div>
              <el-button type="primary"  @click="dispatch" v-show="waitSend">派单</el-button>
              <el-button  type="primary" v-show="taskOperationShow" @click="submit(obj)">{{taskOperation}}</el-button>
              <el-button @click="back(obj)">{{taskBack}}</el-button>
            </div>
          </template> -->
          <template slot-scope="scope" slot="menuBtn">
             <el-button @click="back(scope)">{{taskBack}}</el-button>
          </template>
        </miForm>
      </div>
    </div>
  </div>
</template>

<script>
let workOrderType = [
  {
    value: 1,
    label: "巡检"
  },
  {
    value: 2,
    label: "审批"
  },
  {
    value: 3,
    label: "调试"
  },
  {
    value: 4,
    label: "其他"
  }
];
let priorityType = [
  {
    value: 1,
    label: "正常"
  },
  {
    value: 2,
    label: "重要"
  },
  {
    value: 3,
    label: "紧急"
  }
];
import miForm from "@/components/Form";
import TaskManageApi from "../../service/api/taskManageApi";
export default {
  name: "NewTask",
  components: { miForm },
  data() {
    return {
      model: {
        taskType: 1,
        urgent: 1
      },
      newTaskForm: {
        ref: "newTaskForm",
        labelWidth: "120",
        labelPosition: "right",
        menuPosition: "left",
        submitText: "确定",
        emptyBtn: false,
        size: "medium",
        menuBtn: true,
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
            label: "工单类型",
            prop: "taskType",
            placeholder: "请输入",
            clearable: true,
            offset: 2,
            span: 10,
            rules: {
              required: true,
              message: "请选择工单类型",
              trigger: "change"
            },
            dicData: workOrderType
          },
          {
            type: "datetime",
            label: "开始时间",
            prop: "beginTime",
            placeholder: "选择日期时间",
            clearable: true,
            span: 10,
            // format: "yyyy-MM-dd",
            // valueFormat: "timestamp",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            rules: {
              required: true,
              message: "请选择开始时间",
              trigger: "change"
            }
          },
          {
            type: "datetime",
            label: "预计结束时间",
            prop: "endTime",
            placeholder: "选择日期时间",
            clearable: true,
            span: 10,
            offset: 2,
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            rules: {
              required: true,
              message: "请选择开始时间",
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
            dicData: priorityType
          },
          {
            label: "部门",
            prop: "department",
            span: 10,
            formslot: true,
            hide: true
            // display:false,
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
            label: "接单人",
            prop: "ordererName",
            span: 10,
            formslot: true,
            display:false
          },
          {
            type: "textarea",
            label: "备注",
            prop: "description",
            clearable: true,
            span: 22,
            maxlength: 255,
            minRows: 6,
            showWordLimit: true
          },
          {
            type: "upload",
            listType: "picture-card",
            label: "添加图片",
            prop: "taskPicList",
            span: 24,
            // tip: "只能上传jpg/png文件。",
            action: "/oaApi/image/upload",
            accept: ["jpg", "jpeg", "png"],
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
          // {
          //   prop: "btn",
          //   span: 4,
          //   formslot: true,
          //   // width: 55
          // }
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
      taskOperation:"确定",
      taskBack:"返回",
      waitSend:false,
      taskOperationShow:true
    };
  },
  computed: {
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
        taskPicList: this.model.taskPicList
      };
    },
    taskId() {
      return this.$route.params;
    }
  },
  created() {
    this.newTaskForm = {
      ...this.newTaskForm,
      ...this.$route.params.extraOptions
    };
    if(this.taskId.status == 1){
       this.newTaskForm.submitText = "派单"
      this.waitSend = true
      this.taskOperationShow = false
       this.taskBack = "关闭"
    } else if(this.taskId.status == 2){
       this.newTaskForm.submitText = "撤回"
    } else if(this.taskId.status == 3){
       this.newTaskForm.submitText = "返回"
      this.taskBack = "关闭"
    } else if(this.taskId.acceptStatus == 2){
       this.newTaskForm.submitText = "接单"
       this.taskBack = "退单"
    } else if(this.taskId.acceptStatus == 3){
       this.newTaskForm.submitText = "转派"
       this.taskBack = "完成"
    } else if(this.taskId.acceptStatus == 4){
       this.newTaskForm.submitText = "完成"
    }
  },
  methods: {
    async submit(model) {
      let params = {
        ...model,
        ...{
          designatorName: this.designatorName
          //  delFlag:1
        }
      };
      let res = await TaskManageApi.taskAdd(this.paramsData);
      if (res) {
        this.$message({
          type: "success",
          message: res
        });
      }
      this.$router.push("/aboutMe");
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
      if (localStorage.getItem("draft") == 1) {
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
      // this.newTaskForm.forms[7].dicData.push(res)
      this.assignList = res;
    },
    assignChange(value) {
      var obj = {};
      obj = this.assignList.find(item => {
        return item.id === value;
      });
      this.designatorName = obj.fullName;
    },
    back() {
      this.$router.push("aboutMe");
    },
    async detailTask() {
      this.$refs[this.newTaskForm.ref].setColumnByProp("department", {
        display: false
      });
      this.$refs[this.newTaskForm.ref].setColumnByProp("designatorId", {
        display: false
      });
       this.$refs[this.newTaskForm.ref].setColumnByProp("ordererName", {
        display: true
      });
      let res = await TaskManageApi.detailTask({
        taskId: this.taskId.id
      });
      console.log("res", res);
      if (res) {
        this.model.taskName = res.taskName;
        this.model.createBy = res.createBy;
        this.model.beginTime = res.beginTime;
        this.model.endTime = res.endTime;
        this.model.designatorId = res.username;
        this.model.ordererName = res.username;
        this.model.description = res.description;
        this.model.taskType = parseInt(res.type);
        this.model.urgent = parseInt(res.urgent);
        this.model.taskPicList = res.taskPics;
      }
    },
   async dispatch(){//派单
       this.$refs[this.newTaskForm.ref].setColumnByProp("department", {
        display: true
      });
      this.$refs[this.newTaskForm.ref].setColumnByProp("designatorId", {
        display: true
      });
       this.$refs[this.newTaskForm.ref].setColumnByProp("ordererName", {
        display: false
      });
      let addTaskParams = {
        ...this.paramsData,
        ...{
          id:this.taskId.id
        }
      }
      let res = await TaskManageApi.taskAdd(addTaskParams);
      console.log('res',res)
    }
  },
  mounted() {
    this.deptTreeList();
    this.createPeople = JSON.parse(localStorage.getItem("userInfo")).fullName;
    if (this.taskId.id) {
      this.detailTask();
    }
  }
};
</script>

<style lang="less">
.new-task {
  .new-task-box {
    padding: 40px 0;
    width: 50%;
    // background: pink;
    // margin-top: 20px;
    margin-left: 25%;
  }
}
</style>