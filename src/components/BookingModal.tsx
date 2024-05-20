import React, {useEffect, useState} from 'react';
import {Accordion, Badge, Button, Flex, Modal, NumberInput, Textarea} from "@mantine/core";
import {BookingModalProps} from "../models/props.ts";
import {BookingState} from "../models/components.ts";
import {Calendar, TimeInput} from "@mantine/dates";
import {useDisclosure} from "@mantine/hooks";
import dayjs from 'dayjs';
import chevronIcon from '../assets/icon-chevron.svg'
import {useCheckExistsTablesMutation, useGetTagsQuery, usePostBookingMutation} from "../store/api/restaurantApi.ts";
import {useParams} from "react-router-dom";
import {notifications} from "@mantine/notifications";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {SerializedError} from "@reduxjs/toolkit";

const BookingModal = ({opened, onClose}: BookingModalProps) => {
    const {id} = useParams()

    const {data: tags} = useGetTagsQuery(+id);
    const [checkExistsTables] = useCheckExistsTablesMutation();
    const [postBooking] = usePostBookingMutation();

    const [bookingState, setBookingState] = useState<Partial<BookingState>>({
        persons_count: 1,
        tags: []
    })
    const [existsTables, setExistsTables] = useState([]);
    const [isDatetimePick, {open: openDatetimePick, close: closeDatetimePick}] = useDisclosure(false);

    const changeBookingState = (fieldName: keyof BookingState, value: number | string | string[] | Date) => {
        setBookingState(prevState => ({...prevState, [fieldName]: value}))
    }

    const handleClose = () => {
        onClose();
        setBookingState({
            persons_count: 0,
            tags: []
        })
        closeDatetimePick()
    }

    const handleFirstStage = async () => {
        const existsTables = await checkExistsTables({
            people_count: bookingState.persons_count,
            tags: bookingState.tags,
            restaurantId: id
        });
        if((existsTables as {error: FetchBaseQueryError | SerializedError}).error){
            notifications.show({
                message: 'Столиков с данными характеристиками не найдено',
                autoClose: true,
            })
        }
        else{
            setExistsTables((existsTables as {data: any}).data as number[])
            openDatetimePick()
        }
    }

    const handleBooking = async () => {
        if(!bookingState.date || !bookingState.time){
            notifications.show({
                message: 'Выберите дату и время',
                autoClose: true
            })
            return
        }
        const timeFromNoUTC = new Date(
            bookingState.date.getFullYear(),
            bookingState.date.getMonth(),
            bookingState.date.getDate(),
            +bookingState.time.split(':')[0],
            +bookingState.time.split(':')[1]
        )
        const booking = await postBooking({
            people_count: bookingState.persons_count,
            time_from: new Date(timeFromNoUTC.getTime() - timeFromNoUTC.getTimezoneOffset() * 60000).toISOString(),
            duration: bookingState.duration,
            comment: bookingState.comment || '',
            tableId: existsTables[0]
        })
        if((booking as {error: FetchBaseQueryError | SerializedError}).error){
            notifications.show({
                message: 'Произошла ошибка при бронировании',
                autoClose: true
            })
        }
        else {
            handleClose();
        }
    }

    const changeBookingDuration = (time: string) => {
        const [hours, minutes] = time.split(':');
        changeBookingState('duration', +hours * 60 + +minutes)
    }

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            centered
            title='Забронировать'
            size='xl'
        >
            {!isDatetimePick ? <Flex direction='column' gap='md'>
                <NumberInput
                    description='Количество человек'
                    value={bookingState.persons_count}
                    onChange={(value) => changeBookingState('persons_count', +value)}
                />
                <Accordion variant='contained' radius='md'>
                    <Accordion.Item value='tags'>
                        <Accordion.Control>Тип стола</Accordion.Control>
                        <Accordion.Panel>
                            <Flex gap='xs' wrap='wrap'>
                                {(tags || []).map(tag => <Badge
                                    variant={bookingState.tags.includes(tag) ? 'checkbox-checked' : 'checkbox'}
                                    size='lg'
                                    onClick={() => changeBookingState(
                                        'tags',
                                        bookingState.tags.includes(tag) ? bookingState.tags.filter(value => value !== tag) : [...bookingState.tags, tag])
                                    }
                                >
                                    {tag}
                                </Badge>)}
                            </Flex>
                        </Accordion.Panel>
                    </Accordion.Item>
                </Accordion>
                <Textarea
                    description='Комментарий'
                    rows={4}
                />
                <Button
                    size='md'
                    mt='lg'
                    style={{alignSelf: 'center', minWidth: 260}}
                    onClick={handleFirstStage}
                >
                    Выбрать дату и время
                </Button>
            </Flex> : <Flex direction='column' gap='xl'>
                <Flex justify='center' align='start' style={{position: 'relative'}}>
                    <button
                        className='btn-round'
                        style={{position: 'absolute', left: 0}}
                        onClick={closeDatetimePick}
                    >
                        <img src={chevronIcon}/>
                    </button>
                    <Calendar
                        size='md'
                        getDayProps={(date) => ({
                            selected: dayjs(date).isSame(bookingState.date),
                            onClick: () => changeBookingState('date', date)
                        })}
                    />
                </Flex>
                <Flex direction='column' gap='xs'>
                    <label>Утро</label>
                    <Flex gap='sm' wrap='wrap'>
                        {['9:30', '10:00', '11:30'].map(time => <Badge
                            variant={bookingState.time === time ? 'checkbox-checked' : 'checkbox'}
                            size='lg'
                            onClick={() => changeBookingState('time', time)}
                        >
                            {time}
                        </Badge>)}
                    </Flex>
                    <label>День</label>
                    <Flex gap='sm' wrap='wrap'>
                        {['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'].map(time => <Badge
                            variant={bookingState.time === time ? 'checkbox-checked' : 'checkbox'}
                            size='lg'
                            onClick={() => changeBookingState('time', time)}
                        >
                            {time}
                        </Badge>)}
                    </Flex>
                    <label>Утро</label>
                    <Flex gap='sm' wrap='wrap'>
                        {['18:00', '19:00', '20:30'].map(time => <Badge
                            variant={bookingState.time === time ? 'checkbox-checked' : 'checkbox'}
                            size='lg'
                            onClick={() => changeBookingState('time', time)}
                        >
                            {time}
                        </Badge>)}
                    </Flex>
                </Flex>
                <TimeInput
                    description='Продолжительность бронирования'
                    onChange={(event) => changeBookingDuration(event.target.value)}
                    defaultValue={`${String(Math.floor(bookingState.duration / 60)).padStart(2, '0')}:${String(bookingState.duration % 60).padEnd(2, '0')}`}
                />
                <Button
                    size='md'
                    mt='lg'
                    style={{alignSelf: 'center', minWidth: 260}}
                    onClick={handleBooking}
                >
                    Забронировать
                </Button>
            </Flex>}
        </Modal>
    );
};

export default BookingModal;
