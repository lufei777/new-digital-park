<template>
  <div class="add-user radius-shadow panel-container">
    <div class="tip flex-align">
      <span class="icon"></span>
      <span>{{tipText}}</span>
    </div>
    <!--<el-form ref="userForm" :rules="rules" :model="userForm" label-position="right" label-width="120px" >-->
      <!--<el-form-item label="用户名" prop="login_id">-->
        <!--<el-input v-model="userForm.login_id"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="姓名" prop="name">-->
        <!--<el-input v-model="userForm.name"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="密码" prop="password">-->
        <!--<el-input v-model="userForm.password" type="password"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="确认密码" prop="re_password">-->
        <!--<el-input v-model="userForm.re_password" type="password"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="手机号" prop="phone">-->
        <!--<el-input v-model="userForm.phone"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="Email" prop="mail">-->
        <!--<el-input v-model="userForm.mail"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="所在部门" prop="departmentName">-->
        <!--<el-input v-model="userForm.departmentName" @focus="onShowModal"></el-input>-->
      <!--</el-form-item>-->
      <!--<el-form-item label="用户身份" prop="rid">-->
        <!--<el-select v-model="userForm.rid">-->
          <!--<el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id">-->
          <!--</el-option>-->
        <!--</el-select>-->
      <!--</el-form-item>-->
      <!--<el-form-item>-->
        <!--<el-button type="primary" @click="submitForm('userForm')">确定</el-button>-->
        <!--<el-button @click="goBack" class="go-back">返回</el-button>-->
      <!--</el-form-item>-->
    <!--</el-form>-->
    <div class="form-box">
      <z-form :ref="formConfig.ref" :options="formConfig" v-model="formModel" @submit="submit">
        <template slot="menuBtn" slot-scope="scope">
          <el-button @click="goBack(scope)">返回</el-button>
        </template>
      </z-form>
    </div>
  </div>
</template>

<script>
  import TreeModal from '@/components/treeModal/index'
  import SystemManageApi from '@/service/api/systemManage'
  import {mapState} from 'vuex'
  export default {
    name: 'AddUser',
    components: {
    },
    // props:['curUserId','isEdit'],
    data () {
      let that = this
      let checkRePwd=function(rule,value,callback){
        if(value!=that.userForm.password){
          callback(new Error('两次密码不一致'));
        }else{
          callback()//必须写callback函数。否则提交时候校验不执行
        }
      }
      let checkPhone=function(rule,value,callback){
        let reg=/^1(3|4|5|7|8)\d{9}$/
        if(!reg.test(value)){
          callback(new Error('手机号格式不正确'));
        }else{
          callback()//必须写callback函数。否则提交时候校验不执行
        }
      }
      let checkMail=function(rule,value,callback){
        let reg=/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if(!reg.test(value) && value.trim()!=''){
          callback(new Error('邮箱格式不正确'));
        }else{
          callback()//必须写callback函数。否则提交时候校验不执行
        }
      }
      return {
        userForm:{
          login_id:'',
          name:'',
          password:'',
          re_password:"",
          mail:'',
          phone:'',
          department:'',
          departmentName:'',
          rid:'',
          id:''
        },
        rules: {
          login_id:[{ required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 4, message: '至少输入4个字符', trigger: 'blur' }],
          name:[{ required: true, message: '请输入姓名', trigger: 'blur' },
                { min: 4, message: '至少输入4个字符', trigger: 'blur' }],
          password:[{ required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 5, message: '至少输入5个字符', trigger: 'blur' }],
          re_password:[{ required: true, message: '请输入密码', trigger: 'blur' },
                      { min: 5, message: '至少输入5个字符', trigger: 'blur' },
                      { validator: checkRePwd, trigger: 'blur' }],
          phone:[{ required: true, message: '请输入手机号', trigger: 'blur' },
                 { validator: checkPhone, trigger: 'blur' }],
          mail:[{ validator: checkMail, trigger: 'blur' }],
        },
        // roleList:[],
        showDialog:false,
        departmentList:[],
        formModel: {},
        formConfig: {
          ref: "formRef",
          size: "medium",
          menuPosition: "center",
          labelWidth: 150,
          emptyBtn: false,
          forms: [
            {
              type: "input",
              label: "用户名",
              prop: "loginId",
              span: 24,
              rules: {
                required: true,
                // message: "请输入角色ID",
                trigger: "blur"
              }
            },
            {
              type: "input",
              label: "姓名",
              prop: "name",
              span: 24,
              rules: {
                required: true,
                message: "请输入角色名称",
                triCgger: "blur"
              }
            },
            {
              type: "tree",
              label: "所属部门",
              prop: "department",
              span: 24,
              dicData:[],
              props: {
                label: "name",
                value: "id",
                children: "childNode",
              },
              rules: {
                required: true,
                // message: "请输入角色名称",
                trigger: "change"
              }
            },
            // {
            //   type: "password",
            //   label: "密码",
            //   prop: "password",
            //   span: 24,
            //   rules: {
            //   }
            // },
            // {
            //   type: "password",
            //   label: "确认密码",
            //   prop: "rePassword",
            //   span: 24,
            //   rules: {
            //   }
            // },
            {
              type: "input",
              label: "E-mail",
              prop: "mail",
              span: 24,
              rules: {
              }
            },
            {
              type: "input",
              label: "手机号",
              prop: "phone",
              span: 24,
              rules: {
              }
            },
            {
              type: "textarea",
              label: "已分配角色",
              prop: "roleList",
              span: 24,
              disabled:true
            },
            {
              type: "tree",
              label: "分配角色",
              prop: "role",
              multiple:true,
              dicData:[],
              props: {
                label: "name",
                value: "id",
                children: "childNode",
              },
              span: 24,
            },
          ]
        },
      }
    },
    computed:{
      tipText(){
        return this.curUserId?'编辑用户':'添加用户'
      },
      curUserId(){
        return this.$route.query.curUserId
      },
      api(){
        return this.curUserId?'updateUser':'addUser'
      },
      ...mapState({
        userInfo: state => state.user.userInfo
      })
    },
    watch:{
    },
    methods: {
      async getUserDetail(){
        let res =await SystemManageApi.getUserDetail({
          userId:this.curUserId
        })
        this.formModel = res
      },
      async getRoleList(){
        let res = await SystemManageApi.getRoleList({
          userId: this.userInfo.id
        })
        this.$refs[this.formConfig.ref].setColumnByProp("role", {
          dicData:res.list
        });
      },
      async getDepartmentList(){
        let res = await SystemManageApi.getDepartmentTree()
        this.$refs[this.formConfig.ref].setColumnByProp("department", {
           dicData:res
        });
      },
      async submit(model, hide) {
        let params = this.formModel
        if(this.curUserId){
          params = {...this.formModel,...{loginId:this.curUserId}}
        }
        await SystemManageApi[this.api](params)
          .then(res => {
            this.$message({
              type: "success",
              message: res
            });
            // this.$router.push('./userManage')
          })
          .finally(msg => {
            hide();
          });
        // console.log(this.formModel.role)
        // await SystemManageApi.assignRole({
        //   userId:this.curUserId,
        //   roleIds:this.formModel.role.join(",")
        // })
      },
      goBack(){
        history.go(-1)
      },
    },
    mounted(){
       this.getRoleList()
       this.getDepartmentList()
       if(this.curUserId){
        this.getUserDetail()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .add-user{
    padding:20px;
    box-sizing: border-box;
    .form-box{
      width:40%;
      margin:0 auto;
    }
  }
</style>
