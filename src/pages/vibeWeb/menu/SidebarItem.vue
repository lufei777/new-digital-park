<template>
  <!--<div class="menu-item">-->
  <el-menu-item
    v-if="_.isEmpty(item.childNode) || item.childNode.length == 0"
    :index="specialRoute ? (item.id + item.routeAddress) : item.routeAddress"
  >
    <i v-if="item.icon" :class="['iconfont',item.icon]"></i>
    <span slot="title">{{item.name}}</span>
  </el-menu-item>

  <el-submenu v-else :index="specialRoute ? (item.id + item.routeAddress) : item.routeAddress">
    <template slot="title">
      <i v-if="item.icon" :class="['iconfont',item.icon]"></i>
      <span>{{item.name}}</span>
    </template>

    <sidebar-item
      v-for="child in item.childNode"
      :item="child"
      :key="child.id"
      :specialRoute="specialRoute"
      class="nest-menu"
    />
  </el-submenu>
</template>

<script>
export default {
  name: "SidebarItem",
  props: {
    item: {
      type: Object,
      required: true
    },
    specialRoute: {}
  },
  computed:{
    queryIdObj(){
      return this.$route.query
    },
  },
  watch:{
    queryIdObj(){
      if(this.queryIdObj){
        this.setMenuList()
      }
    },
  },
  methods:{
    setMenuList(item){
      // console.log(this.firstMenuId,this.secondMenuId)
      let secondMenu={}
      let firstMenu = this.allMenuList.find(first => {
        console.log(this.queryIdObj.firstMenuId)
        return first.id == (this.queryIdObj.firstMenuId);
      });
      console.log("fis",firstMenu)
      secondMenu = firstMenu.childNode.find(second => {
        return second.id == (this.queryIdObj.secondMenuId);
      });
      this.$store.commit("digitalPark/menuList",secondMenu);
      // this.normalShortcutList();
    }
  },
  mounted() {}
};
</script>
<style lang="less">
</style>
