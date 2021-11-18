<template>
  <l-map
    ref="map"
    style="height: 500px; width: 800px"
    :zoom="zoom"
    :center="[
      position.lat || userLocation.lat || defaultLocation.lat,
      position.lng || userLocation.lng || defaultLocation.lng,
    ]"
  >
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-geosearch :options="geoSearchOptions"></l-geosearch>
  
    <l-marker
      v-for="event in events"
      :key="event.name"
      :lat-lng="[Number(event.lattitude), Number(event.longitude)]"
    >
      <l-popup style="width:200%; p">
        <h2>{{ event.name }}</h2>
        <img :src="event.imageUrl" alt="">
        <p>Alamat: {{ event.address }}</p>
        <p>Tanggal: {{ event.date }}</p>
        <p>Waktu: {{ event.time }}</p>
        <button>Join</button></l-popup
      >
       <l-tooltip />
    </l-marker>
  </l-map>
</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup , LTooltip } from "vue2-leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import LGeosearch from "vue2-leaflet-geosearch";
export default {
  name: "Maps",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
    LTooltip,
    LGeosearch
  },
   props: {
    defaultLocation: {
      type: Object,
      default: () => ({
        lat: -6.175396150166771,
        lng: 106.82718599999998
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
      events:[],
       geoSearchOptions: {
        provider: new OpenStreetMapProvider(),
        showMarker: false,
        autoClose: true,
      },
      position: {},

    };
  },
  mounted() {
    this.getUserPosition();
    this.$refs.map.mapObject.on("geosearch/showlocation", this.onSearch);
  },
  created() {
      console.log('masuk beforemount');
    this.getUserPosition();
    this.$store.dispatch("axiosFetchEvent")
     .then(({ data }) => {
        console.log(data, 'ini data');
        this.events = data
        console.log(this.events, 'ini events');
      })
      .catch((err) => {
        console.log(err, 'masuk eror fetch');
      });
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
          this.center = [this.userLocation.lat, this.userLocation.lng]
        });
      }
    },
     onSearch(value) {
      const loc = value.location;
      this.position = { lat: loc.y, lng: loc.x };
    }
  }
};
</script>
