<template>
  <div class="personal-information radius-shadow">
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
  import miForm from "../../../../components/Form/index";
  export default {
    name: 'PersonalInformation',
    components: {
      miForm
    },
    data () {
      let validTelephone = (rule, value, callback) => {
        let reg = /^1[3|4|5|7|8]\d{9}$/;
        if (reg.test(value) || value=="") {
          callback();
        } else {
          callback(new Error("请输入正确的手机号"));
        }
      };
      let validMail = (rule, value, callback) => {
        let reg = /[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱"));
        }
      };
      return {
        formModel:{
        },
        formData: {
          ref: "formRef",
          size: "medium",
          menuPosition: "left",
          forms: [
            {
              type: "input",
              label: "姓名",
              prop: "fullName",
              clearable: true,
              span: 24,
              rules: {
                required: true,
                message: "请输入姓名",
                trigger: "blur"
              }
            },
            {
              type: "upload",
              listType: "picture-img",
              label: "头像",
              prop: "avatar",
              dataType: "string",
              limit: 1,
              span: 24,
              action: "/oaApi/image/upload",
              accept: ["jpg", "jpeg", "png"],
              props: {
                label: "tenantPictureName",
                value: "tenantPictureUrl"
              },
              propsHttp: {
                name: "fileName",
                url: "fileUrl",
                res: "data"
              }
            },
            {
              type: "radio",
              label: "性别",
              prop: "sex",
              valueDefault: 0,
              span: 24,
              dicData: [{
                label: "男",
                value: 1
               },{
                  label: "女",
                  value: 2
                },{
                  label: "保密",
                  value: 0
              }],
            },
            {
              type: "input",
              label: "邮箱",
              prop: "email",
              clearable: true,
              span: 24,
              rules: {
                validator: validMail,
                trigger: "blur"
              }
            },
            {
              type: "input",
              label: "手机号",
              prop: "telephone",
              clearable: true,
              span: 24,
              rules: {
                validator: validTelephone,
                trigger:"blur",
              }
            }]
        }
      }
    },
    computed:{
      userInfo(){
        return JSON.parse(localStorage.getItem('userInfo'))
      }
    },
    methods: {
      submit(){}
    },
    mounted(){

    },
    created(){
      this.formModel = this.userInfo
      this.formModel.sex=this.userInfo.sex=='男'?1:this.userInfo.sex=='女'?2:0
    },
  }
</script>
<style lang="less">
  .personal-information{
     .form-box{
       padding:20px 0;
       width:350px;
       margin:0 auto;
     }
  }
</style>
