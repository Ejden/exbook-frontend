import axios from "axios";

const state = {
    user: null
}

const getters = {
    isAuthenticated: state => !!state.user,
    stateUser: state => state.user
}

const actions = {
    async register({dispatch}, form) {
        await axios.post('api/v1/auth/signup', form)
        let userForm = new FormData()
        userForm.append('email', form.email)
        userForm.append('login', form.username)
        userForm.append('password', form.password)

        await dispatch('login', userForm)
    },

    async login({commit}, user) {
        await axios.post('api/v1/auth/login', user)
        await commit('setUser', user.get('username'))
    }
}

const mutations = {
    setUser(state, username) {
        state.user = username
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}