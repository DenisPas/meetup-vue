import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import { store } from './store'
import i18n from './i18n'
import * as firebase from 'firebase'


Vue.use(VueI18n)

Vue.config.productionTip = false

new Vue({
	VueI18n,
	vuetify,
	router,
	store,
	i18n,
	render: h => h(App),
	created() {
		firebase.initializeApp({
			apiKey: "AIzaSyDvMe3bZHGPk7rh6MQHN_RJC5dgTbzf5ZM",
			authDomain: "meetup-app-354ca.firebaseapp.com",
			projectId: "meetup-app-354ca",
			storageBucket: "meetup-app-354ca.appspot.com",
			messagingSenderId: "817928996467",
			appId: "1:817928996467:web:57c9b21c35d67734170c06",
			measurementId: "G-1JJ9Q4KDKP"
		})
	}
}).$mount('#app')
