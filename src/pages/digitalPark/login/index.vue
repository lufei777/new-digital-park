<template>
  <div class="digital-park-login" @click="showErrTip=false" :style="getBg">
    <img src="../../../../static/image/digitalPark/logo.png" class="logo-img" v-if="!isLargeScreen" />
    <div class="login-box flex-column flex-align" v-loading="loading">
      <span class="login-title">{{title}}</span>
      <div class="flex-item flex-align border-basic name-box">
        <i class="iconfont iconzhanghao login-icon name-icon"></i>
        <el-input
          v-model="name"
          placeholder="请输入账号/用户名"
          @focus="onInputChange(1,'focus')"
          @blur="onInputChange(1,'blur')"
        ></el-input>
      </div>
      <div class="flex-item flex-align border-basic pwd-box">
        <i class="iconfont iconmima login-icon pwd-icon"></i>
        <el-input
          v-model="pwd"
          type="password"
          placeholder="请输入密码"
          @focus="onInputChange(2,'focus')"
          @blur="onInputChange(2,'blur')"
          @keyup.enter.native="onClickLoginBtn"
        ></el-input>
      </div>
      <!--<div class="flex-item">-->
      <!--<el-checkbox v-model="checked">自动登录</el-checkbox>-->
      <!--</div>-->
      <el-button
        class="flex-item"
        :style="{ height:'60px','fontSize':'22px' }"
        type="primary"
        @click="onClickLoginBtn"
      >登录</el-button>

      <!-- <div class="flex-item login-btn" @click="onClickLoginBtn">登录</div> -->
      <div v-show="showErrTip" class="flex-item error-box">
        <span>{{errTip}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { setToken, setIsCZClient } from '@/utils/auth';
import { getProjectTitle, getLargeScreenName, isNorbulingkaScreen } from '@/utils/project';
import { Title } from '@/utils/dictionary'
import { flatMenus, formatRoutes } from 'utils/util';

export default {
  name: 'DigitalParkLogin',
  components: {
  },
  data() {
    return {
      name: Cookies.get('username') || '',
      pwd: '',
      errTip: '',
      showErrTip: false,
      loading: false,
      checked: ''
    }
  },
  computed: {
    projectName() {
      return window.__CZ_SYSTEM;
    },
    title() {
      return getLargeScreenName() != '' ? Title[getLargeScreenName()] :
        (getProjectTitle() || '数字园区综合管理平台');
    },
    isLargeScreen() {
      return getLargeScreenName() != ''
    },
    getBg() {
      return isNorbulingkaScreen() ?
        { 'background-image': 'url("../../../../static/image/digitalPark/nor_login_bg.png")' } :
        { 'background-image': 'url("../../../../static/image/digitalPark/login_bg.png")' }
    }
  },
  methods: {
    onInputChange(flag, evt) {
      let divEle = "", iconEle
      if (flag == 1) {
        divEle = ".name-box"
        iconEle = ".name-icon"
      } else if (flag == 2) {
        divEle = ".pwd-box"
        iconEle = ".pwd-icon"
      }
      if (evt == 'focus') {
        $(divEle).addClass('border-css')
        $(iconEle).css({ color: '#008DEA' })
      } else {
        $(divEle).removeClass('border-css')
        $(iconEle).css({ color: '#333' })
      }
    },
    async onClickLoginBtn() {
      this.loading = true
      let params = {
        username: this.name.trim(),
        password: this.pwd.trim()
      }
      this.$store.dispatch('user/login', params).then(res => {
        Cookies.set('username', this.name)
        Cookies.set('moduleType', 2)
        this.loginSuccessCb();
      }).catch(err => {
        this.errTip = '用户名或密码错误'
        this.showErrTip = true
        setTimeout(() => {
          this.showErrTip = false
        }, 2000)

        this.loading = false;

        console.error(err);
      })
    },
    loginSuccessCb() {
      // 判断大屏
      if (this.isLargeScreen) {
        this.$router.push("/largeSizeScreen")
      } else {
        this.$router.push("/digitalPark/homePage")
      }
      
      // 获取用户信息
      this.$store.dispatch('user/getUserInfo')

      // 获取菜单并规划菜单
      this.$store.dispatch('digitalPark/getMenus').then(res => {
        // 活后台返回菜单拍平path
        let flat = flatMenus(res[0]);
        // 将私有路由进行拆分 验证
        let routes = formatRoutes(flat.flatmenupaths, this.$store.getters.privateRouters);
        // 添加进当前路由中
        this.$router.$addRoutes(routes);
      })
    }
  },
  mounted() {
    window.CZClient = {
      setToken: (token, isCZClient = true) => {
        setToken(token);
        this.loginSuccessCb();
      }
    }
  }
}
</script>

<style lang="less">
.digital-park-login {
  width: 100%;
  height: 100%;
  /*background-image: url("../../../../static/image/digitalPark/login_bg.png");*/
  /*background-image: url("../../../../static/image/digitalPark/nor_login_bg.png");*/
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow: hidden;
  .logo-img {
    display: block;
    margin: 20px 0 0 70px;
    float: left;
  }
  .login-box {
    width: 600px;
    height: 780px;
    background: @white;
    box-shadow: 0 3px 49px 0 rgba(0, 0, 0, 0.36);
    float: right;
    margin: 90px 130px 0 0;
    position: relative;
  }
  .flex-item {
    width: 80%;
    margin: 40px auto;
  }
  .el-input__inner {
    border: none;
  }
  .login-icon {
    display: block;
    color: #333;
  }
  .name-box,
  .pwd-box {
    border-bottom: 1px solid #333;
    box-sizing: border-box;
  }
  .border-css {
    border-bottom: 2px solid @mainBgColor;
  }
  .login-btn {
    background: @mainBgColor;
    color: @white;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 24px;
    border-radius: 4px;
  }
  .login-title {
    font-size: 34px;
    color: @mainBgColor;
    margin: 100px 0 70px 0;
  }
  .config-entry {
    font-size: 18px;
    text-align: right;
    padding: 0 10px;
    box-sizing: border-box;
  }
  .el-radio,
  .el-radio__label {
    font-size: 16px;
  }
  .radio-box {
    padding: 0 5px;
    box-sizing: border-box;
  }
  .error-box {
    padding: 20px;
    background: rgba(102, 102, 102, 1);
    box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    color: @white;
    position: absolute;
    top: 40%;
    text-align: center;
  }
  input:-webkit-autofill {
    transition: background-color 50000s ease-in-out 0s; //背景色透明  生效时长  过渡效果  启用时延迟的时间
  }
  input {
    background-color: transparent;
  }
}
</style>
