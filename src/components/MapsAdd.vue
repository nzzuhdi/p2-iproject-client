<template>
  <div class="container">
    <h1>Create Your Sports Event Here!</h1>
       <form>
    <div class="row">
      <div class="col-6">
  <fieldset>
    <legend>Legend</legend>
  
    <div class="form-group">
      <label for="sporstEventName" class="form-label mt-4">Sports Event</label>
      <input type="email" class="form-control" id="sporstEventName" aria-describedby="sporstEventName" placeholder="Enter the name event">
      <small id="emailHelp" class="form-text text-muted">make sure people want to join you</small>
    </div>
    <div class="form-group">
      <label for="selectSports" class="form-label mt-4">Sports Category</label>
      <select class="form-select" id="selectSports">
        <option selected disabled>--Chose--</option>
        <option>Futsal</option>
        <option>Soccer</option>
        <option>Volley</option>
        <option>BasketBall</option>
        <option>Badminton</option>
      </select>
    </div>
    <div class="form-group">
      <label for="eventAdress" class="form-label mt-2">Address</label>
      <input type="text" class="form-control" id="eventAdress" placeholder="Address">
    </div>
    <div class="form-group">
      <label for="formFile" class="form-label mt-4">Your Logo's Event</label>
      <input class="form-control" type="file" id="formFile">
    </div>
  
    <button type="submit" class="btn btn-primary">Submit</button>
  </fieldset>
      </div>
      <div class="col-6">
        <div class="form-group">
          <l-map
            ref="map"
            style="height: 500px"
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
        </div>
      </div>
    </div>
      </form>
  </div>

</template>

<script>
import { LMap, LTileLayer, LMarker, LPopup , LTooltip } from "vue2-leaflet";

export default {
  name: "MapsAdd",
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
      zoom: 18,
      center: [],
      markerLatLng: [-6.1717952, 106.7614208],
      events: [
        {
          name: "Futsal Happy",
          address: "Tebet",
          markerLatLng: [-6.1717952, 106.7614208],
        },
        {
          name: "Futsal Happy",
          address: "Pancoran",
          markerLatLng: [-6.2717952, 106.7614208],
        },
        {
          name: "Futsal Happy",
          address: "Ciputat",
          markerLatLng: [-6.3717952, 106.7614208],
        },
      ],
    };
  },
  created() {
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
