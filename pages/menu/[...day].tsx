import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import format from 'date-fns/format';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import MenuModel from 'models/MenuModel';

const ModifyMeal = (props) => {
    const [name, setName] = useState(props.name);
    const router = useRouter();

    //day month year
    if(router.query.day.length != 3) {
        //TODO: handle error
    }
    const [day, month, year] = router.query.day;
    const dateString = `${year}/${month}/${day}`;

    const onSubmit = async (e) => {
        let response;
        console.log(name == '')
        const url = !name ? '/api/menu/delete' : props.name ? '/api/menu/update' : '/api/menu/create';
        try {
            response = await axios.post(url, { name: name, date: dateString });
            router.back();
        }
        catch(e) {

        }
    }

    const onChange = (e) => {
        setName(e.target.value);
    }


    let date = format(new Date(dateString), 'MMMM do');
    return (
        <Box>
            <h1>What will you be making on {date}?</h1>
            <Box sx={{ display: 'flex', flexDirection: 'column', width: '30%' }}>
                <TextField onChange={onChange} defaultValue={name} />
                <Button variant='contained' onClick={onSubmit}>Submit</Button>
            </Box>
        </Box>
    )
}

export async function getServerSideProps(context) {
    const { req, res } = context;
    const { getSession } = await import("lib/get-session");
    const session = await getSession(req, res);
    const [day, month, year] = context.query.day;
    const dateString = `${year}/${month}/${day}`;
    
    const menu = await MenuModel.query().select('name')
        .findOne('date', new Date(dateString))
        .findOne('userId', session.user.userId);

    return {
        props: {
            name: menu ? menu.name : ''
        }
    }
}

export default ModifyMeal;