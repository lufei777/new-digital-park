<template>
  <div class="asset-type">
    <div class="left-type-tree">
      <!--<div class="type-title">资产类型</div>-->
      <CustomTree :treeList="typeTree" :addNodeCallback="addNode"
                  :delNodeCallback="deleteAssetType"
                  :editCallback="editAssetType"
                  :clickNodeCallback="onClickNode"
      />
    </div>
    <div class="right-content">
      <div class="flex-align-between type-operator-box">
        <span class="attr-table-tip">属性列表</span>
        <div>
          <el-button type="primary">批量删除</el-button>
          <el-button type="primary">新建</el-button>
        </div>
      </div>
      <CommonTable :table-obj="attrTableData" :cur-page="1"/>
    </div>
  </div>
</template>

<script>
  import AddAssetType from '../coms/addAssetType'
  import CommonTable from '../../../components/commonTable/index'
  import AssetManageApi from '../../../service/api/assetManageApi'
  import CommonFun from '../../../utils/commonFun'
  import CustomTree from '../../../components/customTree/slotTree'
  export default {
    name: 'AssetType',
    components: {
      AddAssetType,
      CommonTable,
      CustomTree
    },
    data () {
      return {
        showAdd:false,
        isEdit:false,
        // curPage:1,
        curTypeId:'',
        typeTree:[],
        treeProps:{
          label:'name',
          children: 'childNode',
        },
        attrTableData:{}
      }
    },
    methods:{
      onClickAddBtn(){
        this.showAdd=true
        this.isEdit=false
      },
      async getAssetTypeList(){
        let res = await AssetManageApi.getAssetTypeTree()
        this.typeTree=res
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
        await AssetManageApi.deleteAssetType({
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
      },
      addNode(id,obj){
        if(!id){ //默认传空即添加根节点
          this.typeTree.push(obj)
          this.addAssetType(obj)
        }else{
          this.findNode(this.typeTree,id,obj)
        }

      },
      findNode(tree,id,obj){
        tree.map((item)=>{
          if(item.id==id){
             item.childNode.push(obj)
             this.addAssetType(obj)
             return;
          }else if(item.childNode.length){
            this.findNode(item.childNode,id,obj)
          }
        })
      },
      async addAssetType(obj){
        await AssetManageApi.addAssetType(obj)
        // this.getAssetTypeList()
      },
      async deleteAssetType(data){
        await AssetManageApi.deleteAssetType({
          ids:data.id
        })
        this.$message.success("删除成功！")
        // this.getAssetTypeList()
      },
      async editAssetType(data){
         await AssetManageApi.editAssetType(data)
      },
      async onClickNode(val){
          let res = await AssetManageApi.getAttributeByType({
            typeId:val.id
          })
          //后台没有做分页
         res.map((item)=>{
           item.requiredText=item.required?'是':'否'
         })
         let obj={}
         obj.labelList=[{name:'',prop:'',type:'selection'},
           {name:'属性名',prop:'attrName'},
           {name:'描述',prop:'description'},
           {name:'是否必填',prop:'requiredText'}]
         obj.dataList=res
         obj.showOpertor=true
         this.attrTableData=obj
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
    .left-type-tree{
      float: left;
      width:25%;
      color:@white;
      background: #3a8ee6;
    }
    .right-content{
      float: right;
      width: 75%;
      padding:0 20px;
      box-sizing: border-box;
    }
    .type-operator-box{
      padding-bottom:20px;
    }
    .attr-table-tip{
      font-weight: bold;
    }
    .custom-tree{
      .el-tree{
        background:#3a8ee6;
        font-size: 14px;
        color:@white;
        padding-bottom: 20px;
      }
      .el-tree-node__content{
        padding:12px 0;
      }
      .el-tree-node__content:hover{
        color:@white;
        background: #3a8ee6;
      }
      .el-tree-node:focus>.el-tree-node__content{
        color:#3a8ee6;
        background: @white;
      }
    }
  }
</style>
