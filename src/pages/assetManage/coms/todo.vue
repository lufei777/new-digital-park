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
        <el-select v-model="typeId" placeholder="请选择">
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
      <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
        <el-button type="text" @click="onClickCheckBtn(row)" v-if="fromFlag==1">审核</el-button>
        <el-button type="text" @click="onClickReApplyBtn(row)" v-if="fromFlag==1">重新申请</el-button>
        <el-button type="text" @click="onClickDetailBtn($index)" v-if="fromFlag==2">详情</el-button>
      </template>
    </zTable>
  </div>
</template>

<script>
  import AssetManageApi from '@/service/api/assetManage'
  export default {
    name: 'TodoList',
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
        label:'申请类型',
        prop:'name'
      }]
      if(this.fromFlag==2) {
        columnConfig = [...columnConfig, ...
          [{
            label: '当前节点',
            prop: 'user'
          }]]
      }
      return {
        date:['',''],
        typeList:[{name:'资产领用',value:0},{name:'资产借用',value:1}],
        typeId:0,
        tableConfig:{
          ref:'tableRef',
          data:[{date:'2020-2-17',applyUser:'关艳爽',name:'资产领用','user':'刘振刚'}],
          columnConfig:columnConfig,
          customTop: true,
          operation: {
            width:200
          },
          uiConfig:{
            height: "auto",
            selection: true,
          }
        },
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
      onClickCheckBtn(row){
        this.$router.push(`/checkDetail?id=${row.id}`)
      },
      onClickReApplyBtn(row){
        this.$router.push(`/assetUse?id=${row.id}`)
        // Cookies.set('activeMenuIndex','')
      },
      onClickDetailBtn(){}
    },
    mounted(){
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

