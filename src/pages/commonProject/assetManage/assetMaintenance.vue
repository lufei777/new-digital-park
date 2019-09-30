<template>
  <div class="asset-maintenance">
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
      <el-button type="primary" @click="onClickResetBtn">重置</el-button>
    </div>
    <div class="operator-box">
      <el-button type="primary" @click="onClickImportExcel">EXCEL导入</el-button>
      <el-button type="primary" @click="showDeleteTip">批量删除</el-button>

      <el-button type="primary" @click="onMultiEdit">批量编辑</el-button>
      <el-button type="primary" @click="onClickAddBtn">新建</el-button>
    </div>
    <CommonTable :tableObj="assetData" :curPage="1">
      <template v-slot:special-operator>
        <el-table-column fixed="right" label="操作" align="right" width="120">
          <template slot-scope="scope">
            <el-button type="text" size="small" v-if="scope.row.status==1">变更</el-button>
            <el-button type="text" size="small">调拨</el-button>
            <el-button type="text" size="small" icon="el-icon-more"
                       @click.stop.self="onClickMore(scope.$index)"
                       class="more-btn">
              <div v-show="scope.row.showMore" class="more-operator-box">
                <el-button type="text" size="small">报修</el-button>
                <el-button type="text" size="small">报废</el-button>
              </div>
            </el-button>
          </template>
        </el-table-column>
      </template>
    </CommonTable>
    <TreeModal
      :showTree="showTree"
      :treeList="treeList"
      :cancelCallback="hideTreeModal"
      :sureCallback="onClickTreeModalSureBtn"
      :tip="modalTip"
    />

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
import CommonDialog from "../coms/commonDialog";
import CommonUpload from "../coms/commonUpload";
import AssetManageApi from "../../../service/api/assetManageApi";
import CommonTable from "../../../components/commonTable/index";
import TreeModal from "../coms/treeModal";
import CommonFun from "../../../utils/commonFun";
export default {
  name: "AssetMaintenance",
  components: {
    CommonTable,
    TreeModal,
    CommonDialog,
    CommonUpload
  },
  data() {
    return {
      coding: "",
      name: "",
      groupName: "",
      assetData: {},
      curPage: 1,
      showTree: false,
      showGroup: false,
      treeList: [],
      modalTip: "",
      modalFlag: 1, //treeModal 代表所有树形弹框 1代表是资产类型 2代表是资产组
      groupTree: [],
      typeTree: [],
      orderType: "0",
      orderBy: "create_time",
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
      curAssetIds:''
    };
  },
  methods: {
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
        res.list.map((item)=>{
          item.showMore=false
          item.statusText = item.status==1?'闲置':item.status==2?'在用':item.status==3?'报修':'报废'
        })
        res.labelList=[{name:'',prop:'',type:'selection'},
          {name:'编号',prop:'coding',sort:'custom'},
          {name:'名称',prop:'name',sort:'custom'},
          {name:'资产组',prop:'groupName'},
          {name:'供应商',prop:'providerName'},
          {name:'资产类型',prop:'typeName'},
          {name:'当前保管人',prop:'currentCustodian'},
          {name:'规格型号',prop:'specification'},
          {name:'状态',prop:'statusText'}]
        res.hideExportBtn=true
        res.dataList=res.list
        this.assetData=res
      },
      onClickSearchBtn(){
        this.curPage=1
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
        this.treeList=this.typeTree
        this.modalTip="选择资产类型"
        this.showTree = true
        this.modalFlag=1
      },
      rowClick(row){
        this.isEdit=true
        this.$router.push(`/addAsset?assetId=${row.id}&typeId=${row.typeId}`)
      },
      onClickMore(index){
        console.log(index)
        this.assetData.dataList[index].showMore=!this.assetData.dataList[index].showMore
      },
      onShowGroup(){
        this.treeList=this.groupTree
        this.showTree=true
        this.modalTip="选择资产组"
        this.modalFlag=2
      },
      async getAssetTypeList(){
        let res = await AssetManageApi.getAssetTypeTree()
        this.typeTree =res
      },
      hideTreeModal(){
        this.showTree=false
      },
      onClickTreeModalSureBtn(val){
        this.showTree=false
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
      CommonFun.deleteTip(this, this.curAssetIds, "请至少选择一条资产！", this.sureDelete);
    },
    async sureDelete() {
      console.log(this.curAssetIds);
      // await AssetManageApi.delAssetTypeAttr({
      //   ids:this.delAssetIds
      // })
      // this.$message({
      //   type: 'success',
      //   message: '删除成功!'
      // })
      // this.getAssetList()
    },
    deleteRow(val) {},
    handleSelectionChange(val) {
      let tmp = val.map(item => item.id);
      this.curAssetIds = tmp;
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
      if(!this.curAssetIds){
        this.$message({
          type:'warning',
          message:'请至少选择一条资产！',
          duration:800
        })
      }else{
        let tmp=this.curAssetIds.join(',')
        this.$router.push(`/addAsset?assetIds=${tmp}`)
      }
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
  .choose-box {
    overflow: hidden;
    padding: 20px 0;
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
