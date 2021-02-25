import axios from "axios";

const state = {
    user: {
        id: 1,
        email: '',
        username: 'Adrian',
        name: null,
        lastname: null,
        img: '',
    }
}

const getters = {
    isAuthenticated: state => !!state.user.id,
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
    },

    async logout({commit}) {
        await commit('logout')
    }
}

const mutations = {
    setUser(state, username) {
        state.user = username
    },
    logout(state) {
        state.user.id = null
        state.user.id = null
        state.user.email = null
        state.user.username = null
        state.user.name = null
        state.user.lastname = null
        state.user.img = null
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}