<template>
  <div class="dashboard-park-home-page">
      <div class="dashboard-header flex-align-between" v-show="!hideHeader">
        <div class="news-box">
          <ul class="news-list hover-pointer" :style="{top}" @mouseenter="stopNews" @mouseleave="scrollNews">
            <li v-for="(item,index) in newsList" :key="index" class="news-item">
              <span>{{item.text}}</span>
              <span>{{item.time}}</span>
            </li>
          </ul>
        </div>
        <div class="digital-title" :style="titleBg">cizing数字园区</div>
        <NavOperator :moduleType.sync="moduleType" />
      </div>
    <div class="dashboard-content-panel">
      <div class="dashboard-left">
        <draggable :list="proModuleList1"
                   class="draggable-box1"
                   @change="onLeftChange"
                   v-bind="getOptions()"
                   @start="onLeftStart"
                   :move="onLeftMove"
        >
          <ItemProModule v-for="(item,index) in proModuleList1"
                         class="item-drag-product"
                         :key="item.id"
                         :moduleData="item"
                         :type="1"
                         :style="moduleBg"
          />
        </draggable>
      </div>

      <div class="dashboard-center">

      </div>
      <div class="dashboard-right">
        <draggable :list="proModuleList2"
                   v-bind="getOptions()"
                   class="draggable-box2"
                   @change="onRightChange"
                   :move="onRightMove"
        >
        <ItemProModule v-for="(item,index) in proModuleList2"
                       class="item-drag-product"
                       :key="item.id"
                       :moduleData="item"
                       :type="1"
                       :style="moduleBg"
        />
        <div class="fixed-prod-module" :style="moduleBg">
             <span>产品入口</span>
             <div class="flex-wrap-align-center product-list">
               <div v-for="(item) in fixedProList" :key="item.id"
                    class="fixed-pro-item flex-align-center hover-pointer"
                    :style="tagBg"
                    >{{item.name}}</div>
             </div>
        </div>
        </draggable>
      </div>
    </div>

  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import NavOperator from '../coms/navOperator'
  import DigitalParkApi from '../../../service/api/digitalParkApi'
  import ItemProModule from '../coms/itemProModule'
  export default {
    name: 'DashBoardHomePage',
    props:['curProModule','hideHeader'],
    components: {
      draggable,
      NavOperator,
      ItemProModule
    },
    computed: {
      top() {
        return -this.curNewsIndex * 50 + 'px';
      },
      moduleBg(){
        return {
          backgroundImage:'url('+require('../../../../static/image/digitalPark/module_bg.png')+')'
        }
      },
      titleBg(){
        return {
          backgroundImage:'url('+require('../../../../static/image/digitalPark/title_bg.png')+')'
        }
      },
      tagBg(){
        return {
          backgroundImage:'url('+require('../../../../static/image/digitalPark/tag_large_bg.png')+')'
        }
      }
    },
    data() {
        return {
          proModuleList1: [],
          proModuleList2: [],
          changeObj: {},
          newsList: [{id: 1, time: '2019-10-10 10:10:10', text: '消息消息消息1111111'},
            {id: 1, time: '2019-10-11 10:11:11', text: '消息消息消息2222222'},
            {id: 3, time: '2019-10-12 10:12:12', text: '消息消息消息3333333'}],
          newsTimer: '',
          curNewsIndex: 0,
          fixedProList:'',
          moduleType:"1"
        }
      },
      methods: {
        async onLeftChange (evt) {
          console.log('change1', evt)
          if (evt.removed) {
            this.proModuleList1.splice(evt.removed.oldIndex, 0, this.changeObj)
          } else if (evt.added) {
            this.changeObj = this.proModuleList1.splice(evt.added.newIndex + 1, 1)[0]
          }
          this.updateProModule(evt.added,this.proModuleList1)

        },
        onRightChange: function (evt) {
          console.log('change2', evt)
          if (evt.removed) {
            this.proModuleList2.splice(evt.removed.oldIndex, 0, this.changeObj)
          } else if (evt.added){
            this.changeObj = this.proModuleList2.splice(evt.added.newIndex + 1, 1)[0]
          }
          this.updateProModule(evt.added,this.proModuleList2)
        },
        controlHeader() {
          $("body").mousemove((e) => {
            if(e.clientY<60){
              this.showHeader=true
            }else{
              this.showHeader=false
            }
          })
        },
        scrollNews() {
          this.newsTimer = setInterval(() => {
            if (this.curNewsIndex < this.newsList.length-1) {
              this.curNewsIndex += 1;
            } else {
              this.curNewsIndex = 0;
            }
          }, 1500);
        },
        stopNews() {
          clearInterval(this.newsTimer);
        },
        async getModulesByType(){
          let res = await DigitalParkApi.getModulesByType({
            type:1
          })
          this.proModuleList1 =res.slice(0,3)
          this.proModuleList2 =res.slice(3,5)
        },
        async getProductList(){
          let res = await DigitalParkApi.getProductList()
          this.fixedProList=res
        },
        getOptions(){
          return {draggable:'.item-drag-product',sort:true,group:"product"}
        },
        onLeftStart(evt){
          // console.log("start",evt)
        },
        onLeftMove(evt){
          // console.log('move',evt)
          // console.log(evt.draggedContext.element.position-1,evt.relatedContext.element.position-1,
          //   this.proModuleList2[evt.relatedContext.element.position-1-3])
          // if(evt.to.className=="draggable-box2"){
          //   this.proModuleList1.splice(evt.draggedContext.element.position-1,0,
          //     this.proModuleList2[evt.relatedContext.element.position-1-3])
          // }
        },
        onRightMove(evt){
          // console.log('move2',evt)
        },
        async updateProModule(data,list){
          if(this.curProModule){
            console.log(1111111111)
            this.curProModule.moduleList.map((item)=>{
              if(item.id==data.element.id){
                console.log(item)
                let obj={
                  // menuId:item.menuId,
                  menuName:item.menuName,
                  type:1,
                  moduleList:[item],
                }
                console.log(obj)
                list[data.newIndex]=obj
                console.log(list)
              }
            })
            // console.log(this.proModuleList1)

          }
          await DigitalParkApi.updateUserProModules([...this.proModuleList1,...this.proModuleList2])
          // this.getModulesByType()
        }
    },
    mounted(){
      // setTimeout(()=>{
      //   this.showHeader=false
      //   this.controlHeader()
      // },3000)
      this.scrollNews()
      this.getModulesByType()
      this.getProductList()
    }
  }
