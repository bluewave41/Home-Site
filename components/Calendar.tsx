import Box from '@mui/material/Box';
import { chunk } from 'lib/Utilities';
import Link from 'next/link';

const DateRow = (props) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Square text='Sun'  small />
            <Square text='Mon'  small />
            <Square text='Tue'  small />
            <Square text='Wed' small />
            <Square text='Thur'  small />
            <Square text='Fri'  small />
            <Square text='Sat'  small />
        </Box>
    )
}

const Row = (props) => {
    let days = props.dates;
    return (
        <Box sx={{ display: 'flex' }}>
            {days.map((el, index) => (
                el.text ? <LinkSquare key={el.link} text={el.text} link={el.link} menu={el.menu} /> : <Square key={index} />
            ))}
        </Box>
    )
}

const Square = (props) => {
    let height = props.small ? '40px' : '100px';

    return (
        <Box sx={{ 
            display: 'flex',
            width: '100px',
            height: height,
            border: 1,
            justifyContent: 'center',
        }}>
            {props.text}
        </Box>
    )
}

const LinkSquare = (props) => {
    let height = props.small ? '40px' : '100px';
    let hover = props.text ? {
        border: '1px solid aqua',
        cursor: 'pointer'
    } : {}

    return (
        <Link href={props.link} passHref>
            <Box sx={{ 
                display: 'flex',
                width: '100px',
                height: height,
                border: 1,
                justifyContent: 'center',
                ':hover': hover
            }}>
                <Box>
                    <Box>
                        {props.text}
                    </Box>
                    <Box>
                        {props.menu}
                    </Box>
                </Box>
            </Box>
        </Link>
    )
}

const Calendar = (props) => {
    const date = props.date;
    const menus = props.menus;
    const day = date.getDay();
    let days = new Array(35).fill('');
    let dayIndex = 1;
    for(var x=day;x<35;x++) {
        let menu = menus.find(el => new Date(el.date).getDate() == dayIndex); //I think the JSON stringify and parse is messing with the date here?
        days[x] = {
            link: '/menu/' + dayIndex + '/' + (date.getMonth()+1) + '/' + date.getFullYear(),
            text: dayIndex++,
            menu: menu ? menu.name : ''
        }
    }
    days = chunk(days, 7);
    return (
        <Box>
            <DateRow />
            {days.map((el, index) => (
                <Row key={index} dates={el} />
            ))}
        </Box>
    )
}

export default Calendar;