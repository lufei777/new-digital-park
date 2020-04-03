<template>
  <div class="park-home-page" v-loading="loading">
    <div class="home-header" v-show="!hideHeader">
      <div class="home-header-inner flex-align-between">
        <div class="header-nav-left">
          <h3 class="title">
            <i class="iconfont park-logo" :class="titleIcon"></i>
            <span>{{title}}</span>
          </h3>
        </div>
        <!--<el-input class="search-input">-->
        <!--<el-button-->
        <!--slot="append"-->
        <!--icon="el-icon-search"-->
        <!--class="search-icon"-->
        <!--&gt;{{$t('homeHeader.searchText')}}</el-button>-->
        <!--</el-input>-->
        <NavOperator :moduleType.sync="moduleType" from-flag="1"/>
      </div>
      <div class="sidebar-container">
        <Sidebar :menu-data="menuData" :menuConfig="menuConfig" />
      </div>
    </div>

    <el-carousel height="360px" :interval="6000" v-if="!hideHeader"  ref="carousel" @click.native="linkTo">
      <el-carousel-item  v-for="item in imgs" v-bind:key="item.url" >
        <img  class="carousel-img" :src="item.url"/>
      </el-carousel-item>
    </el-carousel>
    <div class="home-header-wrapper">
      <div class="home-center">
        <div class="product-module">
          <div class="flex-align-between module-title">
            <h3>功能模块</h3>
            <span
              class="hover-pointer more-btn"
              @click="onShowMoreProduct"
            >{{showMoreProduct?$t('fold'):$t('more')}}</span>
          </div>
          <ul
            class="flex-align-start production-list"
            :style="showMoreProduct?'':{height:'160px'}"
          >
            <li
              v-for="(item,index) in productList"
              :key="index"
              @click="onClickItemProduct(item)"
              :style="getItemBg(item)"
            >
              <span>{{item.name}}</span>
            </li>
          </ul>
        </div>
        <draggable
          :list="userProModuleList"
          v-bind="getOptions()"
          class="draggable-box"
          @change="onDragChange"
          @start="onDragStart"
          @end="onDragEnd"
          :scroll-sensitivity="150"
          :force-fallback="forceFallback"
          :sroll="forceFallback"
        >
          <ItemProModule
            v-for="(item) in userProModuleList"
            class="drag-item item-module"
            :key="item.id"
            :moduleData="item"
            :type="2"
            :userProModuleList="userProModuleList"
            :id="item.menuId"
          />
        </draggable>
      </div>
    </div>
    <div class="copyright" v-if="copyrightShow">
      版权所有：©2019 京ICP备05080753号 京公网安备11010802013842号
    </div>
    <!--<div class="test-grid">-->
      <!--<div></div>-->
      <!--<div></div>-->
      <!--<div></div>-->
      <!--<div></div>-->
      <!--<div></div>-->
      <!--<div></div>-->
    <!--</div>-->
  </div>
</template>

