<template>
  <section
    id="login"
    class="container row"
    style="justify-content: center; margin-top: 10vh; margin-left: 7%"
  >
    <div class="card border-primary md-6 " style="width: 20rem">
      <form>
        <fieldset>
          <legend style="justify-content: center">Login Here</legend>
          <div class="form-group">
            <label for="exampleInputEmail1" class="form-label mt-4"
              >Email address</label
            >
            <input
              v-model="emailInput"
              type="email"
              class="form-control ml-4"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              style="width:80%"
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            >
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1" class="form-label mt-2"
              >Password</label
            >
            <input
              v-model="passwordInput"
              type="password"
              class="form-control ml-4 "
              style="width:80%"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <br />
          <button
            @click.prevent="getLogin"
            type="submit"
            class="btn btn-primary"
            style="margin-bottom: 10px; "
          >
            Submit
          </button>
          <p>Or Login Via</p>
          <button
            @click.prevent="googleLogin()"
            type="submit"
            class="btn btn-primary"
            style="margin-bottom: 10px"
          >
            Google
          </button>
          <p>
            Doesn't have account? Register
            <a
              class="link"
              onMouseOver="this.style.color='purple'"
              onMouseOut="this.style.color='#00F'"
              style="cursor: pointer"
              @click.prevent="getRegister"
              >here</a
            >
          </p>
        </fieldset>
      </form>
    </div>
  </section>
</template>

<script>
import axios from "../apis/axios";
import Swal from "sweetalert2";
export default {
  name: "Login",
  data() {
    return {
      emailInput: "",
      passwordInput: "",
    };
  },
  methods: {
    async getLogin() {
      const payload = {
        email: this.emailInput,
        password: this.passwordInput,
      };
      this.$store
        .dispatch("axiosLogin", payload)
        .then(({ data }) => {
          Swal.fire({
            icon: "success",
            title: `Welcome `,
            showConfirmButton: false,
            timer: 1500,
          });
          localStorage.setItem("access_token", data.access_token);
          this.$store.commit("SET_ISLOGIN", true);
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
           Swal.fire({
            icon: "error",
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
          console.log(err.response.data.message);
        });
      (this.emailInput = ""), (this.passwordInput = "");
    },
    getRegister() {
      this.$router.push("/register");
    },
    async googleLogin() {
      try {
        const googleUser = await this.$gAuth.signIn();
        console.log(googleUser, " gogleUser");
        let { id_token } = googleUser.getAuthResponse();
        console.log(id_token);
        axios({
          method: "POST",
          url: `/google-signin`,
          data: {
            id_token,
          },
        })
          .then(({ data }) => {
            Swal.fire({
            icon: "success",
            title: `Welcome `,
            showConfirmButton: false,
            timer: 1500,
          });
            localStorage.setItem("access_token", data.access_token);
            this.$store.commit("SET_ISLOGIN", true);
            this.$router.push("/");
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      } catch (error) {
        Swal.fire({
            icon: "error",
            title: err.response.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        console.log(error.response.data, "eror sini kah?");
      }
    },
  },
};
</script>


<style>

</style>