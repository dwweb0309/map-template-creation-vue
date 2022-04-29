<template>
  <div class="pa-2">
    <div id="map">
    </div>
  </div>
</template>

<script>
import mapboxgl from '!mapbox-gl'
import { mapState, mapActions } from 'vuex'

export default {
  layout: 'map',
  data() {
    return {
      map: null,
      drawer: true
    }
  },
  computed: {
    ...mapState('location', ['locations']),
    geojson() {
      return {
        type: 'FeatureCollection',
        features: this.locations.map((location) => ({
          type: 'Feature',
          properties: null,
          geometry: {
            type: 'Point',
            coordinates: [location.longitude, location.latitude]
          }
        }))
      }
    }
  },
  mounted() {
    this.getLocations(this.$route.params.id)
    this.initMap()
  },
  methods: {
    ...mapActions('location', ['getLocations']),
    initMap() {
      mapboxgl.accessToken = 'pk.eyJ1IjoiZHd3ZWIwMzA5IiwiYSI6ImNsMWdjdWhxdDAxcXgzaWxubDlyYnV2b3YifQ.GbCstsimD2y-Oa1eQXfWDA'

      this.map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [144.96513367, -37.73568726],
        zoom: 8,
        attributionControl: false
      })

      this.map.on('load', () => {
        this.map.addSource('addresses', {
          type: 'geojson',
          data: this.geojson,
          cluster: true,
          clusterMaxZoom: 14, // Max zoom to cluster points on
          clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
        });
        this.map.addLayer({
          id: 'addresses',
          type: 'circle',
          source: 'addresses',
          paint: {
            'circle-color': '#11b4da',
            'circle-radius': 8,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#0f0'
          }
        });
      })
    }
  }
}
</script>

<style>
  #map {
    /* height: 100vh;
    top: 64px;
    max-height: calc(100% - 64px);
    transform: translateX(0%);
    width: 100%;
    padding: 0; */
    position: absolute; top: 0; bottom: 0; width: 100%;
  }
</style>