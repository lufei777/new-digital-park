<template>
  <div class="tbhb-analysis">
    <EnergyCommon  :is-zoom-multiple="false" :from-flag="2"/>
  </div>

</template>

<script>
  import EnergyCommon from '../coms/energyCommon'
  export default {
    name:'TbhbAnalysis',
    components: {
      EnergyCommon
    },
    data () {
      return {
      }
    },
    computed: {
    },
    methods: {
    },
    async mounted(){
    }
  }
</script>

<style lang="less">
  .tbhb-analysis{
  }
</style>
