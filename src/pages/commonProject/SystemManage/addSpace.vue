<template>
  <div class="add-space radius-shadow">
    <div class="tip flex-align">
      <span class="icon"></span>
      <span>{{tipText}}</span>
    </div>
    <el-form ref="spaceForm" :rules="rules" :model="spaceForm" label-position="right" label-width="120px" >
      <el-form-item label="名称" prop="caption">
        <el-input v-model="spaceForm.caption"></el-input>
      </el-form-item>
      <el-form-item label="工程用名" prop="name">
        <el-input v-model="spaceForm.name"></el-input>
      </el-form-item>
      <el-form-item label="所属空间" prop="parentName">
        <el-input v-model="spaceForm.parentName" @focus="onShowModal"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="memo">
        <el-input v-model="spaceForm.memo" type="textarea" rows="4" :maxlength="255"></el-input>
        <span class="memo-length-tip">{{this.spaceForm.memo.length}}/255</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('spaceForm')">确定</el-button>
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
    name: 'AddSpace',
    components: {
      TreeModal
    },
    // props:['spaceId','isEdit'],
    data () {
      return {
        spaceForm:{
          caption:'',
          name:'',
          memo:'',
          kind:'SPACE',
          typeName:'3DSpace',
          parentId:0,
          parentName:''
        },
        rules: {
          caption:[{ required: true, message: '请输入空间名称', trigger: 'blur' }],
          name:[{ required: true, message: '请输入空间工程用名', trigger: 'blur' }],
        },
        roleList:[],
        showDialog:false,
        departmentList:[],
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
        return this.isEdit?'编辑空间':'添加空间'
      },
      spaceId(){
        return this.$route.query.spaceId
      }
    },
    watch:{
    },
    methods: {
      async getItemSpaceDetail(){
        let res =await CommonApi.getItemSpaceDetail({
          id:this.spaceId,
          kind:'SPACE'
        })
        this.spaceForm={
          id:this.spaceId,
          caption:res.caption,
          name:res.name,
          memo:res.memo
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
        if(this.spaceId){
          res = await CommonApi.editSpace(this.spaceForm)
        }else{
          res = await CommonApi.addSpace(this.spaceForm)
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
      async getAssetAllTree(){
        this.treeModalConfig.treeList = await CommonApi.getAssetAllTree({
          flag: 'space',
          locationRoot: 1
        })
        this.treeModalConfig.treeConfig.defaultExpandedkeys=[this.treeModalConfig.treeList[0].id]
      },
      onShowModal(){
        this.treeModalConfig.showModal=true
      },
      onClickModalSureBtn(val){
        this.spaceForm.parentId=val.id
        this.spaceForm.parentName=val.text
        this.treeModalConfig.showModal=false
      },
      onClickModalCancelBtn(){
        this.treeModalConfig.showModal=false
      }
    },
    async mounted(){
       await this.getAssetAllTree()
       if(this.spaceId){
          this.getItemSpaceDetail()
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
