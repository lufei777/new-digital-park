<template>
  <div class="asset-type">
    <el-button type="primary"  @click="onClickAddBtn">新建</el-button>
    <addAssetType :showAdd="showAdd" :isEdit="isEdit"/>
  </div>
</template>

<script>
  import AddAssetGroup from '../coms/addAssetType'
  export default {
    name: 'AssetType',
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
  .asset-type{
    height: 100%;
  }
</style>
