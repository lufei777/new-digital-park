<template>
  <div>
    <div class="form radius-shadow">
      <miForm
        :ref="leaseManageForm.ref"
        :options="leaseManageForm"
        v-model="model"
        @submit="submit"
        @reset-change="resetChange"
      >
        <template slot="zj" slot-scope="obj">
          <div>
            <el-input style="width:75%;" v-model="model.zj" :placeholder="obj.column.placeholder"></el-input>
            <el-select style="width:24% !important;" v-model="model.dw">
              <el-option label="元/天" value="￥/day"></el-option>
              <el-option label="元/月" value="￥/month"></el-option>
            </el-select>
          </div>
        </template>
        <template slot="btn" slot-scope="obj">
          <div>
            <el-button :disabled="obj.disabled" type="primary" @click="search(obj)">搜索</el-button>
            <el-button :disabled="obj.disabled" @click="clearForm(obj)">清除</el-button>
          </div>
        </template>
      </miForm>
    </div>
  </div>
</template>
<script>
const space = [
  {
    id: "group-0a783b6cdb7c49e5a2ca463996597647",
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
        id: "group-45016a1d644f43e3a2a40b9eba91ff1f",
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
            id: "group-8e0b8a2d5f5b4c6ea0cd6c4e0cc73fe1",
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
        id: "group-ee590fea885d4d848d80fa46b3bfac2c",
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
    id: "group-207acaf6dff1408eaa33d0316ce18d38",
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
        id: "group-9d8a3632a77243bbaca7f3607d5e6703",
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
        id: "group-baacbd3341654d2fa6df23a304c178d6",
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
    id: "group-2ec01debd145400a93241a4fe7ff1141",
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
    id: "group-6151b9652c0a4a6bbaacd3f926b65e34",
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
    id: "group-6cfb6d6484a94541a87743b5d9f32080",
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
    id: "group-7ad429c0a563439f9e613a34d5044fd9",
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
    id: "group-a2ab42dba36643cc8909063d6f9641ca",
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
    id: "group-a4316be9c60f48ea817bf223ccdc03dd",
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
        id: "group-3655e87fb17b4522bb44e2470839606c",
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
            id: "group-6bae0e669c874277b7c3d5013a275592",
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
                id: "group-793e284e6e874658872766e16b5deaa2",
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
    id: "group-b902985a668543bb86a33edd371bab74",
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
    id: "group-e4cca11a11cf4466aad4e9b8765994ce",
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
        id: "group-2368946ab299465099fcbf62690d5e6e",
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
            id: "group-755067b4928145f6b391667ea207e989",
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
            id: "group-9b88eeae633b4d10ab05f0270a310063",
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
            id: "group-deb8ce652a9a405b994e219bf1fd9195",
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
            id: "group-eb2ef94e65b1410b8017c2b3cd69c4b7",
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
            id: "group-f21e35788fde4d78880db4f6fed2cee8",
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
        id: "group-450712573eb347b2a6d58a28b3e015cf",
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
        id: "group-5a24ce30ca5f44b08034e22567b62e6f",
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
        id: "group-67374f5706e643f5b800cdafcc529a22",
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
        id: "group-688a461b94ca4c8495a0e4b87a7afb01",
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
        id: "group-907e714c121a441d9f939d9c26175776",
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
            id: "group-4e668abbeaf84a5bb10a575a6dcd7f2c",
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
        id: "group-a0e23c519db14f1ab0e8d9efdd887e2b",
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
        id: "group-b6711341244b4ca2a677fbfa9ebca592",
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
        id: "group-ec30d92610664ab1a5a6892ce2d706b8",
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
        id: "group-f280039cda8d41d5a74cf7baab643532",
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
            id: "group-0540adf4f7c14fbc8c7f30738d7c883b",
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

import miForm from "@/components/Form";

export default {
  components: { miForm },
  data() {
    return {
      model: {},
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
            prop: "space",
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
            prop: "houseStatus",
            dicData: [
              {
                label: "是",
                value: 1
              },
              {
                label: "否",
                value: 0
              }
            ],
            valueDefault: 1,
            clearable: true,
            span: 12
          },
          {
            type: "input",
            rawtype: "number",
            label: "面积",
            dataType: "number",
            prop: "houseArea",
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
            formslot: true,
            rules: {
              required: true,
              message: "必填，请填写总价",
              trigger: "blur"
            }
          },
          {
            type: "input",
            label: "工程名称",
            prop: "gcmc",
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
            prop: "ms",
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
            prop: "wuzp",
            span: 24,
            tip: "只能上传jpg/png文件，且不超过500kb",
            action: "https://jsonplaceholder.typicode.com/posts/",
            propsHttp: {
              res: "data"
            }
            // accept: ["jpg", "png"],
            // filesize: 500
          }
        ]
      }
    };
  },
  mounted() {
    this.model = this.$route.query;
  },
  methods: {
    submit(model, hide) {
      console.log(model);
      hide();
    },
    resetChange() {},
    search(...args) {
      this.$refs[this.leaseManageForm.ref].getFormModel(res => {
        console.log("model", res);
      });
      console.log("搜索", ...args);
    },
    clearForm(...args) {
      console.log("清空", ...args);
      this.$refs[this.leaseManageForm.ref].resetForm();
    }
  }
};
</script>
<style lang='less' scoped>
.form,
.table {
  background-color: @white;
  box-sizing: border-box;
  padding: 20px;
}
.form {
  margin-bottom: 20px;
  padding-bottom: 0;
}
</style>