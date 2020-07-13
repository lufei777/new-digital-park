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
import { ElectricityManageDic } from "utils/dictionary";
import { floorsTree } from "utils/formsItem";
import { meterColumnConfig } from '../config';

const apiConfig = {
  add: {
    title: "新增电价维护信息",
    api: electricityManageApi.setElecPrice
  },
  edit: {
    title: "编辑电价维护信息",
    api: electricityManageApi.updateElecPrice
  },
  detail: {
    title: "查看电价维护信息",
    extraOptions: {
      textMode: true,
      submitBtn: false
    }
  }
};
const dateValueFormat = "yyyy-MM-dd";
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
            type: 'date',
            label: "开始日期",
            prop: "startTime",
            valueFormat: dateValueFormat,
            rules: {
              required: true
            }
          },
          {
            type: 'date',
            label: "结束日期",
            prop: "endTime",
            valueFormat: dateValueFormat,
            rules: {
              required: true
            },
            pickerOptions: {
              disabledDate: (time) => {
                let date = this.model.startTime;
                if (date) {
                  return time.getTime() < new Date(date).getTime();
                } else {
                  return !date;
                }
              }
            }
          },
          {
            type: 'input',
            dataType: 'number',
            label: "收费电价",
            prop: "price",
            append: '元/千瓦时',
            rules: {
              required: true
            }
          },
          {
            type: 'input',
            dataType: 'number',
            label: "尖峰电价",
            prop: "peakPrice",
            append: '元/千瓦时',
            rules: {
              required: true
            }
          },
          {
            type: 'input',
            dataType: 'number',
            label: "谷段电价",
            prop: "valleyPrice",
            append: '元/千瓦时',
            rules: {
              required: true
            }
          },
          {
            type: 'input',
            dataType: 'number',
            label: "平段电价",
            prop: "flayPrice",
            append: '元/千瓦时',
            rules: {
              required: true
            }
          },
          {
            type: 'input',
            dataType: 'number',
            label: "代征各项基金和附加费系数",
            prop: "surcharge",
            append: '元/度',
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
      let { id, flag, row } = this.$route.query;
      // 如果有id，代表新增或编辑
      if (typeof id !== 'undefined') {
        this.pageConfig = _.cloneDeep(apiConfig[flag]);
        this.getPropertyDetail(id, row);
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
    getPropertyDetail(id, row) {
      this.model = { ...this.model, ...JSON.parse(row) };
      /* this.pageLoading = true;
        electricityManageApi
        .selectTenantUseElecByid({ id })
        .then(res => {
          this.model = { ...this.model, ...res };
        })
        .finally(() => {
        }); */
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
