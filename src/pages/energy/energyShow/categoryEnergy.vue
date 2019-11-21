<template>
  <div class="category-energy">
    <EnergyCommon :from-flag="5"/>
  </div>
</template>

<script>
  import EnergyCommon from '../energyCompare/energyCommon'
  export default {
    name: 'CategoryEnergy',
    components: {
      EnergyCommon
    },
    data () {
      return {
      }
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
  .category-energy{
  }
</style>
