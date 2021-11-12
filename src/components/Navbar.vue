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

      <v-text-field
        label="Search"
        v-model="cadena"
        solo-inverted
        hide-details
        class="pl-10 pr-10 ml-4"
        @keyup.capture="buscar"
      >
        <v-icon
          slot="append"
          color="black"
          @click="borrar"
          v-show="cadena.length > 0"
          >mdi-close</v-icon
        >
      </v-text-field>
      <v-spacer class="hidden-sm-and-down"></v-spacer>

      <v-btn text href="/">Inicio</v-btn>
      <v-btn text href="/">Estadisticas</v-btn>
      <v-btn icon @click="openModal"
        ><v-icon large>mdi-plus-circle</v-icon></v-btn
      >
      <v-btn text><v-icon large>mdi-cart</v-icon></v-btn>
    </v-app-bar>
    <Modal ref="modal" @guardado="mensaje = $event"> </Modal>

    <!-- mensaje de producto guardado -->
    <v-snackbar v-model="mensaje" :timeout="2000">
      {{ texto }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="closeMensaje()">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import Modal from "./Modal.vue";
export default {
  data() {
    return {
      // cadena de busqueda
      cadena: "",
      texto: "Se ha guardado el producto",
      mensaje: false,
    };
  },
  components: { Modal },

  methods: {
    // abrimos el modal
    openModal() {
      this.$refs.modal.dialog = true;
      // se formatea el snackbar
      this.mensaje = false;
      this.$refs.modal.snackbar = false;
    },

    // mando el valor de la cadena al App.vue
    buscar() {
      this.$emit("busqueda", this.cadena);
    },

    // borramos la cadena
    borrar() {
      this.cadena = "";
    },

    // se cierra el mensaje al dar CLOSE
    closeMensaje() {
      this.$refs.modal.snackbar = false;
    },
  },
};
</script>

<style>
</style>