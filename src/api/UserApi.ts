import axios from "axios";

interface UserApi {
    register(registerUserForm: RegisterUserForm): Promise<void>;

    login(loginUserForm: LoginUserForm): Promise<void>;

    getLoggedUserInfo(): Promise<UserInfo>;
}

interface RegisterUserForm {
    email: string;
    login: string;
    firstName: string;
    lastName: string;
    password: string;
}

interface LoginUserForm {
    login: string;
    password: string;
}

interface UserInfo {
    id: string;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    img: string;
}

class UserClient implements UserApi {
    private serviceUrl = 'http://localhost:8082';

    async getLoggedUserInfo(): Promise<UserInfo> {
        return axios.get('api/me', { withCredentials: true });
    }

    async login(loginUserForm: LoginUserForm): Promise<void> {
        return axios.post(
            'api/auth/login',
            loginUserForm,
            { withCredentials: true, headers: {'Content-Type': 'application/json'}}
        );
    }

    async register(registerUserForm: RegisterUserForm): Promise<void> {
        return axios.post('api/auth/signup', {
            email: registerUserForm.email,
            login: registerUserForm.login,
            firstName: registerUserForm.firstName,
            lastName: registerUserForm.lastName,
            password: registerUserForm.password
        }, {headers: {'Content-Type': 'application/json'}});
    }
}

export { UserApi, UserClient, RegisterUserForm, LoginUserForm, UserInfo };
