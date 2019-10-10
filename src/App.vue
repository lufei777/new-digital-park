<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
    }
  },
  watch:{
    $route(to, from) {
      this.$store.dispatch('conditionSelect/resetStates')  //重置vuex
      this.$store.dispatch('analysis/resetStates')  //重置vuex
    },
  },

  created(){

  },
}
</script>
<style lang="less">
@import url('./less/index.less');
#app {
  font-family: 'MicrosoftYaHei', Helvetica, Arial, sans-serif;
  color: #606266;
  height:100%;
}
</style>
