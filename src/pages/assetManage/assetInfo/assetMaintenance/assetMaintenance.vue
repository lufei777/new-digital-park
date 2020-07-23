<template>
  <div class="asset-maintenance" v-loading="loading">
    <div class="panel-container">
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
        <el-button type="primary" @click="onClickSearchBtn" class="search-btn">搜索</el-button>
        <el-button  @click="onClickResetBtn">重置</el-button>
      </div>
      <div class="asset-table panel">
        <div class="operator-btn-box flex-row-reverse">
          <el-button type="primary" @click="onClickImportExcel">批量导入</el-button>
          <el-button type="primary" @click="onMultiDel" v-if="checkPermission(['remove'])">批量删除</el-button>

          <el-button type="primary" @click="onMultiEdit"  v-if="checkPermission(['edit'])">批量编辑</el-button>
          <el-button type="primary" @click="onClickAddBtn" v-if="checkPermission(['add'])">新建</el-button>
        </div>

        <z-table :ref="assetsTableConfig.ref" :options="assetsTableConfig">
          <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
            <el-button type="text" @click="rowClick(row)" v-if="checkPermission(['edit'])">编辑</el-button>
            <el-button type="text" @click="deleteRow(row)" v-if="checkPermission(['remove'])">删除</el-button>
          </template>
        </z-table>
      </div>
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
import CommonDialog from "../../../commonProject/coms/commonDialog";
import CommonUpload from "../../../commonProject/coms/commonUpload";
import AssetManageApi from "../../../../service/api/assetManage";
import CommonTable from "../../../../components/commonTable";
import TreeModal from "../../../../components/treeModal";
import CommonFun from "../../../../utils/commonFun";
import { checkPermission } from '@/utils/permission'

export default {
  name: "AssetMaintenance",
  components: {
    CommonTable,
    TreeModal,
    CommonDialog,
    CommonUpload
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
        customTop: true,
        operation: true,
        uiConfig: {
          height: "auto",//"", //高度
          selection: true, //是否多选
          pagination:{
            handler:function(size,page){
              _this.handleCurrentChange(page)
            },
            currentPage:1,
            total:0
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
  computed:{},
  methods: {
    checkPermission(val){
      return checkPermission(val)
    },
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
          {label:'名称',prop:'name',sortable:'custom'},
          {label:'单位',prop:'unit'},
          {label:'品牌',prop:'brand'},
          {label:'价格',prop:'price'},
          {label:'单独核算',prop:'singleCount',
            formatter:function(row,column){
               return row.singleCount==1?'是':'否'
            }
          },
          {label:'资产组',prop:'groupName'},
          {label:'资产类型',prop:'typeName'}]
          this.assetsTableConfig.data=res.list
          this.assetsTableConfig.uiConfig.pagination.total=res.total
          this.loading=false
      },
    onClickSearchBtn(){
      this.curPage=1
      this.$refs[this.assetsTableConfig.ref].setCurrentPage(1)
      this.getAssetList()
    },
    onClickResetBtn(){
      this.curPage=1
      this.groupName=''
      this.coding=''
      this.name=''
      this.orderType=1,
      this.orderBy='create_time'
      this.$refs[this.assetsTableConfig.ref].setCurrentPage(1)
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
      CommonFun.confirmTip(this.curAssetIds, "请至少选择一条资产！", '确定要删除吗？',this.sureDelete,this.cancelDelete);
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
  font-size: 14px;
  .choose-box {
    overflow: hidden;
    padding: 20px;
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
  .search-btn{
    margin-right: 10px;
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
