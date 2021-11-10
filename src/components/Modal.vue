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
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Nuevo Anuncio</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
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
                    <label class="pr-4 pt-5">Marca:</label>
                    <v-text-field
                      style="max-width: 200px"
                      :rules="rules"
                      hide-details="auto"
                      solo
                      v-model="marca"
                    ></v-text-field>
                  </v-row>
                  <v-row class="pb-1">
                    <label class="pr-3 pt-5">Modelo:</label>
                    <v-text-field style="max-width: 200px" solo></v-text-field>
                  </v-row>
                  <v-row class="pb-8">
                    <label class="pr-3 pt-5">Pantalla:</label>
                    <v-text-field
                      style="max-width: 200px"
                      :rules="rules"
                      hide-details="auto"
                      solo
                      v-model="modelo"
                    ></v-text-field>
                    <label class="pl-3 pt-5">Pulgadas</label>
                  </v-row>
                  <v-row class="pb-4">
                    <label class="pr-3 pt-5">Sistema:</label>
                    <v-select
                      :items="sistemas"
                      style="max-width: 200px"
                      solo
                      v-model="sistema"
                    ></v-select>
                  </v-row>
                  <v-row class="pb-1">
                    <label class="pr-7 pt-5">ROM:</label>
                    <v-text-field
                      style="max-width: 200px"
                      solo
                      v-model="rom"
                    ></v-text-field>
                  </v-row>
                  <v-row class="pb-1">
                    <label class="pr-7 pt-5">RAM:</label>
                    <v-text-field
                      style="max-width: 200px"
                      solo
                      v-model="ram"
                    ></v-text-field>
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
                <label class="pr-7 pt-5">Vendedor:</label>
                <v-text-field
                  style="max-width: 50%"
                  :rules="rules"
                  hide-details="auto"
                  solo
                  v-model="vendedor"
                ></v-text-field>
              </v-row>
              <!-- input telefono -->
              <v-row class="pb-8">
                <label class="pr-7 pt-5">Telefono:</label>
                <v-text-field
                  style="max-width: 40%"
                  :rules="rules"
                  hide-details="auto"
                  solo
                  v-model="telefono"
                ></v-text-field>
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
                  label="$00.00"
                  solo
                  v-model="precio"
                ></v-text-field>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <v-col lg="6">
              <v-card>
                <v-card-title>Imagenes</v-card-title>
                <v-card-text>
                  <v-row
                    ><v-col lg="3">
                      <v-row><v-btn>Agregar</v-btn></v-row>
                      <v-row><v-btn>Eliminar</v-btn></v-row>
                    </v-col></v-row
                  >
                </v-card-text>
              </v-card>
            </v-col>
            <!-- botones de agregar y cancelar -->
            <v-col lg="3">
              <v-row class="pb-4">
                <v-btn @click="agregar" color="blue" class="white--text"
                  ><v-icon color="white">mdi-plus-circle</v-icon>Agregar</v-btn
                >
              </v-row>
              <v-row>
                <v-btn @click="dialog = false" color="blue" class="white--text"
                  ><v-icon color="white">mdi-close-circle</v-icon
                  >Cancelar</v-btn
                >
              </v-row>
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { db } from "../db";
export default {
  name: "Modal",
  data() {
    return {
      // datos del objeto
      titulo: "",
      nuevo: true,
      marca: "",
      modelo: "",
      pantalla: "",
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
    };
  },
  methods: {
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
        precio: this.precio.valueOf(),
        fecha: this.hoy,
      };
      console.log(newProduc);
      this.dialog = false;
      db.collection("productos").add(newProduc);
    },
  },
};
</script>

