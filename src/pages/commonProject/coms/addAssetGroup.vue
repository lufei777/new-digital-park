<template>

  <div class="add-asset-group">
    <el-dialog :title="tipText" :visible.sync="showAdd" width="30%" :show-close="false">
      <el-form ref="assetGroupForm" :rules="rules" :model="assetGroupForm" label-position="right" label-width="60px" >
        <el-form-item label="名称" prop="name">
           <el-input v-model="assetGroupForm.name"></el-input>
        </el-form-item>
        <el-form-item label="编号" prop="code">
           <el-input v-model="assetGroupForm.code"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="mark">
           <el-input v-model="assetGroupForm.mark" type="textarea" rows="4" :maxlength="255"></el-input>
        <!--<span class="memo-length-tip">{{this.assetGroupForm.mark.length}}/255</span>-->
        </el-form-item>
        <div class="flex-align-center operator-box">
          <el-button @click="goBack" class="go-back">取消</el-button>
          <el-button type="primary" @click="submitForm('assetGroupForm')">确定</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import CommonApi from '../../../service/api/commonApi'
  export default {
    name: 'AddUser',
    components: {
    },
    props:['showAdd','isEdit'],
    data () {
      return {
        assetGroupForm:{
          name:'',
          code:'',
          mark:''
        },
        rules:{
          name:[{ required: true, message: '请输入名称', trigger: 'blur' }],
          code:[{ required: true, message: '请输入编号', trigger: 'blur' }],
        }
      }
    },
    computed:{
      tipText(){
        return this.isEdit?'编辑资产组':'新增资产组'
      }
    },
    watch:{
    },
    methods: {
      submitForm(form){
        this.$parent.showAdd=false
      },
      goBack(){
        this.$parent.showAdd=false
      }
    },
    mounted(){

    }
  }
</script>

<style lang="less">
  .add-asset-group{
  }
</style>
