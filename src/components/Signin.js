import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { CometChat } from '@cometchat-pro/chat';

function Copyright(props) {
    
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Testing Chat Application
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
// const appID = process.env.REACT_APP_COMETCHAT_APP_ID;
// const region = process.env.REACT_APP_COMETCHAT_REGION;
const authKey = process.env.REACT_APP_COMETCHAT_AUTH_KEY;
console.log("Auh KEy : ", authKey);

export default function SignIn() {
    const navigate = useNavigate();

    // var uid = "user1";
    // var name = "Kevin";

    // var user = new CometChat.User(uid);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
        name: data.get('name'),
        password: data.get('password'),
        });
        let name = data.get('name');
        
        
        
        var UID = data.get('password');
        var user = new CometChat.User(UID);
        console.log("Meri UID",UID);
        console.log("Mera user",user);
        user.setName(name);
        navigate("/dashboard");

        CometChat.getLoggedinUser().then(
            user => {
                if(!user){
                    CometChat.login(UID, authKey).then(
                        user => {
                            console.log("Login Successful:", { user });
                            // let GUID = "GUID";
                            // let membersList = [
                            // new CometChat.GroupMember(UID, CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT)
                            // ];

                            // CometChat.addMembersToGroup(GUID, membersList, []).then(
                            //     response => {
                            //         console.log("response", response);
                            //     }, error => {
                            //         console.log("Something went wrong", error);
                            //     }
                            // );
                        }, error => {
                            console.log("Login failed with exception:", { error });
                        }
                    );
                }
            }, error => {
                console.log("Something went wrong", error);
            }
        );

    };

    return (
        <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
                <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                />
                <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
                />
                <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
                Sign In
                </Button>
                <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                    Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                    </Link>
                </Grid>
                </Grid>
            </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
        </ThemeProvider>
    );
}