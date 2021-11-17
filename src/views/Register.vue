<template>
  <section
    id="register"
    class="container row 5"
    style="justify-content: center; margin-top: 15vh; margin-left: 10%"
  >
    <div class="card border-primary mb-3" style="max-width: 30rem">
      <form>
        <fieldset>
          <legend  style="justify-content: center" >Register Here</legend>

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
           @click.prevent="getRegister"
            type="submit"
            class="btn btn-primary"
            style="margin-bottom: 10px"
          >
            Submit
          </button>
        </fieldset>
      </form>
    </div>
  </section>
</template>

<script>
export default {
    name: 'register',
  data() {
    return {
      emailInput: "",
      passwordInput: "",
    };
  },
  methods:{
    getRegister(){
      const payload = {
        email:this.emailInput,
        password:this.passwordInput
      }
       this.$store
        .dispatch("axiosRegister", payload)
        .then(({ data }) => {
          console.log(data);
          this.$router.push({ name: "Login" });
        })
        .catch((err) => {
          console.log(err.response.data);
        });
      (this.emailInput = ""), (this.passwordInput = "");

    }
  }
};
</script>

<style>
</style>