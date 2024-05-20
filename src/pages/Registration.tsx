import React, {useEffect} from 'react';
import {hasLength, isEmail, isNotEmpty, useForm} from "@mantine/form";
import {UserRegistrationForm} from "../models/components.ts";
import {useRegisterMutation} from "../store/api/authApi.ts";
import {useNavigate} from "react-router-dom";
import {Box, Button, Center, Container, Flex} from "@mantine/core";
import Input from "../components/InputOverride.tsx";
import InputError from "../components/InputError.tsx";
import {DefaultError} from "../models/api.ts";
import logo from "../assets/logo.svg";

const Registration = () => {
    const form = useForm<UserRegistrationForm>({
        initialValues: {
            email: '',
            password: '',
            name: ''
        },
        validate: {
            email: isEmail('Некорректный формат e-mail'),
            password: hasLength({min: 6}, 'Минимальная длина пароля должна быть 6 символов'),
            name: isNotEmpty('Обязательное поле')
        }
    })
    const [register, {data}] = useRegisterMutation();
    const navigate = useNavigate()

    const handleSubmit = async (value: UserRegistrationForm) => {
        await register(value)
    }

    useEffect(() => {
        if(data){
            localStorage.setItem('token', data.token)
            navigate('/')
        }
        else if(localStorage.getItem('token')){
            navigate('/')
        }
    }, [data]);

    return (
        <Container className="auth" fluid>
            <Center>
                <form onSubmit={form.onSubmit(handleSubmit)}>
                    <Flex
                        className="auth-container"
                        pt={{lg: 100, base: 100}}
                        pb={{lg: 200, base: 170}}
                        direction='column'
                        justify="space-between"
                    >
                        <Box w={{xl: 500, lg: 400}}>
                            <Flex
                                direction='column'
                                gap='md'
                            >
                                <Center mb='xl'>
                                    <img className='logo' src={logo}/>
                                </Center>
                                <Flex direction="column">
                                    <Input placeholder="E-mail" {...form.getInputProps('email')}/>
                                    {form.errors?.email && <InputError errorMessage={form.errors?.email as string}/>}
                                </Flex>
                                <Flex direction="column">
                                    <Input type="password" placeholder="Пароль" {...form.getInputProps('password')}/>
                                    {form.errors?.password && <InputError errorMessage={form.errors?.password as string}/>}
                                </Flex>
                                <Flex direction="column">
                                    <Input placeholder="Ваше имя" {...form.getInputProps('name')}/>
                                    {form.errors?.name && <InputError errorMessage={form.errors?.name as string}/>}
                                </Flex>
                            </Flex>
                        </Box>
                        <Center>
                            <Box w={{xl: 380, lg: 280}} mt={50}>
                                <Button type="submit" fullWidth>Зарегистрироваться</Button>
                            </Box>
                        </Center>
                    </Flex>
                </form>
            </Center>
        </Container>
    );
};

export default Registration;
