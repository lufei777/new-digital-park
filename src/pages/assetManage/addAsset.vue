<template>
  <div class="add-asset radius-shadow">
      <el-form ref="assetAddForm" :rules="rules" :model="assetAddForm" :inline="true"
               label-position="right" label-width="120px">
        <el-col>
        <el-form-item label="名称" prop="name" class="el-col-12">
          <el-input v-model="assetAddForm.name"></el-input>
        </el-form-item>
        <el-form-item label="编号" prop="coding" >
          <el-input v-model="assetAddForm.coding"></el-input>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="单位" prop="unit" class="el-col-12">
          <el-input v-model="assetAddForm.unit"></el-input>
        </el-form-item>
        <el-form-item label="品牌" prop="brand" >
          <el-input v-model="assetAddForm.brand"></el-input>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="供应商" prop="providerId" class="el-col-12">
          <el-select v-model="assetAddForm.providerId" placeholder="请选择" @change="onProviderChange">
            <el-option v-for="item in providerList" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资产组" prop="groupName" >
          <el-input v-model="assetAddForm.groupName" @focus="onShowGroup"></el-input>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="价格" prop="price" class="el-col-12">
          <el-input v-model="assetAddForm.price"></el-input>
        </el-form-item>
        <el-form-item label="所在部门" prop="departmentId" >
          <el-input v-model="assetAddForm.departmentName" @focus="onShowDept"></el-input>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="当前保管人" prop="currentCustodian" class="el-col-12">
          <el-input v-model="assetAddForm.currentCustodian"></el-input>
        </el-form-item>
        <el-form-item label="前期保管人" prop="previousCustodian" >
          <el-input v-model="assetAddForm.previousCustodian"></el-input>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="数量" prop="quantity" class="el-col-12" v-if='status==5'>
          <el-input v-model="assetAddForm.quantity"></el-input>
        </el-form-item>
      </el-col>
      <el-col v-for="(item,index) in assetAddForm.ownAttrList" :key="index">
        <el-form-item v-for="(child,i) in item" :key="i"
                      :label="child.attrName"
                      :prop="'ownAttrList.'+index+'.'+i+'.'+child.attrName"
                      :class="i%2==0?'el-col-12':''"
                      :rules="{
                        required:child.required=='1',message:'请输入'+child.attrName,trigger: 'blur'
                      }"
        >
          <el-input v-model="child[child.attrName]"></el-input>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="备注" prop="remark" class="el-col-24 remark-el-form">
          <el-input v-model="assetAddForm.remark" type="textarea" :rows="4"></el-input>
        </el-form-item>
      </el-col>
        <el-button type='primary' @click="addCustomAttr">自定义</el-button>
        <el-col v-for="(item,index) in assetAddForm.customAttrList" :key="item.key">
          <el-form-item label="属性名称" class="el-col-my"
                        :prop="'customAttrList.'+index+'.attrName'"
                        :rules="{
                          required:true,message:'请输入属性名称',trigger: 'blur'
                        }">
            <el-input v-model="item.attrName" ></el-input>
          </el-form-item>
          <el-form-item label="属性值" class="el-col-my"
                        :prop="'customAttrList.'+index+'.attrValue'"
                        :rules="{
                          required:true,message:'请输入属性值',trigger: 'blur'
                        }">
            <el-input v-model="item.attrValue" class="mgr10"></el-input>
          </el-form-item>
          <i class="el-icon-delete del-custom-btn hover-pointer"
             @click="onClickDelCustomBtn(index)"></i>
        </el-col>
        <el-col>
          <div class="operator-box">
            <el-button @click="goBack" class="go-back">取消</el-button>
            <el-button type="primary" @click="submitForm('assetAddForm')">确定</el-button>
          </div>
        </el-col>
      </el-form>
    <TreeModal :tree-modal-config="treeModalConfig"/>
  </div>
</template>

