<template>
  <div class="add-per panel-container radius-shadow">
    <ModuleTip :text="moduleText"/>
    <div class="form-box">
      <z-form :ref="formConfig.ref" :options="formConfig"
              v-model="formModel" @submit="submit"
      >
        <template slot="menuBtn" slot-scope="scope">
          <el-button @click="goBack(scope)">返回</el-button>
        </template>
      </z-form>
    </div>
  </div>
</template>

<script>
  import {SystemDic} from "@/utils/dictionary";
  import SystemManageApi from '@/service/api/systemManage'
  import ModuleTip from '@/pages/commonProject/coms/moduleTip'

  let  permissionFlag = [{
      label:'查看',
      value:'look',
      type:'0' //代表是读权限下的
    },{
      label:'添加',
      value:'add',
      type:'1', //代表是写权限下的
    },{
      label:'编辑',
      value:'edit',
      type:'1',
    },{
      label:'删除',
      value:'remove',
      type:'1',
    }]
  export default {
    name: 'AddPermission',
    components: {
      ModuleTip
    },
    props: [],
    data() {
      let _this = this

      let checkPType = function (rule, value, callback) {
        if (value==1 && _this.lastNodeFlag) {
          callback(new Error('非最子级模块只可配置读权限'));
        } else{
          callback();
        }
      }
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
              label: "权限名称",
              prop: "name",
              span: 24,
              rules: {
                required: true,
                message: "请输入菜单名称",
                trigger: "blur"
              }
            },
            {
              type: "tree",
              label: "所属模块",
              prop: "menuId",
              span: 24,
              props: {
                label: "name",
                value: "id",
                children:'childNode'
              },
              nodeClick: _this.onClickMenuNode,
              rules: {
                required: true,
                message: "请选择模块名称",
                trigger: "change"
              }
            },
            {
              type: "radio",
              label: "权限类型",
              prop: "pType",
              span: 24,
              dicData: SystemDic.pType,
              valueDefault:0,
              props: {
                label: "label",
                value: "value",
              },
              rules:{
                validator: checkPType,
                trigger: 'change'
              }
            },
            {
              type: "select",
              label: "权限标识",
              prop: "permissionFlag",
              span: 12,
              dicData: permissionFlag,
              props: {
                label: "label",
                value: "value",
              },
              rules:{
                validator: checkPType,
                trigger: 'change'
              }
            },
            {
              type: "textarea",
              label: "描述",
              prop: "pDesc",
              span: 24,
              rules: {}
            },
          ]
        },
        menuList: [],
        lastNodeFlag:false
      }
    },
    computed: {
      perId() {
        return this.$route.query.perId
      },
      api() {
        return this.perId?'editPermission':'addPermission'
      },
      moduleText(){
        return this.perId?'编辑权限':'添加权限'
      }
    },
    watch: {},
    methods: {
      goBack() {
        history.go(-1)
      },
      async getPermissionDetail() {
        let res = await SystemManageApi.getPermissionDetail({
          permissionId: this.perId
        })
        this.formModel = res
      },
      async getPermissionTree() {
        let res = await SystemManageApi.getPermissionTree()
        this.$refs[this.formConfig.ref].setColumnByProp("menuId", {
          dicData:res
        });
      },
      onClickMenuNode(node){
        if(node.childNode.length){
          this.lastNodeFlag = true
        }else{
          this.lastNodeFlag = false
        }
      },
      async submit(model, hide) {
        await SystemManageApi[this.api](this.formModel)
          .then(res => {
            this.$message({
              type: "success",
              message: res
            });
            this.$router.push('./permissionManage')
          })
          .finally(msg => {
            hide();
          });
      },
    },
    async mounted() {
     if (this.perId) {
        await this.getPermissionDetail()
       this.$refs[this.formConfig.ref].setColumnByProp("menuId", {
         disabled:true
       });
       this.$refs[this.formConfig.ref].setColumnByProp("pType", {
         disabled:true
       });
      }
     this.getPermissionTree()
    }
  }
</script>

<style lang="less" scoped>
  .add-per {
    padding: 20px;
    background: @white;
    box-sizing: border-box;

    .form-box {
      width: 50%;
      margin: 0 auto;
    }
  }
</style>
