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
import { electricityManageDic } from "utils/dictionary";
import { floorsTree } from "utils/formsItem";
import { meterColumnConfig } from '../config';
import { useType } from '../config';

const apiConfig = {
  add: {
    title: "新增用户电表信息",
    api: electricityManageApi.addMeterElec
  },
  edit: {
    title: "编辑用户电表明细",
    api: electricityManageApi.updateMeterElecById
  },
  detail: {
    title: "查看用户电表明细",
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
            type: 'tree',
            label: "楼座名称",
            prop: "spaceId",
            noModel: true,
            ...floorsTree,
            change: ({ value }) => {
              // 根据空间查询电表列表
              this.setMonitor(value);
            },
            rules: {
              required: true
            }
          },
          {
            type: 'select',
            label: "电表号",
            prop: "monitor",
            props: {
              value: 'monitor',
              label: 'name'
            },
            change: ({ selectValue }) => {
              this.model.monitorName = selectValue.caption
              this.model.floorName = selectValue.scaption
            },
            rules: {
              required: true
            }
          },
          {
            label: "电表名称",
            prop: "monitorName",
            noModel: true,
            disabled: true,
            rules: {
              required: true
            }
          },
          {
            label: "安装楼层",
            prop: "floorName",
            noModel: true,
            disabled: true,
            rules: {
              required: true
            }
          },
          {
            ...useType,
            rules: {
              required: true
            }
          },
          {
            type: 'number',
            label: "倍率",
            prop: "mulPower",
            rules: {
              required: true
            }
          },
          {
            type: 'number',
            label: "里程",
            prop: "mileage",
            row: true,
            rules: {
              required: true
            }
          },
          {
            type: 'textarea',
            label: "备注",
            prop: "remarks"
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
      this.pageConfig.api(model).then(res => {
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
    setMonitor(spaceId) {
      electricityManageApi.getElecMeterProbe({
        spaceId
      }).then(res => {
        this.Form.setColumnByProp('monitor', {
          dicData: res
        })
      })
    },
    getPropertyDetail(id) {
      this.pageLoading = true;
      electricityManageApi
        .selectMeterElecById({ id })
        .then(res => {
          this.model = { ...this.model, ...res };
          // 由于详情时不会触发，因此手动触发
          this.setMonitor(this.model.spaceId);
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
