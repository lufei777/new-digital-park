<template>
  <div class="operator-log">
    <div class="choose-box flex-align radius-shadow">
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
          value-format="yyyy-MM-dd HH:mm"
          format="yyyy-MM-dd HH:mm"
          :clearable="false"
        >
        </el-date-picker>
      </div>
      <div class="block flex-align-center">
        <span>结束时间</span>
        <el-date-picker
          v-model="lastTime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm"
          format="yyyy-MM-dd HH:mm"
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
  import moment from 'moment'
  import CommonApi from '@/service/api/common'
  import CommonTable from '@/components/commonTable/index'
  export default {
    name: 'OperatorLog',
    components: {
      CommonTable
    },
    data () {
      return {
        logList:{},
        startTime:'',
        lastTime:'',
        curPage:1,
        operatingContent:'',
        loginName: ""
      }
    },
    methods: {
      async getLogList(){
        let lastTime=this.lastTime?this.lastTime:moment(new Date()).format('YYYY-MM-DD hh:mm:ss')
        let params={
          loginName:this.loginName,
          operatingContent:this.operatingContent,
          startTime:this.startTime,
          lastTime,
          rows:10,
          page:this.curPage
        }
        console.log("params",params)
        let res =await CommonApi.getLogList(params)
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
        this.lastTime=''
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
    .choose-box{
      overflow: hidden;
      padding:20px;
      background: @white;
      margin-bottom:20px;
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
