<template>
  <div class="park-home-page" v-loading="loading">
    <div class="home-header" v-if="!hideHeader">
      <div class="home-header-inner flex-align-between">
        <div class="header-nav-left">
          <h3 class="title">{{$t('homeHeader.title')}}</h3>
        </div>
        <el-input class="search-input">
           <el-button slot="append" icon="el-icon-search" class="search-icon">{{$t('homeHeader.searchText')}}</el-button>
        </el-input>
        <NavOperator :moduleType.sync="moduleType" />
      </div>
      <Sidebar  :menuList="menuList"/>
    </div>

    <el-carousel height="550px" :interval="2000">
      <el-carousel-item >
        <img class="carousel-img" src="../../../../static/image/digitalPark/lunbo1.png" alt="">
      </el-carousel-item>
      <el-carousel-item >
        <img class="carousel-img" src="../../../../static/image/digitalPark/lunbo2.png" alt="">
      </el-carousel-item>
    </el-carousel>

    <div class="home-center">
      <div class="product-module">
        <div class="flex-align-between module-title">
          <h3>我们的产品</h3>
          <span class="hover-pointer more-btn" @click="onShowMoreProduct">更多</span>
        </div>
        <ul class="flex-align-around production-list" :style="showMoreProduct?'':{height:'120px'}">
          <li v-for="(item,index) in productList"
              :key="index"
              @click="onClickItemProduct(item)"
              :style="getItemBg(item)"
          ><span>{{item.name}}</span></li>
        </ul>
      </div>
      <draggable :list="userProModuleList"
                  v-bind="getOptions()"
                  class="draggable-box"
                  @change="onDragChange"

      >
        <ItemProModule v-for="(item) in userProModuleList"
                       :class="item.moduleDragFlag?'drag-item item-module':'item-module'"
                       :key="item.id"
                       :moduleData="item"
                       :type="2"
                       :userProModuleList="userProModuleList"
                       :id="item.menuId"
        />
      </draggable>
      <!--<div class="item-module">-->
        <!--<div class="flex-align-between module-title">-->
          <!--<h3>信息发布</h3>-->
          <!--<span class="hover-pointer" @click="onShowMoreProduct">更多</span>-->
        <!--</div>-->
        <!--<div class="module-border">-->
          <!--<el-tabs style="height: 200px;" type="border-card" tabPosition="top">-->
            <!--<el-tab-pane label="员工活动">员工活动</el-tab-pane>-->
            <!--<el-tab-pane label="党建工作">党建工作</el-tab-pane>-->
            <!--<el-tab-pane label="规章制度">规章制度</el-tab-pane>-->
            <!--<el-tab-pane label="通知公告">通止规</el-tab-pane>-->
            <!--<el-tab-pane label="时事要闻">通止规</el-tab-pane>-->
          <!--</el-tabs>-->
        <!--</div>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import  Sidebar from '../coms/SideBar.vue'
  import CommonFun from '../../../utils/commonFun'
  import DigitalParkApi from '../../../service/api/digitalParkApi'
  import NavOperator from '../coms/navOperator'
  import draggable from 'vuedraggable'
  import ItemProModule from '../coms/itemProModule'
  export default {
    name: 'DigitalHomePage',
    props:['hideHeader','curProModule'],
    components: {
      NavOperator,
      Sidebar,
      draggable,
      ItemProModule
    },
    data () {
      return {
        productList:[],
        showMoreProduct:false,
        modelValue:"1",
        menuList:[],
        userProModuleList:[],
        moduleType:"2",
        loading:true,
        dragFlag:true
      }
    },
    computed:{
    },
    watch:{
      $route(){
         if(this.$route.query.updateProList){ // 拖进来替换完设置左侧已有的不能拖动
           this.$parent.setItemDragFlag &&
           this.$parent.setItemDragFlag(this.userProModuleList)
           this.$router.replace({
             path: this.$route.path,
             query: {...this.$route.query,...{
                 updateProList:false,
               }
             }
           })
         }
         this.dragFlag=Boolean(this.$route.query.updateDragFlag) //设置右侧非同组不可拖动
      }
    },
    methods:{
      onClickItemProduct(item){
        if(item.routeAddress){
          window.open(item.routeAddress)
        }else{
          window.open('/#/digitalPark/defaultPage')
        }
      },
      onShowMoreProduct(){
        this.showMoreProduct=!this.showMoreProduct
      },
      async getMenuTree() {
        let res = await DigitalParkApi.getMenuTree({
          language:Cookies.get('lang')
        })
        this.menuList =res[0].childNode
      },
      getItemBg(item){
        return {
          backgroundImage:'url('+require('../../../../static/image/digitalPark/'+item.id+'.png')+')'
        }
      },
      onClickChangeModel(val){
        if(val==1){
          this.$router.replace('/digitalPark/homePage')
        }else{
          this.$router.replace('/digitalPark/dashboardHomePage')
        }
      },
      async getProductList(){
          let res = await DigitalParkApi.getProductList({
            language: Cookies.get('lang')
          })
          this.productList=res
      },
      async getModulesByType(){
        let res = await DigitalParkApi.getModulesByType({
          type:2,
          language:Cookies.get('lang')
        })
        res.map((item)=>{
           item.moduleDragFlag=true
        })
        this.userProModuleList =res
        this.loading=false
      },
      onDragChange(evt){
         console.log('out-moudle-change',evt)
         if(evt.added) {
           let obj = {
             // menuId:item.menuId,
             menuName: evt.added.element.menuName,
             type: 2,
             moduleList: [evt.added.element],
           }
           this.userProModuleList.splice(evt.added.newIndex,1,obj)
           this.userProModuleList.splice(evt.added.newIndex-1,1)
           // console.log('2',this.userProModuleList)
           this.$parent.setItemDragFlag &&
           this.$parent.setItemDragFlag(this.userProModuleList)
         }
      },
      handleLangChange(){
        this.getMenuTree()
        this.getProductList()
        this.getModulesByType()
      },
      getOptions(){
        return {draggable:'.drag-item',group:'product',disabled:!this.dragFlag}
      },
      setItemModuleDragFlag(flag){
        if(flag=='start'){
          let obj=this.userProModuleList.find((item)=>{
            return item.menuId==this.curProModule.id
          })
          if(obj){  //整个userList不可拖动
            this.dragFlag=false
          }
          this.userProModuleList.map((item)=>{
            if(item.menuId!=this.curProModule.id){
              item.moduleDragFlag=false   //模块内容不可拖动
            }
          })
        }else{
          this.userProModuleList.map((item)=>{
              item.moduleDragFlag=true
          })
        }
      },
      async sureUpdateUserProModules(){
        await DigitalParkApi.updateUserProModules(this.userProModuleList)
      }
    },
    mounted(){
      this.getMenuTree()
      this.getProductList()
      this.getModulesByType()
    }
  }
