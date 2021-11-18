<template>
  <v-row>
    <v-dialog
      v-model="dialog"
      transition="dialog-top-transition"
      fullscreen
      hide-overlay
    >
      <v-card style="background-color: #ffcdd2">
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="cancelar()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Carrito</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-container class="pt-12">
          <v-row>
            <v-col lg="12">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Name</th>
                      <th class="text-left">Calories</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, key) in compras" :key="key">
                      <td>{{ item.titulo }}</td>
                      <td>{{ item.precio }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { bus } from "../main";
export default {
  name: "Carrito",
  data() {
    return {
      dialog: false,
      compras: [],
    };
  },
  methods: {
    cancelar() {
      this.dialog = false;
    },
  },

  created() {
    bus.$on("showCarrito", (data) => {
      this.compras.push(data);
    });
  },
};
</script>

<style>
</style>