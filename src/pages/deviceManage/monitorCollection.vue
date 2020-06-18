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
              :load="load || monitorTableLoad"
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
                <el-button :size="size" type="text" @click="edit(row)">修改</el-button>
                <!-- <el-button :size="size" type="text" @click="monitorData(row)">监测数据</el-button> -->
              </template>
            </z-table>
          </div>

          <div class="panel">
            <!-- 设备详情，设备维修记录 -->
            <z-form
              :load="load || monitorTableLoad"
              v-model="deviceDetailModel"
              :options="deviceDetailForm"
            ></z-form>
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
      size="50%"
      destroy-on-close
      :append-to-body="true"
      :visible.sync="innerDrawer"
      :before-close="innerHandleClose"
    >
      <div style="display:flex;justify-content:center;">
        <z-form
          v-model="deviceInfoModel"
          :ref="deviceInfoForm.ref"
          :options="deviceInfoForm"
          @submit="deviceInfoSubmit"
        >
          <template #time_interval_appendSlot="{disabled,size}">
            <el-select
              style="width:60px !important;"
              :disabled="disabled"
              :size="size"
              v-model="deviceInfoModel.unit"
            >
              <template
                v-for="item in  [{label: 'm',value: 'm'},{label: 's',value: 's'},{label: 'h',value: 'h'}]"
              >
                <el-option :key="item.label" :label="item.label" :value="item.value"></el-option>
              </template>
            </el-select>
          </template>
        </z-form>
      </div>
    </el-drawer>
  </div>
</template>

<script>
import CommonFun from 'utils/commonFun'
import { AssetType, AssetKind } from 'utils/dictionary';
import commonApi from 'api/common';
import deviceManageApi from 'api/deviceManage';
import { validNotChinese } from 'utils/validate';
import { getUserInfo } from 'utils/auth';

const DEVICE = AssetType.PROBE;
// 新增设备
let assetAddUrl = '/vibe-web/asset/assetAdd';
// 编辑设备
let assetEditUrl = '/vibe-web/asset/assetEdit';

const getValueUnit = (unit, value) => {
  if (!unit) return value;
  let unitType = unit.indexOf('[') != -1 ? 'enum' :
    unit.indexOf('|') != -1 ? 'bool' : 'input';
  let unitObj = null;
  switch (unitType) {
    case 'enum':
      unitObj = {};
      let unitArr = unit.replace(/\[/g, "").replace(/\]/g, "").split(',');

      for (let i = 0, len = unitArr.length; i < len; i++) {
        let item = unitArr[i];
        let itemArr = item.split('|');
        if (typeof itemArr[1] == 'undefined') {
          unitObj[itemArr[0]] = itemArr[1];
        } else {
          unitObj[itemArr[1]] = itemArr[0];
        }
      }
      return unitObj[value]
    case 'bool':
      unitObj = unit.split('|');
      return unitObj[value];
  }
  return value;
}

