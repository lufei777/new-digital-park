<template>
  <div class="alarm-news-status">
    <div class="my-chart">
      <div class="alarm-news-header flex">
        <span style="width:10%">序号</span>
        <span style="width:40%">事件源</span>
        <span>时间</span>
        <span>状态</span>
      </div>
      <ul v-if="alarmNewsData.length!=0" class="alarm-news-list-ul">
        <li v-for="(item,index) in alarmNewsData"
            class="ganged-log-li flex hover-pointer"
            :key="index"
            @click="onClickItemData(item)"
        >
          <span style="width:10%">{{index+1}}</span>
          <span style="width:40%">{{item.alertType}}</span>
          <span>{{item.timeText}}</span>
          <span>{{item.alertTypeText}}</span>
        </li>
      </ul>
      <div class="no-data" v-else>暂无数据</div>
    </div>
  </div>
</template>

<script>
import CommonApi from "@/service/api/common";
export default {
  name: "alarmNewsStatus",
  props: ["moduleItem"],
  data() {
    return {
      alarmNewsData: []
    };
  },
  methods: {
    async getAlarmMessageList() {
      let res = await CommonApi.getAlarmMessageList({
        pageNum: 1,
        pageCount: 5,
        start: "",
        end: ""
      });
      if (res.rows.length != 0) {

        res.rows.map((item, index) => {
          let alertStr = item.caption.split("->");
          let alertDevice = alertStr.pop();
          let alertType = alertStr.pop();
          item.alertType = alertType;
          item.timeText = item.startTime.slice(0,10)
          item.alertTypeText =
            item.handled == 1
              ? "未处理"
              : item.handled == 2
              ? "已处理"
              : "未处理";
        });
        this.alarmNewsData = res.rows
        let height = parseInt($(".my-chart").height()/6)
        // console.log("jeight",height)
        $(".alarm-news-header").css({
          "height":height+'px',
          'line-height':height+'px'
        })
      }
    },
    onClickItemData(item){
      window.FindAssetLocation && window.FindAssetLocation(item.id)
      window.parent.FindAssetLocation &&  window.parent.FindAssetLocation(item.id)
    }
  },
  mounted() {
    this.getAlarmMessageList();
  }
};
</script>

<style lang="less">
.alarm-news-status {
  .my-chart {
    margin-top: 10px;
    box-sizing: border-box;
    overflow: hidden;
    .alarm-news-header {
      width: 100%;
      /*height: 50px;*/
      font-size: 14px;
      background: rgba(17, 29, 33, 0.5);
      text-align: center;
      span {
        width: 25%;
        float: left;
        display: block;
        /*height: 50px;*/
        /*line-height: 50px;*/
      }
    }
    .no-data {
        text-align: center;
        height: 50px;
        line-height: 50px;
    }
  }
  .ganged-log-li {
    width: 100%;
    height: 40px;
    font-size: 14px;
    color: @white;
    text-align: center;
    span {
      width: 25%;
      display: block;
      float: left;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      height: 30px;
      line-height: 30px;
    }
    span:last-child {
      color: #01eafe;
    }
  }
  .alarm-news-list-ul{
    overflow: auto;
  }
}
</style>
