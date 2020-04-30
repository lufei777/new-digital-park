<template>
  <el-image :fit="fit" :src="imgSrc" :preview-src-list="previewSrcList" @load="load" @error="error">
    <template slot="placeholder">
      <!-- <slot name="placeholder" :scope="scope"></slot> -->
      <span class="dot">加载中...</span>
    </template>
    <template slot="error">
      <i class="el-icon-picture-outline"></i>
      <!-- <slot name="error" :scope="scope"></slot> -->
    </template>
  </el-image>
</template>
<script>
export default {
  name: 'zImg',
  props: {
    value: {},
    alt: {},
    fit: {
      default: 'contain'
    },
    'referrer-policy': {},
    lazy: {
      default: false
    },
    'scroll-container': {},
    'z-index': { default: 2000 }
  },
  data() {
    return {}
  },
  computed: {
    isArray(value) {
      return Array.isArray(value);
    },
    imgSrc() {
      return this.isArray ? this.value[0] : this.value
    },
    previewSrcList() {
      return this.isArray ? this.value : [this.value]
    }
  },
  methods: {
    load(...args) {
      this.$emit('load', ...args);
    },
    error(...args) {
      this.$emit('error', ...args);
    }
  }
}
</script>
<style lang="less" scoped>
.dot {
  font-size: 12px;
  color: #ccc;
}
</style>