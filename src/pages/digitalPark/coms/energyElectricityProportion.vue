<template>
  <div class="energy-electricity-proportion">
    <div ref="myChart1" class="my-chart" id="myChart"></div>
    <div>{{moduleItem.moduleName}}</div>
  </div>
</template>

<script>
  import EnergyApi from "../../../service/api/energyApi";
  import ChartUtils from '../../../utils/chartUtils'
  export default {
    name: 'EnergyElectricityProportion',
    components: {
    },
    props:['moduleItem'],
    data () {
      return {
      }
    },
    methods: {
      async getElecProportion() {
        let params = {
          redioType:0,
          selectType:1,
          startTime:'2019',
        }
        let res = await EnergyApi.getEnergyOverView(params)
        this.initChart(res)
      },
      initChart(res) {
        let myChart = echarts.init(this.$refs.myChart1);
        let legendData = [];
        let dataList = [];
        res.elecList.map(item => {
          legendData.push(item.name);
          var itemObj = {
            value: item.value,
            name: item.name
          };
          dataList.push(itemObj);
        });
        let seriesData =dataList
        let titleText = this.moduleItem.moduleName
        let data = {
          legendData,
          seriesData,
          // titleText,
        };
        // window.onresize = myChart.resize;
        ChartUtils.hollowPieChart(myChart, data);

        let option={
           legend:{
             textStyle:{
               color:'#8FD3FA'
             }
           }
        }
        myChart.setOption(option)
      },

    },
    mounted(){
      this.getElecProportion()
    }
  }
</script>

<style lang="less">
  .energy-electricity-proportion{
    .my-chart{
      /*height:90%;*/
      /*margin:0 auto;*/
    }
  }
</style>