<script>
import Sidebar from "../../../components/commonMenu/SideBar";
import CommonFun from "../../../utils/commonFun";
import DigitalParkApi from "../../../service/api/digitalPark";
import NavOperator from "../coms/navOperator";
import draggable from "vuedraggable";
import ItemProModule from "../coms/itemProModule";
import { mapState } from "vuex";
export default {
  name: "DigitalHomePage",
  props: ["hideHeader", "curProModule", "forceFallback"],
  components: {
    NavOperator,
    Sidebar,
    draggable,
    ItemProModule
  },
  data() {
    return {
      title: "数字园区",
      productList: [],
      showMoreProduct: false,
      modelValue: "1",
      menuData:{},
      userProModuleList: [],
      moduleType: "2",
      loading: true,
      menuConfig: {
        mode: "horizontal",
        bgColor: "#fff",
        textColor: "#606266",
        specialRoute: true
      },
      imgs: [
        {url: require('../../../../static/image/digitalPark/lunbo3.png'), link: '/announcement'},
        {url: require('../../../../static/image/digitalPark/lunbo4.png'), link: '/news'},
      ],
      copyrightShow:false,
      titleIcon:''
    };
  },
  computed: {
    ...mapState({
      dragFlag: state => state.digitalPark.dragFlag
    })
  },
  watch: {
    $route() {
      if (this.$route.query.updateProList) {
        // 拖进来替换完设置左侧已有的不能拖动
        this.$parent.setItemDragFlag &&
          this.$parent.setItemDragFlag(this.userProModuleList);
        this.$router.replace({
          path: this.$route.path,
          query: {
            ...this.$route.query,
            ...{
              updateProList: false
            }
          }
        });
      }
    }
  },
  methods: {
    onClickItemProduct(item) {
      Cookies.set("moduleType", 2);
      this.$store.commit("digitalPark/menuList",item);
      CommonFun.setShortcutList(this.productList)
      CommonFun.loadPage(item)
    },
    onShowMoreProduct() {
      this.showMoreProduct = !this.showMoreProduct;
    },
    async getMenuTree() {
      let res = await DigitalParkApi.getMenuTree({
        language: Cookies.get("lang")
      });
      this.title=res[0].name
      this.titleIcon  =res[0].icon
      // let zGChildNode = {
      //   childNode:[],
      //   id:"menu-22b039bb127541a691e21c8398759985",
      //   name:"中钢物业管理",
      //   routeAddress:"/zgPropertyManage",
      //   level:2
      // }
      // res[0].childNode[2].childNode.push(zGChildNode)
      this.menuData = res[0];
      localStorage.setItem('menuTree',JSON.stringify(res))
    },
    getItemBg(item) {
      let backgroundImage = "";
      try {
        backgroundImage =
          "url(" + require("../../../../static/image/digitalPark/" + item.productBgUrl + ".png") + ")";
      } catch (error) {}
      return {
        backgroundImage
      };
    },
    onClickChangeModel(val) {
      if (val == 1) {
        this.$router.replace("/digitalPark/homePage");
      } else {
        this.$router.replace("/digitalPark/dashboardHomePage");
      }
    },
    async getProductList() {
      let res = await DigitalParkApi.getProductList({
        language: Cookies.get("lang")
      });
      this.productList = res;
    },
    async getModulesByType() {
      let res = await DigitalParkApi.getModulesByType({
        type: 2,
        language: Cookies.get("lang")
      });
      res.map(item => {
        item.moduleDragFlag = true; //控制模块内容
        // item.parentModuleDragFlag=true //控制块，不可与块内容用同一变量
      });
      this.userProModuleList = res;
      this.loading = false;
      // 客户端loading消失
      if(localStorage.getItem('isCZClient')){
        hideClientLoading && window.hideClientLoading()
      }
    },
    async onDragChange(evt) {
      console.log("out-moudle-change", evt);
      if (evt.added) {
        let obj = {
          menuId: evt.added.element.pid,
          menuName: evt.added.element.menuName,
          type: 2,
          moduleList: [evt.added.element]
        };
        this.userProModuleList.splice(evt.added.newIndex, 1, obj);
        this.userProModuleList.splice(evt.added.newIndex - 1, 1);
        this.$parent.setItemDragFlag &&
          this.$parent.setItemDragFlag(this.userProModuleList);
      }
      if (evt.moved) {
        if (this.$route.path == "/digitalPark/homePage") {
          // await DigitalParkApi.updateUserProModules(this.userProModuleList)
        }
      }
    },
    onDragStart() {
      //设置不可往其他块内容拖
      this.userProModuleList.map(item => {
        item.moduleDragFlag = false;
      });
      //设置不可往左侧的配置列表拖
      this.$parent.setContentListDragFlag &&
        this.$parent.setContentListDragFlag(false);
    },
    onDragEnd() {
      this.userProModuleList.map(item => {
        item.moduleDragFlag = true;
      });
      this.$parent.setContentListDragFlag &&
        this.$parent.setContentListDragFlag(true);
    },
    handleLangChange() {
      this.getMenuTree();
      this.getProductList();
      this.getModulesByType();
    },
    getOptions() {
      return {
        draggable: ".drag-item",
        group: "product",
        disabled: !this.dragFlag
        // scroll:true,
        // scrollSensitivity:100,
        // scrollSpeed:20,
        // forceFallback:true,//this.forceFallback
      };
    },
    setItemModuleDragFlag(flag) {
      if (flag == "start") {
        let obj = this.userProModuleList.find(item => {
          return item.menuId == this.curProModule.id;
        });
        if (obj) {
          //整个userList不可拖动
          this.$store.commit("digitalPark/dragFlag", false);
        }
        this.userProModuleList.map(item => {
          if (item.menuId != this.curProModule.id) {
            item.moduleDragFlag = false; //模块内容不可拖动
          }
        });
      } else {
        this.userProModuleList.map(item => {
          item.moduleDragFlag = true;
        });
        this.$store.commit("digitalPark/dragFlag", true);
      }
    },
    async sureUpdateUserProModules() {
      await DigitalParkApi.updateUserProModules(this.userProModuleList);
    },
    linkTo () {
      let activeIndex = this.$refs.carousel.activeIndex
      this.$router.push(this.imgs[activeIndex].link)
    }
  },
  mounted() {
    document.title = this.title;
    document.body.ondrop = function(event) {
      event.preventDefault();
      event.stopPropagation();
    };
    this.getMenuTree();
    this.getProductList();
    this.getModulesByType();
    setTimeout(() => {
      this.copyrightShow = true
    }, 2000);
    localStorage.setItem("home",true)
  }
};
</script>

