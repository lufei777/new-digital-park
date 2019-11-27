<template>
  <div class="hello">
    <router-view></router-view>
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
</style>
