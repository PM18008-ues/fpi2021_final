<template>
  <v-container>
    <v-row>
      <!-- Filtros de la tienda -->
      <v-col lg="3">
        <!-- switch de nuevo -->
        <v-switch v-model="switch1" :label="`Nuevo`"></v-switch>
        <!-- marcas -->
        <v-card>
          <v-card-title
            style="
              border-top-style: solid;
              border-right-style: solid;
              border-left-style: solid;
              border-color: #ffcdd2;
            "
            >Marca</v-card-title
          >
          <v-card-text
            style="
              border-top-style: dotted;
              border-right-style: solid;
              border-bottom-style: solid;
              border-left-style: solid;
              border-color: #ffcdd2;
            "
          >
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
              :label="`¡Phone`"
            ></v-checkbox>
            <v-checkbox
              v-model="marcas"
              value="Xiaomi"
              :label="`Xiaomi`"
            ></v-checkbox>
            <v-checkbox
              v-model="marcas"
              value="Motorola"
              :label="`Motorola`"
            ></v-checkbox>
          </v-card-text>
        </v-card>
        <!-- sistemas -->
        <v-card>
          <v-card-title
            style="
              border-right-style: solid;
              border-left-style: solid;
              border-color: #ffcdd2;
            "
            >Sistema</v-card-title
          >
          <v-card-text
            style="
              border-top-style: dotted;
              border-right-style: solid;
              border-bottom-style: solid;
              border-left-style: solid;
              border-color: #ffcdd2;
            "
          >
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
          <v-card-title
            style="
              border-right-style: solid;
              border-left-style: solid;
              border-color: #ffcdd2;
            "
            >Pantalla</v-card-title
          >
          <v-card-text
            style="
              border-top-style: dotted;
              border-right-style: solid;
              border-bottom-style: solid;
              border-left-style: solid;
              border-color: #ffcdd2;
            "
          >
            <v-checkbox
              v-model="pantallas"
              value="7.0"
              :label="`7.0`"
            ></v-checkbox>
            <v-checkbox
              v-model="pantallas"
              value="6.5"
              :label="`6.5`"
            ></v-checkbox>
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
                  <v-row><label class="pl-10">Ordenar Por:</label></v-row>
                  <v-row class="pl-12">
                    <v-radio-group v-model="radioGroup">
                      <v-radio :label="`Asc`" :value="1"></v-radio>
                      <v-radio :label="`Des`" :value="2"></v-radio>
                    </v-radio-group>
                  </v-row>
                </v-col>
                <v-col lg="5">
                  <v-select
                    :items="items"
                    label="Opcion"
                    v-model="opcion"
                    outlined
                  ></v-select>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="pt-10">
          <!-- productos de la pagina -->
          <v-col lg="3" v-for="(producto, key) in buscarProductos" :key="key">
            <v-hover v-slot:default="{ hover }">
              <v-card class="text-center" color="grey lighten-4">
                <v-img height="250px" :src="producto.imagenes[0]">
                  <v-expand-transition>
                    <div
                      v-if="hover"
                      class="
                        d-flex
                        justify-center
                        align-center
                        text-center
                        transition-fast-in-fast-out
                        grey
                        darken-2
                        v-card--reveal
                        display-3
                        white--text
                      "
                      style="height: 100%; opacity: 0.95"
                    >
                      <v-btn
                        v-if="hover"
                        :to="'/Anuncio/' + producto.id"
                        color="primary"
                        >Detalles</v-btn
                      >
                    </div>
                  </v-expand-transition>
                </v-img>
                <v-card-text>
                  <h2 class="black--text">${{ producto.precio }}</h2>
                </v-card-text>
                <span>{{ producto.titulo }}</span>
                <br />
                <span>{{ producto.fecha }}</span>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
        <v-row>
          <!-- paginador -->
          <v-col lg="8">
            <div class="text-center">
              <v-pagination
                v-model="page"
                :length="tamanio"
                :total-visible="7"
              ></v-pagination>
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
              v-model="e1"
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
      // switch de nuevo producto
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

      // valor de asc y des
      radioGroup: 0,

      // items de Ordenar por
      items: ["precio", "fecha", "nombre"],

      opcion: "",

      // productos de la base de datos
      productos: [],

      // #pagina del pagination
      page: 1,

      // #articulos por pagina default
      e1: 5,

      // tamanio de paginador
      tamanio: 0,

      // articulos por pagina
      articulos: [5, 10, 15, 20, 25],
    };
  },

  methods: {
    tamPaginas(arreglo) {
      this.tamanio = 0;
      if (arreglo.length >= this.e1) {
        if (arreglo.length % this.e1 > 0) {
          this.tamanio = Math.trunc(arreglo.length / this.e1) + 1;
        } else {
          this.tamanio = arreglo.length / this.e1;
        }
      } else {
        this.tamanio = 1;
      }
      console.log(this.tamanio);
    },

    paginarProductos(arreglo) {
      let nuevo = [];
      for (let i = (this.page - 1) * this.e1; i < this.page * this.e1; i++) {
        if (i < arreglo.length) {
          nuevo.push(arreglo[i]);
        }
      }
      return nuevo;
    },
  },
  props: ["busqueda"],
  computed: {
    // filtro por categorias y rango de precios
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
              this.pantallas.includes(newProductos.pantalla) &
              (this.switch1 === newProductos.nuevo) &
              ((newProductos.precio >= this.range[0]) &
                (newProductos.precio <= this.range[1]))
            );
          } else if ((this.marcas.length > 0) & (this.sistemas.length > 0)) {
            return (
              this.marcas.includes(newProductos.marca) &
              this.sistemas.includes(newProductos.sistema) &
              (this.switch1 === newProductos.nuevo) &
              ((newProductos.precio >= this.range[0]) &
                (newProductos.precio <= this.range[1]))
            );
          } else if ((this.sistemas.length > 0) & (this.pantallas.length > 0)) {
            return (
              this.sistemas.includes(newProductos.sistema) &
              this.pantallas.includes(newProductos.pantalla) &
              (this.switch1 === newProductos.nuevo) &
              ((newProductos.precio >= this.range[0]) &
                (newProductos.precio <= this.range[1]))
            );
          } else {
            return (
              (this.marcas.includes(newProductos.marca) ||
                this.sistemas.includes(newProductos.sistema) ||
                this.pantallas.includes(newProductos.pantalla)) &
              (this.switch1 === newProductos.nuevo) &
              ((newProductos.precio >= this.range[0]) &
                (newProductos.precio <= this.range[1]))
            );
          }
        } else {
          return (
            !this.marcas.includes(newProductos.marca) &
            !this.sistemas.includes(newProductos.sistema) &
            !this.pantallas.includes(newProductos.pantalla) &
            (this.switch1 === newProductos.nuevo) &
            ((newProductos.precio >= this.range[0]) &
              (newProductos.precio <= this.range[1]))
          );
        }
      }, this);
    },

    // ordenar Productos
    orderarProductos: function () {
      let y = this.paginarProductos(this.selectedItems);
      let copia = y.slice();
      // precio Asc
      if (this.radioGroup === 1 && this.opcion === "precio") {
        return copia.sort((a, b) => {
          if (a.precio === b.precio) {
            return 0;
          }

          if (a.precio < b.precio) {
            return -1;
          }

          if (a.precio > b.precio) {
            return 1;
          }
        });
        // precio Des
      } else if (this.radioGroup === 2 && this.opcion === "precio") {
        return copia.sort((a, b) => {
          if (a.precio === b.precio) {
            return 0;
          }

          if (a.precio < b.precio) {
            return 1;
          }

          if (a.precio > b.precio) {
            return -1;
          }
        });
        // nombre Asc
      } else if (this.radioGroup === 1 && this.opcion === "nombre") {
        return copia.sort((a, b) => {
          if (a.titulo.toLowerCase() === b.titulo.toLowerCase()) {
            return 0;
          }

          if (a.titulo.toLowerCase() < b.titulo.toLowerCase()) {
            return -1;
          }

          if (a.titulo.toLowerCase() > b.titulo.toLowerCase()) {
            return 1;
          }
        });
        // nombre Des
      } else if (this.radioGroup === 2 && this.opcion === "nombre") {
        return copia.sort((a, b) => {
          if (a.titulo.toLowerCase() === b.titulo.toLowerCase()) {
            return 0;
          }

          if (a.titulo.toLowerCase() < b.titulo.toLowerCase()) {
            return 1;
          }

          if (a.titulo.toLowerCase() > b.titulo.toLowerCase()) {
            return -1;
          }
        });
        // fecha Asc
      } else if (this.radioGroup === 1 && this.opcion === "fecha") {
        return copia.sort((a, b) => {
          if (new Date(a.fecha) === new Date(b.fecha)) {
            return 0;
          }

          if (new Date(a.fecha) < new Date(b.fecha)) {
            return -1;
          }

          if (new Date(a.fecha) > new Date(b.fecha)) {
            return 1;
          }
        });
        // fecha Des
      } else if (this.radioGroup === 2 && this.opcion === "fecha") {
        return copia.sort((a, b) => {
          if (new Date(a.fecha) === new Date(b.fecha)) {
            return 0;
          }

          if (new Date(a.fecha) < new Date(b.fecha)) {
            return 1;
          }

          if (new Date(a.fecha) > new Date(b.fecha)) {
            return -1;
          }
        });
      } else {
        return copia;
      }
    },

    // buscar productos segun el titulo
    buscarProductos: function () {
      if (this.busqueda.length === 0) {
        this.tamPaginas(this.selectedItems.slice());
        return this.orderarProductos.slice();
      } else {
        let y = this.productos.filter((item) => {
          let x = item.titulo
            .toLowerCase()
            .indexOf(this.busqueda.toLowerCase());
          return x >= 0;
        });
        this.tamPaginas(y);
        let w = this.paginarProductos(y);
        return w;
      }
    },
  },

  firestore: {
    productos: db.collection("productos"),
  },
};
</script>

