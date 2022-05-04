<template>
  <div class="mt-2">
    <div class="px-3 py-2">
      <b-form-checkbox v-model="travel" switch class="text-uppercase">Tranvel Times</b-form-checkbox>
      <b-form-checkbox v-model="radius" switch class="text-uppercase">Radius Rings</b-form-checkbox>
      <div class="mt-1">
        <label for="available-sqm" class="mb-0 text-uppercase">Available SQM</label>
        <b-form-input id="available-sqm" v-model="sqm" type="range" min="0" max="30000"></b-form-input>
        <div class="mt-n2 text-center text-warning">0 SQM - 30,000 SQM</div>
      </div>
    </div>
    
    <b-list-group flush class="mt-2">
      <b-list-group-item
        variant="danger"
        button
        @click="$emit('reset-bounds')"
      >
        <div class="py-3">Reset Map Zoom</div>
      </b-list-group-item>
      <b-list-group-item
        v-for="(location, i) in locations"
        :key="location.id"
        button
        variant="primary"
        class="d-flex justify-content-between align-items-center text-light"
        :active="selectedLocationId == location.id"
        @click="onListClick(location)"
      >
        <div>
          <div class="h5">{{ location.name }}</div>
          <small>Total availabiity SQM {{ location.squarefeet }}</small>
        </div>
        <div class="h1">{{ i + 1 }}</div>
      </b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

export default {
  middleware: 'auth',
  meta: {
    requiresAuth: true
  },
  props: {
  },
  data: () => ({
    loading: false,
    travel: false,
    radius: false,
    sqm: 2,
    selectedLocationId: null
  }),
  computed: {
    ...mapState('location', ['locations'])
  },
  async fetch () {
    this.getLocations(this.$route.params.id)
  },
  methods: {
    ...mapActions('location', ['getLocations']),
    onListClick(location) {
      this.selectedLocationId = location.id
      this.$emit('selected', location)
    }
  }
}
</script>
<style scoped>
.list-group-item-danger {
  color: #ffffff;
  background-color: #d14a59;
}
.list-group-item-danger:hover {
  color: #ffffff;
  background-color: #dd3145;
}
</style>