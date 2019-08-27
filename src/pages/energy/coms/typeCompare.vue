<template>
  <div class="type-compare">
    <div class="left-zoom-nav">
      <ZoomNavigation :floorList="floorList" :defaultChecked="defaultChecked" />
    </div>
    <div class="right-content">
      <ConditionSelect :isGroup="true" :showEnergy="true"/>
      <div ref="myChart" class="my-chart"></div>
      <DynamicTable :tableData="tableData" :tableTip="tableTip" :curPage="curPage"/>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {mapState} from 'vuex'
  import ChartUtils from '../../../utils/chartUtils'
  import CommonApi from '../../../service/api/commonApi'
  import ZoomNavigation from '../../../components/zoomNavigation/index'
  import ConditionSelect from '../../../components/conditionSelect/index'
  import DynamicTable from '../../../components/dynamicTable/index'
  export default {
    name:'TypeCompare',
    components: {
      ZoomNavigation,
      ConditionSelect,
      DynamicTable
    },
    data () {
      return {
        floorList:[],
        tableData:{
          total:0
        },
        showChart:false,
        myChart:'',
        curPage:1,
        defaultChecked:[]
      }
    },
    computed: {
      ...mapState({
        checkedFloorList: state => state.conditionSelect.typeCheckedFloorList,
        energy: state => state.conditionSelect.typeEnergy,
        selectType: state => state.conditionSelect.typeSelectType,
        radioType: state => state.conditionSelect.typeRadioType,
        startTime: state => state.conditionSelect.typeStartTime,
        lastTime: state => state.conditionSelect.typeLastTime,
      }),
      ids(){
        return this.energy.map((item)=>item.id).join(',') //能源子类型
      },
      catalogId(){
        return this.energy[0].parent
      },
      energyNameList(){
        return this.energy.map((item)=>item.name).join('与')
      },
      tableTip(){
        return `A3${this.energyNameList}展示排名`
      },
      floorId(){
          return this.checkedFloorList[0].id //楼层id
      },
      commonParams(){
        return {
          ids:this.ids,
          catalog:this.catalogId,
          selectType:this.selectType,
          redioType:this.radioType,
          startTime:this.startTime,
          lastTime:this.lastTime,
          parent:1, //代表a3
          floorId:this.floorId
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
        this.$store.commit('conditionSelect/typeCheckedFloorList',this.defaultChecked)
      },
      async getTypeChart(){
        let res =  await CommonApi.getTypeChart(this.commonParams)
        this.showChart=true
        this.initChart(res)
      },
      async getTypeTable(){
        let tableParams = {...this.commonParams,...{
            page:this.curPage,
            size:10
          }
        }
        let res = await CommonApi.getTypeTable(tableParams)
        if(res && res.value){
          res.value.map((item)=>{
            if(item[1])
              item[1]=item[1].slice(0,10)
          })
          this.tableData=res
        }
      },
      getData(){
        if(!this.floorId){
          this.$message({
            message: '请先选择楼层',
            type: 'warning',
            duration:800,
            center:true
          });
          return;
        }else if(this.energy.length==0){
          this.$message({
            message: '请先选择能源',
            type: 'warning',
            duration:800,
            center:true
          });
          return;
        }else if(this.energy.length==1){
          this.$message({
            message: '请至少选择两个能源',
            type: 'warning',
            duration:800,
            center:true
          });
          return;
        }
         this.curPage=1
         this.tableData={total:0}
         this.getTypeChart()
         this.getTypeTable()
      },
      initChart(res){
        this.myChart = echarts.init(this.$refs.myChart);
        let titleText =`A3${this.energyNameList}趋势对比`
        let xAxis = []
        if(this.selectType==3 && this.radioType==0){
          xAxis= res[0].map(item=>item.time?item.time.slice(0,16):'')
        }else{
          xAxis= res[0].map(item=>item.time?item.time.slice(0,10):'')
        }
        let legendData = this.energyNameList.split("与")
        let yAxis =  res[0] && res[0][0] && res[0][0].unit
        let series=[]
        let tmp
        res.map((item,index)=>{
          tmp = item.map((everyDay)=>everyDay.value)
          series.push({
            name:item[index] && item[index].name,
            type:'bar',
            data:tmp
          })
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
      handleCurrentChange(value){
        this.curPage=value
        this.getTypeTable()
      },
      async handleExport(){
        let url="http://localhost:8080/vibe-web/energyCount/energy/energy_typeBiaoExcel?"
        let params=''
        for(let key in this.commonParams){
          params+=key+'='+this.commonParams[key]+'&'
        }
        location.href=url+params
      }
    },
    async mounted(){
      await this.getAllFloor()
      this.getData()
    }
  }
</script>

<style lang="less">
  .type-compare {
    width: 100%;
    .my-chart{
      border-radius: 10px;
      border:1px solid #ccc;
      margin-top: 30px;
      background: @white;
      overflow: hidden;
      width: 100%;
      height:450px;
      padding:20px 5px 5px 5px;
    }
  }
</style>
