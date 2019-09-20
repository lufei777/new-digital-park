<template>
  <div class="tbhb-analysis">
    <div class="left-zoom-nav">
      <ZoomNavigation :floorList="floorList" :defaultChecked="defaultChecked" />
    </div>
    <div class="right-content">
      <ConditionSelect :isGroup="false" :showEnergy="true"/>
      <div ref="myChart" :class="curModule==3?'hide':'my-chart'"></div>
      <div class="flex-align-around" v-if="curModule==3">
        <div ref="myChart1" class="my-chart category-chart"></div>
        <div ref="myChart2" class="my-chart category-chart"></div>
      </div>
      <div class="table-box">
        <CommonTable :tableObj="tableData" :curPage="curPage" :showExportBtn="true"/>
      </div>
    </div>
  </div>

</template>

<script>
  import {mapState} from 'vuex'
  import CommonApi from '../../../service/api/commonApi'
  import EnergyApi from '../../../service/api/energyApi'
  import ZoomNavigation from '../../../components/zoomNavigation/index'
  import ConditionSelect from '../../../components/conditionSelect/index'
  import ChartUtils from '../../../utils/chartUtils'
  import CommonTable from '../../../components/commonTable/index'
  export default {
    name:'TbhbAnalysis',
    components: {
      ZoomNavigation,
      ConditionSelect,
      CommonTable
    },
    data () {
      return {
        floorList:[],
        curPage:1,
        rankType:'dqzh',
        myChart:'',
        tableData:{
          total:0
        },
        defaultChecked:[],
        rank:'asc',
        seq:0,
        myChart1:'',
        myChart2:''
      }
    },
    computed: {
      ...mapState({
        checkedFloorList: state => state.conditionSelect.tbhbCheckedFloorList,
        energy: state => state.conditionSelect.tbhbEnergy,
        selectType: state => state.conditionSelect.tbhbSelectType,
        radioType: state => state.conditionSelect.tbhbRadioType,
        startTime: state => state.conditionSelect.tbhbStartTime,
        lastTime: state => state.conditionSelect.tbhbLastTime,
        curModule:state => state.conditionSelect.curModule
      }),
      floorNameList() {
          return this.checkedFloorList.map((item)=>item.name).join('、')
      },
      commonParams() {
        return {
          floorId: this.checkedFloorList[0].id,
          catalog: this.energy[0].id,
          selectType: this.selectType,
          redioType: this.radioType,
          startTime: this.startTime,
          lastTime: this.lastTime,
          floor:this.checkedFloorList[0].id //能耗展示字段名是floor
        }
      },
      tableTip(){
        if(this.curModule==1){
          return `A3${this.energy[0].name}明细展示排名`
        }else if(this.curModule==2){
          let lastTime = this.lastTime?'至'+this.lastTime:''
          return `${this.startTime}${lastTime}${this.energy[0].name}排名`
        }else if(this.curModule==3){
          return `用${this.energy[0].name}分项能耗展示排名`
        }
      }
    },
    methods: {
      async getAllFloor(){
        let res  = await CommonApi.getAllFloorOfA3()
        let tmp=[res[0]]
        tmp[0].disabled=true
        res.shift()
        tmp[0].nodes=res
        this.floorList = tmp
        this.defaultChecked =[{id:res[0].floorId,name:res[0].floor}]
        this.$store.commit('conditionSelect/tbhbCheckedFloorList',this.defaultChecked)
      },
      getData(){
        if(this.checkedFloorList.length==0){
          this.$message({
            message: '请先选择楼层',
            type: 'warning',
            duration:800,
            center:true
          });
          return;
        }
        this.curPage=1
        this.tableData={total:0}
        if(this.curModule==1){
          this.getTbhbChart()
          this.getTbhbTable()
        }else if(this.curModule==2){
          this.getTimeEnergyChart()
          this.getTimeEnergyTable()
        }else if(this.curModule==3){
          this.getCategoryEnergyChart()
          this.getCategoryEnergyTable()
        }
      },
      async getTbhbChart(){
        let res = await CommonApi.getTbhbChart(this.commonParams)
        this.initChart(res)

      },
      async getTbhbTable(){
        let tableParams = {...this.commonParams,...{
            rankType:this.rankType,
            rank:this.rank,
            page:this.curPage,
            size:10,
          }
        }
        let res = await CommonApi.getTbhbTable(tableParams)
        if(res && res.total){
          res.labelList=[{name:'排名',prop:'xulie',sort:false},
                        {name:'当期综合能耗(kwh)',prop:'date',sort:false},
                        {name:'同期综合能耗(kwh)',prop:'dqzh',sort:'custom'},
                        {name:'上期综合能耗(kwh)',prop:'tqzh',sort:'custom'},
                        {name:'综合能耗同比增长率(%)',prop:'tbzz',sort:'custom'},
                        {name:'综合能耗环比增长率(%)',prop:'hbzz',sort:'custom'}]
          res.dataList=res.value
          res.tableTip=this.tableTip
          this.tableData=res
        }
      },
      initChart(res) {
        this.myChart = echarts.init(this.$refs.myChart);
        let xAxis
        if(this.selectType==3 && this.radioType==0){
          xAxis = res.value.map((item)=>item.date.slice(0,16))
        }else{
          xAxis = res.value.map((item)=>item.date.slice(0,10))
        }
        let dqzh={
          name:'当期综合能耗',
          type:'bar',
          data:res.value.map((item)=>item.dqzh)
        }
        let tqzh={
          name:'同期综合能耗',
          type:'bar',
          data:res.value.map((item)=>item.tqzh)
        }
        let tbzz={
          name:'综合能耗同比增长率',
          type:'line',
          data:res.value.map((item)=>item.tbzz)
        }
        let data=res.value.map((item)=>item.hbzz)
        let hbzz={
          name:'综合能耗环比增长率',
          type:'line',
          data
        }
        let series=[dqzh,tqzh,tbzz,hbzz]
        let titleText=`A3${this.energy[0].name}同比环比柱状折线图`
        let legendData=['当期综合能耗','同期综合能耗','综合能耗同比增长率','综合能耗环比增长率']
        let yAxis =res.unit
        let data2={
          titleText,
          legendData,
          xAxis,
          yAxis,
          series
        }
          ChartUtils.handleBarChart(this.myChart,data2)
      },
      handleCurrentChange(value){
        this.curPage=value
        if(this.curModule==1){
          this.getTbhbTable()
        }else{
          this.getTimeEnergyTable()
        }
      },
      sortTable(column){
         this.seq = column.prop == 'shijian' ? 0 : 1
         this.rank=column.order=='ascending'?'asc':'desc'
        if(this.curModule==1){
          this.getTbhbTable()
        }else{
          this.getTimeEnergyTable()
          this.getCategoryEnergyTable()
        }
      },
      async handleExport(){
        let url
        if(this.curModule==1){
          url = `${window.gateway}/vibe-web/energyCount/energy/energy_comseqExcel?`
          console.log(url)
        }else if(this.curModule==2){
          url = `${window.gateway}/vibe-web/energyCount/energy/energy_fenshiBiaoExcel?`
        }else if(this.curModule==3){
          url = `${window.gateway}/vibe-web/energyCount/energy/energy_fenxiangBiaoExcel?`
        }
        let params=''
        for(let key in this.commonParams){
          params+=key+'='+this.commonParams[key]+'&'
        }
        params+='rankType='+this.rankType+'&rank='+this.rank+'&seq='+this.seq
        location.href=url+params
      },
      async getTimeEnergyChart(){
        let res = await EnergyApi.getTimeEnergyChart(this.commonParams)
        this.initTimeEnergyChart(res)
      },
      async getTimeEnergyTable(){
        let tableParams = {...this.commonParams,...{
            seq:this.seq,
            rank:this.rank,
            page:this.curPage,
            size:10,
          }
        }
        let res = await EnergyApi.getTimeEnergyTable(tableParams)
        if(!res|| !res.total){
          res={
            list:[],
            total:[]
          }
        }
        res.labelList=[{name:'排名',prop:'xuhao'},
                      {name:'时间',prop:'shijian',sort:'custom'},
                      {name:this.energy[0].name,prop:'yongdianlaing',sort:'custom'}]
        res.dataList=res.list
        res.tableTip=this.tableTip
        this.tableData=res
      },
      initTimeEnergyChart(res){
        this.myChart = echarts.init(this.$refs.myChart);
        let titleText =`${this.startTime}${this.energy[0].name}柱状图`
        let legendData = []
        let xAxis
        if(this.selectType==3 && this.radioType==0){
          xAxis = res.map((item)=>item.time.slice(0,16))
        }else{
          xAxis = res.map((item)=>item.time.slice(0,10))
        }
        let yAxis=res[0] && res[0].unit
        let series=[]
          series.push({
            name:this.energy[0].name,
            type:'bar',
            data:res.map((item)=>item.value)
        })
        let data={
          titleText,
          legendData,
          xAxis,
          yAxis,
          series
        }
        ChartUtils.handleBarChart(this.myChart,data)
      },
      async getCategoryEnergyChart(){
        let res = await EnergyApi.getCategoryEnergyChart(this.commonParams)
        this.initCategoryChart(res)
        this.initCategoryPieChart(res)
      },
      async getCategoryEnergyTable(){
        let tableParams = {...this.commonParams,...{
            page:this.curPage,
            size:10,
          }
        }
        let res = await EnergyApi.getCategoryEnergyTable(tableParams)
        if(!res || !res.total){
          res={
            value:[],
            total:0
          }
        }
        res.labelList=[{name:'排名',prop:'xulie'},
                      {name:'能耗类型',prop:'name'},
                      {name:'数值',prop:'value'},
                      {name:'占比',prop:'zhanbi'}]
        res.dataList=res.value
        res.tableTip=this.tableTip
        this.tableData=res
      },
      initCategoryChart(res){
        let myChart1 = echarts.init(this.$refs.myChart1);
        let titleText =`用${this.energy[0].name}分项能耗统计`
        let legendData = []
        let xAxis = res.map((item)=>item.name)
        let yAxis=res[0] && res[0].unit
        let series=[]
        series.push({
          type:'bar',
          data:res.map((item)=>item.value)
        })
        let data={
          titleText,
          legendData,
          xAxis,
          yAxis,
          series
        }
        ChartUtils.handleBarChart(myChart1,data)


      },
      initCategoryPieChart(res){
        let myChart2 = echarts.init(this.$refs.myChart2);
        let titleText =`用${this.energy[0].name}分项能耗占比分析`
        let legendData = res.map((item)=>item.name)
        let series=[]
        res.map((item)=>{
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
      }
    },
    async mounted(){
       await this.getAllFloor()
       this.getData()
    }
  }
</script>

<style lang="less">
  .tbhb-analysis{
    width:100%;
    .table-box,.my-chart{
      border-radius: 10px;
      border:1px solid #ccc;
      margin-top: 30px;
      padding:5px;
      background: @white !important;
      overflow: hidden;
    }
    .my-chart{
      /*width: 100%;*/
      height:450px;
      padding-top:20px;
    }
    .export-btn{
      margin-right: 10px;
    }
    .category-chart{
      width:48%;
    }
    .table-box{
      clear: both;
    }
    .hide{
      height:0;
      padding:0;
      border:none;
    }
    /*.el-table th div{*/
      /*padding-left:0;*/
    /*}*/
  }
</style>
