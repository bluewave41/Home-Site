import Box from '@mui/material/Box';
import startOfMonth from 'date-fns/startOfMonth';
import startOfToday from 'date-fns/startOfToday';

const DateRow = (props) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Square text='Mon'  small />
            <Square text='Tue'  small />
            <Square text='Wed'  small />
            <Square text='Thur' small />
            <Square text='Fri'  small />
            <Square text='Sat'  small />
            <Square text='Sun'  small />
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
    let days = [];
    let firstWeek = new Array(7).fill('');
    let day = 1;
    for(var x=today-1;x<7;x++) {
        firstWeek[x] = day++;
    }
    return (
        <Box>
            <DateRow />
            <Row dates={firstWeek} />
            <Row dates={firstWeek} />
            <Row dates={firstWeek} />
            <Row dates={firstWeek} />
            <Row dates={firstWeek} />
        </Box>
    )
}

export default Calendar;