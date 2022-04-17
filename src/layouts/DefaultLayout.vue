<template>
  <div
    class=""
  >
    <!-- Toolbar -->
    <v-app-bar
      color="white"
      tile
      elevation="1"
      outlined
      app
      clipped-left
      style="z-index: 1001;"
    >
      <div>
        <logo-component></logo-component>
      </div>

      <v-spacer />

      <div v-if="isListView || isMapView">
        <v-btn class="mr-1" :color="isListView ? 'primary' : '#CCC'" dark to="/view/list"><v-icon>{{ mdiViewList }}</v-icon>List View</v-btn>
        <v-btn :color="isMapView ? 'primary' : '#CCC'" dark to="/view/map"><v-icon>{{ mdiMap }}</v-icon>Map View</v-btn>
      </div>
      <!-- <v-chip
        v-model="viewMode"
        outlined
        link
      >
        <span :style="viewMode ? 'order: 1; margin-left: 8px;' : 'order: 0; margin-right: 8px;'">{{ viewMode ? 'List View' : 'Map View' }}</span>
        <v-btn rounded color="primary" dark small elevation="0" @click="viewMode = !viewMode" :style="viewMode ? 'order: 0;' : 'order: 1;'">{{ viewMode ? 'Map View' : 'List View' }}</v-btn>
      </v-chip> -->
      <v-spacer />

      <div>
        <v-badge
          :content="1"
          :value="1"
          overlap
        >
          <v-icon>
            {{ mdiHeartOutline }}
          </v-icon>
        </v-badge>
        <notification-menu />
        <user-menu />
      </div>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { mdiHeartOutline, mdiMap, mdiViewList } from '@mdi/js'

import LogoComponent from '../components/LogoComponent.vue'
import UserMenu from '../components/UserMenu.vue'
import NotificationMenu from '../components/NotificationMenu.vue'

import { mapActions } from 'vuex'

export default {
  components: {
    LogoComponent,
    UserMenu,
    NotificationMenu
  },
  data: () => ({
    mdiHeartOutline,
    mdiMap,
    mdiViewList,

    drawer: true,
    showSearch: false,
    viewMode: false
  }),
  computed: {
    isMapView() {
      return this.$route.name === 'map-view'
    },
    isListView() {
      return this.$route.name === 'list-view'
    }
  },
  methods: {
    ...mapActions('auth', ['logout']),
    async _logout() {
      
    }
  }
}
</script>