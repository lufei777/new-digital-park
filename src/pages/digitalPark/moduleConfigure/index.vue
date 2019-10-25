<template>
  <div class="module-configure flex-column">
    <div>
      <div class="set-tip">模式设置</div>
      <div class="module-change">
        <el-button @click="onClickModuleBtn('2')" :style="type==2?moduleBtnBg:defaultBtn" >{{$t('homeHeader.waterfall')}}</el-button>
        <el-button @click="onClickModuleBtn('1')" :style="type==1?moduleBtnBg:defaultBtn" >{{$t('homeHeader.dashboard')}}</el-button>
      </div>
    </div>
    <div class="main-container">
      <div :class="isFull?'hide':'left-module-list'">
        <div v-for="item in proModuleList"
             :key="item.id"
             :class="['item-left-pro','hover-pointer',item.activeFlag?'active-pro':'']"
             @click="onClickItemProModule(item)">{{item.name}}</div>
      </div>
      <div class="module-content-list" v-show="!isFull">
        <draggable :list="contentList"
                   v-bind="getOptions()"
                   @change="onDragChange"
                   class="content-drag-box"
        >
          <component v-for="(item,index) in contentList"
                     :key="index"
                     :is="item.componentName"
                     :moduleItem="item"
                     :class="['item-content','flex-colum-center',item.dragFlag?'item-drag-product':'']"
                     :style="contentBg"
          />
        </draggable>
      </div>
      <div :class="isFull?'full-right-module-content':'right-module-content'">
        <div :class="isFull?'full-preview-panel':'preview-panel'" >
          <Dashboard v-if="type==1" :curProModule="curProModule" :hideHeader="true" ref="dashboard"/>
          <HomePage v-if="type==2" :hideHeader="true"></HomePage>
        </div>
        <div class="operator-box">
          <el-button  @click="onClickSureBtn" :style="defaultBtn">确认</el-button>
          <el-button  @click="onClickGoBackBtn" :style="defaultBtn">取消</el-button>
          <el-button  @click="onClickFullScreenBtn" :style="defaultBtn">预览</el-button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import DigitalParkApi from '../../../service/api/digitalParkApi'
  import energyProportionAnalysis from '../coms/energyProportionAnalysis'
  import energyElectricityProportion from '../coms/energyElectricityProportion'
  import operateIncome from '../coms/operateIncome'
  import buildingStatusProportion from '../coms/buildingStatusProportion'
  import assetTypeProportion from '../coms/assetTypeProportion'
  import Dashboard from '../home/dashboard'
  import elementResizeDetectorMaker from 'element-resize-detector'
  import draggable from 'vuedraggable'
  import energyConsumptionRanking from '../coms/energyConsumptionRanking'
  import buildingEarlyWarningAlarm from '../coms/buildingEarlyWarningAlarm'
  import operateExpenditure from '../coms/operateExpenditure'
  import assetGrowthStatistics from '../coms/assetGrowthStatistics'
  import HomePage from '../home/index'

  export default {
    name: 'ModuleConfigure',
    components: {
      energyProportionAnalysis,
      energyElectricityProportion,
      operateIncome,
      buildingStatusProportion,
      assetTypeProportion,
      Dashboard,
      draggable,
      energyConsumptionRanking,
      buildingEarlyWarningAlarm,
      operateExpenditure,
      assetGrowthStatistics,
      HomePage
    },
    data() {
      return {
        proModuleList: [],
        contentList: [],
        isFull: false,
        curProModule:{},
        userProModuleList:[],
        contentListDragFlag:true
      }
    },
    computed:{
      type(){
        return this.$route.query.type
      },
      moduleBtnBg(){
        return {
           backgroundImage:'url('+require('../../../../static/image/digitalPark/module_btn_bg.png')+')',
           color:'#fff',
           'background-repeat':'no-repeat',
           'background-size':'100% 100%'
        }
      },
      defaultBtn(){
        return {
          border:'1px solid #0257FF',
          color:'#0257FF'
        }
      },
      contentBg(){
        return {
          // backgroundImage:'url('+require('../../../../static/image/digitalPark/content_bg.png')+')',
        }
      }
    },
    methods: {
      async getProModules() {
        let res = await DigitalParkApi.getProModules({
          language:Cookies.get('lang')
        })
        let tmp = this.setItemDragFlag(this.userProModuleList,res)
        this.proModuleList = tmp
        this.contentList = tmp[0].moduleList
      },
      onClickItemProModule(item,index) {
        this.contentList = item.moduleList
        this.curProModule=item
        this.proModuleList.map((item)=>{
          item.activeFlag=false
        })
        item.activeFlag=true
        // this.curModule=index
      },
      onClickFullScreenBtn() {
        this.isFull = !this.isFull
        let erd = elementResizeDetectorMaker()
        let that = this
        console.log($(".item-product-coms").length)
        // erd.listenTo($(".item-product-coms"), function () {
        //   console.log("changed")
        //   that.$nextTick(function () {
        //     echarts.init($(".my-chart")[0]).resize()
        //   })
        // })
      },
      onDragChange(){

      },
      getOptions(){
        return {
          group:{name:'product',pull:'clone'},
          draggable:'.item-drag-product',
          disabled:!this.contentListDragFlag
        }
      },
      async getModulesByType(){
        let res = await DigitalParkApi.getModulesByType({
          type:this.type,
          language:Cookies.get('lang')
        })
        this.userProModuleList=res
      },
      setItemDragFlag(userList,res=this.proModuleList){
        res.map((item,index)=>{
          if(index==0){
            item.activeFlag=true
          }else{
            item.activeFlag=false
          }

          item.moduleList.map((module)=>{
            module.dragFlag=true
            userList.map((userItem)=>{
              userItem.moduleList.map((userModule)=>{
                if(module.id==userModule.id){
                  module.dragFlag=false
                }
              })
            })
          })
        })
        return res
      },
      setContentListDragFlag(val){
        this.contentListDragFlag=val
      },
     async onClickSureBtn(){
      await  this.$refs.dashboard.sureUpdateUserProModules()
        setTimeout(()=>{
          if(this.type==1){
            this.$router.push(`/digitalPark/dashboardHomePage`)
          }else{
            this.$router.push(`/digitalPark/homePage`)
          }
        },1000)
      },
      onClickModuleBtn(val){
        this.$router.replace(`/digitalPark/moduleConfigure?type=${val}`)
      },
      onClickGoBackBtn(){
        this.$router.go(-1)
      },
    },
    async mounted() {
      await this.getModulesByType()
      this.getProModules()
    }
  }
