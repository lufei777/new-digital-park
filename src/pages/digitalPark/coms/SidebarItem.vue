<template>
  <div class="menu-item" v-if="item.childNode">
    <template v-if="item.childNode.length == 0">
      <el-menu-item :index="item.id + item.routeAddress">
        <!-- <i class="el-icon-menu"></i> -->
        {{item.name}}
      </el-menu-item>
    </template>

    <el-submenu v-else :index="item.id + item.routeAddress">
      <template slot="title">
        <!-- <i class="el-icon-menu"></i> -->
        {{item.name}}
      </template>

      <template v-for="child in item.childNode">
        <sidebar-item
          v-if="child.childNode&&child.childNode.length>0"
          :item="child"
          :key="child.id"
          class="nest-menu"
        />
        <el-menu-item v-else :key="child.id" :index="child.id">
          <!-- <i class="el-icon-location"></i> -->
          {{child.name}}
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  mounted() {
    // console.log(this.item);
  }
};
</script>
<style lang="less">
.menu-item {
  float: left;
}
.nest-menu {
  float: none;
  .el-submenu__icon-arrow {
    position: absolute !important;
  }
}
.el-menu--horizontal .el-submenu__icon-arrow {
  position: static;
  vertical-align: middle;
  margin-left: 8px;
  margin-top: -3px;
}
</style>
