<template>
  <div class="common-index-layout">
    <div :class="menuConfig.isCollapse?'collapse-my-el-menu':'unfold-my-el-menu'">
      <slot name="menuList"></slot>
    </div>
    <div :class="[menuConfig.isCollapse?'collapse-right-content':'unfold-right-content','right-content']">
      <div :class="[menuConfig.isCollapse?'collapse-right-content-header':'unfold-right-content-header','right-content-header']">
        <div class="flex-align asset-bread-crumb">
          <i :class="menuConfig.isCollapse?'iconzhankai':'iconshouqi'"
             class="iconfont collapse-icon hover-pointer"
             @click="onClickCollapseBtn"
          ></i>
          <slot name="breadCrumb"></slot>
        </div>
        <div class="asset-nav-operator-box">
          <slot name="navOperator" :style="{float: 'right'}"></slot>
        </div>
      </div>
        <div class="router-view">
            <el-scrollbar wrap-class="scrollbar-wrapper" :native="false">
              <transition name="fade-transform" mode="out-in" appear>
                <slot name="content"></slot>
              </transition>
            </el-scrollbar>
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'CommonIndexLayout',
    props:['menuConfig'],
    data () {return {}},
    computed:{},
    watch:{
    },
    methods:{
      onClickCollapseBtn(){
        this.$emit('onclickcollapsebtn')
      }
    },
    mounted(){
      let routerView = document.querySelector('.router-view');
      const deviceWidth = document.body.clientWidth;
      const deviceHeight = document.body.clientHeight;
      routerView.style.height = Number(deviceHeight) - 110 + "px";
    }
  }
</script>

<style lang="less">
  .common-index-layout{
    height: 100%;
    background-color: #efefef;
    .unfold-my-el-menu,.collapse-my-el-menu{
      float: left;
      height:100%;
      /*width:15%;*/
      background-color:#394562 ;
      position: fixed;
      width:250px;
      overflow-y: auto;
      overflow-x: unset;
      z-index:999999999;
    }
    .collapse-my-el-menu{
      width:80px;
    }
    .unfold-right-content,.collapse-right-content{
      max-width: 100%;
      /*height:100%;*/
      overflow: auto;
      background-color: #efefef;
      margin-left: 250px;

    }
    .collapse-right-content{
      margin-left: 80px;
    }
    .unfold-right-content-header,.collapse-right-content-header{
      padding:0 20px;
      height:70px;
      background-color: @white;
      position: fixed;
      /*width:100%;*/
      box-sizing: border-box;
      z-index: 99;
      overflow: hidden;
      left:250px;
      right:0;
    }
    .right-content-header{
      box-shadow: @headerShadow;
    }
    .collapse-right-content-header{
      left:80px;
    }
    .asset-bread-crumb{
      float: left;
      width:60%;
      box-sizing: border-box;
    }
    .collapse-icon{
      font-size: 24px;
      line-height: 60px;
      padding-right:20px;
      color:#969CA8;
      float: left;
    }
    .router-view{
      padding:20px;
      margin-top: 70px;
      overflow: hidden;
    }
    .asset-nav-operator-box{
      /*flex-grow: 1;*/
      float: right;
      /*width: 40%;*/
      line-height: 70px;
    }
    .el-menu{
      border-right: none;
    }
    .el-submenu__title,.el-menu-item{
      /*font-size: 18px;*/
      &:hover{
        background-color: #008DEA !important;
        color:@white !important;
        i{
          color:@white;
        }
      }

    }
    .nest-menu{
      /*font-size: 16px;*/
    }
    .el-menu-item.is-active{
      background-color: #008DEA !important;
      color:@white;
    }
    .el-submenu.is-active{
      background-color: #008DEA !important;
      color:@white;
    }
    .el-scrollbar__view{
      height: unset !important;
    }
  }
</style>
