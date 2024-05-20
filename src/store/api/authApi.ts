import {api} from "./api.ts";
import {UserAuthForm, UserRegistrationForm} from "../../models/components.ts";
import {LoginResponse} from "../../models/api.ts";

export const authApi = api.injectEndpoints({
    endpoints: build => ({
        login: build.mutation<LoginResponse, UserAuthForm>({
            query: (user: UserAuthForm) => ({
                body: user,
                url: 'client/auth/login',
                method: 'POST',
            })
        }),
        register: build.mutation<LoginResponse, UserRegistrationForm>({
            query: (user) => ({
                body: user,
                url: 'client/auth/register',
                method: 'POST',
            })
        }),
    }),
    overrideExisting: false
})

export const {useLoginMutation, useRegisterMutation} = authApi
