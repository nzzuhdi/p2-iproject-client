<template>
  <l-map
    ref="map"
    style="height: 500px; width: 800px"
    :zoom="zoom"
    :center="[
      userLocation.lat || defaultLocation.lat,
      userLocation.lng || defaultLocation.lng
    ]"
  >
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-marker
      v-for="event in events"
      :key="event.name"
      :lat-lng="event.markerLatLng"
    >
      <l-popup style="width:200%; p">
        <h2>{{ event.name }}</h2>
        <h3>{{ event.address }}</h3>
        <button>Join</button></l-popup
      >
       <l-tooltip :content="tooltipContent" :options="{ permanent: true }" />
    </l-marker>
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup , LTooltip } from "vue2-leaflet";

export default {
  name: "Maps",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
  },
   props: {
    defaultLocation: {
      type: Object,
      default: () => ({
        lat: 8.9806,
        lng: 38.7578
      })
    }
  },
  data() {
    return {
      userLocation: {},
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 15,
      center: [],
      markerLatLng: [-6.1717952, 106.7614208],
      events: [
        {
          name: "Futsal Happy",
          address: "Tebet",
          markerLatLng: [-6.2737952, 106.7614208],
        },
        {
          name: "Futsal Happy",
          address: "Pancoran",
          markerLatLng: [-6.2727952, 106.7614208],
        },
        {
          name: "Futsal Happy",
          address: "Ciputat",
          markerLatLng: [-6.2717952, 106.7614208],
        },
      ],
    };
  },
  beforeMount() {
      console.log('masuk beforemount');
    this.getUserPosition();
  },
  methods: {
    async getUserPosition() {
      // check if API is supported
      if (navigator.geolocation) {
        // get  geolocation
        navigator.geolocation.getCurrentPosition((pos) => {
          // set user location
          this.userLocation = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          };
          console.log(this.userLocation.lat);
          console.log(this.userLocation.lng);
          console.log(this.center, 'tes');

          this.center = [this.userLocation.lat, this.userLocation.lng]
          console.log(this.userLocation);
          console.log(this.center, 'tes 1');

        });
      }
    },
  },
};
</script>
