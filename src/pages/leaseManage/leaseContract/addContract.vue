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
          <template slot="rentLine">
            <span
              style="border-top:1px dashed #999;position: absolute;left: -11%;bottom: 0px;width: 111%;"
            ></span>
          </template>
          <template slot="propertyLine">
            <span
              style="border-top:1px dashed #999;position: absolute;left: -11%;bottom: 0px;width: 111%;"
            ></span>
          </template>
          <!-- <template slot="cleaningLine">
            <h3 style="border:1px dashed #333"></h3>
          </template>-->
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
import { LeaseManageDic } from "@/utils/dictionary";
export default {
  name: "AddContract",
  data() {
    let _this = this;
    return {
      model: {
        list: {
          monthPrice: ""
        }
      },
      isShowGroup: true,
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
        group: [
          {
            label: "合同信息",
            prop: "group1",
            display: true,
            arrow: true,
            forms: [
              {
                type: "select",
                label: "选择租户",
                prop: "selectTenant",
                props: {
                  label: "tenantName",
                  value: "index"
                },
                rules: {
                  required: true,
                  message: "选择租户",
                  trigger: "change"
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
                  _this.model.houseNumber = obj.houseNumber;
                  _this.model.spaceName = obj.spaceName;
                  _this.model.houseName = obj.houseName;
                  _this.model.houseArea = obj.houseArea;
                  _this.model.projectName = obj.projectName;
                  // _this.model.housePrice = obj.housePrice;
                  _this.houseId = obj.id;
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
                row: true,
                sapn: 12,
                disabled: true
              },
              // {
              //   type: "input",
              //   label: "价格",
              //   prop: "housePrice",
              //   placeholder: "价格",
              //   clearable: true,
              //   sapn: 12,
              //   disabled: true
              // },
              {
                type: "date",
                label: "签约时间",
                prop: "contractTime",
                valueFormat: "yyyy-MM-dd",
                clearable: true,
                sapn: 12,
                rules: {
                  required: true,
                  message: "请选择开始时间",
                  trigger: "change"
                }
              },
              {
                type: "date",
                label: "到期时间",
                prop: "expireTime",
                valueFormat: "yyyy-MM-dd",
                clearable: true,
                sapn: 12,
                rules: {
                  required: true,
                  message: "请选择到期时间",
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
              }
            ]
          },
          {
            label: "收费约定",
            prop: "group2",
            display: true,
            arrow: true,
            forms: [
              {
                type: "input",
                label: "租金月单价",
                prop: "monthPrice",
                append: "元/月*平米",
                clearable: true,
                dataType: "number",
                sapn: 12,
                rules: {
                  required: true,
                  trigger: "change"
                }
              },
              {
                type: "input",
                label: "合同租金计费月数",
                prop: "billingMonths",
                append: "月",
                dataType: "number",
                clearable: true,
                sapn: 12,
                rules: {
                  required: true,
                  trigger: "change"
                }
              },
              {
                type: "input",
                label: "租金日单价",
                prop: "dayPrice",
                append: "元/月*平米",
                clearable: true,
                dataType: "number",
                sapn: 12,
                rules: {
                  required: true,
                  trigger: "change"
                }
              },
              {
                type: "input",
                label: "合同租金计费日数",
                prop: "billingDays",
                append: "日",
                clearable: true,
                dataType: "number",
                sapn: 12,
                rules: {
                  required: true,
                  trigger: "change"
                }
              },
              {
                type: "select",
                label: "租金付费周期",
                prop: "payCycle",
                clearable: true,
                dicData: LeaseManageDic.PayCycleType,
                sapn: 12,
                rules: {
                  required: true,
                  trigger: "change"
                }
              },
              {
                type: "select",
                label: "租金付费计算方式",
                prop: "payCountWay",
                clearable: true,
                dicData: LeaseManageDic.PayCountWayType,
                sapn: 12,
                rules: {
                  required: true,
                  trigger: "change"
                }
              },
              {
                prop: "rentLine",
                span: 24,
                formslot: true
              },

              {
                type: "input",
                label: "物业费月单价",
                prop: "monthPrice2",
                append: "元/月*平米",
                clearable: true,
                dataType: "number",
                sapn: 12,
                rules: {
                  required: true,
                  trigger: "change"
                }
              },
              {
                type: "input",
                label: "合同物业费计费月数",
                prop: "billingMonths2",
                append: "月",
                clearable: true,
                dataType: "number",
                sapn: 12,
                rules: {
                  required: true,
                  trigger: "change"
                }
              },
              {
                type: "input",
                label: "物业费日单价",
                prop: "dayPrice2",
                append: "元/月*平米",
                clearable: true,
                dataType: "number",
                sapn: 12,
                rules: {
                  required: true,
                  trigger: "change"
                }
              },
              {
                type: "input",
                label: "合同物业费计费日数",
                prop: "billingDays2",
                append: "日",
                clearable: true,
                dataType: "number",
                sapn: 12,
                rules: {
                  required: true,
                  trigger: "change"
                }
              },
              {
                type: "select",
                label: "物业费付费周期",
                prop: "payCycle2",
                clearable: true,
                dicData: LeaseManageDic.PayCycleType,
                sapn: 12,
                rules: {
                  required: true,
                  trigger: "change"
                }
              },
              {
                type: "select",
                label: "物业费付费计算方式",
                prop: "payCountWay2",
                clearable: true,
                dicData: LeaseManageDic.PayCountWayType,
                sapn: 12,
                rules: {
                  required: true,
                  trigger: "change"
                }
              },
              {
                prop: "propertyLine",
                span: 24,
                formslot: true
              },

              {
                type: "input",
                label: "保洁费月单价",
                prop: "monthPrice3",
                append: "元/月*平米",
                clearable: true,
                dataType: "number",
                sapn: 12,
                rules: {
                  required: true,
                  trigger: "change"
                }
              },
              {
                type: "input",
                label: "合同保洁费计费月数",
                prop: "billingMonths3",
                append: "月",
                clearable: true,
                dataType: "number",
                sapn: 12,
                rules: {
                  required: true,
                  trigger: "change"
                }
              },
              {
                type: "input",
                label: "保洁费日单价",
                prop: "dayPrice3",
                append: "元/月*平米",
                clearable: true,
                dataType: "number",
                sapn: 12,
                rules: {
                  required: true,
                  trigger: "change"
                }
              },
              {
                type: "input",
                label: "合同保洁费计费日数",
                prop: "billingDays3",
                append: "日",
                clearable: true,
                dataType: "number",
                sapn: 12,
                rules: {
                  required: true,
                  trigger: "change"
                }
              },
              {
                type: "select",
                label: "保洁费付费周期",
                prop: "payCycle3",
                clearable: true,
                dicData: LeaseManageDic.PayCycleType,
                sapn: 12,
                rules: {
                  required: true,
                  trigger: "change"
                }
              },
              {
                type: "select",
                label: "保洁费付费计算方式",
                prop: "payCountWay3",
                clearable: true,
                dataType: "number",
                dicData: LeaseManageDic.PayCountWayType,
                sapn: 12,
                rules: {
                  required: true,
                  trigger: "change"
                }
              }
            ]
          },

          {
            label: "其他合同信息",
            prop: "group3",
            display: true,
            arrow: true,
            forms: [
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
          }
        ]
      },
      tenantId: "",
      houseId: "",
      cleaningId: "",
      propertyId: "",
      rentId: ""
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
    let extraOptions = this.$route.query.extraOptions;
    extraOptions ? (extraOptions = JSON.parse(extraOptions)) : "";
    this.addContractForm = {
      ...this.addContractForm,
      ...extraOptions
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
      return this.$route.query.editContractId;
    },
    detailContractId() {
      return this.$route.query.detailContractId;
    }
  },
  methods: {
    async submit(model, hide) {
      let apiConfig;
      let params;
      let oaContractDetails = [
        {
          monthPrice: this.model.monthPrice,
          billingMonths: this.model.billingMonths,
          dayPrice: this.model.dayPrice,
          billingDays: this.model.billingDays,
          payCountWay: this.model.payCountWay,
          payCycle: this.model.payCycle,
          costType: 9,
          contractNumber: this.model.contractNumber,
          id: this.rentId
        },
        {
          monthPrice: this.model.monthPrice2,
          billingMonths: this.model.billingMonths2,
          dayPrice: this.model.dayPrice2,
          billingDays: this.model.billingDays2,
          payCountWay: this.model.payCountWay2,
          payCycle: this.model.payCycle2,
          costType: 10,
          contractNumber: this.model.contractNumber,
          id: this.propertyId
        },
        {
          monthPrice: this.model.monthPrice3,
          billingMonths: this.model.billingMonths3,
          dayPrice: this.model.dayPrice3,
          billingDays: this.model.billingDays3,
          payCountWay: this.model.payCountWay3,
          payCycle: this.model.payCycle3,
          costType: 11,
          contractNumber: this.model.contractNumber,
          id: this.cleaningId
        }
      ];
      if (this.editContractId) {
        params = {
          ...this.addContractParams,
          oaContractDetails: oaContractDetails,
          ...{
            contractId: this.editContractId,
            telephone: this.model.telephone
          }
        };
        apiConfig = LeaseManageApi.editContract;
      } else {
        params = {
          ...this.addContractParams,
          oaContractDetails: oaContractDetails
        };
        apiConfig = LeaseManageApi.addContract;
      }
      let res = await apiConfig(params)
        .then(value => {
          this.$router.push("/leaseContract");
        })
        .finally(msg => {
          hide();
        });
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
        this.model = res;
        this.model.selectTenant = res.tenantName;
        this.model.selectHouse = res.houseName;
        this.houseId = res.houseId;
        this.tenantId = res.tenantId;
        if (res.oaContractDetails) {
          res.oaContractDetails.map(item => {
            if (item.costType == 9) {
              this.model.monthPrice = item.monthPrice;
              this.model.billingMonths = item.billingMonths;
              this.model.dayPrice = item.dayPrice;
              this.model.billingDays = item.billingDays;
              this.model.payCountWay = item.payCountWay;
              this.model.payCycle = item.payCycle;
              this.model.contractNumber = item.contractNumber;
              this.rentId = item.id;
            } else if (item.costType == 10) {
              this.model.monthPrice2 = item.monthPrice;
              this.model.billingMonths2 = item.billingMonths;
              this.model.dayPrice2 = item.dayPrice;
              this.model.billingDays2 = item.billingDays;
              this.model.payCycle2 = item.payCycle;
              this.model.payCountWay2 = item.payCountWay;
              this.model.contractNumber2 = item.contractNumber;
              this.propertyId = item.id;
            } else {
              this.model.monthPrice3 = item.monthPrice;
              this.model.billingMonths3 = item.billingMonths;
              this.model.dayPrice3 = item.dayPrice;
              this.model.billingDays3 = item.billingDays;
              this.model.payCountWay3 = item.payCountWay;
              this.model.payCycle3 = item.payCycle;
              this.model.contractNumber3 = item.contractNumber;
              this.cleaningId = item.id;
            }
          });
        }
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