<template>
  <div class="item-product-coms">
    <div v-if="type==2" class="flex-align-between module-title">
      <h3>{{moduleData.menuName}}</h3>
      <span class="more-btn hover-pointer">{{$t('more')}}</span>
    </div>
    <span v-if="type==1" class="single-module-name">{{moduleData.menuName}}</span>
    <div v-if='type==1' class="component-box">
      <component v-for="(item,index) in moduleData.moduleList"
                 :key="index"
                 :is="item.componentName"
                 :class="moduleData.moduleList.length==2?'two-component':'item-component'"
                 :moduleItem="item"
                 class="flex-colum-center"
      />
    </div>
    <draggable v-if="type==2"
               class="component-box com-width-border"
               v-bind="getOptions()"
               :list="moduleData.moduleList"
               @start="onStart"
               :move="onMove"
               @end="onEnd"
               @change="onChange"
    >
        <component v-for="(item,index) in moduleData.moduleList"
                   :key="index"
                   :is="item.componentName"
                   :class="moduleData.moduleList.length==2?'two-component':'item-component'"
                   :moduleItem="item"
                   class="flex-colum-center item-drag-product"
        />
    </draggable>
  </div>
</template>

<script>
  import energyProportionAnalysis from './energyProportionAnalysis'
  import energyElectricityProportion from './energyElectricityProportion'
  import operateIncome from './operateIncome'
  import buildingStatusProportion from './buildingStatusProportion'
  import assetTypeProportion from './assetTypeProportion'
  import energyConsumptionRanking from '../coms/energyConsumptionRanking'
  import buildingEarlyWarningAlarm from '../coms/buildingEarlyWarningAlarm'
  import operateExpenditure from '../coms/operateExpenditure'
  import assetGrowthStatistics from '../coms/assetGrowthStatistics'
  import draggable from 'vuedraggable'
  export default {
    name: 'ItemProModule',
    props:['moduleData','type','proModuleList'],
    components: {
      energyProportionAnalysis,
      energyElectricityProportion,
      operateIncome,
      buildingStatusProportion,
      assetTypeProportion,
      energyConsumptionRanking,
      buildingEarlyWarningAlarm,
      operateExpenditure,
      assetGrowthStatistics,
      draggable,
    },
    data () {
      return {
        contentListDragFlag:true
      }
    },
    methods: {
      getOptions(){
        return {
          group:{name:'product'},
          draggable:'.item-drag-product',
          disabled:!this.contentListDragFlag
        }
      },
      onStart(evt){},
      onMove(evt){},
      onEnd(evt){},
       onChange (evt) {
        console.log('change1', evt)
        if (evt.added) {
          // let obj={
          //   menuName:evt.added.element.menuName,
          //   type:1,
          //   moduleList:[evt.added.element],
          // }
          console.log('lalalal')
          this.moduleData.moduleList.splice(evt.added.newIndex-1,1)
          // this.$parent.setItemDragFlag &&
          // this.$parent.setItemDragFlag(this.proModuleList)
          console.log(this.moduleData.moduleList,this.proModuleList)
        }
      },
    },
    mounted(){
    }
  }
</script>

<style lang="less">
  .item-product-coms{
     display: flex;
     align-items: center;
     flex-direction: column;
    .component-box{
      /*height:100%;*/
      width:100%;
      flex-grow: 1;
    }
    .item-component{
      height:100%;
      width:100%;
      display: flex;
      align-items: center;
      flex-direction: column;
    }
    .two-component{
      height:100%;
      width:50%;
      float: left;
    }
    .my-chart{
      margin:auto;
      width:95%;
      flex-grow: 1;
    }
    .com-width-border{
      border:1px solid #ccc;
      padding:10px;
      box-sizing: border-box;
    }
    .single-module-name{
      margin-bottom: 10px;
    }
  }
</style>
