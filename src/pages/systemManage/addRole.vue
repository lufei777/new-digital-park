<template>
  <div class="add-role radius-shadow">
    <el-form
      ref="roleForm"
      :rules="rules"
      :model="roleForm"
      label-position="right"
      label-width="120px"
    >
      <el-form-item label="角色名" prop="name">
        <el-input v-model="roleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="角色详情" prop="caption">
        <el-input v-model="roleForm.caption" type="textarea" rows="4" :maxlength="255"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('roleForm')">确定</el-button>
        <el-button @click="goBack" class="go-back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import CommonApi from '../../service/api/commonApi'
export default {
  data() {
    return {
      roleForm: {
        name: "",
        caption: ""
      },
      rules: {
          name:[{ required: true, message: '角色名不能为空', trigger: 'blur' },
                    { min: 1, message: '至少输入1个字符', trigger: 'blur' }],
            caption:[{required: true, message: '请输入角色详情', trigger: 'blur'}],
      }
    };
  },
  computed:{
      roleId(){
          return this.$route.query.roleId
      }
  },
  methods: {
   async addRole() {
       let res
        if(this.roleId){
           res = await CommonApi.updateRole(this.roleForm)
        }else{
           res = await CommonApi.addRole(this.roleForm)
        }
          this.$message({
            type: 'success',
            message: this.roleId?'修改成功！':'添加成功！',
            duration:1000
          });
         if(res){
            this.$router.push('./roleManage')
          }
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.addRole();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    goBack(){
        history.go(-1)
    },
  }
};
</script>

<style lang="less">
.add-role {
  padding: 10px;
  background: @white;
  .el-form {
    width: 50%;
    margin: 30px auto;
  }
}
</style>
