<template>
  <div class="daily-inspection-record">
    <div class="module-item-top-name flex-align">
      <i class="module-item-top-icon"></i>
      <span>{{moduleItem.moduleName}}</span>
    </div>
    <div class="my-chart">
      <div class="task-header flex" :class="moduleItem.type!=2?'':'task-header-white'">
        <span>序号</span>
        <span>维护类型</span>
        <span>巡检人员</span>
        <span>日期</span>
        <span>处理结果</span>
      </div>
      <ul class="daily-list-ul">
        <li v-for="(item,index) in list" :key="index" class="item-task flex"
            :class="moduleItem.type!=2?'':'task-li'">
          <span>{{index+1}}</span>
          <span>{{item.type}}</span>
          <span>{{item.name}}</span>
          <span>{{item.date}}</span>
          <span>{{item.result}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
      name: 'dailyInspectionRecord',
      components: {},
      props: ['moduleItem'],
      data() {
          return {
            list:[]
          }
      },
      computed: {},
      watch: {},
      methods: {
        getList(){
          this.list = [{
            id:1,
            type:'异常记录',
            name:'张晓峰',
            date:'2020-6-1',
            result:'已处理'
          },{
            id:5,
            type:'异常记录',
            name:'张晓峰',
            date:'2020-6-1',
            result:'已处理'
          },{
            id:2,
            type:'异常记录',
            name:'张晓峰',
            date:'2020-6-1',
            result:'已处理'
          },{
            id:3,
            type:'异常记录',
            name:'张晓峰',
            date:'2020-6-1',
            result:'已处理'
          },{
            id:4,
            type:'异常记录',
            name:'张晓峰',
            date:'2020-6-1',
            result:'已处理'
          }]
          this.$nextTick(()=>{
            let height = $(".my-chart").height()/6
            // console.log("height",height,$(".item-task").length,$(".task-header").length)
            $(".task-header span, .item-task").css({
              'height':height+'px',
              'line-height':height+'px'
            })
          })
        }
      },
      mounted() {
        this.getList()
      }
  }
</script>

<style lang="less">
  .daily-inspection-record{
    .task-header {
      width: 100%;
      font-size: 14px;
      background: rgba(22,47,88,1);
      text-align: center;
      span {
        color:#01EAFE;
        width:20%;
        float: left;
      }
    }
    .item-task{
      width: 100%;
      height: 40px;
      font-size: 14px;
      color: @white;
      text-align: center;
      span{
        width:20%;
        display: block;
        float: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        height: 30px;
        line-height: 30px;
      }
    }
  }
</style>
