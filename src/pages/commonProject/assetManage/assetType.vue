<template>
  <div class="asset-type">
    <div class="left-type-tree">
      <!--<div class="type-title">资产类型</div>-->
      <CustomTree :treeList="typeTree" :addNodeCallback="addNode"
                  :delNodeCallback="deleteAssetType"
                  :editCallback="editAssetType"
                  :clickNodeCallback="clickNode"
                  :defaultExpandedKey="defaultExpandedKey"
      />
    </div>
    <div class="right-content">
      <div class="flex-align-between type-operator-box">
        <span class="attr-table-tip">属性列表</span>
        <div>
          <el-button type="primary" @click="onAddTypeAttr">新建</el-button>
          <el-button type="primary" @click="showDeleteTip">批量删除</el-button>
        </div>
      </div>
      <CommonTable :table-obj="attrTableData" :cur-page="1"/>
    </div>
    <AddAssetTypeAttr :showAdd="showAdd" :is-edit="isEdit" :curType="curType" :curAttr="curAttr"/>
  </div>
</template>

<script>
  import AddAssetTypeAttr from '../coms/addAssetTypeAttr'
  import CommonTable from '../../../components/commonTable/index'
  import AssetManageApi from '../../../service/api/assetManageApi'
  import CommonFun from '../../../utils/commonFun'
  import CustomTree from '../../../components/customTree/slotTree'
  export default {
    name: 'AssetType',
    components: {
      AddAssetTypeAttr,
      CommonTable,
      CustomTree
    },
    data () {
      return {
        showAdd:false,
        isEdit:false,
        // curPage:1,
        curType:'',
        typeTree:[],
        treeProps:{
          label:'name',
          children: 'childNode',
        },
        attrTableData:{},
        curAttr:'',
        defaultExpandedKey:[],
        delAttrIds:''
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
        this.defaultExpandedKey=[res[0].id]
        this.curType=res[0]
        this.getAttributeByType()
      },
      deleteRow(row){
        this.delAttrIds=row.id
        this.showDeleteTip()
      },
      editRow(row){
        this.curAttr=row
        this.isEdit=true
        this.showAdd=true
      },
      showDeleteTip(){
        CommonFun.deleteTip(this,this.delAttrIds,'请至少选择一个资产类型属性！',this.sureDelete)
      },
      async sureDelete(){
        await AssetManageApi.delAssetTypeAttr({
           ids:this.delAttrIds
       })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        this.getAttributeByType()
      },
      handleSelectionChange(val){
        let tmp=val.map((item)=>item.id)
        this.delAttrIds=tmp.join(",")
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
      },
      async deleteAssetType(data){
        await AssetManageApi.deleteAssetType({
          ids:data.id
        })
        this.$message.success("删除成功！")
      },
      async editAssetType(data){
         await AssetManageApi.editAssetType(data)
      },
      clickNode(val){
        this.curType=val
        this.getAttributeByType()
      },
      async getAttributeByType(){
          let res = await AssetManageApi.getAttributeByType({
            typeId:this.curType.id
          })
          //后台没有做分页
         res.map((item)=>{
           item.requiredText=item.required=='1'?'是':'否'
         })
         let obj={}
         obj.labelList=[{name:'',prop:'',type:'selection'},
           {name:'属性名',prop:'attrName'},
           {name:'描述',prop:'description'},
           {name:'是否必填',prop:'requiredText'}]
         obj.dataList=res
         obj.showOperator=true
         this.attrTableData=obj
      },
      onAddTypeAttr(){
        this.isEdit=false
        this.showAdd=true
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
