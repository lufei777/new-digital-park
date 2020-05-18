<template>
  <div class="add-asset panel-container">
    <div class="panel-container">
      <el-form
        class="panel"
        ref="assetAddForm"
        :rules="rules"
        :model="assetAddForm"
        :inline="true"
        label-position="right"
        label-width="80px"
      >
        <el-row>
          <el-col :span="9" :offset="3">
            <el-form-item label="名称" prop="name">
              <el-input v-model="assetAddForm.name"  @focus="onFocusName"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="编号" prop="coding">
              <el-input v-model="assetAddForm.coding" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="9" :offset="3">
            <el-form-item label="单位" prop="unit">
              <el-input v-model="assetAddForm.unit" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>

          <el-col  :span="12">
            <el-form-item label="品牌" prop="brand">
              <el-input v-model="assetAddForm.brand" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>

          <!--<el-col :span="9" :offset="3">-->
            <!--<el-form-item label="供应商" prop="providerId">-->
              <!--<el-select-->
                <!--v-model="assetAddForm.providerId"-->
                <!--placeholder="请选择"-->
                <!--@change="onProviderChange"-->
              <!--&gt;-->
                <!--<el-option-->
                  <!--v-for="item in providerList"-->
                  <!--:key="item.id"-->
                  <!--:label="item.name"-->
                  <!--:value="item.id"-->
                <!--&gt;</el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
          <!--</el-col>-->

          <el-col :span="9" :offset="3">
            <el-form-item :label="fromFlag=='stockApply'?'实际价格':'价格'" prop="price">
              <el-input v-model="assetAddForm.price">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col  :span="12">
            <el-form-item label="规格型号" prop="specification">
              <el-input v-model="assetAddForm.specification" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>

          <el-col  :span="9" :offset="3">
            <el-form-item label="资产组" prop="groupName">
              <el-input v-model="assetAddForm.groupName" @focus="onShowGroup" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="单独核算" prop="singleCount">
              <el-radio v-model="assetAddForm.singleCount" :label="1" :disabled="disabled">是</el-radio>
              <el-radio v-model="assetAddForm.singleCount" :label="0" :disabled="disabled">否</el-radio>
            </el-form-item>
          </el-col>

          <template v-for="(item,index) in assetAddForm.ownAttrList">
            <div
              :key="item.attrName"
              v-for="(child,i) in item"
              :class="[i === 0 ? 'el-col el-col-9 el-col-offset-3' :'el-col el-col-12']"
            >
              <el-form-item
                :key="i"
                :label="child.attrName"
                :prop="'ownAttrList.' + index + '.' + i + '.' + child.attrName"
                :rules="{required:child.required=='1',message:'请输入'+child.attrName,trigger: 'blur'}"
              >
                <el-input v-model="child[child.attrName]"></el-input>
              </el-form-item>
            </div>
          </template>

          <el-col  :span="9" :offset="3" v-if="fromFlag=='stockApply'">
            <el-form-item label="数量" prop="quantity">
              <el-input v-model="assetAddForm.quantity"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12" v-if="fromFlag=='stockApply'">
            <el-form-item label="入库部门" prop="deptId">
               <!--<el-input v-model="assetAddForm.deptName" @focus="onShowDept"></el-input>-->
              <el-select v-model="assetAddForm.deptId" @change="onDeptChange">
                <el-option v-for="item in deptTree" :key="item.id"
                           :label="item.name" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="19" :offset="3">
            <el-form-item :label="fromFlag=='stockApply'?'入库备注':'备注'"
                          prop="remark" class="el-col-24 remark-el-form"
            >
              <el-input v-model="assetAddForm.remark" type="textarea" :rows="4"></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <!--<el-row>-->
          <!--<el-col :span="1" :offset="3">-->
            <!--<el-button type="primary" @click="addCustomAttr" class="mgt10">自定义</el-button>-->
          <!--</el-col>-->
        <!--</el-row>-->
        <!--<el-row v-for="(item,index) in assetAddForm.customAttrList" :key="item.key">-->
          <!--<el-col :span="9" :offset="3">-->
            <!--<el-form-item-->
              <!--label="属性名称"-->
              <!--:prop="'customAttrList.'+index+'.attrName'"-->
              <!--:rules="{required:true,message:'请输入属性名称',trigger: 'blur'}"-->
            <!--&gt;-->
              <!--<el-input v-model="item.attrName"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="5">-->
            <!--<el-form-item-->
              <!--label="属性值"-->
              <!--:prop="'customAttrList.'+index+'.attrValue'"-->
              <!--:rules="{required:true,message:'请输入属性值',trigger: 'blur'}"-->
            <!--&gt;-->
              <!--<el-input v-model="item.attrValue"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="1">-->
            <!--<i-->
              <!--class="el-icon-delete del-custom-btn hover-pointer"-->
              <!--@click="onClickDelCustomBtn(index)"-->
            <!--&gt;</i>-->
          <!--</el-col>-->
        <!--</el-row>-->

        <el-row type="flex" justify="space-around">
          <div style="margin-left: -50px;">
            <el-button type="primary" @click="submitForm('assetAddForm')">确定</el-button>
            <el-button @click="goBack" class="go-back">取消</el-button>
          </div>
        </el-row>
      </el-form>
    </div>
    <TreeModal :tree-modal-config="treeModalConfig" />
    <SearchAssetModal :showSearchModal="showSearchModal" from-flag="1"/>

  </div>
