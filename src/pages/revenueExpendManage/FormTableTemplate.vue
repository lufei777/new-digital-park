<template>
  <div class="panel-container">
    <div class="panel">
      <slot name="form"></slot>
    </div>

    <div class="panel">
      <slot name="table"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormTableTemplate",
  data() {
    return {};
  }
};
</script>
