import Box from '@mui/material/Box';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import startOfToday from 'date-fns/startOfToday';
import { chunk } from 'lib/Utilities';

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
            <Square text={days[0]} />
            <Square text={days[1]} />
            <Square text={days[2]} />
            <Square text={days[3]} />
            <Square text={days[4]} />
            <Square text={days[5]} />
            <Square text={days[6]} />
        </Box>
    )
}

const Square = (props) => {
    let height = props.small ? '40px' : '100px';
    return (
        <Box sx={{ display: 'flex', width: '100px', height: height, border: 1, justifyContent: 'center' }}>
            {props.text}
        </Box>
    )
}

const Calendar = (props) => {
    const today = startOfMonth(startOfToday()).getDay();
    const end = endOfMonth(startOfToday()).getDay();
    console.log(end);
    let days = new Array(35).fill('');
    let day = 1;
    for(var x=today;x<35;x++) {
        days[x] = day++;
    }
    days = chunk(days, 7);
    return (
        <Box>
            <DateRow />
            {days.map(el => (
                <Row dates={el} />
            ))}
        </Box>
    )
}

export default Calendar;