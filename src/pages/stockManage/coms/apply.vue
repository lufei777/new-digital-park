<template>
  <div class="apply-coms">
    <div v-show="!showAddModal">
      <div class="tip">基本信息：</div>
      <div class="form-box">
        <z-form :ref="formConfig.ref" :options="formConfig" v-model="model" />
      </div>
      <div class="tip">入库明细：</div>
      <div class="operator-btn-box flex-row-reverse">
        <el-button type="primary" @click="onClickMultiDelBtn">批量删除</el-button>
        <el-button type="primary" @click="onClickAddBtn">添加明细</el-button>
      </div>
      <z-table :ref="tableConfig.ref" :options="tableConfig" @handle-pagination="handleCurrentChange">
        <template slot="operation" slot-scope="{scopeRow:{$index,row}}">
          <el-button type="text" @click="editRow($index)">编辑</el-button>
          <el-button type="text" @click="deleteRow($index)">删除</el-button>
        </template>
      </z-table>
      <div class="operator-box">
        <el-button type="primary" @click="onClickSubmitBtn(1)">提交</el-button>
        <el-button type="primary" @click="onClickSubmitBtn(2)" v-if="!stockInReApplyId">保存</el-button>
        <el-button @click="onClickCloseBtn" v-if="stockInReApplyId">关闭</el-button>
      </div>
    </div>
    <div v-if="showAddModal">
      <AddAsset fromFlag="stockApply" :curDetail="curDetail" />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { StockDic } from "@/utils/dictionary";
import AssetManageApi from "@/service/api/assetManage";
import SystemManageApi from "@/service/api/systemManage";
import AddAsset from "../../assetManage/addAsset";
import StockManageApi from "@/service/api/stockManage";

