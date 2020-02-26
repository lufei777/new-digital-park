<template>
  <div>
    <div class="form panel">
      <span class="tip frist-tip flex-align">
        <span class="icon"></span>
        <span>{{pageConfig.title}}</span>
      </span>
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
        <template slot="btn" slot-scope="obj">
          <div>
            <el-button :disabled="obj.disabled" type="primary" @click="search(obj)">搜索</el-button>
            <el-button :disabled="obj.disabled" @click="clearForm(obj)">清除</el-button>
          </div>
        </template>
        <template slot="menuBtn" slot-scope="scope">
          <el-button @click="back(scope)">返回</el-button>
        </template>
      </z-form>
    </div>
  </div>
</template>
<script>
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
      disabled: true,
      submitBtn: false
    }
  }
};

export default {
  data() {
    let _this = this;
    return {
      model: {
        priceType: LeaseManageDic.PriceType[0].value
      },
      leaseManageForm: {
        ref: "leaseManageForm",
        labelWidth: "100",
        size: "small",
        menuPosition: "right",
        emptyBtn: false,
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
              message: "请选择空间位置",
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
            rules: {
              required: true,
              message: "必填",
              trigger: "change"
            }
          },
          {
            type: "input",
            label: "总价",
            prop: "housePrice",
            clearable: true,
            span: 12,
            appendslot: "housepriceappend",
            rules: {
              required: true,
              message: "必填，请填写总价",
              trigger: "blur"
            }
          },
          {
            type: "input",
            label: "工程名称",
            prop: "projectName",
            clearable: true,
            span: 12,
            row: true,
            rules: {
              required: true,
              message: "必填",
              trigger: "change"
            }
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
    console.log(this.$route.query);
    if (this.$route.query || this.$route.params) {
      let { id, flag } = this.$route.query;
      if (id) {
        this.pageConfig = _.cloneDeep(apiConfig[flag]);
        this.getPropertyDetail({ id }).then(res => {
          this.model = { ...this.model, ...res };
        });
      }
      // 传递过来额外的配置
      this.leaseManageForm = {
        ...this.leaseManageForm,
        ...this.pageConfig.extraOptions
      };

      /* let params = this.$route.params;
      // 传递过来的数据
      if (!_.isEmpty(params.model)) {
        this.pageConfig = _.cloneDeep(apiConfig.edit);
        this.model = { ...this.model, ...params.model };
      }
      // 传递过来额外的配置
      this.leaseManageForm = {
        ...this.leaseManageForm,
        ...params.extraOptions
      };
      // 如果有disabled属性，则为查看详情
      if (this.leaseManageForm.disabled) {
        this.pageConfig.title = "房产详情";
      } */
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
    getPropertyDetail(row) {
      return leaseManageApi.houseDetails(row);
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
          rules: {
            required: true,
            message: "必填，请填写总价",
            trigger: "blur"
          }
        });
      }
    }
  }
};
</script>
<style lang='less' scoped>
.form {
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
