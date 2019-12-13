<template>
  <div class="dashboard-park-home-page-new"  v-loading="loading">
      <div class="dashboard-header flex-align-between" v-show="!hideHeader">
        <div class="news-box">
          <ul class="news-list hover-pointer" :style="{top}" @mouseenter="stopNews" @mouseleave="scrollNews">
            <li v-for="(item,index) in newsList" :key="index" class="news-item">
              <span>{{item.text}}</span>
              <span>{{item.time}}</span>
            </li>
          </ul>
        </div>
        <div class="digital-title">
          <div class="digital-title-text">{{$t('homeHeader.title')}}</div>
        </div>
        <div class='dashboard-nav-operator'>
          <NavOperator  :moduleType.sync="moduleType" />
        </div>
      </div>
    <div class="dashboard-content-panel">
      <div class="dashboard-left">
        <draggable :list="proModuleList1" class="draggable-box1"
                   @change="onLeftChange"
                   v-bind="getOptions()"
                   @start="onLeftStart"
                   :move="onLeftMove"
                   @end="onLeftEnd"
        >
          <draggable v-for="(item,index) in proModuleList1"
                     class="item-drag-product left-item-drag-product"
                     :key="item.id"
                     :list="[item]"
                     :id="index"
                     v-bind="getInnerOptions()"
                     @start="onLeftInnerStart"
                     @end="onLeftInnerEnd"
                     @change="onInnerChange"
          >
            <ItemProModule
                 class="inner-drag-content"
                 :moduleData="item"
                 :type="1"
            />
          </draggable>

        </draggable>
      </div>

      <div class="dashboard-center">
        <!--<div class="carousel-box"></div>-->
        <img v-if="pageFlag==2" src="../../../../static/image/digitalPark/unity_priview.png"
             class="unity_priview"
             alt="">
        <!--<iframe v-if="pageFlag==1"-->
                <!--src="../../../../static/HomePage/index.html"-->
                <!--frameborder="0"-->
                <!--class="unity-frame"></iframe>-->

      </div>
      <div class="dashboard-right">
        <draggable :list="proModuleList2"
                   v-bind="getOptions()"
                   class="draggable-box2"
                   @change="onRightChange"
                   :move="onRightMove"
                   @start="onRightStart"
                   @end="onRightEnd"
        >
          <draggable v-for="(item,index) in proModuleList2"
                     class="item-drag-product right-item-drag-product"
                     :key="item.id"
                     :list="[item]"
                     :id="index"
                     v-bind="getInnerOptions()"
                     @change="onInnerChange"
                     @start="onRightInnerStart"
                     @end="onRightInnerEnd"
          >
            <ItemProModule
              class="inner-drag-content"
              :moduleData="item"
              :type="1"
            />
          </draggable>
        </draggable>
        <div class="fixed-prod-module">
          <span>{{$t('proEntry')}}</span>
          <div class="product-list">
            <el-tooltip v-for="(item) in showFixedProList" :key="item.id"
                        effect="dark" :content="item.name" placement="top-end">
              <div class="fixed-pro-item hover-pointer"
                   @click="onClickItemFixPro(item)"
              >{{item.name}}</div>
            </el-tooltip>
          </div>
          <div v-if="fixedProList.length>16" class="flex-align-between turn-page">
            <span class="left-btn hover-pointer iconfont iconleft_btn-copy"
                  :class="activeBtnIndex==1?'active-btn':''"
                  @click="onClickTurnPageBtn(1)"
            ></span>
            <span class="right-btn hover-pointer iconfont iconright_btn" :class="activeBtnIndex==2?'active-btn':''"
                  @click="onClickTurnPageBtn(2)"></span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import NavOperator from '../coms/navOperator'
  import DigitalParkApi from '../../../service/api/digitalParkApi'
  import ItemProModule from '../coms/itemProModule'
  import CommonFun from '../../../utils/commonFun'
  export default {
    name: 'DashBoardHomePageNew',
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
      pageFlag(){
        console.log(this.$route.path)
        return  this.$route.path=='/digitalPark/dashboardHomePage'?1:2
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
          fixedProList:[],
          showFixedProList:[],
          moduleType:"1",
          loading:true,
          innerDragFlag:false,
          outDragFlag:false,
          innerObj:{},
          activeBtnIndex:2
        }
      },
      methods: {
        async onLeftChange (evt) {
          // console.log('change1', evt)
          // console.log($(".draggable-box1").height())
          // $(".item-drag-product").eq(0).css({
          //   marginBottom: $(".draggable-box1").height()*0.02+'px',
          // })
          // $(".item-drag-product").eq(1).css({
          //   marginBottom: $(".draggable-box1").height()*0.02+'px'
          // })
          if(evt.moved && !this.curProModule){ //只要有curProModule就代表是配置页，因为此处是仪表盘首页拖动而非配置页
            this.sureUpdateUserProModules()
          }else if (evt.removed) {
            //removed情况为仪表盘内部两组互相拖拽时才会发生，而且顺序是组2先added，组1才removed（反之亦然）
            //因此内部拖拽需要等removed的这一组执行完，才可以调用updateProModule
            this.proModuleList1.splice(evt.removed.oldIndex, 0, this.changeObj)
            this.updateProModule()
          } else if (evt.added) {
            let index=1;
            if(evt.added.newIndex==3){
              index=-1
            }
            this.changeObj = this.proModuleList1.splice(evt.added.newIndex + index, 1)[0]
            if(!evt.added.element.moduleList){
              this.updateProModule(evt.added,this.proModuleList1)
            }
          }
        },
        onRightChange: function (evt) {
          console.log('change2', evt)
          if(evt.moved && !this.curProModule){ //代表是仪表盘首页拖动而非配置页
            this.sureUpdateUserProModules()
          }if (evt.removed) {
            this.proModuleList2.splice(evt.removed.oldIndex, 0, this.changeObj)
            this.updateProModule()
          } else if (evt.added){
            let index=1;
            if(evt.added.newIndex==2){
              index=-1
            }
            this.changeObj = this.proModuleList2.splice(evt.added.newIndex + index, 1)[0]
            if(!evt.added.element.moduleList){
              this.updateProModule(evt.added,this.proModuleList2)
            }
          }
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
            type:1,
            language:Cookies.get('lang')
          })
          this.proModuleList1 =res.slice(0,3)
          this.proModuleList2 =res.slice(3,5)
          this.loading=false
        },
        async getProductList(){
          let res = await DigitalParkApi.getProductList({
            language:Cookies.get('lang')
          })
          this.fixedProList=res
          this.showFixedProList=res.length>16?res.slice(0,16):res
        },
        getOptions(){
          return {draggable:'.item-drag-product',group:"out-product",disabled:this.outDragFlag}
        },
        onLeftStart(evt){
          // console.log("start",evt)
          this.$parent.setContentListDragFlag &&
          this.$parent.setContentListDragFlag(false)
          // this.innerDragFlag=false
        },
        onLeftMove(evt){
          console.log('move',evt)
          // console.log(evt.draggedContext.element.position-1,evt.relatedContext.element.position-1,
          //   this.proModuleList2[evt.relatedContext.element.position-1-3])
          // if(evt.to.className=="draggable-box2"){
          //   this.proModuleList1.splice(evt.draggedContext.element.position-1,0,
          //     this.proModuleList2[evt.relatedContext.element.position-1-3])
          // }
        },
        onLeftEnd(){
          this.$parent.setContentListDragFlag &&
          this.$parent.setContentListDragFlag(true)
          // this.innerDragFlag=true
        },
        onRightMove(evt){
          // console.log('move2',evt)
        },
        onRightStart(){
          this.$parent.setContentListDragFlag &&
          this.$parent.setContentListDragFlag(false)
        },
        onRightEnd(){
          this.$parent.setContentListDragFlag &&
          this.$parent.setContentListDragFlag(true)
        },
        updateProModule(data,list){
          if(this.curProModule && data && !data.element.moduleList){
            let index=data.newIndex;
            if(list &&list.length==3 && data.newIndex==3){
              index=2
            }
            if(list && list.length==2 && data.newIndex==2){
              index=1
            }
            this.curProModule.moduleList.map((item)=>{
              if(item.id==data.element.id){
                let obj={
                  menuName:item.menuName,
                  type:1,
                  moduleList:[item],
                }
                // console.log(obj)
                list[index]=obj
                console.log('list',this.proModuleList1,this.proModuleList2)
              }
            })

          }
          if(!this.curProModule){
            this.sureUpdateUserProModules()
          }
        },
        async sureUpdateUserProModules(){
          await DigitalParkApi.updateUserProModules([...this.proModuleList1,...this.proModuleList2])
        },
        handleLangChange(){
          this.getModulesByType()
          this.getProductList()
        },
        onClickItemFixPro(item){
          if(this.hideHeader) return ; //配置页不进行后续操作
          let routeAddress = item.routeAddress;
          localStorage.setItem('menuList',JSON.stringify(item.childNode))
          if (
            item.name == "安防管理" ||
            item.name == "机房动环" ||
            item.name == "智能建筑" ||
            item.name == "建筑监控" ||
            item.name == "消防管理"
          ) {
            let clientName = item.name;
            if (item.name === "安防管理") {
              clientName = "综合安防";
            }
            //目前先写死
            Client.SkipToSigleBuild(clientName);
            return;
          }
          if (routeAddress) {
            // 如果带有@字符，则跳转旧项目
            if (routeAddress.indexOf("@") != -1) {
              CommonFun.loadOldPage(item);
            } else {
              setTimeout(() => {
                this.$router.push(item.routeAddress + "?type=2");
              }, 500);
            }
          } else {
            this.$router.push("/digitalPark/defaultPage?type=2");
          }
          Cookies.set('moduleType',1)
        },
        getInnerOptions(){
          return {draggable:'.inner-drag-content',disabled:!this.innerDragFlag,group:'product'}
        },
        onLeftInnerStart(evt){
          console.log('left-inner-start',evt)
          this.outDragFlag=false
        },
        onLeftInnerEnd(){
          this.outDragFlag=true
        },
        onInnerChange(evt){
          console.log("inner-change1",evt)
          this.innerObj={
            menuId:evt.added.element.pid,
            menuName:evt.added.element.menuName,
            type:1,
            moduleList:[evt.added.element]
          }
          // this.proModuleList1[evt]
        },
        onRightInnerStart(){},
        onRightInnerEnd(){},
        setInnerDragFlag(val){
          this.innerDragFlag=val
        },
        updateInnerModule(id,flag){
          if(flag=='left'){
            this.proModuleList1[id]=this.innerObj
          }else{
            this.proModuleList2[id]=this.innerObj
          }
          this.$parent.setItemDragFlag &&
          this.$parent.setItemDragFlag([...this.proModuleList1,...this.proModuleList2])
        },
        onClickTurnPageBtn(flag){
          if(flag==1){
             this.showFixedProList=this.fixedProList.slice(0,16)
             this.activeBtnIndex=2
          }else{
            this.showFixedProList=this.fixedProList.slice(16)
            this.activeBtnIndex=1
          }
        }
    },
    mounted(){
      document.body.ondrop = function (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      this.scrollNews()
      this.getModulesByType()
      this.getProductList()
      // $(".draggable-box1").css({
      //   height:($(".dashboard-content-panel").height())+'px'
      // })
      // $(".dashboard-right").css({
      //   height:($(".dashboard-content-panel").height())+'px'
      // })
      // let height=$(".dashboard-content-panel").height()-$(".fixed-prod-module").height()
      // $(".draggable-box2").css({
      //   height:height+'px'
      // })
      // console.log("box2",$(".dashboard-content-panel").height(),$(".fixed-prod-module").height(),height)
      // console.log($(".draggable-box2").height())
      // setTimeout(()=>{
      //   $(".item-drag-product").eq(0).css({
      //     marginBottom: $(".draggable-box1").height()*0.02+'px'
      //   })
      //   $(".item-drag-product").eq(1).css({
      //     marginBottom: $(".draggable-box1").height()*0.02+'px'
      //   })
      // },1000)
      // console.log($(".draggable-box1").height())
    }
  }
