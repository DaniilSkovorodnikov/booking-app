import {Card, Container, Flex, Loader, SegmentedControl, TextInput, Text, Badge, Image} from "@mantine/core";
import {useMemo, useState} from "react";
import {useGetRestaurantsQuery} from "../store/api/restaurantApi.ts";
import '../styles/home.scss'
import {useNavigate} from "react-router-dom";
import Layout from "../components/Layout.tsx";

const Home = () => {
    const [restaurantName, setRestaurantName] = useState('');
    const [listType, setListType] = useState<'list' | 'map'>('list')
    const [checkedTags, setCheckedTags] = useState([]);

    const {data: restaurants, isLoading} = useGetRestaurantsQuery()
    const navigate = useNavigate();

    const allTags = useMemo(() => {
        if(restaurants){
            const tags = []
            restaurants.forEach(restaurant => {
                (restaurant.tags || []).forEach(tag => {
                    if(!tags.includes(tag)){
                        tags.push(tag)
                    }
                })
            })
            return tags
        }
        return []
    }, [restaurants])

    return (
        <Layout>
            <Container fluid className='home' pl={0}>
                <Flex
                    gap='sm'
                >
                    <TextInput
                        flex='1 1 0'
                        placeholder='Начните вводить название ресторана...'
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
                <Flex mt={32} gap='xs'>
                    {allTags.map(tag => <Badge
                        size='xl'
                        variant={checkedTags.includes(tag) ? 'checkbox-checked' : 'checkbox'}
                        onClick={() => setCheckedTags(prevState => prevState.includes(tag)
                            ? prevState.filter(value => value !== tag)
                            : [...prevState, tag]
                        )}
                    >
                        {tag}
                    </Badge>)}
                </Flex>
                <div className='home-grid'>
                    {isLoading ?
                        <Loader size='xl'/> :
                        restaurants
                            .filter(restaurant => (checkedTags.length === 0 || restaurant.tags.some(tag => checkedTags.includes(tag))) &&
                                restaurant.name.toLowerCase().includes(restaurantName.toLowerCase()))
                            .map(restaurant => <Card
                            key={restaurant.id}
                            shadow="sm"
                            padding="lg"
                            radius="md"
                            className='home-restaurant'
                            onClick={() => navigate(`/restaurant/${restaurant.id}`)}
                        >
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
                            <Flex gap='xs' mt='xs' wrap='wrap'>
                                {restaurant.tags.map((tag, i) => <Badge key={i} size='xl'>{tag}</Badge>)}
                            </Flex>
                        </Card>)
                    }
                </div>
            </Container>
        </Layout>
    );
};

export default Home;
