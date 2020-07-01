<template>
  <div class="asset-operator-record">
    <div class="record-tip">{{recordTip}}</div>
    <div class=" flex search-box">
      <div class="item-group">
        <label for="">领用人：</label>
        <el-input type="text" v-model="searchParams.collarUser"/>
      </div>
      <div class="item-group">
        <label for="">领用时间：</label>
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
      <div class="item-group">
        <label for="">领用资产：</label>
        <el-input type="text" v-model="searchParams.name"/>
      </div>
      <div class="item-group operator-btn-box">
        <el-button type="primary" class="" @click="onClickSearchBtn">搜索</el-button>
        <el-button class="" @click="onClickResetBtn">重置</el-button>
      </div>
    </div>
    <el-button type="primary" class="export-btn" @click="onClickExportBtn">导出</el-button>
    <zTable
      :ref="tableConfig.ref"
      :options="tableConfig"
    >
    </zTable>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import AssetManageApi from '@/service/api/assetManage'
  import CommonFun from '@/utils/commonFun'

  let pageInfo = {
    pageNum: 1,
    pageCount: 10
  }
  export default {
    name: "AssetOperatorRecord",
    components: {
    },
    props:['fromFlag'],   //fromFlag 1:资产领用
    data() {
      return {
        tableConfig:{
          ref:'tableRef',
          serverMode:{
            url:AssetManageApi.getOperatorRecord,
            data: pageInfo
          },
          propsHttp: {
            list: "list",
            total: "total",
            pageSize: "pageSize",
            pageNum: "pageNum"
          },
          columnConfig: [{
            label: '领用人',
            prop: 'collarUser',
          }, {
            label: '领用时间',
            prop: 'applyTime'
          }, {
            label: '领用资产',
            prop: 'name'
          },{
            label: '领用数量',
            prop: 'collarNum'
          }],
          uiConfig: {
            height: "auto",
            selection: true,
          },
        },
        searchParams:{
          collarUser:'',
          name:'',
        },
        date:['','']
      };
    },
    computed:{
      recordTip(){
        return this.fromFlag==1?'领用记录':''
      }
    },
    watch:{

    },
    methods: {
      async getOperatorRecord(){
        await AssetManageApi.getOperatorRecord()
      },
      setData(){
        this.$refs[this.tableConfig.ref].setCurrentPage(1)
        this.tableConfig.serverMode.data = {
          ...this.searchParams,
          ...{
            applyStartTime:this.date[0],
            applyEndTime:this.date[1],
          },
          ...pageInfo
        }
        this.$refs[this.tableConfig.ref].refreshTable()
      },
      onClickSearchBtn(){
        this.setData()
     },
      onClickResetBtn(){
        this.searchParams={
          collarUser:'',
          name:''
        }
        this.date=['','']
        this.setData()
      },
      onClickExportBtn(){
        let url = '/oaApi/stockDeal/exportRecord'
        let params=''
        let arr = this.$refs[this.tableConfig.ref].getSelectedData()
        let stockRecordIds = arr.length?arr.map((item)=>item.id):''
        for(let key in this.tableConfig.serverMode.data){
          if(key!=pageInfo){
            params+=key+'='+this.tableConfig.serverMode.data[key]+'&'
          }
        }
        params+='stockRecordIds='+stockRecordIds
        CommonFun.exportMethod({url, params})
      }
      
    },
    mounted() {
      // this.getOperatorRecord()
    }
  };
</script>

<style lang="less">
  .asset-operator-record{
    .record-tip{
      text-align: center;
      font-weight: bold;
      font-size: 16px;
    }
    .export-btn{
      float: right;
      margin:20px 0;
    }
    .search-box{
      padding:20px;
      margin-top: 20px;
    }
  }
</style>
