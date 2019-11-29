<template>
  <div class="asset-maintenance" v-loading="loading">
    <div class="choose-box flex-align">
      <div class="block flex-align-center">
        <span>编号</span>
        <el-input v-model="coding" />
      </div>
      <div class="block flex-align-center">
        <span>名称</span>
        <el-input v-model="name" />
      </div>
      <div class="block flex-align-center">
        <span>资产组</span>
        <el-input v-model="groupName" @focus="onShowGroup" />
      </div>
      <el-button type="primary" @click="onClickSearchBtn">搜索</el-button>
      <el-button  @click="onClickResetBtn">重置</el-button>
    </div>
    <div class="asset-table">
      <div class="operator-box">
        <el-button type="primary" @click="onClickImportExcel">批量导入</el-button>
        <el-button type="primary" @click="onMultiDel">批量删除</el-button>

        <el-button type="primary" @click="onMultiEdit">批量编辑</el-button>
        <el-button type="primary" @click="onClickAddBtn">新建</el-button>
      </div>

      <Table :ref="assetsTableConfig.ref" :tableConfig="assetsTableConfig">
      </Table>
    </div>

    <TreeModal :treeModalConfig="treeModalConfig"/>

    <CommonDialog class="upload-excel" :dialogConfig="excelDialogObj">
      <template slot-scope="slotConfig">
        <el-row>
          <el-col :span="12">
            <el-row class="select-excel-template" type="flex" text-align="center">
              <el-col :span="16">
                <div>
                  <el-input placeholder="请选择组" readonly size="small"></el-input>
                </div>
              </el-col>
              <el-col :span="10">
                <el-link type="primary" :href="slotConfig.templateUrl">下载模板</el-link>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <p>1、请先选择组，下载模板。</p>
                <p>2、模板填写完毕后，请从右边上传。</p>
              </el-col>
            </el-row>
          </el-col>

          <el-col :span="12">
            <CommonUpload :uploadConfig="slotConfig" />
          </el-col>
        </el-row>
      </template>
    </CommonDialog>
  </div>
</template>

