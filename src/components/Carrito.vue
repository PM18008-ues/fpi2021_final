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
        {{ mostrarMensaje() }}
        <v-container class="pt-12">
          <v-row>
            <v-col cols="12">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left hidden-xs-only">Imagen</th>
                      <th class="text-left">Producto</th>
                      <th class="text-left">Precio</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, key) in compras" :key="key">
                      <td class="hidden-xs-only">
                        <v-img
                          :src="item.imagenes[0]"
                          max-height="130"
                          max-width="130"
                        ></v-img>
                      </td>
                      <td>{{ item.titulo }}</td>
                      <td>${{ item.precio }}</td>
                      <td colspan="12">
                        <v-btn color="primary" @click="borrarProducto(key)"
                          >Borrar</v-btn
                        >
                      </td>
                    </tr>
                    <tr>
                      <td class="hidden-xs-only"></td>
                      <td class="text-right"><b>Total a pagar:</b></td>
                      <td>
                        <b>${{ totalPagar().toFixed(2) }}</b>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
          <v-row class="justify-center">
            <v-btn
              color="primary"
              :disabled="compras.length == 0"
              @click="vender()"
              >Finalizar Compra</v-btn
            >
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { db } from "../db";
import { bus } from "../main";
export default {
  name: "Carrito",
  data() {
    return {
      dialog: false,
      compras: [],
      existe: false,
      productos: [],
      // mostrar mensaje
      snackbar: false,
    };
  },
  methods: {
    cancelar() {
      this.dialog = false;
    },

    totalPagar() {
      if (this.compras.length === 0) {
        return 0;
      } else {
        let total = 0;
        this.compras.forEach((element) => {
          total = total + element.precio;
        });
        return total;
      }
    },

    totalProductos() {
      bus.$emit("TProductos", this.compras.length);
    },

    borrarProducto(index) {
      this.compras.splice(index, 1);
      this.totalProductos();
    },

    vender() {
      if (this.compras.length > 0) {
        this.productos.forEach((element) => {
          this.compras.forEach((element2) => {
            if (element2.nid == element.nid) {
              let nuevo = element;
              nuevo.vendido = true;
              db.collection("productos").doc(nuevo.id).set(nuevo);
            }
          });
        });
        this.compras = [];
        this.dialog = false;
        this.snackbar = true;
        this.totalProductos();
      }
    },

    mostrarMensaje() {
      this.$emit("venta", this.snackbar);
    },
  },

  mounted() {
    bus.$on("addCarrito", (data) => {
      this.existe = false;
      this.compras.forEach((element) => {
        if (element.titulo == data.titulo) {
          this.existe = true;
        }
      });
      if (this.existe === false) {
        this.compras.push(data);
        this.existe = false;
      }
      this.totalProductos();
    });
  },

  firestore: {
    productos: db.collection("productos").where("vendido", "==", false),
  },
};
</script>

<style>
</style>