<template>
  <div class="home-page">
    <div class="home-header">
      <div class="home-header-inner flex-align-between">
        <div class="header-nav-left">
          <h3 class="title">cizing数字园区</h3>
        </div>
        <el-input class="search-input">
           <el-button slot="append" icon="el-icon-search" class="search-icon">搜索</el-button>
        </el-input>
        <div class="header-nav-right flex-align">
          <el-breadcrumb separator="|">
            <el-breadcrumb-item>消息(1)</el-breadcrumb-item>
            <el-breadcrumb-item>EN</el-breadcrumb-item>
            <el-breadcrumb-item>换肤</el-breadcrumb-item>
            <el-breadcrumb-item>admin</el-breadcrumb-item>
          </el-breadcrumb>
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
          <span class="hover-pointer" @click="onShowMoreProduct">更多</span>
        </div>
        <ul class="flex-align-around production-list" :style="showMoreProduct?'':{height:'56px'}">
          <li v-for="(item,index) in productList"
              :key="index"
              @click="onClickItemProduct(item)"
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
        navList:[]
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
    },
    mounted(){
      this.getNavList()
    }
  }
</script>

<style lang="less">
  .home-page{
    height: 100%;
    font-size: 12px;
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
      /*width:60%;*/
      float: left;
      .title{
        font-size: 30px;
        color:#002063;
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
      font-size: 12px;
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
        background: #002063;
        border:none;
        color:@white;
        /*font-size: 12px;*/
      }
    }
    .header-nav-right{
      /*width:40%;*/
      float: right;
      flex-direction: row-reverse;
      .el-breadcrumb__inner{
        padding: 0 10px;
        &:hover{
          cursor: pointer;
        }
      }
    }
    .skin-img{
      width:20px;
      height:20px;
      margin:0 25px;
    }
    .home-center{
      width:1400px;
      margin:0 auto;
    }
    .item-module{
      /*background: pink;*/
      margin:20px 0;
      padding:20px 0;
    }
    .module-title{
      padding:10px 0;
      h3{
        font-size: 16px;
      }
    }
    .production-list{
      flex-wrap: wrap;
      overflow: hidden;
      li{
        width:16%;
        text-align: center;
        padding:20px 0;
      }
      span:hover{
        cursor: pointer;
      }
    }
    .module-border{
      padding:20px;
      border:1px solid #ccc;
    }
  }
</style>
