<template>
  <div id="map">
  </div>
</template>

<script>
import mapboxgl from '!mapbox-gl'

export default {
  data() {
    return {
      map: null,
      drawer: true
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    initMap() {
      mapboxgl.accessToken = this.$config.mapboxToken

      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [144.99600220, -37.80097198],
        zoom: 8,
        attributionControl: false
      })
    }
  }
}
</script>

<style>
  #map {
    height: 100vh;
    top: 64px;
    max-height: calc(100% - 64px);
    transform: translateX(0%);
    width: 100%;
    padding: 0;
  }
</style>