<template>
  <div class="zoom-compare">
     <EnergyCommon :isZoomMultiple="true" :fromFlag="1"/>
  </div>
</template>

<script>
  import EnergyCommon from './energyCommon'
  export default {
    name:'ZoomCompare',
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
 .zoom-compare {
   width: 100%;
 }
</style>
