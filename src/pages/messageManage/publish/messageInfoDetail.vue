<template>
  <div class="message-info-detail">
      <div class="nav-box">
        <NavOperator :showGoBack="true" />
      </div>
      <el-scrollbar wrap-class="scrollbar-wrapper" :native="false">
        <div class="info-detail-panel">
          <div class="message-title">{{messageInfo.releaseName}}</div>
          <div class="time-box">发布时间：{{messageInfo.releaseTime}}</div>
          <div class="ql-editor" v-html="messageInfo.textContent"></div>
        </div>
      </el-scrollbar>
  </div>
</template>

<script>
  import MessageManageApi from "@/service/api/messageManage";
  import CommonFun from '@/utils/commonFun'
  import NavOperator from "@/pages/digitalPark/coms/navOperator";
  export default {
    name: "MessageInfoDetail",
    components:{
      NavOperator
    },
    data() {
      return {
        messageInfo:{}
      };
    },
    computed:{
      curId(){
        return this.$route.query.id
      }
    },
    watch:{
    },
    methods: {
      async getMessageDetail(){
        let res = await MessageManageApi.getMessageDetail({
          id:this.curId
        })
        this.messageInfo = res
      }
    },
    created() {
    },
    mounted() {
      this.getMessageDetail()
    }
  };
</script>

<style lang="less">
  .message-info-detail {
    padding:0 20px;
    box-sizing: border-box;
    height:100%;
    overflow: hidden;
    background: @white;
    .nav-box{
      display: flex;
      flex-direction: row-reverse;
      margin:20px 0;
    }
    .info-detail-panel{
      width:80%;
      margin:0 auto;
      padding-bottom: 140px;
    }
    .message-title{
      font-size: 16px;
      padding:20px 0;
      text-align: center;
    }
    .time-box{
      width:100%;
      border-bottom: 1px solid #666;
      padding-bottom:10px;
      text-align: center;
    }
  }
</style>
