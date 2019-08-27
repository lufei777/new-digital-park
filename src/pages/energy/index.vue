<template>
  <div class="energy-index">
    <NavList />
    <router-view></router-view>
  </div>
</template>

<script>
  import NavList from '../../components/navList'
  export default {
    name: 'EnergyIndex',
    components: {
      NavList
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

<style lang="less">
</style>
