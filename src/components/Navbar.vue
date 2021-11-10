<template>
  <v-container>
    <v-app-bar app color="primary" dark>
      <!-- boton del sidenav -->
      <v-app-bar-nav-icon class="hidden-lg-and-up"></v-app-bar-nav-icon>
      <!-- logo de la tienda -->
      <v-toolbar-title
        ><a href="/" class="white--text display-1" style="text-decoration: none"
          ><v-icon large>mdi-cellphone-check</v-icon> Tienda CellPhone</a
        ></v-toolbar-title
      >

      <v-btn icon>
        <v-icon class="pl-6">mdi-magnify</v-icon>
      </v-btn>
      <v-text-field
        label="Search"
        solo-inverted
        hide-details
        class="pl-10 pr-10 ml-4"
      ></v-text-field>
      <v-spacer class="hidden-sm-and-down"></v-spacer>

      <v-btn text href="/">Inicio</v-btn>
      <v-btn text href="/">Estadisticas</v-btn>
      <v-btn icon @click="openModal"
        ><v-icon large>mdi-plus-circle</v-icon></v-btn
      >
      <v-btn text><v-icon large>mdi-cart</v-icon></v-btn>
    </v-app-bar>
    <Modal ref="modal"> </Modal>
  </v-container>
</template>

<script>
import Modal from "./Modal.vue";
export default {
  components: { Modal },

  methods: {
    openModal() {
      this.$refs.modal.dialog = true;
    }, //executing the show method of child
  },
};
</script>

<style>
</style>