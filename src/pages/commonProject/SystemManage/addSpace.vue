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
      <el-form-item label="描述" prop="memo">
        <el-input v-model="spaceForm.memo" type="textarea" rows="4" :maxlength="255"></el-input>
        <span class="memo-length-tip">{{this.spaceForm.memo.length}}/255</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('spaceForm')">确定</el-button>
        <el-button @click="goBack" class="go-back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import CommonApi from '../../../service/api/commonApi'
  export default {
    name: 'AddSpace',
    components: {
    },
    props:['curSpaceId','isEdit'],
    data () {
      return {
        spaceForm:{
          caption:'',
          name:'',
          memo:'',
          kind:'SPACE',
          typeName:'3DSpace',
          parentId:0  //目前写死，建议设计改进
        },
        rules: {
          caption:[{ required: true, message: '请输入空间名称', trigger: 'blur' }],
          name:[{ required: true, message: '请输入空间工程用名', trigger: 'blur' }],
        },
        roleList:[],
        showDialog:false,
        departmentList:[]
      }
    },
    computed:{
      tipText(){
        return this.isEdit?'编辑空间':'添加空间'
      }
    },
    watch:{
    },
    methods: {
      async getItemSpaceDetail(){
        let res =await CommonApi.getItemSpaceDetail({
          id:this.curSpaceId,
          kind:'SPACE'
        })
        this.spaceForm={
          id:this.curSpaceId,
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
        if(this.isEdit){
          res = await CommonApi.editSpace(this.spaceForm)
        }else{
          res = await CommonApi.addSpace(this.spaceForm)
        }
        this.$message({
          type: 'success',
          message: this.isEdit?'修改成功！':'添加成功！',
          duration:1000
        });
        this.$parent.showAdd=false
        this.$parent.getSpaceList()
      },
      goBack(){
        this.$parent.showAdd=false
      },
    },
    mounted(){
     if(this.isEdit){
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
      background: #ecf5ff;
      color:#3a8ee6;
      border-color:#c6e2ff;
    }
    .el-input{
      width:280px;
    }
    .memo-length-tip{
      float: right;
    }
  }
</style>
