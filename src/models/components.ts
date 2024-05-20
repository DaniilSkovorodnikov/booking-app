export type UserAuthForm = {
    email: string,
    password: string,
}

export type UserRegistrationForm = {
    email: string,
    password: string,
    name: string
}

export type BookingState = {
    persons_count: number,
    date: Date,
    time: string,
    tags: string[],
    duration: number,
    comment: string,
}
