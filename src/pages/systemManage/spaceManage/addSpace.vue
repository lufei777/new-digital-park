<template>
  <div class="add-space radius-shadow panel-container">
    <div class="tip flex-align">
      <span class="icon left-tip-text-icon"></span>
      <span>{{tipText}}</span>
    </div>
    <div class="table-box">
      <z-form :ref="formConfig.ref" :options="formConfig" v-model="formModel" @submit="submit">
        <template slot="menuBtn" slot-scope="scope">
          <el-button @click="goBack(scope)">返回</el-button>
        </template>
      </z-form>
    </div>
  </div>
</template>

<script>
  import CommonApi from '../../../service/api/common'
  import TreeModal from '../../../components/treeModal'
  export default {
    name: 'AddSpace',
    components: {
      TreeModal
    },
    data () {
      return {
        formModel: {},
        formConfig: {
          ref: "formRef",
          size: "medium",
          menuPosition: "center",
          labelWidth: 150,
          emptyBtn: false,
          forms: [
            {
              type: "input",
              label: "名称",
              prop: "caption",
              span: 24,
              rules: {
                required: true,
                message: "请输入名称",
                trigger: "blur"
              }
            },
            {
              type: "input",
              label: "工程用名",
              prop: "name",
              span: 24,
              rules: {
                required: true,
                message: "请输入工程用名",
                trigger: "blur"
              }
            },
            {
              type: "tree",
              label: "所属空间",
              prop: "parentId",
              span: 24,
              dicData:[],
              props: {
                label: "text",
                value: "id",
                children: "nodes",
              },
            },
            {
              type: "textarea",
              label: "描述",
              prop: "memo",
              span: 24,
              rules: {}
            }
          ]
        },
      }
    },
    computed:{
      spaceId(){
        return this.$route.query.spaceId
      },
      tipText(){
        return this.spaceId?'编辑空间':'添加空间'
      },
      api(){
        return this.spaceId?'editSpace':'addSpace'
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
        this.formModel = res
      },
      goBack(){
        history.go(-1)
      },
      async getAssetAllTree(){
        let res = await CommonApi.getAssetAllTree({
          flag: 'space',
          locationRoot: 1
        })
        this.$refs[this.formConfig.ref].setColumnByProp("parentId", {
          dicData:res
        });
      },
      async submit(model, hide) {
        await CommonApi[this.api](this.formModel)
          .then(res => {
            this.$message({
              type: "success",
              message: res
            });
            // this.$router.push('./spaceManage')
          })
          .finally(msg => {
            hide();
          });
      },
    },
    async mounted(){
       await this.getAssetAllTree()
       if(this.spaceId){
          this.getItemSpaceDetail()
       }
    }
  }
</script>

<style lang="less" scoped>
  .add-space{
    padding:20px;
    background: @white;
    .table-box{
      width:40%;
      margin:0 auto;
    }
  }
</style>
