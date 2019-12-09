<template>
  <div class="tenant-manage">
    <div class="condition-box radius-shadow">
      <miForm
        :ref="addTenantManageForm.ref"
        :options="addTenantManageForm"
        v-model="model"
        @submit="submit"
        @reset-change="resetChange"
      >
        <template slot="btn" slot-scope="obj">
          <div>
            <el-button :disabled="obj.disabled" type="primary" @click="search(obj)">保存</el-button>
            <el-button :disabled="obj.disabled" @click="back(obj)">返回</el-button>
          </div>
        </template>
        <template slot="licenseImageText">
          <h3>营业执照/企业经营许可证</h3>
        </template>
        <template slot="otherImageText">
          <h3>其他证明</h3>
        </template>
      </miForm>
    </div>
  </div>
</template>

<script>
import DigitalParkApi from "../../service/api/digitalParkApi";
import miForm from "@/components/Form";
import miTable from "@/components/Table";
export default {
  components: { miForm, miTable },
  //
  data() {
    let validID = (rule, value, callback) => {
      if (value == "" || value == undefined) {
        callback();
      } else {
        let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
        if (!reg.test(value)) {
          callback(new Error("身份证号码不正确"));
        }
      }
    };
    let telephone = (rule, value, callback) => {
      if (value == "" || value == undefined) {
        callback();
      } else {
        let reg = /^1[3|4|5|7|8]\d{9}$/;
        if (!reg.test(value)) {
          callback(new Error("电话号码不正确"));
        }
      }
    };
    
    return {
      model: {
        // tenantNumber: "",
        tenantName: "",
        contactMethod: "",
        idCard: "",
      },
      addTenantManageForm: {
        ref: "addTenantManageForm",
        labelWidth: "100",
        size: "medium",
        menuPosition: "right",
        submitBtn: false,
        emptyBtn: false,
        forms: [
          {
            type: "input",
            label: "租户编号",
            prop: "tenantNumber",
            clearable: true,
            readonly: true,
            // valueDefault: "ZH-1911281000009819",
            span: 6,
            tip: "该编号自动生成",
            rules: {
              required: true,
              message: "如果没有自动生成，请联系管理员",
              trigger: "change"
            }
          },
          {
            type: "input",
            label: "租户名称",
            prop: "tenantName",
            placeholder: "请输入",
            clearable: true,
            span: 6,
            rules: {
              required: true,
              message: "请输入租户名称",
              trigger: "blur"
            }
          },
          {
            prop: "",
            formslot: true,
            span: 12
          },
          {
            type: "input",
            label: "联系方式",
            prop: "contactMethod",
            placeholder: "请输入",
            clearable: true,
            span: 6,
            rules: {
              required: true,
              validator:telephone,
              message: "电话号码不正确",
              trigger: "blur"
            }
          },

          {
            type: "input",
            label: "身份证号",
            prop: "idCard",
            placeholder: "请输入",
            clearable: true,
            span: 6,
            rules: {
              required: true,
              validator:validID,
              message: "身份证号码不正确",
              trigger: "blur"
            }
          },
          {
            prop: "licenseImageText",
            span: 24,
            pull: 6,
            formslot: true
          },
          {
            type: "upload",
            listType: "picture-card",
            label: "",
            prop: "licenseImage",
            span: 24,
            action: "/oaApi/image/upload",
            accept: ["jpg", "jpeg", "png"],
            props: {
              label: "tenantPictureName",
              value: "tenantPictureUrl"
            },
            propsHttp: {
              name: "fileName",
              url: "fileUrl",
              res: "data"
            }
          },
          {
            prop: "otherImageText",
            span: 24,
            pull: 6,
            formslot: true
          },
          {
            type: "upload",
            listType: "picture-card",
            label: "",
            prop: "otherImage",
            span: 24,
            action: "/oaApi/image/upload",
            accept: ["jpg", "jpeg", "png"],
            props: {
              label: "tenantPictureName",
              value: "tenantPictureUrl"
            },
            propsHttp: {
              name: "fileName",
              url: "fileUrl",
              res: "data"
            }
          },
          {
            prop: "btn",
            span: 6,
            pull: 6,
            formslot: true
          }
        ]
      }
    };
  },
  computed: {
    commonParams() {
      return {
        tenantNumber: this.model.tenantNumber,
        tenantName: this.model.tenantName,
        telephone: this.model.contactMethod,
        idCard: this.model.idCard,
        businessLicense: "",
        otherProof: ""
      };
    }
  },
  methods: {
    submit() {},
    resetChange() {},
    async search(...args) {
      this.$refs[this.addTenantManageForm.ref].getFormModel(res => {
        console.log("model", res);
      });
      console.log("搜索", ...args);
      let res = await DigitalParkApi.addTenant(this.commonParams);
      console.log(78788, res);
    },
    back() {
      this.$router.go(-1);
    },
    async addTenant() {
      let res = await DigitalParkApi.addTenant(this.commonParams);
      console.log(78788, res);
    },
    async createTenNum() {
      let res = await DigitalParkApi.createTenNum({
        numType: 2
      });
      this.model.tenantNumber = res;
    }
  },
  mounted() {
    this.createTenNum();
  }
};
</script>

<style lang="less">
.tenant-manage {
  .condition-box {
    margin-bottom: 20px;
    background: @white;
    padding: 20px;
    // background: pink;
  }
  .tenant-manage-table {
    background: @white;
    padding: 20px;
    .operator-box {
      background: @white;
      padding: 10px;
      .el-button {
        margin-left: 20px;
      }
    }
  }
}
</style>