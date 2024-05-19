import React, {useEffect, useState} from 'react';
import {Badge, Button, Card, Container, Flex, Grid, Loader, Text, Title} from "@mantine/core";
import {useGetRestaurantByIdQuery, useGetRestaurantImagesQuery} from "../store/api/restaurantApi.ts";
import {useParams} from "react-router-dom";
import '../styles/restaurant.scss'
import {Carousel} from "@mantine/carousel";
import locationIcon from '../assets/icon-location.svg';
import timeIcon from '../assets/icon-time.svg';
import siteIcon from '../assets/icon-site.svg';
import {notifications} from "@mantine/notifications";
import Layout from "../components/Layout.tsx";
import {useDisclosure} from "@mantine/hooks";
import BookingModal from "../components/BookingModal.tsx";

const Restaurant = () => {
    const {id} = useParams()
    const {data: restaurant, isSuccess, error: isErrorRestaurant} = useGetRestaurantByIdQuery(+id);
    const {data: images, isLoading: isLoadingImages} = useGetRestaurantImagesQuery(+id);
    const [opened, {open, close}] = useDisclosure(false);

    useEffect(() => {
        if(isErrorRestaurant){
            notifications.show({
                message: 'Произошла неизвестная ошибка',
                autoClose: true
            })
        }
    }, [isErrorRestaurant]);

    if (!isSuccess || isLoadingImages) {
        return <Layout>
            <Loader size='xl'/>
        </Layout>
    }
    return (
        <Layout>
            <Container fluid className="restaurant" p={0}>
                <Grid className='restaurant-grid' gutter={70}>
                    <Grid.Col span={5}>
                        <Carousel
                            slideSize='100%'
                            slideGap='sm'
                            height={500}
                            controlSize={35}
                            loop
                            align='center'
                        >
                            {images.map((imageSrc, i) => <Carousel.Slide key={i}>
                                <img className='restaurant-image' src={imageSrc}/>
                            </Carousel.Slide>)}
                        </Carousel>
                    </Grid.Col>
                    <Grid.Col span={7}>
                        <Flex direction='column' justify='space-between' h='100%' align='start'>
                            <Card radius='lg' className='restaurant-card'>
                                <Title order={4} fw={500} fz={24}>{restaurant.name}</Title>
                                <Flex gap='sm' my='xs' wrap='wrap'>
                                    {restaurant.tags.map((tag, i) => <Badge key={i} size='xl'>{tag}</Badge>)}
                                </Flex>
                                <Text fw={300} fz={14}>{restaurant.description}</Text>
                                <Flex gap='sm' mt='xl'>
                                    <img src={locationIcon}/>
                                    <Text fw={300} fz={14}>Адрес: <strong className='restaurant-address'>
                                        {restaurant.address || 'Не указано'}
                                    </strong></Text>
                                </Flex>
                                <Flex gap='sm' mt='xs'>
                                    <img src={timeIcon}/>
                                    <Text fw={300} fz={14}>Время работы: <strong className='restaurant-address'>
                                        {restaurant.open_from || 'Не указано'} - {restaurant.open_to || 'Не указано'}
                                    </strong>
                                    </Text>
                                </Flex>
                                <Flex gap='sm' mt='xs'>
                                    <img src={siteIcon}/>
                                    <Text fw={300} fz={14}>
                                        Веб-сайт: {restaurant.site ? <a href={restaurant.site} target='_blank'>{restaurant.site}</a> : 'Не указано'}
                                    </Text>
                                </Flex>
                            </Card>
                            <Button size='xl' radius='lg' color='red' fz={16} fw={16} px={60}>Забронировать</Button>
                        </Flex>
                    </Grid.Col>
                </Grid>
            </Container>
            <BookingModal opened={opened} onClose={close}/>
        </Layout>
    );
};

export default Restaurant;
