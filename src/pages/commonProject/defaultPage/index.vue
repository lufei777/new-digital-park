<template>
  <div class="default-page">
    <img src="../../../../static/image/digitalPark/default_page.png" alt="">
    <!--<div class="go-back hover-pointer" @click="onClickGoBack">返回园区首页</div>-->
  </div>
</template>

<script>
  export default {
    name: 'DefaultPage',
    components: {
    },
    data () {
      return {
      }
    },
    methods: {
      onClickGoBack(){
        if(Cookies.get('moduleType')==2){
          this.$router.push('/digitalPark/homePage')
          // location.href='/#/digitalPark/homePage'
        }else{
          this.$router.push('/digitalPark/dashboardHomePage')
          // location.href='/#/digitalPark/dashboardHomePage'
        }
      }
    },
    mounted(){
    }
  }
</script>

<style lang="less">
  .default-page{
    /*width:100%;*/
    /*height:100%;*/
    overflow: hidden;
    img{
      width:100%;
      height:859px;
      /*height:100%;*/
    }
    .go-back{
      position: absolute;
      top:53%;
      right:20%;
      background: #073491;
      color:@white;
      padding:10px 20px;
      border-radius: 2px;
    }
  }
</style>
