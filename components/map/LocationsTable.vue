<template>
  <b-table
    striped
    hover
    :items="locations"
    :fields="fields"
  >
  </b-table>
</template>

<script>
export default {
  props: {
    locations: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    fields: [
      {
        key: 'title',
        label: 'Title',
        sortable: true
      }, {
        key: 'description',
        label: 'Description'
      }, {
        key: 'updated_at',
        label: 'Last Modified',
        sortable: true
      }
    ]
  }),

}
</script>
