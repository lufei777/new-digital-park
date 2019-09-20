<template>
  <div class="asset-type">
    <div class="flex-row-reverse operator-box">
      <el-button type="primary"  @click="showDeleteTip">批量删除</el-button>
      <el-button type="primary"  @click="onClickAddBtn">新建</el-button>
    </div>
    <addAssetType :showAdd="showAdd" :isEdit="isEdit" :editId="curTypeId"/>
    <CommonTable :tableObj="assetTypeData" :curPage="1" />
  </div>
</template>

<script>
  import AddAssetType from '../coms/addAssetType'
  import CommonTable from '../../../components/commonTable/index'
  import CommonApi from '../../../service/api/commonApi'
  import CommonFun from '../../../utils/commonFun'
  export default {
    name: 'AssetType',
    components: {
      AddAssetType,
      CommonTable
    },
    data () {
      return {
        showAdd:false,
        isEdit:false,
        assetTypeData:{},
        curPage:1,
        curTypeId:''
      }
    },
    methods:{
      onClickAddBtn(){
        this.showAdd=true
        this.isEdit=false
      },
      async getAssetTypeList(){
        let res = await CommonApi.getAssetTypeList({
          pageNum:this.curPage,
          size:10
        })
        res.labelList=[{name:'',prop:'',type:'selection'},
          {name:'名称',prop:'name'},
          {name:'描述',prop:'description'},
          {name:'类型编码',prop:'code'}]
        res.dataList = res.list
        res.showOpertor=true
        this.assetTypeData=res
      },
      deleteRow(row){
        this.curTypeId=row.id
        this.showDeleteTip()
      },
      editRow(row){
        this.curTypeId=row.id
        this.isEdit=true
        this.showAdd=true
      },
      showDeleteTip(){
        CommonFun.deleteTip(this,this.curTypeId,'请至少选择一个资产类型！',this.sureDelete)
      },
      async sureDelete(){
        await CommonApi.deleteAssetType({
           assetTypeId:this.curTypeId
       })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getAssetTypeList()
      },
      handleSelectionChange(val){
        let tmp=val.map((item)=>item.id)
        this.curTypeId=tmp.join(",")
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
    .operator-box{
      padding:20px;
      .el-button{
        margin:0 10px;
      }
    }
  }
</style>
