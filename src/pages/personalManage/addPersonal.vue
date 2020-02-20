<template>
  <div id="personal-manage" class="panel-container">
    <div class="panel">
      <el-tabs v-if="pageConfig.flag === 'edit'" type="border-card" @tab-click="tabClick">
        <template v-for="item in tabPanelOptions">
          <el-tab-pane :key="item.label" :label="item.label" :name="item.name"></el-tab-pane>
        </template>
      </el-tabs>

      <div class="flex-align-center" style="align-items:flex-start;background:#fff;">
        <z-form :ref="options.ref" :options="options" v-model="model" @submit="submit">
          <template slot="menuBtn" slot-scope="scope">
            <!-- <el-button @click="lastStep">上一步</el-button>
            <el-button @click="nextStep">下一步</el-button>-->
            <el-button v-if="pageConfig.flag === 'edit'" type="primary" @click="editCurrent(scope)">{{options.disabled ? '编辑' :'取消'}}</el-button>
            <el-button @click="backList(scope)">返回</el-button>
          </template>
        </z-form>
      </div>
    </div>
  </div>
</template>
<script>
import { CommonDic, PersonalManageDic, BooleanDic } from "@/utils/dictionary";
import SystemManageApi from "@/service/api/systemManage";
import PersonalManageApi from "@/service/api/personalManage";
const apiConfig = {
  add: {
    flag: "add",
    title: "新增人员"
  },
  edit: {
    flag: "edit",
    title: "编辑人员"
  }
};
// tabPanelOptions 和 options.group的顺序要一致
// tabPanelOptions每项的name要和api对应
export default {
  data() {
    return {
      model: {},
      options: {
        ref: "form",
        labelWidth: "100",
        width: "60%",
        size: "small",
        group: [
          {
            icon: "el-icon-user-solid",
            label: "基本信息",
            prop: "group1",
            display: true,
            forms: [
              {
                label: "用户id",
                prop: "id",
                hide: true
              },
              {
                label: "工号",
                prop: "jobNumber",
                type: "input",
                hide: true,
                tip: "自动生成"
              },
              {
                label: "姓名",
                prop: "fullName",
                type: "input",
                rules: {
                  required: true,
                  trigger: "blur"
                }
              },
              {
                label: "性别",
                prop: "sex",
                type: "select",
                rules: {
                  required: true,
                  trigger: "blur"
                },
                dicData: CommonDic.sexDic
              },
              /* {
                label: "年龄",
                prop: "age",
                type: "input",
                dataType: "number",
                span: 8
              }, */
              {
                label: "所在部门",
                prop: "orgName",
                type: "input",
                /* type: "cascader",
                showAllLevels: false,
                dicUrl: SystemManageApi.getDepartmentTree,
                props: {
                  label: "name",
                  value: "id",
                  children: "childNode"
                }, */
                rules: {
                  required: true,
                  trigger: "blur"
                }
              },
              {
                label: "所在岗位",
                prop: "position",
                type: "input",
                rules: {
                  required: true
                }
              },
              {
                label: "岗位级别",
                prop: "level",
                type: "input",
                rules: {
                  required: true
                }
              },
              {
                label: "直接上级",
                prop: "superior",
                type: "input",
                /* type: "cascader",
                props: {
                  label: "name",
                  value: "id",
                  children: "childNode",
                  lazy: true,
                  lazyLoad: async function(node, resolve) {
                    const { level, data } = node;
                    let nodes = [];
                    if (level == 0) {
                      SystemManageApi.getDepartmentTree().then(res => {
                        resolve(res[0].childNode);
                      });
                      // resolve(nodes);
                    } else if (level === 2) {
                      SystemManageApi.listBy({
                        deptId: node.data.id
                      }).then(res => {
                        res.map(item => {
                          item.name = item.fullName;
                          item.leaf = true;
                        });

                        resolve(res);
                      });
                    }
                    resolve([]);
                  }
                }, */
                rules: {
                  required: true,
                  trigger: "blur"
                }
              },
              {
                label: "员工状态",
                prop: "status",
                type: "select",
                rules: {
                  required: true
                },
                dicData: PersonalManageDic.employeeStatus
              },
              {
                label: "员工类型",
                prop: "type",
                type: "select",
                rules: {
                  required: true
                },
                dicData: PersonalManageDic.employeeType
              },
              {
                label: "出生日期",
                prop: "birthday",
                type: "date",
                rules: {
                  required: true,
                  trigger: "blur"
                },
                valueFormat: "yyyy-MM-dd"
              },
              {
                label: "入职时间",
                prop: "entryDate",
                type: "date",
                valueFormat: "yyyy-MM-dd"
              },
              {
                label: "转正时间",
                prop: "correctionDate",
                type: "date",
                valueFormat: "yyyy-MM-dd"
              },
              {
                width: 150,
                label: "初次参加工作时间",
                prop: "workDate",
                type: "date",
                valueFormat: "yyyy-MM-dd"
              },
              {
                label: "办公电话",
                prop: "officePhone",
                type: "input"
              },
              {
                label: "移动电话",
                prop: "telePhone",
                type: "input"
              },
              {
                label: "工作邮箱",
                prop: "officeEmail",
                type: "input"
              },
              {
                label: "个人邮箱",
                prop: "email",
                type: "input"
              },
              {
                label: "办公地点",
                prop: "officeAddress",
                type: "input",
                rules: {
                  required: true
                }
              },
              {
                label: "照片",
                prop: "pictureUrl",
                type: "upload",
                listType: "picture-img",
                span: 24,
                action: "/oaApi/image/upload",
                accept: ["jpg", "jpeg", "png"],
                propsHttp: {
                  name: "fileName",
                  url: "fileUrl",
                  res: "data"
                }
              },
              {
                label: "专长",
                prop: "expertise",
                type: "textarea",
                span: 24
              },
              {
                label: "爱好",
                prop: "hobby",
                type: "textarea",
                span: 24
              }
            ]
          },
          {
            icon: "el-icon-user",
            label: "个人信息",
            prop: "group2",
            display: false,
            forms: [
              {
                label: "用户id",
                prop: "id",
                hide: true
              },
              {
                label: "民族",
                prop: "nation",
                type: "input",
                rules: {
                  required: true
                }
              },
              {
                label: "籍贯",
                prop: "natives",
                type: "input",
                rules: {
                  required: true
                }
              },
              {
                label: "户口类型",
                prop: "residenceType",
                type: "select",
                dicData: PersonalManageDic.residenceType,
                rules: {
                  required: true
                }
              },
              {
                label: "身份证号码",
                prop: "cardNo",
                type: "input",
                width: 115,
                rules: {
                  required: true
                }
              },
              {
                label: "婚姻状况",
                prop: "maritalStatus",
                type: "select",
                dicData: PersonalManageDic.maritalStatus
              },
              {
                label: "子女个数",
                prop: "childNum",
                type: "number",
                minRows: 0
              },
              {
                label: "政治面貌",
                prop: "political",
                type: "select",
                dicData: PersonalManageDic.politicalStatus
              },
              {
                label: "入团日期",
                prop: "groupDate",
                type: "date",
                valueFormat: "yyyy-MM-dd"
              },
              {
                label: "入党日期",
                prop: "partyDate",
                type: "date",
                valueFormat: "yyyy-MM-dd"
              },
              {
                label: "工会会员",
                prop: "guild",
                type: "select",
                dicData: BooleanDic.isOrNot
              },
              {
                label: "学历",
                prop: "education",
                type: "select",
                dicData: PersonalManageDic.educationBackground
              },
              {
                label: "学位",
                prop: "degree",
                type: "select",
                dicData: PersonalManageDic.degree
              },
              {
                label: "健康状况",
                prop: "health",
                type: "select",
                dicData: PersonalManageDic.healthStatus
              },
              { label: "身高", prop: "height", type: "input", append: "cm" },
              { label: "体重", prop: "weight", type: "input", append: "kg" },
              { label: "血型", prop: "bloodType", type: "input" },
              {
                label: "现居住地",
                prop: "address",
                type: "input",
                rules: { required: true }
              },
              {
                label: "家庭联系方式",
                prop: "familyContact",
                type: "input",
                width: 130,
                rules: { required: true }
              },
              {
                label: "暂住证号码",
                prop: "temporaryNo",
                placeholder: "非籍贯地的居住证号码",
                type: "input",
                row: true
              },
              {
                label: "教育经历",
                prop: "educationExperienceList",
                type: "dynamic",
                span: 24,
                children: {
                  align: "center",
                  headerAlign: "center",
                  editBtn: true,
                  data: [],
                  columnConfig: [
                    {
                      width: 200,
                      label: "学校名称",
                      prop: "schoolName"
                    },
                    {
                      width: 200,
                      label: "专业",
                      prop: "specialized",
                      type: "input"
                    },
                    {
                      width: 200,
                      label: "开始日期",
                      prop: "startDate",
                      type: "date",
                      valueFormat: "yyyy-MM-dd"
                    },
                    {
                      width: 200,
                      label: "结束日期",
                      prop: "endDate",
                      type: "date",
                      valueFormat: "yyyy-MM-dd"
                    },
                    {
                      width: 200,
                      label: "学历",
                      prop: "subEducation",
                      type: "select",
                      dicData: PersonalManageDic.educationBackground
                    },
                    {
                      width: 200,
                      label: "详细描述",
                      prop: "description",
                      type: "input"
                    }
                  ],
                  uiConfig: {
                    pagination: false,
                    height: "auto"
                  },
                  tableMethods: {
                    rowAdd: done => {
                      done({
                        valueDefault: "无"
                      });
                    },
                    rowDel: (row, done) => {
                      done();
                    }
                  }
                }
              },
              {
                label: "家庭情况",
                prop: "familyDetailsList",
                type: "dynamic",
                // tip: "包括成员、称谓、工作单位、职务、地址",
                span: 24,
                children: {
                  align: "center",
                  headerAlign: "center",
                  editBtn: true,
                  data: [],
                  columnConfig: [
                    {
                      width: 200,
                      label: "成员",
                      prop: "name"
                    },
                    {
                      width: 200,
                      label: "称谓",
                      prop: "appellation",
                      type: "input"
                    },
                    {
                      width: 200,
                      label: "工作单位",
                      prop: "work",
                      type: "input"
                    },
                    {
                      width: 200,
                      label: "职务",
                      prop: "post",
                      type: "input"
                    },
                    {
                      width: 250,
                      label: "地址",
                      prop: "familyAddress",
                      type: "input"
                    }
                  ],
                  uiConfig: {
                    pagination: false,
                    height: "auto"
                  },
                  tableMethods: {
                    rowAdd: done => {
                      this.$message.success("新增回调");
                      done({
                        input: "默认值"
                      });
                    },
                    rowDel: (row, done) => {
                      this.$message.success("删除回调" + JSON.stringify(row));
                      done();
                    }
                  }
                }
              }
            ]
          }
        ]
      },
      tabPanelOptions: [
        {
          label: "基本信息",
          name: ""
        },
        {
          label: "个人信息",
          name: "Person"
        }
      ],
      step: 0,
      infoArr: [],
      pageConfig: apiConfig.add,
      apiName: "",
      userId: "", // 用户账号id
      messageId: "" // 用户信息id
    };
  },
  created() {
    if (this.$route.query || this.$route.params) {
      let params = this.$route.params;
      // 传递过来的数据
      if (!_.isEmpty(params.model)) {
        this.pageConfig = _.cloneDeep(apiConfig.edit);
        this.model = { ...this.model, ...params.model };

        this.userId = this.model.userId;
        this.messageId = this.model.messageId;
      }
      // 传递过来额外的配置
      this.options = {
        ...this.options,
        ...params.extraOptions
      };
      // 如果有disabled属性，则为查看详情
      if (this.options.disabled) {
        this.pageConfig.title = "人员详情";
      }
    }
  },
  methods: {
    nextStep({ model = {}, hide = () => {}, step = ++this.step }) {
      hide(); // 隐藏提交状态

      this.infoArr[step] = _.cloneDeep(model); // 保存当前model

      if (step === this.options.group.length) {
        this.backList();
      } else {
        // 将下一步group显示
        this.displayGroup(step);
      }
    },
    lastStep() {
      this.step--;

      // 将上一步group显示
      this.displayGroup(this.step);
    },
    displayGroup(index) {
      this.$nextTick(() => {
        this.options.group.forEach(item => {
          item.display = false;
        });
        this.options.group[index].display = true;
        // this.model = this.infoArr[index] || {};
      });
      // 更新apiName
      this.apiName = this.tabPanelOptions[index].name;
    },
    submit(model, hide) {
      if (this.pageConfig.flag === "edit") {
        // 更新信息
        this.updateInfo(model);
      } else {
        this.insertInfo(model, hide);
      }
    },
    insertInfo(model, hide) {
      // 添加信息
      PersonalManageApi[`insertUser${this.apiName}Message`](
        Object.assign(model, this.getIdField)
      ).then(res => {
        this.messageId = res.id;
        this.nextStep({ hide });
      });
    },
    updateInfo(model) {
      model.messageId = this.messageId;
      model.userId = this.userId;

      // 更新信息
      PersonalManageApi[`updateUser${this.apiName}Message`](model)
        .then(res => {
          console.log(res);
          this.backList();
        })
        .catch(err => {
          console.error(err);
        });
    },
    getInfo(cb) {
      // 更新信息
      PersonalManageApi[`getUser${this.apiName}Message`](
        Object.assign({}, this.getIdField)
      ).then(res => {
        cb(res);
      });
    },
    resetForm(cb) {
      this.$refs[this.options.ref].resetForm();
      this.$nextTick(() => {
        cb && cb();
      });
    },
    backList() {
      this.$router.push({
        name: "personalmanageinfo"
      });
    },
    tabClick(tab, event) {
      const { name } = tab;
      this.apiName = name;

      this.getInfo(res => {
        this.resetForm(() => {
          this.model = res;
        }); // 重置form
      });

      this.nextStep({ step: tab.index });
    },
    editCurrent() {
      Object.assign(this.options, {
        disabled: !this.options.disabled,
        submitBtn: !this.options.submitBtn,
        emptyBtn: !this.options.emptyBtn
      });
    }
  },
  computed: {
    isBaseInfo() {
      return this.apiName.length === 0;
    },
    getIdField() {
      /**
       * 新增基本信息传 id
       * 新增其他信息传 messageId
       */
      return {
        [this.isBaseInfo ? "id" : "messageId"]: this.messageId
      };
    }
  }
};
</script>
<style lang='less'>
#personal-manage {
  .panel {
    padding: 0;
  }

  .el-tabs--border-card {
    position: relative;
    box-shadow: unset;
    border: 0;
  }

  .el-tabs__content {
    padding: 20px;
  }

  .el-tabs__header {
    position: absolute !important;
    z-index: 10;
    width: 100%;
  }
}
</style>