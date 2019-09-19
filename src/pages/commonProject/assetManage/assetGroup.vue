<template>
  <div class="asset-group">
    <el-button type="primary"  @click="onClickAddBtn">新建</el-button>
    <AddAssetGroup :showAdd="showAdd" :isEdit="isEdit"/>
  </div>
</template>

<script>
  import AddAssetGroup from '../coms/addAssetGroup'
  export default {
    name: 'AssetGroup',
    components: {
      AddAssetGroup
    },
    data () {
      return {
        showAdd:false,
        isEdit:false
      }
    },
    methods:{
      onClickAddBtn(){
        this.showAdd=true
        this.isEdit=false
      }
    },
    mounted(){

    }
  }
</script>

<style lang="less">
  .asset-group{
    height: 100%;
  }
</style>
