<template>
  <div class="time-energy">
    <EnergyCommon :from-flag="3" />
  </div>
</template>

<script>
  import EnergyCommon from '../../energy/energyCompare/energyCommon'
  export default {
    name: 'TimeEnergy',
    components: {
      EnergyCommon
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
