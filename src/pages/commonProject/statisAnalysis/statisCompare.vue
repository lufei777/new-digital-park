<template>
  <div class="statis-compare">
    <div class="tip flex-align">
      <span class="icon"></span>
      <span>统计对比</span>
    </div>
    <MonitorChoose :showDateType="true" :showTwoMonitor="true"/>
    <MonitorModal />
    <el-button type="primary" class='handle-btn' @click="onClickBtn">处理</el-button>
    <div style="clear:both"></div>
    <div ref="myChart1" class="my-chart"></div>
    <div ref="myChart2" class="my-chart"></div>
    <div ref="myChart3" class="my-chart"></div>
    <div ref="myChart4" class="my-chart"></div>
    <el-table :data="tableData" border height="350px">
      <el-table-column prop="time" label="时间" align="right" width="100px"></el-table-column>
      <el-table-column prop="max1" :label="tableText[0]+'最大值(KWH)'" align="right"></el-table-column>
      <el-table-column prop="max2" :label="tableText[1]+'最大值(KWH)'" align="right"></el-table-column>
      <el-table-column prop="min1" :label="tableText[0]+'最小值(KWH)'" align="right"></el-table-column>
      <el-table-column prop="min2" :label="tableText[1]+'最小值(KWH)'" align="right"></el-table-column>
      <el-table-column prop="avg1" :label="tableText[0]+'平均值(KWH)'" align="right"></el-table-column>
      <el-table-column prop="avg2" :label="tableText[1]+'平均值(KWH)'" align="right"></el-table-column>
      <el-table-column prop="std1" :label="tableText[0]+'均方差(KWH)'" align="right"></el-table-column>
      <el-table-column prop="std2" :label="tableText[1]+'均方差(KWH)'" align="right"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import echarts from 'echarts'
  import MonitorChoose from '../coms/monitorChoose'
  import MonitorModal from '../../../components/monitorModal/index'
  import CommonApi from '../../../service/api/commonApi'
  import ChartUtils from '../../../utils/chartUtils'
  export default {
    name: 'StatisCompare',
    components: {
      MonitorChoose,
      MonitorModal
    },
    data () {
      return {
        tableData:[],
        tableText:['B-ALE-1-a 照明','B-AL-1-aFM 电热风幕和热风幕电机'],
        myChart1:'',
        myChart2:'',
        myChart3:'',
        myChart4:'',
      }
    },
    computed:{
      ...mapState({
        startTime:state=>state.analysis.startTime,
        endTime:state=>state.analysis.endTime,
        monitor1:state=>state.analysis.monitor1,
        monitor2:state=>state.analysis.monitor2,
        filterType:state=>state.analysis.filterType,
      }),
    },
    watch:{
      monitor1(){
        this.tableText[0]=this.monitor1.text
      },
      monitor2(){
        this.tableText[1]=this.monitor2.text
      },
    },
    methods: {
      async getStatisCompareData(){
        let params={
          startTime:this.startTime,
          lastTime:this.endTime,
          monitorId1:this.monitor1.id,
          monitorId2:this.monitor2.id,
          filterType:this.filterType
        }
        let res =  await CommonApi.getStatisCompareData(params)
        this.initChart(res)
        this.initTableData(res)
      },
      onClickBtn(){
        this.getStatisCompareData()
      },
      initChart(res){
        let seriesList=
          [[{data:res.maxValues_1,type:'bar',name:this.monitor1.text+'最大值'},{data:res.maxValues_2,type:'bar',name:this.monitor2.text+'最大值'}],
           [{data:res.minValues_1,type:'bar',name:this.monitor1.text+'最小值'},{data:res.minValues_2,type:'bar',name:this.monitor2.text+'最小值'}],
           [{data:res.avgValues_1,type:'bar',name:this.monitor1.text+'平均值'},{data:res.avgValues_2,type:'bar',name:this.monitor2.text+'平均值'}],
           [{data:res.stdValues_1,type:'bar',name:this.monitor1.text+'均方差'},{data:res.stdValues_2,type:'bar',name:this.monitor2.text+'均方差'}]
          ]
        let legendList=[[this.monitor1.text+'最大值',this.monitor2.text+'最大值'],
                        [this.monitor1.text+'最小值',this.monitor2.text+'最小值'],
                        [this.monitor1.text+'平均值',this.monitor2.text+'平均值'],
                        [this.monitor1.text+'均方差',this.monitor2.text+'均方差'],
                       ]
           for(let i=1;i<=4;i++){
               this['myChart'+i]=echarts.init(this.$refs['myChart'+i])
               let xAxis =res.xAxis
               let data={
                 titleText:'',
                 legendData:legendList[i-1],
                 xAxis,
                 series:seriesList[i-1],
                 yAxis:res.unit1
               }
               ChartUtils.handleBarChart(this['myChart'+i],data)
           }
      },
      initTableData(res){
           let tmp=[]
          res.xAxis.map((item,index)=>{
             tmp.push({
              time:item,
              max1:res.maxValues_1[index],
              max2:res.maxValues_2[index],
              min1:res.minValues_1[index],
              min2:res.minValues_2[index],
              avg1:res.avgValues_1[index],
              avg2:res.avgValues_2[index],
              std1:res.stdValues_1[index],
              std2:res.stdValues_2[index]
            })
          })
        this.tableData=tmp
      }
    },
    created(){
    },
    mounted(){
      setTimeout(()=>this.getStatisCompareData(),500)
    },
    beforeDestroy(){
      let obj = echarts.getInstanceByDom(this.$refs.myChart1)
      if (obj) {
        echarts.dispose(obj)
      }
    }
  }
</script>

<style lang="less">
  .statis-compare{
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
    .chart-box{
      width:80%;
      margin:20px auto;
    }
    .my-chart{
      width: 50%;
      height:300px;
      float: left;
    }
    .choose-box{
      padding:20px 0;
      border-bottom: 1px solid #eaeaea;
    }
    .block{
      margin:0 40px;
    }
    .choose-tip{
      margin-left: 100px;
      width:80px;
      text-align: right;
    }
    .handle-btn{
      margin:10px;
      float: right;
    }
    .el-table th.gutter{
      width:16px;
    }
    .el-select .el-input{
      width: 80px;
    }
    .el-table th div{
      padding-left: 0;
    }
  }
</style>
