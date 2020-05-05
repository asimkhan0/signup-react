import React from 'react';
import Grid from '@material-ui/core/Grid';
import CustomButton from '../../../components/button/index';
import { connect } from "react-redux";
import { LoginUser } from '../../../redux/signUp/signUp.action'

const Welcome = ({ history }) => {
    const logoutHandle = () => {
        LoginUser(false)
        history.replace('/SignUp')
    }
    return (
        <>
            <Grid container  direction="row" justify="center" alignItems="center" >
                <Grid item>
                    <img src={require('../../../assets/images/welcome.png')} alt="welcome" />
                </Grid>
            </Grid>
            <Grid container  direction="row" justify="center" alignItems="center" >
            <CustomButton
                name="Logout"
                variant="contained"
                color="primary"
                onClick={() => logoutHandle()}
            />
            </Grid>
        </>
    )
}

const mapDispatchToProps = ({
    LoginUser
});

export default connect(null, mapDispatchToProps)(Welcome);