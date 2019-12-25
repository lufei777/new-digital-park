<template>
  <div class="type-compare">
    <EnergyCommon :is-zoom-multiple="false" :isEnergyByGroup="true" :from-flag="3"/>
  </div>
</template>

<script>
  import EnergyCommon from '../coms/energyCommon'
  export default {
    name:'TypeCompare',
    components: {
      EnergyCommon
    },
    data () {
      return {}
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
  .type-compare {
  }
</style>
