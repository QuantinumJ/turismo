<template>
  <div id="home">
    <div class="busqueda">
      <input
        v-model="search"
        @input="getData"
        placeholder="Buscar vuelos"
        class="inputBusqueda"
      />
    </div>
    <div>
      <div v-for="(vuelo, index) in vuelos" :key="index" class="card-list">
        <router-link :to="'/reserva/' + vuelo._id">
          <div class="card vuelo-card vuelo-container vertical-align">
            <div>Origen: {{ vuelo.origen }}</div>
            <div>Destino: {{ vuelo.destino }}</div>
            <div>Fecha salida: {{ formatDate(vuelo.fecha_salida) }}</div>
            <div>Fecha llegada: {{ formatDate(vuelo.fecha_llegada) }}</div>
            <div>Precio: {{ vuelo.precio }}€</div>
            <div class="vuelo-reservar">RESERVAR</div>
          </div>
        </router-link>
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
      vuelos: [],
      search: "",
    };
  },
  methods: {
    formatDate: function (date) {
      return moment(date).format("DD/MM/YYYY");
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
    this.getData();
  },
  mounted() {},
};
</script>