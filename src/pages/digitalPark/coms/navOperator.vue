<template>
  <div class="digital-nav-operator flex-align">
      <span class="nav-right-item"><span>{{$t('homeHeader.news')}}</span><i>|</i></span>
      <span class="nav-right-item"><span>{{$t('homeHeader.skin')}}</span><i>|</i></span>
      <!--<span class="nav-right-item"><span>admin</span><i>|</i></span>-->
      <span class="nav-right-item" :class="moduleType==1?'dashboard-nav':''">
          <el-select v-model="langValue" placeholder="切换语言" @change="onClickChangeLang">
              <el-option label="中文" value="zh-cn"></el-option>
              <el-option label="English" value="en-us"></el-option>
           </el-select>
          <i>|</i>
      </span>
      <span class="nav-right-item" :class="moduleType==1?'dashboard-nav':''">
         <el-select v-model="moduleType" placeholder="切换模式" @change="onClickChangeModel">
            <el-option label="瀑布流" value="2"></el-option>
            <el-option label="仪表盘" value="1"></el-option>
         </el-select>
          <i>|</i>
      </span>
     <span class="nav-right-item">
          <el-select v-model="userValue" placeholder="admin" @change="onClickUserConfigure">
              <el-option label="模块管理" value="1"></el-option>
              <el-option label="退出" value="2"></el-option>
           </el-select>
      </span>
  </div>
</template>

<script>
  export default {
    name: 'DigitalNavOperator',
    components: {
    },
    props:['moduleType'],
    data () {
      return {
        langValue:'zh-cn',
        userValue:''
      }
    },
    computed:{
    },
    methods: {
      onClickChangeModel(val){
        console.log(val)
        if(val==1){
          this.$router.replace('/digitalPark/dashboardHomePage')
        }else{
          this.$router.replace('/digitalPark/homePage')
        }
      },
      onClickChangeLang(val){
        this.$i18n.locale = val
      },
      onClickUserConfigure(val){
        if(val==1){
          this.$router.push('/digitalPark/moduleConfigure')
        }
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
        padding: 0 20px;
        &:hover{
          cursor: pointer;
        }
      }
      .el-input__inner{
        border:none;
        padding-right: 5px;
        background: none;
        /*color:@white;*/
        font-size: 16px;
      }
      .el-input__suffix,.el-input__suffix-inner{
        padding: 0;
      }
      .el-select{
        width:90px;
      }
    }
    .dashboard-nav{
      .el-input__inner{
        color:@white;
      }
    }
    /*.lang-box{*/
      /*.el-select{*/
        /*min-width:75px;*/
        /*max-width:85px;*/
      /*}*/
    /*}*/
    /*.model-box{*/
      /*.el-select{*/
        /*width:85px;*/
      /*}*/
    /*}*/
  }
</style>
