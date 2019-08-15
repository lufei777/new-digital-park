<template>
  <div class="energy-index">
    <NavList />
    <keep-alive>
       <router-view></router-view>
    </keep-alive>
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
