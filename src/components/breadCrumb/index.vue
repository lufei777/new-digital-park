<template>
  <div class="bread-crumb">
    <el-breadcrumb separator="/">
      <transition-group name="fade-transform" mode="out-in" appear>
        <template v-for="(item) in breadcrumb">
          <el-breadcrumb-item :key="item.path">
            <a href="#" @click.prevent="toPath(item,$event)">{{item.title}}</a>
          </el-breadcrumb-item>
        </template>
      </transition-group>
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
      let hasDefaultPage = false;
      this.breadcrumb.length = 0;
      // 从路由中获取matched
      // console.log(this.$route.matched)
      let vibe = this.$route.matched.find(item=>item.path=='/vibe-web')
      if(vibe){
        this.breadcrumb=[]
      }
      this.$route.matched.forEach((route, index) => {
        if (route.meta.title) {
          if (route.path == "/digitalPark/defaultPage") hasDefaultPage = true;
          this.breadcrumb.push({
            title: route.meta.title,
            redirect: route.redirect,
            path: route.path
          });
        }
      });
      // 如果有默认建设页，则只保留改页面
      /* if (hasDefaultPage) {
        this.breadcrumb.length = 0;
        this.breadcrumb.push({
          title: "建设中",
          path: "/digitalPark/defaultPage"
        });
      } */
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
      // console.log(this.$route);
      this.getBreadCrumb();
    }
  }
};
</script>
<style lang='less' scoped>
</style>
