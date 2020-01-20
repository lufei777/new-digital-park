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
      <z-table :ref="tableConfig.ref" :tableConfig="tableConfig">
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
            showAllLevels: false,
            props: {
              label: "name",
              value: "id",
              children: "childNode",
              lazy: true,
              lazyLoad: async function(node, resolve) {
                // const { level,data } = node;
                // let nodes =[]
                // if(level==0 || data.childNode.length){
                //   resolve(nodes);
                // }else{
                //   let res =await _this.getUserList(node.data.id)
                //   nodes=res
                // }
                // resolve(nodes);

                const { level, data } = node;
                let nodes = [];
                if (level == 0) {
                  _this.getDepartmentTree().then(_ => {
                    resolve(_this.deptTree);
                  });
                  // resolve(nodes);
                } else if (level === 2) {
                  let res = await _this.getUserList(node.data.id);
                  nodes = res;
                  resolve(nodes);
                }
                resolve([]);
              }
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
            showAllLevels: false,
            props: {
              label: "name",
              value: "id",
              children: "childNode",
              lazy: true,
              lazyLoad: async function(node, resolve) {
                const { level, data } = node;
                let nodes = [];
                if (level == 0) {
                  _this.getDepartmentTree().then(_ => {
                    resolve(_this.deptTree);
                  });
                  // resolve(nodes);
                } else if (level === 2) {
                  let res = await _this.getUserList(node.data.id);
                  nodes = res;
                  resolve(nodes);
                }
                resolve([]);
              }
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
          // {label:'编号',prop:'coding'},
          { label: "名称", prop: "name" },
          // {label:'单位',prop:'unit'},
          { label: "品牌", prop: "brand" },
          { label: "价格", prop: "price" },
          // {label:'单独核算',prop:'singleCount',
          //   formatter:function (row) {
          //     return row.singleCount==1?'是':'否'
          //   }
          // },
          // {label:'资产组',prop:'groupName'},
          // {label:'资产类型',prop:'typeName'},
          { label: "数量", prop: "quantity" },
          { label: "入库部门", prop: "deptName" }
        ],
        uiConfig: {
          height: "auto",
          selection: true
        }
      },
      showAddModal: false,
      curDetail: {},
      curRowIndex: {},
      deptTree: [],
      editFlag: false
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
      async getDepartmentTree() {
        let res = await SystemManageApi.getDepartmentTree();
        // this.$refs[this.formConfig.ref].setColumnByProp("buyId", {
        //   dicData: res[0].childNode
        // });
        // this.$refs[this.formConfig.ref].setColumnByProp("acceptId", {
        //   dicData: res[0].childNode
        // });
        // let findLast =res[0].childNode
        // findLast.map(async (item)=>{
        //   if(item.childNode.length){
        //     findLast=item.childNode
        //   }else{
        //     let res = await this.getUserList(item.id)
        //   }
        // })
        this.deptTree=res[0].childNode

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
        let data = {...obj,
          ...{
            assetId:obj.id,
            id:this.curDetail.id,
            description:obj.remark
          }
        }
        console.log("detail",this.curDetail)
        if(this.editFlag){
          this.tableConfig.data[this.curRowIndex] =data
        }else{
          this.tableConfig.data.push(data)
        }
        this.showAddModal=false
      },
      deleteRow(index) {
        this.tableConfig.data.splice(index, 1);
      },
      editRow(index) {
        this.showAddModal = true;
        this.editFlag = true;
        this.curRowIndex = index;
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
          item.name = item.fullName;
          item.leaf = true;
        });
        return res;
      },
      async onClickSubmitBtn(flag) {
        let res;
        let userIdList = ""; //方便回显采购人、验收人
        userIdList = [...this.model.buyId, ...this.model.acceptId].join(",");
        let obj = {
          ...this.model,
          ...{
            buyId: this.model.buyId[this.model.buyId.length - 1],
            acceptId: this.model.acceptId[this.model.acceptId.length - 1],
            stockDetailsList: this.tableConfig.data,
            userIdList
          }
        }
        console.log("ibj", obj);
        if (flag == 1) {
          if (!this.tableConfig.data.length) {
            this.$message({
              type: "warning",
              message: "请先添加入库明细"
            });
            return;
          }
          res = await StockManageApi.submitStockApply(obj);
        } else {
          res = await StockManageApi.saveStockApply(obj);
          this.getApplyDetail();
        }
        console.log(res);
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
          let userIdList=res.userIdList.split(",")
          this.model.buyId = userIdList.slice(0,3)
          this.model.acceptId = userIdList.slice(3,6)
          this.tableConfig.data=res.stockDetailsList
        }
      },
      onClickCloseBtn() {
        this.$store.commit("digitalPark/stockInApplyTab", "1");
      }
  },
  async created() {
    await this.getDepartmentTree();
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
}
</style>
