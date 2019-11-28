<template>
  <div class="hello">
    <img src="../../../static/image/digitalPark/login_bg.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    components: {
    },
    data () {
      return {
        msg: 'Welcome to my basic vue demo'
      }
    },
    methods: {
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
