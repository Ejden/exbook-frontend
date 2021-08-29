import axios from "axios";

const state = {
    user: {
        id: null,
        email: null,
        username: null,
        firstName: null,
        lastName: null,
        img: null
    }
}

const getters = {
    isAuthenticated: state => !!state.user.id,
    stateUser: state => state.user,
}

const actions = {
    async register({dispatch}, form) {
        await axios.post('api/v1/auth/signup', {
            email: form.email,
            login: form.login,
            firstName: form.firstName,
            lastName: form.lastName,
            password: form.password
        }, {headers: {'Content-Type': 'application/json'}})

        await dispatch('login', {
            login: form.login,
            password: form.password
        })
    },

    async login({dispatch}, userForm) {
        // Get token for current user credentials
        await axios.post('api/auth/login', userForm, {withCredentials: true, headers: {'Content-Type': 'application/json'}})
        console.log("f")
        await dispatch('getUserInfo')
        // Set received user information to app state
    },

    async logout({commit}) {
        await commit('logout')
    },

    async getUserInfo({commit}) {
        console.log("gi")
        let response = (await axios.get('api/me', {withCredentials: true})).data
        console.log(response)
        await commit('setUser', response)
    }
}

const mutations = {
    setUser(state, user) {
        state.user.id = user.id
        state.user.email = user.email
        state.user.username = user.login
        state.user.firstName = user.firstName
        state.user.lastName = user.lastName
    },
    logout(state) {
        state.user.id = null
        state.user.email = null
        state.user.username = null
        state.user.firstName = null
        state.user.lastname = null
        state.user.img = null
        document.cookie = "Authorization= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}