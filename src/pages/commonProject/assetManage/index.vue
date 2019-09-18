<template>
  <div class="asset-manage">
     <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'AssetManage',
    components: {
    },
    data () {
      return {
      }
    },
    methods:{

    },
    mounted(){
      document.title='资产管理'
    }
  }
</script>

<style lang="less">
  .asset-manage{
    height: 100%;
  }
</style>
