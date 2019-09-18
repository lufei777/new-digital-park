<template>
  <div class="home-page">
    <div class="home-header">
      <div class="header-nav-left">
        <h3 class="title">cizing数字园区</h3>
        <ul class="flex">
          <li>首页</li>
          <li>运维</li>
          <li>经营</li>
          <li>服务</li>
          <li>办公</li>
          <li>基础功能</li>
        </ul>
      </div>
      <div class="header-nav-right flex-align">
        <span class="hover-pointer">登录</span>
        <img class='skin-img hover-pointer' src="../../../../static/image/digitalPark/skin.png" alt="">
        <el-input  placeholder="搜索" />
      </div>
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
        <h3 class="module-title">我们的产品</h3>
        <ul class="flex-align-around production-list">
          <li v-for="(item,index) in productList"
              :key="index"
              @click="onClickItemProduct(item)"
          ><span>{{item.name}}</span></li>
        </ul>
      </div>
      <div class="item-module flex-column flex-align-center">
        <h3 class="module-title">我们的产品</h3>
        <ul>
          <li><span></span>能源管理</li>
          <li><span></span>资产管理</li>
          <li><span></span>档案管理</li>
          <li>综合安防</li>
          <li>通行管理</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import CommonData from '../../../utils/commonData'
  export default {
    name: 'DigitalHomePage',
    components: {
    },
    data () {
      return {
        productList:CommonData.productList
      }
    },
    methods:{
      onClickItemProduct(item){
        if(item.url){
          window.open(item.url)
        }
      }
    }
  }
</script>

<style lang="less">
  .home-page{
    height: 100%;
    .carousel-img{
      width:100%;
      height:550px;
    }
    .home-header{
      width:1400px;
      padding:20px;
      background:rgba(255,255,255,.875);
      position: fixed;
      z-index: 99;
      left:0;
      right:0;
      margin:auto;
     }
    .header-nav-left{
      width:60%;
      float: left;
      .title{
        margin-bottom: 20px;
        font-size: 20px;
      }
      li{
        margin-right:20px;
        &:hover{
          cursor: pointer;
        }
      }
    }
    .header-nav-right{
      width:40%;
      float: right;
      flex-direction: row-reverse;
      .el-input{
        width:200px;
        input{
          border-radius: 50px;
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
      background: pink;
      margin:20px 0;
      padding:20px 0;
    }
    .module-title{
      padding:30px;
      font-size: 16px;
      width:100%;
      text-align: center;
    }
    .production-list{
      flex-wrap: wrap;
      li{
        width:16%;
        text-align: center;
        padding:20px 0;
      }
      span:hover{
        cursor: pointer;
      }
    }
  }
</style>
