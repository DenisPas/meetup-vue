import Vue from 'vue'
import Vuex from 'vuex'
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

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
            description: "43r43rfge"
        },
            {
                imageUrl:
                    "https://image.freepik.com/free-photo/st-basil-s-cathedral-red-square-moscow-russia-night_118086-2313.jpg",
                id: "234555",
                title: "Moscow",
                date: "2021-07-22",
                location: "New York",
                description: "trgretgvtr",
            }],
        user: null,
        loading: false,
        error: null,
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
        },
        setLoading(state, payload) {
            state.loading = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null
        },
    },
    actions: {
        onLogout({ commit }) {
            firebase.auth().signOut()
            commit('setUser', null)
        },
        loadMeetups({ commit }) {
            commit('setLoading', true)
            firebase.database().ref('meetups').once('value')
                .then((data) => {
                    const meetups = []
                    const obj = data.val()
                    for (let key in obj) {
                        meetups.push({
                            id: key,
                            title: obj[key].title,
                            description: obj[key].description,
                            imageUrl: obj[key].imageUrl,
                            date: obj[key].date,
                            creatorId: obj[key].creatorId,
                            location: obj[key].location,
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
        createMeetup ({commit, getters}, payload) {
            const meetup = {
                title: payload.title,
                location: payload.location,
                description: payload.description,
                date: payload.date,
                creatorId: getters.user.id
            }
            let imageUrl
            let key
            firebase.database().ref('meetups').push(meetup)
                .then((data) => {
                    key = data.key
                    return key
                })
                .then(key => {
                    const filename = payload.image.name
                    const ext = filename.slice(filename.lastIndexOf('.'))
                    return firebase.storage().ref('meetups/' + key + ext).put(payload.image)

                })
                .then(fileData => {
                    imageUrl = fileData.metadata.downloadURLs[0]
                    return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
                })
                .then(() => {
                    commit('createMeetup', {
                        ...meetup,
                        imageUrl: imageUrl,
                        id: key
                    })
                })
                .catch((error) => {
                    console.log(error)
                })
            // Reach out to firebase and store it
        },
        signUserUp({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            console.log('up')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then((userCredential) => {
                        const newUser = {
                        id: userCredential.user.uid,
                        registeredMeetups: []
                    }
                    commit('setLoading', false)
                    commit('setUser', newUser)
                    }
                )
                .catch(error => {
                        commit('setLoading', false),
                        commit('setError', error),
                        console.log(error)
                })
        },
        signUserIn({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    commit('setLoading', false),
                    user => {
                        console.log(user)
                        const newUser = {
                            id: user.uid,
                            registeredMeetups: []
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch(error => {
                    commit('setLoading', false),
                    commit('setError', error),
                    console.log(error)
                })
        },
        autoSignIn({ commit }, payload) {
            commit('setUser', { id: payload.uid, registeredMeetups: [] })
        },
        clearError({commit}) {
            commit('clearError')
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
        },
        loading (state) {
            return state.loading
        },
        error (state) {
            return state.error
        }
    }
})
