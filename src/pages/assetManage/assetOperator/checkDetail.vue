<template>
  <div class="asset-check-detail panel-container panel">
    <div class="tip">申请详情</div>
    <zTable :ref="tableConfig.ref" :options="tableConfig">
    </zTable>
    <div class="tip second-tip">审批详情</div>
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in checkList"
        :key="index"
        :type="item.type"
        :color="item.color"
        :size="item.size"
        :timestamp="item.approvalTime"
        placement="top">
        <el-card>
          <span>{{item.approvalUser}}</span>
          <span>{{item.pointName}}</span>
          <span>{{item.isPass?'通过':'不通过'}}</span>
          <div class="opinion">{{item.opinion}}</div>
        </el-card>
      </el-timeline-item>
    </el-timeline>
    <div v-if="fromFlag==1">
      <div class="flex-align-between checker-info">
        <span>审批人：{{userName}}</span>
        <span>审批时间：{{checkDate}}</span>
      </div>
      <div class="flex check-mark">
        <label>审批意见：</label>
        <el-input v-model="opinion" type="textarea" :rows="4"/>
      </div>
    </div>
    <div class="flex-align-center operator-box">
      <el-button  @click="onClickDealBtn(true)" v-if="fromFlag==1">通过</el-button>
      <el-button  @click="onClickDealBtn(false)" v-if="fromFlag==1">不通过</el-button>
      <el-button  @click="onClickBackBtn">关闭</el-button>
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
    data () {
      let columnConfig = [{
        label:'申请日期',
        prop:'applyTime'
      },{
        label:'申请人',
        prop:'applyUser'
      },{
        label:'领用的资产',
        prop:'name'
      },{
        label:'领用人',
        prop:'collarUser'
      },{
        label:'规格型号',
        prop:'specification'
      },{
        label:'库存数量',
        prop:'actualQuantity'
      },{
        label:'领用数量',
        prop:'collarNum'
      },{
        label:'备注',
        prop:'description'
      }]
      let userInfo=JSON.parse(localStorage.getItem('userInfo'))
      return {
        tableConfig:{
          ref:'tableRef',
          data:[],
          columnConfig:columnConfig,
          customTop: true,
          uiConfig:{
            height: "auto",
            showIndex:true
          }
        },
        checkList:[],
        userName:userInfo.name,
        checkDate:moment(new Date()).format('YYYY-MM-DD'),
        opinion:''
      }
    },
    computed:{
      fromFlag(){
        return this.$route.query.fromFlag
      },
      detail(){
        return  JSON.parse(this.$route.query.detail)
      }
    },
    methods: {
      getCheckList(){
        this.checkList = this.detail.stockApprovalList
        this.checkList.map((item)=>{
          item.type = "primary";
          item.color = "#0bbd87";
          item.size = "large";
        })
      },
      onClickBackBtn(){
        if(this.fromFlag==1){
          this.$router.push("/todoList")
        }else{
          this.$router.push("/todoList")
        }
      },
      async onClickDealBtn(isPass){
        let params = {
          isPass,
          opinion:this.opinion,
          stockDealId:this.detail.id
        }
        let res = await AssetManageApi.dealAssetApply(params)
        this.$message({
          type:'success',
          message:res
        })
        this.$router.push('/todoList')
      }
    },
    mounted(){
      this.tableConfig.data = this.detail.stockDealDetailsList
      this.getCheckList()
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
    .operator-box{
      margin:40px;
      .el-button{
        margin:0 20px;
      }
    }
    .el-card{
      width:80%;
    }
    .opinion{
      margin:20px 0;
    }
  }
</style>

