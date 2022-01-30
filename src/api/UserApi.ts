import axios from 'axios';

interface UserApi {
    register(registerUserForm: RegisterUserForm): Promise<void>;

    login(loginUserForm: LoginUserForm): Promise<void>;

    getLoggedUserInfo(): Promise<UserInfo>;
}

interface RegisterUserForm {
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
}

interface LoginUserForm {
    username: string;
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
    public async getLoggedUserInfo(): Promise<UserInfo> {
        return axios.get('api/me', { withCredentials: true })
            .then((r) => r.data as UserInfo);
    }

    public async login(loginUserForm: LoginUserForm): Promise<void> {
        return axios.post(
            'api/auth/login',
            loginUserForm,
            { withCredentials: true, headers: {'Content-Type': 'application/json'}}
        );
    }

    public async register(registerUserForm: RegisterUserForm): Promise<void> {
        return axios.post('api/auth/signup', {
            email: registerUserForm.email,
            username: registerUserForm.username,
            firstName: registerUserForm.firstName,
            lastName: registerUserForm.lastName,
            password: registerUserForm.password
        }, {headers: {'Content-Type': 'application/json'}});
    }
}

async function getLoggedUserInfo(): Promise<UserInfo> {
    return axios.get('api/me', { withCredentials: true })
        .then((r) => r.data as UserInfo);
}

async function login(loginUserForm: LoginUserForm): Promise<void> {
    return axios.post(
        'api/auth/login',
        loginUserForm,
        { withCredentials: true, headers: {'Content-Type': 'application/json'}}
    );
}

async function register(registerUserForm: RegisterUserForm): Promise<void> {
    return axios.post('api/auth/signup', {
        email: registerUserForm.email,
        username: registerUserForm.username,
        firstName: registerUserForm.firstName,
        lastName: registerUserForm.lastName,
        password: registerUserForm.password
    }, {headers: {'Content-Type': 'application/json'}});
}

export { getLoggedUserInfo, login, register, RegisterUserForm, LoginUserForm, UserInfo };
