<template>
  <div class="asset-maintenance">
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
    <div class="operator-box">
      <el-button type="primary">EXCEL导入</el-button>
      <el-button type="primary" @click="onClickAddBtn">新建</el-button>
    </div>
    <CommonTable :tableObj="assetData" :curPage="1">
      <template v-slot:special-operator>
        <el-table-column  fixed="right" label="操作" align="right" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-if="scope.row.status==1">入库</el-button>
            <el-button type="text" size="small">领用</el-button>
            <el-button type="text" size="small" icon="el-icon-more" @click.stop="onClickMore" class="more-btn">
              <div v-show="showMore" class="more-operator-box">
                <el-button type="text" size="small">变更</el-button>
                <el-button type="text" size="small">借用</el-button>
                <el-button type="text" size="small">归还</el-button>
                <el-button type="text" size="small">报修</el-button>
                <el-button type="text" size="small">报废</el-button>
              </div>
            </el-button>
          </template>
        </el-table-column>
      </template>
    </CommonTable>
    <ChooseAssetType :showAdd="showAdd"/>
  </div>
</template>

<script>
  import CommonApi from '../../../service/api/commonApi'
  import CommonTable from '../../../components/commonTable/index'
  import ChooseAssetType from '../coms/assetTypeModal'
  export default {
    name: 'AssetMaintenance',
    components: {
      CommonTable,
      ChooseAssetType
    },
    data () {
      return {
        coding:'',
        name:'',
        groupName:'',
        assetData:{},
        curPage:1,
        showMore:false,
        showAdd:false
      }
    },
    methods:{
      async getAssetList(){
        //status(资产状态)：1-闲置，2-在用，3-报修，4-报废

        let res = await CommonApi.getAssetList({
          coding:this.coding,
          name:this.name,
          groupName:this.groupName,
          pageNum:this.curPage
        })
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
      onClickSearchBtn(){
        this.curPage=1
      this.getAssetList()
      },
      onClickResetBtn(){},
      handleSelectionChange(val){
        let tmp=val.map((item)=>item.id)
        // this.curTypeId=tmp.join(",")
      },
      onClickAddBtn(){
        this.showAdd = true
      },
      rowClick(row){
        this.$router.push(`/addAsset?id=${row.id}`)
      },
      onClickMore(){
        this.showMore=!this.showMore
      }
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
    .operator-box{
      padding:20px 0;
      display: flex;
      flex-direction: row-reverse;
      .el-button{
        margin:0 5px;
      }
    }
    .more-btn{
      position: relative;
    }
    .more-operator-box{
      position: absolute;
      top:20px;
      left:-20px;
      z-index:99;
      background: #ccc;
      .el-button{
        display: block;
      }
    }
    .cell{
      overflow: visible;
    }
  }
</style>
