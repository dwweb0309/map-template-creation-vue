<template>
  <div>
    <b-container fluid>
      <h5>Edit map</h5>
      <b-card no-body>
        <b-tabs content-class="mt-3" pills small card>
          <b-tab title="Settings" active>
            <map-settings-form :is-edit="true" />
          </b-tab>
          <b-tab title="Locations" class="pt-2">
            <div class="text-right">
              <b-button size="sm" :to="`/maps/${$route.params.id}/locations/create`" class="ml-auto mb-2">
                <b-icon-plus></b-icon-plus>Add location
              </b-button>
            </div>
            <map-locations-table />
          </b-tab>
        </b-tabs>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { BIcon, BIconPlus } from 'bootstrap-vue'
export default {
  middleware: 'auth',
  meta: {
    requiresAuth: true
  },
  components: {
    BIcon,
    BIconPlus
  },
  data: () => ({

  }),
  computued: {
    ...mapState('map', ['map']),
    ...mapState('location', ['locations'])
  },
  mounted() {

  },
  methods: {
    ...mapActions('map', ['getMap'])
  }
}
</script>