import axios from "axios";

const state = {
    user: {
        id: null,
        email: null,
        username: null,
        name: null,
        lastname: null,
        img: null ,
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

    async login(state, userForm) {
        // Get token for current user credentials
        await axios.post('api/v1/auth/login', userForm, {withCredentials: true})
        // let user = await axios.get('api/v1/users/me', {withCredentials: true})
        // Set received user information to app state
        // await commit('setUser', user)
    },

    async logout({commit}) {
        await commit('logout')
    },

    async getUserInfo({commit}) {
        let response = (await axios.get('api/v1/users/me', {withCredentials: true})).data
        console.log(response)
        await commit('setUser', response)
    }
}

const mutations = {
    setUser(state, user) {
        state.user.id = user.id
        console.log('Sent request, got user with id = ' + user.id)
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