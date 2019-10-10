<template>
  <div class="dashboard-park-home-page">
    <div class="dashboard-left">
      <draggable :list="productList1"
                 :options="{draggable:'.item-drag-product'}"
                 group="product"
                 class="draggable-box1"
                 @end="onEnd"
                 @start="onStart"
                 @change="onChange"
                 :move="move"
      >
        <div v-for="i in productList1" :key="i.text" class="item-drag-product">{{i.text}}</div>
      </draggable>

        <!--<div-->
          <!--class="item-drag-product"-->
          <!--v-for="color in productList1"-->
          <!--v-dragging="{ item: color, list: productList1, group: 'item-drag-product',comb:true}"-->
          <!--:key="color.text"-->
        <!--&gt;-->
          <!--{{color.text}}-->
        <!--</div>-->
    </div>

    <div class="dashboard-center">

    </div>
    <div class="dashboard-right">
      <draggable :list="productList2"
                 :options="{draggable:'.item-drag-product',filter:'.undraggable'}"
                 group="product"
                 class="draggable-box2">
        <div v-for="i in productList2" :key="i.text" :class="['item-drag-product',i.text==6?'undraggable':'']">{{i.text}}</div>
      </draggable>
        <!--<div-->
          <!--class="item-drag-product"-->
          <!--v-for="color in productList2"-->
          <!--v-dragging="{ item: color, list: productList2, group: 'item-drag-product2',comb:true }"-->
          <!--:key="color.text"-->
        <!--&gt;-->
          <!--{{color.text}}-->
        <!--</div>-->
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
        colors: [{
          text: "Aquamarine"
        }, {
          text: "Hotpink"
        }, {
          text: "Gold"
        }, {
          text: "Crimson"
        }, {
          text: "Blueviolet"
        }, {
          text: "Lightblue"
        }, {
          text: "Cornflowerblue"
        }, {
          text: "Skyblue"
        }, {
          text: "Burlywood"
        }]
      }
    },
    methods:{
      onChange: function (evt) {
        console.log(evt)
        if(evt.removed){
          let index=0
          this.productList2.map((item,i)=> {
             if(item.text==evt.removed.element.text){
               index=i
             }
          })
          let tmp = this.productList2.splice(index+1,1)
          console.log(tmp)
          this.productList1.splice(evt.removed.oldIndex,0,tmp)
        }
        // console.log(this.productList1,this.productList2)
      },
      //start ,end ,add,update, sort, remove 得到的都差不多
      onStart: function (evt) {
        // console.log(evt)
      },
      onEnd: function (evt) {
         // console.log( evt )
        // evt.item //可以知道拖动的本身
        // evt.to    // 可以知道拖动的目标列表
        // evt.from  // 可以知道之前的列表
        // evt.oldIndex  // 可以知道拖动前的位置
        // evt.newIndex  // 可以知道拖动后的位置
      },
      move: function (evt, originalEvent) {
        // console.log(evt)
        // console.log(originalEvent) //鼠标位置
      }
    },
    mounted(){
      // this.$dragging.$on('dragged', ({ value }) => {
      //   console.log(value)
      // })
      // this.$dragging.$on('dragend', (res) => {
      //   console.error(res);
      // })
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
