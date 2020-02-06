<template>
  <div class="panel-container">
    <div class="panel flex-align-center" style="align-items:flex-start;">
      <z-form :ref="options.ref" :options="options" v-model="model" @submit="submit"></z-form>
    </div>
  </div>
</template>
<script>
import SystemManageApi from "@/service/api/systemManage";

export default {
  data() {
    return {
      model: {},
      options: {
        ref: "form",
        labelWidth: "100",
        width: "50%",
        size: "small",
        group: [
          {
            icon: "el-icon-user-solid",
            label: "基本信息",
            prop: "group1",
            display: true,
            forms: [
              {
                label: "姓名",
                prop: "name",
                type: "input",
                span: 8,
                rules: {
                  required: true,
                  trigger: "blur"
                }
              },
              {
                label: "性别",
                prop: "six",
                type: "select",
                span: 8,
                rules: {
                  required: true,
                  trigger: "blur"
                },
                dicData: [
                  {
                    label: "男",
                    value: 1
                  },
                  {
                    label: "女",
                    value: 2
                  },
                  {
                    label: "保密",
                    value: 3
                  }
                ]
              },
              {
                label: "年龄",
                prop: "age",
                type: "input",
                dataType: "number",
                span: 8
              },
              {
                label: "所在部门",
                prop: "szbm",
                type: "cascader",
                rules: {
                  required: true,
                  trigger: "blur"
                },
                showAllLevels: false,
                dicUrl: SystemManageApi.getDepartmentTree,
                props: {
                  label: "name",
                  value: "id",
                  children: "childNode"
                }
              },
              {
                label: "所在岗位",
                prop: "szgw",
                type: "input",
                rules: {
                  required: true
                }
              },
              {
                label: "岗位级别",
                prop: "gwjb",
                type: "input",
                rules: {
                  required: true
                }
              },
              {
                label: "直接上级",
                prop: "zjsj",
                type: "input",
                rules: {
                  required: true
                }
              },
              {
                label: "员工状态",
                prop: "ygzt",
                type: "select",
                rules: {
                  required: true
                },
                dicData: [
                  {
                    label: "临时",
                    value: 1
                  },
                  {
                    label: "试用",
                    value: 2
                  },
                  {
                    label: "正式",
                    value: 3
                  }
                ]
              },
              {
                label: "员工类型",
                prop: "yglx",
                type: "select",
                rules: {
                  required: true
                },
                dicData: [
                  {
                    label: "外包",
                    value: 1
                  },
                  {
                    label: "兼职",
                    value: 2
                  },
                  {
                    label: "全职",
                    value: 3
                  }
                ]
              },
              {
                label: "入职时间",
                prop: "rzsj",
                type: "date"
              },
              {
                label: "转正时间",
                prop: "zzsj",
                type: "date"
              },
              {
                label: "初次参加工作时间",
                prop: "cccjgzsj",
                type: "date"
              },
              {
                label: "工号",
                prop: "gh",
                type: "input",
                dataType: "number",
                disabled: true,
                rules: {
                  required: true
                },
                valueDefault: 1
              },
              {
                label: "办公电话",
                prop: "bgdh",
                type: "input"
              },
              {
                label: "移动电话",
                prop: "yddh",
                type: "input"
              },
              {
                label: "工作邮箱",
                prop: "gzyx",
                type: "input"
              },
              {
                label: "个人邮箱",
                prop: "gryx",
                type: "input"
              },
              {
                label: "办公地点",
                prop: "bgdd",
                type: "input",
                rules: {
                  required: true
                }
              },
              {
                label: "照片",
                prop: "housePictureVOList",
                type: "upload",
                listType: "picture-img",
                span: 24,
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
              },
              {
                label: "专长",
                prop: "zc",
                type: "textarea",
                span: 24
              },
              {
                label: "爱好",
                prop: "ah",
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
                label: "出生日期",
                prop: "csrq",
                type: "date",
                rules: {
                  required: true,
                  trigger: "blur"
                }
              },
              {
                label: "民族",
                prop: "mz",
                type: "input",
                rules: {
                  required: true
                }
              },
              {
                label: "籍贯",
                prop: "jg",
                type: "input",
                rules: {
                  required: true
                }
              },
              {
                label: "户口类型",
                prop: "hklx",
                type: "select",
                dicData: [
                  { label: "城市", value: 0 },
                  { label: "农村", value: 1 }
                ],
                rules: {
                  required: true
                }
              },
              {
                label: "身份证号码",
                prop: "sfzhm",
                type: "input",
                rules: {
                  required: true
                }
              },
              {
                label: "婚姻状况",
                prop: "hyzk",
                type: "select",
                dicData: [
                  { label: "已婚", value: 0 },
                  { label: "未婚", value: 1 }
                ]
              },
              {
                label: "子女个数",
                prop: "zngs",
                type: "number",
                minRows: 0
              },
              {
                label: "政治面貌",
                prop: "zzmm",
                type: "select",
                dicData: [
                  { label: "中共党员", value: 0 },
                  { label: "中共预备党员", value: 1 },
                  { label: "共青团员", value: 2 },
                  { label: "群众", value: 3 },
                  { label: "民革党员", value: 4 },
                  { label: "民盟盟员", value: 5 },
                  { label: "民建会员", value: 6 },
                  { label: "民进会员", value: 7 },
                  { label: "农工党党员", value: 8 },
                  { label: "致公党党员", value: 9 },
                  { label: "九三学社社员", value: 10 },
                  { label: "台盟盟员", value: 11 },
                  { label: "无党派人士", value: 12 }
                ]
              },
              {
                label: "入团日期",
                prop: "rtrq",
                type: "date"
              },
              {
                label: "入党日期",
                prop: "rdrq",
                type: "date"
              },
              {
                label: "工会会员",
                prop: "ghhy",
                type: "select",
                dicData: [
                  { label: "是", value: 0 },
                  { label: "否", value: 1 }
                ]
              },
              {
                label: "学历",
                prop: "xl",
                type: "select",
                dicData: [
                  {
                    label: "小学",
                    value: 0
                  },
                  {
                    label: "初级中学",
                    value: 1
                  },
                  {
                    label: "高级中学",
                    value: 2
                  },
                  {
                    label: "中专",
                    value: 3
                  },
                  {
                    label: "职校",
                    value: 4
                  },
                  {
                    label: "中技",
                    value: 5
                  },
                  {
                    label: "专科（高职、高专、高技）",
                    value: 6
                  },
                  {
                    label: "本科",
                    value: 7
                  },
                  {
                    label: "硕士研究生",
                    value: 8
                  },
                  {
                    label: "博士研究生",
                    value: 9
                  }
                ]
              },
              {
                label: "学位",
                prop: "xw",
                type: "select",
                dicData: [
                  {
                    label: "学士",
                    value: 0
                  },
                  {
                    label: "硕士",
                    value: 1
                  },
                  {
                    label: "博士",
                    value: 2
                  }
                ]
              },
              {
                label: "健康状况",
                prop: "jkzk",
                type: "select",
                dicData: [
                  {
                    label: "优秀",
                    value: 0
                  },
                  {
                    label: "良好",
                    value: 1
                  },
                  {
                    label: "一般",
                    value: 2
                  },
                  {
                    label: "较差",
                    value: 3
                  }
                ]
              },
              { label: "身高", prop: "sg", type: "input", append: "cm" },
              { label: "体重", prop: "tz", type: "input", append: "kg" },
              { label: "血型", prop: "xx", type: "input" },
              {
                label: "现居住地",
                prop: "xjzd",
                type: "input",
                rules: { required: true }
              },
              {
                label: "家庭联系方式",
                prop: "jtlxfs",
                type: "input",
                rules: { required: true }
              },
              {
                label: "暂住证号码",
                prop: "zzzhm",
                type: "input"
              },
              {
                label: "教育经历",
                prop: "jyjl",
                type: "textarea"
              },
              {
                label: "家庭情况",
                prop: "jtqk",
                type: "textarea",
                placeholder: "包括成员、称谓、工作单位、职务、地址"
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    submit(model, hide) {
      console.log("model", model);

      setTimeout(() => {
        hide();
        this.resetForm();

        this.options.group.forEach(item => {
          item.display = false;
        });
        this.options.group[1].display = true;
      }, 500);
    },
    resetForm() {
      this.$refs[this.options.ref].resetForm();
    }
  }
};
</script>
<style lang='less' scoped>
</style>