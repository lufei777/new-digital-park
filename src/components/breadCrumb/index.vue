<template>
  <div class="bread-crumb">
    <el-breadcrumb separator="/">
      <template v-for="(item) in breadcrumb">
        <el-breadcrumb-item :key="item.path">
          <a href="#" @click.prevent="toPath(item,$event)">{{item.title}}</a>
        </el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<script>
export default {
  data() {
    return {
      breadcrumb: []
    };
  },
  created() {
    this.getBreadCrumb();
  },
  methods: {
    getBreadCrumb() {
      this.breadcrumb.length = 0;
      // 从路由中获取matched
      this.$route.matched.forEach((route, index) => {
        if (route.meta.title) {
          this.breadcrumb.push({
            title: route.meta.title,
            redirect: route.redirect,
            path: route.path
          });
        }
      });
      // 添加首页
      /* if (this.breadcrumb[0].title !== "首页") {
        this.breadcrumb = [
          {
            title: "首页",
            path: "/digitalPark/homePage"
          },
          ...this.breadcrumb
        ];
      } */
    },
    toPath(route, e) {
      // 如果有重定向
      let { redirect, path } = route;
      if (redirect) {
        this.$router.push(redirect);
      } else {
        this.$router.push(path);
      }
    }
  },
  watch: {
    $route() {
      console.log(this.$route);
      this.getBreadCrumb();
    }
  }
};
</script>
<style lang='less' scoped>
</style>