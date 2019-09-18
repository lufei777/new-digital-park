<template>
  <div class="energy-index">
    <Theme />
    <NavList />
    <router-view></router-view>
  </div>
</template>

<script>
  import NavList from '../../components/navList'
  import Theme from '../../components/theme'
  export default {
    name: 'EnergyIndex',
    components: {
      NavList,
      Theme
    },
    data () {
      return {
      }
    },
    methods: {
    },
    mounted(){
      document.title='能源管理'
    }
  }
</script>

<style lang="less">
  .energy-index{
    height: 100%;
  }
</style>
