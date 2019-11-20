<template>
  <div class="zoom-compare">
      <!--<div class="left-zoom-nav">-->
        <!--<ZoomNavigation :floorList="floorList" :defaultChecked="defaultChecked"/>-->
      <!--</div>-->
      <!--<div class="right-content">-->
        <!--<ConditionSelect :isGroup="false" :showEnergy="true"/>-->
        <!--<div ref="myChart" class="my-chart radius-shadow"></div>-->
        <!--<DynamicTable :tableData="tableData" :tableTip="tableTip" :curPage="curPage" />-->
        <!--&lt;!&ndash;<ThirdPartyVideo videoUrl="videoUrl"/>&ndash;&gt;-->
      <!--</div>-->
     <EnergyCommon :isZoomMultiple="true" :fromFlag="1"/>
  </div>
</template>

<script>
  import echarts from 'echarts'
  import {mapState} from 'vuex'
  import CommonApi from '../../../service/api/commonApi'
  import ChartUtils from '../../../utils/chartUtils'
  import ZoomNavigation from '../../../components/zoomNavigation'
  import ConditionSelect from '../../../components/conditionSelect'
  import DynamicTable from '../../../components/dynamicTable'
  import ThirdPartyVideo from '../../../components/thirdPartyVideo'
  import EnergyCommon from './energyCommon'
  export default {
    name:'ZoomCompare',
    components: {
      ZoomNavigation,
      ConditionSelect,
      DynamicTable,
      EnergyCommon
      // ThirdPartyVideo
    },
    data () {
      return {
        floorList:[],
        tableData:{
          total:0
        },
        myChart:'',
        curPage:1,
        defaultChecked:[],
      }
    },
    computed: {
      ...mapState({
        checkedFloorList: state => state.conditionSelect.checkedFloorList,
        energy: state => state.conditionSelect.energy,
        selectType: state => state.conditionSelect.selectType,
        radioType: state => state.conditionSelect.radioType,
        startTime: state => state.conditionSelect.startTime,
        lastTime: state => state.conditionSelect.lastTime,
      }),
      floorNameList(){
          return this.checkedFloorList.map((item)=>item.name).join('、')
      },
      ids(){
        return this.checkedFloorList.map((item)=>item.id).join(',') //楼层id
      },
      tableTip(){
        return `A3${this.floorNameList}${this.energy[0].name}展示排名`
      },
      commonParams(){
        return {
          ids:this.ids,//楼层id
          catalog:this.energy[0].id,
          selectType:this.selectType,
          redioType:this.radioType,
          startTime:this.startTime,
          lastTime:this.lastTime
        }
      }
    },
    methods: {
      async getAllFloor(){
        let res  = await CommonApi.getAllFloorOfA3()
        let tmp=[res[0]]
        tmp[0].disabled=true
        res.shift()
        res.map((item)=>{
          item.disabled=false
        })
        tmp[0].nodes=res
        this.floorList = tmp
        this.defaultChecked =[{id:res[0].floorId,name:res[0].floor},
                              {id:res[1].floorId,name:res[1].floor}]
        //若放入子组件存到checkedFloorList无法及时获取
        this.$store.commit('conditionSelect/checkedFloorList',this.defaultChecked)
        this.handleNavCanCheck(this.defaultChecked)
      },
      async getZoomCompareChart(){
        let res =  await CommonApi.getZoomCompareChart(this.commonParams)
        this.initChart(res)
      },
      async getZoomCompareTable(){
        let tableParams = {...this.commonParams,...{
            page:this.curPage,
            size:10
          }
        }
        let res = await CommonApi.getZoomCompareTable(tableParams)
        if(res && res.value){
          res.value.map((item)=>{
            if(item[1])
             item[1]=item[1].slice(0,10)
          })
          this.tableData=res
        }
      },
      async getData(){
        if(this.ids==""){
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
         await this.getZoomCompareChart()
         await this.getZoomCompareTable()
      },
      initChart(res){
        this.myChart = echarts.init(this.$refs.myChart);
        let titleText =`A3${this.floorNameList}${this.energy[0].name}趋势对比`
        let legendData = this.floorNameList.split("、")
        let xAxis
        if(this.selectType==3 && this.radioType==0){
          xAxis = res[0].map((item)=>item.time.slice(0,16))
        }else{
          xAxis = res[0].map((item)=>item.time.slice(0,10))
        }
        let yAxis=res[0] && res[0][0]&& res[0][0].unit
        let series=[]
        let tmp
        res.map((item,index)=>{
          tmp = item.map((everyFloor)=>everyFloor.value)
          series.push({
            name:item[index] && item[index].floor,
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
         this.getZoomCompareTable()
      },
      handleNavCanCheck(checkNode){
        if(checkNode.length<4){
          this.floorList[0].nodes.map((item)=>{
             item.disabled=false
          })
        }else{
          this.floorList[0].nodes.map((item)=>{
            item.disabled=true
            checkNode.map((check)=>{
               if(item.floorId==check.floorId){
                  item.disabled=false
               }
            })
          })
          return;
        }
      },
      async handleExport(){
        let url=`/vibe-web/energyCount/energy/energy_speceExcle?`
        let params=''
        for(let key in this.commonParams){
          params+=key+'='+this.commonParams[key]+'&'
        }
        location.href=url+params
      }
    },
    async mounted(){
      // await this.getAllFloor()
      // this.getData()
    }
  }
</script>

<style lang="less">
 .zoom-compare {
   width: 100%;
 }
</style>
