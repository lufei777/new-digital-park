<template>
      <div class='panel-container'>
    <div class="panel">
      <!-- 区分标题 -->
      <div class="toptitle">
        <span>{{title}}</span>
        <el-divider content-position="left"></el-divider>
      </div>
      <!-- 添加保护工程 -->
      <z-Form
        v-model="model"
        :options='formData'
        :ref="formData.ref"
      >
        <template
          slot='btn'
          slot-scope="obj"
        >
          <div>
            <el-button v-if=" $route.params.mark !=='detail' " @click="save" type='primary'>保存</el-button>
            <el-button @click="goBack" >返回</el-button>
          </div>
        </template>
      </z-Form>

    </div>
  </div>
</template>

<script>
const topTitle = {
  add: {
    title: "添加 保护工程"
  },
  edit: {
    title: "编辑 保护工程"
  },
  detail: {
    title: "保护工程详情"
  }
};
export default {
  data() {
    return {
      title:'模板',
      model: {},
      formData: {
        ref: "formData",
        labelWidth: "180",
        menuBtn: false,
        size: "medium",
        textMode: false,
        forms: [
          // 工程名称：	projectName
          {
            label: "工程名称",
            prop: "projectName",
            type: "input",
            span: 8,
            offset: 1,
            row: true,
            rules:[
              {
                required:true,
                message:'必填字段',
              }
            ]
          }
        ],
        // 涉及到的遗产构成要素 relateElement
        group: [
          {
            label: "涉及到的遗产构成要素",
            prop: "element",
            // labelWidth:180,
            forms: [
              {
                prop: "relateElement",
                type: "checkbox",
                span: 10,
                offset: 1,
                dicData: [
                  { label: "乌尧颇章", value: 0 },
                  { label: "格桑颇章", value: 1 },
                  { label: "却扎", value: 2 },
                  { label: "曲然", value: 3 },
                  { label: "康松思轮", value: 4 },
                  { label: "湖心亭", value: 5 },
                  { label: "鲁康", value: 6 },
                  { label: "准增颇章", value: 7 },
                  { label: "内马厩", value: 8 },
                  { label: "金色颇章", value: 9 }
                ],
                row: true
              },
              // 工程分类：	projectType
              {
                label: "工程分类",
                prop: "projectType",
                type: "select",
                span: 6,
                offset: 1,
                dicData: [
                  { label: "本体保护展示", value: 0 },
                  { label: "环境整治", value: 1 },
                  { label: "灾害防治", value: 2 },
                  { label: "勘察测绘", value: 3 },
                  { label: "监测", value: 4 },
                  { label: "行政涉建", value: 5 }
                ]
              },
              // 本体保护展示：	exhibit
              {
                label: "本体保护展示",
                prop: "exhibit",
                type: "select",
                span: 6,
                offset: 1,
                // width: "140",
                dicData: [
                  { label: "文物维修", value: 0 },
                  { label: "保护性设施", value: 1 },
                  { label: "现场展示", value: 2 }
                ]
              },
              // 图片：	photoFile
              {
                label: "图片",
                prop: "photoFile",
                type: "upload",
                span: 6,
                offset: 1,
                row: true
              },
              // 立项批复文件文号：	projectReplyFileNum
              {
                label: "立项批复文件文号",
                type: "input",
                prop: "projectReplyFileNum",
                span: 6,
                offset: 1
                // width: "140"
              },
              // 立项批复文件标题：	projectReplyFileTitle
              {
                label: "立项批复文件标题",
                type: "input",
                prop: "projectReplyFileTitle",
                span: 6,
                offset: 1
                // width: "160"
              },
              // 立项报告：	projectReport2
              {
                label: "立项报告",
                prop: "projectReport2",
                type: "upload",
                span: 6,
                offset: 1,
                row: true
              },
              // 方案批复文件文号：	planReplyFileNum
              {
                label: "方案批复文件文号",
                type: "input",
                prop: "planReplyFileNum",
                span: 6,
                offset: 1
                // width: "140"
              },
              // 方案批复文件标题： 	planReplyFileTitle
              {
                label: "方案批复文件标题",
                type: "input",
                prop: "planReplyFileTitle",
                span: 6,
                offset: 1
                // width: "160"
              },
              // 方案开始年月：	planStartDate
              {
                label: "方案开始年月",
                prop: "planStartDate",
                type: "month",
                span: 6,
                // width: "120",
                offset: 1,
                row: true
              },
              // 方案编制单位： 	planProduceDept
              {
                label: "方案编制单位",
                prop: "planProduceDept",
                type: "input",
                span: 6,
                offset: 1
                // width: 120
              },
              // 方案批复年份：	planReplyDate
              {
                label: "方案批复年份",
                prop: "planReplyDate",
                type: "input",
                span: 6,
                // width: 120,
                offset: 1
              },
              // 方案	planReport2
              {
                label: "方案",
                prop: "planReport2",
                type: "upload",
                span: 6,
                offset: 1,
                row: true
              },
              // 方案设计经费国家补助：	planBudget
              {
                label: "方案设计经费国家补助",
                prop: "planBudget",
                type: "input",
                span: 6,
                offset: 1
                // width: 180
              },
              // 方案设计经费地方配套：	planBudget2
              {
                label: "方案设计经费地方配套",
                prop: "planBudget2",
                type: "input",
                span: 6,
                // width: 180,
                offset: 1,
                row: true
              },
              // 不同意及其他文件文号：	otherFileNum
              {
                label: "不同意及其他文件文号",
                prop: "otherFileNum",
                type: "input",
                span: 6,
                offset: 1
                // width: 180
              },
              // 不同意及其他文件标题：	otherFileTitle
              {
                label: "不同意及其他文件标题",
                prop: "otherFileTitle",
                type: "input",
                span: 6,
                // width: 180,
                offset: 1
              },
              // 文件：	otherReport2
              {
                label: "文件",
                prop: "otherReport2",
                type: "upload",
                span: 6,
                offset: 1,
                row: true
              },
              // 是否上报世界遗产中心：	isReport
              {
                label: "是否上报世界遗产中心",
                prop: "isReport",
                type: "select",
                span: 6,
                offset: 1,
                // width: 180,
                dicData: [
                  { label: "是", value: 0 },
                  { label: "否", value: 1 }
                ]
              },
              // 世界遗产中心反馈时间： 	feedBackTime
              {
                label: "世界遗产中心反馈时间",
                prop: "feedBackTime",
                type: "date",
                span: 6,
                offset: 1
                // width: 180
              },
              // 反馈结论：	feedBackConclusion
              {
                label: "反馈结论",
                prop: "feedBackConclusion",
                type: "select",
                span: 6,
                offset: 1,
                row: true,
                dicData: [
                  { label: "通过", value: 0 },
                  { label: "未通过", value: 1 },
                  { label: "待审核", value: 2 }
                ]
              },
              // 往来文件：otherReport2
              {
                label: "往来文件",
                prop: "otherReport2",
                type: "upload",
                offset: 1,
                span: 6
              },
              // 保护工程进展情况： progress
              {
                label: "保护工程进展情况",
                prop: " progress",
                type: "select",
                span: 6,
                offset: 1,
                // width: 180,
                dicData: [
                  { label: "施工中", value: 0 },
                  { label: "施工待验收", value: 1 }
                ]
              },
              // 施工单位：constructDept
              {
                label: "施工单位",
                prop: "constructDept",
                type: "input",
                span: 6,
                offset: 1,
                row: true
              },

              // 监理单位： supervisionDept
              {
                label: "监理单位",
                prop: "supervisionDept",
                type: "input",
                offset: 1,
                span: 6
              },
              // 监理报告： otherReport2
              {
                label: "监理报告",
                prop: "otherReport2",
                type: "upload",
                span: 6,
                offset: 1
              },
              // 开工时间：startTime
              {
                label: "开工时间",
                prop: "startTime",
                type: "date",
                span: 6,
                offset: 1,
                row: true
              },
              // 竣工时间： endTime
              {
                label: "竣工时间",
                prop: "endTime",
                type: "date",
                offset: 1,
                span: 6
              },
              // 竣工报告：otherReport2
              {
                label: "竣工报告",
                prop: "otherReport2",
                type: "upload",
                span: 6,
                offset: 1
              },
              // 其他资料： otherReport2
              {
                label: "其他资料",
                prop: "otherReport2",
                type: "upload",
                span: 6,
                offset: 1
              },

              // 保护工程经费国家补助： protectBudget
              {
                label: "保护工程经费国家补助",
                prop: "protectBudget",
                type: "input",
                offset: 1,
                span: 6
                // width: 180
              },
              // 保护工程经费地方配套： protectBudget2
              {
                label: "保护工程经费地方配套",
                prop: "protectBudget2",
                type: "input",
                span: 6,
                offset: 1
                // width: 180
              },
              // 国家文物局验收日期：governCheckTime
              {
                label: "国家文物局验收日期",
                prop: "governCheckTime",
                type: "date",
                span: 6,
                // width: 180,
                offset: 1,
                row: true
              },
              // btn
              {
                prop: "btn",
                formslot: true,
                span: 6,
                offset: 9
              }
            ]
          }
        ]
      }
    };
  },
  computed:{
    Form() {
      return this.$refs[this.formData.ref]
    }
  },
  methods: {
    save(obj){
      this.Form.getFormModel(res => {
      // console.log('d',res)
      if(res.projectName === null){
        return false
      }else{
        this.$router.back()
      }
      })
    },
    goBack(obj){
       this.$router.back()
    }
  },
  created() {
    var parmars = this.$route.params;
    console.log(parmars);
    if (parmars.flag) {
      this.formData.textMode = true;
       this.title = _.cloneDeep(topTitle[parmars.mark].title);
      this.model = { ...parmars };
    } else {
      this.model = { ...parmars };
       this.title = _.cloneDeep(topTitle[parmars.mark].title);
    }
  }
};
</script>
<style lang="less" scoped>
.toptitle {
  margin-bottom: 20px;
  span {
    padding:0 10px;
    font-weight: bold;
    font-size: 18px;
  }
}
</style>
