<template>
  <div class="apply-record">
    <miTable :ref="tableConfig.ref" :tableConfig="tableConfig" v-if="!showDetail">
      <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
        <el-button type="text" @click="onClickDetailBtn(row)">详情</el-button>
      </template>
    </miTable>
    <div v-if="showDetail">
      <div class="tip">入库申请记录详情</div>
      <BasicInformation />
      <div class="go-back"><el-button type="primary" @click="onClickBackBtn">返回</el-button></div>
    </div>

  </div>
</template>

<script>
  import miTable from "@/components/Table";
  import {StockDic} from "@/utils/dictionary";
  import StockManageApi from '@/service/api/stockManageApi'
  import BasicInformation from '../coms/basicInformation'
  export default {
    name: "ApplyRecord",
    components: { miTable,BasicInformation },
    data() {
      return {
        model: {},
        tableConfig:{
          ref:'tableRef',
          data:[],
          operation:true,
          columnConfig:[
            {label:'采购人',prop:'buyer'},
            {label:'验收人',prop:'checker'},
            {label:'购置日期',prop:'buyDate'},
            {label:'入库日期',prop:'brand'},
            {label:'入库状态',prop:'singleCount',
              formatter:function (row) {
                return row.singleCount==1?'是':'否'
              }
            }],
          uiConfig:{
            height:'auto',
          }
        },
        showDetail:false
      };
    },
    methods: {
      onClickDetailBtn(){
        this.showDetail=true
      },
      onClickBackBtn(){
        this.showDetail=false
      },
      async getRecordList(){
        let res = await StockManageApi.getRecordList({
          type:1
        })
      }
    },
    mounted() {
      this.tableConfig.data=[{
        buyer:'战三', checker:'李四'}]
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
  .go-back{
    text-align: center;
    margin-top: 20px;
  }
}
</style>
