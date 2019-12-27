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
          <template slot="createBy">
            <div>
              {{createPeople}}
            </div>
          </template>
          <template slot="btn" slot-scope="obj">
            <div>
              <el-button :disabled="obj.disabled" type="primary" @click="onClickSearchBtn(obj)">搜索</el-button>
              <el-button :disabled="obj.disabled" @click="clearForm(obj)">清除</el-button>
            </div>
          </template>
           <template slot-scope="scope" slot="menuBtn">
            <el-button :size="scope.size" @click="back(scope)">返回</el-button>
          </template>
        </miForm>
      </div>
    </div>
  </div>
</template>

<script>
let workOrderType= [
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
      ]
  let priorityType = [{
    value:1,
    label:"正常",
  },{
    value:2,
    label:"重要",
  },{
    value:3,
    label:"紧急",
  }]    
import miForm from "@/components/Form";
import TaskManageApi from "../../service/api/taskManageApi";
export default {
  name: "NewTask",
  components: { miForm },
  data() {
    return {
      model: {
        taskType:1,
        urgent:1
      },
      newTaskForm: {
        ref: "newTaskForm",
        labelWidth: "100",
        size: "medium",
        labelPosition: "left",
        menuPosition: "left",
        submitBtn: true,
        emptyBtn: false,
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
            dicData:workOrderType
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
            // format: "yyyy-MM-dd HH:mm:ss",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            width: 120,
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
            dicData:priorityType
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
      designatorName:"",
      createPeople:""
    };
  },
  computed:{
    paramsData(){
      return{
        taskName:this.model.taskName,
        createBy:this.model.createBy,
        beginTime:this.model.beginTime,
        endTime:this.model.endTime,
        designatorId:this.model.assign,
        designatorName:this.designatorName,
        description:this.model.description,
        type:this.model.taskType,
        urgent:this.model.urgent,
        taskPicList:this.model.taskPicList
      }
    }
  },
  methods: {
   async submit(model) {
     let params={
       ...model,
       ...{
         designatorName:this.designatorName,
        //  delFlag:1
       }
     }
      let res = await TaskManageApi.taskAdd(params);
      if (res) {
        this.$message({
          type: "success",
          message: res
        });
      }
      this.$router.push("/taskOverview");
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

  },
  mounted() {
    this.deptTreeList();
    this.createPeople = JSON.parse(localStorage.getItem('userInfo')).fullName
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