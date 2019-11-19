<template>
  <div class="time-energy">
    <TbhbAnalysis />
  </div>
</template>

<script>
  import TbhbAnalysis from '../energyCompare/tbhbAnalysis'
  export default {
    name: 'TimeEnergy',
    components: {
      TbhbAnalysis
    },
    data () {
      return {
      }
    },
    $route(to, from) {
      // 路由改变发起重置
      debugger
      console.log(to,from)
      this.$store.dispatch('conditionSelect/resetStates')
    },
    computed: {
    },
    methods: {
    },
    mounted(){
    },
    created(){
      this.$store.commit("conditionSelect/tbhbEnergy",[{id:44,name:'空调用电'}])
    }
  }
</script>

<style lang="less">
  .time-energy{


  }
</style>
