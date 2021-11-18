<template>
  <v-app style="background-color: #ffcdd2">
    <NavBar @busqueda="newCad = $event" />
    <v-main>
      <router-view :busqueda="newCad" />
    </v-main>
  </v-app>
</template>

<script>
import NavBar from "./components/Navbar.vue";
import { bus } from "./main";
export default {
  name: "App",
  components: {
    NavBar,
  },
  data() {
    //
    return {
      newCad: "",
      compras: [],
    };
  },

  methods: {
    mandarCompras() {
      bus.$emit("showCarrito", this.compras[this.compras.length - 1]);
      console.log("mande la basura");
    },
  },

  created() {
    bus.$on("addCarrito", (data) => {
      this.compras.push(data);
      this.mandarCompras();
    });
  },
};
</script>