<template>
  <div class="my-asset panel-container">
    <div class="condition-box radius-shadow flex">
       <div class="item-group">
         <label>编号：</label>
         <el-input v-model="searchObj.coding"/>
       </div>
      <div class="item-group">
        <label>名称：</label>
        <el-input v-model="searchObj.name"/>
      </div>
      <div class="item-group">
        <label>资产组：</label>
        <el-input v-model="searchObj.groupName" @focus="onShowTree"/>
      </div>
      <div class="item-group">
        <el-button type="primary" class="search-btn" @click="onClickSearchBtn">搜索</el-button>
        <el-button @click="onClickResetBtn">重置</el-button>
      </div>
    </div>

    <TreeModal :treeModalConfig="treeModalConfig"/>

    <div class="my-asset-table radius-shadow panel">
      <z-table :ref="tableData.ref" :options="tableData">
        <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
          <el-button type="text" @click="dealAsset(row)">归还</el-button>
          <el-button type="text" @click="dealAsset(row)">送修</el-button>
        </template>
      </z-table>
    </div>
    
  </div>
</template>

<script>
  import { AssetDic } from "@/utils/dictionary";
  import AssetManageApi from '@/service/api/assetManage'
  import TreeModal from '@/components/treeModal'
  export default {
    name: "MyAsset",
    components: {
      TreeModal,
    },
    data() {
      return {
        tableData: {
          ref: "tableData",
          data: [],
          operation:true,
          columnConfig: [
            { label: "资产编号", prop: "coding" },
            { label: "资产名称", prop: "name" },
            { label: "资产组", prop: "groupName" },
            { label: "使用部门", prop: "deptName" },
            { label: "使用人", prop: "assetUser" },
            { label: "规格型号", prop: "specification" },
            { label: "状态", prop: "status",
              formatter:function(row,column){
                return AssetDic.assetStatus[row.status]
              }
            },
          ],
          uiConfig: {
            height: "auto",
            // selection: true,
            pagination: {
              handler(pageSize, page) {
                _this.handleCurrentChange(page);
              }
            }
          },
        },
        treeModalConfig:{
          treeList:[],
          treeConfig:{
            treeProps:{
              label:'name',
              children:'childNode'
            },
            showSearch:true
          },
          showModal:false,
          modalTip:'',
          onClickCancelBtnCallback:this.hideTreeModal,
          onClickSureBtnCallback:this.onClickTreeModalSureBtn
        },
        curPage:1,
        searchObj:{
          coding:'',
          name:'',
          groupId:'',
          groupName:''
        },
        groupTree:[]
      };
    },
    methods: {
      async getMyAssetList() {
        let params = {...this.searchObj,...{pageNum:this.curPage}}
        let res = await AssetManageApi.getMyAssetList(params)
        this.tableData.data = res.list;
      },
      async getAssetGroupTree() {
        let res = await AssetManageApi.getAssetGroupTree();
        this.groupTree = res;
      },
      dealAsset(row){

      },
      handleCurrentChange(page){
        this.curPage = page
      },
      onShowTree(){
        this.treeModalConfig.treeList=this.groupTree
        this.treeModalConfig.modalTip="选择资产组"
        this.treeModalConfig.showModal = true
      },
      hideTreeModal(){
        this.treeModalConfig.showModal=false
      },
      onClickTreeModalSureBtn(val){
        this.searchObj.groupName = val.name,
        this.searchObj.groupId = val.id
        this.treeModalConfig.showModal=false
      },
      onClickSearchBtn(){
        this.getMyAssetList();
      },
      onClickResetBtn() {
        this.searchObj={
          coding:'',
          name:'',
          groupId:'',
          groupName:''
        }
        this.getMyAssetList()
      }
    },
    mounted() {
      this.getMyAssetList();
      this.getAssetGroupTree()
    }
  };
</script>

<style lang="less">
  .my-asset {
    .condition-box {
      margin-bottom: 20px;
      background: @white;
      padding: 20px;
      // background: pink;
    }
    .my-asset-table {
      background: @white;
      padding: 20px;
      .operator-box {
        background: @white;
        .el-button {
          margin-left: 20px;
        }
      }
    }
    .search-btn{
      margin-right: 10px;
    }
  }
</style>
