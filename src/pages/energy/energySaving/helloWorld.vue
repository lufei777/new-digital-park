<template>
  <div class="elec-analysis">
    <!-- 开发中.... -->
    <img  src="../../../../static/image/digitalPark/default_page.png" alt="">
  </div>
</template>

<script>
  export default {
    name: 'ElecAnalysis',
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
         $("img").css({
           height:$('#app').height()-110+'px'
         })
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .elec-analysis{
     width:100%;
     height:100%;
     overflow: hidden;
    img{
      width:100%;
      display: block;
    }
  }
</style>
