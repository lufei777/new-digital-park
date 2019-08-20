<template>
  <div class="device-analysis">
    <div class="tip flex-align">
      <span class="icon"></span>
      <span>统计对比</span>
    </div>
    <MonitorChoose :showDateType="true"/>
    <MonitorModal />
    <el-button type="primary" class='handle-btn' @click="onClickBtn">处理</el-button>
    <div style="clear:both"></div>
    <div ref="myChart1" class="my-chart"></div>
    <div ref="myChart2" class="my-chart"></div>
    <div ref="myChart3" class="my-chart"></div>
    <div ref="myChart4" class="my-chart"></div>
    <!--<el-table :data="tableData" height="350" stripe style="width:40%;" border>-->
      <!--<el-table-column prop="point1" :label="tableText[0]" align="right"></el-table-column>-->
      <!--<el-table-column prop="point2" :label="tableText[1]" align="right"></el-table-column>-->
    <!--</el-table>-->
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import echarts from 'echarts'
  import MonitorChoose from '../coms/monitorChoose'
  import MonitorModal from '../../../components/monitorModal/index'
  import CommonApi from '../../../service/api/commonApi'
  export default {
    name: 'StatisCompare',
    components: {
      MonitorChoose,
      MonitorModal
    },
    data () {
      return {
        tableData:[],
        tableText:['',''],
        myChart1:'',
        myChart2:'',
        myChart3:'',
        myChart4:'',
      }
    },
    computed:{
      ...mapState({
        startTime:state=>state.analysis.statisStartTime,
        endTime:state=>state.analysis.statisEndTime,
        monitor1:state=>state.analysis.statisMonitor1,
        monitor2:state=>state.analysis.statisMonitor2,
        filterType:state=>state.analysis.statisFilterType,
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
        // let tmpArr=[]
        // res.points.map((item)=>{
        //   tmpArr.push({
        //     point1:item[0],
        //     point2:item[1]
        //   })
        // })
        // this.tableData = tmpArr
        this.initChart(res)
      },
      onClickBtn(){
        this.getStatisCompareData()
      },
      initChart(res){
        // this.myChart1 = echarts.init(this.$refs.myChart1);
        // this.myChart2 = echarts.init(this.$refs.myChart2);
        // this.myChart3 = echarts.init(this.$refs.myChart3);
        // this.myChart4 = echarts.init(this.$refs.myChart4);
        let seriesList=[res.maxValues_1.concat(res.maxValues_2),
                    res.minValues_1.concat(res.minValues_2),
                    res.avgValues_1.concat(res.avgValues_2),
                    res.stdValues_1.concat(res.stdValues_2)]
           for(var i=1;i<=4;i++){
               this['myChart'+i]=echarts.init(this.$refs['myChart'+i])
               let legendData=[this.monitor1.text+'最大值',this.monitor2.text+'最大值']
               let xAxisData =[this.startTime,this.endTime]
               let data={
                 legendData,
                 xAxisData,
                 seriesData:seriesList[i-1]
               }
               this.initEveryChart(this['myChart'+i],data)
           }
      },
      initEveryChart(dom,data){
        let option = {
            tooltip : {
              trigger: 'axis',
              axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            legend: {
              data:data.legendData
            },
            xAxis : [
              {
                type : 'category',
                data :data.xAxisData
              }
            ],
            yAxis : [
              {
                type : 'value'
              }
            ],
            series : data.seriesData
          };
        window.onresize = dom.resize;
        dom.setOption(option,true)
      }

    },
    created(){
    },
    mounted(){
      setTimeout(()=>this.getStatisCompareData(),500)
    }
  }
</script>

<style lang="less">
  .device-analysis{
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
    .el-table{
      /*clear: both;*/
      float: right;
    }
    .el-table th.gutter{
      width:16px;
    }
    .el-select .el-input{
      width: 80px;
    }
  }
</style>
