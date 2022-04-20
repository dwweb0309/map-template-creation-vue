<template>
  <div>
    <b-container>
      <h5>Edit map</h5>
      <b-card no-body>
        <b-tabs content-class="mt-3" pills small card>
          <b-tab title="Settings" active>
            <map-settings-form :is-edit="true" />
          </b-tab>
          <b-tab title="Locations">
            <map-locations-table />
          </b-tab>
        </b-tabs>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  middleware: 'auth',
  meta: {
    requiresAuth: true
  },
  data() {
    return {
      map: null,
      loading: false
    }
  },
  computed: {

  },
  async mouted() {
    try {
      this.loading = true

      const response = await this.getMap(this.$route.params.id)

      this.map = response.data.map
    } catch (err) {
      console.log(err)
    } finally {
      this.loading = false
    }
  },
  methods: {
    ...mapActions('map', ['getMap'])
  }
}
</script>