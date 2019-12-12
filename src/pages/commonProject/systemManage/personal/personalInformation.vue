<template>
  <div class="personal-information radius-shadow">
    <div class="form-box">
      <!--<miForm-->
        <!--:ref="formData.ref"-->
        <!--:options="formData"-->
        <!--v-model="model"-->
        <!--@submit="submit"-->
      <!--&gt;</miForm>-->
    </div>
  </div>
</template>

<script>
  // import miForm from "../../../../components/Form/index";
  export default {
    name: 'PersonalInformation',
    components: {
      // miForm
    },
    data () {
      return {
        model:{
          sex:0,
          name:'',
          avatar:'',
          mail:'',
          telephone:''
        },
        formData: {
          ref: "formRef",
          size: "medium",
          menuPosition: "left",
          forms: [
            {
              type: "input",
              label: "姓名",
              prop: "name",
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
              listType: "picture-card",
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
              span: 24,
              dicData: [
                {
                  label: "男",
                  value: 1
                },
                {
                  label: "女",
                  value: 2
                },
                {
                  label: "保密",
                  value: 0
                }
              ],
              rules: {
              }
            },
            {
              type: "input",
              label: "邮箱",
              prop: "mail",
              clearable: true,
              span: 24,
              rules: {
              }
            },
            {
              type: "input",
              label: "手机号",
              prop: "telephone",
              placeholder: "请输入电话号码",
              clearable: true,
              span: 24,
              rules: {
                required: true,
                // validator: telephone,
                message: "请输入正确的电话号码",
                trigger: "change"
              }
            }]
        }
      }
    },
    methods: {
      submit(){}
    },
    mounted(){
    }
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
