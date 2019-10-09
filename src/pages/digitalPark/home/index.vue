<template>
  <div class="park-home-page">
    <div class="home-header">
      <div class="home-header-inner flex-align-between">
        <div class="header-nav-left">
          <h3 class="title">cizing数字园区</h3>
        </div>
        <el-input class="search-input">
           <el-button slot="append" icon="el-icon-search" class="search-icon">搜索</el-button>
        </el-input>
        <div class="header-nav-right flex-align">
            <span class="nav-right-item"><span>消息(1)</span><i>|</i></span>
            <span class="nav-right-item"><span>EN</span><i>|</i></span>
            <span class="nav-right-item"><span>换肤</span><i>|</i></span>
            <span class="nav-right-item"><span>admin</span><i>|</i></span>
            <span class="nav-right-item">
              <!--<span>切换模式</span>-->
               <el-select v-model="modelValue" placeholder="切换模式" @change="onClickChangeModel">
                  <el-option label="瀑布流" value="1"></el-option>
                  <el-option label="仪表盘" value="2"></el-option>
                </el-select>
            </span>
        </div>

      </div>
      <ul class="flex nav-list">
        <li v-for="(item,index) in navList" :key="index" @click="item.children.length && navListClick(item)" class="nav-list-text">
          <span> {{item.name}} </span>
          <i class="el-icon-arrow-down" v-if="item.children.length"></i>
          <ul v-if="item.children.length && item.showChild" class="nav-list-content">
            <li v-for="(child,i) in item.children" :key="i" @click.stop="child.children.length && childNavListClick(child)" class="two-menu">
              {{child.name}}
              <i class="el-icon-arrow-right" v-if="child.children.length"></i>
              <ul v-if="child.children.length && child.showChild" class="three-menu">
                <li v-for="(three,p) in child.children" :key="p">{{three.name}}</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
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
      <div class="item-module">
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
      <div class="item-module">
        <div class="flex-align-between module-title">
          <h3>信息发布</h3>
          <span class="hover-pointer" @click="onShowMoreProduct">更多</span>
        </div>
        <div class="module-border">
          <el-tabs style="height: 200px;" type="border-card" tabPosition="top">
            <el-tab-pane label="员工活动">员工活动</el-tab-pane>
            <el-tab-pane label="党建工作">党建工作</el-tab-pane>
            <el-tab-pane label="规章制度">规章制度</el-tab-pane>
            <el-tab-pane label="通知公告">通止规</el-tab-pane>
            <el-tab-pane label="时事要闻">通止规</el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CommonFun from '../../../utils/commonFun'
  export default {
    name: 'DigitalHomePage',
    components: {
    },
    data () {
      return {
        productList:CommonFun.productList,
        showMoreProduct:false,
        navList:[],
        modelValue:"1"
      }
    },
    methods:{
      onClickItemProduct(item){
        if(item.url){
          window.open(item.url)
        }
      },
      onShowMoreProduct(){
        this.showMoreProduct=!this.showMoreProduct
      },
      getNavList(){
        let res = CommonFun.navList
        console.log('res',res)
        res.map((item)=>{
          item.showChild=false
          if(item.children.length){
            item.children.map((child)=>{
              console.log('lallala',child)
              item.showChild=false
              child.showChild = false
              if(child.children.length) {
                child.children.map((three)=>{
                  child.showChild = false
                })
              }
            })
          }
        })
        this.navList=res
      },
      navListClick(item) {
        item.showChild = true
      },
      childNavListClick(child) {
        child.showChild = true
      },
      getItemBg(item){
        return {
          backgroundImage:'url('+require('../../../../static/image/digitalPark/'+item.bgUrl)+')'
        }
      },
      onClickChangeModel(val){
        if(val==1){
          this.$router.replace('/digitalPark/homePage')
        }else{
          this.$router.replace('/digitalPark/dashboardHomePage')
        }

      }
    },
    mounted(){
      this.getNavList()
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
      width:1200px;
      margin:0 auto;
      text-align: center;
    }
    .header-nav-left{
      float: left;
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
    .header-nav-right{
      float: right;
    }
    .nav-right-item{
      span{
        padding: 0 20px;
        &:hover{
          cursor: pointer;
        }
      }
      .el-select{
        width:90px;
      }
      .el-input__inner{
        border:none;
        padding-right: 5px;
        /*width:85px;*/
      }
      .el-input__suffix,.el-input__suffix-inner{
        padding: 0;
      }
    }
    .skin-img{
      width:20px;
      height:20px;
      margin:0 25px;
    }
    .home-center{
      width:1200px;
      margin:0 auto;
    }
    .item-module{
      /*background: pink;*/
      margin:20px 0;
      padding:20px 0;
    }
    .module-title{
      padding:10px 5px;
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
    .module-border{
      padding:20px;
      border:1px solid #ccc;
    }
    .el-carousel__container{
      margin-top:130px;
    }
  }
</style>
