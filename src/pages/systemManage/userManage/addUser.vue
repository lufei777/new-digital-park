<template>
  <div class="add-user radius-shadow panel-container">
    <div class="tip flex-align">
      <span class="icon left-tip-text-icon"></span>
      <span>{{tipText}}</span>
    </div>
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
  import SystemManageApi from '@/service/api/systemManage'
  import {mapState} from 'vuex'
  export default {
    name: 'AddUser',
    components: {
    },
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
        if(!reg.test(value)&& value.trim()!=''){
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
                validator: checkMail,
                trigger: 'blur'
              }
            },
            {
              type: "input",
              label: "手机号",
              prop: "phone",
              span: 24,
              rules: {
                validator: checkPhone,
                trigger: 'blur'
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
              focus:that.onRoleFocus,
              span: 24,
            },
          ]
        },
      }
    },
    computed:{
      tipText(){
        return this.userId?'编辑用户':'添加用户'
      },
      userId(){
        return this.$route.query.userId
      },
      api(){
        return this.userId?'updateUser':'addUser'
      },
      assign(){
        return this.$route.query.assign
      },
      ...mapState({
        userInfo: state => state.user.userInfo
      }),
    },
    watch:{
    },
    methods: {
      async getUserDetail(){
        let res =await SystemManageApi.getUserDetail({
          userId:this.userId
        })
        let tmp = (res.rlist|| []).map((item)=>item.name)
        res.roleList = tmp.join(",")
        res.role  = (res.rlist || []).map((item)=>item.id)
        this.formModel = res
      },
      async getRoleList(){
        let res = await SystemManageApi.getRoleList({
          userId: this.userInfo.id
        })
        this.$refs[this.formConfig.ref].setColumnByProp("role", {
          dicData:res.list,
          defaultCheckedKeys:this.formModel.role
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
        params.roleIds = this.formModel.role.join(",")
        await SystemManageApi[this.api](params)
          .then(res => {
            this.$message({
              type: "success",
              message: res
            });
            this.$router.push('./userManage')
          })
          .finally(msg => {
            hide();
          });

        // console.log(this.formModel.role)
        // await SystemManageApi.assignRole({
        //   userId:this.userId,
        //   roleIds:this.formModel.role.join(",")
        // })
      },
      goBack(){
        history.go(-1)
      },
      setColumn(){
        if(this.userId && !this.assign) {
          this.$refs[this.formConfig.ref].setColumnByProp("roleList", {
            hide: true
          });
          this.$refs[this.formConfig.ref].setColumnByProp("role", {
            hide: true
          });
        }else if(this.userId && this.assign){
           this.formConfig.forms = [ {
             type: "input",
             label: "姓名",
             prop: "name",
             span: 24,
             disabled:true
           },{
             type: "textarea",
             label: "已分配角色",
             prop: "roleList",
             span: 24,
             disabled:true
           },{
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
             focus:this.onRoleFocus,
             span: 24,
           }]
        }
      },
      onRoleFocus(){
        this.$refs[this.formConfig.ref].setColumnByProp("role", {
          defaultCheckedKeys:this.formModel.role
        });
      }
    },
    mounted(){
       if(!this.assign){
         this.getDepartmentList()
       }
       if(this.userId){
        this.getUserDetail()
       }
       if(!this.userId || this.assign){
         this.getRoleList()
       }
       this.setColumn()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .add-user{
    padding:20px;
    box-sizing: border-box;
    .form-box{
      width:40%;
      margin:0 auto;
    }
  }
</style>
