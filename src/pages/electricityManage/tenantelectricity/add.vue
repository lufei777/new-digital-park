<template>
  <div>
    <div class="panel">
      <span class="tip frist-tip flex-align">
        <span class="icon"></span>
        <span>{{pageConfig.title}}</span>
      </span>
      <div v-loading="pageLoading" class="form">
        <z-form :ref="formOptions.ref" :options="formOptions" v-model="model" @submit="submit">
          <template slot="menuBtn" slot-scope="scope">
            <el-button @click="back(scope)">返回</el-button>
          </template>
        </z-form>
      </div>
    </div>
  </div>
</template>
<script>
import electricityManageApi from 'api/electricityManage';
import leaseManageApi from 'api/leaseManage';

const apiConfig = {
  add: {
    title: "新增租户用电数据",
    api: electricityManageApi.addTenantUseElec
  },
  edit: {
    title: "编辑租户用电数据",
    api: electricityManageApi.editTenantUseElec
  },
  detail: {
    title: "查看租户用电数据",
    extraOptions: {
      textMode: true,
      submitBtn: false
    }
  }
};
let tableSendData = {
  pageNum: 1,
  pageSize: 10
};

export default {
  data() {
    return {
      pageLoading: false,
      model: {},
      formOptions: {
        ref: "formOptions",
        labelWidth: "114",
        menuPosition: "right",
        emptyBtn: false,
        width: "70%",
        forms: [
          {
            type: 'table',
            label: "合同编号",
            prop: "contractNumber",
            clearable: true,
            children: {
              serverMode: {
                url: leaseManageApi.contractList,
                data: tableSendData
              },
              columnConfig: [
                {
                  label: '合同名称',
                  prop: 'contractName'
                },
                {
                  label: '合同编号',
                  prop: 'contractNumber'
                }
              ]
            },
            props: {
              label: 'contractNumber',
              value: 'contractNumber'
            },
            change: ({ value, _self: { active: { contractId } } }) => {
              // 查询合同详情，只有合同详情中有空间信息
              leaseManageApi.contractDetail({ contractId }).then(res => {
                const detail = _.pick(res, ['contractTime', 'expireTime', 'projectName', 'spaceName', 'tenantName', 'tenantNumber', 'contractName']);
                this.model = { ...this.model, ...detail };
              })
            },
            rules: {
              required: true
            }
          },
          {
            type: 'input',
            label: "合同名称",
            prop: "contractName",
            noModel: true,
            disabled: true
          },
          {
            type: 'input',
            label: "租户名称",
            prop: "tenantName",
            noModel: true,
            disabled: true,
            rules: {
              required: true
            }
          },
          {
            type: 'input',
            label: "租户编号",
            prop: "tenantNumber",
            hide: true
          },
          {
            label: '起始日期',
            prop: 'contractTime',
            disabled: true,
            noModel: true
          },
          {
            label: '结束日期',
            prop: 'expireTime',
            disabled: true,
            noModel: true
          },
          {
            label: '工程名称',
            prop: 'projectName',
            disabled: true,
            noModel: true
          },
          {
            label: '所在楼层',
            prop: 'spaceName',
            disabled: true,
            noModel: true,
            rules: {
              required: true
            }
          },
          {
            label: '用电量所占比例',
            prop: 'proportion',
            type: 'number',
            append: '%',
            rules: {
              required: true
            }
          }
        ]
      },
      pageConfig: apiConfig.add
    };
  },
  computed: {
    Form() {
      return this.$refs[this.formOptions.ref]
    }
  },
  created() {
    if (Object.keys(this.$route.query).length !== 0) {
      let { id, flag } = this.$route.query;
      // 如果有id，代表新增或编辑
      if (typeof id !== 'undefined') {
        this.pageConfig = _.cloneDeep(apiConfig[flag]);
        this.getPropertyDetail(id);
      }
      // 传递过来额外的配置
      this.formOptions = {
        ...this.formOptions,
        ...this.pageConfig.extraOptions
      };
    }
  },
  methods: {
    submit(model, hide) {
      console.log("submit -> model", model)
      this.pageConfig.api({}, model).then(res => {
        this.$router.back();
      }).finally(msg => {
        hide();
      });
    },
    clearForm() {
      this.Form.resetForm();
    },
    back() {
      this.$router.back();
    },
    getPropertyDetail(id) {
      this.pageLoading = true;
      electricityManageApi
        .selectTenantUseElecByid({ id })
        .then(res => {
          this.model = { ...this.model, ...res };
        })
        .finally(() => {
          this.pageLoading = false;
        });
    }
  }
};
</script>
<style lang='less' scoped>
.panel {
  .form {
    display: flex;
    justify-content: center;
  }
  .tip {
    margin: 20px 0;
    .icon {
      width: 4px;
      height: 16px;
      background: @mainBgColor;
      border-radius: 2px;
      margin-right: 10px;
    }
    span {
      font-size: 16px;
      color: @mainBgColor;
    }
  }
}
</style>