</script>

<style lang="less">
  .dashboard-park-home-page{
    background: url('../../../../static/image/digitalPark/home.png') no-repeat;
    color: @white;
    display: flex;
    flex-direction: column;
    height:100%;
    overflow: hidden;
    .dashboard-left,.dashboard-right{
      width:22%;
      height:100%;
      color: @white;
    }
    .dashboard-center{
      width:56%;
    }
    .draggable-box1,.draggable-box2{
      height:100%;
    }
    .item-drag-product,.fixed-prod-module{
      /*width:100%;*/
      height:31%;
      margin-bottom:2%;
      font-size: 16px;
      text-align: center;
      padding:0 10px 10px 10px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .dashboard-header{
      width:100%;
      padding:0 20px;
      box-sizing: border-box;
      height:60px;
      overflow: hidden;
      background: rgba(255,255,255,.1);
    }
    .news-box{
      height:50px;
      color:#FF7A00;
    }
    .news-list{
      position: relative;
      transition: top 0.5s;
    }
    .news-item{
      line-height: 50px;
    }
    .digital-title{
      font-size: 30px;
      font-weight: bold;
      color:@white;
      height: 60px;
      line-height: 60px;
      padding:0 180px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    .dashboard-content-panel{
      display: flex;
      flex-grow: 1;
      padding:10px;
      box-sizing: border-box;
    }
    .product-list{
      height:90%;
      &:after{
      width:40%;
      content:''
      }
    }
    .fixed-pro-item{
      width:20%;
      font-size: 12px;
      padding:10px 0;
      flex-shrink: 0;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
</style>
