<template>
  <b-container>
    <h5>Create Location</h5>
    <location-form :map-id="$route.params.id" />
  </b-container>
</template>

<script>
export default {
  middleware: 'auth',
  meta: {
    requiresAuth: true
  }
}
</script>