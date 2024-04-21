import {Card, Container, Flex, Loader, SegmentedControl, TextInput, Text, Badge, Image} from "@mantine/core";
import {useState} from "react";
import {useGetRestaurantsQuery} from "../store/api/restaurantApi.ts";
import '../styles/home.scss'

const Home = () => {
    const [restaurantName, setRestaurantName] = useState('');
    const [listType, setListType] = useState<'list' | 'map'>('list')

    const {data: restaurants, isLoading} = useGetRestaurantsQuery()

    return (
        <Container fluid className='home' pl={0}>
            <Flex
                gap='sm'
            >
                <TextInput
                    flex='1 1 0'
                    placeholder='Начните вводить название ресторана'
                    value={restaurantName}
                    onChange={(event) => setRestaurantName(event.target.value)}
                />
                <SegmentedControl
                    size='lg'
                    value={listType}
                    onChange={(value) => setListType(value as 'list' | 'map')}
                    data={[
                        {label: 'Список', value: 'list'},
                        {label: 'Карта', value: 'map'}
                    ]}
                />
            </Flex>
            <div className='home-grid'>
                {isLoading ?
                    <Loader size='xl'/> :
                    restaurants.map(restaurant => <Card shadow="sm" padding="lg" radius="md" className='home-restaurant'>
                        <Card.Section>
                            <Image
                                src={restaurant.image || "https://placehold.co/600x400?text=Placeholder"}
                                h={160}
                            />
                        </Card.Section>
                        <Text fw={500} mt='sm'>
                            {restaurant.name}
                        </Text>
                        <Text>
                            {restaurant.description}
                        </Text>
                        <Flex gap='xs' mt='xs'>
                            {restaurant.tags.map(tag => <Badge size='xl'>{tag}</Badge>)}
                        </Flex>
                    </Card>)
                }
            </div>
        </Container>
    );
};

export default Home;