</template>

<script>
import AssetManageApi from "../../../service/api/assetManage";
import TreeModal from "../../../components/treeModal";
import SearchAssetModal from '../../stockManage/coms/searchAsset'
export default {
  name: "AddAsset",
  components: {
    TreeModal,
    SearchAssetModal
  },
  props:['fromFlag','curDetail'],
  data() {
    let checkQuantity = (rule, value, callback) => {
      if ((!Number(value) || value<0) && value!="") {
        callback(new Error("请输入正数"));
      } else if (value < 1) {
        callback(new Error("数量最小为1"));
      } else {
        callback();
      }
    };
    let validPrice = (rule, value, callback) => {
      if ((!Number(value) || value<0) && value!="") {
        callback(new Error("请输入正数"));
      } else {
        callback();
      }
    };
    return {
      assetAddForm: {
        name: "",
        brand: "",
        groupId: "",
        groupName: "",
        coding: "",
        unit: "",
        price: "",
        remark: "",
        ownAttrList: [],
        customAttrList: [],
        singleCount:1,
        specification:'',
        //以下为入库申请需要的字段
        quantity:'',
        deptId: "",
        deptName:''
      },
      rules: {
        name: [{ required: true, message: "请输入资产名称", trigger: "change" }],
        groupName: [
          { required: true, message: "请选择资产组", trigger: "blur" }
        ],
        price:[{  validator: validPrice, trigger:"blur", }],
        quantity: [{ required: true, message: "请输入数量", trigger: "blur" },
          { validator: checkQuantity, trigger: "blur" }]
      },
      providerList: [],
      groupTree: [],
      deptTree: [],
      modalFlag: 1, //1代表部门 2代表资产组
      treeModalConfig: {
        treeList: [],
        treeConfig: {
          treeProps: {
            label: "name",
            children: "childNode"
          },
          defaultExpandedkeys: []
          // showSearch:true
        },
        showModal: false,
        modalTip: "",
        onClickSureBtnCallback: this.onClickTreeModalSureBtn,
        onClickCancelBtnCallback: this.hideTreeModal
      },
      showSearchModal:false
    };
  },
  computed: {
    assetId() {
      return this.$route.query.assetId;
    },
    typeId() {
      return this.$route.query.typeId;
    },
    status() {
      return this.$route.query.status; //为5不显示数量
    },
    assetIds() {
      //批量编辑
      return (
        this.$route.query.assetIds && this.$route.query.assetIds.split(",")
      );
    },
    // fromFlag(){
    //   //stockApply ->代表入库申请
    //   return this.$route.query.fromFlag
    // },
    disabled(){
      return this.fromFlag=="stockApply"?true:false
    }
  },
  watch: {},
  methods: {
    submitForm(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.addAsset();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goBack() {
      if(this.fromFlag=="stockApply"){
        this.$parent.showAddModal=false
      }else{
        history.go(-1)
      }
    },
    hideTreeModal() {
      this.treeModalConfig.showModal = false;
    },
    async getAssetDetail() {
      let res = await AssetManageApi.getAssetDetail({
        assetId: this.assetId || this.assetIds[0]
      });
      this.assetAddForm = {
        //不可直接res赋值
        name: res.name,
        brand: res.brand,
        groupId: res.groupId,
        groupName: res.groupName,
        coding: res.coding,
        unit: res.unit,
        // deptId: res.deptId,
        // deptName: res.deptName,
        price: res.price,
        remark: res.remark,
        singleCount:res.singleCount,
        ownAttrList: [],
        customAttrList: []
      };
      if (!this.assetIds) {
        let ownAttrList = res.assetAttributeValueList.filter(item => {
          return item.attrId != null;
        });
        let customAttrList = res.assetAttributeValueList.filter(item => {
          return !item.attrId;
        });
        ownAttrList.map(item => {
          item[item.attrName] = item.attrValue;
        });
        console.log("ownList", ownAttrList);
        let arr = [];
        for (let i = 0; i < ownAttrList.length; i++) {
          let tmp = [];
          tmp.push(ownAttrList[i]);
          if (ownAttrList[i + 1]) tmp.push(ownAttrList[i + 1]);
          arr.push(tmp);
          ownAttrList.shift();
          // res.shift()
        }
        console.log("detail-arr", arr);
        this.assetAddForm.ownAttrList = arr;
        this.assetAddForm.customAttrList = customAttrList;
      }
    },
    async getAttributeByType() {
      let res = await AssetManageApi.getAttributeByType({
        typeId: this.typeId
      });
      let arr = [];
      for (let i = 0; i < res.length; i++) {
        let tmp = [];
        tmp.push(res[i]);
        if (res[i + 1]) tmp.push(res[i + 1]);
        arr.push(tmp);
        res.shift();
        // res.shift()
      }
      this.assetAddForm.ownAttrList = arr;
    },
    async getProviderList() {
      this.providerList = await AssetManageApi.getProviderList();
      this.assetAddForm.providerId = this.providerList[0].id;
      this.assetAddForm.providerName = this.providerList[0].name;
    },
    async getAssetGroupTree() {
      let res = await AssetManageApi.getAssetGroupTree();
      this.assetAddForm.groupId = res[0].id;
      this.assetAddForm.groupName = res[0].name;
      this.groupTree = res;
    },
    onShowGroup() {
      this.treeModalConfig.treeList = this.groupTree;
      this.treeModalConfig.modalTip = "选择资产组";
      this.modalFlag = 2;
      this.treeModalConfig.showModal = true;
      this.treeModalConfig.treeConfig.defaultExpandedkeys = [
        this.groupTree[0].id
      ];
    },
    addCustomAttr() {
      this.assetAddForm.customAttrList.push({
        attrName: "",
        attrValue: "",
        key: Date.now()
      });
    },
    onClickTreeModalSureBtn(val) {
      this.treeModalConfig.showModal = false;
      if (this.modalFlag == 2) {
        this.assetAddForm.groupId = val.id;
        this.assetAddForm.groupName = val.name;
      } else if (this.modalFlag == 1) {
        this.assetAddForm.deptId = val.id;
      }
    },
    addAsset() {
      if (this.assetIds) {
        this.multiEditAsset();
      }else if(this.fromFlag=='stockApply'){
        this.$parent.addStockDetail &&  this.$parent.addStockDetail({...this.assetAddForm})
      }else{
        this.addSingleAsset()
      }
    },
    onProviderChange(val) {
      let obj = this.providerList.find(item => {
        return item.id == val;
      });
      this.assetAddForm.providerName = obj.name;
    },
    async getDepartmentTree() {
      let res = await AssetManageApi.getDepartmentTree();
      if(!this.assetIds || !this.assetId){
        this.assetAddForm.deptId = res[0].childNode[0].id;
        this.assetAddForm.deptName = res[0].childNode[0].name;
      }
      this.deptTree = res[0].childNode.map((item)=>{return {id:item.id,name:item.name}});
    },
    onShowDept() {
      this.treeModalConfig.treeList = this.deptTree;
      this.treeModalConfig.modalTip = "选择部门";
      this.modalFlag = 1;
      this.treeModalConfig.showModal = true;
      // this.treeModalConfig.treeConfig.defaultExpandedkeys = [
      //   this.deptTree[0].id
      // ];
    },
    onClickDelCustomBtn(index) {
      this.assetAddForm.customAttrList.splice(index, 1);
    },
    async addSingleAsset() {
      let tmp = [];
      for (let key in this.assetAddForm) {
        if (
          key != "groupName" &&
          key != "ownAttrList" &&
          key != "customAttrList" &&
          key != "deptName"
        ) {
          tmp.push({
            attrName: key,
            attrValue: this.assetAddForm[key]
          });
        } else if (key == "ownAttrList") {
          this.assetAddForm.ownAttrList.map(item => {
            item.map(child => {
              tmp.push({
                attrName: child.attrName,
                attrValue: child[child.attrName],
                attrId: child.id
              });
            });
          });
        } else if (key == "customAttrList") {
          this.assetAddForm.customAttrList.map(item => {
            tmp.push({
              attrName: item.attrName,
              attrValue: item.attrValue
            });
          });
        }
      }
      tmp.push({
        attrName: "typeId",
        attrValue: this.typeId
      });
      console.log("tmp", tmp);
      let message = "";
      if (this.assetId) {
        message = "修改成功,正在跳转...";
        tmp.push({
          attrName: "id",
          attrValue: this.assetId
        });
        await AssetManageApi.editAsset(tmp);
      } else {
        message = "添加成功,正在跳转...";
        await AssetManageApi.addAsset(tmp);
      }
      this.$message({
        type: "success",
        message,
        duration: 500
      });
      setTimeout(()=>{
        this.$router.replace('/assetMaintenance')
      },1000)
    },
    async multiEditAsset() {
      let tmp = [];
      this.assetIds.map(item => {
        let obj = { ...{ id: item }, ...this.assetAddForm };
        console.log(obj);
        tmp.push(obj);
      });
      await AssetManageApi.multiEditAsset(tmp);
      this.$message({
        type: "success",
        message: "批量编辑成功，正在跳转..."
      });
      setTimeout(() => {
        this.$router.replace("/assetMaintenance");
      }, 1000);
    },
    onFocusName(){
      if(this.fromFlag=="stockApply"){
        this.showSearchModal=true
      }
    },
    onGetAssetDetail(row){
      let tmp={
        deptId:  this.assetAddForm.deptId,
        deptName:  this.assetAddForm.deptName,
        remark:this.assetAddForm.remark,
        quantity:this.assetAddForm.quantity,
      }
      this.assetAddForm={...row,...tmp}
      this.showSearchModal=false
    },
    onDeptChange(val){
      let tmp = this.deptTree.find((item)=>item.id==val)
      this.assetAddForm.deptName=tmp.name
    }
  },
  mounted() {
    // this.getProviderList();
    this.getAssetGroupTree();
    if (this.assetId || this.assetIds) {
      this.getAssetDetail();
    }
    if (this.typeId && !(this.assetId || this.assetIds)) {
      this.getAttributeByType();
    }
    if(this.fromFlag=="stockApply"){
      this.getDepartmentTree();
    }
    if(this.curDetail){
      this.assetAddForm={...this.curDetail,...{remark:this.curDetail.description}}
    }
  }
};
</script>

<style lang="less">
.add-asset {
  box-sizing: border-box;
  overflow: auto;
  .form-inner-tip {
    padding: 10px 0;
    font-weight: bold;
  }
  .del-custom-btn {
    color: red;
    margin-top: 10px;
  }
  .mgt10 {
    margin-bottom: 10px;
  }
  .remark-el-form .el-form-item__content {
    width: 70%;
  }
  .el-form-item__content .el-input{
    width:200px;
  }
}
</style>
