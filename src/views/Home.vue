<template>
  <div class="home">
    <div class="container-fluid">
        <h1> Get Ur Body Sweat!</h1>
        <br>
        <h2> Find Sports Events Near You  & Join them!</h2>
      <div class="row justify-content-lg-center">
        <div class="col-lg-auto">
        <Maps/> 
        </div>
      
      </div>
   <div class="row justify-content-lg-center mt-2">
       <button @click="toAddEvent" type="button" class="btn btn-secondary">Or Create The New One!</button>
        </div>
    </div>



  </div>
</template>

<script>
// @ is an alias to /src
import Maps from "../components/Maps.vue";
export default {
  name: 'Home',
  components: {
    Maps
  },
  methods: {
     toAddEvent(){
      this.$router.push('/addevent').catch(()=>{});
    }
  },
}
</script>
