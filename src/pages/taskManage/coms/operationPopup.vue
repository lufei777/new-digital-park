<template>
  <div class="add-role">
    <el-dialog
      title
      :visible.sync="dialogFormFlag"
      width="85%"
      custom-class="per-modal"
      :before-close="dialogClose"
    >
      <z-form :ref="formConfig.ref" :options="formConfig" v-model="formModel" @submit="submit">
        <template slot="menuBtn" slot-scope="scope">
          <el-button @click="goBack(scope)">取消</el-button>
        </template>
      </z-form>
    </el-dialog>
  </div>
</template>

<script>
import SystemManageApi from "@/service/api/systemManage";
import TaskManageApi from "@/service/api/taskManage";
export default {
  props: ["dialogParams", "dialogFormFlag", "showFormFlag"],
  data() {
    let _this = this;
    return {
      formModel: {},
      formConfig: {
        ref: "formRef",
        labelWidth: "120",
        labelPosition: "right",
        menuPosition: "left",
        emptyBtn: false,
        forms: [
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
            span: 24,
            change: _this.changelistBy
          },
          {
            type: "select",
            label: "指派",
            prop: "designatorId",
            placeholder: "请输入",
            clearable: true,
            props: {
              label: "name",
              value: "id"
            },
            span: 24,
            rules: {
              required: true,
              trigger: "change"
            },
            change: function(value) {}
          },
          {
            type: "textarea",
            label: "描述",
            prop: "reason",
            span: 24,
            rules: {
              required: true,
              message: "请输入描述",
              trigger: "blur"
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
            display:true,
            rules: {
              required: true,
              message: "请选择图片",
              trigger: "blur"
            },
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
      valueData: ""
    };
  },
  computed: {},
  methods: {
    async submit(model, hide) {
      console.log("hide", hide());
      this.$emit("dialogParams", model);
      // this.dialogParams(model, hide);
    },
    goBack() {
      this.$emit("closeDialog", false);
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
      this.$refs["formRef"].setColumnByProp("designatorId", {
        dicData: res
      });
    },
    dialogClose(done) {
      this.$refs[this.formConfig.ref].resetForm();
      this.$nextTick(() => {
        this.$emit("closeDialog", false);
      });
    },
    async deptTreeList() {
      let res = await TaskManageApi.deptTreeList();
      this.$refs[this.formConfig.ref].setColumnByProp("department", {
        dicData: res[0].childNode
      });
    }
  },
  watch: {
    dialogFormFlag(val) {
      if (val) {
        this.deptTreeList();
      }
      if(val && this.showFormFlag==1) {
        this.$refs[this.formConfig.ref].setColumnByProp("taskPicList", {
          display: false
        });
      }
    },
  },
  created() {
    
  },
  mounted() {
    console.log(this.showFormFlag,this.dialogFormFlag)
  }
};
</script>

<style lang="less">
.add-role {
  padding: 10px;
  background: @white;

  .el-form {
    width: 50%;
    margin: 30px auto;
  }
}
</style>
