import React from 'react';
import Layout from "../components/Layout.tsx";
import Header from "../components/Header.tsx";
import {Button, Flex, InputWrapper} from "@mantine/core";
import Input from "../components/InputOverride.tsx";
import {useGetUserInfoQuery} from "../store/api/restaurantApi.ts";
import {useNavigate} from "react-router-dom";

const EditProfile = () => {
    const {data: userInfo} = useGetUserInfoQuery();
    const navigate = useNavigate()

    return (
        <Layout>
            <Header/>
            <div className="profile">
                <form className='profile-form'>
                    <InputWrapper label='E-mail'>
                        <Input disabled value={userInfo?.email}/>
                    </InputWrapper>
                    <InputWrapper label='Имя'>
                        <Input disabled value={userInfo?.name}/>
                    </InputWrapper>
                    <InputWrapper label='Номер телефона'>
                        <Input disabled value={userInfo?.phone_number}/>
                    </InputWrapper>
                </form>
                <Flex justify='center' mt={24} gap={16}>
                    <Button color='gray' onClick={() => navigate('/profile')}>Отменить</Button>
                    <Button>Сохранить</Button>
                </Flex>
            </div>
        </Layout>
    );
};

export default EditProfile;
