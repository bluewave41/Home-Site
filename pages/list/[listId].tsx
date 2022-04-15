import Box from '@mui/material/Box';
import ListModel from 'models/ListModel';

const List = (props) => {
    return (
        <Box>
            <h1>Your list</h1>
            {props.items.map(el => (
                <Box>  
                    {el.amount} {el.name}
                </Box>
            ))}
        </Box>
    )
}

export async function getServerSideProps(context) {
    const slug = context.query.listId;

    const list = await ListModel.query().withGraphFetched('items')
        .findOne('uuid', slug);

    return {
        props: {
            items: JSON.parse(JSON.stringify(list.items))
        }
    }
}

export default List;