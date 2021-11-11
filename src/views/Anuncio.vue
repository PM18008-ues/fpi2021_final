<template>
  <div>
    <h1>{{ anuncio.titulo }}</h1>
    <v-carousel :show-arrows="false">
      <v-carousel-item
        v-for="(img, i) in anuncio.imagenes"
        :src="img"
        :key="i"
      ></v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
import { db } from "../db";
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
  },

  created() {
    this.mostrarProducto();
  },
};
</script>
