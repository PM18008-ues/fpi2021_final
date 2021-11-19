import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
      themes: {
        light: {
          primary: "#9F0A2F", //colores principales
          secondary: "#ff0000", //color secundario
          accent: colors.indigo.base, // #3F51B5
        },
      },
    },
  })