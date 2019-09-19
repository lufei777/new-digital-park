<template>
  <div class="asset-manage">
     <router-link to="/assetMaintenance">资产信息维护</router-link>
     <router-link to="/assetGroup">资产组设置</router-link>
     <router-link to="/assetType">资产类型设置</router-link>
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
