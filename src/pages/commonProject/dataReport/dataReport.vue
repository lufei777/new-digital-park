<template>
  <div class="data-report">
    <div class="flex-align choose-box radius-shadow">
      <div class="block small-select"  v-if="fromFlag==1">
        <span class="choose-tip">能耗类型：</span>
        <el-select v-model="curEnergy" placeholder="请选择">
          <el-option v-for="item in energyList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="block small-select">
        <span class="choose-tip">日期单位：</span>
        <el-select v-model="curDateType" placeholder="请选择" @change="handleDateTypeChange">
          <el-option v-for="item in dateTypeList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="block">
        <span class="choose-tip">开始时间：</span>
        <el-date-picker
          v-model="startTime"
          :type="pickerType"
          placeholder="选择日期时间"
          :clearable="false"
        >
        </el-date-picker>
      </div>
      <div class="block">
        <span class="choose-tip">结束时间：</span>
        <el-date-picker
          v-model="endTime"
          :type="pickerType"
          placeholder="选择日期时间"
          :clearable="false"
        >
        </el-date-picker>
      </div>
      <el-button @click="onClickLookBtn" type="primary">查看报表</el-button>
      <el-button @click="onClickExportBtn" type="primary" v-if="tableData">导出报表</el-button>
    </div>
    <p v-html="tableData" v-if="tableData"></p>
    <p v-if="!tableData" class="no-data">暂无数据 ~</p>
  </div>
</template>

<script>
  import moment from 'moment'
  import CommonApi from '../../../service/api/common'
  import {isZG} from '@/utils/project';
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

  let energyList = isZG()?[{
      name:'电',
      id:'electricity'
    },{
      name:'水',
      id:'water'
    }]:[{
    name:'电',
    id:'electricity'
  },{
    name:'水',
    id:'water'
  },{
    name:'热',
    id:'gas'
  },{
    name:'冷',
    id:'cold'
  }]
  export default {
    name: 'DataReport',
    props:['fromFlag'], //fromFlag 1：分项报表 2：用电报表 3：用水报表 4：用冷报表
    components: {
    },
    data () {
      return {
        curDateType:isZG()?'daily':'monthly',
        dateTypeList:dateTypeList,
        pickerType:isZG()?'date':'month',
        startTime:isZG()?moment().startOf('month').format("YYYY-MM-DD"):"2019-01",
        endTime:isZG()?moment().format('YYYY-MM-DD'):"2019-04",
        energyList:energyList,
        curEnergy:'electricity',
        tableData:'',
        valueFormat:isZG()?"YYYY-MM-DD":'YYYY-MM'
      }
    },
    computed:{
      commonParams() {
        return {
          start:moment(this.startTime).format(this.valueFormat),
          end:moment(this.endTime).format(this.valueFormat),
          // start:this.startTime,
          // end:this.endTime,
          type:this.curDateType,
          catalog:this.catalog,
          parentSpace:1,
          exec:this.fromFlag==1?1:2   // 1：空间能耗 2：分项能耗
        }
      },
      catalog(){
        return this.fromFlag==1?this.curEnergy:this.fromFlag==2?'electricity':
               this.fromFlag==3?'water':'cold'
      }
    },
    methods: {
      handleDateTypeChange(value){
        this.pickerType=value=='year'?'year':value=='monthly'?"month":'date'
        this.valueFormat=value=='year'?'YYYY':value=='monthly'?"YYYY-MM":'YYYY-MM-DD'
      },
      async onClickLookBtn(){
        this.tableData = await CommonApi.previewReportData(this.commonParams)
      },
      onClickExportBtn(){
        let url=`/vibe-web/energy/export?`
        let params=''
        for(let key in this.commonParams){
          params+=key+'='+this.commonParams[key]+'&'
        }
        location.href=url+params
      }
    },
    mounted(){
       this.onClickLookBtn()
    }
  }
</script>

<style lang="less">
  .data-report{
    .choose-box{
      padding:20px;
      background: @white;
    }
    .block{
      margin-right:40px;
    }
    .choose-tip{
      margin-right:5px;
    }
    .el-button{
      margin:0 10px;
    }
    .no-data{
      text-align: center;
      margin-top:20%;
      font-size: 16px;
    }
    .small-select  .el-select{
       width:100px;
    }
  }
</style>
