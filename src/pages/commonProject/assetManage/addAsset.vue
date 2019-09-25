<template>
  <div class="add-asset">
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
          <el-input v-model="assetAddForm.groupName" @focus="onShowGroup(1)"></el-input>
        </el-form-item>
      </el-col>
      <el-col>
        <el-form-item label="价格" prop="price" class="el-col-12">
          <el-input v-model="assetAddForm.price"></el-input>
        </el-form-item>
        <el-form-item label="所在部门" prop="departmentId" >
          <el-input v-model="assetAddForm.departmentId"></el-input>
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
      <el-col v-for="(item,index) in assetAddForm.ownAttrList" :key="index">
        <el-form-item v-for="(child,i) in item" :key="i"
                      :label="child.attrName"
                      :prop="'ownAttrList.'+index+'.'+i+'.'+child.attrName"
                      :class="i%2==0?'el-col-12':''"
                      :rules="{
                        required:child.required,message:'请输入'+child.attrName,trigger: 'blur'
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
          <el-form-item label="属性名称" class="el-col-12"
                        :prop="'customAttrList.'+index+'.attr'"
                        :rules="{
                          required:true,message:'请输入属性名称',trigger: 'blur'
                        }">
            <el-input v-model="item.attr" ></el-input>
          </el-form-item>
          <el-form-item label="属性值" :prop="'customAttrList.'+index+'.value'"
                        :rules="{
                          required:true,message:'请输入属性值',trigger: 'blur'
                        }">
            <el-input v-model="item.value"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <div class="operator-box">
            <el-button @click="goBack" class="go-back">取消</el-button>
            <el-button type="primary" @click="submitForm('assetAddForm')">确定</el-button>
          </div>
        </el-col>
      </el-form>
    <AssetGroupModal :showGroup="showGroup" :sureCallback="onSureGroupName" :cancelCallback="onShowGroup"
    />
  </div>
</template>

<script>
  import CommonApi from '../../../service/api/commonApi'
  import AssetGroupModal from '../coms/assetGroupModal'
  export default {
    name: 'AddAsset',
    components: {
      AssetGroupModal
    },
    props:[],
    data () {
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
          price:'',
          remark:'',
          ownAttrList:[],
          customAttrList:[],
        },
        rules:{
          name:[{required:true,message:'请输入资产名称',trigger: 'blur' }],
          groupName:[{required:true,message:'请选择资产组',trigger: 'blur' }]
        },
        providerList:[],
        showGroup:false,
      }
    },
    computed:{
      assetId(){
        return this.$route.query.assetId
      },
      typeId(){
        return this.$route.query.typeId
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
        this.$router.replace('/assetMaintenance')
      },
      async getAssetDetail(){
        let res = await CommonApi.getAssetDetail({
          assetId:this.assetId
        })
        this.assetAddForm={...res,...{
            ownAttrList:[],
            customAttrList:[],
        }}

        let ownAttrList =res.assetAttributeValueList
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
      },
      async getAttributeByType(){
        let res = await CommonApi.getAttributeByType({
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
         this.providerList = await CommonApi.getProviderList()
         // this.providerList.push({
         //   id:2,
         //   name:'test'
         // })
         this.assetAddForm.providerId=this.providerList[0].id
         this.assetAddForm.providerName=this.providerList[0].name
      },
      async getAssetGroupTree(){
        let res = await CommonApi.getAssetGroupTree()
        this.assetAddForm.groupId=res[0].id
        this.assetAddForm.groupName=res[0].name
      },
      onShowGroup(flag){
        this.showGroup=flag==1?true:false
      },
      addCustomAttr(){
        // this.assetAddForm.customAttrList.push({
        //   value: '',
        //   key: Date.now()
        // });
        this.assetAddForm.customAttrList.push({
           attr:'',
           value:'',
           key:Date.now()
        })
      },
      onSureGroupName(val){
        this.showGroup=false
        this.assetAddForm.groupId=val.id
        this.assetAddForm.groupName=val.name
      },
      async addAsset(){
        let tmp=[]
        for(let key in this.assetAddForm){
          if(key != 'groupName' && key != 'ownAttrList' && key != 'customAttrList'){
            tmp.push({
              'attrName':key,
              'attrValue':this.assetAddForm[key]
            })
          }else if(key == 'ownAttrList'){
            this.assetAddForm.ownAttrList.map((item)=>{
              item.map((child)=>{
                tmp.push({
                  'attrName':child.attrName,
                  'attrValue':child[child.attrName]
                })
              })
            })
          }else if(key == 'customAttrList'){
            this.assetAddForm.customAttrList.map((item)=>{
              tmp.push({
                'attrName':item.attr,
                'attrValue':item.value
              })
            })
          }
        }
        tmp.push({
          'attrName':'typeId',
          'attrValue':this.typeId
        })
        console.log("tmp",tmp)
        await CommonApi.addAsset(tmp)
        this.$message({
          type:'success',
          message:'添加成功,正在跳转...'
        })
        setTimeout(()=>{
          this.$router.replace('/assetMaintenance')
        },1000)
      },
      onProviderChange(val){
        let obj = this.providerList.find((item)=>{
          return item.id==val
        })
        this.assetAddForm.providerName=obj.name
      }
    },
    mounted(){
       this.getProviderList()
       this.getAssetGroupTree()
       if(this.assetId){
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
    padding-bottom:20px;
    overflow: auto;
    .el-form{
      width:50%;
      margin:0 auto;
    }
    .form-inner-tip{
      padding:10px 0;
      font-weight: bold;
    }
    .go-back{
      margin-left:30%;
    }
    .remark-el-form .el-form-item__content{
      width:80%;
    }
  }
</style>
