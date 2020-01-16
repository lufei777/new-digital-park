<template>
  <div class="record-detail">
    <div class="tip">入库申请记录详情</div>
    <BasicInformation :detail="recordDetail"/>
    <div class="go-back"><el-button type="primary" @click="onClickBackBtn">返回</el-button></div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import {StockDic} from "@/utils/dictionary";
  import StockManageApi from '@/service/api/stockManage'
  import BasicInformation from '../coms/basicInformation'
  export default {
    name: "RecordDetail",
    components: { BasicInformation },
    props:["curRecordId"],
    data() {
      return {
       recordDetail:{}
      };
    },
    computed:{
      ...mapState({
        stockTabChange:state=>state.digitalPark.stockTabChange
      })
    },
    watch:{
    },
    methods: {
      onClickBackBtn(){
        this.$parent.onClickBackBtn &&  this.$parent.onClickBackBtn()
      },
      async getRecordDetail(){
        let res = await StockManageApi.getRecordDetail({
          recordId:this.curRecordId
        })
        this.recordDetail = res.stock
      }
    },
    mounted() {
      this.getRecordDetail()
    }
  };
</script>

<style lang="less">
  .record-detail {
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
