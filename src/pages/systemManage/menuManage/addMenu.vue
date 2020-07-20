<template>
  <div class="add-menu-page panel-container radius-shadow">
    <div class="form-box">
      <z-form :ref="formConfig.ref" :options="formConfig"
              v-model="formModel" @submit="submit"
      >
        <template slot="icon" slot-scope="scope">
          <div>
            <el-input type="text" v-model="formModel.icon" class="icon-input"/>
            <i class="iconfont" :class="formModel.icon"></i>
          </div>
        </template>
        <template slot="menuBtn" slot-scope="scope">
          <el-button @click="goBack(scope)">返回</el-button>
        </template>
      </z-form>
    </div>
  </div>
</template>

<script>
  import {SystemDic,CommonDic} from "@/utils/dictionary";
  import SystemManageApi from '@/service/api/systemManage'
  import CommonFun from '@/utils/commonFun'
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
              // valueDefault: '0',
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
              // disabled: true
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
              type: "radio",
              label: '是否显示在功能模块',
              prop: 'status',
              valueDefault: 1,
              dicData: [
                {
                  label: '是',
                  value: 2
                },
                {
                  label: '否',
                  value: 1
                }
              ],
              change:_this.onStatusChange,
              span: 24,
            },
            {
              type: "upload",
              listType: "picture-img",
              label: "背景图",
              prop: 'productBgUrl',
              action: "/oaApi/image/upload",
              accept: ["jpg", "jpeg", "png"],
              propsHttp: {
                name: "fileName",
                url: "fileUrl",
                res: "data"
              },
              span: 24,
              hide:true
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
        return this.menuId?'editMenu':'addMenu'
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
            CommonFun.setHomeKeepAliveFlag()
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
      },
      onStatusChange(data){
        if(data.value==1){
          this.$refs[this.formConfig.ref].setColumnByProp("productBgUrl", {
            hide: true
          });
        }else{
          this.$refs[this.formConfig.ref].setColumnByProp("productBgUrl", {
            hide: false
          });
        }
      },
      async getData(){
        if (!this.menuId) {
          await this.getMenuList()
        } else if (this.menuId) {
          await this.getMenuDetail()
          if (this.formModel.level == 1) {
            this.$refs[this.formConfig.ref].setColumnByProp("pid", {
              hide: true
            });
            this.$refs[this.formConfig.ref].setColumnByProp("status", {
              hide: true
            });
            this.$refs[this.formConfig.ref].setColumnByProp("routeAddress", {
              disabled: true
            });
          } else {
            await this.getMenuList()
          }
        }
      }
    },
    async mounted() {
      this.getData()
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
    .zvue-form-wrapper .zvue-form-upload .picture-list .el-upload {
      border: none;
    }

    /deep/ .zvue-form-wrapper .zvue-form-upload .avatar {
      width: 250px;
      /*height:100%;*/
    }
    .icon-input{
      width:50%;
      margin-right: 20px;
    }
  }
</style>