export default {
  name: "ApplyComs",
  components: { AddAsset },
  data() {
    let _this = this;
    return {
      model: {},
      formConfig: {
        ref: "formRef",
        menuBtn: false,
        forms: [
          {
            type: "select",
            label: "入库类型",
            prop: "stockType",
            dicData: StockDic.stockInApply,
            valueDefault: 1,
            span: 10
          },
          {
            type: "date",
            label: "购置日期",
            prop: "buyTime",
            valueFormat: "yyyy-MM-dd",
            span: 10,
            offset: 4
          },
          {
            type: "cascader",
            label: "采购人",
            prop: "buyId",
            dicData:[],
            showAllLevels: false,
            props: {
              label: "name",
              value: "id",
              children: "childNode",
              // lazy: true,
              // lazyLoad: async function(node, resolve) {
              //   // const { level,data } = node;
              //   // let nodes =[]
              //   // if(level==0 || data.childNode.length){
              //   //   resolve(nodes);
              //   // }else{
              //   //   let res =await _this.getUserList(node.data.id)
              //   //   nodes=res
              //   // }
              //   // resolve(nodes);
              //
              //   const { level, data } = node;
              //   let nodes = [];
              //   if (level == 0) {
              //     _this.getDepartmentTree().then(_ => {
              //       resolve(_this.deptTree);
              //     });
              //     // resolve(nodes);
              //   } else if (level === 2) {
              //     let res = await _this.getUserList(node.data.id);
              //     nodes = res;
              //     resolve(nodes);
              //   }
              //   resolve([]);
              // }
            },
            span: 10
          },
          {
            type: "date",
            label: "入库日期",
            prop: "stockTime",
            valueFormat: "yyyy-MM-dd",
            span: 10,
            offset: 4
          },
          {
            type: "cascader",
            label: "验收人",
            prop: "acceptId",
            dicData:[],
            showAllLevels: false,
            props: {
              label: "name",
              value: "id",
              children: "childNode",
              // lazy: true,
              // lazyLoad: async function(node, resolve) {
              //   const { level, data } = node;
              //   let nodes = [];
              //   if (level == 0) {
              //     _this.getDepartmentTree().then(_ => {
              //       resolve(_this.deptTree);
              //     });
              //     // resolve(nodes);
              //   } else if (level === 2) {
              //     let res = await _this.getUserList(node.data.id);
              //     nodes = res;
              //     resolve(nodes);
              //   }
              //   resolve([]);
              // }
            },
            span: 10
          },
          {
            type: "select",
            label: "供应商",
            prop: "providerId",
            props: {
              label: "name",
              value: "id"
            },
            span: 10,
            offset: 4
          },
          {
            type: "input",
            label: "合同号",
            prop: "contractId",
            span: 10
          }
        ]
      },
      tableConfig: {
        ref: "tableRef",
        customTop: true,
        operation: true,
        data: [],
        columnConfig: [
          { label: "名称", prop: "name" },
          { label: "品牌", prop: "brand" },
          { label: "价格", prop: "price" },
          { label: "数量", prop: "quantity" },
          { label: "入库部门", prop: "deptName" }
        ],
        uiConfig: {
          height: "auto",
          selection: true,
          pagination:{
            pageSize:5,
          }
        }
      },
      showAddModal: false,
      curDetail: {},
      curRowIndex: 0,
      deptTree: [],
      editFlag: false,
      detailList:[],
      pageSize:5,
      curPage:1
    };
  },
  computed: {
    ...mapState({
      stockInApplyTab: state => state.digitalPark.stockInApplyTab,
      stockInReApplyId: state => state.digitalPark.stockInReApplyId
    })
  },
  watch: {
    stockInApplyTab() {
      if (this.stockInApplyTab == 0) {
        this.getApplyDetail();
      }
    }
  },
  methods: {
     getData(){
       return this.detailList;
     },
      async getDeptUserTree() {
        let res = await SystemManageApi.getDeptUserTree();
        this.deptTree=res[0].childNode
        this.$refs['formRef'].setColumnByProp("buyId", {
          dicData: this.deptTree
        });
        this.$refs['formRef'].setColumnByProp("acceptId", {
          dicData: this.deptTree
        });
      },
      async getProviderList() {
        let res = await AssetManageApi.getProviderList();
        this.$refs[this.formConfig.ref].setColumnByProp("providerId", {
          dicData: res
        });
      },
      onClickAddBtn(){
        this.curDetail={}
        this.editFlag=false
        this.showAddModal=true
      },
      addStockDetail(obj){
        // console.log("objjjjj",obj)
        let data = {...obj,
          ...{
            assetId:obj.id || obj.assetId,
            id:this.curDetail.id|| _.uniqueId(),
            description:obj.remark
          }
        }
        console.log("data",data)
        if(this.editFlag){
          console.log("curRowIndex",this.curRowIndex)
          this.tableConfig.data.splice(this.curRowIndex,1,data)
        }else{
          this.tableConfig.data.push(data)
          this.tableConfig.uiConfig.pagination.total= this.tableConfig.data.length
        }
        this.showAddModal=false
      },
      deleteRow(index) {
        // this.detailList.splice(this.index, 1);
        let tmp = index+(this.curPage-1)*this.pageSize
        this.tableConfig.data.splice(tmp, 1);
      },
      editRow(index) {
        this.showAddModal = true;
        this.editFlag = true;
        this.curRowIndex = index+(this.curPage-1)*this.pageSize;
        this.curDetail = this.tableConfig.data[index];
      },
      onClickMultiDelBtn() {
        let delArr = this.$refs["tableRef"].getSelectedData();
        let tmp = [];
        this.tableConfig.data.map(item => {
          if (delArr.indexOf(item) == -1) {
            tmp.push(item);
          }
        });
        this.tableConfig.data = tmp;
      },
      async getUserList(id) {
        let deptId = id;
        let res = await SystemManageApi.listBy({
          deptId
        });
        res.map(item => {
          item.name = item.name;
          item.leaf = true;
        });
        return res;
      },
      async onClickSubmitBtn(flag) {
        let res;
        let userIdList = ""; //方便回显采购人、验收人
        userIdList = [].concat(this.model.buyId,this.model.acceptId).join(",");
        let buyId = this.model.buyId,
            acceptId = this.model.acceptId
        if(buyId instanceof Array){
          buyId = this.model.buyId[this.model.buyId.length - 1]
        }
        if(acceptId instanceof Array){
          acceptId = this.model.acceptId[this.model.acceptId.length - 1]
        }
        let obj = {
          ...this.model,
          ...{
            buyId: buyId,
            acceptId: acceptId,
            stockDetailsList: this.tableConfig.data,
            userIdList
          }
        }
        if (flag == 1) {
          if (!this.tableConfig.data.length) {
            this.$message({
              type: "warning",
              message: "请先添加入库明细"
            });
            return;
          }
          res = await StockManageApi.submitStockApply(obj);
          // this.$refs['formRef'].
          this.model={
            stockType:1,
            stockTime:'',
            acceptId:'',
            providerId:'',
            contractId:'',
            buyId:'',
            buyTime:''
          }
          this.tableConfig.data=[]
        } else {
          res = await StockManageApi.saveStockApply(obj);
          this.getApplyDetail();
        }
        this.$message({
          type: "success",
          message: res
        });
      },
      async getApplyDetail() {
        let res;
        if (this.stockInReApplyId) {
          res = await StockManageApi.getRecordDetail({
            recordId: this.stockInReApplyId
          });
        } else {
          res = await StockManageApi.getApplyDraft();
        }
        if (res) {
          this.model=res
          // let userIdList=res.userIdList.split(",")
          // this.model.buyId = userIdList.slice(0,3)
          // this.model.acceptId = userIdList.slice(3,6)
          this.tableConfig.data=res.stockDetailsList
        }
      },
      onClickCloseBtn() {
        this.$store.commit("digitalPark/stockInApplyTab", "1");
      },
      handleCurrentChange(size,page){
        this.curPage=page
      }
  },
  async created() {
    await this.getDeptUserTree();
    await this.getProviderList();
    this.getApplyDetail();
  },
  async mounted() {}
};
</script>

<style lang="less">
.apply-coms {
  .tip {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 20px;
  }
  .form-box {
    width: 800px;
    margin: 0 auto;
  }
  .add-modal {
    height: 100%;
  }
  .operator-box {
    margin-top: 40px;
    text-align: center;
  }
  .mybtn{
    /*width:60px;*/
    /*height:60px;*/
    /*!*padding:20px;*!*/
    /*border-radius: 50%;*/
  }
}
</style>