<script>
import Table from "@/components/Table"
import CommonDialog from "../commonProject/coms/commonDialog";
import CommonUpload from "../commonProject/coms/commonUpload";
import AssetManageApi from "../../service/api/assetManageApi";
import CommonTable from "../../components/commonTable";
import TreeModal from ".././../components/treeModal/index";
import CommonFun from "../../utils/commonFun";
export default {
  name: "AssetMaintenance",
  components: {
    CommonTable,
    TreeModal,
    CommonDialog,
    CommonUpload,
    Table
  },
  data() {
    var _this = this;
    return {
      coding: "",
      name: "",
      groupName: "",
      assetData: {},
      curPage: 1,
      treeList: [],
      modalTip: "",
      modalFlag: 1, //treeModal 代表所有树形弹框 1代表是资产类型 2代表是资产组
      groupTree: [],
      typeTree: [],
      treeModalConfig:{
        treeList:[],
        treeConfig:{
          treeProps:{
            label:'name',
            children:'childNode'
          },
          showSearch:true
        },
        showModal:false,
        modalTip:'',
        onClickCancelBtnCallback:this.hideTreeModal,
        onClickSureBtnCallback:this.onClickTreeModalSureBtn
      },
      orderType: "0",
      orderBy: "create_time",
      loading:true,
      excelDialogObj: {//excel导入
        title: "excel导入",
        classList: [],
        shown: false,
        slotConfig: {
          url: "#",
          templateUrl: "#",
          accept:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          drag: true,
          autoUpload: true,
          tip: "只能上传excel文件",
          onSuccess: this.excelUploadSuccess,
          onError: this.excelUploadError
        }
      },
      curAssetIds:'',
      //资产管理表格
      assetsTableConfig: {
        ref: "assetsTable",
        data:[],
        columnConfig:[],
        btnConfig:[],
        uiConfig: {
          height: "auto",//"", //高度
          selection: true, //是否多选
          pagination:{
            handler:function(size,page){
              _this.handleCurrentChange(page)
            },
            currentPage:1
          }
        },
        tableMethods: {
          rowClick: _this.rowClick,
          rowDblclick: _this.assetsRowDbClick,
          sortChange:_this.sortTable
        },
      },
    };
  },
  computed:{
  },
  methods: {
    switchHide(col) {
      let tableRefs = this.$refs;
      if (col.hide) {
        this.$set(col, "hide", !col.hide);
      } else {
        this.$set(col, "hide", true);
      }
      tableRefs[this.assetsTableConfig.ref].doLayout();
    },
    async getAssetList() {
      //status(资产状态)：1-闲置，2-在用，3-报修，4-报废
        let res = await AssetManageApi.getAssetList({
          coding:this.coding,
          name:this.name,
          groupName:this.groupName,
          orderType:this.orderType, //0降序1升序
          orderBy:this.orderBy,
          pageNum:this.curPage,
          pageSize:10
        })
        this.assetsTableConfig.columnConfig=[
          {label:'编号',prop:'coding',sortable:'custom'},
          {label:'名称',prop:'name',sortable:'custom',width:200 },
          {label:'资产组',prop:'groupName'},
          {label:'供应商',prop:'providerName'},
          {label:'资产类型',prop:'typeName'},
          {label:'当前保管人',prop:'currentCustodian'},
          {label:'规格型号',prop:'specification'},
          {label:'状态',prop:'statusText',
            formatter: function(row, column) {
              switch (row[column.property]) {
                case 1:
                  return "闲置";
                  break;
                case 2:
                  return "在用";
                  break;
                case 3:
                  return "报修";
                  break;
                default:
                  return "报废";
                  break;
              }
            }
          }]
        let _this=this
        this.assetsTableConfig.btnConfig={
            prop: "operation",
            label: "列操作",
            fixed: "right",
            width: 150,
            btns: [{
                label: "变更",
                handler: function(row) {
                  // this.tableEdit(row);
                }
              },
              {
                label: "调拨",
                handler: function(row) {
                  // this.tableDel(row);
                }
              },
              {
                type: "dropDown",
                icon: "el-icon-more",
                showMore: false,
                menus: [
                  {
                    label: "报修",
                    handler: function(row) {
                      console.log("报修", row);
                    }
                  },
                  {
                    label: "报废",
                    handler: function(row) {
                      console.log("报废", row);
                    }
                  },
                  {
                    label: "删除",
                    handler: function(data){
                      _this.deleteRow(data.row)
                    }
                  }]
          }
        ]
      },
         this.assetsTableConfig.data=res.list
         this.assetsTableConfig.uiConfig.pagination.total=res.total
         this.loading=false
      },
    onClickSearchBtn(){
      this.curPage=1
      this.assetsTableConfig.uiConfig.pagination.currentPage=1
      this.getAssetList()
    },
    onClickResetBtn(){
      this.curPage=1
      this.groupName=''
      this.coding=''
      this.name=''
      this.orderType=1,
      this.orderBy='create_time'
      this.getAssetList()
    },
    onClickAddBtn(){
      this.treeModalConfig.treeList=this.typeTree
      this.treeModalConfig.modalTip="选择资产类型"
      this.treeModalConfig.showModal = true
      this.modalFlag=1
    },
    rowClick(row){
        this.isEdit=true
        this.$router.push(`/addAsset?assetId=${row.id}&typeId=${row.typeId}`)
    },
      onShowGroup(){
        this.treeModalConfig.treeList=this.groupTree
        this.treeModalConfig.showModal=true
        this.treeModalConfig.modalTip="选择资产组"
        this.modalFlag=2
      },
      async getAssetTypeList(){
        let res = await AssetManageApi.getAssetTypeTree()
        this.typeTree =res
      },
      hideTreeModal(){
        this.treeModalConfig.showModal=false
      },
      onClickTreeModalSureBtn(val){
        if(this.modalFlag==1){
          if(!val.id){
            this.$message({
              message:'请先选择资产类型！',
              type: 'warning',
              duration:1000
            });
            return;
          }
          this.$router.push(`/addAsset?typeId=${val.id}&status=${val.status}`)
        }else {
          this.groupName = val.name
          this.treeModalConfig.showModal=false
        }

    },
    async getAssetGroupTree() {
      let res = await AssetManageApi.getAssetGroupTree();
      this.groupTree = res;
    },
    handleCurrentChange(val) {
      this.curPage = val;
      this.getAssetList();
    },
    sortTable(column) {
      console.log(column);
      this.orderBy = column.prop;
      this.orderType = column.order == "ascending" ? 1 : 0;
      this.getAssetList();
    },
    showDeleteTip() {
      CommonFun.deleteTip(this, this.curAssetIds, "请至少选择一条资产！", this.sureDelete,this.cancelDelete);
    },
    async sureDelete() {
      console.log(this.curAssetIds);
      await AssetManageApi.delAsset({
        assetId:this.curAssetIds
      })
      this.$message({
        type: 'success',
        message: '删除成功!'
      })
      this.curAssetIds=''
      this.getAssetList()
    },
    cancelDelete(){
      this.curAssetIds=''
    },
    deleteRow(val) {
      this.curAssetIds=val.id
      console.log("val",this.curAssetIds)
      this.showDeleteTip()
    },
    //excel导入
    onClickImportExcel() {
      this.excelDialogObj.shown = true;
    },
    excelUploadSuccess(response, file, fileList) {
      this.$notify.success({
        title: "上传成功"
      });
    },
    excelUploadError(err, file, fileList) {
      this.$notify.error({
        title: "上传失败",
        message: `${file.name}上传失败`
      });
    },
    onMultiEdit(){
      this.curAssetIds=this.$refs['assetsTable'].getSelectedData().length &&
                       this.$refs['assetsTable'].getSelectedData().map((item)=>item.id)
      if(!this.curAssetIds){
        this.$message({
          type:'warning',
          message:'请至少选择一条资产！',
          duration:800
        })
      }else{
        this.$router.push(`/addAsset?assetIds=${this.curAssetIds}`)
      }
    },
    onMultiDel(){
      this.curAssetIds=this.$refs['assetsTable'].getSelectedData().length &&
      this.$refs['assetsTable'].getSelectedData().map((item)=>item.id).join(",")
      this.showDeleteTip()
    }
  },
  mounted() {
    this.getAssetList();
    this.getAssetTypeList();
    this.getAssetGroupTree();
  }
};
</script>

