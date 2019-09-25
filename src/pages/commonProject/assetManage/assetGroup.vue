<template>
  <div class="asset-group">
    <div class="left-group-tree">
      <div class="group-title">资产组</div>
      <el-tree
        :data="groupTree"
        :props="treeProps"
        node-key="id"
        @check="handleTreeCheck"
        ref="assetGroupTree"
      >
      </el-tree>
    </div>
    <div class="right-content">
      <div class="group-operator-box flex-align-between">
        <div class="left-tab flex-column">
          <span class="group-name">资产组设置</span>
          <span>资产组列表</span>
        </div>
        <div class="right-operator">
          <el-button type="primary"  @click="onClickAddBtn">新建</el-button>
          <el-button type="primary"  @click="onClickAddBtn">批量删除</el-button>
          <el-input class="search-input"/>
        </div>
      </div>

    </div>
    <AddAssetGroup :showAdd="showAdd" :isEdit="isEdit"/>
  </div>
</template>

<script>
  import AddAssetGroup from '../coms/addAssetGroup'
  import AssetManageApi from '../../../service/api/assetManageApi'
  export default {
    name: 'AssetGroup',
    components: {
      AddAssetGroup
    },
    data () {
      return {
        showAdd:false,
        isEdit:false,
        treeProps:{
          label:'name',
          children: 'childNode',
        },
        groupTree:[],
        groupTable:{},
        curGroupId:''
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
        this.curGroupId='group-2368946ab299465099fcbf62690d5e6e' //res[0].id
        this.selectAssetGroupById()
      },
      async selectAssetGroupById(){
         await AssetManageApi.selectAssetGroupById({
           assetGroupId:this.curGroupId
         })
      },
      handleTreeCheck(){}
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
      float: left;
      width:25%;
      color:@white;
      background: #3a8ee6;
    }
    .right-content{
      float: right;
      width: 75%;
      padding-left:20px;
      box-sizing: border-box;
    }
    .search-input{
      width:220px;
    }
    .group-name{
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 5px;
    }
    .group-operator-box{
      align-items: flex-end;
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
      color:@white;
      background: #3a8ee6;
    }
  }
</style>

