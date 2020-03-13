<template>
  <div class="large-size-screen">
     <Normal />
  </div>
</template>

<script>
  import Normal from './normal'
  export default {
    name: 'LargeSizeScreenNormal',
    components: {
      Normal
    },
    data () {
      return {
      }
    },
    computed:{
    },
    watch:{
    },
    methods: {
    },
    mounted(){
    }
  }
</script>

<style lang="less">
  .large-size-screen{
    height:100%;
    background-image: url('../../../static/image/digitalPark/home.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
</style>
