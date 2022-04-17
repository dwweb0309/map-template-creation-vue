<template>
  <v-menu offset-y z-index="1001">
    <template v-slot:activator="{ on, attrs }">
      <v-avatar
        class="ml-8"
        size="36"
      >
        <v-icon v-bind="attrs" v-on="on" large :dark="dark">{{ mdiAccountCircle }}</v-icon>
      </v-avatar>
    </template>
    <v-card width="180">
      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ user.username }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-list dense nav>
        <v-list-item to="/profile/password-reset">
          <v-list-item-icon>
            <v-icon>{{ mdiAccount }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Profile
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="logout">
          <v-list-item-icon>
            <v-icon>{{ mdiLogout }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            Log out
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
import { mdiAccount, mdiAccountCircle, mdiLogout } from '@mdi/js'
import { mapState, mapActions } from 'vuex'

export default {
  props: ['dark'],
  data: () => ({
    mdiAccount, mdiAccountCircle, mdiLogout
  }),
  computed: {
    ...mapState('auth', ['user'])
  },
  methods: {
    ...mapActions('auth', ['logout'])
  }
}
</script>
