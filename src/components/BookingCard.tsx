import {useDisclosure} from "@mantine/hooks";
import {ActionIcon, Badge, Collapse, Container, Flex, Image} from "@mantine/core";
import collapseIcon from "../assets/collapse-icon.svg"
import "../styles/card.scss"

const months = [
    {name: "Январь", declinedName: "января"},
    {name: "Февраль", declinedName: "февраля"},
    {name: "Март", declinedName: "марта"},
    {name: "Апрель", declinedName: "апреля"},
    {name: "Май", declinedName: "мая"},
    {name: "Июнь", declinedName: "июня"},
    {name: "Июль", declinedName: "июля"},
    {name: "Август", declinedName: "августа"},
    {name: "Сентябрь", declinedName: "сентября"},
    {name: "Октябрь", declinedName: "октября"},
    {name: "Ноябрь", declinedName: "ноября"},
    {name: "Декабрь", declinedName: "декабря"}
]

function getPersonsCountString(personsCount: number){
    const x = personsCount % 10;
    if (x === 0 || x >= 5 || personsCount >= 9 && personsCount < 15) return `${personsCount} персон`
    if (x > 1 && x < 5) return `${personsCount} персоны`
    return `${personsCount} персона`
}

function getBookingPeriod(dateFrom: string, dateTo: string){
    const from = new Date(dateFrom)
    const to = new Date(dateTo)
    const fromTime = dateFrom.split('T')[1].substring(0,5)
    const toTime = dateTo.split('T')[1].substring(0,5)
    return `${from.getDate()} ${months[from.getMonth()].declinedName}, ${fromTime}-${toTime}`
}

const BookingCard = ({booking}) => {
    const [collapsed, { toggle }] = useDisclosure(false);

    return (
        <Container fluid className="card" pl={66} pr={18} py={12}>
            <div className="card-collapse">
                <ActionIcon color="#F2F3F8" onClick={toggle} w={40} h={40}>
                    <Image src={collapseIcon} w={15} h={7.5}/>
                </ActionIcon>
            </div>
            <Flex align="start">
                <Flex
                    flex="1 1 0"
                    direction="column"
                    justify="space-between"
                >
                    <p>{getBookingPeriod(booking.time_from, booking.time_to)}</p>
                    <p>Стол №{booking.table_id + 1}</p>
                </Flex>
                <Badge>{getPersonsCountString(booking.people_count)}</Badge>
            </Flex>
            <Collapse in={collapsed}>
                <Container p={0} m={0} mt={16}>
                    <p>Имя: {booking.user.name}</p>
                    <p>Номер телефона: {booking.user.phone_number || 'Не указано'}</p>
                </Container>
            </Collapse>
        </Container>
    );
};

export default BookingCard;
