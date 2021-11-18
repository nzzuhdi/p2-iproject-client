<template>
  <section
    id="login"
    class="container row"
    style="justify-content: center; margin-top: 15vh; margin-left: 10%"
  >
    <div class="card border-primary md-6" style="max-width: 30rem">
      <form>
        <fieldset>
          <legend
            style="justify-content: center; "
          >
            Login Here
          </legend>
          <div class="form-group">
            <label for="exampleInputEmail1" class="form-label mt-4"
              >Email address</label
            >
            <input
              v-model="emailInput"
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            >
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1" class="form-label mt-4"
              >Password</label
            >
            <input
              v-model="passwordInput"
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <br />
          <button
            @click.prevent="getLogin"
            type="submit"
            class="btn btn-primary"
            style="margin-bottom: 10px"
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
          localStorage.setItem("access_token", data.access_token);
          this.$store.commit("SET_ISLOGIN", true);
          this.$router.push({ name: "Home" });
        })
        .catch((err) => {
          console.log(err.response.data);
        });
      (this.emailInput = ""), (this.passwordInput = "");
    },
    getRegister() {
      this.$router.push("/register");
    },
    async googleLogin() {
      try {
        const googleUser = await this.$gAuth.signIn();
        console.log(googleUser,' gogleUser');
        let { id_token } = googleUser.getAuthResponse();
        console.log(id_token);
       axios({
          method: "POST",
          url: `/google-signin`,
          data: {
            id_token,
          },
        })
          .then(({data} ) => {
            localStorage.setItem("access_token", data.access_token);
            this.$store.commit("SET_ISLOGIN", true);
          this.$router.push('/');
          })
          .catch((err) => {
            console.log(err.response.data);
          });
      } catch (error) {
        console.log(error.response.data, 'eror sini kah?');
      }
    }
    },
};
</script>


<style>
</style>