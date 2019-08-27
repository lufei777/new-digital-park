<template>
  <div class="rank-energy">
    <div class="out-box">
      <div class="select-box">
        <ConditionSelect :showEnergy="false"/>
      </div>
    </div>
    <div class="flex-align-between">
      <div class="rank-box flex-align-center">
        <h4 class="rank-tip">A3总用电量</h4>
        <span class="rank-value">{{overViewData.elecSum}}<span>kwh</span></span>
      </div>
      <div class="rank-box flex-align-center">
        <h4 class="rank-tip">A3总用水量</h4>
        <span class="rank-value">{{overViewData.waterSum}}<span>m³</span></span>
      </div>
      <div class="rank-box" ref="myChart1"></div>
      <div class="rank-box" ref="myChart2"></div>
    </div>
    <div class="table-box">
      <CommonTable :tableObj="tableData" :curPage="curPage"/>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import echarts from 'echarts'
  import ChartUtils from '../../../utils/chartUtils'
  import EnergyApi from '../../../service/api/energyApi'
  import ConditionSelect from '../../../components/conditionSelect/index'
  import CommonTable from '../../../components/commonTable/index'
  export default {
    name: 'TimeEnergy',
    components: {
      ConditionSelect,
      CommonTable
    },
    data () {
      return {
        overViewData:{},
        rankType:'elecAndWaterSum',
        rank:'asc',
        curPage:1,
        tableData:{}
      }
    },
    computed:{
      ...mapState({
        selectType: state => state.conditionSelect.selectType,
        radioType: state => state.conditionSelect.radioType,
        startTime: state => state.conditionSelect.startTime,
        lastTime: state => state.conditionSelect.lastTime,
      }),
      commonParams(){
        return {
          selectType:this.selectType,
          redioType:this.radioType,
          startTime:this.startTime,
          lastTime:this.lastTime
        }
      }
    },
    methods: {
      async getEnergyOverView(){
        this.overViewData = await EnergyApi.getEnergyOverView(this.commonParams)
        this.initElecChart(this.overViewData)
        this.initWaterChart(this.overViewData)
      },
      initElecChart(res){
        let myChart1 = echarts.init(this.$refs.myChart1);
        let titleText =`分项耗电占比分析`
        let legendData = res.elecList && res.elecList.map((item)=>item.name)
        let series=[]
        res.elecList && res.elecList.map((item)=>{
          series.push({
            name:item.name,
            value:item.value
          })
        })
        let data={
          titleText,
          legendData,
          series
        }
        ChartUtils.handlePieChart(myChart1,data)
      },
      initWaterChart(res){
        let myChart2 = echarts.init(this.$refs.myChart2);
        let titleText =`分项耗水占比分析`
        let legendData = res.waterList && res.waterList.map((item)=>item.name)
        let series=[]
        res.waterList && res.waterList.map((item)=>{
          series.push({
            name:item.name,
            value:item.value
          })
        })
        let data={
          titleText,
          legendData,
          series
        }
        ChartUtils.handlePieChart(myChart2,data)
      },
      async getEnergyRanking(){
        let params = {...this.commonParams,...{
            page: this.curPage,
            rankType: this.rankType,
            size: 10,
            rank: this.rank
          }}
        let res = await EnergyApi.getEnergyRanking(params)
        res.labelList=[
          {name:'排名', prop:'xulie', sort:false},
          {name: '建筑楼层', prop:'floor', sort:false},
          {name:'综合耗能',prop:'elecAndWaterSum',sort:'custom'},
          {name:'总用电量',prop:'elecSum',sort:'custom'},
          {name:'照明用电',prop:'zmElec',sort:'custom'},
          {name:'空调用电',prop:'zmElec',sort:'custom'},
          {name:'特殊用电',prop:'tsElec',sort:'custom'},
          {name:'其他用电',prop:'tsElec',sort:'custom'},
          {name:'动力用电',prop:'dlElec',sort:'custom'},
          {name:'总用水量',prop:'waterSum',sort:'custom'},
          {name:'生活用水',prop:'shWater',sort:'custom'},
          {name:'生活污水',prop:'wsWater',sort:'custom'},
          {name:'空调用水',prop:'ktWater',sort:'custom'},
          {name:'消防用水',prop:'xfWater',sort:'custom'},
          {name:'其他用水',prop:'qtWater',sort:'custom'}]
        res.dataList=res.value
        this.tableData=res
      },
      sortTable(column){
        this.rankType = column.prop
        this.rank=column.order=='ascending'?'asc':'desc'
        this.getEnergyRanking()
      },
      handleCurrentChange(value){
        this.curPage=value
        this.getEnergyRanking()
      },
      getData(){
        this.getEnergyOverView()
        this.getEnergyRanking()
      }
    },
    mounted(){
      this.getData()
    }
  }
</script>

<style lang="less">
  .rank-energy{
    margin-top: 85px;
    padding:20px;
    background: #f2f2f2;
    .out-box{
      width: 100%;
      background: @white;
      border:1px solid #ccc;
      border-radius: 10px;
    }
    .select-box{
      /*padding:*/
      width: 70%;
    }
    .condition-select{
      border:none;
    }
    .rank-box{
      width:24%;
      border:1px solid #ccc;
      border-radius: 10px;
      height:300px;
      margin-top: 20px;
      background: @white;
      flex-direction: column;
    }
    .rank-tip{
      font-size: 24px;
    }
    .rank-value{
      font-size: 50px;
      span{
        margin-left: 14px;
        font-size: 22px;
      }
    }
    .table-box{
      border-radius: 10px;
      border:1px solid #ccc;
      margin-top: 30px;
      padding:5px;
      background: @white;
      overflow: hidden;
    }
  }
</style>
