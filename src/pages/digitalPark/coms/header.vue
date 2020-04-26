<template>
  <div class="large-size-screen-header flex-align-between">
      <div class="news-box">
        <ul class="news-list hover-pointer" :style="{top}"
            @mouseenter="stopNews" @mouseleave="scrollNews"  v-if="curSystem!='zg'"
        >
          <li v-for="(item,index) in newsList" :key="index" class="news-item">
            <span>{{item.text}}</span>
            <span>{{item.time}}</span>
          </li>
        </ul>
      </div>
      <div class="digital-title">
        <div class="digital-title-text">
          <i class="iconfont iconshuziyuanqu park-logo"></i>
          <span>{{headName}}</span>
        </div>
      </div>
      <div class='dashboard-nav-operator'>
        <NavOperator :moduleType.sync="moduleType" :fromFlag="fromFlag" :showGoBack="showGoBack"/>
      </div>
  </div>
</template>

<script>
  import NavOperator from '@/pages/digitalPark/coms/navOperator'
  export default {
    name: 'LargeSizeScreenHeader',
    components: {
      NavOperator
    },
    props:["moduleType",'fromFlag','headName','showGoBack'], //fromFlag 1：仪表盘 2:大屏
    data () {
      return {
        newsList: [{id: 1, time: '2019-10-10 10:10:10', text: '消息消息消息1111111'},
          {id: 1, time: '2019-10-11 10:11:11', text: '消息消息消息2222222'},
          {id: 3, time: '2019-10-12 10:12:12', text: '消息消息消息3333333'}],
        curNewsIndex:0,
        newsTimer:''
      }
    },
    computed:{
      top() {
        return this.fromFlag==1? -this.curNewsIndex * 50 + 'px': -this.curNewsIndex * 160 + 'px'
      },
      curSystem(){
        return window.__CZ_SYSTEM
      }
    },
    watch:{
    },
    methods: {
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
        clearInterval(this.newsTimer);
      },
    },
    mounted(){
      this.scrollNews()
    }
  }
</script>

<style lang="less">
  .large-size-screen-header{
     height:160px;
     overflow: hidden;
     padding:0 20px;
     box-sizing: border-box;
     background: rgba(255,255,255,.1);
    .news-box{
      height:160px;
      color:#FF7A00;
    }
    .news-list{
      position: relative;
      transition: top 0.5s;
    }
    .news-item{
      line-height: 160px;
    }
    .park-logo{
      font-size: 30px;
      margin-right: 5px;
    }
    .digital-title{
      font-size: 30px;
      font-weight: bold;
      color:@white;
      height: 160px;
      line-height: 160px;
      text-align: center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-image: url('../../../../static/image/digitalPark/title_bg.png');
    }
    .news-box,.digital-title,.dashboard-nav-operator{
      flex: 1;
    }
    .dashboard-nav-operator{
      .digital-nav-operator{
        float: right;
      }
    }
  }

</style>
