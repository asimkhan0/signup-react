import React from 'react';
import TextField from '@material-ui/core/TextField';
import './styles/input.css';

const Input = props => {
    const { autoComplete, name, variant, id, label } = props;
    return (
        <TextField
            autoComplete={autoComplete}
            name={name}
            variant={variant}
            id={id}
            label={label}
            {...props}
        />
    );
}

export default Input;