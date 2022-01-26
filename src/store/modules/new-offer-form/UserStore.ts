import { UserApi, UserClient, RegisterUserForm, UserInfo, LoginUserForm } from "@/api/UserApi";
import { ActionContext } from "vuex";

interface UserStoreState {
    user: User;
    userApi: UserApi;
}

interface User {
    id?: string;
    email?: string;
    username?: string;
    firstName?: string;
    lastName?: string;
    img?: string;
}

const state: UserStoreState = {
    user: {
        id: undefined,
        email: undefined,
        username: undefined,
        firstName: undefined,
        lastName: undefined,
        img: undefined
    },
    userApi: new UserClient()
}

const getters = {
    isAuthenticated: (state: UserStoreState) => state.user.id,
    stateUser: (state: UserStoreState) => state.user,
}

const actions = {
    async register({ dispatch }: ActionContext<any, any>, form: RegisterUserForm) {
        state.userApi.register(form)
            .then(() => dispatch('login', { login: form.login, password: form.password }));
    },

    async login({ dispatch }: ActionContext<UserStoreState, any>, userForm: LoginUserForm) {
        state.userApi.login(userForm)
            .then(() => dispatch('getUserInfo'));
    },

    async logout({ commit }: ActionContext<any, any>) {
        await commit('logout')
    },

    async getUserInfo({ commit }: ActionContext<any, any>) {
        state.userApi.getLoggedUserInfo()
            .then((user: UserInfo) => {
                commit('setUser', user)
            });
    }
}

const mutations = {
    setUser(state: UserStoreState, user: UserInfo) {
        state.user.id = user.id;
        state.user.email = user.email;
        state.user.username = user.username;
        state.user.firstName = user.firstName;
        state.user.lastName = user.lastName;
    },
    logout(state: UserStoreState) {
        state.user.id = undefined;
        state.user.email = undefined;
        state.user.username = undefined;
        state.user.firstName = undefined;
        state.user.lastName = undefined;
        state.user.img = undefined;
        document.cookie = "Authorization= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

export default {
    state,
    getters,
    actions,
    mutations
};
