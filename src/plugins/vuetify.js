import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
// import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#f94d6a',
                input: '#2a1f31',
                btnColor: '#b460bb',
            },
        },
    },
})
