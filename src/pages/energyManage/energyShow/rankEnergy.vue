<template>
  <div class="rank-energy">
    <div class="out-box radius-shadow">
        <ConditionSelect :showEnergy="false" :get-data-flag="getDataFlag"/>
    </div>
    <div class="flex-align-between" v-if="!iszg">
      <div class="rank-box radius-shadow flex-align-center">
        <h4 class="rank-tip">总用电量</h4>
        <span class="rank-value">{{overViewData.elecSum}}<span>kwh</span></span>
      </div>
      <div class="rank-box radius-shadow flex-align-center">
        <h4 class="rank-tip">总用水量</h4>
        <span class="rank-value">{{overViewData.waterSum}}<span>m³</span></span>
      </div>
      <div class="rank-box radius-shadow my-chart" ref="myChart1"></div>
      <div class="rank-box radius-shadow my-chart" ref="myChart2"></div>
    </div>
    <div class="flex" v-if="iszg">
      <div class="rank-box radius-shadow flex-align-center" style="margin-right: 1%;width:49%">
      <h4 class="rank-tip">总用电量</h4>
      <span class="rank-value">{{overViewData.elecSum}}<span>kwh</span></span>
      </div>
      <div class="rank-box radius-shadow flex-align-center" style="width:50%">
      <h4 class="rank-tip">总用水量</h4>
      <span class="rank-value">{{overViewData.waterSum}}<span>m³</span></span>
      </div>
    </div>
    <div class="table-box radius-shadow">
      <div class="table-tip">{{commonTip}}能耗展示排名</div>
      <z-table :ref="tableConfig.ref" :options="tableConfig"></z-table>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import ChartUtils from '../../../utils/chartUtils'
  import EnergyApi from '../../../service/api/energy'
  import ConditionSelect from '../../../components/conditionSelect/index'
  import {isZG} from '@/utils/project';
  export default {
    name: 'TimeEnergy',
    components: {
      ConditionSelect
    },
    data () {
      let _this = this
      return {
        overViewData:{},
        rankType:'elecAndWaterSum',
        rank:'desc',
        curPage:1,
        tableData:{},
        selectParams:{},
        getDataFlag:false,
        tableConfig:{
          ref: "tableRef",
          data:[],
          columnConfig:[],
          uiConfig: {
            height: "auto",
            pagination: {
              layout: "total,->, prev, pager, next, jumper",
              handler(pageSize,currentPage,table){
                _this.handleCurrentChange(currentPage)
              }
            }
          },
          tableMethods: {
            sortChange: _this.sortTable
          }
        },
      }
    },
    computed:{
      commonTip(){
        return `${this.selectParams.startTime}${this.selectParams.lastTime?'至'+this.selectParams.lastTime:''}`
      },
      iszg(){
        return isZG();
      }
    },
    methods: {
      async getEnergyOverView(){
        this.overViewData = await EnergyApi.getEnergyOverView(this.selectParams)
        if(!this.iszg){
          this.initElecChart(this.overViewData)
          this.initWaterChart(this.overViewData)
        }
      },
      initElecChart(res){
        let myChart1 = this.$echarts.init(this.$refs.myChart1);
        let titleText =`${this.commonTip}分项耗电占比分析`
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
          titleUi:{
            textStyle:{
              color:'#008DEA'
            },
          },
          legendData,
          seriesData:series,
          seriesUi:{
            radius:['15%',"60%"],
            roseType:'radius',
            label:{
              emphasis: {
                show:false
              }
            }
          },
          color:['#4DA1FF', '#83D587', '#FFCE33', '#FF7B8C','#66fbf9',"#dab54c"]
        }
        ChartUtils.hollowPieChart(myChart1,data)
      },
      initWaterChart(res){
        let myChart2 = this.$echarts.init(this.$refs.myChart2);
        let titleText =`${this.commonTip}分项耗水占比分析`
        // let legendData=['生活用水','生活污水','空调用水','消防用水','其他用水']
        let legendData = res.waterList && res.waterList.map((item)=>item.name)
        let series=[]
        // series=[{
        //   name:'生活用水',
        //   value:0
        // },{
        //   name:'生活污水',
        //   value:0
        // },{
        //   name:'空调用水',
        //   value:0
        // },{
        //   name:'消防用水',
        //   value:0
        // },{
        //   name:'其他用水',
        //   value:0
        // }]
        res.waterList && res.waterList.map((item)=>{
          series.push({
            name:item.name,
            value:item.value
          })
        })
        let data={
          titleText,
          titleUi:{
            textStyle:{
              color:'#008DEA'
            },
          },
          legendData,
          seriesData:series,
          seriesUi:{
            radius:['15%',"60%"],
            roseType:'radius',
            label:{
              emphasis: {
                show:false
              }
            }
          },
          color:['#4DA1FF', '#83D587', '#FFCE33', '#FF7B8C','#66fbf9',"#dab54c"]
        }
        ChartUtils.hollowPieChart(myChart2,data)
      },
      async getEnergyRanking(){
        let params = {...this.selectParams,...{
            page: this.curPage,
            rankType: this.rankType,
            size: 10,
            rank: this.rank
          }}
        let res = await EnergyApi.getEnergyRanking(params)
        this.tableConfig.columnConfig = [
          {label:'排名', prop:'xulie'},
          {label: '建筑楼层', prop:'floor'},
          {label:'总用电量',prop:'elecSum',sortable:'custom'},
          // {label:'照明用电',prop:'zmElec',sortable:'custom'},
          // {label:'空调用电',prop:'zmElec',sortable:'custom'},
          // {label:'特殊用电',prop:'tsElec',sortable:'custom'},
          // {label:'其他用电',prop:'tsElec',sortable:'custom'},
          // {label:'动力用电',prop:'dlElec',sortable:'custom'},
          {label:'总用水量',prop:'waterSum',sortable:'custom'},
          // {label:'生活用水',prop:'shWater',sortable:'custom'},
          // {label:'生活污水',prop:'wsWater',sortable:'custom'},
          // {label:'空调用水',prop:'ktWater',sortable:'custom'},
          // {label:'消防用水',prop:'xfWater',sortable:'custom'},
          // {label:'其他用水',prop:'qtWater',sortable:'custom'}
          ]
         this.tableConfig.data=res.value
         this.tableConfig.uiConfig.pagination.total = res.total
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
      getData(params){
        this.selectParams = params
        this.getEnergyOverView()
        this.getEnergyRanking()
      }
    },
    mounted(){
      this.getDataFlag=true
    }
  }
</script>

<style lang="less">
  .rank-energy{
    .out-box{
      width: 100%;
      background: @white;
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
      border-radius: 10px;
      height:300px;
      margin-top: 20px;
      background: @white;
      flex-direction: column;
    }
    .rank-tip{
      font-size: 24px;
      margin:5px 0;
    }
    .rank-value{
      font-size: 50px;
      span{
        margin-left: 14px;
        font-size: 22px;
      }
    }
    .table-box{
      margin-top: 20px;
      padding:20px;
      background: @white;
      overflow: hidden;
    }
    .my-chart{
      padding:10px;
      box-sizing: border-box;
    }
    .table-tip{
      color:@mainBgColor;
      font-weight: bold;
      margin-bottom:20px;
    }
  }
</style>
