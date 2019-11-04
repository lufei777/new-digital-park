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
                 :moduleItem="item"
                 class="item-component flex-colum-center"
      />
    </div>
    <!--<div v-if="type==2" style="width:100%;" class="component-box com-width-border">-->
        <!--<draggable-->
                   <!--v-bind="getOptions()"-->
                   <!--:list="moduleData.moduleList"-->
                   <!--@start="onStart"-->
                   <!--:move="onMove"-->
                   <!--@end="onEnd"-->
                   <!--@change="onChange"-->
                   <!--v-for="(item,index) in moduleData.moduleList"-->
                   <!--:key="index"-->
                   <!--class="two-component"-->
        <!--&gt;-->
          <!--<component-->
            <!--class="flex-colum-center drag-component"-->
            <!--style="height: 100%;"-->
            <!--:is="item.componentName"-->
            <!--:moduleItem="item"-->
          <!--/>-->
        <!--</draggable>-->
    <!--</div>-->
     <draggable
       v-if="type==2"
        v-bind="getOptions()"
        :list="moduleData.moduleList"
        @start="onStart"
        :move="onMove"
        @end="onEnd"
        @change="onChange"
        class="component-box com-width-border"
        :id="moduleData.id"
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
  export default {
    name: 'ItemProModule',
    props:['moduleData','type','userProModuleList'],
    components: {
      ...CommonFun.exportComs,
      draggable
    },
    data () {
      return {
        // contentListDragFlag:true
      }
    },
    methods: {
      getOptions(){
        return {
          group:{name:'product'},
          draggable:'.drag-component',
          disabled:!this.moduleData.moduleDragFlag
        }
      },
      onStart(evt){
        console.log('start',evt)
        let id=evt.srcElement.id
        console.log(id)
        this.$router.replace({   //设置不可往其他块拖（整个块）
          path: this.$route.path,
          query: {...this.$route.query,...{
              updateDragFlag:false
            }
          }
        })
        this.userProModuleList.map((item)=>{//设置不可往其他块内容拖（块内容）
          if(id!=item.id){
            item.moduleDragFlag=false
          }else{
            item.moduleDragFlag=true
          }
        })
      },
      onMove(evt){

      },
      onEnd(evt){
        console.log('end',evt)
        this.$router.replace({   //设置不可往其他块拖（整个块）
          path: this.$route.path,
          query: {...this.$route.query,...{
              updateDragFlag:true
            }
          }
        })
        this.userProModuleList.map((item)=>{
            item.moduleDragFlag=true
        })
        console.log(this.userProModuleList)
      },
      onChange (evt) {
        console.log("itempromodule",evt,this.moduleData)
        if (evt.added) {
          console.log(this.moduleData.moduleList)
          let index=evt.added.newIndex-1
          if(this.moduleData.moduleList.length==3){
            if(evt.added.newIndex==0){
              index = 1
            }
            this.moduleData.moduleList.splice(index, 1)
          }
          // if(evt.added.newIndex==0 && this.moduleData.moduleList.length!=1) {
          //   index = 1
          //
          // }
          console.log( this.moduleData.moduleList)
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
        // if (evt.moved) {
          // this.moduleData.moduleDragFlag=true
        // }
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
