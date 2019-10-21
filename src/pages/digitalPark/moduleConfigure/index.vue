<template>
  <div class="module-configure">
    <div class="left-module-list">
      <div v-for="item in proModuleList"
           :key="item.id"
           @click="onClickItemProModule(item)">{{item.name}}</div>
    </div>
    <div class="right-module-content">
       <div class="module-content-list">
         <component v-for="(item,index) in contentList"
                    :key="index"
                    :is="item.componentName"
                    :moduleItem="item"
                    class="item-content"
         />
       </div>
       <div class="preview-panel">
         <Dashboard />
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
  export default {
    name: 'ModuleConfigure',
    components: {
      energyProportionAnalysis,
      energyElectricityProportion,
      operateIncome,
      buildingStatusProportion,
      assetTypeProportion,
      Dashboard
    },
    data () {
      return {
        proModuleList:[],
        contentList:[]
      }
    },
    methods: {
      async getProModules(){
        let res = await DigitalParkApi.getProModules()
        this.proModuleList=res
        this.contentList=res[0].moduleList
      },
      onClickItemProModule(item){
        this.contentList=item.moduleList
      }
    },
    mounted(){
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
      height:100%;
    }
    .preview-panel{
      width:90%;
      margin:20px 10px;
      box-sizing: border-box;
      flex-grow: 1;
    }
  }
</style>
