<template>
  <v-container>
    <v-row>
      <!-- Filtros de la tienda -->
      <v-col lg="3">
        <!-- switch de nuevo -->
        <v-switch v-model="switch1" :label="`Nuevo`"></v-switch>
        {{ switch1 }}
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
            <v-card class="text-center">
              <v-img
                height="250"
                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
              ></v-img>
              <v-card-text>
                <h2 class="black--text">${{ producto.precio }}</h2>
              </v-card-text>
              <span>{{ producto.titulo }}</span>
              <br />
              <span>{{ producto.fecha }}</span>
              <br />
              <span>{{ producto.nuevo }}</span>
              <v-btn :to="'/Anuncio/' + producto.id">ver</v-btn>
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
      e1: "12",

      // articulos por pagina
      articulos: ["12", "25", "50"],
    };
  },

  methods: {},
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
            console.log("opc1");
            return (
              this.marcas.includes(newProductos.marca) &
              this.pantallas.includes(newProductos.pantalla) &
              (this.switch1 === newProductos.nuevo) &
              ((newProductos.precio >= this.range[0]) &
                (newProductos.precio <= this.range[1]))
            );
          } else if ((this.marcas.length > 0) & (this.sistemas.length > 0)) {
            console.log("opc2");
            return (
              this.marcas.includes(newProductos.marca) &
              this.sistemas.includes(newProductos.sistema) &
              (this.switch1 === newProductos.nuevo) &
              ((newProductos.precio >= this.range[0]) &
                (newProductos.precio <= this.range[1]))
            );
          } else if ((this.sistemas.length > 0) & (this.pantallas.length > 0)) {
            console.log("opc3");
            return (
              this.sistemas.includes(newProductos.sistema) &
              this.pantallas.includes(newProductos.pantalla) &
              (this.switch1 === newProductos.nuevo) &
              ((newProductos.precio >= this.range[0]) &
                (newProductos.precio <= this.range[1]))
            );
          } else {
            console.log("opc4");
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
          console.log("opc5");
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
      let copia = this.selectedItems.slice();
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
    buscarProductos: function () {
      if (this.busqueda.length === 0) {
        return this.orderarProductos.slice();
      } else {
        return this.productos.filter((item) => {
          let x = item.titulo
            .toLowerCase()
            .indexOf(this.busqueda.toLowerCase());
          return x >= 0;
        });
      }
      // console.log(this.busqueda);
      // return "";
    },
  },

  firestore: {
    productos: db.collection("productos"),
  },
};
</script>
