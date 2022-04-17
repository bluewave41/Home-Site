import Box from '@mui/material/Box';
import Calendar from 'components/Calendar';
import MenuModel from 'models/MenuModel';
import startOfMonth from 'date-fns/startOfMonth';
import startOfToday from 'date-fns/startOfToday';
import format from 'date-fns/format';
import addMonths from 'date-fns/addMonths';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import { useState } from 'react';
import axios from 'axios';
import { dateToString } from 'lib/DateHandler';
import { raw } from 'objection';
import Button from '@mui/material/Button';

const Menu = (props) => {
    const [menus, setMenus] = useState(props.menus);
    const [date, setDate] = useState(startOfMonth(startOfToday()));

    const onDateChange = async (e) => {
        let d = new Date(date);
        console.log(date);

        switch(e.target.getAttribute('name')) {
            case 'backward':
                d = addMonths(d, -1);
                break;
            case 'forward':
                d = addMonths(d, 1);
                break;
        }

        let response;
        try {
            console.log({d})
            response = await axios.post('/api/menu/get', { date: d });
            setMenus(response.data.menus);
            setDate(d);
        }
        catch(e) {}
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button name='backward' onClick={onDateChange}>
                    Back
                </Button>
                <h1>{format(date, 'MMMM')}</h1>
                <Button name='forward' onClick={onDateChange}>
                    Forward
                </Button>
            </Box>
            <Calendar menus={menus} date={date} />
        </Box>
    )
}

export async function getServerSideProps(context) {
    const { req, res} = context;
    const { getSession } = await import("lib/get-session");
    const session = await getSession(req, res);

    const date = startOfMonth(new Date());

    const startString = dateToString(date);

    let endDate = addMonths(date, 1);
    const endString = dateToString(endDate);

    const menus = await MenuModel.query().select('name', 'date')
        .where('userId', session.user.userId)
        .where(raw(`"date" between '${startString}' and '${endString}'`));

    return {
        props: {
            menus: JSON.parse(JSON.stringify(menus))
        }
    }
}

export default Menu;