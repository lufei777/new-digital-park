<template>
  <div class="digital-nav-operator flex-align">
      <span class="nav-right-item"><span>消息(1)</span><i>|</i></span>
      <span class="nav-right-item"><span>EN</span><i>|</i></span>
      <span class="nav-right-item"><span>换肤</span><i>|</i></span>
      <span class="nav-right-item"><span>admin</span><i>|</i></span>
      <span class="nav-right-item">
         <el-select v-model="modelValue" placeholder="切换模式" @change="onClickChangeModel">
            <el-option label="瀑布流" value="1"></el-option>
            <el-option label="仪表盘" value="2"></el-option>
         </el-select>
      </span>
  </div>
</template>

<script>
  export default {
    name: 'DigitalNavOperator',
    components: {
    },
    data () {
      return {
        modelValue:'1'
      }
    },
    methods: {
      onClickChangeModel(val){
        if(val==1){
          this.$router.replace('/digitalPark/homePage')
        }else{
          this.$router.replace('/digitalPark/dashboardHomePage')
        }
      },
    },
    mounted(){
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .digital-nav-operator{
    .nav-right-item{
      span{
        padding: 0 20px;
        &:hover{
          cursor: pointer;
        }
      }
      .el-select{
        width:90px;
      }
      .el-input__inner{
        border:none;
        padding-right: 5px;
        /*width:85px;*/
      }
      .el-input__suffix,.el-input__suffix-inner{
        padding: 0;
      }
    }
  }
</style>
