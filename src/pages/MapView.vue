<template>
  <div>
    <v-navigation-drawer v-model="drawer" app clipped floating width="380">
      <filter-panel></filter-panel>
    </v-navigation-drawer>
    <!-- <v-main> -->
    <div id="map">
    </div>
    <!-- </v-main> -->
  </div>
</template>

<script>
import FilterPanel from '../components/FilterPanel.vue'
import mapboxgl from '!mapbox-gl'

export default {
  components: {
    FilterPanel
  },
  data() {
    return {
      drawer: true,
      geojson: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [-77.032, 38.913]
            },
            properties: {
              title: 'Mapbox',
              description: 'Washington, D.C.'
            }
          },
          {
            type: 'Feature',
            geometry: {
            type: 'Point',
              coordinates: [-122.414, 37.776]
            },
            properties: {
              title: 'Mapbox',
              description: 'San Francisco, California'
            }
          }
        ]
      }
    }
  },
  mounted() {
    mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_TOKEN

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v10',
      center: [-96, 37.8],
      zoom: 3,
      attributionControl: false
    })

    for (const feature of this.geojson.features) {
      const el = document.createElement('div')

      el.className = 'marker'
      
      // make a marker for each feature and add it to the map
      new mapboxgl.Marker(el)
        .setLngLat(feature.geometry.coordinates)
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(
              `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
            )
        )
      .addTo(map);
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
  .marker {
    background-image: url('~@/assets/marker-editor.svg');
    background-size: cover;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    cursor: pointer;
  }
  .mapboxgl-popup {
    max-width: 200px;
  }
  .mapboxgl-popup-content {
    text-align: center;
    font-family: 'Open Sans', sans-serif;
  }
</style>