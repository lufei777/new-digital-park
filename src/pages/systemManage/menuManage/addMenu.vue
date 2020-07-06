<template>
  <div class="add-menu-page panel-container radius-shadow">
    <div class="form-box">
      <z-form :ref="formConfig.ref" :options="formConfig"
              v-model="formModel" @submit="submit"
      >
        <template slot="icon" slot-scope="scope">
          <i v-if="formModel.icon" class="iconfont" :class="formModel.icon"></i>
          <span v-if="!formModel.icon">--</span>
        </template>
        <template slot="productBgUrl" slot-scope="scope">
          <img v-if='formModel.productBgUrl'
               :src="'../../../../static/image/digitalPark/'+formModel.productBgUrl+'.png'"
               alt=""
          />
          <span v-if="!formModel.productBgUrl">--</span>
        </template>
        <template slot="menuBtn" slot-scope="scope">
          <el-button @click="goBack(scope)">返回</el-button>
        </template>
      </z-form>
    </div>
  </div>
</template>

<script>
  import {SystemDic} from "@/utils/dictionary";
  import SystemManageApi from '@/service/api/systemManage'

  export default {
    name: 'AddMenu',
    components: {},
    props: [],
    data() {
      let _this = this

      //不可以移动到本身及本身的子级下
      let checkPid = function (rule, value, callback) {
        if (value == '') {
          callback(new Error('请选择上级菜单'));
        } else if (_this.curParentMenu.level < _this.formModel.level) {
          callback()
        } else {
          if (_this.curParentMenu.level > _this.formModel.level) {

            let flag = _this.checkId(_this.formModel.childNode)
            if (flag) {
              callback(new Error('不可移动到自身的子级菜单下'));
            } else {
              callback()
            }

          } else if (_this.curParentMenu.level == _this.formModel.level &&
            _this.curParentMenu.id == _this.formModel.id) {
            callback(new Error('不可移动到自身菜单下'));
          } else {
            callback();
          }
        }
      }
      let checkSequence = function (rule, value, callback) {
        if (value == '') {
          callback(new Error('请输入排序级别'));
        } else if(!Number(value) && value!=0){
          callback(new Error('请输入数字'));
        }else if (value<1 || value>100){
          callback(new Error('排序范围在1-100'));
        }else if(Math.floor(value) != value){
          callback(new Error('请输入整数'));
        }else{
          callback();
        }
      }
      return {
        formModel: {},
        formConfig: {
          ref: "formRef",
          size: "medium",
          menuPosition: "center",
          labelWidth: 150,
          emptyBtn: false,
          forms: [
            {
              type: "input",
              label: "菜单名称",
              prop: "name",
              span: 24,
              rules: {
                required: true,
                message: "请输入菜单名称",
                trigger: "blur"
              }
            },
            // {
            //   type: "input",
            //   label: "菜单编号",
            //   prop: "abbr",
            //   span: 24,
            // },
            {
              type: "tree",
              label: "上层菜单",
              prop: "pid",
              valueDefault: '0',
              span: 24,
              dicData: [],
              props: {
                label: "name",
                value: "id",
                children: "childNode",
              },
              rules: {
                validator: checkPid,
                trigger: 'change'
              },
              nodeClick: _this.onClickParentNode
            },
            {
              type: "input",
              label: "排序",
              prop: "sequence",
              rules: {
                required:'true',
                validator: checkSequence,
                trigger: 'change'
              },
              span: 24,
            },
            {
              type: "input",
              label: "菜单路径",
              prop: "routeAddress",
              span: 24,
              disabled: true
            },
            {
              type: "radio",
              label: "显示",
              prop: "isHidden",
              valueDefault: 0,
              span: 24,
              dicData: SystemDic.isHidden,
            },
            {
              // type: "input",
              label: '图标',
              prop: 'icon',
              formslot: true,
              span: 24,
            },
            {
              // type: "upload",
              // listType: "picture-img",
              label: '背景图',
              prop: 'productBgUrl',
              formslot: true,
              span: 24,
            },
          ]
        },
        menuList: [],
        curParentMenu: {}
      }
    },
    computed: {
      menuId() {
        return this.$route.query.menuId
      },
      api() {
        return 'editMenu'
      }
    },
    watch: {},
    methods: {
      goBack() {
        history.go(-1)
      },
      async getMenuDetail() {
        let res = await SystemManageApi.getMenuDetail({
          menuId: this.menuId
        })
        res.routeAddress = res.routeAddress ? res.routeAddress : '--'
        this.formModel = res
      },
      async submit(model, hide) {
        await SystemManageApi[this.api](this.formModel)
          .then(res => {
            this.$message({
              type: "success",
              message: res
            });
            this.$router.push('/menuManage')
            this.$store.dispatch('digitalPark/getMenus')
          })
          .finally(msg => {
            hide();
          });
      },
      async getMenuList() {
        let res = await SystemManageApi.getMenuList()
        this.menuList = res
        this.$refs[this.formConfig.ref].setColumnByProp("pid", {
          dicData: res[0].childNode
        });
      },
      checkId(menuList) {
        let flag = false
        menuList.map((item) => {
          if (item.id == this.curParentMenu.id) {
            flag = true
          } else {
            this.checkId(item.childNode, this.curParentMenu.id)
          }
        })
        return flag
      },
      onClickParentNode(val) {
        this.curParentMenu = val
      }
    },
    async mounted() {
      if (!this.menuId) {
        await this.getMenuList()
      } else if (this.menuId) {
        await this.getMenuDetail()
        if (this.formModel.level == 1) {
          this.$refs[this.formConfig.ref].setColumnByProp("pid", {
            hide: true
          });
        } else {
          await this.getMenuList()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .add-menu-page {
    padding: 20px;
    background: @white;
    box-sizing: border-box;

    .form-box {
      width: 50%;
      margin: 0 auto;
    }
  }
</style>
