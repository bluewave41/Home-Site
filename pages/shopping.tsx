import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from 'next/link';
import ListModel from 'models/ListModel';
import format from 'date-fns/format';

const Shopping = (props) => {
    return (
        <Box>
            <h1>Shopping</h1>
            {props.lists.map(el => (
                <Box>
                    <Link href={`/list/${el.uuid}`}>
                        {format(new Date(el.created_at), 'MMMM dd y p')}
                    </Link>
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
        .where('ownedId', session.user.userId);

    console.log(lists);

    return {
        props: {
            lists: JSON.parse(JSON.stringify(lists))
        }
    }
}

export default Shopping;