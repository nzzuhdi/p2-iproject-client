<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark" style="cursor:pointer">
  <div class="container-fluid">
    <a class="navbar-brand" @click="toHome">Sports Kuy:)</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarColor02">
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <a class="nav-link active" @click="toHome" >Home
          </a>
        </li>
        <li class="nav-item">
          <a v-if="isLogin" class="nav-link" href="#">Profile</a>
        </li>
         <li class="nav-item">
          <a v-if="!isLogin" @click="toLogin" class="nav-link" >Login</a>
        </li>
         <li class="nav-item">
          <a v-if="isLogin" class="nav-link" @click="toLogout">Logout</a>
        </li>
            </ul>
      
    </div>
  </div>
</nav>
</template>

<script>
import Swal from "sweetalert2";
export default {
name: "Navbar",
methods: {
     toHome(){
      this.$router.push('/').catch(()=>{});
    },
      toLogin(){
      this.$router.push('/login');
    },
     async toLogout(){
       localStorage.clear()
        this.$store.commit("SET_ISLOGIN",false)
         const response = await this.$gAuth.signOut();
      if (response) {
        console.log(response);
      }
       Swal.fire({
            icon: "warning",
            title: `Success Logout`,
            showConfirmButton: false,
            timer: 1500,
          });

      this.$router.push('/');
    }
  },
  computed:{
    isLogin(){
      return this.$store.state.isLogin
    }
  },
   created() {
    if(localStorage.access_token){
        this.$store.commit("SET_ISLOGIN",true)
    }
  }
}
</script>

<style>

</style>