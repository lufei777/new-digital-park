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
  data() {
    return {
      model: {
        // tenantNumber: "",
        tenantName: "",
        contactMethod: "",
        contactIdNumber: "",
        licenseDialogImageUrl: "",
        licenseDialogVisible: false,
        otherDialogVisible:false,
        otherDialogImageUrl:""
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
            span: 6
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
            span: 6
          },

          {
            type: "input",
            label: "身份证号",
            prop: "contactIdNumber",
            placeholder: "请输入",
            clearable: true,
            span: 6
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
            action: "https://jsonplaceholder.typicode.com/posts/",
            propsHttp: {
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
            action: "https://jsonplaceholder.typicode.com/posts/",
            propsHttp: {
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
  computed:{
    commonParams() {
      return {
        tenantNumber:this.tenantNumber,
        tenantName:this.tenantName,
        telephone:this.contactMethod,
        idCard:this.contactIdNumber,
        businessLicense:'',
        otherProof:''
      }
    }
  },
  methods: {
    licenseHandleRemove(file, fileList) {
      // debugger
      console.log(file, fileList);
    },
    licenseHandlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submit() {},
    resetChange() {},
    search(...args) {
      this.$refs[this.addTenantManageForm.ref].getFormModel(res => {
        console.log("model", res);
      });
      console.log("搜索", ...args);
    },
    back() {
      this.$router.go(-1)
    },
    async addTenant() {
      let res = await DigitalParkApi.addTenant(this.commonParams)
      console.log(78788,res)
    },
    async createTenNum(){
      let res = await DigitalParkApi.createTenNum({
        numType:2
      })
      this.model.tenantNumber = res
    }
  },
  mounted() {
    this.createTenNum()
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