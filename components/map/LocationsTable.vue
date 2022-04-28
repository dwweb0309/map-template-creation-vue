<template>
  <b-table
    striped
    hover
    :items="locations"
    :fields="fields"
    class="mt-2"
  >
    <template #cell(actions)="row">
      <b-button size="sm" variant="outline-secondary" class="mr-1" :to="`/maps/${row.item.id}/preview`">
        <b-icon-eye></b-icon-eye>
      </b-button>
      <b-button size="sm" class="mr-1" :to="`/maps/${row.item.id}/edit`">
        <b-icon-pencil></b-icon-pencil>
      </b-button>
    </template>
  </b-table>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { BIcon, BIconPlus, BIconPencil, BIconEye } from 'bootstrap-vue'
export default {
  middleware: 'auth',
  meta: {
    requiresAuth: true
  },
  components: {
    BIcon, BIconPlus, BIconPencil, BIconEye
  },
  data() {
    return {
      fields: [
        {
          key: 'name',
          label: 'Name',
          sortable: true
        }, {
          key: 'address',
          label: 'Address'
        }, {
          key: 'city',
          label: 'City',
          sortable: true
        }, {
          key: 'state',
          label: 'State',
          sortable: true
        }, {
          key: 'photo',
          label: 'Photo'
        }, {
          key: 'pdf',
          label: 'PDF'
        }, {
          key: 'description',
          label: 'Description'
        }, {
          key: 'pdf',
          label: 'PDF',
          sortable: true
        }, {
          key: 'squarefeet',
          label: 'Squarefeet',
          sortable: true
        }, {
          key: 'latitude',
          label: 'Latitude'
        }, {
          key: 'longitude',
          label: 'Longitude',
          sortable: true
        }, {
          key: 'actions',
          label: 'Actions'
        }
      ],
      users: []
    }
  },
  computed: {
    ...mapState('map', ['maps'])
  },
  async fetch() {
    try {
      const response = await this.getMaps()
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    ...mapActions('map', ['getMaps'])
  }
}
</script>