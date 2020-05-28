<template>
  <div class="item-product-coms" >
    <div v-if="type==2" class="flex-align-between module-title">
      <h3>{{moduleData.menuName}}</h3>
      <span  v-if="!iszg" class="more-btn hover-pointer" @click="onClickMoreBtn">{{$t('more')}}</span>
    </div>
    <span v-if="type==1" class="single-module-name hover-pointer"
          @click="onClickItemComponent"
    >
      {{moduleData.menuName}}
    </span>
    <div v-if='type==1' class="component-box">
      <component v-for="(item,index) in moduleData.moduleList"
                 :key="index"
                 :is="item.componentName"
                 :moduleItem="moduleItemData(item)"
                 :class="'item-id-'+item.id"
                class="item-component flex-column-center"
                type="type"
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
        class="component-box flex-align-between"
        :class="moduleData.moduleList.length<2?'radius-shadow':''"
        :id="moduleData.menuId"
      >
        <component
          v-for="(item,index) in moduleData.moduleList"
          :key="index"
          :class="['flex-column','drag-component',
                   moduleData.moduleList.length>1?'two-component radius-shadow  padding-box':
                   'item-component padding-box']"
          style="height: 100%;"
          :is="item.componentName"
          :moduleItem="{...item,...{type:2}}"
        />
      </draggable>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import comsImport from './js/comsImport'
  import DigitalParkApi from '../../../service/api/digitalPark'
  import CommonFun from '@/utils/commonFun'
  import { isYDScreen,isZG } from "@/utils/project";
  export default {
    name: 'ItemProModule',
    props:['moduleData','type','userProModuleList','hideHeader','fullStatus'],
    components: {
      ...comsImport.exportComsList,
      draggable,
    },
    data () {
      return {
        menuTree:JSON.parse(localStorage.getItem('menuTree')),
      }
    },
    computed:{
      iszg(){
         return isZG()
      },
      legendFontSize(){
        return this.fullStatus=='noFull'?12:14
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
      onClickItemComponent() {
        let item = this.moduleData.moduleList[0]
        // console.log("clickitem", item)
        //需要后台配合修改
        if (this.hideHeader || item.moduleName=="功能模块入口" || item.moduleName=='功能模块') return;  //配置页点击不进行操作

        if (!item.routeAddress) {
          this.$message({
            type: 'warning',
            message: '该模块还未配置路由~'
          })
          return;
        }
        let firstMenu = this.menuTree[0].childNode.find(first => {
          return first.id == item.firstMenuId;
        });

        let secondMenu = firstMenu && firstMenu.childNode.find(second => {
          return second.id == item.secondMenuId;
        });
        let menuTmp = {}
        if (secondMenu.clientType == 1) {
          menuTmp = this.findNode(secondMenu, item, secondMenu)
        } else {
          menuTmp = secondMenu
        }
        // console.log("menuTmp", menuTmp)
        this.$store.commit("digitalPark/menuList", menuTmp||{});
        item.childNode = []
        item.id = item.forwardId || item.pid
        CommonFun.loadPage(item,this.moduleData.largeScreen)
      },
      onClickMoreBtn(){
        Cookies.set('moduleType',2)
        this.menuTree[0].childNode.map((item)=>{
          item.childNode.map((child)=>{
            if(child.id==this.moduleData.menuId){
              // console.log("child",child)
              this.$store.commit("digitalPark/menuList",child);
            }
          })
        })
        this.moduleData.childNode = []
        this.moduleData.firstMenuId = this.moduleData.moduleList[0].firstMenuId
        this.moduleData.secondMenuId = this.moduleData.moduleList[0].secondMenuId
        CommonFun.loadPage(this.moduleData)
      },
      moduleItemData(item){
        return {
          ...item,
          ...{type:this.type},
          ...{
             largeScreen:this.moduleData.largeScreen,
             legendUi:{
              bottom:'3%',
              right:'3%',
              textStyle:{
                color:'#8FD3FA',
                fontSize:this.moduleData.largeScreen && !isYDScreen()?30:this.legendFontSize
              },
            },
            fontSize:30,
            ...{
              xAxisUi:{
                axisLabel:{
                  textStyle:{
                    color:this.type!=2?'#8FD3FA':''
                  }
                },
                axisLine: {
                  lineStyle: {
                    color: this.type!=2?'#8FD3FA':'',
                  }
                },
              },
              yAxisUi:{
                axisLine: {
                  lineStyle: {
                    color: this.type!=2?'#8FD3FA':'',
                  }
                },
              }
            }
          }
        }
      },
      findNode(menu, obj,secondMenu) {
        //menu起始是二级菜单,返回的是第三层
          menu.childNode.map((child)=>{
            if(child.id==(obj.forwardId || obj.pid)){
              if(obj.level==3){
                this.findMenu = child
              }
              if(obj.level==4){
                this.findMenu = menu
              }else{
                this.findNode(secondMenu,menu,secondMenu);
              }
            }else{
              this.findNode(child,obj,secondMenu);
            }
          })
        return this.findMenu;
      },
    },
    mounted(){
      document.body.ondrop = function (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      //
      // $(".my-chart canvas").click(function (e) {
      //   e.stopPropagation()
      // })

      // $(".item-component,.two-component").css({
      //   height:$(".component-box").height()
      // })
      // // console.log($(".component-box").height(), $(".item-component").height())
      // $(".my-chart").css({
      //   height:$(".item-component").height()*0.8
      // })
      // // console.log( $(".my-chart").height())
    }
  }
</script>

<style lang="less">
  .item-product-coms{
     display: flex;
     /*align-items: center;*/
     flex-direction: column;
     overflow: hidden;
     padding:0 10px;
     box-sizing: border-box;
    .component-box{
      /*height:100%;*/
      width:100%;
      flex-grow: 1;
      box-sizing: border-box;
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
      width:49%;
      float: left;
    }
    .my-chart{
      margin:auto;
      width:95%;
      flex-grow: 1;
      /*height:90%;*/
      /*height:200px;*/
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
    .module-item-top-name{
      width:100%;
      text-align: left;
      padding-left:1.5%;
      box-sizing: border-box;
      margin-top: 10px;
    }
    .padding-box{
      padding:20px;
      box-sizing: border-box;
    }
    .module-title{
      /*width:99%;*/
    }
  }
</style>
