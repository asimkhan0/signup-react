import React from 'react';
import Grid from '@material-ui/core/Grid';

const Welcome = () => {
    return (
        <Grid container  direction="row" justify="center" alignItems="center" >
            <Grid item >
                <img src={require('../../../assets/images/welcome.png')} alt="welcome" />
            </Grid>
        </Grid>
    )
}

export default Welcome;