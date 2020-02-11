<template>
  <div class="add-contract panel-container">
    <div class="condition-box panel">
      <div class="add-contract-box">
        <z-form
          :ref="addContractForm.ref"
          :options="addContractForm"
          v-model="model"
          @submit="submit"
          @reset-change="resetChange"
        >
          <template slot="licenseImageText">
            <h3>营业执照/企业经营许可证</h3>
          </template>
          <template slot="otherImageText">
            <h3>其他证明</h3>
          </template>
          <template slot-scope="scope" slot="menuBtn">
            <el-button :size="scope.size" @click="back(scope)">返回</el-button>
          </template>
        </z-form>
      </div>
    </div>
  </div>
</template>

<script>
import LeaseManageApi from "../../../service/api/leaseManage";
export default {
  name: "AddContract",
  data() {
    let _this = this;
    return {
      model: {
        // selectTenant: 0,
        // selectHouse: 0
      },
      addContractForm: {
        ref: "addContractForm",
        labelWidth: "200",
        size: "medium",
        menuPosition: "left",
        submitText: "保存",
        // submitBtn: false,
        emptyBtn: false,
        rules: {
          required: true,
          message: "请选择开始时间",
          trigger: "change"
        },
        forms: [
          {
            type: "select",
            label: "选择租户",
            prop: "selectTenant",
            props: {
              label: "tenantName",
              value: "index"
            },
            placeholder: "请选择租户",
            clearable: true,
            sapn: 12,
            row: true,
            change: function(value) {
              let obj = value.column.dicData[value.value];
              _this.model.tenantNumber = obj.tenantNumber;
              _this.model.tenantName = obj.tenantName;
              _this.model.telephone = obj.telephone;
              _this.model.idCard = obj.idCard;
              _this.tenantId = obj.tenantId;
              console.log("tenantId", obj.tenantId);
            }
          },
          {
            type: "input",
            label: "租户编号",
            prop: "tenantNumber",
            placeholder: "租户编号",
            clearable: true,
            sapn: 12,
            disabled: true
          },
          {
            type: "input",
            label: "租户名称",
            prop: "tenantName",
            placeholder: "租户名称",
            clearable: true,
            sapn: 12
          },
          {
            type: "input",
            label: "联系方式",
            prop: "telephone",
            placeholder: "联系方式",
            clearable: true,
            sapn: 8,
            disabled: true
          },
          {
            type: "input",
            label: "身份证号",
            prop: "idCard",
            placeholder: "身份证号",
            clearable: true,
            sapn: 12
          },
          {
            type: "select",
            label: "选择房产",
            prop: "selectHouse",
            props: {
              label: "houseName",
              value: "index"
            },
            rules: {
              required: true,
              message: "请选择房产",
              trigger: "change"
            },
            placeholder: "请选择房产",
            clearable: true,
            sapn: 12,
            row: true,
            change: function(value) {
              let obj = value.column.dicData[value.value];
              // console.log("obj",obj)
              _this.model.houseNumber = obj.houseNumber;
              _this.model.spaceName = obj.spaceName;
              _this.model.houseName = obj.houseName;
              _this.model.houseArea = obj.houseArea;
              _this.model.projectName = obj.projectName;
              _this.model.housePrice = obj.housePrice;
              _this.houseId = obj.houseId;
              console.log("houseId", obj.houseId);
            }
          },
          {
            type: "input",
            label: "房产编号",
            prop: "houseNumber",
            placeholder: "房产编号",
            clearable: true,
            sapn: 12,
            disabled: true
          },
          {
            type: "input",
            label: "空间位置",
            prop: "spaceName",
            placeholder: "空间位置",
            clearable: true,
            sapn: 12,
            disabled: true
          },
          {
            type: "input",
            label: "房产名称",
            prop: "houseName",
            placeholder: "房产名称",
            clearable: true,
            sapn: 12,
            disabled: true
          },
          {
            type: "input",
            label: "面积",
            prop: "houseArea",
            placeholder: "面积",
            clearable: true,
            sapn: 12,
            disabled: true
          },
          {
            type: "input",
            label: "工程名称",
            prop: "projectName",
            placeholder: "工程名称",
            clearable: true,
            sapn: 12,
            disabled: true
          },
          {
            type: "input",
            label: "价格",
            prop: "housePrice",
            placeholder: "价格",
            clearable: true,
            sapn: 12,
            disabled: true
          },
          {
            type: "datetime",
            label: "签约时间",
            prop: "contractTime",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            placeholder: "选择日期时间",
            clearable: true,
            sapn: 12,
            rules: {
              required: true,
              message: "请选择开始时间",
              trigger: "change"
            }
          },
          {
            type: "datetime",
            label: "到期时间",
            prop: "expireTime",
            valueFormat: "yyyy-MM-dd HH:mm:ss",
            placeholder: "选择日期时间",
            clearable: true,
            sapn: 12,
            rules: {
              required: true,
              message: "请选择开始时间",
              trigger: "change"
            }
          },
          {
            type: "input",
            label: "合同编号",
            prop: "contractNumber",
            placeholder: "请输入合同编号",
            clearable: true,
            sapn: 12,
            rules: {
              required: true,
              message: "请输入合同编号",
              trigger: "change"
            }
          },
          {
            type: "input",
            label: "合同名称",
            prop: "contractName",
            placeholder: "请输入合同名称",
            clearable: true,
            sapn: 12,
            rules: {
              required: true,
              message: "请输入合同名称",
              trigger: "change"
            }
          },
          {
            // label:"营业执照/企业经营许可证",
            prop: "licenseImageText",
            span: 24,
            // pull: 6,
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
            formslot: true
          },
          {
            type: "upload",
            listType: "picture-card",
            label: "",
            prop: "contractFile",
            span: 24,
            dataType: "string",
            limit: 1,
            action: "/oaApi/image/upload",
            accept: ["jpg", "jpeg", "png"],
            props: {
              label: "contractPictureName",
              value: "contractPictureUrl"
            },
            propsHttp: {
              name: "fileName",
              url: "fileUrl",
              res: "data"
            }
          }
        ]
      },
      tenantId: "",
      houseId: ""
    };
  },
  mounted() {
    this.tenantList();
    this.houseList();
    this.createTenNum();
    if (this.detailContractId || this.editContractId) {
      this.contractDetail();
    }
    if (this.editContractId) {
      this.$refs[this.addContractForm.ref].setColumnByProp("selectTenant", {
        display: false
      });
      this.$refs[this.addContractForm.ref].setColumnByProp("tenantName", {
        disabled: true
      });
      this.$refs[this.addContractForm.ref].setColumnByProp("telephone", {
        disabled: false
      });
      this.$refs[this.addContractForm.ref].setColumnByProp("selectHouse", {
        display: false
      });
      this.$refs[this.addContractForm.ref].setColumnByProp("contractTime", {
        disabled: true
      });
      this.$refs[this.addContractForm.ref].setColumnByProp("expireTime", {
        disabled: true
      });
    }
  },
  created() {
    this.addContractForm = {
      ...this.addContractForm,
      ...this.$route.params.extraOptions
    };
  },
  computed: {
    addContractParams() {
      return {
        contractNumber: this.model.contractNumber,
        contractName: this.model.contractName,
        tenantId: this.tenantId,
        houseId: this.houseId,
        contractTime: this.model.contractTime,
        expireTime: this.model.expireTime,
        idCard: this.model.idCard,
        businessLicense:
          this.model.businessLicense.length > 0
            ? this.model.businessLicense
            : "",
        contractFile:
          this.model.contractFile.length > 0 ? this.model.businessLicense : ""
      };
    },
    editContractId() {
      return this.$route.params.editContractId;
    },
    detailContractId() {
      return this.$route.params.detailContractId;
    }
  },
  methods: {
    async submit() {
      let res;
      if (this.editContractId) {
        let params = {
          ...this.addContractParams,
          ...{
            contractId: this.editContractId,
            telephone: this.model.telephone
          }
        };
        res = await LeaseManageApi.editContract(params);
      } else {
        res = await LeaseManageApi.addContract(this.addContractParams);
      }
      if (res) {
        this.$message({
          type: "success",
          message: res
        });
      }
      this.$router.push("/leaseContract");
    },
    async editContract() {
      if (res) {
        this.$message({
          type: "success",
          message: res
        });
      }
      this.$router.push("/leaseContract");
    },
    back() {
      this.$router.push("/leaseContract");
    },
    async createTenNum() {
      let res = await LeaseManageApi.createTenNum({
        numType: 3
      });
      this.model.contractNumber = res;
    },
    resetChange() {},
    async tenantList() {
      let res = await LeaseManageApi.tenantList();
      res.map((item, index) => {
        item.index = index;
      });
      this.$refs[this.addContractForm.ref].setColumnByProp("selectTenant", {
        dicData: res
      });
    },
    async houseList() {
      let res = await LeaseManageApi.getHouseList();
      res.map((item, index) => {
        item.index = index;
      });
      this.$refs[this.addContractForm.ref].setColumnByProp("selectHouse", {
        dicData: res
      });
    },
    async contractDetail() {
      let contractId;
      if (this.detailContractId) {
        contractId = this.detailContractId;
      } else {
        contractId = this.editContractId;
      }
      let res = await LeaseManageApi.contractDetail({
        contractId: contractId
      });
      if (res) {
        console.log("res", res);
        this.model = res;
        this.model.selectTenant = res.tenantName;
        this.model.selectHouse = res.houseName;
        this.houseId = res.houseId;
        this.tenantId = res.tenantId;
      }
    }
  }
};
</script>

<style lang="less">
.add-contract {
  width: 100%;
  .condition-box {
    .add-contract-box {
      //   margin: 0 auto;
      width: 70%;
      //   background: pink;
    }
  }
}
</style>