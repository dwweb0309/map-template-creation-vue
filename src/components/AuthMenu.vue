<template>
  <div>
    <router-link to="/auth/signin" class="menu ml-4">Login</router-link>
    <v-btn to="/auth/signup" outlined rounded color="white" class="ml-4">Sign Up</v-btn>
  </div>
</template>
<style scoped>
  .menu {
    color: white;
    text-decoration: none;
  }
</style>