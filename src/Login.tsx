import React from 'react'
import PropTypes from 'prop-types'
import { Avatar, Button, Container, Box, CssBaseline, TextField, Typography, Link } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { useCookies } from 'react-cookie';

type  LoginProps = { setToken: (username: string | null) => void, }

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        '@global': {
            body: {
                backgroundColor: theme.palette.common.white,
            },
        },
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
    }));


    function Copyright() {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://www.google.com/">Google</Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        );
    }

 
const Login = ({ setToken }: LoginProps ) => {

    const userRef = React.useRef<HTMLInputElement | null>(null);
    const passRef = React.useRef<HTMLInputElement | null>(null);
    const [error, setError] = React.useState<string | null>(null)
    const classes = useStyles();
    const [, setCookie] = useCookies(['etl-token']);

    const getUser = async () => {
        const response = await fetch('http://localhost:8000/auth/login', {
            method: 'POST',
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify({ user: userRef?.current?.value, pass: passRef?.current?.value })
        })

        // console.log("Res OK:", response.ok)

        if (response.ok) {
            const body = await response.json()
            
            // console.log("Res:", body)
            console.log("Token:", body?.data?.accessToken)

            if (body?.data?.accessToken) {
                setToken(body?.data?.accessToken)
            }
        }       
    }

    const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!userRef?.current?.value) {
            console.log('Missing user')
            setError('Missing user')
            setToken(null)
            return
        }

        if (!passRef?.current?.value) {
            console.log('Missing password')
            setError('Missing password')
            // alert('Error: Missing password')
            setToken(null)
            return
        }

        getUser()
    }

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">
                <form id="loginForm" noValidate onSubmit={handleSignIn}>
                    <h3>Sign In</h3>

                    <input type="text" id="user" className="fadeIn second" name="user" placeholder="user name" ref={userRef} />
                    <input type="text" id="password" className="fadeIn third" name="pass" placeholder="password" ref={passRef}/>
                    <input type="submit" className="fadeIn fourth" value="Log In" />
                    { error && <b style={{ background: 'red', color: 'white' }}>{error}</b> }
                </form>
            </div>
        </div>
    );
}

Login.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default Login;