<style lang="less">
.park-home-page {
  height: 100%;
  font-size: 14px;
  background: @white;
  /*overflow: auto;*/
  .carousel-img {
    width: 100%;
    height: 360px;
    cursor: pointer;
  }
  .home-header {
    width: 100%;
    padding-top: 20px;
    height: 110px;
    background: @white;
    position: fixed;
    z-index: 99;
    left: 0;
    right: 0;
    box-shadow: @headerShadow;
    /*margin:auto;*/
  }
  .home-header-inner {
    width: 80%;
    margin: 0 auto;
    text-align: center;
  }
  .header-nav-left {
    flex-shrink: 0;
    .title {
      font-size: 30px;
      color: @parkMainTextColor;
    }
    li {
      margin-right: 20px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .search-input {
    width: 400px;
    font-size: 14px;
    margin: 0 auto;
    flex-shrink: 1;
    input {
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      width: 320px;
    }
    .el-input-group__append {
      border-top-right-radius: 20px;
      border-bottom-right-radius: 20px;
      width: 60px;
      padding: 0 10px;
      background: @parkMainTextColor;
      border: none;
      color: @white;
    }
  }
  .digital-nav-operator {
    flex-shrink: 0;
  }
  .skin-img {
    width: 20px;
    height: 20px;
    margin: 0 25px;
  }
  .home-header-wrapper {
    width: 100%;
    background: @white;
  }
  .home-center {
    /*width: 1500px;*/
    width:78%;
    margin: 0 auto;
  }
  .item-module {
    /*background: pink;*/
    /*margin: 30px 0;*/
    padding: 20px 0;
    height: 400px;
    font-size: 16px;
  }
  .module-title {
    padding: 10px 0;
    width: 100%;
    h3 {
      font-size: 18px;
    }
    .more-btn {
      font-size: 14px;
    }
  }
  .production-list {
    flex-wrap: wrap;
    overflow: hidden;
    li {
      width: 15.5%;
      height: 150px;
      padding: 2px 0;
      color: @white;
      font-size: 26px;
      text-align: center;
      line-height: 150px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      margin-bottom: 20px;
      margin-right:1.4%;
    }
    li:nth-child(6n){
      margin-right: 0px;
    }
    span:hover {
      cursor: pointer;
    }
  }
  .production-list:after {
    content: "";
    width: 66%;
    /*flex: auto;*/
    /*border:1px solid transparent;*/
  }
  .product-module {
    margin-top: 20px;
  }
  .park-logo {
    font-size: 30px;
    margin-right: 5px;
  }
  .module-border {
    padding: 20px;
    border: 1px solid #ccc;
  }
  .el-carousel__container {
    margin-top: 130px;
  }
  .menu-item {
    float: left;
  }
  .sidebar-container {
    width: 80%;
    margin: 0 auto;
    padding-top: 10px;
  }
  .sidebar-container .common-menu .el-submenu .el-submenu__title{
    font-size: 16px;
  }
  .el-menu--horizontal .el-menu-item {
    font-size: 16px;
  }
  .el-menu--horizontal .el-submenu__icon-arrow {
    position: static;
    vertical-align: middle;
    margin-left: 8px;
    margin-top: -3px;
  }
  .scrollbar-wrapper.el-scrollbar__wrap {
    margin-bottom: 0 !important;
  }
  .copyright {
    width: 100%;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    text-align: center;
    background: rgb(96, 98, 102);
    color: #ccc;
  }
  .test-grid{
    display: grid;
    width:100%;
    padding:20px;
    grid-template-columns: repeat(auto-fill,700px);
    grid-template-rows: repeat(auto-fill,400px);
    div{
      background:pink;
      border:1px solid #ccc;
    }
  }
}

.el-menu--horizontal{
  .el-menu-item,
  .el-submenu__title {
    font-size: 16px;
  }
}
.common-menu .el-submenu .el-submenu__title {
  height: 60px !important;
  line-height: 60px !important;
}
</style>
