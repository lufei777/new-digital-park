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
            placeholder: "请输入",
            clearable: true,
            sapn: 12,
            row: true,
            change: function(value) {
              let obj = value.column.dicData[value.value];
              console.log("hahhah", obj);
              _this.model.tenantNumber = obj.tenantNumber;
              _this.model.tenantName = obj.tenantName;
              _this.model.telephone = obj.telephone;
              _this.model.idCard = obj.idCard;
              _this.tenantId = obj.tenantId;
            }
          },
          {
            type: "input",
            label: "租户编号",
            prop: "tenantNumber",
            placeholder: "请输入",
            clearable: true,
            sapn: 12,
            disabled: true
          },
          {
            type: "input",
            label: "租户名称",
            prop: "tenantName",
            placeholder: "请输入",
            clearable: true,
            sapn: 12
          },
          {
            type: "input",
            label: "联系方式",
            prop: "telephone",
            placeholder: "请输入",
            clearable: true,
            sapn: 8,
            disabled: true
          },
          {
            type: "input",
            label: "身份证号",
            prop: "idCard",
            placeholder: "请输入",
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
            placeholder: "请输入",
            clearable: true,
            sapn: 12,
            row: true,
            change: function(value) {
              let obj = value.column.dicData[value.value];
              console.log("obj",obj)
              _this.model.houseNumber = obj.houseNumber;
              _this.model.spacePosition = obj.spaceName;
              _this.model.houseName = obj.houseName;
              _this.model.area = obj.houseArea;
              _this.model.projectName = obj.idCard;
              _this.model.price = obj.housePrice;
              _this.houseId = obj.houseId;
            }
          },
          {
            type: "input",
            label: "房产编号",
            prop: "houseNumber",
            placeholder: "请输入",
            clearable: true,
            sapn: 12,
            disabled: true
          },
          {
            type: "input",
            label: "空间位置",
            prop: "spacePosition",
            placeholder: "请输入",
            clearable: true,
            sapn: 12,
            disabled: true
          },
          {
            type: "input",
            label: "房产名称",
            prop: "houseName",
            placeholder: "请输入",
            clearable: true,
            sapn: 12,
            disabled: true
          },
          {
            type: "input",
            label: "面积",
            prop: "area",
            placeholder: "请输入",
            clearable: true,
            sapn: 12,
            disabled: true
          },
          {
            type: "input",
            label: "工程名称",
            prop: "projectName",
            placeholder: "请输入",
            clearable: true,
            sapn: 12,
            disabled: true
          },
          {
            type: "input",
            label: "价格",
            prop: "price",
            placeholder: "请输入",
            clearable: true,
            sapn: 12,
            disabled: true
          },
          {
            type: "datetime",
            label: "签约时间",
            prop: "startTime",
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
            placeholder: "请输入",
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
            placeholder: "请输入",
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
    this.contractList();
    this.houseList();
    this.createTenNum()
    if(this.contractIdDetail){
      this.contractDetail()
    }
  },
  computed: {
    addContractParams() {
      return {
        contractNumber: this.model.contractNumber,
        contractName: this.model.contractName,
        tenantId: this.tenantId,
        houseId: this.houseId,
        contractTime: this.model.startTime,
        expireTime: this.model.expireTime,
        businessLicense: this.model.businessLicense.length>0?this.model.businessLicense:"",
        contractFile: this.model.contractFile.length>0?this.model.businessLicense:""
      };
    },
    contractIdEdit() {
      return this.$route.params.contractId;
    },
    contractIdDetail() {
      return this.$route.params.contractId;
    }
  },
  methods: {
    async submit() {
      let res = await LeaseManageApi.addContract(this.addContractParams)
       if (res) {
        this.$message({
          type: "success",
          message: res
        });
      }
      this.$router.push("/leaseContract");
    },
    back(){
      this.$router.push("/leaseContract");
    },
     async createTenNum() {
      let res = await LeaseManageApi.createTenNum({
        numType: 3
      });
      this.model.contractNumber = res;
    },
    resetChange() {},
    async contractList() {
      let res = await LeaseManageApi.tenantList();
       console.log("res",res)
      res.map((item, index) => {
        item.index = index;
        console.log(item);
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
    async contractDetail(){
      let res = await LeaseManageApi.contractDetail({
        contractId:this.contractIdDetail
      })
    },
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