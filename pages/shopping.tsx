import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';

const Shopping = (props) => {
    return (
        <Box>
            <h1>Shopping</h1>
            <h3>You don't have any lists.</h3>
            <Link href='/list/create'>
                <Button variant='contained'>Create List</Button>
            </Link>
        </Box>
    )
}

export default Shopping;