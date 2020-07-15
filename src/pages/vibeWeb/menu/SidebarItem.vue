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
    allMenuList() {
      return JSON.parse(localStorage.getItem("menuTree"))[0].childNode;
    },
  },
  watch:{
    queryIdObj(){
      if(this.queryIdObj.firstMenuId){
        console.log("id change2")
        this.setMenuList()
      }
    },
  },
  methods:{
    setMenuList(){

      let secondMenu={}
      let firstMenu = this.allMenuList.find(first => {
        console.log(this.queryIdObj.firstMenuId)
        return first.id == (this.queryIdObj.firstMenuId);
      });

      secondMenu = firstMenu.childNode.find(second => {
        return second.id == (this.queryIdObj.secondMenuId);
      });
      this.$store.commit("digitalPark/menuList",secondMenu);

      let myIframe = document.getElementById("myIframe");
      // let activeMenuIndex = myIframe.src.split("vibe")[1]
    }
  },
  mounted() {}
};
</script>
<style lang="less">
</style>
