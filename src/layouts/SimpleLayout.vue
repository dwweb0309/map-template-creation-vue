<template>
  <div class="d-flex flex-column flex-grow-1">
    <v-app-bar color="#222628" flat height="100px" class="px-12">
      <div class="tool-bar-container">
        <logo-component @click.native="$router.push('/')" />
        <v-spacer></v-spacer>
        <menu-horizontal></menu-horizontal>
        <user-menu v-if="isAuth" dark></user-menu>
        <auth-menu v-else></auth-menu>
      </div>
    </v-app-bar>
    <router-view></router-view>
    <div class="footer px-12">
      <div class="footer-container">
        <div class="d-flex align-center justify-space-between">
          <logo-component />
          <div class="d-flex justify-space-around">
            <router-link to="/" class="mx-4">About Us</router-link>
            <router-link to="/" class="mx-4">Subscription</router-link>
            <router-link to="/" class="mx-4">Product</router-link>
            <router-link to="/" class="mx-4">Support</router-link>
          </div>
          <div>
            <img src="/images/footer/facebook.svg" class="ml-8" />
            <img src="/images/footer/insta.svg" class="ml-8" />
            <img src="/images/footer/twitter.svg" class="ml-8" />
            <img src="/images/footer/youtube.svg" class="ml-8" />
          </div>
        </div>
        <hr>
        <div class="d-flex align-center justify-space-between py-10 bottom">
          <div>© 2021 Propedia. All Rights Reserved.</div>
          <div>
            <span class="ml-4">Terms & Conditions</span>
            <span class="ml-4">Privacy Policy</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LogoComponent from '../components/LogoComponent.vue'
import MenuHorizontal from '../components/MenuHorizontal.vue'
import UserMenu from '../components/UserMenu.vue'
import AuthMenu from '../components/AuthMenu.vue'

import { mapGetters } from 'vuex'

export default {
  components: {
    LogoComponent,
    MenuHorizontal,
    UserMenu,
    AuthMenu
  },
  computed: {
    ...mapGetters('auth', ['isAuth'])
  }
}
</script>

<style scoped>
  .tool-bar-container,
  .footer-container {
    max-width: 1400px;
    margin: 0 auto;
    flex-grow: 1;
  }

  .tool-bar-container {
    display: flex;
    align-items: center;
  }

  .footer {
    background: #222628;
  }
  .footer .bottom {
    color: #C1C4D2;
    font-size: 14px;
  }
</style>