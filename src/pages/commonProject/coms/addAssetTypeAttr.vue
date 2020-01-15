<template>
  <div class="add-asset-type">
    <el-dialog :title="tipText" :visible.sync="showAddModal"
               width="30%" :show-close="false"
               @close="resetForm"
    >
      <el-form ref="typeAttrForm" :rules="rules" :model="typeAttrForm" label-position="right" label-width="100px" >
        <el-form-item label="名称" prop="attrName">
          <el-input v-model="typeAttrForm.attrName"></el-input>
        </el-form-item>
        <el-form-item label="是否必填" prop="required">
          <el-radio v-model="typeAttrForm.required" label="1">是</el-radio>
          <el-radio v-model="typeAttrForm.required" label="0">否</el-radio>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="typeAttrForm.description" type="textarea" rows="4" ></el-input>
          <!--<span class="memo-length-tip">{{this.assetGroupForm.mark.length}}/255</span>-->
        </el-form-item>
        <div class="flex-align-center operator-box">
          <el-button @click="goBack" class="go-back">取消</el-button>
          <el-button type="primary" @click="submitForm('typeAttrForm')">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import AssetManageApi from '@/service/api/assetManage'
  export default {
    name: 'AddAssetTypeAttr',
    components: {
    },
    props:['showAdd','isEdit','editId','curType','curAttr'],
    data () {
      return {
        typeAttrForm:{
          attrName:'',
          description:'',
          required:'1'
        },
        rules:{
          attrName:[{ required: true, message: '请输入名称', trigger: 'blur' }],
        }
      }
    },
    computed:{
      tipText(){
        return this.isEdit?'编辑类型属性':'新增类型属性'
      },
      showAddModal:{
        get(){
          return this.showAdd
        },
        set(){
          this.goBack()
        }
      }
    },
    watch: {
      isEdit() {
        if (this.isEdit) {
          this.typeAttrForm = {
            id:this.curAttr.id,
            attrName: this.curAttr.attrName,
            description:this.curAttr.description,
            required: this.curAttr.required,
          }
        }else{
          this.typeAttrForm={
            attrName:'',
            description:'',
            required:'1'
          }
        }
      },

    },
    methods: {
      submitForm(form){
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.addAssetTypeAttr()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      async addAssetTypeAttr(){
        let message=''
        let params={...{typeId:this.curType.id},...this.typeAttrForm}
        if(!this.isEdit){
          await AssetManageApi.addTypeAttr(params)
          message='添加成功！'
        }else{
          await AssetManageApi.editTypeAttr(params)
          message='修改成功！'
        }
        this.$message({
          message:message,
          type: 'success',
          duration:1000
        });
        this.$parent.showAdd=false
        this.$parent.getAttributeByType()
      },
      async getAssetTypeDetail(){
        let res = await AssetManageApi.getAssetTypeDetail({
          assetTypeId:this.editId
        })
        this.assetTypeForm=res[0]
      },
      goBack(){
        this.$parent.showAdd=false
      },
      resetForm(){
        this.$parent.isEdit=false,
        this.$parent.curAttr=''
      }
    },
    mounted(){

    }
  }
</script>

<style lang="less">
  .add-asset-type{
  }
</style>
