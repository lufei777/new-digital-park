<template>
  <div class="common-com-upload">
    <el-upload
      ref="commonComUpload"
      :multiple="uploadConfig.multiple || true"
      :action="uploadConfig.url"
      :limit="uploadConfig.limit"
      :accept="uploadConfig.accept"
      :with-credentials="true"
      :drag="uploadConfig.drag"
      :on-success="onSuccess"
      :on-error="onError"
      :auto-upload="uploadConfig.autoUpload"
    >
      <!-- 是否拖拽 -->
      <template v-if="uploadConfig.drag">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
      </template>
      <template v-else>
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      </template>

      <!-- 是否自动上传，不自动上传需要有上传按钮 -->
      <template v-if="!uploadConfig.autoUpload">
        <el-button type="success" size="small" @click.stop="submitUpload">开始上传</el-button>
      </template>

      <div slot="tip" class="el-upload__tip">{{uploadConfig.tip}}</div>
    </el-upload>
  </div>
</template>
<script>
export default {
  props: {
    uploadConfig: {
      type: Object,
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    //点击上传按钮
    submitUpload() {
      this.$refs.commonComUpload.submit();
    },
    onSuccess(response, file, fileList) {
      this.isType(this.uploadConfig.onSuccess, Function) &&
        this.uploadConfig.onSuccess(response, file, fileList);
    },
    onError(err, file, fileList) {
      this.isType(this.uploadConfig.onError, Function) &&
        this.uploadConfig.onError(err, file, fileList);
    },
    isType(value, type) {
      return value instanceof type;
    }
  },
  computed: {
    uploadFileConfig() {
      return this.uploadConfig;
    }
  }
};
</script>
<style lang='less' scoped>
</style>