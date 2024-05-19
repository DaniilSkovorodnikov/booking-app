import {ChangeEventHandler, FocusEventHandler, HTMLInputTypeAttribute, MouseEventHandler} from "react";
import {InputProps} from "@mantine/core";

export type InputErrorProps = {
    errorMessage: string
}

export interface InputOverrideProps extends InputProps{
    placeholder?: string,
    type?: HTMLInputTypeAttribute,
    value?: any,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    onClick?: MouseEventHandler<HTMLInputElement>,
    onFocus?: FocusEventHandler<HTMLInputElement>
}

export interface BookingModalProps {
    opened: boolean,
    onClose: () => void,
}
