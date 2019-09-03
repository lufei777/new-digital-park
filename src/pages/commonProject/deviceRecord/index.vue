<template>
  <div class="device-record">
    <div class="left-zoom-nav">
      <el-select  v-model="curEnergy" placeholder="请选择" @change="getMeterTree">
        <el-option label="电" value="1002"></el-option>
        <el-option label="水" value="4000"></el-option>
      </el-select>
      <el-tree
        :data="meterList"
        :props="treeProps"
        node-key="id"
        :default-expanded-keys="[2525]"
        ref="navTree"
        @node-click="onClickItemTree"
      >
      </el-tree>
    </div>
    <div class="right-content" v-if="!showEdit">
      <div class="tip flex-align">
        <span class="icon"></span>
        <span>设备表计</span>
      </div>
      <div class="search-box">
         <div class="left-search">
            <div class="block flex-align">
              <span>表名称</span>
              <el-input v-model="meterName" class="meter-name"></el-input>
            </div>
           <div class="block flex-align">
             <span>表计</span>
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
         <el-button type="primary" class="import-btn">导入</el-button>
      </div>
      <div class="table-box">
        <CommonTable :tableObj="tableData" :curPage="1"/>
      </div>
      <div class="operator-box">
        <el-button type="primary" icon="el-icon-delete">删除记录</el-button>
        <el-button type="primary" icon="el-icon-plus">添加记录</el-button>
      </div>
      <div class="tip flex-align">
        <span class="icon"></span>
        <span>列表详情</span>
      </div>
      <div class="meter-detail-table">
        <table>
          <tbody>
          <tr><th>编号</th><td>{{curTableData.id}}</td></tr>
          <tr><th>工程名称</th><td>{{curTableData.name}}</td></tr>
          <tr><th>表名称</th><td>{{curTableData.caption}}</td></tr>
          <tr><th>表类型</th><td>{{curTableData.meterType==0?'实表':'虚表'}}</td></tr>
          <tr><th>分享类别</th><td>{{curTableData.itemizeCaption}}</td></tr>
          </tbody>
        </table>
      </div>
    </div>
    <EditMeter v-if="showEdit" :curMeterId="curTableData.id"></EditMeter>
  </div>
</template>

<script>
  import CommonApi from '../../../service/api/commonApi'
  import CommonTable from '../../../components/commonTable'
  import EditMeter from './editMeter'
  export default {
    name: 'DeviceRecord',
    components: {
      CommonTable,
      EditMeter
    },
    data () {
      return {
        curEnergy:'1002',
        meterList:[],
        treeProps:{
          label:'text',
          children: 'nodes',
        },
        meterName:'',
        meterTypes:"0,1",
        parentMeter:'',
        curPage:1,
        tableData:{},
        curTableData:{},
        showEdit:false
      }
    },
    methods: {
      async getMeterTree(){
        this.meterList = await CommonApi.getMeterTree({
          parentMeter: 0,
          catalogId:this.curEnergy
        })
      },
      async getMeterTable(){
        let res = await CommonApi.getMeterTable({
          catalogId:this.curEnergy,
           parentMeter:this.parentMeter,
          meterTypes:this.meterTypes,
          caption:this.meterName,
          page:this.curPage,
          size:10
        })
        res.labelList=[{name:'',prop:'',type:'selection'},
          {name:'编号',prop:'id'},
          {name:'工程名称',prop:'name'},
          {name:'表名称',prop:'caption'},
          {name:'表类型',prop:'meterType'},
          {name:'分项类别',prop:'itemizeCaption'}]
        res.dataList=res.rows
        res.hideExportBtn=true
        res.showOpertor=true
        this.tableData=res
      },
      onClickItemTree(val){
        this.parentMeter=val.id
      },
      handleCurrentChange(val){
        this.curPage=val
        this.getMeterTable()
      },
      onClickSearchBtn(){
        this.curPage=1
        this.getMeterTable()
      },
      rowClick(row,col){
        this.curTableData=row
      },
      editRow(data){
        this.curTableData=data
        this.showEdit=true
      },
      deleteRow(data){
        this.$confirm('确定要删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.$message({
          //   type: 'success',
          //   message: '删除成功!'
          // });
          this.sureDelete(data)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
      },
      async sureDelete(data){
         await CommonApi.deleteMeter({
          id:data.id,
          isdeleteAll:1
        })
        this.$message({
              type: 'success',
              message: '删除成功!'
         });
         this.getMeterTable()
      }
    },
    async mounted(){
      await this.getMeterTree()
      this.getMeterTable()
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .device-record{
    margin-top: 45px;
    .left-zoom-nav{
      width:17%;
      float: left;
      position: fixed;
      height: 100%;
      overflow: auto;
      background: var(--mainBg);
      padding: 10px 0;
      .el-select{
        width:120px;
        margin:0 0 20px 25%;
      }
      .el-tree{
        background: var(--mainBg);
        font-size: 16px;
      }
      .el-tree-node__content{
        color:@white;
        padding:5px 0;
      }
      .el-tree-node__content:hover{
        color:#22dbfc;
      }
      .el-tree-node:focus>.el-tree-node__content{
        color:#22dbfc;
      }
    }
    .right-content{
      width:83%;
      padding:10px;
      float: right;
      box-sizing: border-box;
      background: #eaeff3;
    }

    .tip{
      height: 66px;
      border-bottom: 1px solid #eaeaea;
      background: @white;
      padding:0 10px;
      .icon {
        width: 2px;
        height: 24px;
        background: #01465c;
        border-radius: 2px;
        margin-right: 10px;
      }
      span{
        font-size: 24px;
        color:#01465c;
      }
    }
    .search-box{
      padding:20px 0;
      background: @white;
      overflow: hidden;
    }
    .left-search{
      float: left;
      width:70%;
      display: flex;
      align-items: center;
    }
    .block{
      margin-right:10px;
       span{
         width:70px;
         text-align: right;
         margin-right: 5px;
       }
      .el-select{
        width:100px;
        margin:0;
      }
    }
    .import-btn{
      float: right;
      margin-right: 10px;
    }
    .search-btn{
      margin-left: 20px;
    }
    .table-box{
      padding:10px;
      clear: both;
      background: @white;
      /*overflow: hidden;*/
    }
    .operator-box{
      background: @white;
      margin-bottom: 20px;
      padding: 10px;
    }
    .meter-detail-table{
      background: @white;
      overflow: hidden;
      padding:20px;
      table{
        text-align: left;
        width:70%;
        border-spacing: 0;
      }
      th{
        background: var(--mainBg);
        color:@white;
        font-weight: normal;
        padding:10px 0;
        width:200px;
        text-indent: 5px;
      }
      td{
        border-top:1px solid var(--mainBg);
        border-right:1px solid var(--mainBg);
        padding:10px 0;
        text-indent: 20px;
      }
      tr:nth-child(5) td{
        border-bottom:1px solid var(--mainBg);
      }
    }
  }
</style>
