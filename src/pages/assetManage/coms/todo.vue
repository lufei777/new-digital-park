<template>
  <div class="todo-coms">
    <div class="form-box radius-shadow flex-align">
      <div class="item-group">
        <label for="">申请日期：</label>
        <el-date-picker
          v-model="date"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </div>
      <div class="item-group">
        <label for="">申请类型：</label>
        <el-select v-model="applyType" placeholder="请选择">
          <el-option
            v-for="item in typeList"
            :key="item.value"
            :label="item.name"
            :value="item.value"
            >
          </el-option>
        </el-select>
      </div>
      <div class="item-group">
        <el-button  type="primary" @click="getTodoList">搜索</el-button>
        <el-button @click="onClickResetBtn">重置</el-button>
      </div>
    </div>
    <zTable :ref="tableConfig.ref" :options="tableConfig">
      <template slot="operation" slot-scope="{scopeRow:{$index,row,obj}}">
        <el-button type="text" @click="onClickCheckBtn(row)"
                   v-if="(row.status==0 || row.status==1) && fromFlag==1"
        >审核</el-button>
        <el-button type="text" @click="onClickReApplyBtn(row)" v-if="row.status==2">重新申请</el-button>
        <el-button type="text" @click="onClickDetailBtn(row)" v-if="fromFlag==2">详情</el-button>
      </template>
    </zTable>
  </div>
</template>

<script>
  import AssetManageApi from '@/service/api/assetManage'
  import { AssetDic } from "@/utils/dictionary"
  export default {
    name: 'TodoList',
    components: {
    },
    props:['fromFlag'], //fromFlag 1:待办 2：已办
    data () {
      let columnConfig = [{
        label:'申请日期',
        prop:'applyTime'
      },{
        label:'申请人',
        prop:'applyUser'
      },{
        label:'申请类型',
        prop:'applyType',
        formatter:function(row,column){
          return AssetDic.applyType[row.applyType]
        }
      }]
      if(this.fromFlag==2) {
        columnConfig = [...columnConfig, ...
          [{
            label: '当前节点',
            prop: 'receiveUser'
          }]]
      }
      let _this = this
      return {
        date:['',''],
        typeList:[{name:'资产领用',value:1},{name:'资产借用',value:2}],
        applyType:'',
        tableConfig:{
          ref:'tableRef',
          data:[],
          columnConfig:columnConfig,
          customTop: true,
          operation: {
            width:200
          },
          uiConfig:{
            height: "auto",
            selection: true,
            pagination:{
              handler:function(size,page){
                _this.handleCurrentChange(page)
              },
            }
          }
        },
      }
    },
    methods: {
      async getTodoList(){
        let res = await AssetManageApi.getAssetTodoList({
           dealType:this.fromFlag==1?0:1,
           applyType:1,//this.applyType,
           applyStartTime:this.date[0],
           applyEndTime:this.date[1],
           pageNum:this.curPage
        })
        this.tableConfig.data=res.list || []
        this.tableConfig.uiConfig.pagination.total = res.total
      },
      onClickResetBtn(){
        this.date=['','']
        this.curPage=1,
        this.applyType=''
        this.getTodoList()
      },
      onClickCheckBtn(row){
        this.$router.push(`/checkDetail?detail=${JSON.stringify(row)}&fromFlag=${this.fromFlag}`);
      },
      onClickReApplyBtn(row){
        this.$router.push(`/assetUse?id=${row.id}&stockApprovalList=${JSON.stringify(row.stockApprovalList)}`)
        // Cookies.set('activeMenuIndex','')
      },
      onClickDetailBtn(row){
        this.$router.push(`/checkDetail?detail=${JSON.stringify(row)}&fromFlag=${this.fromFlag}`);
      },
      handleCurrentChange(page){
        this.curPage=page
        this.getTodoList()
      }
    },
    mounted(){
      this.getTodoList()
    }
  }
</script>

<style lang="less">
  .todo-coms{
    .form-box{
      padding:20px;
    }
  }
</style>

