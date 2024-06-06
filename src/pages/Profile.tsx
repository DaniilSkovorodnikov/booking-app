import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import Layout from "../components/Layout.tsx";
import Header from "../components/Header.tsx";
import Input from "../components/InputOverride.tsx";
import '../styles/profile.scss';
import {useGetMyBookingsQuery, useGetUserInfoQuery} from "../store/api/restaurantApi.ts";
import {Button, Flex, InputWrapper, Title} from "@mantine/core";
import {api} from "../store/api/api.ts";
import BookingCard from "../components/BookingCard.tsx";

const Profile = () => {
    const navigate = useNavigate()
    const {data: userInfo} = useGetUserInfoQuery();
    const {data: bookings} = useGetMyBookingsQuery();

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token){
            navigate('/login')
        }
    }, []);

    const logout = () => {
        api.util.resetApiState()
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <Layout>
            <Header/>
            <div className='profile'>
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
                    <Button color='indigo' onClick={() => navigate('/profile/edit')}>Редактировать</Button>
                    <Button onClick={logout}>Выйти</Button>
                </Flex>
            </div>
            {bookings && <div className="bookings">
                <Title className='bookings-title' order={4}>Мои бронирования</Title>
                {bookings.map(booking => <BookingCard booking={booking}/>)}
            </div>}
        </Layout>
    );
};

export default Profile;
