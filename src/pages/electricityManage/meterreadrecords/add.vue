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

    <el-dialog
      title="选择电表"
      destroy-on-close
      :style="{height:'100%'}"
      :visible.sync="selectMeterDialog"
      width="80%"
    >
      <select-meter :selection="false" @confirm="selectMeterConfirm"></select-meter>
    </el-dialog>
  </div>
</template>
<script>
import { ElectricityManageDic } from "@/utils/dictionary";
import electricityManageApi from 'api/electricityManage';
import selectMeter from '../common/selectMeter';
import { useType } from '../config';

const { checkStatus } = ElectricityManageDic;
const apiConfig = {
  add: {
    flag: 'add',
    title: "抄表记录新增",
    api: electricityManageApi.addReadMeterRecord
  },
  edit: {
    flag: 'edit',
    title: "抄表记录编辑",
    api: electricityManageApi.updateReadMeterRecord
  },
  detail: {
    flag: 'detail',
    title: "抄表记录查看",
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
  components: {
    selectMeter
  },
  data() {
    return {
      pageLoading: false,
      selectMeterDialog: false,
      pageConfig: apiConfig.add,
      model: {},
      formOptions: {
        ref: "formOptions",
        labelWidth: "114",
        menuPosition: "right",
        emptyBtn: false,
        width: "70%",
        forms: [
          {
            type: 'month',
            label: "年度月份",
            prop: "yearOfMonth",
            valueFormat: "yyyy-MM",
            rules: {
              required: true
            }
          },
          {
            type: 'date',
            label: "抄表日期",
            prop: "readTime",
            valueFormat: "yyyy-MM-dd",
            rules: {
              required: true
            }
          },
          {
            label: '电表id',
            prop: 'monitor',
            hide: true
          },
          {
            type: 'input',
            label: "电表号",
            prop: "monitorNum",
            readonly: true,
            noModel: true,
            click: () => {
              this.selectMeterDialog = true;
            },
            rules: {
              required: true,
              trigger: 'change'
            }
          },
          {
            prop: 'monitorName',
            label: "电表名称",
            noModel: true,
            disabled: true,
            rules: {
              required: true
            }
          },
          {
            ...useType,
            disabled: true
          },
          {
            prop: 'mulPower',
            label: "倍率",
            noModel: true,
            disabled: true,
            rules: {
              required: true
            }
          },
          {
            prop: 'mileage',
            label: "里程",
            noModel: true,
            disabled: true,
            row: true,
            rules: {
              required: true
            }
          },
          {
            type: 'number',
            prop: 'lastIndication',
            label: "上次表示数",
            rules: {
              required: true
            }
          },
          {
            type: 'number',
            prop: 'indication',
            label: "本次表示数",
            change: ({ value }) => {
              if (value > this.model.lastIndication) {
                this.model.diffNum = value - this.model.lastIndication
              } else {
                this.model.diffNum = 0
              }
            },
            rules: {
              required: true
            }
          },
          {
            type: 'number',
            prop: 'diffNum',
            label: "抄表见量",
            disabled: true,
            rules: {
              required: true
            },
            change: ({ value }) => {
              this.model.useElecMonth = value * this.model.mulPower;
            }
          },
          {
            type: 'number',
            prop: 'useElecMonth',
            label: "月用电量",
            disabled: true,
            rules: {
              required: true
            }
          },
          {
            prop: 'reader',
            label: "抄表人",
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
      detailOptions: [
        {
          prop: 'recordPersonList',
          label: '审核人',
          type: "dynamic",
          span: 24,
          textMode: true,
          children: {
            size: "small",
            align: "center",
            headerAlign: "center",
            columnConfig: [
              {
                label: "审核人",
                prop: "examineName"
              },
              {
                label: "审核结果",
                prop: "examineType",
                type: 'switch',
                displayAs: 'switch',
                dicData: checkStatus
              },
              {
                label: "审核时间",
                prop: "examineTime"
              },
              {
                label: "审核意见",
                prop: "examineIdea"
              }
            ]
          },
        }
      ]
    };
  },
  computed: {
    Form() {
      return this.$refs[this.formOptions.ref]
    },
    isDetail() {
      return this.pageConfig.flag === 'detail';
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

    if(this.isDetail){
      this.formOptions.forms = this.formOptions.forms.concat(this.detailOptions)
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
      row = JSON.parse(row);
      row.yearOfMonth = `${row.year}-${row.month}`;
      this.model = { ...this.model, ...row };
    },
    selectMeterConfirm(data) {
      electricityManageApi.getElecMeterInfo({
        monitor: data.id
      }).then(res => {
        let monitorDetail = _.pick(res, 'monitor', 'monitorName', 'monitorNum', 'mulPower', 'mileage', 'useType');
        this.model = { ...this.model, ...monitorDetail };
        this.selectMeterDialog = false;
      })
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
