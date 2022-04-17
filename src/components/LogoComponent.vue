<template>
  <img
    :src="require('../assets/logo_250x150.svg')"
    :height="height"
    class="cursor-pointer"
    @click="$router.push('/')"
  />
</template>
<script>
export default {
  props: {
    height: {
      type: Number,
      required: false,
      default: 100
    }
  }
}
</script>