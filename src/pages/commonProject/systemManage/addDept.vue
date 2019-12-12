<template>
  <div class="add-space radius-shadow">
    <div class="tip flex-align">
      <span class="icon"></span>
      <span>{{tipText}}</span>
    </div>
    <el-form ref="deptForm" :rules="rules" :model="deptForm" label-position="right" label-width="120px" >
      <el-form-item label="机构简称" prop="name">
        <el-input v-model="deptForm.name"></el-input>
      </el-form-item>
      <el-form-item label="机构全称" prop="abbr">
        <el-input v-model="deptForm.abbr"></el-input>
      </el-form-item>
      <el-form-item label="父机构" prop="parentName">
        <el-input v-model="deptForm.parentName" @focus="onShowModal"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('deptForm')">确定</el-button>
        <el-button @click="goBack" class="go-back">返回</el-button>
      </el-form-item>
    </el-form>
    <TreeModal :tree-modal-config="treeModalConfig"></TreeModal>
  </div>
</template>

<script>
  import CommonApi from '../../../service/api/commonApi'
  import TreeModal from '../../../components/treeModal/index'
  export default {
    name: 'AddDept',
    components: {
      TreeModal
    },
    data () {
      return {
        deptForm:{
          name:'',
          abbr:'',
          parent:0,
          parentName:''
        },
        rules: {
          abbr:[{ required: true, message: '请输入机构全称', trigger: 'blur' }],
          name:[{ required: true, message: '请输入机构简称', trigger: 'blur' }],
        },
        treeModalConfig:{
          treeList:[],
          treeConfig:{
            defaultExpandedkeys:[],
          },
          showModal:false,
          onClickSureBtnCallback:this.onClickModalSureBtn,
          onClickCancelBtnCallback:this.onClickModalCancelBtn
        }
      }
    },
    computed:{
      tipText(){
        return this.isEdit?'编辑机构':'添加机构'
      },
      deptId(){
        return this.$route.query.deptId
      }
    },
    watch:{
    },
    methods: {
      async getDeptDetail(){
        let res =await CommonApi.getDeptDetail({
          id:this.deptId,
        })
        this.deptForm={
          did:this.deptId,
          name:res.name,
          abbr:res.abbr,
          parent:res.parent
        }
      },
      submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.addSpace()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      async addSpace(){
        let res
        if(this.deptId){
          res = await CommonApi.editDept(this.deptForm)
        }else{
          res = await CommonApi.addDept(this.deptForm)
        }
        this.$message({
          type: 'success',
          message: this.spaceId?'修改成功！':'添加成功！',
          duration:1000
        });
      },
      goBack(){
        history.go(-1)
      },
      async getDeptTree(){
        this.treeModalConfig.treeList = await CommonApi.getDeptTree()
        this.treeModalConfig.treeConfig.defaultExpandedkeys=[this.treeModalConfig.treeList[0].id]
      },
      onShowModal(){
        this.treeModalConfig.showModal=true
      },
      onClickModalSureBtn(val){
        this.deptForm.parentId=val.id
        this.deptForm.parentName=val.text
        this.treeModalConfig.showModal=false
      },
      onClickModalCancelBtn(){
        this.treeModalConfig.showModal=false
      }
    },
    async mounted(){
       await this.getDeptTree()
       if(this.deptId){
          this.getDeptDetail()
       }
    }
  }
</script>

<style lang="less">
  .add-space{
    padding:20px;
    background: @white;
    .el-form{
      width:50%;
      margin:30px auto;
    }
    .el-input{
      width:60%;
    }
    .go-back{
    }
    .el-input{
      width:280px;
    }
    .memo-length-tip{
      float: right;
    }
  }
</style>
