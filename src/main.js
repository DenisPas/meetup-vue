import Vue from 'vue'
import VueI18n from 'vue-i18n'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import router from './router'
import { store } from './store'
import i18n from './i18n'
import firebase from "firebase/app";
import "firebase/auth";
// import firebase from 'firebase';
// import * as firebase from 'firebase'
import AlertCmp from './components/Shared/Alert.vue'

import EditMeetupDetailsDialog from './components/Meetup/Edit/EditMeetupDetailsDialog.vue'
import EditMeetupDateDialog from './components/Meetup/Edit/EditMeetupDateDialog.vue'
import EditMeetupTimeDialog from './components/Meetup/Edit/EditMeetupTimeDialog.vue'
import RegisterDialog from './components/Meetup/Registration/RegisterDialog.vue'


Vue.use(VueI18n)
Vue.component('app-edit-meetup-details-dialog', EditMeetupDetailsDialog)
Vue.component('app-edit-meetup-date-dialog', EditMeetupDateDialog)
Vue.component('app-edit-meetup-time-dialog', EditMeetupTimeDialog)
Vue.component('app-meetup-register-dialog', RegisterDialog)

Vue.component('app-alert', AlertCmp)
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
			measurementId: "G-1JJ9Q4KDKP",
			databaseURL: "https://meetup-app-354ca-default-rtdb.firebaseio.com/",
		})
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.$store.dispatch('autoSignIn', user)
				this.$store.dispatch('fetchUserData')
			}
		})
		this.$store.dispatch('loadMeetups')
	}
}).$mount('#app')
