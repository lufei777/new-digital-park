<template>
      <div class='panel-container'>
    <div class="panel">
      <!-- 区分标题 -->
      <div class="toptitle">
        <span>{{title}}</span>
        <el-divider content-position="left"></el-divider>
      </div>
      <!-- 编辑和详情 -->

      <z-Form
        v-model="model"
        :ref='formData.ref'
        :options='formData'
        @submit="submit"
      >
        <template
          slot='btn'
          slot-scope="obj"
        >
          <div>
            <!-- 编辑的保存 -->
            <el-button @click="editSave(obj)"  v-if="$route.query.mark =='edit'" >编辑保存</el-button>
            <!-- 添加的保存 -->
            <el-button
              v-if="$route.query.mark =='add'"
              type='primary'
              @click="save(obj)"
            >添加保存</el-button>
            <el-button
              type='primary'
              @click="back(obj)"
            >返回</el-button>
          </div>
        </template>
      </z-Form>

    </div>
  </div>
</template>

<script>
// 导入接口
import norbulingka from "@/service/api/norbulingka";
import { Norbulingka } from "utils/dictionary";
const culturalType = Norbulingka.culturalType;
const collectionYear = Norbulingka.collectionYear;
const topTitle = {
  add: {
    title: "添加藏品档案"
  },
  edit: {
    title: "编辑藏品档案"
  },
  detail: {
    title: "藏品档案详情"
  }
};
export default {
  // /addeditdetail
  data() {
    return {
      title: "",
      model: {},
      formData: {
        ref: "formData",
        menuBtn: false,
        labelWidth: "120",
        size: "medium",
        textMode: false,
        // group: [
        //   {
        //     label: "添加 藏品档案",
        //     prop: "group",

        //   }
        // ]
        forms: [
          // 藏品序号：	id	编号类型：	serialType	藏品编号：	serial
          // {
          //   label: "藏品序号",
          //   type: "number",
          //   span: 7,
          //   prop: "id",
          //   disabled:true
          // },
          {
            label: "编号类型",
            type: "select",
            span: 7,
            // offset: 1,
            prop: "serialType",
            dicUrl: norbulingka.getSelectOptionOther,
            dicQuery: { parentId: 0, catalogId: 4001 },
            props: {
              label: "name",
              value: "id"
            }
            // dicData: [
            //   { label: "藏品总登记号", value: 0 },
            //   { label: "辅助账号", value: 1 },
            //   { label: "索书号", value: 2 },
            //   { label: "档案编号", value: 3 }
            // ]
          },
          {
            label: "藏品编号",
            type: "input",
            span: 7,
            // offset: 1,
            prop: "serial",
            rules:[
              {
                required:true,
                message:'必填项'
              }
            ]
          },
          // 藏品名称	collectionName	藏品原名 primaryName	文物类别	culturalType
          {
            label: "藏品名称",
            type: "input",
            span: 7,
            // offset:1,
            prop: "collectionName",
            rules: [
              {
                required: true,
                message: "必填字段"
              }
            ]
          },
          {
            label: "藏品原名",
            type: "input",
            span: 7,
            // offset: 1,
            prop: "primaryName"
          },
          {
            label: "文物类别",
            type: "select",
            span: 7,
            // offset: 1,
            prop: "culturalType",
            // dicData: culturalType
            dicUrl: norbulingka.getSelectOptionOther,
            dicQuery: { parentId: 0, catalogId: 5001 },
            props: {
              label: "name",
              value: "id"
            }
          },
          // 具体年代	practicalYear	藏品年代3	year1/ year2/ year3
          {
            label: "具体年代",
            type: "year",
            span: 7,
            // offset:1,
            prop: "practicalYear",
            valueFormat: "yyyy",
            format: "yyyy"
          },
          {
            label: "藏品年代",
            type: "cascader",
            placeholder: "藏品年代三级联动",
            span: 7,
            // offset: 1,
            prop: "years",
            dicUrl: norbulingka.getSelectOptionOther,
            dicQuery: { parentId: 0, catalogId: 3001 },
            props: {
              label: "name",
              value: "id",
              children: "children"
            }
            // row:true,
            // dicData: collectionYear
          },
          // 地质类别	characterType1/ characterType2/ 	(藏品质地：relicCharacter)
          {
            label: "质地类别",
            type: "cascader",
            span: 7,
            prop: "characterTypes",
            // offset: 1,

            dicUrl: norbulingka.getSelectOptionOther,
            dicQuery: { parentId: 0, catalogId: 13001 },
            props: {
              label: "name",
              value: "id",
              children: "children"
            }
          },
          // {
          //   label: "藏品质地",
          //   type: "input",
          //   row: true,
          //   span: 7,
          //   // offset: 1,
          //   prop: "relicCharacter"
          // },
          // 实际数量	realQuantity	具体尺寸	specificDimension
          {
            label: "实际数量",
            type: "number",
            span: 7,
            // offset:1,
            prop: "realQuantity",
            rules:[
              {
                required:true,
                message:'必填项'
              }
            ]
            // offset: 1
          },
          {
            label: "具体尺寸",
            type: "number",
            span: 7,
            // offset: 1,
            prop: "specificDimension",
            row: true
            // rules:[
            //   {
            //     // required:true,
            //     message:'只能输入整数',
            //     trigger:'change'
            //   }
            // ]
          },
          // 藏品通长	openLength	藏品通宽	openWidth	藏品通高	openHeight
          {
            label: "藏品通长",
            type: "number",
            // offset:1,
            span: 7,
            prop: "openLength"
            // rules:[
            //   {
            //     // required:true,
            //     message:'只能输入整数',
            //     trigger:'blur'
            //   }
            // ]
          },
          {
            label: "藏品通宽",
            type: "number",
            span: 7,
            // offset: 1
            // prop: "openWidth",
            // rules:[
            //   {
            //     // required:true,
            //     message:'只能输入整数',
            //     trigger:'blur'
            //   }
            // ]
          },
          {
            label: "藏品通高",
            type: "number",
            span: 7,
            // offset: 1,
            prop: "openHeight"
            // rules:[
            //   {
            //     // required:true,
            //     message:'只能输入整数',
            //     trigger:'blur'
            //   }
            // ]
          },
          // 质量范围	massRange	具体质量	specificMass	质量单位	massUnit
          {
            label: "质量范围",
            type: "select",
            span: 7,
            // offset:1,
            prop: "massRange",
            dicUrl: norbulingka.getSelectOptionOther,
            dicQuery: { parentId: 0, catalogId: 12001 },
            props: {
              label: "name",
              value: "id"
            }
            // dicData: [
            //   { label: "<0.1kg", value: 1 },
            //   { label: "0.001-1kg", value: 2 },
            //   { label: "1-50kg", value: 3 },
            //   { label: "50-100kg", value: 4 }
            // ]
          },
          {
            label: "具体质量",
            type: "input",
            span: 7,
            // offset: 1,
            prop: "specificMass"
          },
          {
            label: "质量单位",
            type: "input",
            span: 7,
            // offset: 1,
            prop: "massUnit"
          },
          // 文物级别	culturalRank	文物来源	culturalSource
          {
            label: "文物级别",
            type: "select",
            span: 7,
            // offset:1,
            prop: "culturalRank",
            dicUrl: norbulingka.getSelectOptionOther,
            dicQuery: { parentId: 0, catalogId: 7001 },
            props: {
              label: "name",
              value: "id"
            },
            rules:[
              {
                required:true,
                message:'必填项'
              }
            ]
            // dicData: [
            //   { label: "1级", value: 1 },
            //   { label: "2级", value: 2 },
            //   { label: "3级", value: 3 }
            // ]
          },
          {
            label: "文物来源",
            type: "select",
            span: 7,
            // offset: 1,
            prop: "culturalSource",
            dicUrl: norbulingka.getSelectOptionOther,
            dicQuery: { parentId: 0, catalogId: 8001 },
            props: {
              label: "name",
              value: "id"
            }
            // row: true,
            // dicData: [
            //   { label: "依法交换", value: 1 },
            //   { label: "旧藏", value: 2 },
            //   { label: "采集", value: 3 },
            //   { label: ".......", value: 4 }
            // ]
          },
          // 完残程度	intactDisabled_Degree	完残状况	intactDisabled_State	保存状态	saveState
          {
            label: "完残程度",
            type: "select",
            span: 7,
            prop: "intactDisabledDegree",
            // offset: 1,
            dicUrl: norbulingka.getSelectOptionOther,
            dicQuery: { parentId: 0, catalogId: 9001 },
            props: {
              label: "name",
              value: "id"
            }
            // dicData: [
            //   { label: "完整", value: 1 },
            //   { label: "基本完整", value: 2 },
            //   { label: "残缺", value: 3 },
            //   { label: "严重残缺", value: 4 }
            // ]
          },
          {
            label: "完残状况",
            type: "input",
            span: 7,
            // offset: 1,
            prop: "intactDisabledState"
          },
          {
            label: "保存状态",
            type: "select",
            span: 7,
            // offset: 1,
            prop: "saveState",
            dicUrl: norbulingka.getSelectOptionOther,
            dicQuery: { parentId: 0, catalogId: 10001 },
            props: {
              label: "name",
              value: "id"
            }
            // dicData: [
            //   { label: "状态稳定，不需要修复", value: 1 },
            //   { label: "部分损坏，需要修复", value: 2 },
            //   { label: "腐蚀损毁严重，急需修复", value: 3 },
            //   { label: "已修复", value: 4 }
            // ]
          },
          // 入藏时间范围	enterCollection_Time	入藏年度	enterCollection_Year
          {
            label: "入藏时间范围",
            type: "select",
            span: 7,
            // offset: 1,
            prop: "enterCollectionTime",
            dicUrl: norbulingka.getSelectOptionOther,
            dicQuery: { parentId: 0, catalogId: 11001 },
            props: {
              label: "name",
              value: "id"
            }
            // dicData: [
            //   { label: "1949之前", value: 1 },
            //   { label: "1949-1965", value: 2 },
            //   { label: "1966-1976", value: 3 },
            //   { label: "2001至今", value: 4 }
            // ]
          },
          {
            label: "入藏年度",
            type: "year",
            span: 7,
            // offset: 1,
            prop: "enterCollectionYear",
            valueFormat: "yyyy",
            format: "yyyy",
            // row: true
          },
          // 藏品著着	author	藏品版本	versions	藏品存卷	saveRoll
          {
            label: "藏品著者",
            type: "input",
            span: 7,
            // offset: 1,
            prop: "author"
          },
          {
            label: "藏品版本",
            type: "input",
            span: 7,
            // offset: 1,
            prop: "versions"
          },
          {
            label: "藏品存卷",
            type: "input",
            span: 7,
            row: true,
            // offset: 1,
            prop: "saveRoll"
          },
          {
            prop: "btn",
            formslot: true,
            offset: 8,
            span: 12
          }
        ]
      }
    };
  },
  computed: {
    Form() {
      return this.$refs[this.formData.ref];
    }
  },
  methods: {
    submit(obj) {
      console.log(obj);
    },
    back(obj) {
      this.$router.back();
    },
    // 编辑的保存
    editSave(obj){
      this.Form.getFormModel(res => {
        // console.log('编辑',res)
        let params = res 
        if (Object.keys(res).length === 0) {
          return false;
        }
        else{
          norbulingka.updateRelic({...params}).then(res => {
              this.$message({
              message: "编辑成功！",
              type: "success"
            });
            this.$router.back()
          }).finally(res => {

          }) 
        }
      }) 
    },
    // 添加的保存
    save(obj) {
      this.Form.getFormModel(res => {
        console.log("保存", res);
        // 判断必填字段是否为空 没填情况下阻止跳转
        if (Object.keys(res).length === 0) {
          return false;
        } else {
          // 添加藏品档案的的接口
          // console.log(res)
          if(res.years && res.years[0]){
          res['year1'] =Array.from(res.years)[0]
          }   
          // res['year1'] =Array.from(res.years)[0]
          if(res.years &&  res.years[1]) {
            res['year2'] =Array.from(res.years)[1]
          }
          if(res.years &&  res.years[2]){
            res['year3'] =Array.from(res.years)[2]
          }
          if(res.characterTypes && res.characterTypes[0]){
            res['characterType1'] = res.characterTypes[0]
          }
          if(res.characterTypes && res.characterTypes[1]){
            res['characterType2'] = res.characterTypes[1]
          }
          if(res.characterTypes && res.characterTypes[2]){
            res['relicCharacter'] = res.characterTypes[2]
          }
          
          // 因为 year/ characterType1 不符合后端的要求 所以删除掉
          delete res.years
          delete res.characterTypes
          // console.log(res)
          norbulingka.insertRelic2({ ...res }).then(res => {
            this.$message({
              message: "保存成功！",
              type: "success"
            });
             this.$router.back();
          });
         
        }
      });
    }
  },
  created() {
    let path = this.$route.query;
    if (path.flag) {
      this.model = { ...path };
      // 若果是详情查看需要隐藏输入框的border
      this.formData.textMode = true;
      // 配置页面中的标题
      this.title = _.cloneDeep(topTitle[path.mark].title);
    } else {
      this.title = _.cloneDeep(topTitle[path.mark].title);
      this.model = { ...path };
    }
  }
};
</script>

<style lang='less' scoped>
.toptitle {
  margin-bottom: 20px;
  span {
    padding: 0 10px;
  }
}
</style>