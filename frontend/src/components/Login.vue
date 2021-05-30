<template>
  <div id="login">
    <div class="vid-container">
      <div class="inner-container">
        <div class="box">
          <h1>Login</h1>
          <input type="text" placeholder="Usuario" v-model="username" />
          <input type="password" placeholder="Contaseña" v-model="password" />
          <button @click="doLogin">Login</button>
          <div class="errors" v-if="errors != null">
            El usuario o la contraseña no son validos
          </div>
          <p>Not a member? <span>Sign Up</span></p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/*eslint-disable*/
import axios from "axios";
import moment from "moment";
export default {
  data: () => {
    return {
      username: "",
      password: "",
      errors: null,
    };
  },
  methods: {
    formatDate: function (date) {
      return moment(date).format("DD/MM/YYYY");
    },
    doLogin: function () {
      var postObject = {
        username: this.username,
        password: this.password,
      };
      this.errors = null;
      if (this.username != "" && this.password != "") {
        axios
          .post("http://localhost:3005/auth", {
           
              email: this.username,
              password: this.password,
          
          })
          .then((response) => {
              console.log("response")
              console.log(response)
            this.$router.push("/");
          })
          .catch((err) => {
            console.log(err);
            this.errors = err;
          });
      }
    },
    getData: function () {
      axios
        .get("http://localhost:3005/vuelos/all", {
          params: {
            search: this.search,
          },
        })
        .then((response) => {
          this.vuelos = response.data;
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  beforeMount() {
    //this.getData();
  },
  mounted() {},
};
</script>