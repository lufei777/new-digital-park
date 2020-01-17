<template>
  <div class="stock-in-check panel-container">
    <el-tabs type="border-card" @tab-click="onClickTab">
      <el-tab-pane label="入库验收">

        <div v-if="!showCheck">
          <div class="form-box radius-shadow flex-align" v-if="!showCheck">
            <div class="item-group">
              <label for="">购置日期：</label>
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
              <el-button  type="primary" @click="getStockCheckList">搜索</el-button>
              <el-button @click="onClickResetBtn">重置</el-button>
            </div>
          </div>
          <miTable :ref="tableConfig.ref" :tableConfig="tableConfig">
            <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
              <el-button type="text" @click="checkRow(row)">验收</el-button>
              <el-button type="text" @click="deleteRow(row)">作废</el-button>
            </template>
          </miTable>
        </div>

        <RecordDetail v-if="showCheck" :detailId="curId" fromFlag="3"
                      :onClickBackCallback="onClickBackBtn"
                      :onClickCheckCallback="onClickCheckBtn"
        />
      </el-tab-pane>
      <el-tab-pane label="验收记录">
        <Record fromFlag="2"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import miForm from "@/components/Form";
import miTable from "@/components/Table";
import StockManageApi from '@/service/api/stockManage'
import RecordDetail from '../coms/recordDetail'
import Record from '../coms/record'
export default {
  name: "StockCheck",
  components: { miForm, miTable, RecordDetail,Record },
  data() {
    let _this = this
    return {
      date:['',''],
      tableConfig: {
        ref: "tableRef",
        customTop: true,
        operation:true,
        data: [],
        columnConfig: [
          {label:'采购人',prop:'buyUser'},
          {label:'验收人',prop:'acceptUser'},
          {label:'购置日期',prop:'buyTime'},
          {label:'入库日期',prop:'stockTime'},
          {label:'合同号',prop:'contractId'}],
        uiConfig: {
          height: "auto",
          // selection: true,
          pagination:{
            handler:function(size,page){
              _this.handleCurrentChange(page)
            }
          }
        },
      },
      curPage:1,
      showCheck:false,
      curId:''
    };
  },
  methods: {
    async getStockCheckList(){
      let res = await StockManageApi.getStockCheckList({
        buyStartTime:this.date[0],
        buyEndTime:this.date[1],
        pageNum:this.curPage,
        pageSize:10,
      })
      this.tableConfig.data=res.list || []
    },
    handleCurrentChange(page){
      this.curPage=page
      this.getStockCheckList()
    },
    onClickResetBtn(){
       this.date=['','']
       this.curPage=1
       this.getStockCheckList()
    },
    checkRow(row){
      this.curId = row.id
      this.showCheck=true
    },
    deleteRow(row){
      this.curId=row.id
      this.$confirm('确定要作废此申请吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.sureDeleteRow()
      }).catch((err) => {
          this.$message({
            type: 'info',
            message: '已取消操作',
          });
      });
    },
    async sureDeleteRow(){
      let res = await StockManageApi.invalidStockApply({
        stockId:this.curId
      })
      this.$message({
        type: 'success',
        message: res,
      });
      this.getStockCheckList()
    },
    onClickBackBtn(){
      this.showCheck=false
    },
    onClickCheckBtn(){
      this.showCheck=false
      this.getStockCheckList()
    },
    onClickTab(val){
      this.$store.commit('digitalPark/stockInApplyTab',val.index)
    }
  },
  mounted() {
    this.getStockCheckList()
  }
};
</script>

<style lang="less">
.stock-in-check {
  .el-tabs{
    height:100%;
  }
  .form-box{
    padding: 20px;
    .el-input{
      width:200px;
    }
  }
}
</style>
