<template>
  <div class="hello">
    <ul id="sortable0">
      <li v-for="item in proModuleList0" :key="item.id"
          :data-id="item.id"
          :class="'item-product'+item.id">{{item.id}}
      </li>
    </ul>
    <ul id="sortable1" class="connectedSortable">
      <li v-for="(item,index) in proModuleList1" :key="item.id"
          :data-index="index"
          :class="'item-product'+item.id">{{item.id}}
      </li>
    </ul>
    <ul id="sortable2" class="connectedSortable">
      <li v-for="(item,index) in proModuleList2" :key="item.id"
          :data-index="index"
          :class="'item-product'+item.id">{{item.id}}
      </li>
    </ul>
    <draggable :list="proModuleList1"
               @start="onDragStart"
               :move="onDragMove"
               @end="onDragEnd"
    >
      <div v-for="item in proModuleList1" class="item-product">{{item.id}}</div>
    </draggable>
  </div>

</template>

<script>
  import Vue from 'vue'
  import {mapState} from 'vuex'
  import draggable from 'vuedraggable'

  export default {
    name: 'HelloWorld',
    components: {
      draggable
    },
    data() {
      return {
        msg: 'Welcome to my basic vue demo',
        proModuleList0: [{id: 7, name: {name2: 2}}, {id: 8, name: {name2: 3}}, {id: 9, name: {name2: 4}}],
        proModuleList1: [{id: 1, name: {name2: 2}}, {id: 2, name: {name2: 3}}, {id: 3, name: {name2: 4}}],
        proModuleList2: [{id: 4, name: {name2: 2}}, {id: 5, name: {name2: 3}}, {id: 6, name: {name2: 4}}],
        animationFlag: false,
        isDown: false,
      }
    },
    computed: {
      ...mapState({
        articleNew: state => state.test.articleNew
      })
    },
    watch: {},
    methods: {
      onDragStart(evt) {
        console.log("start-evt", evt)
      },
      onDragMove(evt) {
        console.log("move-evt", evt)
      },
      onDragEnd(evt) {
        console.log("end-evt", evt)
      }
    },
    mounted() {
      let _this = this
      let arr = [..._this.proModuleList1, ..._this.proModuleList2]
      arr.map((item)=>{
        item.position=$(".item-product"+item.id).offset()
      })
      // console.log("arr",arr)
      $( "#sortable0 li" ).draggable({
        connectToSortable: "#sortable1,#sortable2",
        helper: "clone",
        revert: "invalid",
        stop: function (event, ui) {
          let arr = [..._this.proModuleList1, ..._this.proModuleList2]
          arr.map((item) => {
            // let obj = _this.proModuleList0.find((pro)=>{
            //   return pro.id==item.id
            // })
            // console.log("obj",obj)
            //模拟7是被拖拽克隆的
            let obj = {
              id: 7
            }
            if (obj) {
              $("#sortable0 .item-product" + obj.id).draggable('disable')
            }
          })
        },
      });

      $("#sortable1 li").draggable({
        connectToSortable: "#sortable1,#sortable2",
        create: function (event, ui) {
          // console.log("create1",event,ui)
        },
        start: function (event, ui) {
          // console.log("start1",event,ui)
        },
        stop: function (evt, ui) {
          // console.log("stop1",evt,ui)
          // console.log($(this))
          if ($(this).parent("#sortable1").length) {
            let tmpArr = []
            for (let i = 0; i < $("#sortable1 li").length; i++) {
              let index = $("#sortable1 li").eq(i).attr("data-index")
              let tmpObj = _this.proModuleList1[index]
              tmpObj.position = $("#sortable1 li").eq(i).offset()
              tmpArr.push(tmpObj)
            }
            tmpArr.map((item) => {
              console.log("tmp", item.id)
            })
            _this.proModuleList1 = tmpArr
          } else {
            console.log("change")
            let curIndex = $(this).attr("data-index")
            let curNode = _this.proModuleList1[curIndex]
            let left = evt.toElement.offsetLeft
            let top = evt.toElement.offsetTop
            console.log(curIndex,curNode.position,top,left)
            let tmp = []
            _this.proModuleList2.map((item) => {
              tmp.push(Math.abs(item.position.top - top))
            })
            let min = tmp[0], index = 0
            tmp.map((item, i) => {
              if (item < min) {
                min = item
                index = i
              }
            })
            Vue.set(_this.proModuleList1, curIndex, _this.proModuleList2[index])
            Vue.set(_this.proModuleList2, index, curNode)
            // let arr = [..._this.proModuleList1, ..._this.proModuleList2]
            // arr.map((item,index)=>{
            //   item.position = $("#sortable1 li").eq(index).offset()
            // })
            // _this.proModuleList1=arr.slice(0,3)
            // _this.proModuleList2 = arr.slice(3)
            console.log(_this.proModuleList1, _this.proModuleList2)
          }
        },
      });

      // $("#sortable2 li").draggable({
      //   connectToSortable: "#sortable1,#sortable2",
      //   create: function (event, ui) {
      //     // console.log("create1",event,ui)
      //   },
      //   start: function (event, ui) {
      //     // console.log("start1",event,ui)
      //   },
      //   stop: function (evt, ui) {
      //     // console.log("stop1",evt,ui)
      //     // console.log($(this))
      //     if ($(this).parent("#sortable2").length) {
      //       let tmpArr = []
      //       for (let i = 0; i < $("#sortable2 li").length; i++) {
      //         let index = $("#sortable2 li").eq(i).attr("data-index")
      //         let tmpObj = _this.proModuleList2[index]
      //         tmpObj.position = $("#sortable2 li").eq(i).offset()
      //         tmpArr.push(tmpObj)
      //       }
      //       tmpArr.map((item) => {
      //         console.log("tmp", item.id)
      //       })
      //       _this.proModuleList2 = tmpArr
      //     } else {
      //       console.log("change")
      //       let curIndex = $(this).attr("data-index")
      //       let curNode = _this.proModuleList2[curIndex]
      //       let left = evt.toElement.offsetLeft
      //       let top = evt.toElement.offsetTop
      //       console.log(curIndex,curNode.position,top,left)
      //       let tmp = []
      //       _this.proModuleList1.map((item) => {
      //         tmp.push(Math.abs(item.position.top - top))
      //       })
      //       let min = tmp[0], index = 0
      //       tmp.map((item, i) => {
      //         if (item < min) {
      //           min = item
      //           index = i
      //         }
      //       })
      //       Vue.set(_this.proModuleList2, curIndex, _this.proModuleList1[index])
      //       Vue.set(_this.proModuleList1, index, curNode)
      //       // let arr = [..._this.proModuleList1, ..._this.proModuleList2]
      //       // arr.map((item,index)=>{
      //       //   item.position = $("#sortable1 li").eq(index).offset()
      //       // })
      //       // _this.proModuleList1=arr.slice(0,3)
      //       // _this.proModuleList2 = arr.slice(3)
      //       console.log(_this.proModuleList1, _this.proModuleList2)
      //     }
      //   },
      // });

      $("#sortable1, #sortable2").sortable({
        connectWith: ".connectedSortable"
      }).disableSelection();
    }

  }

  // $(function(){
  //    $("#sortable0 li" ).draggable({
  //      helper: "clone",
  //      appendTo:'#sortable1',
  //      connectToSortable: "#sortable1,#sortable2",
  //      stop:function( event, ui ){
  //        //console.log(event,ui)
  //
  //      },
  //      start:function(evt,ui){
  //
  //      }
  //    })
  //
  //   $( "#sortable0,#sortable1, #sortable2" ).sortable({
  //     connectWith: ".connectedSortable"
  //   }).disableSelection();
  // })
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .hello {
    height: 100%;
    background: @white;

    #sortable1, #sortable2, #sortable0 {
      list-style-type: none;
      margin: 0;
      padding: 0 0 2.5em;
      float: left;
      margin-right: 10px;
    }

    #sortable1 li, #sortable2 li, #sortable0 li {
      margin: 0 5px 5px 5px;
      padding: 5px;
      font-size: 1.2em;
      width: 120px;
      background: pink
    }

    #sortable2 li {
      background: yellowgreen;
    }

    #sortable0 li {
      background: #b1dfbb;
    }

    .item-product {
      width: 200px;
      height: 200px;
      background: pink;
      margin: 20px auto;
      font-size: 30px;
      text-align: center;
      line-height: 200px;
    }
  }

</style>
