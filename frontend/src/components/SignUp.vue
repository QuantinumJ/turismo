<template>
    <div id="signUp">
      <div class="vid-container">
        <div class="inner-container">
          <div class="box">
            <h1>Sign Up</h1>
            <input type="text" placeholder="Nombre" v-model="nombre" />
            <input type="email" placeholder="Email" v-model="email" />
            <input type="password" placeholder="Contaseña" v-model="password" />
            <button @click="signup">Registrarse</button>
          </div>
        </div>
      </div>
    </div>
</template>
<script>
/*eslint-disable*/
import axios from "axios";
export default {
  data: () => {
    return {
      nombre: "",
      email: "",
      password: "",
      errors: null,
    };
  },
  methods: {
    signup: function () {
      var postObject = {
        email: this.email,
        nombre: this.nombre,
        password: this.password,
      };
      this.errors = null;
    
      //if (this.nombre != "" && this.password != "" && this.email != "") {
      axios
        .post("http://localhost:3005/users/add", {
          email: this.email,
          nombre: this.nombre,
          password: this.password,
        })
        .then((response) => {
          console.log("response");
          console.log(response);
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err);
          this.errors = err;
        });
      // }
    },
  },
  beforeMount() {
    //this.getData();
  },
  mounted() {},
};
</script>