import React from 'react';
import {Modal} from "@mantine/core";
import {BookingModalProps} from "../models/props.ts";

const BookingModal = ({opened, onClose}: BookingModalProps) => {
    return (
        <Modal opened={opened} onClose={onClose}>

        </Modal>
    );
};

export default BookingModal;
