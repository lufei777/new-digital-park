<template>
  <div class="item-product-coms" v-if="isConfig">
    <div class="module-item-top-name flex-align" v-if="moduleData.moduleName">
      <i class="module-item-top-icon" v-if="isNorbulingkaScreen"></i>
      <span>{{moduleData.moduleName}}</span>
    </div>
    <div class="component-box config-component-box">
      <component
        class="item-component flex-column-center"
        :is="moduleData.componentName"
        :moduleItem="moduleItemData(moduleData)"
        :type="type"
      />
    </div>
  </div>

  <div v-else>
    <div class="item-product-coms" v-if="type==1">
      <span
        class="single-module-name hover-pointer"
        @click="onClickItemComponent"
      >
        {{moduleData.menuName}}
      </span>
      <div class="component-box flex-column">
        <div class="module-item-top-name flex-align" v-if="moduleData.moduleList[0].moduleName">
          <i class="module-item-top-icon" v-if="isNorbulingkaScreen"></i>
          <span @click="onClickItemModuleName">{{moduleData.moduleList[0].moduleName}}</span>
        </div>
        <component
          class="item-component flex-column-center"
          v-for="(item,index) in moduleData.moduleList"
          :key="index"
          :is="item.componentName"
          :moduleItem="moduleItemData(item)"
          :class="'item-id-'+item.id"
          :type="type"
        />
      </div>
    </div>
    <div class="item-product-coms" v-if="type==2">
      <div class="flex-align-between module-title">
        <h3>{{moduleData.menuName}}</h3>
        <span v-if="!iszg"
              class="more-btn hover-pointer"
              @click="onClickMoreBtn">{{$t('more')}}
      </span>
      </div>
      <draggable
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
          :class="['flex-column',
                   'drag-component',
                   moduleData.moduleList.length>1?
                   'two-component radius-shadow  padding-box':
                   'item-component padding-box'
                   ]"
          :is="item.componentName"
          :moduleItem="{...item,...{type:2}}"
          :type="type"
        />
      </draggable>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import comsImport from './js/comsImport'
  import DigitalParkApi from '../../../service/api/digitalPark'
  import CommonFun from '@/utils/commonFun'
  import {isZG, isYDScreen, getLargeScreenName, isNormalScreen, isNorbulingkaScreen} from "@/utils/project";

  export default {
    name: 'ItemProModule',
    //type：1仪表盘/大屏 2.瀑布流
    props: ['moduleData', 'type', 'userProModuleList', 'hideHeader', 'fullStatus', 'isConfig'],
    components: {
      ...comsImport.exportComsList,
      draggable,
    },
    data() {
      return {
        menuTree: JSON.parse(localStorage.getItem('menuTree')),
      }
    },
    computed: {
      iszg() {
        return isZG()
      },
      legendFontSize() {
        return this.fullStatus == 'noFull' ? 12 : 14
      },
      isNorbulingkaScreen() {
        return isNorbulingkaScreen()
      }
    },
    methods: {
      getOptions() {
        let obj = {
          group: {name: 'product'},
          draggable: '.drag-component',
          disabled: !this.moduleData.moduleDragFlag
        }
        return obj
      },
      onStart(evt) {
        // console.log('start',evt)
        let id = evt.srcElement.id
        this.$store.commit('digitalPark/dragFlag', false) //设置不可往其他块拖（整个块）
        this.userProModuleList.map((item) => {
          //设置不可往其他块内容拖（块内容）
          if (id != item.menuId) {
            item.moduleDragFlag = false
          }
        })
      },
      onMove(evt) {

      },
      onEnd(evt) {
        // console.log('end',evt)
        this.$store.commit('digitalPark/dragFlag', true)//设置可往其他块拖（整个块）
        this.userProModuleList.map((item) => {
          item.moduleDragFlag = true
        })
        // console.log(this.userProModuleList)
      },
      async onChange(evt) {
        console.log("itemchange", evt)
        if (evt.added) {
          let index = evt.added.newIndex + 1
          if (this.moduleData.moduleList.length == 3) {
            if (evt.added.newIndex == 0 || evt.added.newIndex == 2) {
              index = 1
            }
            this.moduleData.moduleList.splice(index, 1)
          }
          this.$router.replace({
            path: this.$route.path,
            query: {
              ...this.$route.query, ...{
                updateProList: true,
                // moduleId:evt.added.element.pid,
                // index:evt.added.newIndex-1
              }
            }
          })
        }
        if (evt.moved) {
          if (this.$route.path == '/digitalPark/homePage') {
            // await DigitalParkApi.updateUserProModules(this.userProModuleList)
          }
        }
      },
      onClickItemComponent() {
        let item = this.moduleData.moduleList[0]
        console.log("tiem", item)
        // console.log("clickitem", item)
        //需要后台配合修改
        if (this.hideHeader || item.moduleName == "功能模块入口" || item.moduleName == '功能模块')
          return;  //配置页点击不进行操作

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
        menuTmp = secondMenu
        console.log("menuTmp", menuTmp)
        this.$store.commit("digitalPark/menuList", menuTmp || {});
        item.childNode = []
        item.id = item.forwardId || item.pid
        CommonFun.loadPage(item, this.moduleData.largeScreen)
      },
      onClickMoreBtn() {
        Cookies.set('moduleType', 2)
        this.menuTree[0].childNode.map((item) => {
          item.childNode.map((child) => {
            if (child.id == this.moduleData.menuId) {
              // console.log("child",child)
              this.$store.commit("digitalPark/menuList", child);
            }
          })
        })
        this.moduleData.childNode = []
        this.moduleData.firstMenuId = this.moduleData.moduleList[0].firstMenuId
        this.moduleData.secondMenuId = this.moduleData.moduleList[0].secondMenuId
        CommonFun.loadPage(this.moduleData)
      },
      moduleItemData(item) {
        let color = isYDScreen() ? '#8FD3FA' : isNorbulingkaScreen() ? '#fff' : this.type != 2 ? '#8FD3FA' : ''
        return {
          ...item,
          ...{
            largeScreen: this.moduleData.largeScreen,
            type: this.type,
            fontColor: this.type != 2 ? '#fff' : '#666',
            fontSize: 30,
            legendUi: {
              bottom: '3%',
              right: '3%',
              textStyle: {
                color: '#8FD3FA',
                fontSize: this.moduleData.largeScreen && !isYDScreen() ? 30 : this.legendFontSize
              },
            },
            xAxisUi: {
              axisLabel: {
                textStyle: {
                  color: color
                }
              },
              axisLine: {
                show: false,
                lineStyle: {
                  color: color,
                }
              },
              lineStyle: {
                color: color,
                width: 1,
              }
            },
            yAxisUi: {
              axisLine: {
                show: false,
                lineStyle: {
                  color: color,
                }
              },
              splitLine: {
                lineStyle: {
                  color: '#435E61',
                  opacity: 0.7,
                  width: 0.5
                }
              },
            },
          }
        }
      },
      findNode(menu, obj, secondMenu) {
        //menu起始是二级菜单,返回的是第三层
        menu.childNode.map((child) => {
          if (child.id == (obj.forwardId || obj.pid)) {
            if (obj.level == 3) {
              this.findMenu = child
            }
            if (obj.level == 4) {
              this.findMenu = menu
            } else {
              this.findNode(secondMenu, menu, secondMenu);
            }
          } else {
            this.findNode(child, obj, secondMenu);
          }
        })
        return this.findMenu;
      },
      setItemStyle() {
        $(".module-item-top-name, .config-component-box").css({
          color: this.type != 2 ? '#fff' : '#666'
        })
      },
      onClickItemModuleName() {
        if (this.isNorbulingkaScreen) {
          this.onClickItemComponent()
        }
      }
    },
    mounted() {
      document.body.ondrop = function (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      this.setItemStyle()
    }
  }
</script>

<style lang="less">
  .item-product-coms {
    height: 100%;
    display: flex;
    /*align-items: center;*/
    flex-direction: column;
    overflow: hidden;
    padding: 0 10px;
    box-sizing: border-box;

    .component-box {
      /*height:100%;*/
      width: 100%;
      flex-grow: 1;
      box-sizing: border-box;
      overflow: hidden;
    }

    .item-component {
      height: 100%;
      width: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      overflow: hidden;
    }

    .two-component {
      height: 100%;
      width: 49%;
      float: left;
    }

    .my-chart {
      margin: auto;
      width: 95%;
      flex-grow: 1;
      /*height:90%;*/
      /*height:200px;*/
    }

    .single-module-name {
      margin-bottom: 10px;
    }

    .module-item-top-name {
      width: 100%;
      text-align: left;
      padding-left: 1.5%;
      box-sizing: border-box;
      margin-top: 10px;
    }

    .module-item-top-icon {
      display: block;
      height: 14px;
      width: 6px;
      background: #FFF81D;
      margin-right: 10px;
    }

    .tmp-hidden {
      display: none;
    }

    .padding-box {
      padding: 20px;
      box-sizing: border-box;
    }

    .module-title {
      /*width:99%;*/
    }

    .drag-component {
      height: 100%;
    }
  }
</style>
