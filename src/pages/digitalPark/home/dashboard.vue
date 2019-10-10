<template>
  <div class="dashboard-park-home-page">
    <div class="dashboard-left">
      <draggable :list="productList1"
                 :options="{draggable:'.item-drag-product'}"
                 group="product"
                 class="draggable-box">
        <div v-for="i in productList1" :key="i" class="item-drag-product">{{i}}</div>
      </draggable>
    </div>
    <div class="dashboard-center">

    </div>
    <div class="dashboard-right">
      <draggable :list="productList2"
                 :options="{draggable:'.item-drag-product'}"
                 group="product"
                 class="draggable-box">
        <div v-for="i in productList2" :key="i" :class="['item-drag-product',i==6?'undraggable':'']">{{i}}</div>
      </draggable>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  export default {
    name: 'DashBoardHomePage',
    components: {
      draggable
    },
    data () {
      return {
        productList1:[1,2,3],
        productList2:[4,5,6]
      }
    },
    methods:{
    },
    mounted(){
    }
  }
</script>

<style lang="less">
  .dashboard-park-home-page{
    display: flex;
    height:100%;
  }
  .dashboard-left{
    width:25%;
    background: pink;
    height:100%;
  }
  .dashboard-center{
    width:50%;
    background: yellow;
  }
  .dashboard-right{
    width:25%;
    background: pink;
  }
  .draggable-box{
    height:100%;
  }
  .item-drag-product{
    width:100%;
    height:30%;
    margin-bottom: 3%;
    background: @white;
  }
</style>
