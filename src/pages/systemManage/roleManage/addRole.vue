<template>
  <div class="add-role radius-shadow  panel-container">
    <z-form :ref="formConfig.ref" :options="formConfig" v-model="formModel" @submit="submit">
      <template slot="menuBtn" slot-scope="scope">
        <el-button @click="goBack(scope)">返回</el-button>
      </template>
    </z-form>
  </div>
</template>

<script>
  import SystemManageApi from '@/service/api/systemManage'

  export default {
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
            // {
            //   type: "input",
            //   label: "角色ID",
            //   prop: "id",
            //   span: 24,
            //   rules: {
            //     required: true,
            //     message: "请输入角色ID",
            //     trigger: "blur"
            //   }
            // },
            {
              type: "input",
              label: "角色名称",
              prop: "name",
              span: 24,
              rules: {
                required: true,
                message: "请输入角色名称",
                trigger: "blur"
              }
            },
            {
              type: "textarea",
              label: "描述",
              prop: "caption",
              span: 24,
              rules: {}
            }
          ]
        },
      };
    },
    computed: {
      roleId() {
        return this.$route.query.roleId
      },
      api() {
        return this.roleId ? 'editRole' : 'addRole'
      }
    },
    methods: {
      async submit(model, hide) {
        await SystemManageApi[this.api](this.formModel)
          .then(res => {
            this.$message({
              type: "success",
              message: res
            });
            this.$router.push('./roleManage')
          })
          .finally(msg => {
            hide();
          });
      },
      goBack() {
        history.go(-1)
      },
      async getRoleDetail() {
        let res = await SystemManageApi.getRoleDetail({
          roleId: this.roleId
        })
        this.formModel = res
      }
    },
    mounted() {
      if (this.roleId) {
        this.getRoleDetail()
      }
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
