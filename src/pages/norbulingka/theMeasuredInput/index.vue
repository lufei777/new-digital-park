<template>
  <div class="panel-container">
    <div class="panel">
      <!-- 导航菜单 -->
      <div
        class="nav"
        v-if="JSON.stringify($route.query).length==2"
      >
        <el-menu
          class="el-menu-demo"
          :default-active="$route.path"
          mode="horizontal"
          @select="handleSelect"
          router
        >
          <el-menu-item index="/summaryinfo">汇总信息</el-menu-item>
          <el-menu-item index="/ontology">本体情况</el-menu-item>
          <el-menu-item index="/analysis">病害分析</el-menu-item>
          <el-menu-item index="/construction">施工情况</el-menu-item>
          <el-menu-item index="/archaeological">考古发掘</el-menu-item>
          <el-menu-item index="/tourists">游客情况</el-menu-item>
          <el-menu-item index="/others">其他</el-menu-item>
        </el-menu>

      </div>
      <!-- 渲染区域占位符 -->
      <router-view></router-view>
    </div>

  </div>
</template>  
<script>
export default {
  data() {
    return {
      // 控制导航栏的显示和隐藏
      // off:'true',
      // 默认激活索引
      // activeIndex: "/summaryinfo",
      //   activeIndex2: "1",
      model: {}
      // 表单
    };
  },
  created() {},
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
};
</script>
<style lang="less" scoped>
.nav {
  margin-bottom: 15px;
}
</style>