<style lang="less">
.asset-maintenance {
  height: 100%;
  padding: 20px;
  font-size: 14px;
  .choose-box {
    overflow: hidden;
    padding: 10px 20px;
    background-color: @white;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  .block {
    margin-right: 40px;
    display: flex;

    span {
      flex-shrink: 0;
      margin-right: 10px;
    }
  }
  .choose-tip {
    margin-left: 100px;
    width: 80px;
    text-align: right;
  }
  .operator-box {
    padding: 20px 0;
    display: flex;
    flex-direction: row-reverse;

    .el-button {
      margin: 0 5px;
    }
  }
  .more-btn {
    position: relative;
  }
  .more-operator-box {
    position: absolute;
    top: 20px;
    left: -20px;
    z-index: 99;
    background: #ccc;
    .el-button {
      display: block;
    }
  }
  .cell {
    overflow: visible;
  }
  .more-operator-box{
    .el-button{
      margin:0;
      padding:10px;
    }
  }
  .asset-table{
    border-radius: 10px;
    background-color: @white;
    overflow: hidden;
    padding:20px;
  }
}
.upload-excel {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  .select-excel-template {
    margin-bottom: 20px;
    div:last-child {
      line-height: 2;
    }
    .more-operator-box{
      .el-button{
        margin:0;
        padding:10px;
      }
    }
  }
  .el-upload,
  .el-upload-dragger {
    width: 100%;
  }
}
</style>
