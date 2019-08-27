<template>
  <div class="energy-compare-index">
    <div class="left-menu">
      <el-menu default-active="1" class="el-menu-demo"  @select="handleSelect">
        <el-menu-item index="1">空间对比</el-menu-item>
        <el-menu-item index="2">同比环比分析</el-menu-item>
        <el-menu-item index="3">能耗类型对比</el-menu-item>
      </el-menu>
    </div>
    <div class="right-panel">
      <keep-alive>
        <component :is="componentType()">
        </component>
      </keep-alive>
    </div>
  </div>

</template>

<script>

  import ZoomCompare from './coms/zoomCompare'
  import TbhbAnalysis from './coms/tbhbAnalysis'
  import TypeCompare from './coms/typeCompare'
  export default {
    components: {
      ZoomCompare,
      TbhbAnalysis,
      TypeCompare
    },
    data () {
      return {
        activeIndex:1
      }
    },
    methods: {
      handleSelect(key){
        this.activeIndex=key
        this.$store.commit("conditionSelect/activeIndex",key)
      },
      componentType(){
        if(this.activeIndex==1){
          return 'ZoomCompare'
        }else if(this.activeIndex==2){
          return 'TbhbAnalysis'
        }else{
          return 'TypeCompare'
        }
      },
    },
    mounted(){
    }
  }
</script>

<style lang="less">
  .energy-compare-index{
    margin-top: 85px;
    .left-menu{
      width:10%;
      float: left;
      position: fixed;
    }
    .right-panel{
      width: 90%;
      float: right;
      .left-zoom-nav{
        width:15%;
        float: left;
        position: fixed;
        height: 100%;
      }
      .right-content{
        width:83%;
        background: #f2f2f2;
        padding:10px;
        float: right;
        box-sizing: border-box;
      }
    }
  }
</style>
