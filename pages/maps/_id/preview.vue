<template>
  <div>
    <div class="control-toggler" @click="showControlbar = true"></div>
    <b-sidebar v-model="showControlbar" shadow no-header>
      <div class="py-2">
        <map-control-panel @selected="onLocationSelected" @reset-bounds="resetBounds" />
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
    <b-card id="details" img-src="https://www.71langridgestreet.com.au/dist/images/building-01.jpg" img-alt="Image" img-top bg-variant="primary" text-variant="white">
      <b-card-text>
        <h3>71 Langridge St</h3>
        <small>71 Langridge St</small>
        <hr>
        <small>Levels available</small>
        <h5>G, 1, 2, 3, 4, 5, 6</h5>
        <small>Net Rent Range($/sqm)</small>
        <h5>POA</h5>
        <small>Owner</small>
        <h5>Domain Hill</h5>
        <small>Leaging agent</small>
        <h5>Lemon Baxter</h5>
      </b-card-text>
    </b-card>
    <div id="map"></div>
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
      ],
      popup: null
    }
  },
  computed: {
    ...mapState('location', ['locations']),
    geojson() {
      return {
        type: 'FeatureCollection',
        features: this.locations.map((location, i) => ({
          type: 'Feature',
          properties: {
            index: i + 1,
            name: location.name
          },
          geometry: {
            type: 'Point',
            coordinates: [location.longitude, location.latitude]
          }
        }))
      }
    }
  },
  async mounted() {
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
        zoom: 18
      })

      this.map.addControl(new mapboxgl.NavigationControl());

      this.map.on('load', () => {
        this.map.addSource('addresses', {
          type: 'geojson',
          data: this.geojson
        });

        this.map.addLayer({
          id: 'addresses-circle',
          type: 'circle',
          source: 'addresses',
          paint: {
            'circle-color': '#11b4da',
            'circle-radius': 16,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#fff'
          }
        });
        this.map.addLayer({
          id: "addresses-label",
          type: "symbol",
          source: "addresses",
          layout: {
            'text-field': ['get', 'index'],
            "text-size": 16
          },
          paint: {
            'text-color': '#ffffff'
          }
        });

        this.resetBounds()
      })

      this.map.on('click', 'addresses-circle', (e) => {
        this.setLocationSelection(e.features[0])
      });
    },
    showPopUp(coordinates, html) {
      if (this.popup)
        this.popup.remove()

      this.popup = new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(html)
        .addTo(this.map)
    },
    setLocationSelection(feature) {
      this.showPopUp(feature.geometry.coordinates, feature.properties.name)
      this.showCircles(feature)
      this.map.flyTo({
        center: feature.geometry.coordinates,
        zoom: 12,
        speed: 1.2
      })
    },
    onMapModeChange() {
      this.map.setStyle('mapbox://styles/mapster/' + this.mapOption);
    },
    onLocationSelected(location) {
      this.setLocationSelection({
        type: 'Feature',
        properties: {
          name: location.name
        },
        geometry: {
          type: 'Point',
          coordinates: [location.longitude, location.latitude]
        }
      })
    },
    resetBounds() {
      const bounds = new mapboxgl.LngLatBounds()

      this.geojson.features.forEach((feature) => {
        bounds.extend(feature.geometry.coordinates)
      })

      this.map.fitBounds(bounds, { padding: 80 })
    },
    showCircles(feature) {
      const metersToPixelsAtMaxZoom = (meters, latitude) => meters / 0.075 / Math.cos(latitude * Math.PI / 180)
      const meters = [1000, 3000, 5000]
      const source = this.map.getSource('point-5000')

      if (source) {
        source.setData({
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            properties: {
              title: 'aaaaaa'
            },
            geometry: feature.geometry
          }]
        })
      } else {
        this.map.addSource('point-5000', {
          type: 'geojson',
          data: {
            type: "FeatureCollection",
            features: [{
              type: "Feature",
              properties: {
                title: 'aaaaaa'
              },
              geometry: feature.geometry
            }]
          }
        })
      }

      meters.forEach((meter) => {
        const layerId = `circle-${meter}`

        if (this.map.getLayer(layerId)) {
          this.map.removeLayer(layerId)
        }

        this.map.addLayer({
          id: layerId,
          type: 'circle',
          source: 'point-5000',
          paint: {
            'circle-radius': {
              stops: [
                [0, 0],
                [20, metersToPixelsAtMaxZoom(meter, feature.geometry.coordinates[1])]
              ],
              base: 2
            },
            'circle-opacity': 0,
            'circle-stroke-width': 2,
            'circle-stroke-color': '#11b4da'
          }
        })
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
  #details {
    display: flex;
    position: absolute;
    width: 300px;
    z-index: 1;
    right: 50px;
    top: 50px;
  }
  #details img {
    height: 200px;
    object-fit: cover;
  }
  .mapboxgl-popup {
    width: 152px;
  }
</style>