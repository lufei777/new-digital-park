<template>
  <div class="add-asset-type">
    <el-dialog :title="tipText" :visible.sync="showAdd" width="30%" :show-close="false">
      <el-form ref="assetTypeForm" :rules="rules" :model="assetTypeForm" label-position="right" label-width="100px" >
        <el-form-item label="名称" prop="name">
          <el-input v-model="assetTypeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="code">
          <el-input v-model="assetTypeForm.description" type="textarea" rows="4" ></el-input>
          <!--<span class="memo-length-tip">{{this.assetGroupForm.mark.length}}/255</span>-->
        </el-form-item>
        <el-form-item label="类型编码" prop="code">
          <el-input v-model="assetTypeForm.code"></el-input>
          <!--<span class="memo-length-tip">{{this.assetGroupForm.mark.length}}/255</span>-->
        </el-form-item>
        <div class="flex-align-center operator-box">
          <el-button @click="goBack" class="go-back">取消</el-button>
          <el-button type="primary" @click="submitForm('assetTypeForm')">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import AssetManageApi from '../../../service/api/assetManageApi'
  export default {
    name: 'AddAssetType',
    components: {
    },
    props:['showAdd','isEdit','editId'],
    data () {
      return {
        assetTypeForm:{
          name:'',
          description:'',
          code:''
        },
        rules:{
          name:[{ required: true, message: '请输入名称', trigger: 'blur' }],
        }
      }
    },
    computed:{
      tipText(){
        return this.isEdit?'编辑资产类型':'新增资产类型'
      }
    },
    watch: {
      editId() {
        if (this.editId) {
          this.getAssetTypeDetail()
        } else {
          this.assetTypeForm = {
            name: '',
            description: '',
            code: ''
          }
        }
      },
    },
    methods: {
      submitForm(form){
        this.$refs[form].validate((valid) => {
          if (valid) {
            this.addAssetType()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      async addAssetType(){
        let message=''
        if(!this.isEdit){
          await AssetManageApi.addAssetType(this.assetTypeForm)
          message='添加成功！'
        }else{
          await AssetManageApi.updateAssetType(this.assetTypeForm)
          message='修改成功！'
        }
        this.$message({
          message:message,
          type: 'success',
          duration:1000
        });
        this.$parent.showAdd=false
        this.$parent.curTypeId=''
        this.$parent.getAssetTypeList()
      },
      async getAssetTypeDetail(){
        let res = await AssetManageApi.getAssetTypeDetail({
          assetTypeId:this.editId
        })
        this.assetTypeForm=res[0]
      },
      goBack(){
        this.$parent.showAdd=false
        this.$parent.curTypeId=''
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
