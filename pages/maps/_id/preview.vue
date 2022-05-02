<template>
  <div>
    <div class="control-toggler" @click="showControlbar = true"></div>
    <b-sidebar v-model="showControlbar" shadow no-header>
      <div class="py-2">
        <map-control-panel />
      </div>
      <div class="control-toggler right-positioned" @click="showControlbar = false"></div>
    </b-sidebar>
    <div id="menu">
      <b-form-radio-group
        v-model="mapOption"
        :options="mapOptions"
        buttons
        @input="onMapModeChange"
        button-variant="outline-primary"
        size="sm"
      ></b-form-radio-group>
    </div>
    <div id="map">
    </div>
  </div>
</template>

<script>
import mapboxgl from '!mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { mapState, mapActions } from 'vuex'
import { BIcon, BIconBicycle, BIconMinecart, BIconOption } from 'bootstrap-vue'

export default {
  layout: 'map',
  components: {
    BIcon, BIconBicycle, BIconMinecart, BIconOption
  },
  data() {
    return {
      map: null,
      showControlbar: true,
      radius: false,
      travel: false,
      mapOption: 'ckpzzf6ee1jyg17qxen56map9',
      mapOptions: [
        { text: 'Street', value: 'ckpzzf6ee1jyg17qxen56map9' },
        { text: 'Satellite', value: 'cl2ktyiap000q15o8zm1ka0ly' },
        { text: 'Dark', value: 'ckd9gicgp06q51iny30d2j9m9' }
      ]
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
  async fetch() {
    await this.getLocations(this.$route.params.id)
    this.initMap()
  },
  methods: {
    ...mapActions('location', ['getLocations']),
    initMap() {
      // mapboxgl.accessToken = 'pk.eyJ1IjoiZHd3ZWIwMzA5IiwiYSI6ImNsMWdjdWhxdDAxcXgzaWxubDlyYnV2b3YifQ.GbCstsimD2y-Oa1eQXfWDA'
      mapboxgl.accessToken = 'pk.eyJ1IjoibWFwc3RlciIsImEiOiJjbDJrdWt4ZnIwNm4zM2JzM2xvdTJjZnBnIn0.am-B5SLKHgGwEU1yKY992w'

      let center = [-87.699329, 41.860092]

      if (this.geojson.features.length)
        center = this.geojson.features[0].geometry.coordinates

      this.map = new mapboxgl.Map({
        container: 'map',
        // style: 'mapbox://styles/dwweb0309/cl2n9cxfq000y14p06fnq6g21',
        style: 'mapbox://styles/mapster/ckpzzf6ee1jyg17qxen56map9',
        center,
        zoom: 8
      })

      this.map.addControl(new mapboxgl.NavigationControl());

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
            'circle-stroke-width': 1,
            'circle-stroke-color': '#0f0'
          }
        });

        const bounds = new mapboxgl.LngLatBounds()

        this.geojson.features.forEach((feature) => {
            bounds.extend(feature.geometry.coordinates)
        })

        this.map.fitBounds(bounds, { padding: 100 })
      })
    },
    onMapModeChange() {
      this.map.setStyle('mapbox://styles/mapster/' + this.mapOption);
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
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
  .control-toggler {
    position: absolute;
    z-index: 10;
    top: calc(50% - 20px);
    height: 40px;
    width: 8px;
    border-radius: 0;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
    background: #35495e;
    cursor: pointer;
  }
  .right-positioned {
    right: -8px;
  }
  #menu {
    display: flex;
    position: absolute;
    background: #efefef;
    font-family: 'Open Sans', sans-serif;
    z-index: 1;
    right: 50px;
    top: 10px;
    border-radius: 10px;
  }
</style>