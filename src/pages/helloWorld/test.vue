<template>
  <div class="test">
    <Table :ref="assetsTableData.ref" :tableConfig="assetsTableData">
      <template slot="custom-top" slot-scope="customTopObj">
        <div>
          <el-button-group>
            <template v-for="col in customTopObj.columnConfig">
              <el-button
                :key="col.prop"
                :type="col.hide ?'danger': 'primary'"
                @click="switchHide(col)"
              >{{col.label}}</el-button>
            </template>
          </el-button-group>
        </div>
      </template>
    </Table>
  </div>
</template>

<script>
import Table from "@/components/Table";
import AssetManageApi from "@/service/api/assetManageApi";
export default {
  name: "Test",
  components: {
    Table
  },
  data() {
      var _this = this;
    return {
        assetsTableData:{
            ref:'assetsTable',
            serverMode:{
                url:AssetManageApi.getAssetList
            },
            columnConfig:[{
                prop:'coding',
                label:'编号',
                fixed:'left',
                hide:false,
                sortable:'custom',
                formatter:function(row,column){
                   return row[column.property] ? row[column.property] : "--";
              },
            },{
                prop:'name',
                label:'名称',
                fixed:'left',
                sortable:'custom',
                hide:false,
                formatter:function(row,column){
                   return row[column.property] ? row[column.property] : "--";
              },
            },{
                prop:'groupName',
                label:'资产组',
                fixed:'left',
                sortable:false,
                hide:false,
                formatter:function(row,column){
                   return row[column.property] ? row[column.property] : "--";
              },
            },{
                prop:'providerName',
                label:'供应商',
                fixed:'right',
                sortable:false,
                hide:false,
                formatter:function(row,column){
                   return row[column.property] ? row[column.property] : "--";
              },
            },{
                prop:'typeName',
                label:'资产类型',
                fixed:'right',
                sortable:false,
                hide:false,
                formatter:function(row,column){
                   return row[column.property] ? row[column.property] : "--";
              },
            },{
                prop:'currentCustodian',
                label:'当前保管人',
                fixed:'right',
                sortable:false,
                hide:false,
                formatter:function(row,column){
                   return row[column.property] ? row[column.property] : "--";
              },
            },{
                prop:'specification',
                label:'规格型号',
                fixed:'right',
                sortable:false,
                hide:false,
                formatter:function(row,column){
                   return row[column.property] ? row[column.property] : "--";
              },
            },{
                prop:'status',
                label:'状态',
                fixed:'right',
                sortable:false,
                hide:false,
                formatter:function(row,column){
                   switch(row[column.property]){
                    case 1:
                        return "闲置";
                        break;
                    case 2:
                        return "在用";
                        break;
                    case 3:
                        return "报修";
                        break;
                    default:
                        return "报废";
                        break;
                   }
              },
            }],
            uiConfig:{
                height:500,
                selection:true,
                searchable:["coding", "name", "groupName", "currentCustodian"],
                pagination:{
                    //是否分页，分页是否自定义
                    layout: "total,->,  sizes, prev, pager, next, jumper",
                    pageSizes: [10, 20, 50]
                },
            },
            btnConfig:{
                prop: "operation",
                label: "列操作",
                fixed: "right",
                btns:[
                    {
                        type: "basic",
                        label: "变更",
                        handler: function(row) {
                            _this.tableEdit(row);
                        }
                    },
                    {
                        type: "basic",
                        label: "调拨",
                        handler: function(row) {
                            _this.tableDel(row);
                        }
                    },
                    {
                        type:'dropDown',
                        icon: "el-icon-more",
                        showMore: false,
                        menus:[
                            {
                              label: "报修",
                                handler: function(row) {
                                    console.log("报修", row);
                                }  
                            },
                            {
                                label: "报废",
                                handler: function(row) {
                                    console.log("报废", row);
                                }
                            },
                            {
                            label: "删除",
                            handler: function(scope) {
                                AssetManageApi.delAsset({
                                assetId:scope.row.id
                                }).then(res=>{
                                scope._self.refreshTable();
                                _this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                })
                                })
                            }
                          }
                        ]
                    }
                ]
            },
            tableMethods: {
                rowClick: _this.assetsRowClick,
                rowDblclick: _this.assetsRowDbClick,
                sortChange: function(sortObj, $table) {
                    //这里返回请求后的排序数组 return []
                    AssetManageApi.getAssetList({
                    coding: "",
                    name: "",
                    groupName: "",
                    orderType: sortObj.order === "ascending" ? 1 : 0, //0降序1升序
                    orderBy: "create_time",
                    pageNum: this.curPage,
                    pageSize: 10
                    }).then(res => {
                    $table.setTableData(res.list);
                    });
                }
            }

        }
    };
  },
  methods: {
    switchHide(col) {
      let tableRefs = this.$refs;
      if (col.hide) {
        this.$set(col, "hide", !col.hide);
      } else {
        this.$set(col, "hide", true);
      }
      tableRefs[this.assetsTableData.ref].doLayout();
    },
    assetsRowClick(row,column,e){

    },
    assetsRowDbClick(row,column,e){
      this.isEdit=true
      this.$router.push(`/addAsset?assetId=${row.id}&typeId=${row.typeId}`)
    },
    async getApi() {
      let res = await AssetManageApi.getAssetList()
    },
  },
  mounted() {
      this.getApi()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
</style>
