<template>
  <div class="dashboard-park-home-page">
    <transition name="el-zoom-in-top">
      <div class="dashboard-header flex-align-between" v-show="showHeader">
        <div class="digital-title">cizing数字园区</div>
        <div class="news-box">
          <ul class="news-list hover-pointer" :style="{top}" @mouseenter="stopNews" @mouseleave="scrollNews">
            <li v-for="(item,index) in newsList" :key="index" class="news-item">
              <span>{{item.text}}</span>
              <span>{{item.time}}</span>
            </li>
          </ul>
        </div>

        <NavOperator />
      </div>
    </transition>
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
  import NavOperator from '../coms/navOperator'
  export default {
    name: 'DashBoardHomePage',
    components: {
      draggable,
      NavOperator
    },
    computed: {
      top() {
        return -this.curNewsIndex * 50 + 'px';
      },
    },
    data() {
        return {
          productList1: [{text: '1'}, {text: '2'}, {text: '3'}],
          productList2: [{text: '4'}, {text: '5'}, {text: '6'}],
          changeObj: {},
          showHeader: true,
          newsList: [{id: 1, time: '2019-10-10 10:10:10', text: '消息消息消息1111111'},
            {id: 1, time: '2019-10-11 10:11:11', text: '消息消息消息2222222'},
            {id: 3, time: '2019-10-12 10:12:12', text: '消息消息消息3333333'}],
          newsTimer: '',
          curNewsIndex: 0
        }
      },
      methods: {
        onChange: function (evt) {
          console.log('change1', evt)
          if (evt.removed) {
            this.productList1.splice(evt.removed.oldIndex, 0, this.changeObj)
          } else if (evt.added) {
            this.changeObj = this.productList1.splice(evt.added.newIndex + 1, 1)[0]
          }
          // console.log(this.productList1,this.productList2)
        },
        onChange2: function (evt) {
          console.log('change2', evt)
          if (evt.removed) {
            this.productList2.splice(evt.removed.oldIndex, 0, this.changeObj)
          } else if (evt.added) {
            this.changeObj = this.productList2.splice(evt.added.newIndex + 1, 1)[0]
          }
          // console.log(this.productList1,this.productList2)
        },
        controlHeader() {
          $("body").mousemove((e) => {
            if(e.clientY<60){
              this.showHeader=true
            }else{
              this.showHeader=false
            }
          })
        },
        scrollNews() {
          this.newsTimer = setInterval(() => {
            if (this.curNewsIndex < this.newsList.length-1) {
              this.curNewsIndex += 1;
            } else {
              this.curNewsIndex = 0;
            }
          }, 1500);
        },
        stopNews() {
          console.log(111)
          clearInterval(this.newsTimer);
        },
    },
    mounted(){
      setTimeout(()=>{
        this.showHeader=false
      },3000)
      this.controlHeader()
      this.scrollNews()
    }
  }
</script>

<style lang="less">
  .dashboard-park-home-page{
    display: flex;
    height:100%;
    overflow: hidden;
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
    .dashboard-header{
      width:100%;
      padding:0 20px;
      box-sizing: border-box;
      position: fixed;
      height:50px;
      z-index:99;
      background: @white;
      overflow: hidden;
    }
    .news-box{
      height:50px;
    }
    .news-list{
      position: relative;
      transition: top 0.5s;
    }
    .news-item{
      line-height: 50px;
    }
    .digital-title{
      font-size: 30px;
      font-weight: bold;
      color:@parkMainTextColor;
    }

  }
</style>
