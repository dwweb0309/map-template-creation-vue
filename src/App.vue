<template>
  <v-app>
    <!-- Layout component -->
    <!-- <component :is="currentLayout"> -->
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    <!-- </component> -->
  </v-app>
</template>

<script>
// import { mapState } from 'vuex'

// import config from './configs'

export default {
  components: {
  },
  computed: {
    // ...mapState({
      // isPageLoading: (state) => state.app.isPageLoading,
      // isAppReady: (state) => state.auth.isAppReady
    // }),
    // isRouterLoaded: function() {
    //   if (this.$route.name !== null) return true

    //   return false
    // },
    currentLayout: function() {
      return (this.$route.meta.layout || 'simple') + 'Layout'
    }
  },
  head: {
    link: [
      // adds config/icons into the html head tag
      // ...config.icons.map((href) => ({ rel: 'stylesheet', href }))
    ]
  },
  mounted() {
    // document.getElementById('loading').style.display = 'none'
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
