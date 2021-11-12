<template>
  <v-row>
    <v-dialog
      v-model="dialog"
      transition="dialog-bottom-transition"
      fullscreen
      hide-overlay
    >
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="cancelar()">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Nuevo Anuncio</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        {{ asignarNid() }}
        <v-container class="pt-12">
          <v-row>
            <!-- Form de nuevo producto -->

            <v-col lg="6">
              <v-card>
                <v-card-text>
                  <v-row class="pb-2"
                    ><v-radio-group v-model="radioGroup">
                      <v-radio :label="`Nuevo`" :value="1"></v-radio>
                      <v-radio :label="`Usado`" :value="2"></v-radio>
                    </v-radio-group>
                  </v-row>
                  <v-row class="pb-8">
                    <v-text-field
                      style="max-width: 200px"
                      :rules="rules"
                      hide-details="auto"
                      solo
                      v-model="marca"
                      ><label slot="prepend">Marca:</label>
                    </v-text-field>
                  </v-row>
                  <v-row class="pb-1">
                    <v-text-field style="max-width: 200px" solo v-model="modelo"
                      ><label slot="prepend">Modelo:</label>
                    </v-text-field>
                  </v-row>
                  <v-row class="pb-8">
                    <v-text-field
                      style="max-width: 200px"
                      :rules="rules"
                      hide-details="auto"
                      label="0.0"
                      solo
                      v-model="pantalla"
                      ><label slot="prepend">Pantalla:</label
                      ><label slot="append">Pulgadas</label>
                    </v-text-field>
                  </v-row>
                  <v-row class="pb-4">
                    <v-select
                      :items="sistemas"
                      style="max-width: 200px"
                      solo
                      v-model="sistema"
                      ><label slot="prepend">Sistema:</label>
                    </v-select>
                  </v-row>
                  <v-row class="pb-1">
                    <v-text-field
                      style="max-width: 200px"
                      solo
                      v-model="rom"
                      type="number"
                      ><label slot="prepend">ROM:</label>
                      <label slot="append">GB</label>
                    </v-text-field>
                  </v-row>
                  <v-row class="pb-1">
                    <v-text-field
                      style="max-width: 200px"
                      solo
                      v-model="ram"
                      type="number"
                    >
                      <label slot="prepend">RAM:</label
                      ><label slot="append">GB</label>
                    </v-text-field>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- form datos extra -->

            <v-col lg="6">
              <v-row>
                <h3>Titulo breve del anuncio</h3>
              </v-row>
              <!-- input de titulo -->
              <v-row class="pb-8"
                ><v-text-field
                  style="max-width: 75%"
                  :rules="rules"
                  hide-details="auto"
                  solo
                  v-model="titulo"
                ></v-text-field>
              </v-row>
              <!-- Input vendedor -->
              <v-row class="pb-8">
                <v-text-field
                  style="max-width: 50%"
                  :rules="rules"
                  hide-details="auto"
                  solo
                  v-model="vendedor"
                  ><label slot="prepend">Vendedor:</label>
                </v-text-field>
              </v-row>
              <!-- input telefono -->
              <v-row class="pb-8">
                <v-text-field
                  style="max-width: 40%"
                  :rules="rules"
                  hide-details="auto"
                  label="0000-0000"
                  solo
                  v-model="telefono"
                  ><label slot="prepend">Telefono:</label>
                </v-text-field>
              </v-row>
              <!-- textarea descripcion -->
              <v-row>
                <h4>Descripcion:</h4>
              </v-row>
              <v-row>
                <v-textarea
                  solo
                  name="input-7-4"
                  label="Descripcion del producto"
                  value=""
                  style="max-width: 70%"
                  v-model="descripcion"
                ></v-textarea>
              </v-row>
              <!-- input Precio -->
              <v-row>
                <h4>Precio:</h4>
              </v-row>
              <v-row>
                <v-text-field
                  style="max-width: 25%"
                  :rules="rules"
                  hide-details="auto"
                  label="00.00"
                  solo
                  v-model="precio"
                >
                  <label slot="prepend">$</label>
                </v-text-field>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <!-- botones de agregar y cancelar -->
            <v-col lg="3">
              <v-row class="pb-4">
                <v-btn @click="agregar" color="blue" class="white--text"
                  ><v-icon color="white">mdi-plus-circle</v-icon>Agregar</v-btn
                >
              </v-row>
              <v-row>
                <v-btn @click="cancelar()" color="blue" class="white--text"
                  ><v-icon color="white">mdi-close-circle</v-icon
                  >Cancelar</v-btn
                >
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="text-center">
              <span class="subtitle-1">Agregar Imagenes</span>
            </v-col>
            <v-col cols="12" md="6">
              <v-file-input
                v-model="file"
                multiple
                label="Agregar Imagen"
                accept="image/*"
              ></v-file-input>
              <v-btn :disabled="file == null" @click="upload()">Subir</v-btn>
              <v-carousel>
                <v-carousel-item
                  v-for="(imagen, i) in imagenesUrl"
                  :key="i"
                  :src="imagen"
                  reverse-transition="fade-transition"
                  transition="fade-transition"
                ></v-carousel-item>
              </v-carousel>
            </v-col>
            <v-col cols="12" md="6" class="hidden-sm-and-down">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left">Nombre</th>
                      <th class="text-left">Tamaño</th>
                      <th class="text-left">-</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, key) in imagenes" :key="key">
                      <td>{{ item }}</td>
                      <td></td>
                      <td>
                        <v-btn @click="eliminarImagen(key)">Borrar</v-btn>
                      </td>
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
import { db, st } from "../db";
export default {
  name: "Modal",
  data() {
    return {
      // datos del objeto
      titulo: "",
      nuevo: true,
      marca: "",
      modelo: "",
      pantalla: null,
      sistema: "Android",
      rom: 0,
      ram: 0,
      vendedor: "",
      telefono: "",
      descripcion: "",
      precio: 0,
      hoy: new Date().toLocaleDateString(),

      dialog: false,
      radioGroup: 1,

      //   reglas del input
      rules: [
        (value) => !!value || "Requerido.",
        (value) => (value && value.length >= 3) || "Min 3 caracteres",
      ],

      //   sistemas
      sistemas: ["Android", "Windows", "Ios"],

      // datos de imagenes
      nid: 0,
      file: null,
      downloadURL: "",
      fileName: "",
      imagenes: [],
      imagenesUrl: [],
      y: null,

      borrado: false,
      // productos de la bd
      productos: [],
    };
  },
  methods: {
    asignarNid() {
      if (this.productos.length === 0) {
        this.nid = 1;
      } else {
        this.nid = this.productos.length + 1;
      }
    },

    cancelar() {
      // formatear el modal
      (this.titulo = ""),
        (this.nuevo = true),
        (this.marca = ""),
        (this.modelo = ""),
        (this.pantalla = null),
        (this.sistema = "Android"),
        (this.rom = 0),
        (this.ram = 0),
        (this.vendedor = ""),
        (this.telefono = ""),
        (this.descripcion = ""),
        (this.precio = 0),
        (this.hoy = new Date().toLocaleDateString()),
        (this.radioGroup = 1),
        (this.file = null),
        (this.downloadURL = ""),
        (this.fileName = ""),
        (this.imagenes = []),
        (this.imagenesUrl = []);
      this.borrado = false;

      // cerrar ventana
      this.dialog = false;
    },

    agregar() {
      let newPro = true;

      if (this.radioGroup === 1) {
        newPro = true;
      } else {
        newPro = false;
      }
      var newProduc = {
        titulo: this.titulo,
        marca: this.marca,
        nuevo: newPro,
        modelo: this.modelo,
        pantalla: this.pantalla,
        sistema: this.sistema,
        rom: this.rom.valueOf(),
        ram: this.ram.valueOf(),
        vendedor: this.vendedor,
        telefono: this.telefono,
        descripcion: this.descripcion,
        precio: parseFloat(this.precio),
        fecha: this.hoy,
        nid: this.nid,
        imagenes: this.imagenesUrl,
      };

      db.collection("productos").add(newProduc);
      this.cancelar();
    },

    upload() {
      let bandera = true;
      this.fileName = this.file[0].name;
      this.limpiarCarpeta();
      let carpeta = "IDanuncio/" + this.nid + "/" + this.fileName;
      var archivo = st.ref(carpeta);
      archivo
        .put(this.file[0])
        .then(() => {
          archivo.getDownloadURL().then((url) => {
            this.downloadURL = url;
            for (let nombre in this.imagenes) {
              if (this.imagenes[nombre] == this.fileName) {
                bandera = false;
                let ultimo = Object.keys(this.imagenesUrl).length;
                this.imagenesUrl.push(this.downloadURL);
                this.imagenesUrl[nombre] = this.imagenesUrl[ultimo];
                this.imagenesUrl.pop(this.downloadURL);
              }
            }
            this.file = null;
            this.fileName = "";

            if (bandera == true) {
              this.imagenesUrl.push(this.downloadURL);
              this.listarImagenes();
            } else {
              this.listarImagenes();
            }
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    eliminarImagen(index) {
      this.imagenesUrl.splice(index, 1);
      st.ref("IDanuncio/" + this.nid + "/" + this.imagenes.splice(index, 1))
        .delete()
        .then(() => {
          this.downloadURL = "";
        })
        .catch((error) => {
          console.log(error);
        });
      this.file = null;
      this.fileName = "";
    },
    listarImagenes() {
      var this2 = this;
      this2.imagenes = [];
      st.ref()
        .child("IDanuncio/" + this2.nid + "/")
        .listAll()
        .then((res) => {
          res.items.forEach(function (itemRef) {
            /* console.log(itemRef.tamanio) */
            this2.imagenes.push(itemRef.name);
          });
        })
        .catch((error) => {
          console.log(error);
        });
      this.imagenesUrl.sort();
    },

    limpiarCarpeta() {
      // let images = [];
      st.ref()
        .child("IDanuncio/" + this.nid + "/")
        .listAll()
        .then((res) => {
          let x = res.items.length;

          // carpeta nueva
          if (this.borrado === false && x === 0) {
            this.borrado = true;
            // carpeta existente con imagenes
          } else if (this.borrado === false && x > 0) {
            for (let i = 0; i < x; i++) {
              st.ref(
                "IDanuncio/" + this.nid + "/" + res.items[i].name
              ).delete();
            }
            this.borrado = true;
            // misma carpeta con imagenes
          }
        });
    },
  },

  firestore: {
    productos: db.collection("productos"),
  },
};
</script>