</script>

<style lang="less">
  .dashboard-park-home-page-new{
    color: @white;
    display: flex;
    flex-direction: column;
    height:100%;
    overflow: hidden;
    background: url('../../../../static/image/digitalPark/home.png');
    .dashboard-left,.dashboard-right{
      width:22%;
      height:100%;
      color: @white;
      overflow: hidden;
    }
    .dashboard-right{
      /*display: flex;*/
      /*flex-direction: column;*/
    }
    .dashboard-center{
      width:56%;
      overflow: hidden;
    }
    .draggable-box1{
      height:100%;
      overflow: hidden;
      position: relative;
      .item-drag-product:nth-child(3){
        top:68%;
        position: absolute;
      }
      .item-drag-product:nth-child(2){
        top:34%;
        position: absolute;
      }
      .item-drag-product:nth-child(1){
        top:0;
        position: absolute;
      }
    }
    .draggable-box2{
      height:67%;
      overflow: hidden;
      position: relative;
      .item-drag-product{
        height:47.5%;
      }
      .item-drag-product:nth-child(2){
        top:50%;
        position: absolute;
      }
    }
    .item-drag-product,.fixed-prod-module{
      width:100%;
      height:32%;
      /*margin-bottom:2%;*/
      font-size: 16px;
      text-align: center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-image: url('../../../../static/image/digitalPark/module_bg.png');
      overflow: hidden;
      .item-content{
        height:100%;
      }
    }
    .fixed-prod-module{
      margin:0;
      height:33%;
      padding:0 10px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      span{
        /*margin-bottom: 10px;*/
      }
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
      text-align: center;
      /*padding:0 180px;*/

    }
    .digital-title-text{
      width:80%;
      margin:0 auto;
      /*text-align: center;*/
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-image: url('../../../../static/image/digitalPark/title_bg.png');
    }
    .dashboard-content-panel{
      display: flex;
      flex-grow: 1;
      padding:10px;
      box-sizing: border-box;
      overflow: hidden;
    }
    .product-list{
      flex-grow: 1;
      box-sizing: border-box;
      padding-top:10px;
      overflow: hidden;
      &:after{
      width:40%;
      content:''
      }
    }
    .fixed-pro-item{
      width:23%;
      font-size: 12px;
      padding:10px 0;
      flex-shrink: 0;
      float:left;
      margin:12px 1% 5px 1%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      background-image: url('../../../../static/image/digitalPark/tag_large_bg.png') ;
    }
    .carousel-box{
      width:95%;
      height:28%;
      margin:0 auto 2% auto;
      border:1px solid #ccc;
    }
    .unity-frame{
      width:100%;
      height:100%;
    }
    .news-box,.digital-title,.dashboard-nav-operator{
      flex: 1;
    }
    .dashboard-nav-operator{
      .digital-nav-operator{
        float: right;
      }
    }
    .unity_priview{
      width:100%;
      height:100%;
    }
    .inner-drag-content{
      height:100%;
    }
    .turn-page{
      margin-bottom: 10px;
      span{
        width:20px;
        height:20px;
        border-radius: 5px;
        background:#4F89B2;
        color:#333;
        text-align: center;
        line-height: 20px;
        font-size: 5px;
      }
      .active-btn{
        color:#00bfee;
        background:#012f46;
        border:1px solid #00bfee;
        box-sizing: border-box;
      }
      .left-btn{
         margin-right:20px;
      }
      img{
        width:10px;
        height:10px;
      }
    }
  }
</style>
