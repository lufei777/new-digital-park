<template>
  <div class="asset-check-detail panel-container panel">
    <div class="tip">申请详情</div>
    <zTable :ref="tableConfig.ref" :options="tableConfig">
      <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
        <el-button type="text" @click="onClickCheckBtn(row)" v-if="fromFlag==1">审核</el-button>
        <el-button type="text" @click="onClickReApplyBtn($index)" v-if="fromFlag==1">重新申请</el-button>
        <el-button type="text" @click="onClickDetailBtn($index)" v-if="fromFlag==2">详情</el-button>
      </template>
    </zTable>
    <div class="tip second-tip">审批详情</div>
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in checkList"
        :key="index"
        :type="item.type"
        :color="item.color"
        :size="item.size"
        :timestamp="item.timestamp">
        {{item.content}}
      </el-timeline-item>
    </el-timeline>
    <div class="flex-align-between checker-info">
       <span>审批人：{{userName}}</span>
       <span>审批时间：{{checkDate}}</span>
    </div>
    <div class="flex check-mark">
      <label>审批意见：</label>
      <el-input type="textarea" :rows="4"/>
    </div>
  </div>
</template>

<script>
  import AssetManageApi from '@/service/api/assetManage'
  import moment from 'moment'
  export default {
    name: 'CheckDetail',
    components: {
    },
    props:['fromFlag'],
    data () {
      let columnConfig = [{
        label:'申请日期',
        prop:'date'
      },{
        label:'申请人',
        prop:'applyUser'
      },{
        label:'领用的资产',
        prop:'name'
      },{
        label:'领用人',
        prop:'userName'
      },{
        label:'规格型号',
        prop:'specification'
      },{
        label:'库存数量',
        prop:'quantity'
      },{
        label:'领用数量',
        prop:'num2'
      },{
        label:'备注',
        prop:'description'
      }]
      let userInfo=JSON.parse(localStorage.getItem('userInfo'))
      return {
        tableConfig:{
          ref:'tableRef',
          data:[{date:'2020-2-17',applyUser:'关艳爽',name:'资产领用','user':'刘振刚'}],
          columnConfig:columnConfig,
          customTop: true,
          uiConfig:{
            height: "auto",
            showIndex:true
          }
        },
        checkList:[{timestamp:'2020-10-10'}],
        userName:userInfo.fullName,
        checkDate:moment(new Date()).format('YYYY-MM-DD')
      }
    },
    methods: {
      async getTodoList(){
        // let res = await StockManageApi.getTodoList({
        //   buyStartTime:this.date[0],
        //   buyEndTime:this.date[1],
        //   pageNum:this.curPage,
        //   pageSize:10,
        // })
        // this.tableConfig.data=res.list || []
      },
      onClickResetBtn(){
        this.date=['','']
        this.curPage=1
        this.getStockCheckList()
      },
      onClickCheckBtn(){},
      onClickReApplyBtn(){},
      onClickDetailBtn(){},
      getCheckList(){
          this.checkList.map((item)=>{
            item.type = "primary";
            item.color = "#0bbd87";
            item.size = "large";
          })
      }
    },
    mounted(){
    }
  }
</script>

<style lang="less">
  .asset-check-detail{
    .tip{
      font-weight: bold;
      font-size: 16px;
    }
    .second-tip{
      margin: 20px 0;
    }
    .check-mark{
      label{
        flex-shrink: 0;
      }
    }
    .checker-info{
      margin: 40px 0 20px 0;
    }
  }
</style>

