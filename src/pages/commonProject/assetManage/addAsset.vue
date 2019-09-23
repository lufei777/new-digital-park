<template>
  <div class="add-asset">
    <!--<el-dialog :title="tipText" :visible.sync="showAdd" width="30%" :show-close="false">-->
      <el-form ref="assetAddForm" :rules="rules" :model="assetAddForm" :inline="true"
               label-position="right" label-width="100px">
        <div class="form-inner-tip">基本信息:</div>
        <el-col>
          <el-form-item label="名称" prop="name" class="el-col-12">
            <el-input v-model="assetAddForm.name"></el-input>
          </el-form-item>
          <el-form-item label="图片" prop="picture" >
            <el-input v-model="assetAddForm.picture"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="资产组" prop="groupId" class="el-col-12">
            <el-input v-model="assetAddForm.groupId"></el-input>
          </el-form-item>
          <el-form-item label="资产类型" prop="groupId">
            <el-input v-model="assetAddForm.groupId"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="规格型号" prop="groupId" class="el-col-12">
            <el-input v-model="assetAddForm.groupId"></el-input>
          </el-form-item>
          <el-form-item label="制造厂商" prop="groupId">
            <el-input v-model="assetAddForm.groupId"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="等级" prop="groupId" class="el-col-12">
            <el-input v-model="assetAddForm.groupId"></el-input>
          </el-form-item>
          <el-form-item label="属性" prop="groupId">
            <el-input v-model="assetAddForm.groupId"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="计量单位" prop="groupId" class="el-col-12">
            <el-input v-model="assetAddForm.groupId"></el-input>
          </el-form-item>
        </el-col>
        <div class="form-inner-tip">管理信息:</div>
        <el-col>
          <el-form-item label="管理员" prop="groupId" class="el-col-12">
            <el-input v-model="assetAddForm.groupId"></el-input>
          </el-form-item>
          <el-form-item label="所属部门" prop="groupId">
            <el-input v-model="assetAddForm.groupId"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="单独核算" prop="groupId" class="el-col-12">
            <el-checkbox v-model="assetAddForm.checked"></el-checkbox>
          </el-form-item>
          <el-form-item label="供应商" prop="groupId">
            <el-input v-model="assetAddForm.groupId"></el-input>
          </el-form-item>
        </el-col>
        <el-col>
          <el-form-item label="替代" prop="groupId" class="el-col-12">
            <el-input v-model="assetAddForm.groupId"></el-input>
          </el-form-item>
          <el-form-item label="版本" prop="groupId">
            <el-input v-model="assetAddForm.groupId"></el-input>
          </el-form-item>
        </el-col>
        <div class="form-inner-tip">采购信息:</div>
        <el-col>
          <el-form-item label="币种" prop="groupId" class="el-col-12">
            <el-input v-model="assetAddForm.groupId"></el-input>
          </el-form-item>
          <el-form-item label="价格" prop="groupId">
            <el-input v-model="assetAddForm.groupId"></el-input>
          </el-form-item>
        </el-col>
        <div class="form-inner-tip">折旧信息:</div>
        <el-col>
          <el-form-item label="折旧年限" prop="groupId" class="el-col-12">
            <el-input v-model="assetAddForm.groupId"></el-input>
          </el-form-item>
          <el-form-item label="残值率" prop="groupId">
            <el-input v-model="assetAddForm.groupId"></el-input>
          </el-form-item>
        </el-col>
        <div class="form-inner-tip">其他信息:</div>
        <!--<el-col>-->
          <el-form-item label="备注" prop="groupId" class="el-col-12">
            <el-input v-model="assetAddForm.groupId" type="textarea"></el-input>
          </el-form-item>
        <!--</el-col>-->
        <el-col>
          <div class="operator-box">
            <el-button @click="goBack" class="go-back">取消</el-button>
            <el-button type="primary" @click="submitForm('assetAddForm')">确定</el-button>
          </div>
        </el-col>
      </el-form>
    <!--</el-dialog>-->
  </div>
</template>

<script>
  import CommonApi from '../../../service/api/commonApi'
  export default {
    name: 'AddAsset',
    components: {
    },
    props:['showAdd','isEdit'],
    data () {
      return {
        assetAddForm:{
          name:'',
          picture:'',
          groupName:'',
          checked:''
        },
        rules:{
        }
      }
    },
    computed:{
      tipText(){
        return this.isEdit?'编辑资产组':'新增资产组'
      },
      assetId(){
        return this.$route.query.id
      }
    },
    watch:{
      assetId(){
        console.log(1)
        if(this.assetId){
          this.getAssetDetail()
        }
      }
    },
    methods: {
      submitForm(form){
      },
      goBack(){
        this.$router.replace('/assetMaintenance')
      },
      async getAssetDetail(){
        await CommonApi.getAssetDetail({
          assetId:this.assetId
        })
      }
    },
    mounted(){
      if(this.isEdit){
        this.getAssetDetail()
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
  }
</style>
