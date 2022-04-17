<template>
  <div>
    <div class="d-flex">
      <v-btn color="primary" fab small @click="drawer = !drawer"><v-icon>{{ mdiTune }}</v-icon></v-btn>
      <v-text-field
        outlined
        dense
        class="ml-1"
        :prepend-inner-icon="mdiMagnify"
        placeholder="Search property..."
        hide-details
      >
      </v-text-field>
      <v-spacer></v-spacer>
      <v-btn color="primary"><v-icon left>{{ mdiTrayArrowDown }}</v-icon>Export</v-btn>
    </div>
    <v-navigation-drawer v-model="drawer" app clipped floating width="380">
      <filter-panel></filter-panel>
    </v-navigation-drawer>
    <!-- <v-main> -->
    <div class="flex-grow-1">
      <div class="mt-1">
        <v-data-table
          :headers="headers"
          :items="properties"
          :items-per-page="itemsPerPage"
          class="elevation-1"
          hide-default-footer
        >
          <template v-slot:[`item.address`]="{ item }">
            {{ item.addresses[0].street_number_name }}
          </template>
          <template v-slot:[`item.city`]="{ item }">
            {{ item.addresses[0].suburb }}
          </template>
          <template v-slot:[`item.state`]="{ item }">
            {{ item.addresses[0].state }}
          </template>
          <template v-slot:[`item.zip`]="{ item }">
            {{ item.addresses[0].postcode }}
          </template>
          <template v-slot:[`item.propertyUse`]="{ item }">
            <v-chip label small>{{ item.propertyUse }}</v-chip>
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn fab x-small outlined color="primary" @click="onPropertyClick(item)">
              <v-icon>
                {{ mdiHeartOutline }}
              </v-icon>
            </v-btn>
            <v-btn fab x-small outlined color="primary" class="ml-2" @click="onPropertyClick(item)">
              <v-icon>
                {{ mdiChartBar }}
              </v-icon>
            </v-btn>
          </template>
        </v-data-table>
        <div class="d-flex justify-space-between align-center pt-2">
          <div>1-10 of 345</div>
          <v-pagination
            v-model="page"
            :length="pageCount"
          ></v-pagination>
          <div class="d-flex align-center">
            <span class="mr-2">Rows Per page: </span>
            <v-select
              v-model="itemsPerPage"
              solo
              dense
              hide-details
              :items="[5, 10, 20]"
              class="d-flex"
            ></v-select>
          </div>
        </div>
      </div>
    </div>
    <!-- </v-main> -->
  </div>
</template>

<script>
import { mdiTune, mdiMagnify, mdiTrayArrowDown, mdiHeartOutline, mdiChartBar } from '@mdi/js'
import { mapState, mapActions } from 'vuex'
import FilterPanel from '../components/FilterPanel.vue'

export default {
  components: {
    FilterPanel
  },

  data: () => ({
    mdiTune,
    mdiMagnify,
    mdiTrayArrowDown,
    mdiHeartOutline,
    mdiChartBar,

    drawer: false,
    headers: [
      { text: 'Address', value: 'address' },
      { text: 'City', value: 'city' },
      { text: 'State', value: 'state' },
      { text: 'Zip', value: 'zip' },
      { text: 'Size(sqft)', value: 'land_area' },
      { text: '', value: 'actions', sortable: false, align: 'center' }
    ],
    itemsPerPage: 10,
    page: 1,
    pageCount: 3
  }),
  computed: {
    ...mapState('property', ['properties'])
  },
  mounted() {
    this.getProperties()
  },
  methods: {
    ...mapActions('property', ['getProperties']),
    onPropertyClick(item) {
      console.log(item)
    }
  }
}
</script>
<style>
  .v-select__selections input {
    display: none;
  }
</style>