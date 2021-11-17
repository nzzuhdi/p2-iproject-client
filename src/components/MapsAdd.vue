<template>
  <l-map
    ref="map"
    @dblclick="onMapClick"
    style="height: 500px"
    :zoom="zoom"
    :center="[
      position.lat || userLocation.lat || defaultLocation.lat,
      position.lng || userLocation.lng || defaultLocation.lng,
    ]"
  >
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-geosearch :options="geoSearchOptions"></l-geosearch>
    <l-marker
      v-if="position.lat && position.lng"
      visible
      draggable
      :icon="icon"
      :lat-lng.sync="position"
      @dragstart="dragging = true"
      @dragend="dragging = false"
    >
      <l-tooltip
        style="width: 20px; height: 20px"
        :content="tooltipContent"
        :options="{ permanent: true }"
      />
    </l-marker>
  </l-map>
</template>


<script>
import { LMap, LTileLayer, LMarker, LTooltip } from "vue2-leaflet";
import { icon } from "leaflet";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import LGeosearch from "vue2-leaflet-geosearch";
export default {
  name: "MapsAdd",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LTooltip,
    LGeosearch,
  },
  props: {
    value: {
      type: Object,
      required: true,
    },
    defaultLocation: {
      type: Object,
      default: () => ({
        lat: 8.9806,
        lng: 38.7578,
      }),
    },
  },
  data() {
    return {
      loading: false,
      geoSearchOptions: {
        provider: new OpenStreetMapProvider(),
        showMarker: false,
        autoClose: true,
      },
      icon: icon({
        iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
        iconUrl: require("leaflet/dist/images/marker-icon.png"),
        shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
      }),
      userLocation: {},
      position: {},
      address: "",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 18,
      dragging: false,
    };
  },
  watch: {
    position: {
      deep: true,
      async handler() {
        this.address = await this.getAddress();
        // this.$emit("input", { position: value, address: this.address });
      },
    },
  },
  computed: {
    tooltipContent() {
      if (this.dragging) return "...";
      if (this.loading) return "Loading...";
      return `<strong>${this.address.replace(
        ",",
        "<br/>"
      )}</strong> <hr/><strong>lat:</strong> ${
        this.position.lat
      }<br/> <strong>lng:</strong> ${this.position.lng}`;
    },
  },
  mounted() {
    this.getUserPosition();
    this.$refs.map.mapObject.on("geosearch/showlocation", this.onSearch);
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
          console.log(this.center, "tes");

          this.center = [this.userLocation.lat, this.userLocation.lng];
          this.events[0].markerLatLng = this.center;

          console.log(this.userLocation);
          console.log(this.center, "tes 1");
        });
      }
    },
    async getAddress() {
      this.loading = true;
      let address = "Unresolved address";
      try {
        const { lat, lng } = this.position;
        const result = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
        );
        if (result.status === 200) {
          const body = await result.json();
          address = body.display_name;
         this.$store.commit("SET_ADDRESS",address)

        }
      } catch (e) {
        console.error("Reverse Geocode Error->", e);
      }
      this.loading = false;
      return address;
    },
    onMapClick(value) {
      // place the marker on the clicked spot
      console.log(value);
      this.position = value.latlng;
      console.log(this.position, "mapclick");
    },
    onSearch(value) {
      const loc = value.location;
      this.position = { lat: loc.y, lng: loc.x };
    },
    
  },
};
</script>


<style>
</style>