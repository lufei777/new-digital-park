<template>
  <div class="module-tip-com flex-align">
    <div class="icon"></div>
    <div class="text">{{text}}</div>
  </div>
</template>

<script>
  export default {
    name: 'ModuleTip',
    props:['text'],
    components: {
    },
    data () {
      return {
      }
    },
    methods: {
    },
    mounted(){
    }
  }
</script>
<style lang="less">
  .module-tip-com{
    padding:20px 0;
    .icon{
      height:16px;
      border-left:4px solid @mainBgColor;
      margin-right: 10px;
      border-radius: 2px;
    }
    .text{
      color:@mainBgColor;
    }
  }
</style>