<script>
  import AssetManageApi from '../../service/api/assetManageApi'
  import TreeModal from '../../components/treeModal/index'
  export default {
    name: 'AddAsset',
    components: {
      TreeModal
    },
    props:[],
    data () {
      let checkQuantity= (rule, value, callback) => {
        if (value <1) {
          callback(new Error('数量最小为1'));
        } else {
          callback();
        }
      };
      return {
        assetAddForm:{
          name:'',
          brand:'',
          providerId:'',
          providerName:'',
          groupId:'',
          groupName:'',
          coding:'',
          unit:'',
          currentCustodian:'',
          previousCustodian:'',
          departmentId:'',
          departmentName:'',
          price:'',
          remark:'',
          quantity:'1',
          ownAttrList:[],
          customAttrList:[],
        },
        rules:{
          name:[{required:true,message:'请输入资产名称',trigger: 'blur' }],
          groupName:[{required:true,message:'请选择资产组',trigger: 'blur' }],
          quantity:[{required:true,message:'请输入数量',trigger: 'blur' },
                    {validator:checkQuantity, trigger: 'blur' }],
        },
        providerList:[],
        groupTree:[],
        deptTree:[],
        modalFlag:1, //1代表部门 2代表资产组
        treeModalConfig:{
          treeList:[],
          treeConfig:{
            treeProps:{
              label:"name",
              children:'childNode'
            },
            defaultExpandedkeys:[],
            // showSearch:true
          },
          showModal:false,
          modalTip:'',
          onClickSureBtnCallback:this.onClickTreeModalSureBtn,
          onClickCancelBtnCallback:this.hideTreeModal
        }
      }
    },
    computed:{
      assetId(){
        return this.$route.query.assetId
      },
      typeId(){
        return this.$route.query.typeId
      },
      status(){
        return this.$route.query.status  //为5不显示数量
      },
      assetIds(){ //批量编辑
        return this.$route.query.assetIds && this.$route.query.assetIds.split(',')
      }
    },
    watch:{
    },
    methods: {
      submitForm(form){
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.addAsset()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      goBack(){
        this.$router.push('/assetMaintenance')
      },
      hideTreeModal(){
        this.treeModalConfig.showModal=false
      },
      async getAssetDetail(){
        let res = await AssetManageApi.getAssetDetail({
          assetId:this.assetId || this.assetIds[0]
        })
        this.assetAddForm={  //不可直接res赋值
          name:res.name,
          brand:res.brand,
          providerId:res.providerId,
          providerName:res.providerName,
          groupId:res.groupId,
          groupName:res.groupName,
          coding:res.coding,
          unit:res.unit,
          currentCustodian:res.currentCustodian,
          previousCustodian:res.previousCustodian,
          departmentId:res.departmentId,
          departmentName:res.departmentName,
          price:res.price,
          remark:res.remark,
          ownAttrList:[],
          customAttrList:[],
        }
        if(!this.assetIds){
          let ownAttrList =res.assetAttributeValueList.filter((item)=>{
            return item.attrId!=null
          })
          let customAttrList = res.assetAttributeValueList.filter((item)=>{
            return !item.attrId
          })
          ownAttrList.map((item)=>{
            item[item.attrName]=item.attrValue
          })
          console.log('ownList',ownAttrList)
          let arr=[]
          for(let i=0;i<ownAttrList.length;i++){
            let tmp=[]
            tmp.push(ownAttrList[i])
            if(ownAttrList[i+1]) tmp.push(ownAttrList[i+1])
            arr.push(tmp)
            ownAttrList.shift()
            // res.shift()
          }
          console.log('detail-arr',arr)
          this.assetAddForm.ownAttrList=arr
          this.assetAddForm.customAttrList=customAttrList
        }
      },
      async getAttributeByType(){
        let res = await AssetManageApi.getAttributeByType({
          typeId:this.typeId
        })
        res.map((item)=>{
         item[item.attrName]=''
        })
        let arr=[]
        for(let i=0;i<res.length;i++){
          let tmp=[]
          tmp.push(res[i])
          if(res[i+1]) tmp.push(res[i+1])
          arr.push(tmp)
          res.shift()
          // res.shift()
        }
        console.log(arr)
        this.assetAddForm.ownAttrList=arr
      },
      async getProviderList(){
         this.providerList = await AssetManageApi.getProviderList()
         this.assetAddForm.providerId=this.providerList[0].id
         this.assetAddForm.providerName=this.providerList[0].name
      },
      async getAssetGroupTree(){
        let res = await AssetManageApi.getAssetGroupTree()
        this.assetAddForm.groupId=res[0].id
        this.assetAddForm.groupName=res[0].name
        this.groupTree=res
      },
      onShowGroup(){
        this.treeModalConfig.treeList=this.groupTree
        this.treeModalConfig.modalTip='选择资产组'
        this.modalFlag=2
        this.treeModalConfig.showModal=true
        this.treeModalConfig.treeConfig.defaultExpandedkeys=[this.groupTree[0].id]
      },
      addCustomAttr(){
        this.assetAddForm.customAttrList.push({
           attrName:'',
           attrValue:'',
           key:Date.now()
        })
      },
      onClickTreeModalSureBtn(val){
        this.treeModalConfig.showModal=false
        if(this.modalFlag==2){
          this.assetAddForm.groupId=val.id
          this.assetAddForm.groupName=val.name
        }else if(this.modalFlag==1){
          this.assetAddForm.departmentId=val.id
          this.assetAddForm.departmentName=val.name
        }
      },
       addAsset(){
         if(this.assetIds){
            this.multiEditAsset()
          }else{
           this.addSingleAsset()
         }
      },
      onProviderChange(val){
        let obj = this.providerList.find((item)=>{
          return item.id==val
        })
        this.assetAddForm.providerName=obj.name
      },
      async getDepartmentTree(){
        let res = await AssetManageApi.getDepartmentTree()
        this.assetAddForm.departmentId = res[0].id
        this.assetAddForm.departmentName = res[0].name
        this.deptTree = res
      },
      onShowDept(){
        this.treeModalConfig.treeList = this.deptTree
        this.treeModalConfig.modalTip = '选择部门'
        this.modalFlag = 1
        this.treeModalConfig.showModal = true
        this.treeModalConfig.treeConfig.defaultExpandedkeys=[this.deptTree[0].id]
      },
      onClickDelCustomBtn(index){
        this.assetAddForm.customAttrList.splice(index,1)
      },
      async addSingleAsset(){
        let tmp=[]
        for(let key in this.assetAddForm){
          if(key != 'groupName' && key != 'ownAttrList' && key != 'customAttrList' && key != 'departmentName'){
            tmp.push({
              'attrName':key,
              'attrValue':this.assetAddForm[key]
            })
          }else if(key == 'ownAttrList'){
            this.assetAddForm.ownAttrList.map((item)=>{
              item.map((child)=>{
                tmp.push({
                  'attrName':child.attrName,
                  'attrValue':child[child.attrName],
                  attrId:child.id
                })
              })
            })
          }else if(key == 'customAttrList'){
            this.assetAddForm.customAttrList.map((item)=>{
              tmp.push({
                'attrName':item.attrName,
                'attrValue':item.attrValue
              })
            })
          }
        }
        tmp.push({
          'attrName':'typeId',
          'attrValue':this.typeId
        })
        console.log("tmp",tmp)
        let message = ''
        if(this.assetId){
          message = '修改成功,正在跳转...'
          tmp.push({
            attrName:'id',
            attrValue:this.assetId
          })
          await AssetManageApi.editAsset(tmp)
        }else{
          message = '添加成功,正在跳转...'
          await AssetManageApi.addAsset(tmp)
        }
        this.$message({
          type:'success',
          message,
          duration:500
        })
        // setTimeout(()=>{
        //   this.$router.replace('/assetMaintenance')
        // },1000)
      },
      async multiEditAsset(){
        let tmp=[]
        this.assetIds.map((item)=>{
          let obj={...{id:item},...this.assetAddForm}
          console.log(obj)
          tmp.push(obj)
        })
        await AssetManageApi.multiEditAsset(tmp)
        this.$message({
          type:'success',
          message:'批量编辑成功，正在跳转...'
        })
        setTimeout(()=>{
          this.$router.replace('/assetMaintenance')
        },1000)
      }
    },
    mounted(){
       this.getProviderList()
       this.getAssetGroupTree()
       this.getDepartmentTree()
       if(this.assetId || this.assetIds){
         this.getAssetDetail()
       }
       if(this.typeId){
         this.getAttributeByType()
       }
    }
  }
</script>

<style lang="less">
  .add-asset{
    margin:90px 20px 20px 20px !important;
    padding-bottom:20px;
    overflow: auto;
    background: @white;
    .el-form{
      width:60%;
      margin:0 auto;
    }
    .form-inner-tip{
      padding:10px 0;
      font-weight: bold;
    }
    .go-back{
      margin-left:30%;
    }
    .el-col-my{
      width:42%;
      text-align: right;
    }
    .del-custom-btn{
      color:red;
      margin-top:10px;
    }
    .mgr10{
      margin-right: 10px;
    }
    .remark-el-form .el-form-item__content{
      width:70%;
    }
  }
</style>
