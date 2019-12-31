<template>
  <div class="asset-type">
    <div class="left-type-tree radius-shadow fixed-tree">
      <!--<div class="type-title">资产类型</div>-->
        <CustomTree :treeList="typeTree" :addNodeCallback="addNode"
                    :delNodeCallback="deleteAssetType"
                    :editCallback="editAssetType"
                    :clickNodeCallback="clickNode"
                    :defaultExpandedKey="defaultExpandedKey"
        />
    </div>
    <div class="right-content panel-container">
      <div class="table-box radius-shadow panel">
        <div class="type-operator-box">
          <el-button type="primary" @click="onClickMultiDelBtn">批量删除</el-button>
          <el-button type="primary" @click="onAddTypeAttr">新建</el-button>
        </div>
        <Table :ref='tableConfig.ref' :table-config="tableConfig">
          <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
            <el-button type="text" @click="editRow(row)">编辑</el-button>
            <el-button type="text" @click="deleteRow(row)">删除</el-button>
          </template>
        </Table>
      </div>

    </div>
    <AddAssetTypeAttr :showAdd="showAdd" :is-edit="isEdit" :curType="curType" :curAttr="curAttr"/>
  </div>
</template>

<script>
  import AddAssetTypeAttr from '../commonProject/coms/addAssetTypeAttr'
  import Table from '../../components/Table/index'
  import AssetManageApi from '../../service/api/assetManageApi'
  import CommonFun from '../../utils/commonFun'
  import CustomTree from '../../components/customTree/slotTree'
  export default {
    name: 'AssetType',
    components: {
      AddAssetTypeAttr,
      Table,
      CustomTree
    },
    data () {
      let _this = this
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
        delAttrIds:'',
        tableConfig: {
          ref: "tableRef",
          data:[],
          columnConfig:[],
          operation:true,
          uiConfig: {
            height: "auto",//"", //高度
            selection: true, //是否多选
            pagination:{
              handler:function(size,page){
                _this.handleCurrentChange(page)
              },
              currentPage:1
            }
          },
          tableMethods: {
          },
        },
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
        console.log(row,row.id)
        this.delAttrIds=row.id
        this.showDeleteTip()
      },
      editRow(row){
        console.log(row)
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
      async addNode(id,obj){
        if(!id){ //默认传空即添加根节点
          await this.addAssetType(obj)
        }else{
          this.findNode(this.typeTree,id,obj)
        }
      },
      findNode(tree,id,obj){
         tree.map((item)=>{
          if(item.id==id){
             this.addAssetType(obj,item)
             return;
          }else if(item.childNode.length){
            this.findNode(item.childNode,id,obj)
          }
        })
      },
      async addAssetType(obj,item){
        console.log(item)
        let res = await AssetManageApi.addAssetType(obj)
        obj.id=res
        item?item.childNode.push(obj):this.typeTree.push(obj)
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
         this.tableConfig.columnConfig=[{label:'属性名',prop:'attrName'},
           {label:'描述',prop:'description'},
           {label:'是否必填',prop:'required',
             formatter:function(row,column){
               return row.required =='1'?'是':'否'
             },}]
          this.tableConfig.data=res
      },
      onAddTypeAttr(){
        this.isEdit=false
        this.showAdd=true
      },
      onClickMultiDelBtn(){
         let res =this.$refs.tableRef.getSelectedData()
         this.delAttrIds=res.map((item)=>item.id).join(",")
         this.showDeleteTip()
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
      width:@menuWidth;
      position: fixed;
      padding:20px 0;
      bottom:20px;
      top:90px;
    }
    .type-operator-box{
      display: flex;
      flex-direction: row-reverse;
      margin-bottom: 20px;
      .el-button{
        margin-left: 20px;
      }
    }
    .attr-table-tip{
      font-weight: bold;
    }
    .table-box{
      padding:20px;
    }
  }
</style>
