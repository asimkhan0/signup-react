import React from 'react';
import Button from '@material-ui/core/Button';
import './styles/button.css';

const CustomButton = props => {
    const { name, type, variant, color } = props;
    return (
        <Button
            type={type}
            variant={variant}
            color={color}
            {...props}
        > {name}</Button>
    );
}

export default CustomButton;