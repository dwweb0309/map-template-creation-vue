<template>
  <div>
    <v-app-bar
      tile
      elevation="1"
      outlined
      app
      clipped-left
    >
      <div>
        <logo-component></logo-component>
      </div>
    </v-app-bar>
    <v-navigation-drawer app clipped permanent width="300">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6 py-2">
            Profile Information
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
      >
        <v-list-item
          three-line
          v-for="item in items"
          :key="item.title"
          :to="item.to"
        >
          <v-list-item-icon class="mr-2">
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle v-html="item.description"></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <v-stepper alt-labels flat width="800" class="mx-auto">
          <v-stepper-header>
            <template v-for="(item, i) in items">
              <v-stepper-step :step="i + 1" :key="`stepper-${i}`">
                {{ item.title }}
              </v-stepper-step>
              <v-divider v-if="i + 1 != items.length" :key="`divider-${i}`"></v-divider>
            </template>
          </v-stepper-header>
        </v-stepper>
        <router-view></router-view>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { mdiLock, mdiContacts, mdiHeartOutline } from '@mdi/js'
import LogoComponent from '../components/LogoComponent.vue'

export default {
  components: {
    LogoComponent
  },
  data: () => ({
    mdiLock,
    mdiContacts,
    mdiHeartOutline,
    
    items: [
      {
        title: 'Organisation Information',
        to: '/profile/organisation-information',
        icon: mdiHeartOutline,
        description: 'Branding thought-leader angel investor. Protocol writing, inflated B2B SaaS.'
      }, {
        title: 'Organisation Contact',
        to: '/profile/organisation-contact',
        icon: mdiContacts,
        description: 'Branding thought-leader angel investor. Protocol writing, inflated B2B SaaS.'
      }, {
        title: 'Change Password',
        to: '/profile/password-reset',
        icon: mdiLock,
        description: 'Branding thought-leader angel investor. Protocol writing, inflated B2B SaaS.'
      }, {
        title: 'Subscription',
        to: '/profile/subscription',
        icon: mdiHeartOutline,
        description: 'Branding thought-leader angel investor. Protocol writing, inflated B2B SaaS.'
      }, {
        title: 'Payment Method',
        to: '/profile/payment-method',
        icon: mdiHeartOutline,
        description: 'Branding thought-leader angel investor. Protocol writing, inflated B2B SaaS.'
      }, {
        title: 'Contribution',
        to: '/profile/contribution',
        icon: mdiHeartOutline,
        description: 'Branding thought-leader angel investor. Protocol writing, inflated B2B SaaS.'
      }
    ]
  }),
  mounted() {
  },
  methods: {
  }
}
</script>
