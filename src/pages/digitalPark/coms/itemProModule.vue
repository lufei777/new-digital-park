<template>
  <div class="item-product-coms" >
    <div v-if="type==2" class="flex-align-between module-title">
      <h3>{{moduleData.menuName}}</h3>
      <span class="more-btn hover-pointer">{{$t('more')}}</span>
    </div>
    <span v-if="type==1" class="single-module-name">{{moduleData.menuName}}</span>
    <div v-if='type==1' class="component-box">
      <component v-for="(item,index) in moduleData.moduleList"
                 :key="index"
                 :is="item.componentName"
                 :moduleItem="item"
                 class="item-component flex-colum-center"
                 @click.native="onClickItemComponent(item)"
      />
    </div>
     <draggable
       v-if="type==2"
        v-bind="getOptions()"
        :list="moduleData.moduleList"
        @start="onStart"
        :move="onMove"
        @end="onEnd"
        @change="onChange"
        class="component-box com-width-border"
        :id="moduleData.menuId"
      >
        <component
          v-for="(item,index) in moduleData.moduleList"
          :key="index"
          :class="['flex-colum-center','drag-component',moduleData.moduleList.length>1?'two-component':'item-component']"
          style="height: 100%;"
          :is="item.componentName"
          :moduleItem="item"
        />
      </draggable>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import CommonFun from '../../../utils/commonFun'
  import DigitalParkApi from '../../../service/api/digitalParkApi'
  // import operateIncome from '../coms/operateIncome'
  export default {
    name: 'ItemProModule',
    props:['moduleData','type','userProModuleList','hideHeader'],
    components: {
      ...CommonFun.exportComs,
      draggable,
      // operateIncome
    },
    data () {
      return {
      }
    },
    methods: {
      getOptions(){
        let obj={
          group:{name:'product'},
          draggable:'.drag-component',
          disabled:!this.moduleData.moduleDragFlag
        }
        return obj
      },
      onStart(evt){
        // console.log('start',evt)
        let id=evt.srcElement.id
        this.$store.commit('digitalPark/dragFlag',false) //设置不可往其他块拖（整个块）
        this.userProModuleList.map((item)=>{//设置不可往其他块内容拖（块内容）
          if(id!=item.menuId){
            item.moduleDragFlag=false
          }
        })
      },
      onMove(evt){

      },
      onEnd(evt){
        // console.log('end',evt)
        this.$store.commit('digitalPark/dragFlag',true)//设置可往其他块拖（整个块）
        this.userProModuleList.map((item)=>{
            item.moduleDragFlag=true
        })
        // console.log(this.userProModuleList)
      },
      async onChange (evt) {
        console.log("itemchange",evt)
        if (evt.added) {
          let index=evt.added.newIndex+1
          if(this.moduleData.moduleList.length==3){
            if(evt.added.newIndex==0 ||evt.added.newIndex==2){
              index = 1
            }
            this.moduleData.moduleList.splice(index, 1)
          }
          this.$router.replace({
            path: this.$route.path,
            query: {...this.$route.query,...{
                updateProList:true,
                // moduleId:evt.added.element.pid,
                // index:evt.added.newIndex-1
              }
            }
          })
        }
        if(evt.moved){
          if(this.$route.path=='/digitalPark/homePage'){
            // await DigitalParkApi.updateUserProModules(this.userProModuleList)
          }

        }
      },
      onClickItemComponent(item){
         if(this.hideHeader) return ;  //配置页点击不进行操作
         console.log(item)
      }
    },
    mounted(){
      document.body.ondrop = function (event) {
        event.preventDefault();
        event.stopPropagation();
      }
    }
  }
</script>

<style lang="less">
  .item-product-coms{
     display: flex;
     align-items: center;
     flex-direction: column;
     overflow: hidden;
     padding:0 10px 10px 10px;
     box-sizing: border-box;
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
      /*flex-grow: 1;*/
      height:90%;
    }
    .com-width-border{
      border:1px solid #ccc;
      padding:10px;
      box-sizing: border-box;
      overflow: hidden;
      .item-content{
        width:50%;
      }
    }
    .single-module-name{
      margin-bottom: 10px;
    }
  }
</style>
