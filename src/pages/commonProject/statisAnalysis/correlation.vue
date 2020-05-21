<template>
  <div class="correlation">
    <MonitorChoose :showDateType="false"
                   :showTwoMonitor="true"
                   :onClickHandleBtnCallback="onClickBtn"
    />
    <div ref="myChart" class="my-chart"></div>
    <el-table :data="tableData" height="350" stripe style="width:40%;" border>
      <el-table-column prop="point1" :label="tableText[0]" align="right"></el-table-column>
      <el-table-column prop="point2" :label="tableText[1]" align="right"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import MonitorChoose from '../coms/monitorChoose'
  import CommonApi from '../../../service/api/common'
  export default {
    name: 'DeviceAnalysis',
    components: {
      MonitorChoose,
    },
    data () {
      return {
        tableData:[],
        tableText:['B-ALE-1-a 照明 (KWH)','B-AL-1-aFM 电热风幕和热风幕电机 (KWH)'],
        myChart:'',
        searchParams:{
          monitor1:{},
          monitor2:{}
        }
      }
    },
    computed:{
      monitor1(){
        return this.searchParams.monitor1
      },
      monitor2() {
        return this.searchParams.monitor2
      }
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
      async getCorrelationData(){
        let res =  await CommonApi.getCorrelationData(this.searchParams)
        let tmpArr=[]
         res.points.map((item)=>{
          tmpArr.push({
            point1:item[0],
            point2:item[1]
          })
        })
        this.tableData = tmpArr
        this.tableText[0]=this.monitor1.text+"("+(res.unit1?res.unit1:'')+")"
        this.tableText[1]=this.monitor2.text+"("+(res.unit2?res.unit2:'')+")"
        this.initChart(res)
      },
      onClickBtn(params){
         this.searchParams = params
         this.getCorrelationData()
      },
      initChart(result){
        this.myChart = this.$echarts.init(this.$refs.myChart);
        let data = result.points;
        let myRegression = ecStat.regression('linear', data);
        let name1 = this.monitor1.text+' ('+ result.unit1 + ')';
        let name2 = this.monitor2.text+' ('+ result.unit2 + ')';
        if(myRegression.expression.indexOf("-")>0){
          myRegression.expression = myRegression.expression.replace("+","");
          myRegression.expression = myRegression.expression.replace("-","-  ");
        }
        myRegression.points.sort(function(a, b) {
          return a[0] - b[0];
        });
        let option = {
          title: {
            text: '不同传感器相关性分析',
            left: 'center',
            textStyle:{
              color:'#333',
              fontWeight:'normal',
              fontSize:14
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            textStyle:{
              fontSize:12
            },
            formatter: function (params) {
                var relVal = params[0].name
                for (var i = 0, l = params.length; i < l; i++) {
                    relVal += '<br/>' + params[i].marker + params[i].seriesName + ' : ' + params[i].value +  '&nbsp;' + result.unit1
                }
                return relVal
            }
          },
          xAxis: {
            type: 'value',
            scale:true,
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            },
            name:name1,
            nameLocation:'middle',
            nameGap:30,
            axisLabel:{
              fontSize:12
            },

            nameTextStyle:{
              fontSize:12
            },
            splitNumber: 20,
            interval: 6
          },
          yAxis: {
            type: 'value',
            scale:true,
            nameLocation:'middle',
            nameGap:70,
            nameRotate:90,
            splitLine: {
              lineStyle: {
                type: 'dashed'
              }
            },
            name:name2,

            nameTextStyle:{
              fontSize:12
            },
            axisLabel:{
              fontSize:12
            },
          },
          series: [{
            name: 'scatter',
            type: 'scatter',
            label: {
              emphasis: {
                show: true,
                position: 'left',
                textStyle: {
                  color: '#2f4554',
                  fontSize: 14,
                  fontWeight:'bold'
                }
              }
            },
            data: data,
            max:'max',
            min:'min'
          }, {
            name: 'line',
            type: 'line',
            showSymbol: false,
            smooth: true,
            data: myRegression.points,
            markPoint: {
              itemStyle: {
                normal: {
                  color: 'transparent'
                }
              },
              label: {
                normal: {
                  show: true,
                  position: 'left',
                  formatter: myRegression.expression,
                  textStyle: {
                    color: '#333',
                    fontSize: 12
                  }
                }
              },
              data: [{
                coord: myRegression.points[myRegression.points.length - 1]
              }]
            }
          }]
        };
        window.onresize = this.myChart.resize;
        this.myChart.setOption(option,true)
      }
    },
    created(){
    },
    beforeDestroy(){
    },
    mounted(){
    }
  }
</script>

<style lang="less">
  .correlation{
    background: @white;
    .chart-box{
      width:80%;
      margin:20px auto;
      overflow:hidden;
    }
    .my-chart{
      width: 60%;
      height:350px;
      clear: both;
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
    .el-table{
      /*clear: both;*/
      float: right;
    }
    .el-table th.gutter{
      width:16px;
    }
  }
</style>
