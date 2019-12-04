<template>
  <div class="add-user radius-shadow">
    <div class="tip flex-align">
      <span class="icon"></span>
      <span>{{tipText}}</span>
    </div>
    <el-form ref="userForm" :rules="rules" :model="userForm" label-position="right" label-width="120px" >
      <el-form-item label="用户名" prop="login_id">
        <el-input v-model="userForm.login_id"></el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="userForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="userForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="re_password">
        <el-input v-model="userForm.re_password" type="password"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="userForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="Email" prop="mail">
        <el-input v-model="userForm.mail"></el-input>
      </el-form-item>
      <el-form-item label="所在部门" prop="departmentName">
        <el-input v-model="userForm.departmentName" @focus="onShowModal"></el-input>
      </el-form-item>
      <el-form-item label="用户身份" prop="rid">
        <el-select v-model="userForm.rid">
          <el-option v-for="item in roleList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('userForm')">确定</el-button>
        <el-button @click="goBack" class="go-back">返回</el-button>
      </el-form-item>
    </el-form>
    <TreeModal :tree-modal-config="treeModalConfig"></TreeModal>
  </div>
</template>

<script>
  import CommonApi from '../../../service/api/commonApi'
  import TreeModal from '../../../components/treeModal/index'
  export default {
    name: 'AddUser',
    components: {
      TreeModal
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
        roleList:[],
        showDialog:false,
        departmentList:[],
        treeModalConfig:{
          treeList:[],
          treeConfig:{
            defaultExpandedkeys:[],
          },
          showModal:false,
          onClickSureBtnCallback:this.onClickModalSureBtn,
          onClickCancelBtnCallback:this.onClickModalCancelBtn
        }
      }
    },
    computed:{
      tipText(){
        return this.curUserId?'编辑用户':'添加用户'
      },
      curUserId(){
        return this.$route.query.curUserId
      }
    },
    watch:{
    },
    methods: {
      async getItemUser(){
        let res =await CommonApi.getItemUser({
          id:this.curUserId
        })
        this.userForm={
          id:this.curUserId,
          login_id:res.login_id,
          name:res.name,
          password:res.password,
          re_password:res.password,
          mail:res.mail,
          phone:res.phone,
          department:res.department,
          departmentName:res.deptName?null:res.department,
          rid:res.rlist[0].id,
        }
      },
      async getRoleList(){
        let res  = await CommonApi.getRoleList()
        this.roleList=res.rows
        this.userForm.rid=res.rows[0] && res.rows[0].id
      },
       submitForm(formName){
          this.$refs[formName].validate((valid) => {
           if (valid) {
             this.addUser()
           } else {
             console.log('error submit!!');
             return false;
           }
         });
      },
      async addUser(){
        let res
        if(this.curUserId){
           res = await CommonApi.editUser(this.userForm)
        }else{
           res = await CommonApi.addUser(this.userForm)
        }
          this.$message({
            type: 'success',
            message: this.curUserId?'修改成功！':'添加成功！',
            duration:1000
          });
          if(res){
            this.$router.push('./userManage')
          }
      },
      goBack(){
        history.go(-1)
      },
      async getDepartmentList(){
        this.treeModalConfig.treeList = await CommonApi.getDeptTree()
        this.userForm.departmentName= this.treeModalConfig.treeList[0].text
        this.treeModalConfig.treeConfig.defaultExpandedkeys=[this.treeModalConfig.treeList[0].id]
      },
      onShowModal(){
        this.treeModalConfig.showModal=true
      },
      onClickModalSureBtn(val){
        this.userForm.department=val.id
        this.userForm.departmentName=val.text
        this.treeModalConfig.showModal=false
      },
      onClickModalCancelBtn(){
        this.treeModalConfig.showModal=false
      }
    },
    mounted(){
       this.getRoleList()
       this.getDepartmentList()
       if(this.curUserId){
        this.getItemUser()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .add-user{
    padding:10px;
    background: @white;
    .el-form{
      width:50%;
      margin:30px auto;
    }
    .el-input{
      width:60%;
    }
    .go-back{
    }
    .el-input{
      width:280px;
    }
  }
</style>
