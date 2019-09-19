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
  created(){
    this.$store.dispatch('analysis/setDefaultNode')
  },
  methods:{
  }
}
</script>
<style lang="less">
@import url('./less/index.less');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #606266;
}
</style>