export default {
  data() {
    const userInfo = getUserInfo();
    return {
      pageCurrent: 1,
      // 设备树和设备List的loading
      asideLoad: false,
      load: false,
      monitorTableLoad: false,
      // 设备新增抽屉
      deviceTypeDrawer: false,
      // 设备详情信息抽屉
      innerDrawer: false,

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
                dicQuery: { kind: DEVICE.text },
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
      // 主页监控项List
      tableOptions: {
        ref: 'table',
        operation: {
          width: 150
        },
        data: [],
        columnConfig: [
          {
            label: '状态',
            prop: 'state'
          },
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
            label: '监测值',
            prop: 'valueStr'
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
          height: '%',
          pagination: {
            handler: this.handlePagination,
            layout: ' pager, ->, slot',
            pagerCount: 5,
            small: true
          }
        }
      },

      // 新增设备表单
      addModel: {},
      deviceTypeForm: {
        ref: 'deviceTypeForm',
        menuBtn: false,
        itemSpan: 24,
        width: '80%',
        forms: [
          {
            label: "类别",
            prop: "kind",
            type: 'select',
            clearable: true,
            dicUrl: deviceManageApi.assetKindList,
            props: {
              label: 'text',
              value: 'id'
            },
            rules: {
              required: true
            },
            change: ({ value }) => {
              this.addModel.typeName = "";
              deviceManageApi.assetTypeList({ id: value }).then(res => {
                this.$refs[this.deviceTypeForm.ref].setColumnByProp('typeName', {
                  dicData: res
                })
              })
            }
          },
          {
            label: '资产类型',
            prop: 'typeName',
            type: 'select',
            filterable: true,
            clearable: true,
            dicData: [],
            props: {
              label: 'text',
              value: 'name'
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
      // 监测器信息表单
      deviceInfoModel: {},
      // 设备信息默认表单
      deviceInfoForms: [
        {
          label: 'id',
          prop: 'id',
          hide: true
        },
        {
          label: '监测器类别',
          prop: 'kind',
          type: 'select',
          dicData: AssetKind,
          disabled: true,
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
          label: '监测间隔',
          prop: 'time_interval',
          appendSlot: "time_interval_appendSlot",
          rules: {
            required: true
          }
        },
        {
          label: '分类',
          prop: 'catalogId',
          type: 'select',
          dicUrl: deviceManageApi.queryMonitorCatalogId,
          dicQuery: {
            catalog: 2001
          },
          props: {
            label: 'name',
            value: 'id'
          },
          rules: {
            required: true
          }
        },
        {
          label: '服务',
          prop: 'source',
          type: 'select',
          props: {
            label: 'text',
            value: 'id'
          }
        },
        {
          label: '结果转换表达式',
          prop: 'transform',
          width: 115
        },
        {
          label: '警告条件表达式',
          prop: 'warn_cond',
          width: 115
        }
      ],
      deviceInfoForm: {
        ref: 'deviceInfoForm',
        itemSpan: 8,
        width: '95%',
        labelWidth: 110,
        forms: []
      },

      // 详情
      deviceDetailModel: {},
      deviceDetailForm: {
        menuBtn: false,
        textMode: true,
        labelWidth: 115,
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
            label: '分类',
            prop: 'kind'
          },
          {
            label: '服务',
            prop: 'serviceCaption'
          },
          {
            label: '监测间隔',
            prop: 'time_interval'
          },
          {
            label: '监测间隔单位',
            prop: 'unit'
          },
          {
            label: '监测值',
            prop: 'value',
            formatter: (row, value) => {
              return getValueUnit(row.unit, value);
            }
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
    parentId() {
      let parentId = this.deviceTable.currentRowData.id
      return parentId;
    },
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
    deviceTable() {
      return this.$refs[this.deviceInfoTable.ref];
    },
    // 查询列表发送的数据
    deviceListParam() {
      let { catalog, spaceId, ...extraModel } = this.searchModel

      let res = { assetVo: Object.assign({ kind: 'DEVICE' }, extraModel) }

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
    },
    // 加载设备列表
    fetchDeviceList(page) {
      this.load = true;
      return new Promise((resolve, reject) => {
        deviceManageApi.searchDevices(this.deviceListParam, { page: page }).then(res => {
          this.$refs[this.deviceInfoTable.ref].setData(res.rows);
          this.$refs[this.deviceInfoTable.ref].setTotal(res.total);

          // 默认选中第一个
          this.$refs[this.deviceInfoTable.ref].setCurrentRow(0);
          resolve(res);
        }).catch(err => {
          reject(err)
        }).finally(_ => {
          this.load = false;
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
      this.fetchDeviceList().finally(res => {
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
        this.monitorTableLoad = true;
        deviceManageApi.queryAssetList({}, { id: row.id }).then(res => {
          this.setMonitorTable(res.rows, res.total);
          this.$nextTick(() => {
            this.Table.setCurrentRow(0);
          })
        }).catch(err => {
          console.error(err);
        }).finally(() => {
          this.monitorTableLoad = false;
        })
      } else {
        this.setMonitorTable([], 0);
        this.$nextTick(() => {
          this.Table.setCurrentRow(0);
        })
      }
    },
    setMonitorTable(data, total) {
      this.Table.setData(data);
      this.Table.setTotal(total);
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
     * 监测器详情
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
     * 监控列表操作
     */
    // 删除
    bulkDel(selectedData) {
      let ids = selectedData.map(item => item.id).join(',');
      this.delInfo().then(_ => {
        deviceManageApi.deleteAsset({ ids }).then(res => {
          this.deviceRowClick({ id: this.parentId });
        }).catch(err => {
          console.error(err);
          this.$message.error('删除失败');
        })
      })
    },
    // 编辑 
    edit(row) {
      let parentIdObj = { parentId: this.parentId }

      deviceManageApi.toAssetEdit({ kind: row.kind }, { id: row.id }).then(res => {
        this.deviceInfoModel = Object.assign(res.assetVo, parentIdObj);
      })

      this.getPropsByTagName({ kind: row.kind, typeName: row.typeName })
    },
    // 监测数据
    monitorData(row) {
    },

    /**
     * 新增监测器抽屉操作
     */
    // 新增提交
    addDeviceNext(model, done) {
      let parentIdObj = { parentId: this.parentId }
      // 拿取新增默认反选参数
      deviceManageApi.toAssetAdd(Object.assign({}, this.addModel, parentIdObj)).then(res => {
        this.deviceInfoModel = Object.assign(res, parentIdObj);
      })
      // 拿取新增属性
      this.getPropsByTagName({
        typeName: this.addModel.typeName,
        kind: AssetKind[this.addModel.kind].value
      }).finally(() => {
        done();
      })
    },
    // 新增编辑提交
    deviceInfoSubmit(model, done) {
      // 添加单位
      model.time_interval += model.unit || 'm';
      this._axiosFormData(this.assetUrl, model).then(res => {
        this.$message.success('操作成功');
        // 弹出编辑抽屉
        this.innerDrawer = false;
        this.deviceTypeDrawer = false;

        // 刷新监测器列表
        this.deviceRowClick({ id: this.parentId });
      }).finally(() => {
        done();
      })
    },
    // inner关闭回调
    innerHandleClose(done) {
      this.$refs[this.deviceInfoForm.ref].resetForm();
      this.$nextTick(() => {
        done();
      })
    },

    // 根据设备类型获取特定props
    getPropsByTagName(params) {
      return new Promise((resolve, reject) => {
        deviceManageApi.getFormProperty(params).then(res => {
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

          this.$nextTick(() => {
            deviceManageApi.addServiceList(params).then(res => {
              this.$refs[this.deviceInfoForm.ref].setColumnByProp('source', {
                dicData: res
              });
            })
          })
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
    //根据node获取ids
    getIdsByNode(arr, node, childrenKey = 'childNodes', idKey = 'id') {
      arr.push(node[idKey]);
      if (node[childrenKey] && Object.prototype.toString.call(node[childrenKey]) === '[object Array]') {
        node[childrenKey].forEach((item) => {
          this.getIdsByNode(arr, item, idKey);
        });
      }
    }
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
