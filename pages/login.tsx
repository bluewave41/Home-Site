import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ text: '', color: 'white' });

    const onChange = (e) => {
        switch(e.target.name) {
            case 'username':
                setUsername(e.target.value);
                break;
            case 'password':
                setPassword(e.target.value);
                break;
        }
    }

    const onSubmit = async (e) => {
        let response;
        try 
        {
            //Google, Facebook, etc supposedly return 200 for registration errors like when a username was already found
            response = await axios.post('/api/user/login', { username: username, password: password });
            if(response.status == 200) {
                setMessage({ text: response.data.message, color: 'green' });
            }
            else {
                setMessage({ text: response.data.message, color: 'red' });
            }
        }
        catch(e) {
            setMessage({ text: e.response.data.message, color: 'red' });
        }
    }

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
            <h1>Login</h1>
            <Box sx={{ color: message.color, pb: 5 }}>
                {message.text}
            </Box>
            <TextField label='Username' name='username' onChange={onChange} sx={{ pb: 3 }} />
            <TextField label='Password' name='password' onChange={onChange} sx={{ pb: 3 }} />
            <Button variant='contained' onClick={onSubmit} disabled={username && password ? false : true}>Submit</Button>
        </Box>
    )
}

export default Login;