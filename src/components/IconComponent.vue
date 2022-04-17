<template>
  <img
    :src="require(`../assets/icons/${src}.svg`)"
    contain
    :width="width"
    :height="height"
    :class="{ 'ml-1': right, 'mr-1': left }"
  />
</template>
<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    width: {
      type: String,
      required: false
    },
    height: {
      type: String,
      required: false
    },
    left: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    }
  }
}
</script>
