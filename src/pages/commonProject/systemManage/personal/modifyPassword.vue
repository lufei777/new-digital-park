<template>
  <div class="modify-password radius-shadow">
    <div class="form-box">
      <miForm
        :ref="formData.ref"
        :options="formData"
        v-model="formModel"
        @submit="submit"
      ></miForm>
    </div>
  </div>
</template>

<script>
  import miForm from "@/components/Form";
  export default {
    name: 'ModifyPassword',
    components: {
      miForm
    },
    data () {
      return {
        formModel:{
        },
        formData: {
          ref: "formRef",
          size: "medium",
          menuPosition: "center",
          labelWidth:150,
          forms: [
            {
              type: "input",
              label: "原密码",
              prop: "password",
              span: 24,
              rules: {
                required: true,
                message: "请输入密码",
                trigger: "blur"
              }
            },
            {
              type: "input",
              label: "新密码",
              prop: "rePassword",
              span: 24,
              rules: {
                required: true,
                message: "如果没有自动生成，请联系管理员",
                trigger: "change"
              }
            },
            {
              type: "input",
              label: "再次输入新密码",
              prop: "sureRepassword",
              placeholder:'请再次输入新密码',
              span: 24,
              rules: {
                required: true,
                // validator: telephone,
                message: "请输入正确的电话号码",
                trigger: "change"
              }
            },
          ]
        }
      }
    },
    methods: {
      submit(){

      }
    },
    mounted(){
    }
  }
</script>
<style lang="less">
  .modify-password{
    .form-box{
      width:400px;
      margin:0 auto;
      padding:20px 0;
    }
  }
</style>
