<template>
  <div class="choose-asset-type">
    <el-dialog title="选择资产类型" :visible.sync="showAdd" width="30%" :show-close="false">
      <el-tree
        :data="typeList"
        :props="treeProps"
        node-key="id"
        @node-click="handleTreeClick"
        ref="assetTypeList"
        :highlight-current="true"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="goBack">取 消</el-button>
        <el-button type="primary" @click="onClickNextBtn">下一步</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import CommonApi from '../../../service/api/commonApi'
  export default {
    name: 'ChooseAssetType',
    components: {
    },
    props:['showAdd','isEdit','editId'],
    data () {
      return {
        typeList:[],
        treeProps:{
          label:'name',
        },
        selectType:''
      }
    },
    computed:{
    },
    methods: {
      async getAssetTypeList(){
        let res = await CommonApi.getAssetTypeList()
        this.typeList =res.list
      },
      handleTreeClick(val){
         console.log(val)
        this.selectType=val.id
      },
      goBack(){
        this.$parent.showAdd=false
      },
      onClickNextBtn(){
         if(!this.selectType){
           this.$message({
             message:'请先选择资产类型！',
             type: 'warning',
             duration:1000
           });
           return;
         }
         this.$parent.showAdd=false
         this.$router.push('/addAsset')
      }
    },
    mounted(){
       this.getAssetTypeList()
    }
  }
</script>

<style lang="less">
  .choose-asset-type{
  }
</style>
