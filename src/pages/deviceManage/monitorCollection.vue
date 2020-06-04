<template>
  <div class="panel-container">
    <el-container>
      <el-aside :style="{height:contentHeight}" v-loading="asideLoad" class="panel common-aside">
        <el-scrollbar wrap-class="scrollbar-wrapper" :native="false">
          <div class="searchForm">
            <z-form
              :ref="searchForm.ref"
              :options="searchForm"
              v-model="searchModel"
              @submit="searchFormSubmit"
            >
              <template #menuBtn="{size}">
                <el-button type="text" :size="size" @click="searchFormMore">
                  {{ typeof $refs[searchForm.ref] === 'undefined'
                  ? '更多'
                  : $refs[searchForm.ref].getGroupByProp('more').hide
                  ? '更多'
                  :'收起' }}
                </el-button>
              </template>
            </z-form>
          </div>
          <z-table
            :load="load"
            :ref="deviceInfoTable.ref"
            :options="deviceInfoTable"
            @row-click="deviceRowClick"
          >
            <template #pagination>
              <el-input
                size="mini"
                style="margin-left:10px;width:60px;height:100%;"
                @change="pageChange"
                v-model="pageCurrent"
                placeholder
              ></el-input>
            </template>
          </z-table>
        </el-scrollbar>
      </el-aside>
      <el-container class="common-container">
        <el-main style="padding:0px;">
          <div class="panel">
            <z-table
              :load="load"
              :ref="tableOptions.ref"
              :options="tableOptions"
              @row-click="monitorRowClick"
            >
              <template #custom-top="{selectedData,size}">
                <div>
                  <el-button :size="size" type="primary" @click="deviceTypeDrawer = true">新增</el-button>
                  <el-button
                    :size="size"
                    :disabled="!selectedData.length"
                    type="primary"
                    @click="bulkDel(selectedData)"
                  >删除</el-button>
                </div>
              </template>
              <template #operation="{row,column,index,isEdit,size}">
                <el-button :size="size" type="text" @click="edit(row)">编辑</el-button>
                <el-button :size="size" type="text" @click="monitorData(row)">编辑</el-button>
              </template>
            </z-table>
          </div>

          <div class="panel">
            <!-- 设备详情，设备维修记录 -->
            <z-form :load="load" v-model="deviceDetailModel" :options="deviceDetailForm"></z-form>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <!-- 新增选择设备 -->
    <el-drawer
      title="添加资产"
      ref="typeDrawer"
      :visible.sync="deviceTypeDrawer"
      @close="$refs[deviceTypeForm.ref].resetForm()"
    >
      <div style="display:flex;justify-content:center;">
        <z-form
          :ref="deviceTypeForm.ref"
          :options="deviceTypeForm"
          v-model="addModel"
          @submit="addDeviceNext"
        >
          <template #btn="{size,disabled}">
            <div>
              <el-button
                :size="size"
                :disabled="disabled"
                type="primary"
                @click="$refs[deviceTypeForm.ref].submit()"
              >下一步</el-button>
              <el-button
                :size="size"
                :disabled="disabled"
                @click="$refs.typeDrawer.closeDrawer()"
              >取消</el-button>
            </div>
          </template>
        </z-form>
      </div>
    </el-drawer>
    <el-drawer
      title="监控采集新增"
      size="80%"
      :append-to-body="true"
      :visible.sync="innerDrawer"
      @close="$refs[deviceInfoForm.ref].resetForm()"
    >
      <div style="display:flex;justify-content:center;">
        <z-form
          v-model="deviceInfoModel"
          :ref="deviceInfoForm.ref"
          :options="deviceInfoForm"
          @submit="deviceInfoSubmit"
        ></z-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import CommonFun from 'utils/commonFun'
import { AssetType } from 'utils/dictionary';
import commonApi from 'api/common';
import deviceManageApi from 'api/deviceManage';
import { validNotChinese } from 'utils/validate';
import { getUserInfo } from 'utils/auth';

