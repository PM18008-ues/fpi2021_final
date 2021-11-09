<template>
  <v-container>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition">
      <v-card>
        <v-card-title>Nuevo Anuncio</v-card-title>
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
                  <label class="pr-4">Marca:</label>
                  <v-text-field
                    style="max-width: 200px"
                    :rules="rules"
                    hide-details="auto"
                    filled
                  ></v-text-field>
                </v-row>
                <v-row class="pb-1">
                  <label class="pr-3">Modelo:</label>
                  <v-text-field style="max-width: 200px" filled></v-text-field>
                </v-row>
                <v-row class="pb-8">
                  <label class="pr-3">Pantalla:</label>
                  <v-text-field
                    style="max-width: 200px"
                    :rules="rules"
                    hide-details="auto"
                    filled
                  ></v-text-field>
                </v-row>
                <v-row class="pb-8">
                  <label class="pr-3">Sistema:</label>
                  <v-select
                    :items="sistemas"
                    style="max-width: 200px"
                    filled
                    v-model="sistem"
                  ></v-select>
                </v-row>
                <v-row class="pb-1">
                  <label class="pr-7">ROM:</label>
                  <v-text-field style="max-width: 200px" filled></v-text-field>
                </v-row>
                <v-row class="pb-1">
                  <label class="pr-7">RAM:</label>
                  <v-text-field style="max-width: 200px" filled></v-text-field>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
          <!-- form datos extra -->
          <v-col lg="6"></v-col>
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      dialog: false,
      radioGroup: 1,
      //   reglas del input
      rules: [
        (value) => !!value || "Required.",
        (value) => (value && value.length >= 3) || "Min 3 characters",
      ],

      //   sistemas
      sistem: "Android",
      sistemas: ["Android", "Windows", "Ios"],
    };
  },
};
</script>

