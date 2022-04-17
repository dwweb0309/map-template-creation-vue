<template>
  <div>
    <a href="#" class="menu">About Us</a>
    <a href="#" class="menu ml-4">Subscription</a>
    <a href="#" class="menu ml-4">Product</a>
    <a href="#" class="menu ml-4">Comunity</a>
    <router-link to="/contact-us" class="menu ml-4">Contact Us</router-link>
    <a href="#" class="menu ml-4">
      <v-icon color="white">{{ mdiMagnify }}</v-icon>
      Search
    </a>
  </div>
</template>

<script>
import { mdiMagnify } from '@mdi/js'

export default {
  data: () => ({
    mdiMagnify
  }),
}
</script>

<style scoped>
  .menu {
    color: white;
    text-decoration: none;
  }
</style>