</script>

<style lang="less">
  .park-home-page{
    height: 100%;
    font-size: 14px;
    .carousel-img{
      width:100%;
      height:550px;
    }
    .home-header{
      width:100%;
      padding-top:20px;
      height: 110px;
      background: @white;
      position: fixed;
      z-index: 99;
      left:0;
      right:0;
      /*margin:auto;*/
     }
    .nav-list{
      width:1200px;
      margin:0 auto;
      padding-top: 20px;
      .nav-list-text{
        margin-right: 48px;
        font-size: 16px;
      }
      .nav-list-content {
        position: absolute;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-top: 10px;
        background: #fff;
        padding: 2px 10px 10px 10px;
        .two-menu {
          margin: 10px 0;
        } 
        .three-menu {
          float: right;
          // background: orange;
          li {
            padding: 0 15px 10px 15px;
          }
        }
      }
    }
    .home-header-inner{
      width:80%;
      margin:0 auto;
      text-align: center;
    }
    .header-nav-left{
      .title{
        font-size: 30px;
        color:@parkMainTextColor;
      }
      li{
        margin-right:20px;
        &:hover{
          cursor: pointer;
        }
      }
    }
    .search-input{
      width:400px;
      font-size: 14px;
      margin:0 auto;
      flex-shrink: 1;
      input{
       border-top-left-radius: 20px;
       border-bottom-left-radius: 20px;
        width:320px;
      }
      .el-input-group__append{
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        width:60px;
        padding:0 10px;
        background: @parkMainTextColor;
        border:none;
        color:@white;
      }
    }
    .digital-nav-operator{
      flex-shrink: 0;
    }
    .skin-img{
      width:20px;
      height:20px;
      margin:0 25px;
    }
    .home-center{
      width:80%;
      margin:0 auto;
    }
    .item-module{
      /*background: pink;*/
      margin:30px 0;
      padding:20px 0;
      height:400px;
      font-size: 16px;
    }
    .module-title{
      padding:10px 0;
      width:100%;
      h3{
        font-size: 22px;
      }
      .more-btn{
        font-size: 14px;
      }
    }
    .production-list{
      flex-wrap: wrap;
      overflow: hidden;
      li{
        width:16%;
        height:80px;
        padding:20px 0;
        color:@white;
        font-size: 26px;
        text-align: center;
        line-height: 80px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        margin-bottom:10px;
      }
      span:hover{
        cursor: pointer;
      }
    }
    .production-list:after{
      content: '';
      width: 66%;
      /*flex: auto;*/
      /*border:1px solid transparent;*/
    }
    .module-border{
      padding:20px;
      border:1px solid #ccc;
    }
    .el-carousel__container{
      margin-top:130px;
    }
    .product-module{
      margin-top: 20px;
    }
  }
</style>
