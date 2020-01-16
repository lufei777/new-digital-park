<template>
  <div class="add-tenant-manage">
    <div class="condition-box radius-shadow">
      <div class="tenant-box">
        <miForm
          :ref="addTenantManageForm.ref"
          :options="addTenantManageForm"
          v-model="model"
          @submit="submit"
          @reset-change="resetChange"
        >
          <!-- <template slot="btn" slot-scope="obj">
            <div>
              <el-button :disabled="obj.disabled" type="primary" @click="search(obj)">保存</el-button>
              <el-button :disabled="obj.disabled" @click="back(obj)">返回</el-button>
            </div>
          </template>-->
          <template slot-scope="scope" slot="menuBtn">
            <el-button :size="scope.size" @click="back(scope)">返回</el-button>
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
  </div>
</template>

<script>
import LeaseManageApi from "../../../service/api/leaseManage";
import miForm from "@/components/Form";
import miTable from "@/components/Table";
export default {
  components: { miForm, miTable },
  //
  data() {
    let validID = (rule, value, callback) => {
      let reg = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的身份证号"));
      }
    };
    let telephone = (rule, value, callback) => {
      let reg = /^1[3|4|5|7|8]\d{9}$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("请输入正确的电话号码"));
      }
    };
    return {
      model: {},
      addTenantManageForm: {
        ref: "addTenantManageForm",
        labelWidth: "150",
        size: "medium",
        menuPosition: "left",
        submitText: "保存",
        // submitBtn: false,
        emptyBtn: false,
        forms: [
          {
            type: "input",
            label: "租户编号",
            prop: "tenantNumber",
            clearable: true,
            readonly: true,
            span: 12,
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
            span: 12,
            rules: {
              required: true,
              message: "请输入租户名称",
              trigger: "blur"
            }
          },
          // {
          //   prop: "",
          //   formslot: true,
          //   span: 12
          // },
          {
            type: "input",
            label: "联系方式",
            prop: "telephone",
            placeholder: "请输入电话号码",
            clearable: true,
            span: 12,
            rules: {
              required: true,
              validator: telephone,
              message: "请输入正确的电话号码",
              trigger: "change"
            }
          },

          {
            type: "input",
            label: "身份证号",
            prop: "idCard",
            placeholder: "请输入身份证号",
            clearable: true,
            span: 12,
            rules: {
              required: true,
              validator: validID,
              message: "请输入正确的身份证号",
              trigger: "change"
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
            prop: "businessLicense",
            dataType: "string",
            limit: 1,
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
            prop: "otherProof",
            span: 24,
            dataType: "string",
            limit: 1,
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
          }
        ]
      }
    };
  },
  computed: {
    // commonParams() {
    //   return {
    //     tenantNumber: this.model.tenantNumber,
    //     tenantName: this.model.tenantName,
    //     telephone: this.model.telephone,
    //     idCard: this.model.idCard,
    //     businessLicense: this.model.businessLicense,
    //     otherProof: this.model.otherProof
    //   };
    // },
    tenantIdEdit() {
      return this.$route.params.tenantId;
    },
    tenantIdDetail() {
      return this.$route.params.tenantId;
    }
  },
  methods: {
    async submit(model, hide) {
      console.log("mdel", model);
      let res;
      let params = {
        ...model,
        ...{
          tenantId: this.tenantIdEdit
        }
      };
      if (this.tenantIdEdit) {
        res = await LeaseManageApi.editTenant(params);
      } else {
        res = await LeaseManageApi.addTenant(model);
      }
      if (res) {
        this.$message({
          type: "success",
          message: res
        });
      }
      this.$router.push("/tenantManage");
    },
    resetChange() {},
    async search(...args) {
      this.$refs[this.addTenantManageForm.ref].getFormModel(res => {
        console.log("model", res);
      });
      console.log("搜索", ...args);
    },
    back() {
      this.$router.push("/tenantManage");
    },
    async createTenNum() {
      let res = await LeaseManageApi.createTenNum({
        numType: 2
      });
      this.model.tenantNumber = res;
    },
    async tenantDetail(tenantIdEdit) {
      let res = await LeaseManageApi.tenantDetail({
        tenantId: tenantIdEdit
      });
      this.model.tenantNumber = res.tenantNumber;
      this.model.tenantName = res.tenantName;
      this.model.telephone = res.telephone;
      this.model.idCard = res.idCard;
      if (res.businessLicense) {
        this.model.businessLicense = res.businessLicense;
      }
      if (res.otherProof) {
        this.model.otherProof = res.otherProof;
      }
    }
  },
  mounted() {
    this.createTenNum();
    if (this.tenantIdEdit) {
      this.tenantDetail(this.tenantIdEdit);
    }
    if (this.tenantIdDetail) {
      this.tenantDetail(this.tenantIdDetail);
    }
  },
  created() {
    this.addTenantManageForm = {
      ...this.addTenantManageForm,
      ...this.$route.params.extraOptions
    };
  }
};
</script>

<style lang="less">
.add-tenant-manage {
  // .tenant-manage-box {
  //   width: 60%;
  // }
  .condition-box {
    margin-bottom: 20px;
    background: @white;
    padding: 20px;
    // background: pink;
    .tenant-box {
      width: 50%;
      margin-top: 20px;
      // background: pink;
      margin-left: 25%;
    }
  }
  .tenant-manage-table {
    background: @white;
    padding: 20px;
    .operator-box {
      background: @white;
      .el-button {
        margin-left: 20px;
      }
    }
  }
}
</style>