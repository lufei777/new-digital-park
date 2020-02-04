<template>
  <div class="panel-container">
    <div class="panel">
      <z-form :ref="options.ref" :options="options" v-model="model" @submit="submit"></z-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {},
      options: {
        ref: "form",
        labelWidth: "100",
        size: "small",
        group: [
          {
            icon: "el-icon-user-solid",
            label: "基本信息",
            prop: "group1",
            forms: [
              {
                label: "姓名",
                prop: "name",
                type: "input",
                rules: {
                  required: true,
                  trigger: "blur"
                }
              },
              {
                label: "性别",
                prop: "six",
                type: "select",
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
                    label: "未知",
                    value: 3
                  }
                ]
              },
              {
                label: "年龄",
                prop: "age",
                type: "number"
              },
              {
                label: "所在部门",
                prop: "szbm",
                type: "input",
                rules: {
                  required: true
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
                type: "datetime"
              },
              {
                label: "转正时间",
                prop: "zzsj",
                type: "datetime"
              },
              {
                label: "初次参加工作时间",
                prop: "cccjgzsj",
                type: "datetime"
              },
              {
                label: "工号",
                prop: "gh",
                type: "number",
                disabled: true,
                rules: {
                  required: true
                }
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
                type: "textarea"
              },
              {
                label: "爱好",
                prop: "ah",
                type: "textarea"
              }
            ]
          },
          {
            icon: "el-icon-user",
            label: "个人信息",
            prop: "group2",
            forms: [
              {
                label: "出生日期",
                prop: "csrq",
                type: "datetime"
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    submit(...args) {
      console.log(args);
    }
  }
};
</script>
<style lang='less' scoped>
</style>