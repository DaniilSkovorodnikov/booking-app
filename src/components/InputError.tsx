import {InputErrorProps} from "../models/props.ts";
import classes from "../styles/components.module.scss";

const InputError = ({errorMessage}: InputErrorProps) => {
    return (
        <p className={classes.inputError}>
            {errorMessage}
        </p>
    );
};

export default InputError;
