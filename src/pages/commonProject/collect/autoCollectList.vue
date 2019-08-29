<template>
  <div class="man-made-list">
    <div class="tip flex-align">
      <span class="icon"></span>
      <span>自动采集列表</span>
    </div>
    <div class="flex condition-box">
      <div class="block">
        <el-select  v-model="curEnergy" placeholder="请选择">
          <el-option label="电" value="34"></el-option>
          <el-option label="水" value="37"></el-option>
        </el-select>
      </div>
      <div class="block">
        <span class="demonstration">开始时间</span>
        <el-date-picker
          v-model="startTime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="onTimeChange(-1)"
          :clearable="false"
        >
        </el-date-picker>
      </div>
      <div class="block">
        <span class="demonstration">结束时间</span>
        <el-date-picker
          v-model="endTime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="onTimeChange(-1)"
          :clearable="false"
        >
        </el-date-picker>
      </div>
      <el-button type="primary" @click="getAutoCollectList">确定</el-button>
    </div>
    <CommonTable  :tableObj="tableData" :curPage="curPage"/>
  </div>
</template>

<script>
  import CommonApi from '../../../service/api/commonApi'
  import CommonTable from '../../../components/commonTable/index'
  export default {
    name: 'AutoCollectList',
    components: {
      CommonTable
    },
    data () {
      return {
        startTime:'',
        endTime:'',
        curPage:1,
        tableData:{},
        curEnergy:'34'
      }
    },
    methods: {
      onTimeChange(flag){

      },
      async getAutoCollectList(){
        let params={
          catalog:this.curEnergy,
          startTime:this.startTime,
          endTime:this.endTime,
          page:this.curPage,
          size:10
        }
        let res = await CommonApi.getAutoCollectList(params)
        if(res&&res.total){
          res.labelList=[{name:'序号',prop:'xulie'},
            {name:'时间',prop:'time'},
            {name:'表名称',prop:'name'},
            {name:'数值',prop:'value'},
            {name:'所属空间',prop:'caption'}]
          res.dataList=res.value
          this.tableData=res
        }
      },
      handleCurrentChange(val){
        this.curPage=val
        this.getAutoCollectList()
      },
      handleExport(){
        let sendUrl =window.gateway+'/vibe-web/energyCount/energy/getBaseRepresentationNumberExcel?catalog='
          +this.curEnergy+'&startTime='+this.startTime+'&endTime='+this.endTime+'&page='+this.curPage+'&size=10'
        location.href=sendUrl
      }
    },
    mounted(){
      this.getAutoCollectList()
    }
  }
</script>

<style lang="less">
  .man-made-list{
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
    .condition-box{
      padding:20px 0;
    }
    .block{
      margin:0 20px;
    }
    .demonstration{
      margin-right: 5px;
    }
    .operator-box{
      clear: both;
      padding:10px 0;
      .el-button{
        margin-right: 20px;
      }
    }
  }
</style>
