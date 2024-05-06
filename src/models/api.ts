export type LoginResponse = {
    email: string,
    id: number,
    token: string
}

export type DefaultError = {
    status: number,
    data: {
        detail: string
    }
}
