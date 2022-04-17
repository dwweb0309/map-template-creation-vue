<template>
  <div>
    <div class="text-h6">Choise subscription plan</div>
    <v-row justify="center">
      <v-col v-for="(plan, i) in plans" :key="i" cols="12" lg="3" md="4">
        <v-card :dark="plan.recommended">
          <v-card-text>
            <v-list>
              <v-list-item>
                <v-list-item-content class="text-center">
                  <img :src="`/images/plan/${plan.name}.svg`" height="40" />
                  <p class="text-h5 font-weight-bold">{{ plan.name }}</p>
                  <div class="font-weight-bold"><span class="text-h4">${{ plan.price }}</span> / month</div>
                  <div class="py-4">{{ plan.description }}</div>
                </v-list-item-content>
              </v-list-item>
              <v-divider></v-divider>
              <v-list-item v-for="(permit, j) in plan.permits" :key="j" :disabled="permit.plan_permits.status === 0">
                <v-icon left :disabled="permit.plan_permits.status === 0">mdi-check-circle</v-icon>
                {{ permit.name }}
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-btn block outlined :dark="plan.recommended">Subscribe</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data: () => {
    return {
      loading: false
    }
  },
  computed: {
    ...mapState('plan', ['plans'])
  },
  mounted() {
    this.getAllPlans()
  },
  methods: {
    ...mapActions('plan', ['getAllPlans'])
  }
}
</script>
