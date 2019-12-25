<template>
  <div class="time-energy">
    <EnergyCommon :from-flag="4" />
  </div>
</template>

<script>
  import EnergyCommon from '../coms/energyCommon'
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
    },
    computed: {
    },
    methods: {
    },
    mounted(){
    },
    created(){
    }
  }
</script>

<style lang="less">
  .time-energy{
  }
</style>
