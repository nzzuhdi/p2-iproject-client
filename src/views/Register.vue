<template>
  <section
    id="register"
    class="container row 5"
    style="justify-content: center; margin-top: 10vh; margin-left: 10%"
  >
    <div class="card border-primary mb-3" style="width: 20rem">
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
              class="form-control ml-4 "
              style="width:80%"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
            <small id="emailHelp" class="form-text text-muted"
              >We'll never share your email with anyone else.</small
            >
          </div>
           <div class="form-group">
            <label for="exampleInputEmail1" class="form-label mt-1"
              >Username</label
            >
            <input
            v-model="username"
              type="username"
              class="form-control ml-4 "
              style="width:80%"
              id="username"
              aria-describedby="username"
              placeholder="Enter username"
            />
            <small id="emailHelp" class="form-text text-muted"
              >So people can call you.</small
            >
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1" class="form-label mt-1"
              >Password</label
            >
            <input
              v-model="passwordInput"
              type="password"
               class="form-control ml-4 "
              style="width:80%;"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <button
           @click.prevent="getRegister"
            type="submit"
            class="btn btn-primary"
            style="margin-bottom: 20px"
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
      username: ""
    };
  },
  methods:{
    getRegister(){
      const payload = {
        email:this.emailInput,
        password:this.passwordInput,
        username: this.username
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
      (this.emailInput = ""), 
      (this.passwordInput = "");
      (this.username = "");

    }
  }
};
</script>

<style>
</style>