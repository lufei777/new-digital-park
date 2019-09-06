<template>
  <div class="operator-log">
    <div class="tip flex-align">
      <span class="icon"></span>
      <span>操作日志列表</span>
    </div>
    <div class="choose-box flex-align">
      <div class="block flex-align-center">
        <span>操作者</span>
        <el-input v-model="loginName" />
      </div>
      <div class="block flex-align-center">
        <span>操作内容</span>
        <el-input v-model="operatingContent" />
      </div>
      <div class="block flex-align-center">
        <span>开始时间</span>
        <el-date-picker
          v-model="startTime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          :clearable="false"
        >
        </el-date-picker>
      </div>
      <div class="block flex-align-center">
        <span>结束时间</span>
        <el-date-picker
          v-model="endTime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          :clearable="false"
        >
        </el-date-picker>
      </div>
      <el-button type="primary" icon="el-icon-search" @click="onClickSearchBtn">搜索</el-button>
      <el-button type="primary" icon="el-icon-refresh" @click="onClickRefreshBtn">刷新</el-button>
    </div>
    <CommonTable :tableObj="logList" :curPage="1"/>
  </div>
</template>

<script>
  import CommonApi from '../../../service/api/commonApi'
  import CommonTable from '../../../components/commonTable/index'
  export default {
    name: 'OperatorLog',
    components: {
      CommonTable
    },
    data () {
      return {
        logList:{},
        startTime:'',
        endTime:'',
        curPage:1,
        operatingContent:'',
        loginName: ""
      }
    },
    methods: {
      async getLogList(){
        let res =await CommonApi.getLogList({
          loginName:this.loginName,
          operatingContent:this.operatingContent,
          startTime:this.startTime,
          endTime:this.endTime,
          rows:10,
          page:this.curPage
        })
        if(!res || !res.total){
          res={
            rows:[],
            total:0
          }
        }
        res.labelList=[{name:'发起者',prop:'loginName'},
                      {name:'事件描述',prop:'operatingContent'},
                      {name:'日期时间',prop:'optDate'},
                      {name:'结果',prop:'result'}]
        res.dataList=res.rows
        res.hideExportBtn=true
        this.logList=res
      },
      handleCurrentChange(val){
        this.curPage=val
        this.getLogList()
      },
      onClickRefreshBtn(){
        this.curPage=1
        this.loginName=''
        this.operatingContent=''
        this.startTime=''
        this.endTime=''
        this.getLogList()
      },
      onClickSearchBtn(){
        this.curPage=1
        this.getLogList()
      }
    },
    mounted(){
      this.getLogList()
    }
  }
</script>

<style lang="less">
  .operator-log{
    margin-top: 85px;
    padding:0 20px;
    .tip{
      height: 66px;
      border-bottom: 1px solid #eaeaea;
      .icon {
        width: 2px;
        height: 24px;
        background: #01465c;
        border-radius: 2px;
        margin-right: 10px;
      }
      span{
        font-size: 24px;
        color:#01465c;
      }
    }
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
