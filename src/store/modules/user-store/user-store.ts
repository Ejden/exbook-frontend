import { UserApi, UserClient, RegisterUserForm, UserInfo, LoginUserForm } from "@/api/UserApi";
import {VuexModule, Module, Mutation, Action, getModule} from "vuex-module-decorators";
import { LoggedUser } from "@/store/modules/user-store/types/user";
import store from '@/store';

export interface IUserStore {
    loggedUser?: LoggedUser;
    userApi: UserApi;
}

@Module({ dynamic: true, store, namespaced: true, name: 'user' })
class UserStore extends VuexModule implements IUserStore {
    public loggedUser?: LoggedUser;
    public userApi: UserApi = new UserClient();

    @Action
    public async register(registerForm: RegisterUserForm): Promise<void> {
        this.userApi.register(registerForm)
            .then(() => this.login({ username: registerForm.username, password: registerForm.password }));
    }

    @Action({rawError: true})
    public async login(loginForm: LoginUserForm): Promise<void> {
        this.userApi.login(loginForm)
            .then(() => this.getUserInfo());
    }

    @Action
    public async getUserInfo(): Promise<void> {
        this.userApi.getLoggedUserInfo()
            .then((user: UserInfo) => {
                console.log(user);
                this.setUser(user);
            });
    }

    @Mutation
    private setUser(user: UserInfo): void {
        this.loggedUser = {
            id: user.id,
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            img: ''
        };
        console.log(this.loggedUser);
    }

    @Mutation
    private logout(): void {
        this.loggedUser = undefined;
        document.cookie = "Authorization= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
    }
}

export const UserModule = getModule(UserStore);