<template>
  <div class="energy-common">
    <ZoomNavigation :floorList="floorList"
                    :defaultChecked="defaultChecked"
                    :isMultiple="isZoomMultiple"
                    :fromFlag="fromFlag"
                    :selectCallBack="selectZoomCallBack"
    />
    <div class="right-content">
      <ConditionSelect :isGroup="isEnergyByGroup" :showEnergy="true" :fromFlag="fromFlag" :getDataFlag="getDataFlag"/>
      <div ref="myChart" :class="fromFlag==5?'hide':'my-chart radius-shadow'"></div>
      <div class="flex-align-around radius-shadow two-chart" v-if="fromFlag==5">
        <div ref="myChart1" class="my-chart category-chart"></div>
        <div ref="myChart2" class="my-chart category-chart"></div>
      </div>
      <div class="table-box radius-shadow">
        <div class="flex-align-between table-tip-box">
          <div class="table-tip">{{tableTip}}</div>
          <el-button type="primary" @click="onClickExportBtn" v-if="tableConfig.data.length">导出表格</el-button>
        </div>
        <Table :ref="tableConfig.ref" :tableConfig="tableConfig"></Table>
      </div>
    </div>
  </div>

</template>

<script>
  import {mapState} from 'vuex'
  import CommonApi from '../../../service/api/commonApi'
  import EnergyApi from '../../../service/api/energyApi'
  import ZoomNavigation from '../../../components/zoomNavigation'
  import ConditionSelect from '../../../components/conditionSelect'
  import ChartUtils from '../../../utils/chartUtils'
  import Table from '../../../components/Table/index'
  export default {
    name:'EnergyCommon',
    components: {
      ZoomNavigation,
      ConditionSelect,
      Table,
    },
    //fromFlag 1:空间管理 2:同比环比分析 3:能耗对比 4:分时能耗 5:分项能耗
    props:['isZoomMultiple','fromFlag','isEnergyByGroup'],
    data () {
      let _this = this
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
        myChart2:'',
        checkedFloorList:[],
        getDataFlag:false,
        selectParams:{
          energy:[{name:''}]
        },
        tableConfig:{
          ref: "tableRef",
          data:[],
          columnConfig:[],
          uiConfig: {
            height: "auto",//"", //高度
            pagination: {
              //是否分页，分页是否自定义
              layout: "total,->, prev, pager, next, jumper",
              pageSizes: [10, 20, 50],
              handler(pageSize,currentPage,table){
                // console.log(pageSize,currentPage,table)
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
    computed: {
      floorNameList() {
        return this.checkedFloorList.map((item)=>item.name).join('、')
      },
      energyNameList(){
        return this.selectParams.energy.map((item)=>item.name).join('、')
      },
      tableTip(){
        if(this.fromFlag==1 ||this.fromFlag==2 ||this.fromFlag==4){
          return `${this.tmpCommonTip}展示排名`
        }else if(this.fromFlag==3){
          return `${this.tmpCommonTip}分项能耗展示排名`
        }else if(this.fromFlag==5){
          return `${this.floorNameList}${this.selectParams.startTime}`+
            `${this.selectParams.lastTime?'至'+this.selectParams.lastTime:''}用${this.selectParams.energy[0].name}分项展示排名`
        }
      },
      floorId(){
        return this.checkedFloorList.map((item)=>item.id).join(',')
      },
      tmpCommonTip(){
        return `${this.floorNameList}${this.selectParams.startTime}`+
          `${this.selectParams.lastTime?'至'+this.selectParams.lastTime:''}${this.energyNameList}`
      }
    },
    watch:{
      fromFlag(){
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
        if(this.fromFlag==1){
          this.defaultChecked =[{id:res[0].floorId,name:res[0].floor},
                                {id:res[1].floorId,name:res[1].floor}]
          this.checkedFloorList=[{id:res[0].floorId,name:res[0].floor},
                                 {id:res[1].floorId,name:res[1].floor}]
        }else{
          this.checkedFloorList=[{id:res[0].floorId,name:res[0].floor}]
        }
        this.getDataFlag=true
      },
      getData(params){
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
        this.selectParams=params
        if(this.fromFlag==1){
            this.commonParams={...{
                ids:this.floorId,
                catalog:params.energy.map((item)=>item.id).join(',')
              },...params
            }
           this.getZoomCompareChart()
           this.getZoomCompareTable()
        }else if(this.fromFlag==2){
           this.commonParams={...{
              floorId: this.floorId,
              catalog:params.energy.map((item)=>item.id).join(',')
            },...params
           }
           this.getTbhbChart()
           this.getTbhbTable()
        }else if(this.fromFlag==3){
          this.commonParams={...{
              floorId: this.floorId,
              catalog:params.energy[0].parent,
              ids:params.energy.map((item)=>item.id).join(','),
              parent:1 //必传代表
            },...params
          }
          this.getTypeChart()
          this.getTypeTable()
        }else if(this.fromFlag==4){
          this.commonParams={...{
              floor: this.floorId,
              catalog:params.energy[0].id,
            },...params
          }
          this.getTimeEnergyChart()
          this.getTimeEnergyTable()
        }else if(this.fromFlag==5){
          this.commonParams={...{
              floor: this.floorId,
              catalog:params.energy[0].id,
            },...params
          }
          this.getCategoryEnergyChart()
          this.getCategoryEnergyTable()
        }
      },
      async getZoomCompareChart(){
        let res =  await CommonApi.getZoomCompareChart(this.commonParams)
        console.log("res",res)
        this.initZoomChart(res)
      },
      initZoomChart(res){
        this.myChart = echarts.init(this.$refs.myChart);
        let titleText = `${this.tmpCommonTip}趋势对比`
        let legendData = this.floorNameList.split("、")
        let xAxis
        if(this.selectParams.selectType==3 && this.selectParams.radioType==0){
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
      async getZoomCompareTable(){
        let tableParams = {...this.commonParams,...{
            page:this.curPage,
            size:10
          }
        }
        let res = await CommonApi.getZoomCompareTable(tableParams)
        if(res && res.value) {
          let tmp=[]
          res.value.map((item)=>{
            item[1]=item[1].slice(0,10)
            let obj={}
            res.title.map((tit,index)=>{
              if(tit=="占比(%)"){
                obj[tit+index]=item[index]
              }else{
                obj[tit]=item[index]
              }
            })
            tmp.push(obj)
          })
          console.log("tmp",tmp)
          let columnConfig=[]
          for(let key in tmp[0]){
            columnConfig.push({
              label:key.indexOf('占比')!=-1?'占比(%)':key,
              prop:key
            })
          }
          this.tableConfig.columnConfig=columnConfig
          this.tableConfig.data=tmp
          this.tableConfig.uiConfig.pagination.total = res.total;
        }
      },
      async getTbhbChart(){
        let res = await CommonApi.getTbhbChart(this.commonParams)
        this.initTbhbChart(res)
      },
      initTbhbChart(res) {
        this.myChart = echarts.init(this.$refs.myChart);
        let xAxis
        if(this.selectParams.selectType==3 && this.selectParams.radioType==0){
          xAxis = res.value.map((item)=>item.date.slice(0,16))
        }else if(this.selectParams.selectType==2 && this.selectParams.radioType==1){
          xAxis = res.value.map((item)=>item.date.slice(0,7))
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
          yAxisIndex: 1,
          data:res.value.map((item)=>item.tbzz)
        }
        let data=res.value.map((item)=>item.hbzz)
        let hbzz={
          name:'综合能耗环比增长率',
          type:'line',
          yAxisIndex: 1,
          data,
          formatter: '{c} %'
        }
        let series=[dqzh,tqzh,tbzz,hbzz]
        let titleText=`${this.tmpCommonTip}同比环比柱状折线图`
        let legendData=['当期综合能耗','同期综合能耗','综合能耗同比增长率','综合能耗环比增长率']
        let yAxis =res.unit
        let data2={
          titleText,
          legendData,
          xAxis,
          yAxis,
          series,
          showSecondY:true
        }
        let option={
          yAxis: [{
            type: 'value',
            name: '能耗(kwh)',
            axisLabel: {
              formatter: '{value} kwh'
            }
          },
            {
              show: true,
              type: 'value',
              name: '增长率',
              min: -100,
              max: 100,
              axisLabel: {
                formatter: '{value} %'
              }
            }
          ],
        }
        ChartUtils.handleBarChart(this.myChart,data2)
        this.myChart.setOption(option)
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
        this.tableConfig.columnConfig = [{label:'排名',prop:'xulie'},
          {label:'当期综合能耗(kwh)',prop:'date'},
          {label:'同期综合能耗(kwh)',prop:'dqzh',sortable:'custom'},
          {label:'上期综合能耗(kwh)',prop:'tqzh',sortable:'custom'},
          {label:'综合能耗同比增长率(%)',prop:'tbzz',sortable:'custom',
            formatter: function(row, column) {
              return row[column.property]+"%";
            }
          },
          {label:'综合能耗环比增长率(%)',prop:'hbzz',sortable:'custom',
            formatter: function(row, column) {
              return row[column.property]+"%";
            }
          }]
         if(res && res.value){
           this.tableConfig.data=res.value
         }
      },
      async getTypeChart(){
        let res =  await CommonApi.getTypeChart(this.commonParams)
        // this.showChart=true
        this.initTypeChart(res)
      },
      initTypeChart(res){
        this.myChart = echarts.init(this.$refs.myChart);
        let titleText =`${this.tmpCommonTip}趋势对比`
        let xAxis = []
        if(this.selectType==3 && this.radioType==0){
          xAxis= res[0].map(item=>item.time?item.time.slice(0,16):'')
        }else{
          xAxis= res[0].map(item=>item.time?item.time.slice(0,10):'')
        }
        let legendData = this.selectParams.energy.map((item)=>item.name)
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
      async getTypeTable(){
        let tableParams = {...this.commonParams,...{
            page:this.curPage,
            size:10
          }
        }
        let res = await CommonApi.getTypeTable(tableParams)
        if(res && res.value){
          let tmp=[]
          res.value.map((item)=>{
            item[1]=item[1].slice(0,10)
            let obj={}
            res.title.map((tit,index)=>{
              if(tit=="占比(%)"){
                obj[tit+index]=item[index]
              }else{
                obj[tit]=item[index]
              }
              // obj.name=tit
            })
            tmp.push(obj)
          })
          console.log("tmp",tmp)
          let columnConfig=[]
          // res[0].title.map((item)=>{
          //    columnConfig.push({
          //      label:item,
          //      prop:item
          //    })
          // })
          for(let key in tmp[0]){
            columnConfig.push({
              label:key.indexOf('占比')!=-1?'占比(%)':key,
              prop:key
            })
          }
          this.tableConfig.columnConfig=columnConfig
          this.tableConfig.data=tmp
          this.tableConfig.uiConfig.pagination.total = res.total;
        }
      },
      async getTimeEnergyChart(){
        let res = await EnergyApi.getTimeEnergyChart(this.commonParams)
        this.initTimeEnergyChart(res)
      },
      initTimeEnergyChart(res){
        this.myChart = echarts.init(this.$refs.myChart);
        let titleText =`${this.tmpCommonTip}柱状图`
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
          name:this.selectParams.energy[0].name,
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
      async getTimeEnergyTable(){
        let tableParams = {...this.commonParams,...{
            seq:this.seq,
            rank:this.rank,
            page:this.curPage,
            size:10,
          }
        }
        let res = await EnergyApi.getTimeEnergyTable(tableParams)
        if(res && res.list){
          this.tableConfig.columnConfig=[{label:'排名',prop:'xuhao'},
            {label:'时间',prop:'shijian',sortable:'custom'},
            {label:this.selectParams.energy[0].name,prop:'yongdianlaing',sortable:'custom'}]
          this.tableConfig.data=res.list
          this.tableConfig.uiConfig.pagination.total=res.total
        }
      },
      async getCategoryEnergyChart(){
        let res = await EnergyApi.getCategoryEnergyChart(this.commonParams)
        this.initCategoryBarChart(res)
        this.initCategoryPieChart(res)
      },
      initCategoryBarChart(res){
        let myChart1 = echarts.init(this.$refs.myChart1);
        let titleText =`${this.floorNameList}${this.selectParams.startTime}`+
          `${this.selectParams.lastTime?'至'+this.selectParams.lastTime:''}用${this.selectParams.energy[0].name}分项能耗统计`
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
        let titleText =`${this.floorNameList}${this.selectParams.startTime}`+
          `${this.selectParams.lastTime?'至'+this.selectParams.lastTime:''}用${this.selectParams.energy[0].name}分项能耗占比分析`
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
      },
      async getCategoryEnergyTable(){
        let tableParams = {...this.commonParams,...{
            page:this.curPage,
            size:10,
          }
        }
        let res = await EnergyApi.getCategoryEnergyTable(tableParams)
        if(res && res.value){
           this.tableConfig.columnConfig = [{label:'排名',prop:'xulie'},
             {label:'能耗类型',prop:'name'},
             {label:'数值',prop:'value'},
             {label:'占比',prop:'zhanbi'}]
           this.tableConfig.data=res.value
           this.tableConfig.uiConfig.pagination.total=res.total
        }
      },
      handleCurrentChange(value){
        this.curPage=value
        if(this.fromFlag==1){
          this.getZoomCompareTable()
        }else if(this.fromFlag==2){
          this.getTbhbTable()
        }else if(this.fromFlag==3){
          this.getTypeTable()
        }else if(this.fromFlag==4){
          this.getTimeEnergyTable()
        }else if(this.fromFlag==5){
          this.getCategoryEnergyTable()
        }
      },
      sortTable(column){
        console.log(column)
        this.seq = column.prop == 'shijian' ? 0 : 1
        this.rank=column.order=='ascending'?'asc':'desc'
        this.rankType=column.prop
        if(this.fromFlag==2){
          this.getTbhbTable()
        }else if(this.fromFlag==4){
          this.getTimeEnergyTable()
        }else{
          this.getCategoryEnergyTable()
        }
      },
      async onClickExportBtn(){
        debugger
        let url
        if(this.fromFlag==1){
          url=`/vibe-web/energyCount/energy/energy_speceExcle?`
        }else if(this.fromFlag==2){
          url = `/vibe-web/energyCount/energy/energy_comseqExcel?`
        }else if(this.fromFlag==3){
          url=`/vibe-web/energyCount/energy/energy_typeBiaoExcel?`
        }else if(this.fromFlag==4){
          url = `/vibe-web/energyCount/energy/energy_fenshiBiaoExcel?`
        }else if(this.fromFlag==5){
          url = `/vibe-web/energyCount/energy/energy_fenxiangBiaoExcel?`
        }
        let params=''
        for(let key in this.commonParams){
          params+=key+'='+this.commonParams[key]+'&'
        }
        params+='rankType='+this.rankType+'&rank='+this.rank+'&seq='+this.seq
        location.href=url+params
      },
      handleFloorCanCheck(checkNode){
        if(checkNode.length<4){
          console.log(1)
          this.floorList[0].nodes.map((item)=>{
            item.disabled=false
          })
        }else{
          console.log(2)
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
      selectZoomCallBack(val){
         this.checkedFloorList=val
      },
    },
    async mounted(){
      await this.getAllFloor()
      // this.getData()
    }
  }
</script>

<style lang="less">
  .energy-common{
    width:100%;
    .table-box,.my-chart{
      margin-top: 20px;
      padding:20px;
      background: @white !important;
      overflow: hidden;
    }
    .my-chart{
      /*width: 100%;*/
      height:450px;
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
    .table-tip{
      color:@mainBgColor;
      font-weight: bold;
    }
    .two-chart{
      margin-top:20px;
      background: @white;
      overflow: hidden;
      .my-chart{
        padding:0;
      }
    }
    .table-tip-box{
      margin-bottom: 20px;
    }
  }
</style>
