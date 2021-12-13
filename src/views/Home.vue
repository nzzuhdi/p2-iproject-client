<template>
  <div class="home">
    <div class="container-fluid">
        <h1 style="margin-top: 5vh"> Get Ur Body Sweat!</h1>
        <h2> Find Sports Events Near You  & Join them!</h2>
      <div class="row justify-content-lg-center">
        <div class="col-lg-auto">
        <Maps/> 
        </div>
      
      </div>
   <div class="row justify-content-lg-center mt-2">
       <button v-if="isLogin" @click="toAddEvent" type="button" class="btn btn-secondary">Or Create The New One!</button>
        <button v-else  @click="toLogin" class="btn btn-secondary"> Login to create ur sports event</button>
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
    },
    toLogin() {
      this.$router.push('/login')
}
  },
  computed:{
     isLogin(){
      return this.$store.state.isLogin
    }
  }
}
</script>
