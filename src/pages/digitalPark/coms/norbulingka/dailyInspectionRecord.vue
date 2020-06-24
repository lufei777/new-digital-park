<template>
  <div class="daily-inspection-record">
    <div class="module-item-top-name flex-align tmp-hidden">
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
          <el-tooltip class="item" effect="dark" :content="item.typeStr" placement="top">
            <span>{{item.typeStr}}</span>
          </el-tooltip>
          <span>{{item.personName}}</span>
          <el-tooltip class="item" effect="dark" :content="item.date" placement="top">
            <span>{{item.date}}</span>
          </el-tooltip>
          <span>{{item.result}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  // [{
  //   id:1,
  //   type:'异常记录',
  //   name:'张晓峰',
  //   date:'2020-6-1',
  //   result:'已处理'
  // },{
  //   id:5,
  //   type:'异常记录',
  //   name:'张晓峰',
  //   date:'2020-6-1',
  //   result:'已处理'
  // },{
  //   id:2,
  //   type:'异常记录',
  //   name:'张晓峰',
  //   date:'2020-6-1',
  //   result:'已处理'
  // },{
  //   id:3,
  //   type:'异常记录',
  //   name:'张晓峰',
  //   date:'2020-6-1',
  //   result:'已处理'
  // },{
  //   id:4,
  //   type:'异常记录',
  //   name:'张晓峰',
  //   date:'2020-6-1',
  //   result:'已处理'
  // }]
  import CommonApi from '@/service/api/common'

  export default {
    name: 'dailyInspectionRecord',
    components: {},
    props: ['moduleItem'],
    data() {
      return {
        list: []
      }
    },
    computed: {},
    watch: {},
    methods: {
      async getList() {
        let res = await CommonApi.getDailyCheckList({
          pageNum:1,
          pageSize:5
        })
        // let res = {
        //   "code": 0, "msg": "successfully", "extend": {
        //     "pageInfo": {
        //       "pageNum": 1,
        //       "pageSize": 10,
        //       "size": 6,
        //       "startRow": 1,
        //       "endRow": 6,
        //       "total": 6,
        //       "pages": 1,
        //       "list": [{
        //         "deviceName": null,
        //         "typeStr": "保养与维护工程记录",
        //         "id": 44,
        //         "type": 1,
        //         "checkType": 112,
        //         "date": "2020-05-29 11:50:31",
        //         "photo": "",
        //         "photos": null,
        //         "description": "建筑相关日常巡查",
        //         "person": 10001,
        //         "personName": "管理员",
        //         "result": "已处理",
        //         "deviceId": null,
        //         "catalogId": [16001],
        //         "selectedIdList": [112],
        //         "checkStatus": 0,
        //         "checkState": 0,
        //         "state": 0,
        //         "zhiPaiUserName": null
        //       }, {
        //         "deviceName": null,
        //         "typeStr": "保养与维护工程记录",
        //         "id": 43,
        //         "type": 1,
        //         "checkType": 112,
        //         "date": "2020-05-29 11:49:37",
        //         "photo": "",
        //         "photos": null,
        //         "description": "寺庙相关日常巡查",
        //         "person": 10001,
        //         "personName": "管理员",
        //         "result": "已处理",
        //         "deviceId": null,
        //         "catalogId": [16001],
        //         "selectedIdList": [112],
        //         "checkStatus": 0,
        //         "checkState": 0,
        //         "state": 0,
        //         "zhiPaiUserName": null
        //       }, {
        //         "deviceName": null,
        //         "typeStr": "保养与维护工程记录",
        //         "id": 42,
        //         "type": 1,
        //         "checkType": 112,
        //         "date": "2020-05-29 11:48:57",
        //         "photo": "",
        //         "photos": null,
        //         "description": "宫殿相关日常巡查",
        //         "person": 10001,
        //         "personName": "管理员",
        //         "result": "已处理",
        //         "deviceId": null,
        //         "catalogId": [16001],
        //         "selectedIdList": [112],
        //         "checkStatus": 0,
        //         "checkState": 0,
        //         "state": 0,
        //         "zhiPaiUserName": null
        //       }, {
        //         "deviceName": null,
        //         "typeStr": "保养与维护工程记录",
        //         "id": 41,
        //         "type": 1,
        //         "checkType": 112,
        //         "date": "2020-05-26 00:00:00",
        //         "photo": "",
        //         "photos": null,
        //         "description": "宫殿相关日常巡查",
        //         "person": 10001,
        //         "personName": "管理员",
        //         "result": "已处理",
        //         "deviceId": null,
        //         "catalogId": [16001],
        //         "selectedIdList": [112],
        //         "checkStatus": 0,
        //         "checkState": 0,
        //         "state": 0,
        //         "zhiPaiUserName": null
        //       }, {
        //         "deviceName": null,
        //         "typeStr": "保养与维护工程记录",
        //         "id": 40,
        //         "type": 1,
        //         "checkType": 112,
        //         "date": "2020-05-25 11:45:00",
        //         "photo": "",
        //         "photos": null,
        //         "description": "建筑相关日常巡查",
        //         "person": 10001,
        //         "personName": "管理员",
        //         "result": "已处理",
        //         "deviceId": null,
        //         "catalogId": [16001],
        //         "selectedIdList": [112],
        //         "checkStatus": 0,
        //         "checkState": 0,
        //         "state": 0,
        //         "zhiPaiUserName": null
        //       }],
        //       "prePage": 0,
        //       "nextPage": 0,
        //       "isFirstPage": true,
        //       "isLastPage": true,
        //       "hasPreviousPage": false,
        //       "hasNextPage": false,
        //       "navigatePages": 8,
        //       "navigatepageNums": [1],
        //       "navigateFirstPage": 1,
        //       "navigateLastPage": 1,
        //       "firstPage": 1,
        //       "lastPage": 1
        //     }
        //   }
        // }
        if (res.extend.pageInfo.list.length) {
          this.list = res.extend.pageInfo.list
          this.$nextTick(() => {
            let height = $(".my-chart").height() / 6
            $(".task-header span, .item-task").css({
              'height': height + 'px',
              'line-height': height + 'px'
            })
          })
        }
      }
    },
    mounted() {
      this.getList()
    }
  }
</script>

<style lang="less">
  .daily-inspection-record {
    .task-header {
      width: 100%;
      font-size: 14px;
      background: rgba(22, 47, 88, 1);
      text-align: center;
      line-height: 30px;

      span {
        color: #01EAFE;
        width: 20%;
        float: left;
      }

      span:nth-child(1) {
        width: 15%;
      }

      span:nth-child(3) {
        width: 23%;
      }

      span:nth-child(4) {
        width: 22%;
      }
    }

    .item-task {
      width: 100%;
      height: 40px;
      font-size: 14px;
      color: @white;
      text-align: center;

      span {
        width: 20%;
        display: block;
        float: left;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        height: 30px;
        line-height: 30px;
      }

      span:nth-child(1) {
        width: 15%;
      }

      span:nth-child(3) {
        width: 23%;
      }

      /*span:nth-child(3){*/
      /*width:22%;*/
      /*}*/

      span:nth-child(4) {
        width: 22%;
      }
    }
  }
</style>
