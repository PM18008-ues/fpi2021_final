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
export default {
  name: "App",
  components: {
    NavBar,
  },
  data() {
    //
    return {
      newCad: "",
    };
  },
};
</script>