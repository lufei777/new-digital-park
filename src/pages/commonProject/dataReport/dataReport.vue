<template>
  <div class="data-report">
    <div class="flex-align choose-box">
      <div class="block small-select">
        <span class="choose-tip">能耗类型</span>
        <el-select v-model="curEnergy" placeholder="请选择">
          <el-option v-for="item in energyList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="block small-select">
        <span class="choose-tip">日期单位</span>
        <el-select v-model="curDateType" placeholder="请选择" @change="handleDateTypeChange">
          <el-option v-for="item in dateTypeList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="block">
        <span class="choose-tip">开始时间</span>
        <el-date-picker
          v-model="startTime"
          :type="pickerType"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          :clearable="false"
        >
        </el-date-picker>
      </div>
      <div class="block">
        <span class="choose-tip">结束时间</span>
        <el-date-picker
          v-model="endTime"
          :type="pickerType"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
          :clearable="false"
        >
        </el-date-picker>
      </div>
      <el-button @click="onClickLookBtn" type="primary">查看报表</el-button>
      <el-button @click="onClickExportBtn" type="primary">导出报表</el-button>
    </div>
    <p v-html="tableData"></p>
  </div>
</template>

<script>
  import CommonApi from '../../../service/api/commonApi'
  let dateTypeList=[{
      name:'年',
      id:'year'
    },{
      name:'月',
      id:'monthly'
    },{
      name:'日',
      id:'daily'
  }]
  let energyList = [{
    name:'电',
    id:'electricity'
  },{
    name:'水',
    id:'water'
  },{
    name:'热',
    id:'gas'
  }]
  export default {
    name: 'DataReport',
    components: {
    },
    data () {
      return {
        curDateType:'monthly',
        dateTypeList:dateTypeList,
        pickerType:'month',
        startTime:new Date(new Date().getTime()-30*24*60*60*1000),
        endTime:new Date(),
        energyList:energyList,
        curEnergy:'electricity',
        tableData:''
      }
    },
    computed:{
      commonParams() {
        return {
          start:this.startTime,
          end:this.endTime,
          type:this.curDateType,
          catalog:this.curEnergy,
          parentSpace:1,
          exec:this.$route.path=='/spaceReport'?2:1
        }
      }
    },
    methods: {
      handleDateTypeChange(value){
        this.pickerType=value=='year'?'year':value=='monthly'?"month":'date'
      },
      async getEnergyListAll(){
        this.energyList = await CommonApi.getEnergyListAll({
          catalogId:2200
        })
        this.curEnergy= this.energyList[0].id
      },
      async onClickLookBtn(){
        this.tableData = await CommonApi.previewReportData(this.commonParams)
      },
      onClickExportBtn(){
        let url=`/api/vibe-web/energy/export?`
        let params=''
        for(let key in this.commonParams){
          params+=key+'='+this.commonParams[key]+'&'
        }
        location.href=url+params
      }
    },
    mounted(){
       // this.getEnergyListAll()
    }
  }
</script>

<style lang="less">
  .data-report{
    margin-top: 85px;
    padding:0 20px;
    .choose-box{
      padding:20px 0;
    }
    .block{
      margin-right:40px;
    }
    .choose-tip{
      margin-right:10px;
    }
    .el-button{
      margin:0 10px;
    }
    .small-select  .el-select{
       width:100px;
    }
  }
</style>
