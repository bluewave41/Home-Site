import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Calendar from 'components/Calendar';

const Shopping = (props) => {
    return (
        <Box>
            <Box>
                <h1>Shopping</h1>
                <h3>You currently have no lists.</h3>
                <Button variant='contained'>Create List</Button>
                <Calendar />
            </Box>
        </Box>
    )
}

export default Shopping;