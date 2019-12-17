<template>
  <div>
    <div class="form panel">
      <span class="tip frist-tip flex-align">
        <span class="icon"></span>
        <span>{{pageConfig.title}}</span>
      </span>
      <miForm
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
      </miForm>
    </div>
  </div>
</template>
<script>
const space = [
  {
    id: _.uniqueId("id_"),
    name: "IT设备",
    pid: "0",
    level: 0,
    createBy: null,
    createTime: null,
    updateTime: null,
    updateBy: null,
    delFlag: null,
    childNode: [
      {
        id: _.uniqueId("id_"),
        name: "笔记本电脑",
        pid: "group-0a783b6cdb7c49e5a2ca463996597647",
        level: 2,
        createBy: null,
        createTime: null,
        updateTime: null,
        updateBy: null,
        delFlag: null,
        childNode: [
          {
            id: _.uniqueId("id_"),
            name: "新增节点",
            pid: "group-45016a1d644f43e3a2a40b9eba91ff1f",
            level: 3,
            createBy: null,
            createTime: null,
            updateTime: null,
            updateBy: null,
            delFlag: null,
            childNode: []
          }
        ]
      },
      {
        id: _.uniqueId("id_"),
        name: "新增节点",
        pid: "group-0a783b6cdb7c49e5a2ca463996597647",
        level: 2,
        createBy: null,
        createTime: null,
        updateTime: null,
        updateBy: null,
        delFlag: null,
        childNode: []
      }
    ]
  },
  {
    id: _.uniqueId("id_"),
    name: "新增节点",
    pid: "0",
    level: 0,
    createBy: null,
    createTime: null,
    updateTime: null,
    updateBy: null,
    delFlag: null,
    childNode: [
      {
        id: _.uniqueId("id_"),
        name: "新增节点",
        pid: "group-207acaf6dff1408eaa33d0316ce18d38",
        level: 2,
        createBy: null,
        createTime: null,
        updateTime: null,
        updateBy: null,
        delFlag: null,
        childNode: []
      },
      {
        id: _.uniqueId("id_"),
        name: "新增节点",
        pid: "group-207acaf6dff1408eaa33d0316ce18d38",
        level: 2,
        createBy: null,
        createTime: null,
        updateTime: null,
        updateBy: null,
        delFlag: null,
        childNode: []
      }
    ]
  },
  {
    id: _.uniqueId("id_"),
    name: "新增节点",
    pid: "0",
    level: 0,
    createBy: null,
    createTime: null,
    updateTime: null,
    updateBy: null,
    delFlag: null,
    childNode: []
  },
  {
    id: _.uniqueId("id_"),
    name: "新增节点",
    pid: "0",
    level: 0,
    createBy: null,
    createTime: null,
    updateTime: null,
    updateBy: null,
    delFlag: null,
    childNode: []
  },
  {
    id: _.uniqueId("id_"),
    name: "新增节点",
    pid: "0",
    level: 0,
    createBy: null,
    createTime: null,
    updateTime: null,
    updateBy: null,
    delFlag: null,
    childNode: []
  },
  {
    id: _.uniqueId("id_"),
    name: "新增节点",
    pid: "0",
    level: 0,
    createBy: null,
    createTime: null,
    updateTime: null,
    updateBy: null,
    delFlag: null,
    childNode: []
  },
  {
    id: _.uniqueId("id_"),
    name: "新增节点",
    pid: "0",
    level: 0,
    createBy: null,
    createTime: null,
    updateTime: null,
    updateBy: null,
    delFlag: null,
    childNode: []
  },
  {
    id: _.uniqueId("id_"),
    name: "新增节点",
    pid: "0",
    level: 0,
    createBy: null,
    createTime: null,
    updateTime: null,
    updateBy: null,
    delFlag: null,
    childNode: [
      {
        id: _.uniqueId("id_"),
        name: "新增节点",
        pid: "group-a4316be9c60f48ea817bf223ccdc03dd",
        level: 2,
        createBy: null,
        createTime: null,
        updateTime: null,
        updateBy: null,
        delFlag: null,
        childNode: [
          {
            id: _.uniqueId("id_"),
            name: "新增节点",
            pid: "group-3655e87fb17b4522bb44e2470839606c",
            level: 3,
            createBy: null,
            createTime: null,
            updateTime: null,
            updateBy: null,
            delFlag: null,
            childNode: [
              {
                id: _.uniqueId("id_"),
                name: "新增节点",
                pid: "group-6bae0e669c874277b7c3d5013a275592",
                level: 4,
                createBy: null,
                createTime: null,
                updateTime: null,
                updateBy: null,
                delFlag: null,
                childNode: []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: _.uniqueId("id_"),
    name: "新增节点",
    pid: "0",
    level: 0,
    createBy: null,
    createTime: null,
    updateTime: null,
    updateBy: null,
    delFlag: null,
    childNode: []
  },
  {
    id: _.uniqueId("id_"),
    name: "A3大楼",
    pid: "0",
    level: 0,
    createBy: null,
    createTime: null,
    updateTime: null,
    updateBy: null,
    delFlag: null,
    childNode: [
      {
        id: _.uniqueId("id_"),
        name: "一层",
        pid: "group-e4cca11a11cf4466aad4e9b8765994ce",
        level: 1,
        createBy: null,
        createTime: null,
        updateTime: null,
        updateBy: null,
        delFlag: null,
        childNode: [
          {
            id: _.uniqueId("id_"),
            name: "新增节点",
            pid: "group-2368946ab299465099fcbf62690d5e6e",
            level: 3,
            createBy: null,
            createTime: null,
            updateTime: null,
            updateBy: null,
            delFlag: null,
            childNode: []
          },
          {
            id: _.uniqueId("id_"),
            name: "101会议室",
            pid: "group-2368946ab299465099fcbf62690d5e6e",
            level: 2,
            createBy: null,
            createTime: null,
            updateTime: null,
            updateBy: null,
            delFlag: null,
            childNode: []
          },
          {
            id: _.uniqueId("id_"),
            name: "走廊",
            pid: "group-2368946ab299465099fcbf62690d5e6e",
            level: 2,
            createBy: null,
            createTime: null,
            updateTime: null,
            updateBy: null,
            delFlag: null,
            childNode: []
          },
          {
            id: _.uniqueId("id_"),
            name: "厨房",
            pid: "group-2368946ab299465099fcbf62690d5e6e",
            level: 2,
            createBy: null,
            createTime: null,
            updateTime: null,
            updateBy: null,
            delFlag: null,
            childNode: []
          },
          {
            id: _.uniqueId("id_"),
            name: "机房",
            pid: "group-2368946ab299465099fcbf62690d5e6e",
            level: 2,
            createBy: null,
            createTime: null,
            updateTime: null,
            updateBy: null,
            delFlag: null,
            childNode: []
          }
        ]
      },
      {
        id: _.uniqueId("id_"),
        name: "test",
        pid: "group-e4cca11a11cf4466aad4e9b8765994ce",
        level: null,
        createBy: null,
        createTime: null,
        updateTime: null,
        updateBy: null,
        delFlag: null,
        childNode: []
      },
      {
        id: _.uniqueId("id_"),
        name: "三层",
        pid: "group-e4cca11a11cf4466aad4e9b8765994ce",
        level: 1,
        createBy: null,
        createTime: null,
        updateTime: null,
        updateBy: null,
        delFlag: null,
        childNode: []
      },
      {
        id: _.uniqueId("id_"),
        name: "七层",
        pid: "group-e4cca11a11cf4466aad4e9b8765994ce",
        level: 1,
        createBy: null,
        createTime: null,
        updateTime: null,
        updateBy: null,
        delFlag: null,
        childNode: []
      },
      {
        id: _.uniqueId("id_"),
        name: "四层",
        pid: "group-e4cca11a11cf4466aad4e9b8765994ce",
        level: 1,
        createBy: null,
        createTime: null,
        updateTime: null,
        updateBy: null,
        delFlag: null,
        childNode: []
      },
      {
        id: _.uniqueId("id_"),
        name: "二层",
        pid: "group-e4cca11a11cf4466aad4e9b8765994ce",
        level: 1,
        createBy: null,
        createTime: null,
        updateTime: null,
        updateBy: null,
        delFlag: null,
        childNode: [
          {
            id: _.uniqueId("id_"),
            name: "新增节点",
            pid: "group-907e714c121a441d9f939d9c26175776",
            level: 3,
            createBy: null,
            createTime: null,
            updateTime: null,
            updateBy: null,
            delFlag: null,
            childNode: []
          }
        ]
      },
      {
        id: _.uniqueId("id_"),
        name: "五层",
        pid: "group-e4cca11a11cf4466aad4e9b8765994ce",
        level: 1,
        createBy: null,
        createTime: null,
        updateTime: null,
        updateBy: null,
        delFlag: null,
        childNode: []
      },
      {
        id: _.uniqueId("id_"),
        name: "八层",
        pid: "group-e4cca11a11cf4466aad4e9b8765994ce",
        level: 1,
        createBy: null,
        createTime: null,
        updateTime: null,
        updateBy: null,
        delFlag: null,
        childNode: []
      },
      {
        id: _.uniqueId("id_"),
        name: "六层",
        pid: "group-e4cca11a11cf4466aad4e9b8765994ce",
        level: 1,
        createBy: null,
        createTime: null,
        updateTime: null,
        updateBy: null,
        delFlag: null,
        childNode: []
      },
      {
        id: _.uniqueId("id_"),
        name: "test2",
        pid: "group-e4cca11a11cf4466aad4e9b8765994ce",
        level: 2,
        createBy: null,
        createTime: null,
        updateTime: null,
        updateBy: null,
        delFlag: null,
        childNode: [
          {
            id: _.uniqueId("id_"),
            name: "新增节点",
            pid: "group-f280039cda8d41d5a74cf7baab643532",
            level: 3,
            createBy: null,
            createTime: null,
            updateTime: null,
            updateBy: null,
            delFlag: null,
            childNode: []
          }
        ]
      }
    ]
  }
];

import { LeaseManageDic } from "@/utils/dic/leaseManage";
import miForm from "@/components/Form";
import leaseManageApi from "@/service/api/leaseManageApi";

const apiConfig = {
  add: {
    title: "新增房产",
    api: leaseManageApi.addHouse
  },
  edit: {
    title: "编辑房产",
    api: leaseManageApi.editHouse
  }
};

export default {
  components: { miForm },
  data() {
    return {
      model: {
        priceType: LeaseManageDic.PriceType[0].value
      },
      leaseManageForm: {
        ref: "leaseManageForm",
        labelWidth: "100",
        size: "small",
        menuPosition: "right",
        submitText: "保存",
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
            dicData: space,
            props: {
              label: "name",
              value: "id",
              children: "childNode"
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
            rawtype: "number",
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
              trigger: "blur"
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
              trigger: "blur"
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
    if (this.$route.query || this.$route.params) {
      let params = this.$route.params;
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
      }
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
    back() {
      this.$router.back();
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