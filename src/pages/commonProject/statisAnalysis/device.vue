<template>
  <div>
    <el-table :data="tableData" border width="100%">
      <el-table-column :key="col.prop" :label="col.label" :prop="col.prop" v-for="col in cols"></el-table-column>
      <el-table-column label="操作" prop="option">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" size="mini" type="info">
            <i class="el-icon-edit"></i>
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "DeviceAnalysis",
  data() {
    return {
      tableData: [],
      cols: [],
      id: ""
    };
  },
  mounted() {
    let data = {
      code: "ok",
      cols_list: [
        { prop: "name", label: "名字" },
        { prop: "sex", label: "性别" }
      ],
      each_row: [
        { name: "小李", sex: "男" },
        { name: "小红", sex: "女" }
      ]
    };
    this.cols = [];
    for (var j = 0; j < data.cols_list.length; j++) {
      var obj = {};
      obj.label = data.cols_list[j].label;
      obj.prop = data.cols_list[j].prop;
      this.cols.push(obj);
    }
    console.log(this.cols);
    this.tableData = [];
    for (var i = 0; i < data.each_row.length; i++) {
      this.tableData.push(data.each_row[i]);
    }
    console.log(this.tableData);
  }
};
</script>

<style>
</style>