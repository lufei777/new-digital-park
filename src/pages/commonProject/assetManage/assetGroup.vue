<template>
  <div class="asset-group">
    <div class="left-group-tree">
      <div class="group-title">资产组</div>
      <CustomTree  :treeList="groupTree" :addNodeCallback='addNode'
                  :delNodeCallback="deleteAssetGroup"
                  :editCallback="updateAssetGroup"
                  />
    </div>
  </div>
</template>

<script>
  import AssetManageApi from '../../../service/api/assetManageApi'
  import CustomTree from '../../../components/customTree/slotTree'
  export default {
    name: 'AssetGroup',
    components: {
      CustomTree
    },
    data () {
      return {
        showAdd:false,
        isEdit:false,
        groupTree:[],
        treeProps:{
          label:'name',
          children: 'childNode',
        },
        // groupTree:[],
        groupTable:{},
        curGroupId:'',
      }
    },
    methods:{
      onClickAddBtn(){
        this.showAdd=true
        this.isEdit=false
      },
      async getAssetGroupTree(){
        let res = await AssetManageApi.getAssetGroupTree()
        this.groupTree=res
        // this.curGroupId='group-2368946ab299465099fcbf62690d5e6e' //res[0].id
        // this.selectAssetGroupById()
      },
      // async selectAssetGroupById(){
      //    await AssetManageApi.selectAssetGroupById({
      //      assetGroupId:this.curGroupId
      //    })
      // },
      addNode(id,obj) {
        if(!id){
          this.addAssetGroup(obj)
        }else{
          this.findNode(this.groupTree,id,obj)
        }
      },
      findNode(tree,id,obj){
        tree.map((item)=>{
          if(item.id==id){
             this.addAssetGroup(obj,item)
             return;
          }else if(item.childNode.length){
            this.findNode(item.childNode,id,obj)
          }
        })
      },
      async addAssetGroup(obj,item){
        let res = await AssetManageApi.addAssetGroup(obj)
        obj.id=res
        item?item.childNode.push(obj):this.groupTree.push(obj)
      },
      async deleteAssetGroup(data){
        await AssetManageApi.deleteAssetGroup({
          ids:data.id
        })
        this.$message.success("删除成功！")
      },
      async updateAssetGroup(data){
        console.log('data',data)
         await AssetManageApi.updateAssetGroup(data)
      },
    },
    mounted(){
      this.getAssetGroupTree()
    }
  }
</script>

<style lang="less">
  .asset-group{
    height: 100%;
    padding:20px;
    .left-group-tree{
      // float: left;
      margin: 0 auto;
      width:25%;
      color:@white;
      background: #3a8ee6;
      border-radius: 6px;
    }
    .el-tree{
      background:#3a8ee6;
      font-size: 16px;
      color:@white;
      /*font-weight: 600;*/
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
</style>

