<template>
  <div class="energy-index">
    <!--<Theme />-->
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
    watch:{
      $route(to, from) {
        this.$store.dispatch('conditionSelect/resetStates')  //重置vuex
        this.$store.dispatch('analysis/resetStates')  //重置vuex
      },
    },
    methods: {
    },
    created(){
      this.$store.dispatch('analysis/setDefaultNode')
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
