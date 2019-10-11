<template>
  <div class="dashboard-park-home-page">
    <div class="dashboard-left">
      <draggable :list="productList1"
                 :options="{group:'product',draggable:'.item-drag-product',sort:true}"
                 class="draggable-box1"
                 @change="onChange"
      >
        <div v-for="i in productList1" :key="i.text" class="item-drag-product">{{i.text}}</div>
      </draggable>
    </div>

    <div class="dashboard-center">

    </div>
    <div class="dashboard-right">
      <draggable :list="productList2"
                 :options="{group:'product',draggable:'.item-drag-product',filter:'.undraggable',sort:true}"
                 class="draggable-box2"
                 @change="onChange2"
              >
        <div v-for="i in productList2" :key="i.text" :class="['item-drag-product',i.text==6?'undraggable':'']">{{i.text}}</div>
      </draggable>
      </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable'
  import VueDND from 'awe-dnd'
  import Vue from 'vue'
  Vue.use(VueDND)
  export default {
    name: 'DashBoardHomePage',
    components: {
      draggable
    },
    data () {
      return {
        productList1:[{text:'1'},{text:'2'},{text:'3'}],
        productList2:[{text:'4'},{text:'5'},{text:'6'}],
        changeObj:{},
      }
    },
    methods:{
      onChange: function (evt) {
        console.log('change1',evt)
        if(evt.removed){
          this.productList1.splice(evt.removed.oldIndex,0,this.changeObj)
        }else if(evt.added){
          this.changeObj = this.productList1.splice(evt.added.newIndex+1,1)[0]
        }
        // console.log(this.productList1,this.productList2)
      },
      onChange2: function (evt) {
        console.log('change2',evt)
        if(evt.removed){
          this.productList2.splice(evt.removed.oldIndex,0,this.changeObj)
        }else if(evt.added){
          this.changeObj = this.productList2.splice(evt.added.newIndex+1,1)[0]
        }
        // console.log(this.productList1,this.productList2)
      },
    },
    mounted(){
    }
  }
</script>

<style lang="less">
  .dashboard-park-home-page{
    display: flex;
    height:100%;
    overflow: hidden;
  }
  .dashboard-left{
    width:25%;
    background: pink;
    height:100%;
  }
  .dashboard-center{
    width:50%;
    background: green;
  }
  .dashboard-right{
    width:25%;
    background: pink;
  }
  .draggable-box1,.draggable-box2{
    height:100%;
  }
  .item-drag-product{
    width:100%;
    height:30%;
    margin-bottom: 3%;
    background: @white;
    font-size: 20px;
    font-weight: bold;
  }
</style>
