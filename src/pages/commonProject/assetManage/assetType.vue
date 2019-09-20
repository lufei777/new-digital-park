<template>
  <div class="asset-type">
    <el-button type="primary"  @click="onClickAddBtn">新建</el-button>
    <!--<addAssetType :showAdd="showAdd" :isEdit="isEdit"/>-->
  </div>
</template>

<script>
  import AddAssetGroup from '../coms/addAssetType'
  import CommonApi from '../../../service/api/commonApi'
  export default {
    name: 'AssetType',
    components: {
      AddAssetGroup
    },
    data () {
      return {
        showAdd:false,
        isEdit:false,
        assetTypeData:{}
      }
    },
    methods:{
      onClickAddBtn(){
        this.showAdd=true
        this.isEdit=false
      },
      async getAssetTypeList(){
        let res = await CommonApi.getAssetTypeList()
        res.labelList=[{name:'名称',prop:'name'},
          {name:'描述',prop:'remark'},
          {name:'类型编码',prop:'id'}]

      }
    },
    mounted(){
       this.getAssetTypeList()
    }
  }
</script>

<style lang="less">
  .asset-type{
    height: 100%;
  }
</style>
