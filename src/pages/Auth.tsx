import {Box, Button, Center, Container, Flex} from "@mantine/core";
import "../styles/auth.scss"
import {useNavigate} from "react-router-dom";
import {useForm} from "@mantine/form";
import {UserAuthForm} from "../models/components.ts";
import InputError from "../components/InputError.tsx";
import Input from "../components/InputOverride.tsx";
import {useLoginMutation} from "../store/api/authApi.ts";
import {useEffect} from "react";
import {DefaultError} from "../models/api.ts";

const Auth = () => {
    const form = useForm<UserAuthForm>({
        initialValues: {
            email: '',
            password: '',
        }
    })
    const [login, {data, error}] = useLoginMutation();
    const navigate = useNavigate()

    const handleSubmit = async (value: UserAuthForm) => {
        await login(value)
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
                        pt={{lg: 200, base: 100}}
                        pb={{lg: 300, base: 170}}
                        direction='column'
                        justify="space-between"
                    >
                        <Box w={{xl: 500, lg: 400}}>

                            <Flex
                                direction='column'
                                gap='md'
                            >
                                <Flex direction="column">
                                    <Input placeholder="E-mail" {...form.getInputProps('email')}/>
                                    {form.errors?.email && <InputError errorMessage={form.errors?.email as string}/>}
                                </Flex>
                                <Flex direction="column">
                                    <Input type="password" placeholder="Пароль" {...form.getInputProps('password')}/>
                                    {form.errors?.password && <InputError errorMessage={form.errors?.password as string}/>}
                                </Flex>
                            </Flex>
                            {(error as DefaultError)?.status === 422 && <InputError errorMessage="Проверьте корректность ввёденных данных"/>}
                            {(error as DefaultError)?.status === 400 && <InputError errorMessage="Неверный E-mail или пароль"/>}
                        </Box>
                        <Center>
                            <Box w={{xl: 380, lg: 280}} mt={50}>
                                <Button type="submit" fullWidth>Войти</Button>
                            </Box>
                        </Center>
                    </Flex>
                </form>
            </Center>
        </Container>
    );
};

export default Auth;
