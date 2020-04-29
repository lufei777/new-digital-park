<template>
  <el-image :fit="fit" :src="imgSrc" :preview-src-list="previewSrcList" @load="load" @error="error">
    <template slot="placeholder" slot-scope="scope">
      <slot name="placeholder" :scope="scope"></slot>
    </template>
    <template slot="error" slot-scope="scope">
      <slot name="error" :scope="scope"></slot>
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