<template>
  <div class="hello flex-column">
    <!--<img src="../../../static/image/digitalPark/login_bg.png" alt="">-->
    <!--<el-button type="primary" @click="onClickBtn">change</el-button>-->
    <div class="div1"></div>
    <div class="div2"></div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'HelloWorld',
    components: {
    },
    data () {
      return {
        msg: 'Welcome to my basic vue demo'
      }
    },
    computed:{
      ...mapState({
        articleNew:state=>state.test.articleNew
      })
    },
    watch:{
      articleNew(){
        if(this.articleNew){
          console.log('lalalala')
        }
      }
    },
    methods: {
      onClickBtn(){
        this.$store.commit('test/articleNew',true)
      }
    },
    mounted(){
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .hello{
    height:100%;
    .div1{
       height:50px;
       background: yellow;
    }
    .div2{
       flex-grow: 1;
       background: pink;
    }
  }
</style>
