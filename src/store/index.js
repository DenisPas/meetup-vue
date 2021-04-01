import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import {error} from "vue-i18n/src/util";

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
        createMeetup(state, payload) {
            state.loadedMeetups.push(payload)
        },
        setUser(state, payload) {
            state.user = payload
        }
    },
    actions: {
        createMeetup({commit}, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                imageUrl: payload.imageUrl,
                discription: payload.discription,
                date: payload.date,
            }
            commit('create meetup', meetup)
        },
        signUserUp({commit}, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        const newUser = {
                            id: user.uid,
                            registeredMeetups: []
                        }
                        commit('setUser',newUser)
                    }
                )
                .catch(error => {
                    console.log(error)
                })
        },
        signUserIn({commit}, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                user => {
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: []
                    }
                    commit('setUser',newUser)
                }
            )
                .catch(error => {
                    console.log(error)
                })
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
