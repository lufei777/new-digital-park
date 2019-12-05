<template>
  <div class="hello">
    <!--<img src="../../../static/image/digitalPark/login_bg.png" alt="">-->
    <el-button type="primary" @click="onClickBtn">change</el-button>
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
    img{
      width:100%;
      height:100%;
    }

  }
</style>
