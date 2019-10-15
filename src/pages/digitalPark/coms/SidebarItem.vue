<template>
  <div v-if="item.children" class="sidebar-title">
    <template v-if="item.children.length == 0" class="sidebar-title33">
        <el-menu-item :index="item.id">
          <!-- <i class="el-icon-menu"></i> -->
          {{item.name}}
        </el-menu-item>
    </template>

    <el-submenu v-else :index="item.id">
      <template slot="title" >
        <!-- <i class="el-icon-menu"></i> -->
        {{item.name}}
      </template>

      <template v-for="child in item.children">
        <sidebar-item
          v-if="child.children&&child.children.length>0"
          :item="child"
          :key="child.id"/>
        <el-menu-item v-else :key="child.id" :index="child.id">
          <i class="el-icon-location"></i>
          {{child.name}}
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>

<script>

export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="less">
.sidebar-title {
  width:90px;
  float: left;
}
.el-icon-arrow-down {
  right: 7px!important;
}
.el-submenu__icon-arrow {
  font-size: 14px!important;
}
.el-menu--popup {
  // width: 150px!important;
  .sidebar-title {
    width: 100px!important;
     float: none;
  }
}
</style>
