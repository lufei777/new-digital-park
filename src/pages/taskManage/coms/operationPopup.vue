<template>
  <div class="add-role popup-style" v-show="dialogFormShow">
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogFormShow"
      width="30%"
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
  props: ["dialogParams", "dialogFormShow", "specialFormShow", "dialogTitle"],
  data() {
    let _this = this;
    return {
      formModel: {},
      formConfig: {
        ref: "formRef",
        labelWidth: "90",
        labelPosition: "right",
        menuPosition: "left",
        emptyBtn: false,
        forms: [
          {
            type: "cascader",
            label: "部门",
            prop: "department",
            showAllLevels: false,
            display: false,
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
            display: false,
            clearable: true,
            props: {
              label: "name",
              value: "id"
            },
            span: 24,
            rules: {
              required: true,
              trigger: "change"
            }
          },
          {
            type: "textarea",
            label: "描述",
            prop: "reason",
            span: 24,
            rules: {
              required: true,
              trigger: "change",
              message: "请输入描述"
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
      valueData: "",
      flag: ""
    };
  },
  watch: {
    dialogFormShow(val) {
      if (val) {
        this.deptTreeList();
        this.$nextTick(() => {
          if (this.specialFormShow == 1) {
            this.$refs["formRef"].setColumnByProp("reason", {
              display: false
            });
            this.$refs["formRef"].setColumnByProp("taskPicList", {
              display: false
            });
          } else {
            this.$refs["formRef"].setColumnByProp("reason", {
              display: true
            });
            this.$refs["formRef"].setColumnByProp("taskPicList", {
              display: true
            });
          }
          if (this.specialFormShow == 3 || this.specialFormShow == 1) {
            this.$refs["formRef"].setColumnByProp("department", {
              display: true
            });
            this.$refs["formRef"].setColumnByProp("designatorId", {
              display: true
            });
          } else {
            this.$refs["formRef"].setColumnByProp("department", {
              display: false
            });
            this.$refs["formRef"].setColumnByProp("designatorId", {
              display: false
            });
          }
        });
      }
    }
  },
  computed: {},
  methods: {
    async submit(model, hide) {
      this.$emit("dialogParams", model, hide);
    },
    goBack() {
      this.resetFormFunc();
      this.$emit("closeDialog", false);
    },
    resetFormFunc() {
      this.$refs[this.formConfig.ref].resetForm();
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
      this.resetFormFunc();
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

  created() {},
  mounted() {}
};
</script>

<style lang="less">
.add-role {
  padding: 10px;
  background: @white;

  .el-form {
    // width: 50%;
    // margin: 30px auto;
  }
}
</style>
