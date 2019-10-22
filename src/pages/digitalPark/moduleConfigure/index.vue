<template>
  <div class="module-configure">
    <div :class="isFull?'hide':'left-module-list'">
      <div v-for="item in proModuleList"
           :key="item.id"
           @click="onClickItemProModule(item)">{{item.name}}</div>
    </div>
    <div :class="isFull?'full-right-module-content':'right-module-content'">
       <div class="module-content-list" v-show="!isFull">
         <!--<component v-for="(item,index) in contentList"-->
                    <!--:key="index"-->
                    <!--:is="item.componentName"-->
                    <!--:moduleItem="item"-->
                    <!--class="item-content flex-colum-center"-->
         <!--/>-->
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
           />
         </draggable>
       </div>
       <div :class="isFull?'full-preview-panel':'preview-panel'" >
         <Dashboard v-if="type==1" :curProModule="curProModule" :hideHeader="true"/>
         <el-button class="large-btn" @click="onClickFullScreenBtn">全屏</el-button>
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
      energyConsumptionRanking
    },
    data() {
      return {
        proModuleList: [],
        contentList: [],
        isFull: false,
        curProModule:{},
        userProModuleList:[]
      }
    },
    computed:{
      type(){
        return this.$route.query.type
      }
    },
    methods: {
      async getProModules() {
        let res = await DigitalParkApi.getProModules()
        res.map((item)=>{
          item.moduleList.map((module)=>{
            module.dragFlag=true
            this.userProModuleList.map((userItem)=>{
              userItem.moduleList.map((userModule)=>{
                 if(module.id==userModule.id){
                   // debugger
                   module.dragFlag=false
                 }
              })
            })
          })
        })
        console.log(res)
        this.proModuleList = res
        this.contentList = res[0].moduleList
      },
      onClickItemProModule(item,index) {
        this.contentList = item.moduleList
        this.curProModule=item
        // this.curModule=index
      },
      onClickFullScreenBtn() {
        this.isFull = !this.isFull
        // let erd = elementResizeDetectorMaker()
        // let that = this
        // console.log($(".item-product-coms").length)
        // erd.listenTo($(".item-product-coms"), function () {
        //   that.$nextTick(function () {
        //     echarts.init($(".my-chart")[2]).resize()
        //   })
        // })
      },
      onDragChange(){

      },
      getOptions(){
        return {group:{name:'product',pull:'clone'},draggable:'.item-drag-product'}
      },
      async getModulesByType(){
        let res = await DigitalParkApi.getModulesByType({
          type:this.type
        })
        this.userProModuleList=res
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
    .left-module-list{
      width:15%;
      float: left;
      background: pink;
    }
    .right-module-content{
      width: 85%;
      float: right;
      background: #ccc;
      height: 100%;
      display: flex;
      flex-direction: column;
      /*justify-content: center;*/
    }
    .module-content-list{
      height:250px;
      width:100%;
    }
    .item-content{
      height:100%;
      float: left;
      width:24%;
      background: @white;
      border:1px solid #000;
      margin:10px 0.5%;
      padding:5px;
    }
    .my-chart{
      width:100%;
      flex-grow: 1;
    }
    .preview-panel{
      width:90%;
      margin:40px 10px 20px 10px;
      box-sizing: border-box;
      flex-grow: 1;
      position: relative;
    }
    .large-btn{
      position: absolute;
      right:-100px;
      top:10px;
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
      width:95%;
      height:100%;
    }
    .content-drag-box{
      height:100%;
    }
  }
</style>
