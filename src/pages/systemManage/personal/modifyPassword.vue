<template>
  <div class="modify-password radius-shadow panel-container">
    <div class="form-box">
      <z-form :ref="formData.ref" :options="formData" v-model="formModel" @submit="submit">
        <template slot="menuBtn" slot-scope="scope">
          <el-button @click="goBack(scope)" v-if="!isyd">返回</el-button>
        </template>
      </z-form>
    </div>
  </div>
</template>

<script>
import SystemManageApi from "@/service/api/systemManage";
import {isYD} from "@/utils/project";
export default {
  name: "ModifyPassword",
  data() {
    let rePasswordVaild = (rule, value, callback) => {
      if (value.trim() == "") {
        callback(new Error("请再次输入新密码"));
      } else if (value != this.formModel.newPassword1) {
        callback(new Error("两次新密码不一致"));
      } else {
        callback();
      }
    };

    let newPasswordVaild = (rule, value, callback) => {
      if (value.trim() == "") {
        callback(new Error("请输入新密码"));
      } else if (value == this.formModel.oldPassword) {
        callback(new Error("新密码与原密码一致"));
      } else {
        callback();
      }
    };
    return {
      formModel: {},
      formData: {
        ref: "formRef",
        size: "medium",
        menuPosition: "center",
        labelWidth: 150,
        emptyBtn: false,
        forms: [
          {
            type: "password",
            label: "原密码",
            prop: "oldPassword",
            span: 24,
            rules: {
              required: true,
              message: "请输入原密码",
              trigger: "blur"
            }
          },
          {
            type: "password",
            label: "新密码",
            prop: "newPassword1",
            span: 24,
            rules: {
              required: true,
              validator: newPasswordVaild,
              trigger: "blur"
            }
          },
          {
            type: "password",
            label: "再次输入新密码",
            prop: "newPassword2",
            placeholder: "请再次输入新密码",
            span: 24,
            rules: {
              required: true,
              validator: rePasswordVaild,
              trigger: "blur"
            }
          }
        ]
      }
    };
  },
  computed:{
    isyd(){
      return isYD()
    }
  },
  methods: {
    async submit(model, hide) {
      await SystemManageApi.modifyPwd(this.formModel)
        .then(res => {
          this.$message({
            type: "success",
            message: res
          });
          this.$router.push("/login");
        })
        .finally(msg => {
          hide();
        });
    },
    goBack() {
      if (Cookies.get("moduleType") == 2) {
        this.$router.push("/digitalPark/homePage");
      } else {
        this.$router.push("/digitalPark/dashboardHomePage");
      }
    }
  },
  mounted() {}
};
</script>
<style lang="less">
.modify-password {
  .form-box {
    width: 400px;
    margin: 0 auto;
    padding: 20px 0;
  }
}
</style>
