<template>
  <div id="reserva">
    <div>
      <div v-if="vuelo != null" class="card-list">
        <div class="card vuelo-card vuelo-container">
          <div>Origen: {{ vuelo.origen }}</div>
          <div>Destino: {{ vuelo.destino }}</div>
          <div>Fecha salida: {{ formatDate(vuelo.fecha_salida) }}</div>
          <div>Fecha llegada: {{ formatDate(vuelo.fecha_llegada) }}</div>
          <div>Precio: {{ vuelo.precio }}€</div>
          <div class="vuelo-reservar">RESERVAR</div>
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
      vuelo: null,
      search: "",
    };
  },
  methods: {
    formatDate: function (date) {
      return moment(date).format("DD/MM/YYYY");
    },
    getData: function () {
      axios
        .get("http://localhost:3005/vuelos/" + this.$route.params.id, {
          params: { id: this.$route.params.id },
        })
        .then((response) => {
          this.vuelo = response.data;
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