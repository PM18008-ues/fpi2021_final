<template>
  <v-container>
    <v-row>
      <!-- Filtros de la tienda -->
      <v-col lg="3">
        <!-- switch de nuevo -->
        <v-switch v-model="switch1" :label="`Nuevo`"></v-switch>

        <!-- marcas -->
        <v-card>
          <v-card-title>Marca</v-card-title>
          <v-card-text>
            <v-checkbox
              v-model="marcas"
              value="Samsung"
              :label="`Samsung`"
            ></v-checkbox>
            <v-checkbox
              v-model="marcas"
              value="Huawei"
              :label="`Huawei`"
            ></v-checkbox>
            <v-checkbox
              v-model="marcas"
              value="Nokia"
              :label="`Nokia`"
            ></v-checkbox>
            <v-checkbox
              v-model="marcas"
              value="¡Phone"
              :label="`¡Phone:`"
            ></v-checkbox>
            <v-checkbox
              v-model="marcas"
              value="Xiaomi"
              :label="`Xiaomi`"
            ></v-checkbox>
          </v-card-text>
        </v-card>
        <!-- sistemas -->
        <v-card>
          <v-card-title>Sistema</v-card-title>
          <v-card-text>
            <v-checkbox
              v-model="sistemas"
              value="Android"
              :label="`Android`"
            ></v-checkbox>
            <v-checkbox
              v-model="sistemas"
              value="Windows"
              :label="`Windows`"
            ></v-checkbox>
            <v-checkbox
              v-model="sistemas"
              value="Ios"
              :label="`Ios`"
            ></v-checkbox>
          </v-card-text>
        </v-card>
        <!-- pantallas -->
        <v-card>
          <v-card-title>Pantalla</v-card-title>
          <v-card-text>
            <v-checkbox
              v-model="pantallas"
              value="6.0"
              :label="`6.0`"
            ></v-checkbox>
            <v-checkbox
              v-model="pantallas"
              value="5.5"
              :label="`5.5`"
            ></v-checkbox>
            <v-checkbox
              v-model="pantallas"
              value="5.0"
              :label="`5.0`"
            ></v-checkbox>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="9">
        <v-row>
          <!-- rango de precios -->
          <v-col lg="6">
            <v-card flat color="transparent">
              <v-subheader>Rango de Precios</v-subheader>

              <v-card-text>
                <v-row>
                  <v-col class="px-4">
                    <v-range-slider
                      v-model="range"
                      :max="max"
                      :min="min"
                      hide-details
                      class="align-center"
                    >
                      <template v-slot:prepend>
                        <v-text-field
                          :value="range[0]"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                          @change="$set(range, 0, $event)"
                        ></v-text-field>
                      </template>
                      <template v-slot:append>
                        <v-text-field
                          :value="range[1]"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                          @change="$set(range, 1, $event)"
                        ></v-text-field>
                      </template>
                    </v-range-slider>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <!-- ordenar por -->
          <v-col lg="6">
            <v-card class="pt-10">
              <v-row>
                <v-col lg="6">
                  <label class="pl-10">Ordenar Por:</label>
                </v-col>
                <v-col lg="6">
                  <v-select :items="items" label="Opcion" outlined></v-select>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="pt-10">
          <!-- productos de la pagina -->
          <v-col
            lg="3"
            v-for="(producto, key) in selectedItems"
            :key="key"
            v-show="switch1 === producto.nuevo"
          >
            <!-- switch1 === producto.nuevo &&  -->
            <v-card class="text-center">
              <v-img
                height="250"
                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
              ></v-img>
              <v-card-text>
                <h2 class="black--text">${{ producto.precio }}</h2>
              </v-card-text>
              <span>{{ producto.titulo }}</span>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col lg="8">
            <div class="text-center">
              <v-pagination v-model="page" :length="6"></v-pagination>
            </div>
          </v-col>
          <v-col
            lg="4"
            class="text-center"
            style="
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 15px;
            "
          >
            <span>Articulos por pagina</span>
            <v-select
              :items="articulos"
              item-text="state"
              label="12"
              persistent-hint
              return-object
              single-line
              style="max-width: 64px"
            >
            </v-select>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { db } from "../db";

export default {
  name: "Home",
  data() {
    return {
      switch1: false,

      // marcas de celulares
      marcas: [],

      // sistemas de los productos
      sistemas: [],

      // tamano de pantallas
      pantallas: [],

      // valores del rango de precio
      range: [0, 1000],
      min: 0,
      max: 1000,

      // items de Ordenar por
      items: ["precio", "fecha", "nombre"],

      // productos de la base de datos
      productos: [],

      page: 1,

      articulos: [{ state: "12" }, { state: "25" }, { state: "50" }],
    };
  },

  methods: {},
  computed: {
    // filtro por categorias
    selectedItems: function () {
      return this.productos.filter(function (newProductos) {
        if (
          this.marcas.length > 0 ||
          this.pantallas.length > 0 ||
          this.sistemas.length > 0
        ) {
          if ((this.marcas.length > 0) & (this.pantallas.length > 0)) {
            return (
              this.marcas.includes(newProductos.marca) &
              this.pantallas.includes(newProductos.pantalla)
            );
          } else if ((this.marcas.length > 0) & (this.sistemas.length > 0)) {
            return (
              this.marcas.includes(newProductos.marca) &
              this.sistemas.includes(newProductos.sistema)
            );
          } else if ((this.sistemas.length > 0) & (this.pantallas.length > 0)) {
            return (
              this.sistemas.includes(newProductos.sistema) &
              this.pantallas.includes(newProductos.pantalla)
            );
          } else {
            return (
              this.marcas.includes(newProductos.marca) ||
              this.sistemas.includes(newProductos.sistema) ||
              this.pantallas.includes(newProductos.pantalla)
            );
          }
        } else {
          return (
            !this.marcas.includes(newProductos.marca) &
            !this.sistemas.includes(newProductos.sistema) &
            !this.pantallas.includes(newProductos.pantalla)
          );
        }
      }, this);
    },
  },

  firestore: {
    productos: db.collection("productos"),
  },
};
</script>
