<template>
  <div class="nav-list flex-align-around">
    <div class="nav-item" @click="onClickNavItem('/helloWorld/shouye1')">首页1</div>
    <div class="nav-item" @click="onClickNavItem('/helloWorld/shouye2')">首页2</div>
    <div class="nav-item" @click="onClickNavItem('/shouye3')">
      首页3
      <div class="child-nav-list">
        <div @click.stop="onClickNavItem('/child1')">子路由1</div>
        <div @click.stop="onClickNavItem('/child2')">子路由2</div>
      </div>
    </div>
    <div class="nav-item">首页4</div>
    <div class="nav-item">首页5</div>
  </div>
</template>

<script>
  export default {
    name: 'navList',
    components: {
    },
    data () {
      return {
      }
    },
    methods: {
     onClickNavItem(val){
       this.$router.push(val)
     }
    },
    mounted(){
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .nav-list{
    width:100%;
    background: #013b4e;
    .nav-item{
      padding:10px 0;
      text-align: center;
      color:@white;
      cursor: pointer;
    }
    .child-nav-list{
      position: absolute;
      /*display: none;*/
      div{
        background: pink;
        padding:10px;
      }
    }
  }
</style>
