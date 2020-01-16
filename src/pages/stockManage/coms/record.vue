<template>
  <div class="apply-record">
    <miTable :ref="tableConfig.ref" :tableConfig="tableConfig" v-if="!showDetail">
      <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
        <el-button type="text" @click="onClickDetailBtn(row)">详情</el-button>
        <el-button type="text" @click="onClickDetailBtn(row)" v-if="row.recordStatus==0">收回</el-button>
        <el-button type="text" @click="onClickDetailBtn(row)" v-if="row.recordStatus==2">重新申请</el-button>
      </template>
    </miTable>
    <RecordDetail v-if="showDetail" :detailId="curRecordId"
                  :fromFlag="fromFlag" :on-click-back-callback="onClickBackBtn"/>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import miTable from "@/components/Table";
  import {StockDic} from "@/utils/dictionary";
  import StockManageApi from '@/service/api/stockManage'
  import RecordDetail from '../coms/recordDetail'
  export default {
    name: "Record",
    components: { miTable,RecordDetail },
    props:["fromFlag"],   //fromFlag: 1-申请记录  2-验收记录
    data() {
      let _this=this
      return {
        model: {},
        tableConfig:{
          ref:'tableRef',
          data:[],
          operation:{
            width:150
          },
          columnConfig:[
            {label:'采购人',prop:'buyUser'},
            {label:'验收人',prop:'acceptUser'},
            {label:'购置日期',prop:'buyTime'},
            {label:'入库日期',prop:'stockTime'},
            {label:'入库状态',prop:'recordStatus',
              formatter:function (row) {
                return StockDic.recordStatus[row.recordStatus]
              }
            }],
          uiConfig:{
            height:'auto',
            pagination:{
              handler:function(size,page){
                _this.handleCurrentChange(page)
              },
              currentPage:1
            }
          }
        },
        curPage:1,
        showDetail:false,
        curRecordId:''
      };
    },
    computed:{
      ...mapState({
        stockTabChange:state=>state.digitalPark.stockTabChange
      })
    },
    watch:{
      stockTabChange(){
        if(this.stockTabChange==1){
          this.getRecordList()
        }
      }
    },
    methods: {
      onClickDetailBtn(row){
        this.showDetail=true
        this.curRecordId=row.id
      },
      onClickBackBtn(){
        this.showDetail=false
      },
      async getRecordList(){
        let res = await StockManageApi.getRecordList({
          type:this.fromFlag,
          pageNum:this.curPage,
          pageSize:10,
        })
        this.tableConfig.data=res.list
        this.tableConfig.uiConfig.pagination.total=res.total
      },
      handleCurrentChange(page){
        this.curPage=page
        this.getRecordList()
      },

    },
    mounted() {
      this.getRecordList()
    }
  };
</script>

<style lang="less">
.apply-record {
  .tip{
    text-align: center;
    margin:20px;
    font-weight: bold;
    font-size: 16px;
  }
}
</style>
