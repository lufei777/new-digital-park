<template>
  <div>
    <div class="panel">
      <span class="tip frist-tip flex-align">
        <span class="icon"></span>
        <span>{{pageConfig.title}}</span>
      </span>
      <div class="form">
        <z-form :ref="formOptions.ref" :options="formOptions" v-model="model" @submit="submit">
          <template slot="menuBtn" slot-scope="{size}">
            <template v-if="pageConfig.flag === 'check'">
              <el-button :size="size" type="primary" @click="pass">通过</el-button>
              <el-button :size="size" type="danger" @click="reject">驳回</el-button>
            </template>
            <el-button :size="size" @click="back">返回</el-button>
          </template>
        </z-form>
      </div>
    </div>
  </div>
</template>
<script>
import leaseManageApi from "@/service/api/leaseManage";

const incomeType = [
  { label: "租赁", value: 0 },
  { label: "服务费", value: 1 },
  { label: "专利费", value: 2 }
];

const apiConfig = {
  add: {
    flag: "add",
    title: "发起收费",
    api: leaseManageApi.addHouse
  },
  edit: {
    flag: "edit",
    title: "编辑",
    api: leaseManageApi.editHouse
  },
  detail: {
    flag: "detail",
    title: "详情",
    extraOptions: {
      disabled: true,
      submitBtn: false
    }
  },
  check: {
    flag: "check",
    title: "审核",
    extraOptions: {
      disabled: true,
      submitBtn: false
    }
  }
};

export default {
  data() {
    return {
      model: {},
      formOptions: {
        ref: "formRef",
        labelWidth: "100",
        menuPosition: "right",
        emptyBtn: false,
        width: "70%",
        forms: [
          {
            type: "input",
            prop: "id",
            display: false
          },
          {
            type: "input",
            label: "编号",
            prop: "incomId",
            readonly: true,
            valueDefault: "SZ-202003050001",
            span: 12,
            tip: "该编号自动生成"
          },
          {
            type: "input",
            label: "收入名称",
            prop: "incomeName",
            clearable: true,
            span: 12,
            rules: {
              required: true,
              trigger: "blur"
            }
          },
          {
            type: "date",
            label: "发起时间",
            prop: "launchDate",
            format: "yyyy-MM-dd",
            valueFormat: "timestamp",
            valueDefault: _.now(),
            clearable: true,
            span: 12,
            rules: {
              required: true,
              trigger: "blur"
            }
          },
          {
            type: "date",
            label: "截止时间",
            prop: "endTime",
            format: "yyyy-MM-dd",
            valueFormat: "timestamp",
            clearable: true,
            span: 12,
            rules: {
              required: true,
              trigger: "blur"
            }
          },
          {
            type: "input",
            label: "发起人",
            prop: "launchName",
            clearable: true,
            span: 12,
            rules: {
              required: true,
              trigger: "blur"
            }
          },
          {
            type: "input",
            label: "应收金额",
            prop: "receivMoney",
            dataType: "number",
            clearable: true,
            span: 12,
            append: "元",
            rules: {
              required: true,
              trigger: "blur"
            }
          },
          {
            type: "select",
            label: "收入类型",
            prop: "incomeType",
            clearable: true,
            span: 12,
            dicData: incomeType,
            rules: {
              required: true,
              trigger: "blur"
            }
          },
          {
            type: "input",
            label: "支付方",
            prop: "payName",
            clearable: true,
            span: 12,
            rules: {
              required: true,
              trigger: "blur"
            }
          },
          {
            type: "textarea",
            label: "备注",
            prop: "remarks",
            clearable: true,
            span: 12
          },
          {
            type: "upload",
            listType: "picture-card",
            label: "相关凭证",
            prop: "housePictureVOList",
            tip: "只能上传jpg/png文件。",
            action: "/oaApi/image/upload",
            filesize: 3,
            accept: ["jpg", "jpeg", "png"],
            props: {
              label: "housePictureName",
              value: "housePictureUrl"
            },
            propsHttp: {
              name: "fileName",
              url: "fileUrl",
              res: "data"
            },
            span: 24
          }
        ]
      },
      pageConfig: apiConfig.add
    };
  },
  created() {
    console.log(this.$route.query);
    if (this.$route.query) {
      let query = this.$route.query;
      this.pageConfig = apiConfig[query.flag];
      this.model = { ...this.model, ...query.model };
      this.formOptions = {
        ...this.formOptions,
        ...this.pageConfig.extraOptions
      };
    }
  },
  methods: {
    submit(model, hide) {
      this.pageConfig
        .api(model)
        .then(res => {
          console.log(res);
          this.$router.back();
        })
        .finally(msg => {
          hide();
        });
    },
    search(...args) {
      this.$refs[this.leaseManageForm.ref].getFormModel(res => {
        console.log("搜索", res);
      });
    },
    clearForm() {
      this.$refs[this.leaseManageForm.ref].resetForm();
    },
    getPropertyDetail(row) {
      return leaseManageApi.houseDetails(row);
    },
    back() {
      this.$router.back();
    },
    pass() {},
    reject() {}
  },
  watch: {}
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
