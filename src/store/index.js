import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app';

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		loadedMeetups: [{
			imageUrl:
				"https://anotherrussia.com/upload/medialibrary/ff9/moscow-saint-petersburg-1.jpg",
			id: "2345",
			title: "Saint Petersburg",
			date: "2021-09-22",
			location: "spb",
			discription: "43r43rfge"
		},
		{
			imageUrl:
				"https://image.freepik.com/free-photo/st-basil-s-cathedral-red-square-moscow-russia-night_118086-2313.jpg",
			id: "234555",
			title: "Moscow",
			date: "2021-07-22",
			location: "New York",
			discription: "trgretgvtr",
		}],
		user: null
	},
	mutations: {
		setLoadedMeetups(state, payload) {
			state.loadedMeetups = payload
		},
		createMeetup(state, payload) {
			state.loadedMeetups.push(payload)
		},
		setUser(state, payload) {
			state.user = payload
		}
	},
	actions: {
		onLogout({ commit }) {
			firebase.auth().signOut()
			commit('setUser', null)
		},
		loadMeetups({ commit }) {
			commit('setLoading', true)
			firebase.database().ref('meetups').on('value')
				.then((data) => {
					const meetups = []
					const obj = data.val()
					for (let key in obj) {
						meetups.push({
							id: key,
							title: obj[key].title,
							discription: obj[key].discription,
							imageUrl: obj[key].imageUrl,
							date: obj[key].date,
							creatorId: obj[key].creatorId,

						})
					}
					commit('setLoadedMeetups', meetups)
					commit('setLoading', false)

				})
				.catch((error) => {
					commit('setLoading', true)
					console.log(error)
				})
		},
		createMeetup({ commit, getters }, payload) {
			const meetup = {
				title: payload.title,
				location: payload.location,
				discription: payload.discription,
				date: payload.date.toISOString(),
				creatorId: getters.user.id
			}
			let imageUrl
			let key
			firebase.database().ref('meetups').push(meetup)
				.then((data) => {
					const key = data.key
					return key
				})
				.then(key => {
					const filename = payload.image.name
					const ext = filename.slice(filename.lastIndexOf('.'))
					return firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
				})
				.then(fileData => {
					imageUrl = fileData.metadata.downloadURLs[0]
					return firebase.database().ref('meetups').child(key).update({ imageUrl: imageUrl })
				})
				.then(() => {
					commit('create meetup', { ...meetup, id: key, imageUrl: imageUrl })
				})
				.catch((error) => {
					console.log(error)
				})
		},
		signUserUp({ commit }, payload) {
			firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
				.then(
					user => {
						const newUser = {
							id: user.uid,
							registeredMeetups: []
						}
						commit('setUser', newUser)
					}
				)
				.catch(error => {
					console.log(error)
				})
		},
		signUserIn({ commit }, payload) {
			firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
				.then(
					user => {
						const newUser = {
							id: user.uid,
							registeredMeetups: []
						}
						commit('setUser', newUser)
					}
				)
				.catch(error => {
					console.log(error)
				})
		},
		autoSignIn({ commit }, payload) {
			commit('setUser', { id: payload.uid, registeredMeetups: [] })
		}

	},
	getters: {
		featuredMeetups(state, getters) {
			return getters.loadedMeetups.slice(0, 5)
		},
		loadedMeetups(state) {
			return state.loadedMeetups.sort((meetupA, meetupB) => {
				return meetupA.date > meetupB.date
			})
		},
		loadedMeetup(state) {
			return (meetupId) => {
				return state.loadedMeetups.find((meetup) => {
					return meetup.id === meetupId
				})
			}
		},
		user(state) {
			return state.user
		}
	}
})
