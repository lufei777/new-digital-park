<template>
  <div class="personal-information radius-shadow">
    <div class="form-box">
      <miForm :ref="formData.ref" :options="formData" v-model="formModel" @submit="submit">
        <template slot="menuBtn" slot-scope="scope">
           <el-button @click="goBack(scope)">返回</el-button>
        </template>
      </miForm>
    </div>
  </div>
</template>

<script>
  import miForm from "../../../../components/Form/index";
  import DigitalPark from '../../../../service/api/digitalParkApi'
  import { CommonDic } from '../../../../utils/dictionary'
  import {mapState} from 'vuex'
  export default {
    name: 'PersonalInformation',
    components: {
      miForm
    },
    data () {
      let validTelephone = (rule, value, callgoBack) => {
        let reg = /^1[3|4|5|7|8]\d{9}$/;
        if (reg.test(value) || value=="") {
          callgoBack();
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
          emptyBtn:false,
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
              prop: "headUrl",
              span: 24,
              action: "/oaApi/image/upload",
              accept: ["jpg", "jpeg", "png"],
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
              valueDefault: '1',
              span: 24,
              dicData:CommonDic.sexDic
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
    },
    watch:{
      updateUserInfo(){}
    },
    methods: {
      async submit(model,hide){
        await DigitalPark.editPersonInformation(this.formModel)
             .then(res=>{
                 this.$message({
                   type: "success",
                   message: res
                 });
                  this.$store.commit('digitalPark/updateUserInfo',true)
             }).finally(e=>{
               hide()
          })
      },
      async getUserInfo(){
        let res =  await DigitalPark.getUserInfo()
        this.formModel = res
      },
      goBack(){
        if(Cookies.get('moduleType')==2){
          this.$router.push('/digitalPark/homePage')
        }else{
          this.$router.push('/digitalPark/dashboardHomePage')
        }
      }
    },

    mounted(){

    },
    created(){
      this.getUserInfo()
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
