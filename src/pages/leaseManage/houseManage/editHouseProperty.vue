<template>
  <div>
    <div class="panel">
      <span class="tip frist-tip flex-align">
        <span class="icon"></span>
        <span>{{pageConfig.title}}</span>
      </span>
      <div v-loading="pageLoading" class="form">
        <z-form
          :ref="leaseManageForm.ref"
          :options="leaseManageForm"
          v-model="model"
          @submit="submit"
        >
          <template slot="housepriceappend" slot-scope="obj">
            <el-select
              :disabled="obj.disabled"
              class="empty-icon"
              style="width:80px !important;"
              v-model="model.priceType"
            >
              <template v-for="item in LeaseManageDic.PriceType">
                <el-option :key="item.label" :label="item.label" :value="item.value"></el-option>
              </template>
            </el-select>
          </template>
          <template slot="menuBtn" slot-scope="scope">
            <el-button @click="back(scope)">返回</el-button>
          </template>
        </z-form>
      </div>
    </div>
  </div>
</template>
<script>
import { validateSpecialWord } from 'utils/validate.js';
import { LeaseManageDic } from "@/utils/dictionary";
import leaseManageApi from "@/service/api/leaseManage";
import commonApi from "@/service/api/common";

const apiConfig = {
  add: {
    title: "新增房产",
    api: leaseManageApi.addHouse
  },
  edit: {
    title: "编辑房产",
    api: leaseManageApi.editHouse
  },
  detail: {
    title: "查看房产",
    extraOptions: {
      textMode: true,
      submitBtn: false
    }
  }
};

export default {
  data() {
    return {
      pageLoading: false,
      model: {
        priceType: LeaseManageDic.PriceType[0].value
      },
      leaseManageForm: {
        ref: "leaseManageForm",
        labelWidth: "100",
        menuPosition: "right",
        emptyBtn: false,
        width: "70%",
        forms: [
          {
            type: "input",
            prop: "houseId",
            readonly: true,
            display: false
          },
          {
            type: "input",
            label: "房产编号",
            prop: "houseNumber",
            readonly: true,
            clearable: true,
            valueDefault: "FC-19112810000001",
            span: 12,
            tip: "该编号自动生成",
            rules: {
              required: true,
              message: "如果没有自动生成，请联系管理员",
              trigger: "change"
            }
          },
          {
            type: "tree",
            label: "空间位置",
            prop: "spaceId",
            clearable: true,
            span: 12,
            props: {
              label: "floor",
              value: "floorId",
              children: "nodes"
            },
            rules: {
              required: true,
              trigger: "change"
            }
          },
          {
            type: "radio",
            label: "是否可出租",
            prop: "isRent",
            dicData: LeaseManageDic.isRent,
            valueDefault: 1,
            clearable: true,
            span: 12
          },
          {
            type: "input",
            label: "面积",
            prop: "houseArea",
            // rawtype: "number",
            dataType: "number",
            append: "m²",
            clearable: true,
            span: 12
          },
          {
            type: "input",
            label: "房产名称",
            prop: "houseName",
            clearable: true,
            span: 12,
            rules: [
              {
                required: true,
                trigger: "change"
              },
              {
                validator: validateSpecialWord,
                trigger: "change"
              }
            ]
          },
          {
            type: "input",
            label: "总价",
            prop: "housePrice",
            dataType: "number",
            clearable: true,
            span: 12,
            appendSlot: "housepriceappend",
            rules: [
              {
                required: true,
                trigger: "change"
              }
            ]
          },
          {
            type: "input",
            label: "工程名称",
            prop: "projectName",
            clearable: true,
            span: 12,
            row: true,
            rules: [
              {
                required: true,
                trigger: "change"
              },
              {
                validator: validateSpecialWord,
                trigger: "change"
              }
            ]
          },
          {
            type: "textarea",
            label: "描述",
            prop: "description",
            clearable: true,
            span: 12,
            maxlength: 255,
            minRows: 8,
            showWordLimit: true
          },
          {
            type: "upload",
            listType: "picture-card",
            label: "房屋照片",
            prop: "housePictureVOList",
            span: 24,
            tip: "只能上传jpg/png文件。",
            action: "/oaApi/image/upload",
            accept: ["jpg", "jpeg", "png"],
            props: {
              label: "housePictureName",
              value: "housePictureUrl"
            },
            propsHttp: {
              name: "fileName",
              url: "fileUrl",
              res: "data"
            }
          }
        ]
      },
      LeaseManageDic,
      pageConfig: apiConfig.add
    };
  },
  created() {
    if (Object.keys(this.$route.query).length !== 0) {
      let { id, flag } = this.$route.query;
      if (id) {
        this.pageConfig = _.cloneDeep(apiConfig[flag]);
        this.getPropertyDetail(id);
      }
      // 传递过来额外的配置
      this.leaseManageForm = {
        ...this.leaseManageForm,
        ...this.pageConfig.extraOptions
      };
    }
    // 空间
    commonApi.getAllFloorOfA3().then(res => {
      // this.leaseManageForm.forms[2].dicData = res;
      this.$refs[this.leaseManageForm.ref].setColumnByProp("spaceId", {
        dicData: res
      });
    });
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
    back() {
      this.$router.back();
    },
    getPropertyDetail(id) {
      this.pageLoading = true;
      leaseManageApi
        .houseDetails({ id })
        .then(res => {
          this.model = { ...this.model, ...res };
        })
        .finally(() => {
          this.pageLoading = false;
        });
    }
  },
  watch: {
    "model.isRent"(newVal, oldVal) {
      if (newVal === LeaseManageDic.isRent[1].value) {
        this.$refs[this.leaseManageForm.ref].setColumnByProp("housePrice", {
          rules: []
        });
      } else {
        this.$refs[this.leaseManageForm.ref].setColumnByProp("housePrice", {
          rules: [
            {
              required: true,
              trigger: "change"
            }
          ]
        });
      }
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
