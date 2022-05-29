import { RegisterUserForm, UserInfo, LoginUserForm, register, login, getLoggedUserInfo } from "@/api/UserApi";
import { VuexModule , Module, Mutation, Action } from "vuex-module-decorators";
import { LoggedUser } from "@/store/modules/user-store/types/user";
import router from '@/router';

export interface IUserState {
    loggedUser?: LoggedUser;
    getLoggedUser?: LoggedUser;

    register(registerForm: RegisterUserForm): void;
    getUserInfo(): void;
    setUser(user: UserInfo): void;
}

@Module({ name: 'user', namespaced: true, stateFactory: true })
export default class UserModule extends VuexModule implements IUserState {
    public loggedUser?: LoggedUser;

    get getLoggedUser() {
        return this.loggedUser;
    }

    @Action
    public async register(registerForm: RegisterUserForm): Promise<void> {
        register(registerForm)
            .then(() => this.login({ username: registerForm.username, password: registerForm.password }));
    }

    @Action({rawError: true})
    public async login(loginForm: LoginUserForm): Promise<void> {
        login(loginForm)
            .then(() => this.getUserInfo());
    }

    @Action
    public async getUserInfo(): Promise<void> {
        getLoggedUserInfo()
            .then((user: UserInfo) => {
                this.setUser(user);
            });
    }

    @Action
    public async logout(): Promise<void> {
        this.clearUser();
        await router.push({name: 'Home'})
    }

    @Mutation
    public setUser(user: UserInfo): void {
        this.loggedUser = {
            id: user.id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            img: ''
        };
    }

    @Mutation
    private clearUser(): void {
        this.loggedUser = undefined;
        document.cookie = "Authorization= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    }
}
