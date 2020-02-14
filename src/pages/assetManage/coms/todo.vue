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
        <label for="">申请日期：</label>
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
    <zTable :ref="tableConfig.ref" :options="tableConfig"></zTable>
  </div>
</template>

<script>
  import AssetManageApi from '@/service/api/assetManage'
  export default {
    name: 'TodoList',
    components: {
    },
    data () {
      return {
        date:['',''],
        typeList:[{name:'资产领用',value:0},{name:'资产借用',value:1}],
        typeId:0,
        tableConfig:{
          ref:'tableRef',
          data:[],
          columnConfig:[{
            label:'申请日期',
            prop:'date'
          },{
            label:'申请人',
            prop:'applyUser'
          },{
            label:'申请类型',
            prop:'name'
          }],
          customTop: true,
          operation: true,
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

