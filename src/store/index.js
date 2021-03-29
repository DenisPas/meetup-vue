import Vue from 'vue'
import Vuex from 'vuex'

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
		user: {
			id: 'regj54i',
			registeredMeetups: ['234555']
		}
	},
	mutations: {
		createMeetup(state, payload) {
			state.loadedMeetups.push(payload)
		}
	},
	actions: {
		createMeetup({ commit }, payload) {
			const meetup = {
				title: payload.title,
				location: payload.location,
				imageUrl: payload.imageUrl,
				discription: payload.discription,
				date: payload.date,
			}
			commit('create meetup', meetup)
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
		}
	}
})