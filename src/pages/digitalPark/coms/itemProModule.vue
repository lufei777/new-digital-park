<template>
  <div class="item-product-coms">
    <span>{{moduleData.menuName}}</span>

  </div>
</template>

<script>
  export default {
    name: 'ItemProModule',
    props:['moduleData'],
    components: {
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

  }
</style>