const DEVICE = AssetType.DEVICE;
// 新增设备
let assetAddUrl = '/vibe-web/asset/assetAdd';
// 编辑设备
let assetEditUrl = '/vibe-web/asset/assetEdit';
// 获取设备列表
let getDeviceListUrl = '/vibe-web/findAsset/searchDevices';
// 获取设备列表
let getMonitorListUrl = '/vibe-web//asset/queryAssetList';
// 新增维护
let addMaintenaceUrl = '/vibe-web/addMaintenace';
// 编辑维护
let updateMaintenaceUrl = '/vibe-web/updateMaintenace';

let valueFormat = "yyyy-MM-dd HH:mm:ss";
export default {
  data() {
    const userInfo = getUserInfo();
    return {
      pageCurrent: 1,
      // 设备树和设备List的loading
      asideLoad: false,
      load: false,

      // 根据设备树，空间树进行查询设备列表
      catalogs: [],
      spaceIds: [],

      // 查询form
      searchModel: {},
      searchForm: {
        ref: 'serachForm',
        labelWidth: 0,
        itemSpan: 24,
        size: 'mini',
        menuBtnPosition: 'right',
        submitText: '查询',
        group: [
          {
            prop: "1",
            forms: [
              {
                placeholder: '请选择 设备分类',
                type: 'tree',
                prop: "catalog",
                clearable: true,
                dicUrl: commonApi.getEnergyListAll,
                dicQuery: { kind: 'DEVICE' },
                props: {
                  label: "text",
                  value: "id",
                  children: "nodes"
                },
                change: ({ value }) => {
                  if (value === '') {
                    this.catalogs = [];
                  }
                },
                nodeClick: (data, node, $tree) => {
                  this.catalogs = [];
                  this.getIdsByNode(this.catalogs, node);
                }
              },
              {
                placeholder: '请选择 空间',
                type: "tree",
                prop: "spaceId",
                clearable: true,
                dicUrl: commonApi.getAllFloorOfA3,
                props: {
                  label: "floor",
                  value: "floorId",
                  children: "nodes"
                },
                change: ({ value }) => {
                  if (value === '') {
                    this.spaceIds = [];
                  }
                },
                nodeClick: (data, node, $tree) => {
                  this.spaceIds = [];
                  this.getIdsByNode(this.spaceIds, node);
                }
              }
            ]
          },
          {
            prop: 'more',
            hide: true,
            forms: [
              {
                placeholder: '请输入 标题',
                prop: 'caption'
              }
            ]
          }
        ]
      },
      // 主页设备List
      tableOptions: {
        ref: 'table',
        operation: {
          width: 150
        },
        data: [],
        columnConfig: [
          {
            label: '编号',
            prop: 'id'
          },
          {
            label: '标题',
            prop: 'caption'
          },
          {
            label: '分类',
            prop: 'kind'
          },
          {
            label: '名称',
            prop: 'name'
          },
          {
            label: '存放地点',
            prop: 'spaceCaption'
          },
          {
            label: '保管人',
            prop: 'userName'
          },
          {
            label: '启用时间',
            prop: 'enabing_date'
          },
          {
            label: '使用年限',
            prop: 'use_year'
          }
        ],
        uiConfig: {
          selection: true,
          height: 'auto',
          pagination: {
            handler: this.handlePagination
          }
        }
      },
      // 主页设备List
      deviceInfoTable: {
        ref: 'table2',
        data: [],
        columnConfig: [
          {
            label: '编号',
            prop: 'id',
            hide: true
          },
          {
            label: '标题',
            prop: 'caption'
          },
          {
            label: '名称',
            prop: 'name'
          }
        ],
        uiConfig: {
          height: 'auto',
          pagination: {
            handler: this.handlePagination,
            layout: ' pager, ->, slot',
            pagerCount: 5,
            small: true
          }
        }
      },

      // 设备新增抽屉
      deviceTypeDrawer: false,
      // 设备详情信息抽屉
      innerDrawer: false,

      // 新增设备表单
      addModel: {},
      deviceTypeForm: {
        ref: 'deviceTypeForm',
        menuBtn: false,
        itemSpan: 24,
        width: '80%',
        forms: [
          {
            label: '资产类别',
            prop: 'typeName',
            type: 'select',
            clearable: true,
            dicUrl: deviceManageApi.assetTypeList,
            dicQuery: { id: 1 },
            props: {
              label: 'text',
              value: 'name'
            },
            rules: {
              required: true
            }
          },
          {
            label: "资产类型",
            prop: "parentId",
            type: "tree",
            clearable: true,
            props: {
              label: "floor",
              value: "floorId",
              children: "nodes"
            },
            rules: {
              required: true
            }
          },
          {
            prop: 'btn',
            notModel: true,
            formslot: true,
            width: 54,
            span: 24
          }
        ]
      },
      // 设备信息表单
      deviceInfoModel: {},
      // 设备信息默认表单
      deviceInfoForms: [
        {
          label: 'id',
          prop: 'id',
          hide: true
        },
        {
          "label": "标题",
          "prop": "caption",
          rules: {
            required: true
          }
        },
        {
          "label": "名称",
          "prop": "name",
          rules: {
            required: true,
            validator: validNotChinese
          }
        },
        {
          "label": "设备采购日期",
          "prop": "purchase_date",
          type: "datetime",
          format: "yyyy-MM-dd HH:mm:ss",
          valueFormat,
          rules: {
            required: true
          }
        },
        {
          "label": "设备保修日期",
          "prop": "warranty_date",
          type: "date",
          format: "yyyy-MM-dd HH:mm:ss",
          valueFormat
        },
        {
          "label": "型号规格",
          "prop": "specification"
        },
        {
          "label": "资产类型",
          "prop": "models"
        },
        {
          "label": "增加方式",
          "prop": "increse_way"
        },
        {
          "label": "国际编码",
          "prop": "international_code"
        },
        {
          "label": "详情配置",
          "prop": "detail_config"
        },
        {
          "label": "制造日期",
          "prop": "production_date",
          type: "date",
          format: "yyyy-MM-dd",
          valueFormat: "yyyy-MM-dd",
          rules: {
            required: true
          },
        },
        // TODO
        // NOTE 使用部门 保管人员 的prop会导致错误
        {
          "label": "使用部门",
          "prop": "using_department",
          type: "select",
          defaultValue: "",
          dicUrl: deviceManageApi.deptList,
          props: {
            value: 'id',
            label: 'name'
          }
        },
        {
          "label": "使用状态",
          "prop": "using_state"
        },
        {
          "label": "生产厂家",
          "prop": "vendor"
        },
        {
          "label": "保管人员",
          "prop": "keepers",
          type: "select",
          defaultValue: "",
          dicUrl: deviceManageApi.userNameList,
          props: {
            value: 'id',
            label: 'text'
          },
          defaultValue: userInfo.id
        },
        {
          "label": "启用时间",
          "prop": "enabing_date",
          type: "date",
          format: "yyyy-MM-dd HH:mm:ss",
          valueFormat,
        },
        {
          "label": "数量",
          "prop": "quantity",
          type: 'number',
          minRows: 0
        },
        {
          "label": "单价",
          "prop": "price",
          type: 'number',
          minRows: 0,
          precision: 2
        },
        {
          "label": "单位",
          "prop": "deviceUnit",
          rules: {
            validator: (rule, value, callback) => {
              if (typeof value === 'number') {
                callback(new Error('不能是数字'))
              } else {
                callback();
              }
            }
          }
        },
        {
          "label": "金额",
          "prop": "amount",
          minRows: 0,
          precision: 2
        },
        {
          "label": "维修间隔月",
          "prop": "maintenance_interval"
        },
        {
          "label": "使用年限",
          "prop": "use_year",
          type: 'number',
          minRows: 0
        },
        {
          "label": "原值",
          "prop": "original_value",
          type: 'number'
        },
        {
          "label": "残值",
          "prop": "salvage_value",
          type: 'number'
        },
        {
          "label": "残值率",
          "prop": "salvage",
          type: 'number'
        },
        {
          "label": "折旧方法",
          "prop": "depreciation_method"
        },
        {
          "label": "描述",
          "prop": "memo"
        }
      ],
      deviceInfoForm: {
        ref: 'deviceInfoForm',
        itemSpan: 8,
        width: '90%',
        labelWidth: 110,
        forms: []
      },

      // 详情
      deviceDetailModel: {},
      deviceDetailForm: {
        menuBtn: false,
        textMode: true,
        labelWidth: 100,
        itemSpan: 6,
        forms: [
          {
            label: '编号',
            prop: 'id'
          },
          {
            label: '状态',
            prop: 'state'
          },
          {
            label: '标题',
            prop: 'caption'
          },
          {
            label: '名称',
            prop: 'name'
          },
          {
            label: '型号规格',
            prop: 'specification'
          },
          {
            label: '生产厂家',
            prop: 'vendor'
          },
          {
            label: '设备采购日期',
            prop: 'purchase_date'
          },
          {
            label: '描述',
            prop: 'memo',
            span: 24
          }
        ]
      }
    }
  },
  computed: {
    currentAssetId() {
      return this.Table.currentRowData.id;
    },
    assetUrl() {
      let url = assetEditUrl;
      if (this.innerDrawer) {
        if (this.deviceTypeDrawer) {
          url = assetAddUrl;
        }
      }
      return url;
    },
    contentHeight() {
      return this.$store.state.digitalPark.contentHeight + 'px';
    },
    Table() {
      return this.$refs[this.tableOptions.ref];
    },
    // 查询列表发送的数据
    deviceListParam() {
      let { catalog, spaceId, ...extraModel } = this.searchModel

      let res = { assetVo: Object.assign({ kind: DEVICE.text }, extraModel) }

      if (this.catalogs.length) {
        res.catalogs = this.catalogs
      }
      if (this.spaceIds.length) {
        res.spaceIds = this.spaceIds
      }
      return res;
    }
  },
  created() {
    this.fetch();
  },
  methods: {
    // 请求连接
    fetch() {
      this.fetchDeviceList();
      this.fetchSpaceTree();
    },
    // 加载设备列表
    fetchDeviceList(page) {
      this.load = true;
      let url = page ? `${getDeviceListUrl}?page=${page}` : getDeviceListUrl;
      return new Promise((resolve, reject) => {
        this.$axios({
          url,
          method: "POST",
          data: this.deviceListParam
        }).then(res => {
          this.load = false;
          this.$refs[this.deviceInfoTable.ref].setData(res.rows);
          this.$refs[this.deviceInfoTable.ref].setTotal(res.total);
          // 默认选中第一个
          this.$refs[this.deviceInfoTable.ref].setCurrentRow(0);
          resolve(res);
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 搜索form更多
    searchFormMore() {
      let moreGroup = this.$refs[this.searchForm.ref].getGroupByProp('more');
      moreGroup.hide ? moreGroup.hide = false : moreGroup.hide = true
    },
    // 搜索form提交
    searchFormSubmit(model, done) {
      this.fetchDeviceList().then(res => {
        done();
      })
    },
    // 设备列表翻页
    handlePagination(pageSize, currentPage, $table) {
      this.pageCurrent = currentPage;
      this.fetchDeviceList(currentPage);
    },
    // 自定义跳转
    pageChange(pagenum) {
      this.$refs[this.deviceInfoTable.ref].setCurrentPage(Number(pagenum))
    },
    // 设备列表行点击
    deviceRowClick(row) {
      if (row) {
        this.$axios.get(getMonitorListUrl + row.id).then(res => {
        })
      }
    },
    // 监控列表行点击
    monitorRowClick(row) {
      if (row) {
        this.getDetailMaintain(row.id);
      } else {
        this.clearDetailMaintain();
      }
    },

    /**
     * 设备详情 设备维护记录
     */
    getDetailMaintain(id) {
      // 设备详情
      this.getDeviceDetail(id || this.currentAssetId)
    },
    // 设别详情
    getDeviceDetail(id) {
      deviceManageApi.getAsset({
        kind: DEVICE.text,
        id
      }).then(res => {
        this.deviceDetailModel = res.data;
      }).catch(err => {
        this.deviceDetailModel = {};
      })
    },
    // 清空
    clearDetailMaintain() {
      this.deviceDetailModel = {};
    },

    /**
     * 根据node获取ids
     */
    getIdsByNode(arr, node, childrenKey = 'childNodes', idKey = 'id') {
      arr.push(node[idKey]);
      if (node[childrenKey] && Object.prototype.toString.call(node[childrenKey]) === '[object Array]') {
        node[childrenKey].forEach((item) => {
          this.getIdsByNode(arr, item, idKey);
        });
      }
    },

    /**
     * 监控列表操作
     */
    // 编辑 
    edit(row) {
      console.log("edit -> row", row)
    },
    // 监测数据
    monitorData(row) {
      console.log("monitorData -> row", row)
    },

    /**
     * 设备信息抽屉操作
     */
    // 新增提交
    addDeviceNext(model, done) {
      this.deviceInfoModel = {};
      this.getPropsByTagName(this.addModel.typeName).finally(() => {
        done();
      })
    },
    // 编辑提交
    // TODO 设备信息编辑传参修改
    deviceInfoSubmit(model, done) {
      let data = Object.assign({}, this.addModel, this.deviceInfoModel);

      // 保管人员 和 维修部门特殊修改
      data['kind'] = DEVICE.text
      data['using_department.id'] = data.using_department
      data['keepers.id'] = data.keepers

      delete data.keepers
      delete data.using_department

      this._axiosFormData(this.assetUrl, data).then(res => {
        this.$message.success('操作成功');
        // 弹出编辑抽屉
        this.innerDrawer = false;
        this.deviceTypeDrawer = false;
      }).finally(() => {
        done();
      })
    },

    // 根据设备类型获取特定props
    getPropsByTagName(typeName, flag) {
      return new Promise((resolve, reject) => {
        deviceManageApi.getFormProperty({
          kind: DEVICE.text,
          typeName
        }).then(res => {
          // 拿到返回的数据进行处理
          let extraForms = res.map(item => {
            this.deviceInfoModel[item.name] = item.value;
            return {
              label: item.caption,
              prop: item.name,
            }
          })
          // 添加额外的forms属性
          this.deviceInfoForm.forms = this.deviceInfoForms.concat(extraForms);
          // 弹出编辑抽屉
          this.innerDrawer = true;
          resolve();
        }).catch(err => reject(err));
      })
    },
    //Form Data形式传递参数
    _axiosFormData(url, data, method = 'post') {
      return this.$axios({
        url,
        method,
        data,
        transformRequest: [function (data) {
          let ret = ''
          for (let key in data) {
            let item = data[key];
            if (typeof item === 'undefined' || item == null) {
              item = '';
            }
            if (item instanceof File) {
              ret += encodeURIComponent(key) + '=' + item + '&'
            } else {
              ret += encodeURIComponent(key) + '=' + encodeURIComponent(item) + '&'
            }
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    },
    delInfo() {
      return this.$confirm("确认是否删除?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
    },
  },
  watch: {
  },
}
</script>
<style lang="less" scoped>
.searchForm {
  /deep/ .el-button {
    width: 75px;
  }
}
.common-aside {
  position: fixed;
  width: @menuWidth;
  margin-bottom: 0;
}
.common-container {
  // margin-left: 20px;
  margin-left: @menuWidth - 10px + (4 * @contentMarginLeft);
}
</style>
