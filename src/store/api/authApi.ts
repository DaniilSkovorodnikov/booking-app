import {api} from "./api.ts";
import {UserAuthForm} from "../../models/components.ts";
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
    }),
    overrideExisting: false
})

export const {useLoginMutation} = authApi
