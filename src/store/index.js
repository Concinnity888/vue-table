import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const URL = 'http://localhost:3000/person'

export default new Vuex.Store({
  state: {
    persons: []
  },
  getters: {
    allPersons: (state) => state.persons
  },
  actions: {
    getPersons ({ commit }) {
      axios(URL, {
        method: 'GET'
      })
        .then((response) => commit('GET_PERSONS', response.data))
        .catch((error) => console.log('Request failed', error))
    },
    addEntry ({ commit }, payload) {
      axios(URL, {
        method: 'POST',
        data: payload
      })
        .then((response) => commit('ADD_ENTRY', { ...response.data, ...payload }))
        .catch((error) => console.log('Request failed', error))
    },
    updateEntry ({ commit }, payload) {
      axios(`${URL}/${payload.uuid}`, {
        method: 'PUT',
        data: payload
      })
        .then((response) => commit('UPDATE_ENTRY', payload))
        .catch((error) => console.log('Request failed', error))
    },
    deleteEntry ({ commit }, payload) {
      axios(`${URL}/${payload}`, {
        method: 'DELETE'
      })
        .then((response) => commit('DELETE_ENTRY', payload))
        .catch((error) => console.log('Request failed', error))
    }
  },
  mutations: {
    GET_PERSONS (state, payload) {
      state.persons = payload
    },
    ADD_ENTRY (state, payload) {
      state.persons.push(payload)
    },
    UPDATE_ENTRY (state, payload) {
      const idx = state.persons.findIndex((person) => person.uuid === payload.uuid)

      if (idx !== -1) {
        state.persons[idx] = payload
      }
    },
    DELETE_ENTRY (state, payload) {
      state.persons = state.persons.filter((person) => person.uuid !== payload)
    }
  }
})
