<template>
  <div class="login-wrapper flex-align-center" :style="{background:'url('+loginBg+')'}">
    <div class="login-inner flex">
      <img src="../../../static/image/login_info.jpg" alt="">
      <div class="login-box">
        <el-input v-model="name" placeholder="请输入用户名"></el-input>
        <el-input v-model="pwd" placeholder="请输入密码" type="password"></el-input>
        <el-button type="primary" @click="onClickLoginBtn">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import loginBg from '../../../static/image/login_bg.jpg'
  export default {
    name: 'CommonLogin',
    components: {
    },
    props:['url'],
    data () {
      return {
        name:'',
        pwd:'',
        loginBg:loginBg
      }
    },
    methods: {
      onClickLoginBtn(){
          if(this.name==""||this.pwd==""){
            this.$message({
              type: 'warning',
              message: '请将用户名或密码填写完整！',
              duration:1000
            });
            return;
          }
          axios.get(`${window.gateway}/vibe-web/login/${this.name}/${this.pwd}`).then((res)=>{
            let tmp =res.data.setCookie.split(";")[0].split("=")[1]
            Cookies.set('JSESSIONID',tmp)
            this.$router.push(this.url)
          }).catch((err)=>{
            this.$message({
              type: 'error',
              message: '用户名或密码错误！',
              duration:1000
            });
            console.log('login err',err)
          })
      }
    },
    mounted(){
    }
  }
</script>

<style lang="less">
  html,body,#app{
    height:100%;
  }
  .login-wrapper{
    width:100%;
    height:100%;
    /*background: url("../../../static/image/login_bg.jpg");*/
    .login-inner{
      width:1200px;
      align-items: center;
      background: @white;
    }
    .login-box{
      width: 100%;
      padding:0 70px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .el-input{
        padding:10px 0;
      }
    }
  }
</style>
