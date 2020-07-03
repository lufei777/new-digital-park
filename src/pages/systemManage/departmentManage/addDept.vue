<template>
  <div class="add-dept radius-shadow panel-container">
    <div class="tip flex-align">
      <span class="icon left-tip-text-icon"></span>
      <span>{{tipText}}</span>
    </div>
    <div class="form-box">
      <z-form :ref="formConfig.ref" :options="formConfig" v-model="formModel" @submit="submit">
        <template slot="menuBtn" slot-scope="scope">
          <el-button @click="goBack(scope)">返回</el-button>
        </template>
      </z-form>
    </div>
  </div>
</template>

<script>
  import CommonApi from '@/service/api/common'
  import TreeModal from '@/components/treeModal/index'
  import SystemManageApi from '@/service/api/systemManage'

  export default {
    name: 'AddDept',
    components: {
      TreeModal
    },
    data() {
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
              label: "机构简称",
              prop: "name",
              span: 24,
              rules: {
                required: true,
                message: "请输入机构简称",
                trigger: "blur"
              }
            },
            {
              type: "input",
              label: "机构全称",
              prop: "abbr",
              span: 24,
              rules: {
                // required: true,
                // message: "请输入机构全称",
                // trigger: "blur"
              }
            },
            {
              type: "tree",
              label: "上层机构",
              prop: "parent",
              valueDefault:'0',
              span: 24,
              dicData:[],
              props: {
                label: "name",
                value: "id",
                children: "childNode",
              },
            },
            // {
            //   type: "textarea",
            //   label: "描述",
            //   prop: "memo",
            //   span: 24,
            //   rules: {}
            // }
          ]
        },
      }
    },
    computed: {
      tipText() {
        return this.deptId ? '编辑机构' : '添加机构'
      },
      deptId() {
        return this.$route.query.deptId
      },
      api() {
        return this.deptId ? 'editDept' : 'addDept'
      }
    },
    watch: {},
    methods: {
      async getDeptDetail() {
        // console.log("deptId",this.deptId)
        let res = await SystemManageApi.getDeptDetail({}, {deptId:this.deptId})
        this.formModel = res
      },
      goBack() {
        history.go(-1)
      },
      async getDeptTree() {
        let res = await SystemManageApi.getDepartmentTree()
        this.$refs[this.formConfig.ref].setColumnByProp("parent", {
          dicData:res
        });
      },
      async submit(model, hide) {
        await SystemManageApi[this.api](this.formModel)
          .then(res => {
            this.$message({
              type: "success",
              message: res
            });
            this.$router.push('./departmentManage')
          })
          .finally(msg => {
            hide();
          });
      },
    },
    async mounted() {
      await this.getDeptTree()
      if (this.deptId) {
        this.getDeptDetail()
      }
    }
  }
</script>

<style lang="less" scoped>
  .add-dept {
    padding: 20px;
    box-sizing: border-box;
    .form-box {
      width: 40%;
      margin: 0 auto;
    }
  }
</style>
