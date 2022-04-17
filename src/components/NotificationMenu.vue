<template>
  <v-menu offset-y z-index="1001" :close-on-content-click="false">
    <template v-slot:activator="{ on, attrs }">
      <v-badge
        :content="notifications.length"
        overlap
      >
        <v-btn icon small class="ml-8">
          <v-icon v-bind="attrs" v-on="on">
            {{ mdiBellOutline }}
          </v-icon>
        </v-btn>
      </v-badge>
    </template>
    <v-card width="300">
      <v-card-title>
        <div>Notifications</div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-sheet v-for="(notification, i) in notifications" :key="i" color="#E9EDF2" class="d-flex my-2 pa-2">
          <div>
            <v-icon class="mr-1 mt-1">{{ notifIcon(notification.type) }}</v-icon>
          </div>
          <div>
            <div class="pb-2">{{ notification.body }}</div>
            <span style="color: #59657C;">{{ notification.when }}</span>
          </div>
        </v-sheet>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
import { mdiBellOutline } from '@mdi/js'
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
    mdiBellOutline
  }),
  computed: {
    ...mapState('notification', ['notifications'])
  },
  mounted() {
    this.getNotifications()
  },
  methods: {
    ...mapActions('notification', ['getNotifications']),
    notifIcon(type) {
      if (type === 'settings') return 'mdi-cog-outline'
      if (type === 'event') return 'mdi-calendar-month-outline'
    }
  }
}
</script>
