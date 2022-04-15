import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';
import ListModel from 'models/ListModel';
import format from 'date-fns/format';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import axios from 'axios';

const Shopping = (props) => {
    const [lists, setLists] = useState(props.lists);

    const onDelete = async (uuid) => {
        let response;
        try {
            response = await axios.post('/api/list/delete', { uuid: uuid });
            setLists(lists.filter(el => el.uuid != uuid));
        }
        catch(e) {
            console.log(e);
        }
    }

    return (
        <Box>
            <h1>Shopping</h1>
            {lists.map(el => (
                <Box>
                    <Link href={`/list/${el.uuid}`}>
                        {format(new Date(el.created_at), 'MMMM dd y p')}
                    </Link>
                    <Button onClick={() => onDelete(el.uuid)}><DeleteIcon /></Button>
                </Box>
            ))}
            <h3>You don't have any lists.</h3>
            <Link href='/list/create'>
                <Button variant='contained'>Create List</Button>
            </Link>
        </Box>
    )
}

export async function getServerSideProps(context) {
    const { req, res} = context;
    const { getSession } = await import("lib/get-session");
    const session = await getSession(req, res);

    const lists = await ListModel.query().select('uuid', 'created_at')
        .where('ownerId', session.user.userId);

    console.log(lists);

    return {
        props: {
            lists: JSON.parse(JSON.stringify(lists))
        }
    }
}

export default Shopping;