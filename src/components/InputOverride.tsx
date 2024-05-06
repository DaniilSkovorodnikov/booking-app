import React from 'react';
import {Input as MantineInput} from "@mantine/core";
import {InputOverrideProps} from "../models/props.ts";

const Input = (props: InputOverrideProps) => {
    return (
        <MantineInput
            {...props}
            required={false}
            rightSection={props.required && <span
                style={{ fontSize: 37, color: "crimson" }}
            >&#9913;</span>}
        />
    );
};

export default Input;
