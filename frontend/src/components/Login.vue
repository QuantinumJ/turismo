<template>

  <div id="login">
    <div class="panelNavegacion">
      <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#news">Reservas</a></li>
        <li><a href="#contact">Contact</a></li>
        <li style="float: right"><a class="active" href="login">Login</a></li>
      </ul>
    </div>
    <div class="vid-container">
      <div class="inner-container">
        <div class="box">
          <h1>Login</h1>
          
          <input type="email" placeholder="Email" v-model="email" />
          <input type="password" placeholder="Contaseña" v-model="password" />
          <button @click="doLogin">Login</button>
          <div class="errors" v-if="errors != null">
            El usuario o la contraseña no son validos
         
          </div>
          <p>Todavia no eres miembro <span><a href="/signup">Sign Up</a></span></p>
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
      email: "",
      password: "",
      errors: null,
    };
  },
  methods: {
    formatDate: function (date) {
      return moment(date).format("DD/MM/YYYY");
    },
    doGet: function(){
      axios.
      get("http://localhost:3005/auth");
    },
    doLogin: function () {
      var postObject = {
        email: this.email,
        password: this.password,
      };
      this.errors = null;
      if (this.email != "" && this.password != "") {
        axios
        
          .post("http://localhost:3005/auth", {
           
              email: this.email,
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
  mounted() {
     doGet();
  },
};
</script>