</script>

<style lang="less">
  .module-configure{
    height: 100%;
    overflow: hidden;
    .left-module-list{
      width:8%;
      height: 100%;
      float: left;
      background: #11163A;
      text-align: center;
      padding:10px 0;
      /*margin-left:10px;*/
      box-sizing: border-box;
    }
    .item-left-pro{
      padding:12px 0;
      color:#ddeeff;
    }
    .active-pro{
      background:rgba(2,87,255,1);
    }
    .module-content-list{
      width:20%;
      height:100%;
      overflow: auto;
      float: left;
      padding:10px;
      box-sizing: border-box;
      box-shadow:0 2px 8px 0 rgba(0, 0, 0, 0.15);
      border-radius:2px;
    }
    .right-module-content{
      width: 70%;
      float: left;
      height: 100%;
      display: flex;
      flex-direction: column;
      box-shadow:0 2px 8px 0 rgba(0, 0, 0, 0.15);
      border-radius:2px;
      box-sizing: border-box;
      /*margin:0 10px;*/
    }
    .content-drag-box{
      height: 100%;
    }
    .item-content{
      height:30%;
      width:100%;
      padding:5px;
      box-sizing: border-box;
      margin-bottom:20px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      border:1px solid #d0d3dc;
    }
    .my-chart{
      width:100%;
      flex-grow: 1;
    }
    .preview-panel{
      width:98%;
      height:85%;
      margin:10px auto;
      box-sizing: border-box;
      overflow: auto;
    }
    .hide{
      display: none;
      width:0;
    }
    .full-right-module-content{
      width:100%;
      height: 100%;
    }
    .full-preview-panel{
      width:100%;
      height:100%;
    }
    .set-tip{
      height: 56px;
      width:100%;
      background: #0D1B27;
      color:#eeddff;
      text-align: center;
      line-height: 56px;
      font-size: 24px;
      font-weight: bold;
    }
    .module-change{
      width: 98%;
      margin-left:1px;
      padding:10px;
      top:56px;
      box-sizing: border-box;
    }
    .main-container{
      flex-grow: 1;
      width:98%;
      margin-left: 1%;
    }
    .operator-box{
      text-align: center;
      .el-button{
        margin: 0 40px;
        width:84px;
      }
    }
  }
</style>
