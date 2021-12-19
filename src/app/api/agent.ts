import axios, { AxiosError, AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { history } from '../..';
import { Brand } from '../models/brand';

import { store } from '../stores/store';
import { TokenData, User, UserLogin, RegisterUserFormValues } from '../models/user';
import { SearchParams } from '../models/searchParams';
import { PaginatedResult } from '../models/paginatedResult';
import { Result } from '../models/result';
import { RegisterTenantFormValues, Tenant } from '../models/tenant';


const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => { //this will send up the token with every request, when there is a token
    const token = store.commonStore.token;
    config.headers.Tenant = store.commonStore.tenant;

    if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;

}, (error: AxiosError) => {
    const { data, status, config } = error.response!;
    switch (status) {
        case 400:
            if(typeof data === 'string'){
                toast.error(data);
            }
            if(config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('/not-found');
            }
            if(data.errors){
                const modalStateErrors = [];
                for (const key in data.errors){
                    if(data.errors[key]){
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }
         
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 404:
            history.push('/not-found')
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
})


const responseBody = <T>(response: AxiosResponse<T>) => response.data;


const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}


const Brands = {

    search: (params: SearchParams) => requests.post<PaginatedResult<Brand>>(`v1/brands/search`, params), //post 
    create: (brand: Brand) => requests.post<Result<String>>('v1/brands', brand),
    details: (id: string) => requests.get<Result<Brand>>(`v1/brands/${id}`),
    update: (brand: Brand) => requests.put<void>(`v1/brands/${brand.id}`, brand),
    delete: (id: string) => requests.del<void>(`v1/brands/${id}`), //or Result<string> is ok too


}

//Identity
const Account = {
    current: () => requests.get<Result<User>>('/identity/profile'),
    login: (user: UserLogin) => requests.post<Result<TokenData>>(`/tokens`, user), 
    update: (user: User) => requests.put<void>(`/identity/profile`, user), //without id is for the current user
}

//user
const Users = {
    list: () => requests.get<Result<User[]>>('/users'),
    create: (appUser: RegisterUserFormValues) => requests.post<Result<String>>(`/identity/register`, appUser),
    details: (id: string) => requests.get<Result<User>>(`/identity/profile/${id}`),
    update: (user: User) => requests.put<void>(`/identity/profile/${user.id}`, user), //with id is admin editing a user
}

//Tenants
const Tenants = {
    list: () => requests.get<Result<Tenant[]>>('/tenants'),
    details: (id: string) => requests.get<Result<Tenant>>(`/tenants/${id}`),
    create: (tenant: Tenant) => requests.post<Result<Tenant>>(`/tenants`, tenant),

}

const agent = {
    Account,
    Users,
    Brands,
    Tenants
}

export default agent;