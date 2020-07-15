<template>
  <div class="common-index-layout">
    <div :class="menuConfig.isCollapse?'collapse-my-el-menu':'unfold-my-el-menu'">
      <slot name="menuList"></slot>
    </div>
    <div :class="[menuConfig.isCollapse? 'collapse-right-content':'unfold-right-content']">
      <div
        :class="[menuConfig.isCollapse?
          'collapse-right-content-header':
          'unfold-right-content-header']"
      >
        <div class="flex-align asset-bread-crumb">
          <i
            :class="menuConfig.isCollapse?'iconzhankai':'iconshouqi'"
            class="iconfont collapse-icon hover-pointer"
            @click="onClickCollapseBtn"
          ></i>
          <slot name="breadCrumb"></slot>
        </div>
        <div class="asset-nav-operator-box">
          <slot name="navOperator" :style="{float: 'right'}"></slot>
        </div>
      </div>
      <div class="content">
        <el-scrollbar wrap-class="scrollbar-wrapper" :native="true">
          <div class="router-view">
            <transition name="fade-transform" mode="out-in" appear>
              <slot name="content"></slot>
            </transition>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommonIndexLayout",
  props: ["menuConfig"],
  data() {
    return {};
  },
  computed: {},
  methods: {
    onClickCollapseBtn() {
      this.$emit("onclickcollapsebtn");
    },
    getContentHeight() {
      const deviceHeight = document.body.clientHeight;
      const routerViewHeight = Number(deviceHeight);
      const contentHeight = routerViewHeight - 110;
      this.$store.commit('digitalPark/setContentHeight', contentHeight);
      return contentHeight;
    },
    getContentWidth() {
      const deviceWidth = document.body.clientWidth;
      const routerViewHeight = Number(deviceWidth);
      return routerViewHeight;
    },
    computedHeight() {
      this.content = document.querySelector(".content");
      this.routerView = document.querySelector(".router-view");
      let contentHeight = this.getContentHeight();
      let contentWidth = this.getContentWidth();
      if (this.content && this.routerView) {
        this.routerView.style.height = contentHeight + "px";
        this.content.style.height = contentHeight + "px";
      }
      // 判断宽度进行菜单的隐藏显示
      if (contentWidth <= 992) {
        if (this.$store.state.digitalPark.menuIsCollapse === false) {
          this.$store.commit("digitalPark/menuIsCollapse", true);
        }
      } else {
        if (this.$store.state.digitalPark.menuIsCollapse === true) {
          this.$store.commit("digitalPark/menuIsCollapse", false);
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.computedHeight();
    });
    window.addEventListener(
      "resize",
      _.throttle(this.computedHeight.bind(this), 200)
    );
  }
};
</script>

<style lang="less">
.common-index-layout {
  height: 100%;
  background-color: #efefef;
  .unfold-my-el-menu,
  .collapse-my-el-menu {
    float: left;
    height: 100%;
    background-color: #394562;
    position: fixed;
    width: @menuWidth;
    overflow-y: auto;
    overflow-x: unset;
    z-index: 999;
  }
  .collapse-my-el-menu {
    width: 80px;
  }
  .unfold-right-content,
  .collapse-right-content {
    max-width: 100%;
    overflow: auto;
    background-color: #efefef;
    margin-left: @menuWidth;
  }
  .collapse-right-content {
    margin-left: @collapseMenuWidth;
  }
  .unfold-right-content-header,
  .collapse-right-content-header {
    padding: 0 20px;
    height: 70px;
    background-color: @white;
    position: fixed;
    box-sizing: border-box;
    z-index: 99;
    overflow: hidden;
    left: @menuWidth;
    right: 0;
    box-shadow: @headerShadow;
  }
  .collapse-right-content-header {
    left: @collapseMenuWidth;
  }
  .asset-bread-crumb {
    float: left;
    width: 60%;
    box-sizing: border-box;
  }
  .collapse-icon {
    font-size: 20px;
    line-height: 70px;
    padding-right: 20px;
    color: #969ca8;
    float: left;
  }
  .content {
    padding: 20px 0;
    margin-top: 70px;
    overflow: hidden;
    .router-view {
      padding: 0 20px;
    }
  }
  .asset-nav-operator-box {
    float: right;
    display: flex;
    height: 100%;
    // line-height: 70px;
  }
  .common-tree-box {
    padding: 20px 0;
    background: @white;
    width: 250px;
    position: fixed;
    box-sizing: border-box;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .common-tree {
      flex-grow: 1;
      overflow: hidden;
    }
  }
  .el-menu {
    border-right: none;
    .el-submenu__title,
    .el-menu-item {
      &:hover {
        background-color: @secondaryColor !important;
        color: @white !important;
        i {
          color: @white;
        }
      }
    }
    .el-submenu.is-active,
    .el-menu-item.is-active {
      background-color: @mainBgColor !important;
      color: @white;
    }
  }
}
</style>
