import { RegisterUserForm, UserInfo, LoginUserForm, register, login, getLoggedUserInfo } from "@/api/UserApi";
import { LoggedUser, UserState, UserStoreAction, UserStoreMutation } from "@/store/modules/user-store/types";
import { ActionContext } from 'vuex';
import { IRootState } from '@/store';
import { goToHomePage } from '@/mixin';

const state: UserState = {
    loggedUser: undefined
}

const getters = {
    getLoggedUser: (state: UserState): LoggedUser | undefined => state.loggedUser,
    isUserAuthenticated: (state: UserState): boolean => {
        return state.loggedUser !== undefined && document.cookie.search('Authorization') !== -1;
    }
}

const actions = {
    async register(context: ActionContext<UserState, IRootState>, registerForm: RegisterUserForm): Promise<void> {
        return register(registerForm);
    },
    async login(context: ActionContext<UserState, IRootState>, loginForm: LoginUserForm): Promise<void> {
        return login(loginForm)
            .then(() => context.dispatch(UserStoreAction.getUserInfo));
    },
    async getUserInfo(context: ActionContext<UserState, IRootState>): Promise<void> {
        return getLoggedUserInfo()
            .then((user: UserInfo) => {
                context.commit(UserStoreMutation.setUser, user);
            });
    },
    async logout(context: ActionContext<UserState, IRootState>): Promise<void> {
        context.commit(UserStoreMutation.clearUser);
        await goToHomePage();
    }
}

const mutations = {
    clearUser(state: UserState) {
        state.loggedUser = undefined;
        document.cookie = "Authorization= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    },
    setUser(state: UserState, user: UserInfo) {
        state.loggedUser = {
            id: user.id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            img: ''
        };
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
