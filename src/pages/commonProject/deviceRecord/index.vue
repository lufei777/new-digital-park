<template>
  <div class="device-record">
    <EnergyTree />
    <div class="right-content" v-if="!showEdit && !showAdd && !showImport">
      <div class="search-box radius-shadow flex-align">
           <div class="item-group flex-align">
               <label>表名称：</label>
               <el-input v-model="meterName" class="meter-name"></el-input>
           </div>
           <div class="item-group">
             <label>表计：</label>
             <el-select v-model="meterTypes">
               <el-option  label="全部" value="0,1">
               </el-option>
               <el-option  label="实表" value="0">
               </el-option>
               <el-option  label="虚表" value="1">
               </el-option>
             </el-select>
           </div>
           <el-button type="primary" icon="el-icon-search"
                      class="search-btn" @click="onClickSearchBtn">搜索</el-button>
      </div>
      <div class="table-box radius-shadow">
        <div class="operator-box">
          <el-button type="primary" class="" @click="onClickImportBtn">导入</el-button>
          <el-button type="primary" icon="el-icon-delete" @click="onClickmultipleDelBtn">删除记录</el-button>
          <el-button type="primary" icon="el-icon-plus" @click="onClickAddBtn">添加记录</el-button>
        </div>
        <Table :ref="tableConfig.ref" :table-config="tableConfig">
          <!--<template slot="custom-top" slot-scope="scope">-->
            <!---->
          <!--</template>-->
        </Table>
      </div>

      <div class="item-row-detail-table radius-shadow">
        <div class="item-row-detail-tip">列表详情</div>
        <table>
          <tbody>
          <tr><th>编号</th><td>{{curTableData.id}}</td></tr>
          <tr><th>工程名称</th><td>{{curTableData.name}}</td></tr>
          <tr><th>表名称</th><td>{{curTableData.caption}}</td></tr>
          <tr><th>表类型</th><td>{{curTableData.meterType==0?'实表':'虚表'}}</td></tr>
          <tr><th>分项类别</th><td>{{curTableData.itemizeCaption}}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <EditMeter v-if="showEdit" :curMeterId="curTableData.id" :isEdit="isEdit"/>
    <AddMeter  v-if="showAdd" />
    <ImportMeter v-if="showImport"/>
  </div>
</template>

<script>
  import CommonApi from '../../../service/api/commonApi'
  import Table from '../../../components/Table/index'
  import EditMeter from './editMeter'
  import AddMeter from './addMeter'
  import ImportMeter from './importMeter'
  import EnergyTree from './coms/energyTree'
  export default {
    name: 'DeviceRecord',
    components: {
      Table,
      EditMeter,
      AddMeter,
      ImportMeter,
      EnergyTree
    },
    data () {
      let _this = this
      return {
        curEnergy:'1002',
        meterName:'',
        meterTypes:"0,1",
        parentMeter:'',
        curPage:1,
        tableConfig:{
          ref: "tableRef",
          data:[],
          columnConfig:[],
          uiConfig: {
            height: "auto",
            selection: true,
            pagination: {
              layout: "total,->, prev, pager, next, jumper",
              handler(pageSize,val) {
                _this.handleCurrentChange(val)
              }
            }
          },
          btnConfig:{
            prop: "operation",
            label:'操作',
            fixed: "right",
            width: 150,
            btns: [
              {
                type: "basic",
                label: "编辑",
                handler: function(data) {
                  _this.editRow(data.row);
                }
              },
              {
                type: "basic",
                label: "删除",
                handler: function(data) {
                  _this.deleteRow(data.row);
                }
              }]
          },
          tableMethods: {
            rowClick:_this.rowClick
          },
        },
        curTableData:{},
        showEdit:false,
        isdeleteAll:1,
        deleteId:'',
        showAdd:false,
        isEdit:false,
        showImport:false
      }
    },
    computed:{

    },
    methods: {
      async getMeterTable(){
        let params={
          catalogId:this.curEnergy,
          parentMeter:this.parentMeter,
          meterTypes:this.meterTypes,
          caption:this.meterName,
          page:this.curPage,
          size:10
        }
        let res = await CommonApi.getMeterTable(params)
        this.tableConfig.columnConfig=[
          {label:'编号',prop:'id'},
          {label:'工程名称',prop:'name'},
          {label:'表名称',prop:'caption'},
          {label:'表类型',prop:'meterType'},
          {label:'分项类别',prop:'itemizeCaption'}]
        if(res && res.rows){
          this.tableConfig.data=res.rows
          this.tableConfig.uiConfig.pagination.total=res.total
          this.curTableData=res.rows[0] || {}
        }
      },
      onClickItemTree(val){
        this.parentMeter=val.id
        // this.showAdd=false
        // this.showEdit=false
        // this.getMeterTable()
      },
      handleCurrentChange(val){
        this.curPage=val
        this.getMeterTable()
      },
      onClickSearchBtn(){
        this.curPage=1
        this.getMeterTable()
      },
      rowClick(row){
        this.curTableData=row
      },
      editRow(data){
        this.curTableData=data
        this.showEdit=true
        this.isEdit=true
      },
      deleteRow(data){
        console.log("data",data)
        this.isdeleteAll=1
        this.deleteId=data.id
        this.deleteTip()
      },
      async sureDelete(){
         await CommonApi.deleteMeter({
          id:this.deleteId,
          isdeleteAll:this.isdeleteAll
        })
        this.$message({
              type: 'success',
              message: '删除成功!'
         });
         this.getMeterTable()
      },
      handleSelectionChange(val){
        this.isdeleteAll=2
        let tmp=val.map((item)=>item.id)
        this.deleteId=tmp
      },
      deleteTip(){
        if(!this.deleteId){
          this.$message({
            type: 'warning',
            message: '请先选择节点！',
            duration:1000
          });
          return;
        }
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.sureDelete()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
      },
      onClickAddBtn(){
        // this.showAdd=true
        // this.isEdit=false
        this.$router.push("/addDevice")
      },
      onClickImportBtn(){
        this.showImport=true
      },
      onClickmultipleDelBtn(){
        let res = this.$refs[this.tableConfig.ref].getSelectedData()
        console.log(res)
      },
    },
     mounted(){
      this.getMeterTable()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '../less/dataDetailRow.less';
  .device-record{
    margin-top: 50px;
    .search-box{
      padding:20px 0 20px 20px;
      background: @white;
      overflow: hidden;
      margin-bottom: 20px;
    }
    .item-group{
      label{
        flex-shrink: 0;
        text-align: right;
        margin-right: 5px;
      }
      .el-select{
        width:100px;
        margin:0;
      }
    }
    .search-btn{
      margin-left: 20px;
    }
    .table-box{
      padding:20px;
      clear: both;
      background: @white;
      /*overflow: hidden;*/
    }
    .operator-box{
      background: @white;
      margin-bottom: 20px;
      display: flex;
      flex-direction: row-reverse;
      .el-button{
        margin-left:20px;
      }
    }
    .item-row-detail-table{
      margin-top: 20px;
      tr:nth-child(5) td{
        border-bottom:1px solid @mainBg;
      }
    }
    .item-row-detail-tip{
      color:@mainBgColor;
      margin-bottom:20px;
      font-weight: bold;
    }
  }
</style>
