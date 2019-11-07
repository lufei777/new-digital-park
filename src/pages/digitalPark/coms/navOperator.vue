<template>
  <div class="digital-nav-operator flex-align">
      <span class="nav-right-item long-text" v-if="showGoback" @click="onClickGoBack">
        <span style="color:#416EFF">
          <i class="iconfont iconshouye"></i>返回园区首页</span>
          <i>|</i>
      </span>
      <span class="nav-right-item"><span>{{$t('homeHeader.news')}}</span><i>|</i></span>
      <span class="nav-right-item" :class="moduleType==1?'dashboard-nav':''">
          <el-select v-model="langValue" placeholder="切换语言" @change="onClickChangeLang">
              <el-option label="中文" value="zh"></el-option>
              <el-option label="English" value="en"></el-option>
           </el-select><i>|</i>
      </span>
      <span class="nav-right-item" :class="moduleType==1?'dashboard-nav':''" v-if="!showGoback">
         <el-select v-model="myModuleType" placeholder="切换模式" @change="onClickChangeModel">
            <el-option :label="$t('homeHeader.waterfall')" value="2"></el-option>
            <el-option :label="$t('homeHeader.dashboard')" value="1"></el-option>
         </el-select><i>|</i>
      </span>
     <span class="nav-right-item" :class="moduleType==1?'dashboard-nav':''">
         <el-select v-model="setupValue" placeholder="设置" @change="onClickSetup">
             <el-option :label="$t('homeHeader.setup')" value="0" hidden></el-option>
             <el-option :label="$t('homeHeader.moduleConfig')" value="1"></el-option>
            <el-option  :label="$t('homeHeader.skin')" value="2"></el-option>
         </el-select><i>|</i>
     </span>
     <span class="nav-right-item" :class="moduleType==1?'dashboard-nav':''">
          <el-select v-model="userValue" placeholder="admin" @change="onClickUserConfigure">
              <el-option label="admin" value="0" hidden></el-option>
              <el-option :label="$t('homeHeader.personalCenter')" value="1"></el-option>
              <el-option :label="$t('homeHeader.changePassword')" value="2"></el-option>
              <el-option :label="$t('homeHeader.signOut')" value="3"></el-option>
           </el-select>
      </span>
  </div>
</template>

<script>
  import DigitalParkApi from '../../../service/api/digitalParkApi'
  export default {
    name: 'DigitalNavOperator',
    components: {
    },
    props:['moduleType','showGoback'],
    data () {
      return {
        langValue:Cookies.get('lang'),
        userValue:'0',
        setupValue:'0'
      }
    },
    computed:{
      myModuleType:{
        set(){
          this.onClickChangeModel()
        },
        get(){
          return this.moduleType
        }
      }
    },
    methods: {
      onClickChangeModel(val){
        // this.$parent.changeModel(val)
        if(val==1){
          this.$router.replace('/digitalPark/dashboardHomePage')
        }else{
          this.$router.replace('/digitalPark/homePage')
        }
      },
      onClickChangeLang(val){
        this.$i18n.locale = val
        Cookies.set('lang',val)
        this.$parent.handleLangChange && this.$parent.handleLangChange()
      },
      async onClickUserConfigure(val){
        if(val==3){
          sessionStorage.removeItem('token')
          window.location.href='/digitalPark/homePage'
          await DigitalParkApi.logOut()
        }
      },
      onClickSetup(val){
        if(val==1){
          this.$router.push(`/digitalPark/moduleConfigure?type=${this.moduleType}&updateDragFlag=true`)
        }
      },
      onClickGoBack(){
        location.href='/#/digitalPark/homePage'
      }
    },
    mounted(){
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .digital-nav-operator{
    font-size: 16px;
    .nav-right-item{
      span{
        width:90px;
        display: inline-block;
        text-align: center;
        &:hover{
          cursor: pointer;
        }
      }
      .el-input__inner{
        border:none;
        // padding-right: 5px;
        background: none;
        text-align: center;
        font-size: 16px;
      }
      .el-input__suffix,.el-input__suffix-inner{
        padding: 0;
      }
      .el-select{
        width:120px;
      }
      .el-input__suffix{
         right:-15px;
      }
    }
    .dashboard-nav{
     .el-input__inner{
        color:@white;
      }
    }
    .long-text span{
      width:120px;
    }
  }
</style>
