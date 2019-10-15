<template>
  <div class="item-product-coms">
    <span>{{moduleData.menuName}}</span>
     <component  :is="moduleData.moduleList[0].componentName"/>
  </div>
</template>

<script>
  import energyProportionAnalysis from './energyProportionAnalysis'
  export default {
    name: 'ItemProModule',
    props:['moduleData'],
    components: {
      energyProportionAnalysis
    },
    data () {
      return {
      }
    },
    methods: {

    },
    mounted(){
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .item-product-coms{
     /*padding:10px;*/
  }
</style>
