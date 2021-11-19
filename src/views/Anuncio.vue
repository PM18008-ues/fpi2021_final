<template>
  <div>
    <v-container>
      <v-row>
        <!-- imagenes del producto -->
        <v-col lg="6">
          <v-carousel>
            <v-carousel-item
              v-for="(img, i) in anuncio.imagenes"
              :src="img"
              :key="i"
            ></v-carousel-item>
          </v-carousel>
        </v-col>
        <v-col lg="6">
          <v-row class="pb-10">
            <span class="display-1">{{ anuncio.titulo }}</span>
          </v-row>
          <v-row class="justify-center">
            <h1>${{ anuncio.precio }}</h1>
          </v-row>
          <v-row class="justify-center pb-10">
            <v-btn color="primary" @click="agregarproducto()"
              ><v-icon>mdi-cart-plus</v-icon> Agregar Producto</v-btn
            >
          </v-row>
          <v-row>
            <v-col lg="12">
              <v-card>
                <v-card-text>
                  <v-row>
                    <v-col lg="6">
                      <span>Vendedor: {{ anuncio.vendedor }}</span>
                    </v-col>
                    <v-col lg="6">
                      <span>Telefono: {{ anuncio.telefono }}</span>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col lg="12">
          <v-tabs>
            <v-tab>Description</v-tab>
            <v-tab>Especificaciones</v-tab>
            <v-tab-item>
              <p class="pt-10 subtitle-1 font-weight-thin">
                {{ anuncio.descripcion }}
              </p>
            </v-tab-item>
            <v-tab-item>
              <v-simple-table class="pt-5">
                <template v-slot:default>
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td>Estado:</td>
                      <td v-show="anuncio.nuevo === false">Usado</td>
                      <td v-show="anuncio.nuevo === true">Nuevo</td>
                    </tr>
                    <tr>
                      <td>Marca:</td>
                      <td>{{ anuncio.marca }}</td>
                    </tr>
                    <tr>
                      <td>Modelo:</td>
                      <td>{{ anuncio.modelo }}</td>
                    </tr>
                    <tr>
                      <td>Pantalla:</td>
                      <td>{{ anuncio.pantalla }} pulgadas</td>
                    </tr>
                    <tr>
                      <td>Sistema:</td>
                      <td>{{ anuncio.sistema }}</td>
                    </tr>
                    <tr>
                      <td>ROM:</td>
                      <td>{{ anuncio.rom }} GB</td>
                    </tr>
                    <tr>
                      <td>RAM:</td>
                      <td>{{ anuncio.ram }} GB</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-tab-item>
          </v-tabs>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { db } from "../db";
import { bus } from "../main";
export default {
  data() {
    return {
      anuncio: {},
    };
  },

  methods: {
    async mostrarProducto() {
      await db
        .collection("productos")
        .doc(this.$route.params.id)
        .get()
        .then((r) => {
          this.anuncio = r.data();
        })
        .catch((e) => {
          console.log(e);
        });
    },
    agregarproducto() {
      bus.$emit("addCarrito", this.anuncio);
    },
  },

  created() {
    this.mostrarProducto();
  },
};
</script>
