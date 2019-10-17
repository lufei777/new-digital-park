<template>
  <div v-if="item.childNode" >
    <template v-if="item.childNode.length == 0">
        <el-menu-item :index="item.id">
          <!-- <i class="el-icon-menu"></i> -->
          {{item.name}}
        </el-menu-item>
    </template>

    <el-submenu v-else :index="item.id" >
      <template slot="title">
        <!-- <i class="el-icon-menu"></i> -->
        {{item.name}}
      </template>

      <template v-for="child in item.childNode">
        <sidebar-item
          v-if="child.childNode&&child.childNode.length>0"
          :item="child"
          :key="child.id"/>
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
// 
</style>
