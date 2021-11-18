<template>
  <div class="container">
    <h1>Create Your Sports Event Here!</h1>
    <form>
      <div class="row">
        <div class="col-6">
          <fieldset>
            <legend>NEW EVENT</legend>

            <div class="form-group">
              <label for="sporstEventName" class="form-label mt-4"
                >Sports Event</label
              >
              <input
                type="text"
                class="form-control"
                id="sporstEventName"
                aria-describedby="sporstEventName"
                placeholder="Enter the name event"
                v-model="eventName"
              />
              <small id="emailHelp" class="form-text text-muted"
                >make sure people want to join you</small
              >
            </div>
            <div class="form-group">
              <label for="selectSports" class="form-label mt-4"
                >Sports Category</label
              >
              <select class="form-select" id="selectSports" v-model="category">
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
              <input
                type="text"
                class="form-control"
                id="eventAdress"
                placeholder="Address"
                v-model="getAddress"
              />
            </div>
            <div class="form-group">
              <label for="eventTime" class="form-label mt-2">Date&Time</label>
              <input
                type="date"
                class="form-control"
                id="eventAdress"
                placeholder="Address"
                v-model="date"
              />
              <br />
              <input
                type="time"
                class="form-control"
                id="eventAdress"
                placeholder="Address"
                v-model="time"
              />
            </div>
            <div class="form-group">
              <label for="formFile" class="form-label mt-4"
                >Your Logo's Event</label
              >
              <input id="news-image"
              type="file"
              class="form-control"
              name="imgUrl"
              ref="file" @change="uploadFile"/>
            </div>

            <button type="submit" class="btn btn-primary">Submit</button>
          </fieldset>
        </div>
        <div class="col-6">
          <div class="form-group">
            <MapsAdd />
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import MapsAdd from "../components/MapsAdd.vue";
export default {
  name: "FormAdd",
  components: {
    MapsAdd,
  },
  data() {
    return {
      eventName: "",
      date: "",
      time: "",
      userLocation: {},
      position: {},
      imgUrl: "",
      category: ""
    };
  },
  watch: {

  },
  computed: {
    getAddress() {
      return this.$store.state.addressAdd;
    },
  },
  created() {},
  methods: {
    uploadFile() {
      console.log(this.imgUrl,'before');

      this.imgUrl = this.$refs.file.files[0];
      console.log(this.imgUrl,'after');
    },
  },
};
</script>
