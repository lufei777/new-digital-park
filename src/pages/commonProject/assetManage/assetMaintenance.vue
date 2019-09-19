<template>
  <div class="asset-maintenance">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>资产管理</el-breadcrumb-item>
      <el-breadcrumb-item>资产信息维护</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="choose-box flex-align">
      <div class="block flex-align-center">
        <span>编号</span>
        <el-input v-model="coding" />
      </div>
      <div class="block flex-align-center">
        <span>名称</span>
        <el-input v-model="name" />
      </div>
      <div class="block flex-align-center">
        <span>资产组</span>
        <el-input v-model="groupName" />
      </div>
      <el-button type="primary"  @click="onClickSearchBtn">搜索</el-button>
      <el-button type="primary"  @click="onClickResetBtn">重置</el-button>
    </div>
    <CommonTable :tableObj="assetData" :curPage="1">
      <template v-slot:special-operator>
        <el-table-column  fixed="right" label="操作" align="right">
          <template slot-scope="scope">
               <el-button type="text" size="small">入库</el-button>
          </template>
        </el-table-column>
      </template>
    </CommonTable>
  </div>
</template>

<script>
  import CommonApi from '../../../service/api/commonApi'
  import CommonTable from '../../../components/commonTable/index'
  export default {
    name: 'AssetMaintenance',
    components: {
      CommonTable
    },
    data () {
      return {
        coding:'',
        name:'',
        groupName:'',
        assetData:{},
        curPage:1
      }
    },
    methods:{
      async getAssetList(){
        let res = await CommonApi.getAssetList()
        res.labelList=[{name:'',prop:'',type:'selection'},
          {name:'编号',prop:'coding'},
          {name:'名称',prop:'name'},
          {name:'资产组',prop:'groupName'},
          {name:'管理员',prop:'currentCustodian'},
          {name:'规格型号',prop:'specification'}]
        res.hideExportBtn=true
        res.dataList=res.list
        this.assetData=res
      },
      onClickSearchBtn(){},
      onClickResetBtn(){}
    },
    mounted(){
      this.getAssetList()
    }
  }
</script>

<style lang="less">
  .asset-maintenance{
    height: 100%;
    padding:20px;
    .choose-box{
      overflow: hidden;
      padding:20px 0;
    }
    .block{
      margin-right:40px;
      display: flex;
      span{
        flex-shrink: 0;
        margin-right: 10px;
      }
    }
    .choose-tip{
      margin-left: 100px;
      width:80px;
      text-align: right;
    }
  }
</style>
