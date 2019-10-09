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
  },
  methods:{
  }
}
</script>
<style lang="less">
@import url('./less/index.less');
#app {
  font-family: 'MicrosoftYaHei', Helvetica, Arial, sans-serif;
  color: #606266;
}
</style>
